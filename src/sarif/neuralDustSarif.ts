/**
 * SARIF 2.1.0 Output Generator for Neural Dust & NEMS Stiction Security
 *
 * Generates GitHub-compatible SARIF reports for BRAVE1/NATO DIANA
 * submission readiness. Covers four custom rules:
 *
 *   NEMS_STICTION_001 — Stiction-induced resonance drift
 *   ND_SPOOF_001     — Neural dust mote spoofing
 *   ND_DOS_001       — RF energy-denial (DoS)
 *   ND_POISON_001    — Stiction-enabled data poisoning
 *
 * Spec: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
 */

import type { SecurityEventData } from '../indexer/neuralDustRules';

// ─── SARIF Types ─────────────────────────────────────────────────────

interface SarifMessage {
  text: string;
}

interface SarifArtifactLocation {
  uri: string;
}

interface SarifPhysicalLocation {
  artifactLocation: SarifArtifactLocation;
}

interface SarifLocation {
  physicalLocation: SarifPhysicalLocation;
}

interface SarifResult {
  ruleId: string;
  ruleIndex: number;
  level: 'none' | 'note' | 'warning' | 'error';
  message: SarifMessage;
  locations: SarifLocation[];
  properties: Record<string, unknown>;
}

interface SarifRule {
  id: string;
  name: string;
  shortDescription: SarifMessage;
  fullDescription: SarifMessage;
  helpUri: string;
  properties: {
    'security-severity': string;
    tags: string[];
    [key: string]: unknown;
  };
}

interface SarifRun {
  tool: {
    driver: {
      name: string;
      informationUri: string;
      version: string;
      rules: SarifRule[];
    };
  };
  results: SarifResult[];
}

interface SarifLog {
  $schema: string;
  version: string;
  runs: SarifRun[];
}

// ─── Rule Definitions ────────────────────────────────────────────────

const SARIF_RULES: SarifRule[] = [
  {
    id: 'NEMS_STICTION_001',
    name: 'NEMS stiction-induced resonance drift',
    shortDescription: {
      text: 'Resonance frequency drift caused by NEMS stiction',
    },
    fullDescription: {
      text:
        'Detects resonance-frequency drift in NEMS-based neural dust motes ' +
        'caused by stiction (static friction) between contact surfaces. ' +
        'Stiction shifts the resonance frequency, degrading sensor accuracy ' +
        'and potentially enabling data poisoning. Mitigation via piezoelectric ' +
        'RESET mechanism (DOI: 10.1109/APSCON63569.2025.11144448).',
    },
    helpUri: 'https://ieeexplore.ieee.org/document/11144448/',
    properties: {
      'security-severity': '8.5',
      tags: ['security', 'hardware', 'nems', 'neural-dust'],
      category: 'hardware-integrity',
    },
  },
  {
    id: 'ND_SPOOF_001',
    name: 'Neural dust mote spoofing',
    shortDescription: {
      text: 'Ultrasound channel spoofing of neural dust motes',
    },
    fullDescription: {
      text:
        'Detects spoofing of neural dust motes via carrier-frequency deviation, ' +
        'abnormally low SNR, or failed mote authentication. An attacker can inject ' +
        'false ultrasound backscatter packets to manipulate neural readouts. ' +
        'Target KPI: >99% spoof rejection rate.',
    },
    helpUri: 'https://doi.org/10.1016/j.neuron.2016.06.034',
    properties: {
      'security-severity': '9.0',
      tags: ['security', 'hardware', 'nems', 'neural-dust'],
      category: 'authentication',
    },
  },
  {
    id: 'ND_DOS_001',
    name: 'RF energy-denial (DoS)',
    shortDescription: {
      text: 'Energy starvation attack on neural dust motes',
    },
    fullDescription: {
      text:
        'Detects energy-denial (DoS) attacks where RF interference or jamming ' +
        'reduces the harvested power of neural dust motes below operational ' +
        'thresholds. Uses on-node SVM anomaly detection over voltage/current ' +
        'features. Target KPI: >92% detection accuracy.',
    },
    helpUri: 'https://doi.org/10.1016/j.neuron.2016.06.034',
    properties: {
      'security-severity': '7.5',
      tags: ['security', 'hardware', 'nems', 'neural-dust'],
      category: 'availability',
    },
  },
  {
    id: 'ND_POISON_001',
    name: 'Stiction-enabled data poisoning',
    shortDescription: {
      text: 'Data poisoning via stiction-induced mass change',
    },
    fullDescription: {
      text:
        'Detects data poisoning attacks enabled by NEMS stiction. When stiction ' +
        'causes mass-change artefacts on the sensor surface, the resulting false ' +
        'neural signals can poison downstream ML models. Anomaly scoring on ' +
        'backscatter modulation flags poisoned updates. ' +
        'Target KPI: >90% poisoned update rejection.',
    },
    helpUri: 'https://doi.org/10.1145/3522783.3529523',
    properties: {
      'security-severity': '9.5',
      tags: ['security', 'hardware', 'nems', 'neural-dust'],
      category: 'data-integrity',
    },
  },
];

