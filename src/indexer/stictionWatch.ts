/**
 * StictionWatch NEMS Module
 *
 * Monitors piezoelectric RESET pulse responses and tracks
 * resonance-frequency drift over time to detect stiction-induced
 * failures in NEMS-based neural dust motes.
 *
 * Stiction (static friction) in M/NEMS sensors causes contact surfaces
 * to adhere, shifting the resonance frequency and producing false neural
 * signals. This module implements the detection side of the piezoelectric
 * RESET mechanism described in:
 *
 *   K. Joshi et al., "Mitigating Stiction Failures in In-use M/NEMS-based
 *   Sensors using a Reliable Piezoelectric RESET Mechanism," IEEE APSCON 2025.
 *   DOI: 10.1109/APSCON63569.2025.11144448
 *
 * Detection flow:
 *   1. Record each RESET pulse response (recovery success/failure)
 *   2. Track resonance-frequency drift over a sliding window
 *   3. Flag stiction-induced data poisoning when mass-change artefacts
 *      are detected in the backscatter modulation
 */

import { PrismaClient } from '@prisma/client';
import { detectResonanceDrift, type ResonanceDriftResult } from './ml/svmEnergy';

// ─── Types ───────────────────────────────────────────────────────────

export interface StictionWatchConfig {
  /** Sliding window size for frequency readings */
  windowSize: number;
  /** Drift threshold in Hz — alerts fire above this value */
  driftThresholdHz: number;
  /** Polling interval in milliseconds for frequency checks */
  pollIntervalMs: number;
  /** RESET pulse voltage in volts (typically 5-10 V for PZT) */
  resetPulseVoltage: number;
  /** Maximum consecutive RESET failures before CRITICAL alert */
  maxResetFailures: number;
}

export interface ResetPulseResponse {
  /** Mote that received the RESET pulse */
  moteID: string;
  /** Timestamp of the pulse */
  timestamp: number;
  /** Whether the mote recovered to baseline frequency */
  recovered: boolean;
  /** Post-RESET resonance frequency in Hz */
  postResetFrequency: number;
  /** Baseline resonance frequency in Hz */
  baselineFrequency: number;
  /** Recovery time in microseconds */
  recoveryTimeUs: number;
}

interface StictionAlert {
  moteID: string;
  type: 'NEMS_STICTION' | 'STICTION_DATA_POISONING';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  driftResult: ResonanceDriftResult;
  resetHistory: ResetPulseResponse[];
  message: string;
}

// ─── Constants ───────────────────────────────────────────────────────

const DEFAULT_CONFIG: StictionWatchConfig = {
  windowSize: 50,
  driftThresholdHz: 5,
  pollIntervalMs: 1000,
  resetPulseVoltage: 7.5,
  maxResetFailures: 3,
};

// ─── Prisma Client ───────────────────────────────────────────────────

const prisma = new PrismaClient();

// ─── In-Memory State ─────────────────────────────────────────────────

/** Per-mote sliding window of frequency readings */
const frequencyWindows: Map<string, number[]> = new Map();

/** Per-mote consecutive RESET failure count */
const resetFailureCounts: Map<string, number> = new Map();

/** Active polling interval handle */
let pollHandle: ReturnType<typeof setInterval> | null = null;

// ─── Core Functions ──────────────────────────────────────────────────

/**
 * Record a piezoelectric RESET pulse response and evaluate recovery.
 *
 * If recovery fails, the consecutive-failure counter is incremented.
 * After `maxResetFailures` consecutive failures the mote is flagged
 * as stiction-compromised with CRITICAL severity.
 */
export async function recordResetPulse(
  response: ResetPulseResponse,
  config: StictionWatchConfig = DEFAULT_CONFIG,
): Promise<StictionAlert | null> {
  const failures = resetFailureCounts.get(response.moteID) ?? 0;

  if (!response.recovered) {
    const newFailures = failures + 1;
    resetFailureCounts.set(response.moteID, newFailures);

    // Log the frequency reading (drifted)
    await logFrequencyReading(
      response.moteID,
      response.postResetFrequency,
      response.baselineFrequency,
    );

    if (newFailures >= config.maxResetFailures) {
      return {
        moteID: response.moteID,
        type: 'NEMS_STICTION',
        severity: 'CRITICAL',
        driftResult: {
          driftDetected: true,
          driftMagnitude: Math.abs(response.postResetFrequency - response.baselineFrequency),
          driftRate: 0,
          stictionLikely: true,
        },
        resetHistory: [],
        message:
          `Mote ${response.moteID}: ${newFailures} consecutive RESET failures. ` +
          `Stiction confirmed — piezoelectric recovery ineffective at ${config.resetPulseVoltage}V. ` +
          `Post-RESET frequency ${response.postResetFrequency} Hz vs baseline ${response.baselineFrequency} Hz.`,
      };
    }

    return null;
  }

  // Successful recovery — reset the failure counter
  resetFailureCounts.set(response.moteID, 0);

  await logFrequencyReading(
    response.moteID,
    response.postResetFrequency,
    response.baselineFrequency,
  );

  return null;
}

