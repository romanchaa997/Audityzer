/**
 * @fileoverview Gig Contracts Framework — Smart contract interfaces and management
 * for AuditorSEC's DefenseTech contractor platform.
 *
 * Provides TypeScript interfaces for milestone-based payments, contractor vetting,
 * escrow management, and dispute resolution, aligned with Ukrainian Дія.City
 * gig contract regulations.
 *
 * @module contract-framework
 */

// ---------------------------------------------------------------------------
// Types — Contractor
// ---------------------------------------------------------------------------

/** KYC verification status. */
export type KycStatus = "pending" | "submitted" | "verified" | "rejected" | "expired";

/** Security clearance level for DefenseTech contractors. */
export type ClearanceLevel = "none" | "confidential" | "secret" | "top-secret";

/** Contractor specialization domain. */
export type SpecializationDomain =
  | "smart-contract-audit"
  | "penetration-testing"
  | "cryptography"
  | "blockchain-development"
  | "iot-security"
  | "incident-response"
  | "compliance"
  | "devsecops"
  | "defense-systems";

/** Registered contractor in the platform. */
export interface Contractor {
  /** On-chain address (Ethereum) */
  address: string;
  /** Display name */
  name: string;
  /** Дія.City ФОП (sole proprietorship) registration number */
  diaCityFopId: string;
  /** Ukrainian tax ID (РНОКПП / ІПН) */
  taxId: string;
  /** KYC/AML verification status */
  kycStatus: KycStatus;
  /** KYC verification provider (e.g. 'sumsub', 'ondato') */
  kycProvider: string;
  /** ISO-8601 date of last KYC verification */
  kycVerifiedAt: string | null;
  /** DefenseTech security clearance level */
  clearanceLevel: ClearanceLevel;
  /** ISO-8601 clearance expiry date */
  clearanceExpiry: string | null;
  /** Areas of expertise */
  specializations: SpecializationDomain[];
  /** Reputation score 0–100 (on-chain) */
  reputationScore: number;
  /** Total gigs completed */
  completedGigs: number;
  /** Total disputes */
  totalDisputes: number;
  /** ISO-8601 registration date */
  registeredAt: string;
  /** Whether contractor is currently available for new gigs */
  available: boolean;
}

// ---------------------------------------------------------------------------
// Types — Gig Contract
// ---------------------------------------------------------------------------

/** Status of a gig contract. */
export type GigStatus =
  | "draft"
  | "published"
  | "applied"
  | "assigned"
  | "in-progress"
  | "review"
  | "completed"
  | "disputed"
  | "cancelled";

/** Payment token type. */
export type PaymentToken = "USDC" | "USDT" | "DAI" | "ETH" | "UAH-CBDC";

/** A single milestone within a gig contract. */
export interface Milestone {
  /** Sequential milestone number (1-based) */
  number: number;
  /** Milestone title */
  title: string;
  /** Detailed description of deliverables */
  description: string;
  /** Payment amount for this milestone */
  amount: bigint;
  /** Payment token */
  token: PaymentToken;
  /** ISO-8601 deadline for this milestone */
  deadline: string;
  /** Current status */
  status: "pending" | "in-progress" | "submitted" | "approved" | "rejected" | "disputed";
  /** IPFS hash of submitted deliverables (if any) */
  deliverableHash: string | null;
  /** ISO-8601 submission timestamp */
  submittedAt: string | null;
  /** ISO-8601 approval timestamp */
  approvedAt: string | null;
}

/** Full gig contract definition. */
export interface GigContract {
  /** On-chain contract address (once deployed) */
  contractAddress: string | null;
  /** Unique gig identifier */
  gigId: string;
  /** Title of the gig */
  title: string;
  /** Detailed description */
  description: string;
  /** Client (hiring party) address */
  clientAddress: string;
  /** Assigned contractor address (null if unassigned) */
  contractorAddress: string | null;
  /** Required specializations */
  requiredSpecializations: SpecializationDomain[];
  /** Minimum clearance level required */
  requiredClearance: ClearanceLevel;
  /** Ordered list of milestones */
  milestones: Milestone[];
  /** Total contract value (sum of all milestones) */
  totalValue: bigint;
  /** Payment token */
  paymentToken: PaymentToken;
  /** Escrow contract address */
  escrowAddress: string | null;
  /** Multi-sig addresses for escrow release */
  multiSigSigners: string[];
  /** Required number of signatures for escrow release */
  requiredSignatures: number;
  /** Current gig status */
  status: GigStatus;
  /** ISO-8601 creation date */
  createdAt: string;
  /** ISO-8601 date of last status change */
  updatedAt: string;
  /** Дія.City gig contract reference number */
  diaCityContractRef: string | null;
  /** Whether this gig requires DefenseTech clearance */
  isDefenseTech: boolean;
}