// ─── Mappings ────────────────────────────────────────────────────────

const EVENT_TYPE_TO_RULE: Record<SecurityEventData['type'], string> = {
  NEURAL_DUST_SPOOFING: 'ND_SPOOF_001',
  NEURAL_DUST_DOS: 'ND_DOS_001',
  NEMS_STICTION: 'NEMS_STICTION_001',
  STICTION_DATA_POISONING: 'ND_POISON_001',
};

const SEVERITY_TO_LEVEL: Record<SecurityEventData['severity'], SarifResult['level']> = {
  LOW: 'note',
  MEDIUM: 'warning',
  HIGH: 'warning',
  CRITICAL: 'error',
};

function ruleIndex(ruleId: string): number {
  return SARIF_RULES.findIndex(r => r.id === ruleId);
}

// ─── Generator ───────────────────────────────────────────────────────

/**
 * Generate a SARIF 2.1.0 log from an array of security events.
 *
 * The output is compatible with GitHub code-scanning and can be
 * uploaded via the `github/codeql-action/upload-sarif` action.
 *
 * @param events - Security events produced by the neural dust rules
 * @param artifactUri - Base URI for the artefact location (default: project root)
 * @returns Complete SARIF 2.1.0 log object
 */
export function generateNeuralDustSarif(
  events: SecurityEventData[],
  artifactUri: string = 'src/indexer/neuralDustRules.ts',
): SarifLog {
  const results: SarifResult[] = events.map(event => {
    const ruleId = EVENT_TYPE_TO_RULE[event.type];
    return {
      ruleId,
      ruleIndex: ruleIndex(ruleId),
      level: SEVERITY_TO_LEVEL[event.severity],
      message: {
        text: formatEventMessage(event),
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: { uri: artifactUri },
          },
        },
      ],
      properties: {
        eventType: event.type,
        severity: event.severity,
        kpiData: event.kpiData,
      },
    };
  });

  return {
    $schema:
      'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Audityzer Neural Dust Security Scanner',
            informationUri: 'https://github.com/romanchaa997/audityzer',
            version: '1.0.0',
            rules: SARIF_RULES,
          },
        },
        results,
      },
    ],
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────

function formatEventMessage(event: SecurityEventData): string {
  switch (event.type) {
    case 'NEURAL_DUST_SPOOFING':
      return (
        `Spoofing detected: ${(event.kpiData as Record<string, unknown>).reasons ?? 'unknown'}. ` +
        `Spoof rejection target: ${(event.kpiData as Record<string, unknown>).spoofRejectRate ?? '>99%'}.`
      );
    case 'NEURAL_DUST_DOS':
      return (
        `Energy denial detected: amplitude at ${formatPercent((event.kpiData as Record<string, unknown>).amplitudeRatio)} of baseline. ` +
        `SVM confidence: ${formatPercent((event.kpiData as Record<string, unknown>).svmConfidence)}.`
      );
    case 'NEMS_STICTION':
      return (
        `Stiction drift detected: ${(event.kpiData as Record<string, unknown>).driftMagnitude} Hz deviation. ` +
        `Recovery rate target: ${(event.kpiData as Record<string, unknown>).recoveryRate ?? '>95%'}.`
      );
    case 'STICTION_DATA_POISONING':
      return (
        `Data poisoning via stiction: drift ${(event.kpiData as Record<string, unknown>).driftMagnitude} Hz. ` +
        `Poisoned update rejection target: >90%.`
      );
  }
}

function formatPercent(value: unknown): string {
  if (typeof value === 'number') {
    return `${(value * 100).toFixed(1)}%`;
  }
  return String(value ?? 'N/A');
}