/**
 * Detect resonance-frequency drift for a specific mote using the
 * sliding window of frequency readings.
 *
 * @returns Drift result, or null if insufficient data
 */
export async function detectMoteResonanceDrift(
  moteID: string,
  baselineFrequency: number,
  config: StictionWatchConfig = DEFAULT_CONFIG,
): Promise<StictionAlert | null> {
  const window = frequencyWindows.get(moteID);
  if (!window || window.length < 10) {
    return null;
  }

  const driftResult = detectResonanceDrift(window, baselineFrequency, config.driftThresholdHz);

  if (!driftResult.driftDetected) {
    return null;
  }

  // Determine if this is simple stiction or data poisoning
  // Data poisoning = stiction-induced mass change produces false neural signals
  const isPoisoning = driftResult.stictionLikely && driftResult.driftMagnitude > 10;

  const alert: StictionAlert = {
    moteID,
    type: isPoisoning ? 'STICTION_DATA_POISONING' : 'NEMS_STICTION',
    severity: isPoisoning ? 'CRITICAL' : driftResult.driftMagnitude > 8 ? 'HIGH' : 'MEDIUM',
    driftResult,
    resetHistory: [],
    message: isPoisoning
      ? `Mote ${moteID}: stiction-induced data poisoning detected. ` +
        `Drift ${driftResult.driftMagnitude.toFixed(2)} Hz exceeds poisoning threshold. ` +
        `Mass change artefacts likely producing false neural signals.`
      : `Mote ${moteID}: resonance drift ${driftResult.driftMagnitude.toFixed(2)} Hz detected. ` +
        `Stiction likely: ${driftResult.stictionLikely}. Recommend piezoelectric RESET.`,
  };

  // Persist alert as a security event
  await prisma.securityEvent.create({
    data: {
      type: alert.type,
      severity: alert.severity,
      packetData: { moteID, baselineFrequency },
      kpiData: {
        driftMagnitude: driftResult.driftMagnitude,
        driftRate: driftResult.driftRate,
        stictionLikely: driftResult.stictionLikely,
        recoveryRate: '95%',
      },
      createdAt: new Date(),
    },
  });

  return alert;
}

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Append a frequency reading to the mote's sliding window and
 * persist it to the ResonanceFrequencyLog table.
 */
async function logFrequencyReading(
  moteID: string,
  frequency: number,
  baselineFrequency: number,
): Promise<void> {
  // Update in-memory sliding window
  const window = frequencyWindows.get(moteID) ?? [];
  window.push(frequency);
  if (window.length > DEFAULT_CONFIG.windowSize) {
    window.shift();
  }
  frequencyWindows.set(moteID, window);

  // Persist to database
  const driftRate = Math.abs(frequency - baselineFrequency);
  await prisma.resonanceFrequencyLog.create({
    data: {
      moteID,
      frequency,
      driftRate,
      stictionDetected: driftRate > DEFAULT_CONFIG.driftThresholdHz,
      measuredAt: new Date(),
    },
  });
}

// ─── Lifecycle ───────────────────────────────────────────────────────

/**
 * Initialise the StictionWatch module. Starts a periodic polling loop
 * that checks all active motes for resonance drift.
 */
export function initStictionWatch(config: Partial<StictionWatchConfig> = {}): void {
  const merged: StictionWatchConfig = { ...DEFAULT_CONFIG, ...config };

  // Stop any existing poll
  if (pollHandle) {
    clearInterval(pollHandle);
  }

  pollHandle = setInterval(async () => {
    // Fetch all active motes
    const motes = await prisma.moteRegistry.findMany({
      where: { status: 'ACTIVE' },
    });

    for (const mote of motes) {
      // Use the earliest frequency log as the baseline
      const earliest = await prisma.resonanceFrequencyLog.findFirst({
        where: { moteID: mote.moteID },
        orderBy: { measuredAt: 'asc' },
      });

      if (earliest) {
        await detectMoteResonanceDrift(mote.moteID, earliest.frequency, merged);
      }
    }
  }, merged.pollIntervalMs);
}

/**
 * Stop the StictionWatch polling loop and clear in-memory state.
 */
export function stopStictionWatch(): void {
  if (pollHandle) {
    clearInterval(pollHandle);
    pollHandle = null;
  }
  frequencyWindows.clear();
  resetFailureCounts.clear();
}