// ---------------------------------------------------------------------------
// Types — Dispute Resolution
// ---------------------------------------------------------------------------

/** Dispute status. */
export type DisputeStatus = "filed" | "evidence-gathering" | "arbitration" | "resolved" | "appealed";

/** Dispute resolution outcome. */
export type DisputeOutcome =
  | "client-wins"
  | "contractor-wins"
  | "split"
  | "cancelled"
  | "withdrawn";

/** Evidence item in a dispute. */
export interface DisputeEvidence {
  /** IPFS hash of the evidence file */
  ipfsHash: string;
  /** Description of the evidence */
  description: string;
  /** Who submitted this evidence */
  submittedBy: string;
  /** ISO-8601 submission timestamp */
  submittedAt: string;
  /** File type (pdf, png, md, etc.) */
  fileType: string;
}

/** Dispute record. */
export interface Dispute {
  /** On-chain dispute ID */
  disputeId: string;
  /** Related gig contract address */
  gigContractAddress: string;
  /** Related milestone number */
  milestoneNumber: number;
  /** Party that filed the dispute */
  filedBy: string;
  /** Reason for the dispute */
  reason: string;
  /** Detailed description */
  description: string;
  /** Current status */
  status: DisputeStatus;
  /** Submitted evidence from both parties */
  evidence: DisputeEvidence[];
  /** Assigned arbitrator address */
  arbitratorAddress: string | null;
  /** Resolution outcome (once resolved) */
  outcome: DisputeOutcome | null;
  /** Resolution details */
  resolutionDetails: string | null;
  /** Amount awarded to each party */
  awardedToClient: bigint;
  /** Amount awarded to contractor */
  awardedToContractor: bigint;
  /** ISO-8601 filing date */
  filedAt: string;
  /** ISO-8601 resolution date */
  resolvedAt: string | null;
}

// ---------------------------------------------------------------------------
// Types — Vetting Pipeline
// ---------------------------------------------------------------------------

/** Stage in the DefenseTech contractor vetting pipeline. */
export type VettingStage =
  | "application-submitted"
  | "kyc-verification"
  | "background-check"
  | "skills-assessment"
  | "clearance-review"
  | "final-approval"
  | "approved"
  | "rejected";

/** Vetting pipeline record for a contractor. */
export interface VettingRecord {
  /** Contractor address */
  contractorAddress: string;
  /** Current vetting stage */
  currentStage: VettingStage;
  /** Results of each completed stage */
  stageResults: VettingStageResult[];
  /** ISO-8601 start date */
  startedAt: string;
  /** ISO-8601 completion date (once approved or rejected) */
  completedAt: string | null;
  /** Requested clearance level */
  requestedClearance: ClearanceLevel;
  /** Approved clearance level (may differ from requested) */
  approvedClearance: ClearanceLevel | null;
}

/** Result of a single vetting stage. */
export interface VettingStageResult {
  stage: VettingStage;
  passed: boolean;
  notes: string;
  reviewedBy: string;
  completedAt: string;
}

// ---------------------------------------------------------------------------
// Solidity Contract Interfaces (TypeScript representations)
// ---------------------------------------------------------------------------

/**
 * TypeScript interface mirroring the GigEscrow Solidity contract.
 * Used for off-chain interaction and type safety.
 */
export interface IGigEscrow {
  /** Create a new escrow for a gig contract */
  createEscrow(
    gigId: string,
    client: string,
    contractor: string,
    milestoneAmounts: bigint[],
    token: string,
    signers: string[],
    requiredSigs: number,
  ): Promise<string>; // Returns escrow address

  /** Client deposits funds into escrow */
  deposit(escrowId: string, amount: bigint): Promise<void>;

