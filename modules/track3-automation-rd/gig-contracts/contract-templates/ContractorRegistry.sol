// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ContractorRegistry
 * @author AuditorSEC
 * @notice On-chain registry of verified contractors for the AuditorSEC gig platform.
 * @dev Stores contractor profiles including KYC status, security clearance,
 *      specializations, and reputation scores. Integrates with Дія.City
 *      gig contract framework for Ukrainian regulatory compliance.
 */
contract ContractorRegistry is AccessControl {
    // -----------------------------------------------------------------------
    // Roles
    // -----------------------------------------------------------------------

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant KYC_PROVIDER_ROLE = keccak256("KYC_PROVIDER_ROLE");
    bytes32 public constant CLEARANCE_OFFICER_ROLE = keccak256("CLEARANCE_OFFICER_ROLE");
    bytes32 public constant ESCROW_ROLE = keccak256("ESCROW_ROLE");

    // -----------------------------------------------------------------------
    // Types
    // -----------------------------------------------------------------------

    enum KycStatus {
        Pending,
        Submitted,
        Verified,
        Rejected,
        Expired
    }

    enum ClearanceLevel {
        None,
        Confidential,
        Secret,
        TopSecret
    }

    struct ContractorProfile {
        string name;
        string diaCityFopId;
        string taxId;
        KycStatus kycStatus;
        string kycProvider;
        uint256 kycVerifiedAt;
        ClearanceLevel clearanceLevel;
        uint256 clearanceExpiry;
        uint256 reputationScore;
        uint256 completedGigs;
        uint256 totalDisputes;
        uint256 registeredAt;
        bool available;
        bool exists;
    }

    // -----------------------------------------------------------------------
    // State
    // -----------------------------------------------------------------------

    /// @notice Mapping of contractor address to profile.
    mapping(address => ContractorProfile) public contractors;

    /// @notice Mapping of contractor address to specialization flags.
    /// Specializations are stored as a bitmap for gas efficiency.
    mapping(address => uint256) public specializations;

    /// @notice List of all registered contractor addresses.
    address[] public contractorList;

    /// @notice Specialization domain to bit index mapping.
    mapping(string => uint8) public specializationBits;

    /// @notice Number of defined specialization domains.
    uint8 public specializationCount;

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

    event ContractorRegistered(address indexed contractor, string name, string diaCityFopId);
    event KycStatusUpdated(address indexed contractor, KycStatus status, string provider);
    event ClearanceUpdated(address indexed contractor, ClearanceLevel level, uint256 expiry);
    event ReputationUpdated(address indexed contractor, uint256 newScore);
    event AvailabilityUpdated(address indexed contractor, bool available);
    event SpecializationAdded(string domain, uint8 bitIndex);

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        // Initialize default specialization domains
        _addSpecialization("smart-contract-audit");
        _addSpecialization("penetration-testing");
        _addSpecialization("cryptography");
        _addSpecialization("blockchain-development");
        _addSpecialization("iot-security");
        _addSpecialization("incident-response");
        _addSpecialization("compliance");
        _addSpecialization("devsecops");
        _addSpecialization("defense-systems");
    }

    // -----------------------------------------------------------------------
    // Registration
    // -----------------------------------------------------------------------

    /**
     * @notice Register as a new contractor.
     * @param name Display name.
     * @param diaCityFopId Дія.City ФОП registration number.
     * @param taxId Ukrainian tax ID (РНОКПП / ІПН).
     * @param specDomains Array of specialization domain strings.
     */
    function register(
        string calldata name,
        string calldata diaCityFopId,
        string calldata taxId,
        string[] calldata specDomains
    ) external {
        require(!contractors[msg.sender].exists, "ContractorRegistry: already registered");
        require(bytes(name).length > 0, "ContractorRegistry: name required");
        require(bytes(diaCityFopId).length > 0, "ContractorRegistry: diaCityFopId required");

        contractors[msg.sender] = ContractorProfile({
            name: name,
            diaCityFopId: diaCityFopId,
            taxId: taxId,
            kycStatus: KycStatus.Pending,
            kycProvider: "",
            kycVerifiedAt: 0,
            clearanceLevel: ClearanceLevel.None,
            clearanceExpiry: 0,
            reputationScore: 50, // Start at neutral 50/100
            completedGigs: 0,
            totalDisputes: 0,
            registeredAt: block.timestamp,
            available: true,
            exists: true
        });

        // Set specialization bitmap
        uint256 bitmap = 0;
        for (uint256 i = 0; i < specDomains.length; i++) {
            uint8 bit = specializationBits[specDomains[i]];
            if (bit > 0 || keccak256(bytes(specDomains[i])) == keccak256(bytes("smart-contract-audit"))) {
                bitmap |= (1 << bit);
            }
        }
        specializations[msg.sender] = bitmap;

        contractorList.push(msg.sender);

        emit ContractorRegistered(msg.sender, name, diaCityFopId);
    }

    // -----------------------------------------------------------------------
    // KYC Management
    // -----------------------------------------------------------------------

    /**
     * @notice Update a contractor's KYC status.
     * @param contractor Contractor address.
     * @param status New KYC status.
     * @param provider KYC provider name.
     */
    function updateKycStatus(
        address contractor,
        KycStatus status,
        string calldata provider
    ) external onlyRole(KYC_PROVIDER_ROLE) {
        require(contractors[contractor].exists, "ContractorRegistry: contractor not found");

        contractors[contractor].kycStatus = status;
        contractors[contractor].kycProvider = provider;

        if (status == KycStatus.Verified) {
            contractors[contractor].kycVerifiedAt = block.timestamp;
        }

        emit KycStatusUpdated(contractor, status, provider);
    }

    // -----------------------------------------------------------------------
    // Security Clearance
    // -----------------------------------------------------------------------

    /**
     * @notice Update a contractor's security clearance level.
     * @param contractor Contractor address.
     * @param level New clearance level.
     * @param expiry Clearance expiry timestamp.
     */
    function updateClearance(
        address contractor,
        ClearanceLevel level,
        uint256 expiry
    ) external onlyRole(CLEARANCE_OFFICER_ROLE) {
        require(contractors[contractor].exists, "ContractorRegistry: contractor not found");
        require(
            contractors[contractor].kycStatus == KycStatus.Verified,
            "ContractorRegistry: KYC must be verified for clearance"
        );

        contractors[contractor].clearanceLevel = level;
        contractors[contractor].clearanceExpiry = expiry;

        emit ClearanceUpdated(contractor, level, expiry);
    }

    // -----------------------------------------------------------------------
    // Reputation
    // -----------------------------------------------------------------------

    /**
     * @notice Update a contractor's reputation score. Called by escrow on gig completion.
     * @param contractor Contractor address.
     * @param delta Signed change to reputation score.
     */
    function updateReputation(
        address contractor,
        int256 delta
    ) external onlyRole(ESCROW_ROLE) {
        require(contractors[contractor].exists, "ContractorRegistry: contractor not found");

        int256 current = int256(contractors[contractor].reputationScore);
        int256 updated = current + delta;

        // Clamp to 0–100
        if (updated < 0) updated = 0;
        if (updated > 100) updated = 100;

        contractors[contractor].reputationScore = uint256(updated);

        emit ReputationUpdated(contractor, uint256(updated));
    }

    /**
     * @notice Record a completed gig for the contractor.
     */
    function recordGigCompletion(address contractor) external onlyRole(ESCROW_ROLE) {
        require(contractors[contractor].exists, "ContractorRegistry: contractor not found");
        contractors[contractor].completedGigs++;
    }

    /**
     * @notice Record a dispute for the contractor.
     */
    function recordDispute(address contractor) external onlyRole(ESCROW_ROLE) {
        require(contractors[contractor].exists, "ContractorRegistry: contractor not found");
        contractors[contractor].totalDisputes++;
    }

    // -----------------------------------------------------------------------
    // Queries
    // -----------------------------------------------------------------------

    /**
     * @notice Check if a contractor meets specific gig requirements.
     * @param contractor Contractor address.
     * @param requiredSpecs Bitmap of required specializations.
     * @param minClearance Minimum required clearance level.
     * @return True if the contractor meets all requirements.
     */
    function meetsRequirements(
        address contractor,
        uint256 requiredSpecs,
        ClearanceLevel minClearance
    ) external view returns (bool) {
        ContractorProfile storage c = contractors[contractor];
        if (!c.exists) return false;
        if (c.kycStatus != KycStatus.Verified) return false;

        // Check specializations (all required bits must be set)
        if ((specializations[contractor] & requiredSpecs) != requiredSpecs) return false;

        // Check clearance level
        if (uint8(c.clearanceLevel) < uint8(minClearance)) return false;

        // Check clearance not expired
        if (minClearance != ClearanceLevel.None && c.clearanceExpiry < block.timestamp) return false;

        return true;
    }

    /**
     * @notice Toggle contractor availability.
     */
    function setAvailability(bool available) external {
        require(contractors[msg.sender].exists, "ContractorRegistry: not registered");
        contractors[msg.sender].available = available;
        emit AvailabilityUpdated(msg.sender, available);
    }

    /**
     * @notice Get total registered contractor count.
     */
    function getContractorCount() external view returns (uint256) {
        return contractorList.length;
    }

    /**
     * @notice Get contractor address by index.
     */
    function getContractorAt(uint256 index) external view returns (address) {
        return contractorList[index];
    }

    // -----------------------------------------------------------------------
    // Admin
    // -----------------------------------------------------------------------

    /**
     * @notice Add a new specialization domain.
     * @param domain Specialization domain string.
     */
    function addSpecialization(string calldata domain) external onlyRole(ADMIN_ROLE) {
        _addSpecialization(domain);
    }

    function _addSpecialization(string memory domain) internal {
        require(specializationCount < 256, "ContractorRegistry: max specializations reached");
        specializationBits[domain] = specializationCount;
        specializationCount++;
        emit SpecializationAdded(domain, specializationCount - 1);
    }
}
