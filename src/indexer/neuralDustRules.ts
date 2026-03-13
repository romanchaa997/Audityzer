/**
 * Neural Dust Packet Processing Rules
 *
 * Processes ultrasound backscatter packets from neural dust motes and
 * applies three security rules:
 *   1. Spoofing detection (carrier-freq deviation, SNR, mote auth)
 *   2. DoS via RF energy denial (amplitude starvation)
 *   3. Stiction-induced resonance drift (NEMS failure mode)
 *
 * Each rule emits a SecurityEvent persisted via Prisma and returns
 * structured KPI data for SARIF/BRAVE1 reporting.
 */

import { PrismaClient } from '@prisma/client';
import { detectAnomaly, detectResonanceDrift } from './ml/svmEnergy';

// ─── Types ───────────────────────────────────────────────────────────

export interface UltrasoundPacket {
  /** Unix epoch timestamp in milliseconds */
  timestamp: number;
  /** Ultrasound carrier frequency in MHz (nominal ~1.8 MHz) */
  carrierFreq: number;
  /** Backscatter amplitude in arbitrary units */
  amplitude: number;
  /** Phase shift in radians */
  phaseShift: number;
  /** Backscatter modulation depth (0-1) */
  backscatterModulation: number;
  /** Unique mote identifier */
  moteID: string;
  /** Signal-to-noise ratio in dB */
  snr: number;
}

export interface SecurityEventData {
  type: 'NEURAL_DUST_SPOOFING' | 'NEURAL_DUST_DOS' | 'NEMS_STICTION' | 'STICTION_DATA_POISONING';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  packetData: Record<string, unknown>;
  kpiData: Record<string, unknown>;
}

interface RuleResult {
  triggered: boolean;
  event: SecurityEventData | null;
}

// ─── Constants ───────────────────────────────────────────────────────

/** Maximum acceptable carrier frequency deviation from nominal (MHz) */
const CARRIER_FREQ_DEVIATION_LIMIT = 0.05;

/** Minimum acceptable SNR in dB */
const MIN_SNR_DB = 8;

/** Amplitude ratio below which energy starvation is flagged */
const ENERGY_STARVATION_RATIO = 0.6;

/** Resonance drift threshold (Hz) above which stiction is suspected */
const DRIFT_THRESHOLD = 5;

/** Nominal carrier frequency for neural dust ultrasound (MHz) */
const NOMINAL_CARRIER_FREQ = 1.8;

// ─── Prisma Client ───────────────────────────────────────────────────

const prisma = new PrismaClient();

// ─── Rule 1: Spoofing Detection ─────────────────────────────────────

/**
 * Detect mote spoofing via carrier-frequency deviation, low SNR,
 * and mote-registry authentication status.
 *
 * A packet is flagged when:
 * - Carrier frequency deviates >0.05 MHz from nominal, OR
 * - SNR falls below 8 dB, OR
 * - The mote's public key is not in the registry / status is COMPROMISED
 */
async function ruleSpoofingDetection(packet: UltrasoundPacket): Promise<RuleResult> {
  const freqDeviation = Math.abs(packet.carrierFreq - NOMINAL_CARRIER_FREQ);
  const freqSuspect = freqDeviation > CARRIER_FREQ_DEVIATION_LIMIT;
  const snrSuspect = packet.snr < MIN_SNR_DB;

  // Verify mote authentication against the registry
  const mote = await prisma.moteRegistry.findUnique({
    where: { moteID: packet.moteID },
  });
  const authFailed = !mote || mote.status === 'COMPROMISED';

  if (!freqSuspect && !snrSuspect && !authFailed) {
    return { triggered: false, event: null };
  }

  const reasons: string[] = [];
  if (freqSuspect) reasons.push(`carrier deviation ${freqDeviation.toFixed(3)} MHz`);
  if (snrSuspect) reasons.push(`SNR ${packet.snr.toFixed(1)} dB < ${MIN_SNR_DB} dB`);
  if (authFailed) reasons.push(mote ? 'mote status COMPROMISED' : 'mote not in registry');

  const severity: SecurityEventData['severity'] =
    authFailed ? 'CRITICAL' : freqSuspect && snrSuspect ? 'HIGH' : 'MEDIUM';

  return {
    triggered: true,
    event: {
      type: 'NEURAL_DUST_SPOOFING',
      severity,
      packetData: { ...packet },
      kpiData: {
        freqDeviation,
        snr: packet.snr,
        authVerified: !authFailed,
        spoofRejectRate: '99%', // target KPI per threat taxonomy
        reasons,
      },
    },
  };
}

// ─── Rule 2: DoS via Energy Denial ──────────────────────────────────

/**
 * Detect RF energy-denial attacks by comparing the current amplitude
 * against the mote's historical average harvested power.
 *
 * Flags when amplitude drops below 60% of the historical mean,
 * confirmed by the SVM anomaly detector.
 */
