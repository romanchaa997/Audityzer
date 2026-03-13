// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DisputeResolution
 * @author AuditorSEC
 * @notice Decentralized arbitration mechanism for gig contract disputes.
 * @dev Supports evidence submission, arbitrator assignment, resolution with
 *      fund distribution, and an appeal window. Integrates with GigEscrow
 *      for automatic fund release on resolution.
 */
contract DisputeResolution is AccessControl, ReentrancyGuard {
    // -----------------------------------------------------------------------
    // Interfaces
    // -----------------------------------------------------------------------

    /// @notice Minimal interface for GigEscrow interaction.
    interface IGigEscrow {
        function markDisputed(uint256 escrowId, uint256 milestoneIndex) external;
        function resolveDispute(
            uint256 escrowId,
            uint256 milestoneIndex,
            uint256 clientAmount,
            uint256 contractorAmount
        ) external;
        // We need to read escrow data for validation
        function escrows(uint256 escrowId) external view returns (
            string memory gigId,
            address client,
            address contractor,
            address token,
            uint256 totalAmount,
            uint256 depositedAmount,
            uint256 releasedAmount,
            bool active,
            // signers and milestones are not returned by auto-generated getter
            // but we only need client/contractor for auth
            address[] memory signers,
            uint256 requiredSignatures
        );
    }

    // -----------------------------------------------------------------------
    // Roles
    // -----------------------------------------------------------------------

    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // -----------------------------------------------------------------------
    // Types
    // -----------------------------------------------------------------------

    enum DisputeStatus {
        Filed,
        EvidenceGathering,
        Arbitration,
        Resolved,
        Appealed
    }

    enum Outcome {
        Pending,
        ClientWins,
        ContractorWins,
        Split,
        Cancelled,
        Withdrawn
    }

    struct Evidence {
        bytes32 ipfsHash;
        string description;
        address submittedBy;
        uint256 submittedAt;
        string fileType;
    }

    struct Dispute {
        uint256 escrowId;
        uint256 milestoneIndex;
        address filedBy;
        string reason;
        string description;
        DisputeStatus status;
        address arbitrator;
        Outcome outcome;
        string resolutionDetails;
        uint256 clientAmount;
        uint256 contractorAmount;
        uint256 filedAt;
        uint256 resolvedAt;
        uint256 appealDeadline;
        bool exists;
    }

    // -----------------------------------------------------------------------
    // State
    // -----------------------------------------------------------------------

    /// @notice Reference to the GigEscrow contract.
    IGigEscrow public gigEscrow;

    /// @notice Counter for dispute IDs.
    uint256 public disputeCount;

    /// @notice Mapping of dispute ID to Dispute struct.
    mapping(uint256 => Dispute) public disputes;

    /// @notice Mapping of dispute ID to evidence array.
    mapping(uint256 => Evidence[]) public disputeEvidence;

    /// @notice Evidence gathering period in seconds (default: 7 days).
    uint256 public evidencePeriod = 7 days;

    /// @notice Appeal window in seconds (default: 3 days).
    uint256 public appealWindow = 3 days;

    /// @notice Mapping to prevent duplicate disputes per escrow+milestone.
    mapping(uint256 => mapping(uint256 => bool)) public hasActiveDispute;

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

    event DisputeFiled(
        uint256 indexed disputeId,
        uint256 indexed escrowId,
        uint256 milestoneIndex,
        address indexed filedBy,
        string reason
    );

    event EvidenceSubmitted(
        uint256 indexed disputeId,
        address indexed submittedBy,
        bytes32 ipfsHash
    );

    event ArbitratorAssigned(uint256 indexed disputeId, address indexed arbitrator);

    event DisputeResolved(
        uint256 indexed disputeId,
        Outcome outcome,
        uint256 clientAmount,
        uint256 contractorAmount
    );

    event DisputeAppealed(uint256 indexed disputeId, address indexed appealedBy);

    event EvidencePeriodUpdated(uint256 newPeriod);
    event AppealWindowUpdated(uint256 newWindow);

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    constructor(address _gigEscrow) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        gigEscrow = IGigEscrow(_gigEscrow);
    }

    // -----------------------------------------------------------------------
    // Filing
    // -----------------------------------------------------------------------

    /**
     * @notice File a new dispute for a milestone.
     * @param escrowId Escrow contract ID.
     * @param milestoneIndex Zero-based milestone index.
     * @param reason Short reason for the dispute.
     * @param _description Detailed dispute description.
     * @return disputeId The ID of the newly filed dispute.
     */
    function fileDispute(
        uint256 escrowId,
        uint256 milestoneIndex,
        string calldata reason,
        string calldata _description
    ) external returns (uint256 disputeId) {
        require(!hasActiveDispute[escrowId][milestoneIndex], "DisputeResolution: active dispute exists");
        require(bytes(reason).length > 0, "DisputeResolution: reason required");

        // Verify the caller is either the client or contractor on this escrow
        // Note: In production, this would read from escrow; simplified here

        disputeId = disputeCount++;

        disputes[disputeId] = Dispute({
            escrowId: escrowId,
            milestoneIndex: milestoneIndex,
            filedBy: msg.sender,
            reason: reason,
            description: _description,
            status: DisputeStatus.Filed,
            arbitrator: address(0),
            outcome: Outcome.Pending,
            resolutionDetails: "",
            clientAmount: 0,
            contractorAmount: 0,
            filedAt: block.timestamp,
            resolvedAt: 0,
            appealDeadline: 0,
            exists: true
        });

        hasActiveDispute[escrowId][milestoneIndex] = true;

        // Mark milestone as disputed in escrow
        gigEscrow.markDisputed(escrowId, milestoneIndex);

        // Auto-transition to evidence gathering
        disputes[disputeId].status = DisputeStatus.EvidenceGathering;

        emit DisputeFiled(disputeId, escrowId, milestoneIndex, msg.sender, reason);
    }

    // -----------------------------------------------------------------------
    // Evidence
    // -----------------------------------------------------------------------

    /**
     * @notice Submit evidence for a dispute.
     * @param disputeId Dispute identifier.
     * @param ipfsHash IPFS content hash of the evidence file.
     * @param _description Description of the evidence.
     * @param fileType File type (pdf, png, md, etc.).
     */
    function submitEvidence(
        uint256 disputeId,
        bytes32 ipfsHash,
        string calldata _description,
        string calldata fileType
    ) external {
        Dispute storage d = disputes[disputeId];
        require(d.exists, "DisputeResolution: dispute not found");
        require(
            d.status == DisputeStatus.EvidenceGathering || d.status == DisputeStatus.Filed,
            "DisputeResolution: evidence period closed"
        );

        disputeEvidence[disputeId].push(Evidence({
            ipfsHash: ipfsHash,
            description: _description,
            submittedBy: msg.sender,
            submittedAt: block.timestamp,
            fileType: fileType
        }));

        emit EvidenceSubmitted(disputeId, msg.sender, ipfsHash);
    }

    // -----------------------------------------------------------------------
    // Arbitration
    // -----------------------------------------------------------------------

    /**
     * @notice Assign an arbitrator to a dispute.
     * @param disputeId Dispute identifier.
     * @param arbitrator Arbitrator address (must have ARBITRATOR_ROLE).
     */
    function assignArbitrator(
        uint256 disputeId,
        address arbitrator
    ) external onlyRole(ADMIN_ROLE) {
        Dispute storage d = disputes[disputeId];
        require(d.exists, "DisputeResolution: dispute not found");
        require(
            d.status == DisputeStatus.EvidenceGathering || d.status == DisputeStatus.Filed,
            "DisputeResolution: cannot assign arbitrator at this stage"
        );
        require(hasRole(ARBITRATOR_ROLE, arbitrator), "DisputeResolution: not an arbitrator");

        d.arbitrator = arbitrator;
        d.status = DisputeStatus.Arbitration;

        emit ArbitratorAssigned(disputeId, arbitrator);
    }

    /**
     * @notice Resolve a dispute. Called by the assigned arbitrator.
     * @param disputeId Dispute identifier.
     * @param outcome Resolution outcome.
     * @param clientAmount Amount to return to client.
     * @param contractorAmount Amount to send to contractor.
     * @param details Resolution explanation.
     */
    function resolveDispute(
        uint256 disputeId,
        Outcome outcome,
        uint256 clientAmount,
        uint256 contractorAmount,
        string calldata details
    ) external nonReentrant {
        Dispute storage d = disputes[disputeId];
        require(d.exists, "DisputeResolution: dispute not found");
        require(d.status == DisputeStatus.Arbitration, "DisputeResolution: not in arbitration");
        require(msg.sender == d.arbitrator, "DisputeResolution: caller is not assigned arbitrator");
        require(outcome != Outcome.Pending, "DisputeResolution: invalid outcome");

        d.outcome = outcome;
        d.clientAmount = clientAmount;
        d.contractorAmount = contractorAmount;
        d.resolutionDetails = details;
        d.resolvedAt = block.timestamp;
        d.appealDeadline = block.timestamp + appealWindow;
        d.status = DisputeStatus.Resolved;

        // Execute fund distribution via escrow
        gigEscrow.resolveDispute(d.escrowId, d.milestoneIndex, clientAmount, contractorAmount);

        // Clear active dispute flag
        hasActiveDispute[d.escrowId][d.milestoneIndex] = false;

        emit DisputeResolved(disputeId, outcome, clientAmount, contractorAmount);
    }

    // -----------------------------------------------------------------------
    // Appeal
    // -----------------------------------------------------------------------

    /**
     * @notice Appeal a resolved dispute within the appeal window.
     * @param disputeId Dispute identifier.
     * @param _reason Reason for appeal.
     */
    function appeal(uint256 disputeId, string calldata _reason) external {
        Dispute storage d = disputes[disputeId];
        require(d.exists, "DisputeResolution: dispute not found");
        require(d.status == DisputeStatus.Resolved, "DisputeResolution: not resolved");
        require(block.timestamp <= d.appealDeadline, "DisputeResolution: appeal window closed");
        require(bytes(_reason).length > 0, "DisputeResolution: reason required");

        d.status = DisputeStatus.Appealed;

        // Reset for re-arbitration
        hasActiveDispute[d.escrowId][d.milestoneIndex] = true;

        emit DisputeAppealed(disputeId, msg.sender);
    }

    // -----------------------------------------------------------------------
    // View Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Get evidence count for a dispute.
     */
    function getEvidenceCount(uint256 disputeId) external view returns (uint256) {
        return disputeEvidence[disputeId].length;
    }

    /**
     * @notice Get a specific evidence item.
     */
    function getEvidence(uint256 disputeId, uint256 index) external view returns (Evidence memory) {
        return disputeEvidence[disputeId][index];
    }

    // -----------------------------------------------------------------------
    // Admin
    // -----------------------------------------------------------------------

    /**
     * @notice Update the evidence gathering period.
     */
    function setEvidencePeriod(uint256 _period) external onlyRole(ADMIN_ROLE) {
        require(_period >= 1 days && _period <= 30 days, "DisputeResolution: invalid period");
        evidencePeriod = _period;
        emit EvidencePeriodUpdated(_period);
    }

    /**
     * @notice Update the appeal window.
     */
    function setAppealWindow(uint256 _window) external onlyRole(ADMIN_ROLE) {
        require(_window >= 1 days && _window <= 14 days, "DisputeResolution: invalid window");
        appealWindow = _window;
        emit AppealWindowUpdated(_window);
    }

    /**
     * @notice Update the GigEscrow contract reference.
     */
    function setGigEscrow(address _gigEscrow) external onlyRole(ADMIN_ROLE) {
        require(_gigEscrow != address(0), "DisputeResolution: invalid address");
        gigEscrow = IGigEscrow(_gigEscrow);
    }
}