  /** Contractor submits milestone deliverable */
  submitMilestone(escrowId: string, milestoneIndex: number, deliverableHash: string): Promise<void>;

  /** Client approves milestone and triggers payment release */
  approveMilestone(escrowId: string, milestoneIndex: number): Promise<void>;

  /** Release escrowed funds for approved milestone (requires multi-sig) */
  releaseFunds(escrowId: string, milestoneIndex: number): Promise<void>;

  /** Initiate dispute for a milestone */
  disputeMilestone(escrowId: string, milestoneIndex: number, reason: string): Promise<string>;

  /** Get escrow balance */
  getBalance(escrowId: string): Promise<bigint>;

  /** Get milestone status */
  getMilestoneStatus(escrowId: string, milestoneIndex: number): Promise<Milestone["status"]>;
}

/**
 * TypeScript interface mirroring the ContractorRegistry Solidity contract.
 */
export interface IContractorRegistry {
  /** Register a new contractor */
  register(
    name: string,
    diaCityFopId: string,
    taxId: string,
    specializations: SpecializationDomain[],
  ): Promise<void>;

  /** Update contractor KYC status (admin only) */
  updateKycStatus(contractor: string, status: KycStatus, provider: string): Promise<void>;

  /** Update security clearance (admin only) */
  updateClearance(
    contractor: string,
    level: ClearanceLevel,
    expiry: number, // Unix timestamp
  ): Promise<void>;

  /** Get contractor profile */
  getContractor(address: string): Promise<Contractor>;

  /** Check if contractor meets gig requirements */
  meetsRequirements(
    contractor: string,
    requiredSpecializations: SpecializationDomain[],
    requiredClearance: ClearanceLevel,
  ): Promise<boolean>;

  /** Update reputation score (called by escrow on completion) */
  updateReputation(contractor: string, delta: number): Promise<void>;

  /** Get all contractors matching criteria */
  findContractors(
    specialization: SpecializationDomain,
    minClearance: ClearanceLevel,
    minReputation: number,
  ): Promise<Contractor[]>;
}

/**
 * TypeScript interface mirroring the DisputeResolution Solidity contract.
 */
export interface IDisputeResolution {
  /** File a new dispute */
  fileDispute(
    escrowAddress: string,
    milestoneIndex: number,
    reason: string,
    description: string,
  ): Promise<string>; // Returns dispute ID

  /** Submit evidence */
  submitEvidence(
    disputeId: string,
    ipfsHash: string,
    description: string,
    fileType: string,
  ): Promise<void>;

  /** Assign arbitrator (admin only) */
  assignArbitrator(disputeId: string, arbitrator: string): Promise<void>;

  /** Resolve dispute (arbitrator only) */
  resolveDispute(
    disputeId: string,
    outcome: DisputeOutcome,
    clientAmount: bigint,
    contractorAmount: bigint,
    details: string,
  ): Promise<void>;

  /** Appeal resolution (either party, within appeal window) */
  appealResolution(disputeId: string, reason: string): Promise<void>;

  /** Get dispute details */
  getDispute(disputeId: string): Promise<Dispute>;
}

// ---------------------------------------------------------------------------
// Framework Manager
// ---------------------------------------------------------------------------

/**
 * High-level manager for the Gig Contracts Framework.
 *
 * Orchestrates interactions between the escrow, registry, and dispute
 * resolution contracts. Provides a unified API for the platform.
 *
 * @example
 * ```ts
 * const framework = new GigContractFramework({
 *   escrow: escrowContract,
 *   registry: registryContract,
 *   disputes: disputeContract,
 * });
 *
 * const gig = await framework.createGig({ ... });
 * await framework.assignContractor(gig.gigId, contractorAddress);
 * ```
 */
export class GigContractFramework {
  private escrow: IGigEscrow;
  private registry: IContractorRegistry;
  private disputes: IDisputeResolution;
  private gigs: Map<string, GigContract> = new Map();
  private vettingRecords: Map<string, VettingRecord> = new Map();

  constructor(contracts: {
    escrow: IGigEscrow;
    registry: IContractorRegistry;
    disputes: IDisputeResolution;
  }) {
    this.escrow = contracts.escrow;
    this.registry = contracts.registry;
    this.disputes = contracts.disputes;
  }