async function ruleEnergyDenial(packet: UltrasoundPacket): Promise<RuleResult> {
  // Fetch historical power readings for this mote
  const history = await prisma.historicalMotePower.findMany({
    where: { moteID: packet.moteID },
    orderBy: { measuredAt: 'desc' },
    take: 50,
  });

  if (history.length === 0) {
    return { triggered: false, event: null };
  }

  const historicalMean = history.reduce((sum, h) => sum + h.harvestedPower, 0) / history.length;
  const amplitudeRatio = historicalMean > 0 ? packet.amplitude / historicalMean : 1;

  // Confirm with SVM anomaly detector
  const anomaly = detectAnomaly(
    {
      harvestedPower: packet.amplitude,
      backscatterModulation: packet.backscatterModulation,
      snr: packet.snr,
      carrierFreq: packet.carrierFreq,
    },
    historicalMean,
  );

  if (amplitudeRatio >= ENERGY_STARVATION_RATIO && !anomaly.isAnomaly) {
    return { triggered: false, event: null };
  }

  return {
    triggered: true,
    event: {
      type: 'NEURAL_DUST_DOS',
      severity: amplitudeRatio < 0.3 ? 'CRITICAL' : 'HIGH',
      packetData: { ...packet },
      kpiData: {
        amplitudeRatio,
        historicalMean,
        svmConfidence: anomaly.confidence,
        svmDescription: anomaly.description,
        detectionAccuracy: '92%', // target KPI per threat taxonomy
      },
    },
  };
}

// ─── Rule 3: Stiction-Induced Drift ─────────────────────────────────

/**
 * Monitor resonance-frequency drift that indicates NEMS stiction.
 *
 * Pulls recent frequency logs for the mote and uses the SVM drift
 * detector to classify whether stiction is the root cause. Drift
 * magnitude exceeding the threshold (>5 Hz) triggers an alert.
 */
async function ruleStictionDrift(packet: UltrasoundPacket): Promise<RuleResult> {
  // Fetch resonance frequency history
  const freqLogs = await prisma.resonanceFrequencyLog.findMany({
    where: { moteID: packet.moteID },
    orderBy: { measuredAt: 'desc' },
    take: 50,
  });

  if (freqLogs.length < 10) {
    return { triggered: false, event: null };
  }

  const readings = freqLogs.map(l => l.frequency);
  const baseline = readings[readings.length - 1]; // oldest reading as baseline

  const driftResult = detectResonanceDrift(readings, baseline, DRIFT_THRESHOLD);

  if (!driftResult.driftDetected) {
    return { triggered: false, event: null };
  }

  const eventType: SecurityEventData['type'] = driftResult.stictionLikely
    ? 'NEMS_STICTION'
    : 'NEMS_STICTION';

  return {
    triggered: true,
    event: {
      type: eventType,
      severity: driftResult.driftMagnitude > 10 ? 'CRITICAL' : 'HIGH',
      packetData: { ...packet },
      kpiData: {
        driftMagnitude: driftResult.driftMagnitude,
        driftRate: driftResult.driftRate,
        stictionLikely: driftResult.stictionLikely,
        baselineFrequency: baseline,
        recoveryRate: '95%', // target KPI per piezoelectric RESET paper
        driftThreshold: DRIFT_THRESHOLD,
      },
    },
  };
}

// ─── Main Processor ─────────────────────────────────────────────────

/**
 * Process a single ultrasound backscatter packet through all three
 * security rules. Persists any triggered events to the database.
 *
 * @param packet - Decoded ultrasound packet from the neural dust mote
 * @returns Array of security events that were triggered (may be empty)
 */
export async function processNeuralDustPacket(
  packet: UltrasoundPacket,
): Promise<SecurityEventData[]> {
  const events: SecurityEventData[] = [];

  // Run all three rules
  const [spoofResult, dosResult, stictionResult] = await Promise.all([
    ruleSpoofingDetection(packet),
    ruleEnergyDenial(packet),
    ruleStictionDrift(packet),
  ]);

  for (const result of [spoofResult, dosResult, stictionResult]) {
    if (result.triggered && result.event) {
      events.push(result.event);

      // Persist the security event
      await prisma.securityEvent.create({
        data: {
          type: result.event.type,
          severity: result.event.severity,
          packetData: result.event.packetData,
          kpiData: result.event.kpiData,
          createdAt: new Date(),
        },
      });

      // Update mote status if spoofing or critical stiction detected
      if (
        result.event.type === 'NEURAL_DUST_SPOOFING' &&
        result.event.severity === 'CRITICAL'
      ) {
        await prisma.moteRegistry.update({
          where: { moteID: packet.moteID },
          data: { status: 'COMPROMISED' },
        });
      } else if (result.event.type === 'NEURAL_DUST_SPOOFING') {
        await prisma.moteRegistry.update({
          where: { moteID: packet.moteID },
          data: { status: 'SUSPECT' },
        });
      }
    }
  }

  // Always update last-seen timestamp
  await prisma.moteRegistry.upsert({
    where: { moteID: packet.moteID },
    update: { lastSeen: new Date() },
    create: {
      moteID: packet.moteID,
      publicKey: '',
      lastSeen: new Date(),
      status: 'ACTIVE',
    },
  });

  return events;
}
