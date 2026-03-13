// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GigEscrow
 * @author AuditorSEC
 * @notice Milestone-based escrow for gig contracts, with multi-sig release.
 * @dev Each gig has N milestones. The client deposits the total amount upfront.
 *      Milestone funds are released upon approval or dispute resolution.
 *      Multi-sig is required for fund release as an additional safety layer.
 */
contract GigEscrow is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // -----------------------------------------------------------------------
    // Types
    // -----------------------------------------------------------------------

    enum MilestoneStatus {
        Pending,
        InProgress,
        Submitted,
        Approved,
        Rejected,
        Disputed
    }

    struct Milestone {
        uint256 amount;
        MilestoneStatus status;
        bytes32 deliverableHash;
        uint256 submittedAt;
        uint256 approvedAt;
    }

    struct Escrow {
        string gigId;
        address client;
        address contractor;
        address token;
        uint256 totalAmount;
        uint256 depositedAmount;
        uint256 releasedAmount;
        bool active;
        address[] signers;
        uint256 requiredSignatures;
        Milestone[] milestones;
    }

    // -----------------------------------------------------------------------
    // State
    // -----------------------------------------------------------------------

    /// @notice Counter for escrow IDs.
    uint256 public escrowCount;

    /// @notice Mapping of escrow ID to Escrow struct.
    mapping(uint256 => Escrow) public escrows;

    /// @notice Mapping of escrow ID => milestone index => signer => signed.
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public releaseSignatures;

    /// @notice Mapping of escrow ID => milestone index => signature count.
    mapping(uint256 => mapping(uint256 => uint256)) public signatureCount;

    /// @notice Address of the dispute resolution contract.
    address public disputeResolution;

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

    event EscrowCreated(
        uint256 indexed escrowId,
        string gigId,
        address indexed client,
        address indexed contractor,
        address token,
        uint256 totalAmount
    );

    event FundsDeposited(uint256 indexed escrowId, address indexed depositor, uint256 amount);

    event MilestoneSubmitted(uint256 indexed escrowId, uint256 milestoneIndex, bytes32 deliverableHash);

    event MilestoneApproved(uint256 indexed escrowId, uint256 milestoneIndex);

    event MilestoneRejected(uint256 indexed escrowId, uint256 milestoneIndex);

    event MilestoneDisputed(uint256 indexed escrowId, uint256 milestoneIndex);

    event FundsReleased(uint256 indexed escrowId, uint256 milestoneIndex, address indexed to, uint256 amount);

    event ReleaseSigned(uint256 indexed escrowId, uint256 milestoneIndex, address indexed signer);

    // -----------------------------------------------------------------------
    // Modifiers
    // -----------------------------------------------------------------------

    modifier onlyClient(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].client, "GigEscrow: caller is not the client");
        _;
    }

    modifier onlyContractor(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].contractor, "GigEscrow: caller is not the contractor");
        _;
    }

    modifier onlyActive(uint256 escrowId) {
        require(escrows[escrowId].active, "GigEscrow: escrow is not active");
        _;
    }

    modifier onlyDisputeResolution() {
        require(msg.sender == disputeResolution, "GigEscrow: caller is not dispute resolution");
        _;
    }

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    constructor(address _disputeResolution) Ownable(msg.sender) {
        disputeResolution = _disputeResolution;
    }

    // -----------------------------------------------------------------------
    // External Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Create a new escrow for a gig contract.
     * @param gigId Unique gig identifier.
     * @param client Address of the hiring party.
     * @param contractor Address of the contractor.
     * @param token ERC-20 token address for payments.
     * @param milestoneAmounts Array of payment amounts per milestone.
     * @param signers Array of multi-sig signer addresses.
     * @param requiredSigs Number of signatures required for fund release.
     * @return escrowId The ID of the newly created escrow.
     */
    function createEscrow(
        string calldata gigId,
        address client,
        address contractor,
        address token,
        uint256[] calldata milestoneAmounts,
        address[] calldata signers,
        uint256 requiredSigs
    ) external returns (uint256 escrowId) {
        require(client != address(0), "GigEscrow: invalid client address");
        require(contractor != address(0), "GigEscrow: invalid contractor address");
        require(client != contractor, "GigEscrow: client and contractor must differ");
        require(milestoneAmounts.length > 0, "GigEscrow: at least one milestone required");
        require(signers.length >= requiredSigs, "GigEscrow: not enough signers");
        require(requiredSigs > 0, "GigEscrow: at least one signature required");

        escrowId = escrowCount++;
        Escrow storage e = escrows[escrowId];
        e.gigId = gigId;
        e.client = client;
        e.contractor = contractor;
        e.token = token;
        e.active = true;
        e.signers = signers;
        e.requiredSignatures = requiredSigs;

        uint256 total = 0;
        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            require(milestoneAmounts[i] > 0, "GigEscrow: milestone amount must be > 0");
            e.milestones.push(Milestone({
                amount: milestoneAmounts[i],
                status: MilestoneStatus.Pending,
                deliverableHash: bytes32(0),
                submittedAt: 0,
                approvedAt: 0
            }));
            total += milestoneAmounts[i];
        }
        e.totalAmount = total;

        emit EscrowCreated(escrowId, gigId, client, contractor, token, total);
    }

    /**
     * @notice Deposit funds into escrow. Called by the client.
     * @param escrowId Escrow identifier.
     * @param amount Amount of tokens to deposit.
     */
    function deposit(uint256 escrowId, uint256 amount) external onlyClient(escrowId) onlyActive(escrowId) nonReentrant {
        Escrow storage e = escrows[escrowId];
        require(e.depositedAmount + amount <= e.totalAmount, "GigEscrow: deposit exceeds total");

        IERC20(e.token).safeTransferFrom(msg.sender, address(this), amount);
        e.depositedAmount += amount;

        emit FundsDeposited(escrowId, msg.sender, amount);
    }

    /**
     * @notice Submit a milestone deliverable. Called by the contractor.
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     * @param deliverableHash IPFS hash (bytes32) of the deliverable.
     */
    function submitMilestone(
        uint256 escrowId,
        uint256 milestoneIndex,
        bytes32 deliverableHash
    ) external onlyContractor(escrowId) onlyActive(escrowId) {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");

        Milestone storage m = e.milestones[milestoneIndex];
        require(
            m.status == MilestoneStatus.InProgress || m.status == MilestoneStatus.Rejected,
            "GigEscrow: milestone not in progress or rejected"
        );

        m.status = MilestoneStatus.Submitted;
        m.deliverableHash = deliverableHash;
        m.submittedAt = block.timestamp;

        emit MilestoneSubmitted(escrowId, milestoneIndex, deliverableHash);
    }

    /**
     * @notice Approve a submitted milestone. Called by the client.
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     */
    function approveMilestone(
        uint256 escrowId,
        uint256 milestoneIndex
    ) external onlyClient(escrowId) onlyActive(escrowId) {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");

        Milestone storage m = e.milestones[milestoneIndex];
        require(m.status == MilestoneStatus.Submitted, "GigEscrow: milestone not submitted");

        m.status = MilestoneStatus.Approved;
        m.approvedAt = block.timestamp;

        emit MilestoneApproved(escrowId, milestoneIndex);
    }

    /**
     * @notice Reject a submitted milestone. Called by the client.
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     */
    function rejectMilestone(
        uint256 escrowId,
        uint256 milestoneIndex
    ) external onlyClient(escrowId) onlyActive(escrowId) {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");

        Milestone storage m = e.milestones[milestoneIndex];
        require(m.status == MilestoneStatus.Submitted, "GigEscrow: milestone not submitted");

        m.status = MilestoneStatus.Rejected;

        emit MilestoneRejected(escrowId, milestoneIndex);
    }

    /**
     * @notice Sign off on releasing funds for an approved milestone (multi-sig).
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     */
    function signRelease(
        uint256 escrowId,
        uint256 milestoneIndex
    ) external onlyActive(escrowId) nonReentrant {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");
        require(e.milestones[milestoneIndex].status == MilestoneStatus.Approved, "GigEscrow: milestone not approved");

        // Verify caller is an authorized signer
        bool isSigner = false;
        for (uint256 i = 0; i < e.signers.length; i++) {
            if (e.signers[i] == msg.sender) {
                isSigner = true;
                break;
            }
        }
        require(isSigner, "GigEscrow: caller is not an authorized signer");
        require(!releaseSignatures[escrowId][milestoneIndex][msg.sender], "GigEscrow: already signed");

        releaseSignatures[escrowId][milestoneIndex][msg.sender] = true;
        signatureCount[escrowId][milestoneIndex]++;

        emit ReleaseSigned(escrowId, milestoneIndex, msg.sender);

        // Auto-release if threshold reached
        if (signatureCount[escrowId][milestoneIndex] >= e.requiredSignatures) {
            _releaseFunds(escrowId, milestoneIndex);
        }
    }

    /**
     * @notice Mark a milestone as disputed. Called by dispute resolution contract.
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     */
    function markDisputed(
        uint256 escrowId,
        uint256 milestoneIndex
    ) external onlyDisputeResolution onlyActive(escrowId) {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");

        e.milestones[milestoneIndex].status = MilestoneStatus.Disputed;

        emit MilestoneDisputed(escrowId, milestoneIndex);
    }

    /**
     * @notice Resolve a dispute and distribute funds. Called by dispute resolution contract.
     * @param escrowId Escrow identifier.
     * @param milestoneIndex Zero-based milestone index.
     * @param clientAmount Amount to return to client.
     * @param contractorAmount Amount to send to contractor.
     */
    function resolveDispute(
        uint256 escrowId,
        uint256 milestoneIndex,
        uint256 clientAmount,
        uint256 contractorAmount
    ) external onlyDisputeResolution onlyActive(escrowId) nonReentrant {
        Escrow storage e = escrows[escrowId];
        require(milestoneIndex < e.milestones.length, "GigEscrow: invalid milestone index");

        Milestone storage m = e.milestones[milestoneIndex];
        require(m.status == MilestoneStatus.Disputed, "GigEscrow: milestone not disputed");
        require(clientAmount + contractorAmount <= m.amount, "GigEscrow: amounts exceed milestone");

        if (contractorAmount > 0) {
            IERC20(e.token).safeTransfer(e.contractor, contractorAmount);
        }
        if (clientAmount > 0) {
            IERC20(e.token).safeTransfer(e.client, clientAmount);
        }

        e.releasedAmount += contractorAmount + clientAmount;
        m.status = MilestoneStatus.Approved; // Mark as resolved
        m.approvedAt = block.timestamp;

        emit FundsReleased(escrowId, milestoneIndex, e.contractor, contractorAmount);
    }

    // -----------------------------------------------------------------------
    // View Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Get the number of milestones in an escrow.
     */
    function getMilestoneCount(uint256 escrowId) external view returns (uint256) {
        return escrows[escrowId].milestones.length;
    }

    /**
     * @notice Get milestone details.
     */
    function getMilestone(uint256 escrowId, uint256 milestoneIndex) external view returns (Milestone memory) {
        return escrows[escrowId].milestones[milestoneIndex];
    }

    /**
     * @notice Get escrow balance (deposited minus released).
     */
    function getBalance(uint256 escrowId) external view returns (uint256) {
        Escrow storage e = escrows[escrowId];
        return e.depositedAmount - e.releasedAmount;
    }

    // -----------------------------------------------------------------------
    // Admin Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Update the dispute resolution contract address.
     */
    function setDisputeResolution(address _disputeResolution) external onlyOwner {
        require(_disputeResolution != address(0), "GigEscrow: invalid address");
        disputeResolution = _disputeResolution;
    }

    // -----------------------------------------------------------------------
    // Internal Functions
    // -----------------------------------------------------------------------

    /**
     * @dev Release funds for an approved milestone to the contractor.
     */
    function _releaseFunds(uint256 escrowId, uint256 milestoneIndex) internal {
        Escrow storage e = escrows[escrowId];
        Milestone storage m = e.milestones[milestoneIndex];

        uint256 amount = m.amount;
        require(e.depositedAmount - e.releasedAmount >= amount, "GigEscrow: insufficient escrow balance");

        e.releasedAmount += amount;
        IERC20(e.token).safeTransfer(e.contractor, amount);

        emit FundsReleased(escrowId, milestoneIndex, e.contractor, amount);
    }
}
