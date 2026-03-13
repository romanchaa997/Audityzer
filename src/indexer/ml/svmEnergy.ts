/**
 * SVM-based Energy Anomaly Detector for Neural Dust motes.
 *
 * Runs a one-class SVM over harvested-power and backscatter-modulation
 * features to flag RF energy-denial (DoS) and stiction-induced resonance
 * drift in real time.
 *
 * TODO: Replace placeholder implementations with trained SVM model
 *       inference once labelled field data is available.
 */

// ─── Types ───────────────────────────────────────────────────────────

export interface EnergyFeatureVector {
  /** Harvested power reading in microwatts */
  harvestedPower: number;
  /** Backscatter modulation depth (0-1) */
  backscatterModulation: number;
  /** Signal-to-noise ratio in dB */
  snr: number;
  /** Carrier frequency in MHz */
  carrierFreq: number;
}

export interface AnomalyResult {
  /** Whether the sample is classified as anomalous */
  isAnomaly: boolean;
  /** Confidence score (0-1). Higher = more confident it is anomalous */
  confidence: number;
  /** Human-readable description of the anomaly type */
  description: string;
}

export interface ResonanceDriftResult {
  /** Whether significant drift has been detected */
  driftDetected: boolean;
  /** Magnitude of the drift in Hz */
  driftMagnitude: number;
  /** Rate of drift in Hz/s */
  driftRate: number;
  /** Whether stiction is the likely root cause */
  stictionLikely: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────

/** Default anomaly threshold for the one-class SVM decision function */
const DEFAULT_ANOMALY_THRESHOLD = 0.5;

/** Minimum number of historical samples required for drift detection */
const MIN_DRIFT_SAMPLES = 10;

// ─── Anomaly Detection ──────────────────────────────────────────────

/**
 * Detect energy-level anomalies using a one-class SVM.
 *
 * @param features - Current energy feature vector from the mote
 * @param historicalMean - Historical mean harvested power for this mote
 * @param threshold - SVM decision boundary threshold (default 0.5)
 * @returns Anomaly classification result
 *
 * TODO: Load a pre-trained SVM model (e.g. via ONNX runtime) and run
 *       real inference instead of the heuristic below.
 */
export function detectAnomaly(
  features: EnergyFeatureVector,
  historicalMean: number,
  threshold: number = DEFAULT_ANOMALY_THRESHOLD,
): AnomalyResult {
  // TODO: Replace heuristic with trained SVM model inference
  const powerRatio = historicalMean > 0 ? features.harvestedPower / historicalMean : 0;
  const snrNorm = features.snr / 20; // normalise to ~0-1 range

  // Simple decision function placeholder — mimics one-class SVM boundary
  const score = 1 - (powerRatio * 0.6 + snrNorm * 0.4);

  const isAnomaly = score > threshold;

  let description = 'Normal operating conditions';
  if (isAnomaly && powerRatio < 0.6) {
    description = `Energy starvation detected: power at ${(powerRatio * 100).toFixed(1)}% of historical mean`;
  } else if (isAnomaly && snrNorm < 0.4) {
    description = `Low SNR anomaly: ${features.snr.toFixed(1)} dB — possible RF interference`;
  } else if (isAnomaly) {
    description = `Combined energy/SNR anomaly (score ${score.toFixed(3)})`;
  }

  return { isAnomaly, confidence: Math.min(score, 1), description };
}

// ─── Resonance Drift Detection ──────────────────────────────────────

/**
 * Detect resonance-frequency drift that may indicate NEMS stiction.
 *
 * Compares a sliding window of frequency readings against the mote's
 * baseline resonance frequency. A drift rate exceeding the threshold
 * is flagged as stiction-likely.
 *
 * @param frequencyReadings - Recent resonance frequency samples (Hz)
 * @param baselineFrequency - Expected resonance frequency (Hz)
 * @param driftThreshold - Maximum acceptable drift magnitude (Hz)
 * @returns Drift classification result
 *
 * TODO: Integrate with trained SVM for multi-variate drift classification
 *       incorporating temperature, humidity, and acceleration data.
 */
export function detectResonanceDrift(
  frequencyReadings: number[],
  baselineFrequency: number,
  driftThreshold: number = 5,
): ResonanceDriftResult {
  if (frequencyReadings.length < MIN_DRIFT_SAMPLES) {
    return {
      driftDetected: false,
      driftMagnitude: 0,
      driftRate: 0,
      stictionLikely: false,
    };
  }

  // TODO: Replace linear regression with SVM-based drift classifier
  const recent = frequencyReadings.slice(-MIN_DRIFT_SAMPLES);
  const deviations = recent.map(f => Math.abs(f - baselineFrequency));
  const meanDeviation = deviations.reduce((a, b) => a + b, 0) / deviations.length;

  // Estimate drift rate via simple finite difference
  const firstHalf = deviations.slice(0, Math.floor(deviations.length / 2));
  const secondHalf = deviations.slice(Math.floor(deviations.length / 2));
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const driftRate = avgSecond - avgFirst;

  const driftDetected = meanDeviation > driftThreshold;
  const stictionLikely = driftDetected && driftRate > 0;

  return {
    driftDetected,
    driftMagnitude: meanDeviation,
    driftRate,
    stictionLikely,
  };
}