  // -----------------------------------------------------------------------
  // Gig Lifecycle
  // -----------------------------------------------------------------------

  /**
   * Create a new gig contract.
   *
   * @param params - Gig creation parameters.
   * @returns Created gig contract object.
   */
  async createGig(params: {
    title: string;
    description: string;
    clientAddress: string;
    requiredSpecializations: SpecializationDomain[];
    requiredClearance: ClearanceLevel;
    milestones: Omit<Milestone, "status" | "deliverableHash" | "submittedAt" | "approvedAt">[];
    paymentToken: PaymentToken;
    multiSigSigners: string[];
    requiredSignatures: number;
    isDefenseTech: boolean;
    diaCityContractRef?: string;
  }): Promise<GigContract> {
    const gigId = `GIG-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const milestones: Milestone[] = params.milestones.map((m) => ({
      ...m,
      status: "pending" as const,
      deliverableHash: null,
      submittedAt: null,
      approvedAt: null,
    }));

    const totalValue = milestones.reduce((sum, m) => sum + m.amount, 0n);

    const gig: GigContract = {
      contractAddress: null,
      gigId,
      title: params.title,
      description: params.description,
      clientAddress: params.clientAddress,
      contractorAddress: null,
      requiredSpecializations: params.requiredSpecializations,
      requiredClearance: params.requiredClearance,
      milestones,
      totalValue,
      paymentToken: params.paymentToken,
      escrowAddress: null,
      multiSigSigners: params.multiSigSigners,
      requiredSignatures: params.requiredSignatures,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      diaCityContractRef: params.diaCityContractRef ?? null,
      isDefenseTech: params.isDefenseTech,
    };

    this.gigs.set(gigId, gig);
    return gig;
  }

  /**
   * Publish a gig so contractors can apply.
   *
   * @param gigId - Gig identifier.
   */
  async publishGig(gigId: string): Promise<GigContract> {
    const gig = this.getGigOrThrow(gigId);
    if (gig.status !== "draft") {
      throw new Error(`Cannot publish gig in status: ${gig.status}`);
    }
    gig.status = "published";
    gig.updatedAt = new Date().toISOString();
    return gig;
  }

  /**
   * Assign a contractor to a gig after vetting.
   *
   * Verifies the contractor meets all requirements (KYC, clearance,
   * specializations) before assignment. Creates the on-chain escrow.
   *
   * @param gigId - Gig identifier.
   * @param contractorAddress - Contractor's Ethereum address.
   */
  async assignContractor(gigId: string, contractorAddress: string): Promise<GigContract> {
    const gig = this.getGigOrThrow(gigId);
    if (gig.status !== "published" && gig.status !== "applied") {
      throw new Error(`Cannot assign contractor to gig in status: ${gig.status}`);
    }

    // Verify contractor eligibility
    const eligible = await this.registry.meetsRequirements(
      contractorAddress,
      gig.requiredSpecializations,
      gig.requiredClearance,
    );

    if (!eligible) {
      throw new Error(
        `Contractor ${contractorAddress} does not meet gig requirements`,
      );
    }

    // For DefenseTech gigs, verify active clearance
    if (gig.isDefenseTech) {
      const contractor = await this.registry.getContractor(contractorAddress);
      if (contractor.kycStatus !== "verified") {
        throw new Error("DefenseTech gigs require verified KYC");
      }
      if (contractor.clearanceLevel === "none") {
        throw new Error("DefenseTech gigs require security clearance");
      }
    }

    // Create on-chain escrow
    const milestoneAmounts = gig.milestones.map((m) => m.amount);
    const escrowAddress = await this.escrow.createEscrow(
      gig.gigId,
      gig.clientAddress,
      contractorAddress,
      milestoneAmounts,
      gig.paymentToken,
      gig.multiSigSigners,
      gig.requiredSignatures,
    );

    gig.contractorAddress = contractorAddress;
    gig.escrowAddress = escrowAddress;
    gig.status = "assigned";
    gig.updatedAt = new Date().toISOString();

    return gig;
  }

  /**
   * Start work on a gig (contractor action).
   *
   * @param gigId - Gig identifier.
   */
  async startWork(gigId: string): Promise<GigContract> {
    const gig = this.getGigOrThrow(gigId);
    if (gig.status !== "assigned") {
      throw new Error(`Cannot start work on gig in status: ${gig.status}`);
    }

    gig.status = "in-progress";
    gig.milestones[0].status = "in-progress";
    gig.updatedAt = new Date().toISOString();
    return gig;
  }

  /**
   * Submit a milestone deliverable (contractor action).
   *
   * @param gigId - Gig identifier.
   * @param milestoneNumber - 1-based milestone number.
   * @param deliverableHash - IPFS hash of the deliverable.
   */
  async submitMilestone(
    gigId: string,
    milestoneNumber: number,
    deliverableHash: string,
  ): Promise<Milestone> {
    const gig = this.getGigOrThrow(gigId);
    const milestone = this.getMilestoneOrThrow(gig, milestoneNumber);

    if (milestone.status !== "in-progress" && milestone.status !== "rejected") {
      throw new Error(`Cannot submit milestone in status: ${milestone.status}`);
    }

    await this.escrow.submitMilestone(gig.escrowAddress!, milestoneNumber - 1, deliverableHash);

    milestone.status = "submitted";
    milestone.deliverableHash = deliverableHash;
    milestone.submittedAt = new Date().toISOString();
    gig.status = "review";
    gig.updatedAt = new Date().toISOString();

    return milestone;
  }

  /**
   * Approve a milestone and release payment (client action).
   *
   * @param gigId - Gig identifier.
   * @param milestoneNumber - 1-based milestone number.
   */
  async approveMilestone(gigId: string, milestoneNumber: number): Promise<Milestone> {
    const gig = this.getGigOrThrow(gigId);
    const milestone = this.getMilestoneOrThrow(gig, milestoneNumber);

    if (milestone.status !== "submitted") {
      throw new Error(`Cannot approve milestone in status: ${milestone.status}`);
    }

    await this.escrow.approveMilestone(gig.escrowAddress!, milestoneNumber - 1);
    await this.escrow.releaseFunds(gig.escrowAddress!, milestoneNumber - 1);

    milestone.status = "approved";
    milestone.approvedAt = new Date().toISOString();

    // Update reputation
    await this.registry.updateReputation(gig.contractorAddress!, 5);

    // Check if all milestones are complete
    const allComplete = gig.milestones.every((m) => m.status === "approved");
    if (allComplete) {
      gig.status = "completed";
    } else {
      // Start next milestone
      const nextMilestone = gig.milestones.find((m) => m.status === "pending");
      if (nextMilestone) {
        nextMilestone.status = "in-progress";
        gig.status = "in-progress";
      }
    }

    gig.updatedAt = new Date().toISOString();
    return milestone;
  }

  /**
   * Reject a milestone (client action).
   *
   * @param gigId - Gig identifier.
   * @param milestoneNumber - 1-based milestone number.
   * @param reason - Reason for rejection.
   */
  async rejectMilestone(
    gigId: string,
    milestoneNumber: number,
    reason: string,
  ): Promise<Milestone> {
    const gig = this.getGigOrThrow(gigId);
    const milestone = this.getMilestoneOrThrow(gig, milestoneNumber);

    if (milestone.status !== "submitted") {
      throw new Error(`Cannot reject milestone in status: ${milestone.status}`);
    }

    milestone.status = "rejected";
    gig.status = "in-progress";
    gig.updatedAt = new Date().toISOString();

    return milestone;
  }

  // -----------------------------------------------------------------------
  // Dispute Resolution
  // -----------------------------------------------------------------------

  /**
   * File a dispute for a milestone.
   *
   * @param gigId - Gig identifier.
   * @param milestoneNumber - 1-based milestone number.
   * @param reason - Short reason for the dispute.
   * @param description - Detailed dispute description.
   * @returns Dispute ID.
   */
  async fileDispute(
    gigId: string,
    milestoneNumber: number,
    reason: string,
    description: string,
  ): Promise<string> {
    const gig = this.getGigOrThrow(gigId);
    const milestone = this.getMilestoneOrThrow(gig, milestoneNumber);

    const disputeId = await this.disputes.fileDispute(
      gig.escrowAddress!,
      milestoneNumber - 1,
      reason,
      description,
    );

    milestone.status = "disputed";
    gig.status = "disputed";
    gig.updatedAt = new Date().toISOString();

    return disputeId;
  }

  // -----------------------------------------------------------------------
  // Vetting Pipeline
  // -----------------------------------------------------------------------

  /**
   * Start the DefenseTech contractor vetting pipeline.
   *
   * @param contractorAddress - Contractor's Ethereum address.
   * @param requestedClearance - Desired security clearance level.
   */
  async startVetting(
    contractorAddress: string,
    requestedClearance: ClearanceLevel,
  ): Promise<VettingRecord> {
    const record: VettingRecord = {
      contractorAddress,
      currentStage: "application-submitted",
      stageResults: [],
      startedAt: new Date().toISOString(),
      completedAt: null,
      requestedClearance,
      approvedClearance: null,
    };

    this.vettingRecords.set(contractorAddress, record);
    return record;
  }

  /**
   * Advance a contractor to the next vetting stage.
   *
   * @param contractorAddress - Contractor's address.
   * @param passed - Whether the current stage was passed.
   * @param notes - Reviewer notes.
   * @param reviewedBy - Reviewer identifier.
   */
  async advanceVetting(
    contractorAddress: string,
    passed: boolean,
    notes: string,
    reviewedBy: string,
  ): Promise<VettingRecord> {
    const record = this.vettingRecords.get(contractorAddress);
    if (!record) {
      throw new Error(`No vetting record found for ${contractorAddress}`);
    }

    record.stageResults.push({
      stage: record.currentStage,
      passed,
      notes,
      reviewedBy,
      completedAt: new Date().toISOString(),
    });

    if (!passed) {
      record.currentStage = "rejected";
      record.completedAt = new Date().toISOString();
      return record;
    }

    // Advance to next stage
    const stageOrder: VettingStage[] = [
      "application-submitted",
      "kyc-verification",
      "background-check",
      "skills-assessment",
      "clearance-review",
      "final-approval",
      "approved",
    ];

    const currentIndex = stageOrder.indexOf(record.currentStage);
    if (currentIndex < stageOrder.length - 1) {
      record.currentStage = stageOrder[currentIndex + 1];
    }

    if (record.currentStage === "approved") {
      record.completedAt = new Date().toISOString();
      record.approvedClearance = record.requestedClearance;

      // Update on-chain clearance
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      await this.registry.updateClearance(
        contractorAddress,
        record.requestedClearance,
        Math.floor(expiryDate.getTime() / 1000),
      );

      // Update KYC status
      await this.registry.updateKycStatus(contractorAddress, "verified", "vetting-pipeline");
    }

    return record;
  }

  /**
   * Get vetting record for a contractor.
   *
   * @param contractorAddress - Contractor's address.
   */
  getVettingRecord(contractorAddress: string): VettingRecord | undefined {
    return this.vettingRecords.get(contractorAddress);
  }

  // -----------------------------------------------------------------------
  // Queries
  // -----------------------------------------------------------------------

  /** Get a gig by ID. */
  getGig(gigId: string): GigContract | undefined {
    return this.gigs.get(gigId);
  }

  /** Get all gigs. */
  getAllGigs(): GigContract[] {
    return Array.from(this.gigs.values());
  }

  /** Get gigs by status. */
  getGigsByStatus(status: GigStatus): GigContract[] {
    return this.getAllGigs().filter((g) => g.status === status);
  }

  /** Get gigs assigned to a contractor. */
  getContractorGigs(contractorAddress: string): GigContract[] {
    return this.getAllGigs().filter((g) => g.contractorAddress === contractorAddress);
  }

  // -----------------------------------------------------------------------
  // Internal Helpers
  // -----------------------------------------------------------------------

  /** Get a gig or throw if not found. */
  private getGigOrThrow(gigId: string): GigContract {
    const gig = this.gigs.get(gigId);
    if (!gig) throw new Error(`Gig not found: ${gigId}`);
    return gig;
  }

  /** Get a milestone or throw if not found. */
  private getMilestoneOrThrow(gig: GigContract, milestoneNumber: number): Milestone {
    const milestone = gig.milestones.find((m) => m.number === milestoneNumber);
    if (!milestone) {
      throw new Error(`Milestone ${milestoneNumber} not found in gig ${gig.gigId}`);
    }
    return milestone;
  }
}
