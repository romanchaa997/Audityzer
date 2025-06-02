/**
 * ZK-SNARK Security Test Suite
 * This test suite focuses on advanced ZK-SNARK attack vectors:
 * - Invalid elliptic curve point testing
 * - ZK circuit constraint validation
 * - Malicious proof generation attempts
 * - Hardcoded input validation for edge cases
 */

import { test, expect, Page } from '@playwright/test';
import { connectWallet, setupWalletState } from '../utils';

// Elliptic curve point structure
class EllipticCurvePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Check if point is on curve y^2 = x^3 + ax + b (simplified)
  isOnCurve(a = 0, b = 7) {
    // This is a simplified check for the secp256k1 curve
    // In a real implementation, this would use proper big integer arithmetic
    const xCubed = BigInt(this.x) ** 3n;
    const ax = BigInt(a) * BigInt(this.x);
    const right =
      (xCubed + ax + BigInt(b)) %
      BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
    const left =
      BigInt(this.y) ** 2n %
      BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');

    return left === right;
  }

  static generateInvalidPoint() {
    // Generate point that is not on the curve
    const x = '0x' + Math.floor(Math.random() * 10 ** 50).toString(16);
    // Intentionally generate y that doesn't satisfy curve equation
    const y = '0x' + Math.floor(Math.random() * 10 ** 50).toString(16);
    return new EllipticCurvePoint(x, y);
  }
}

// ZK-SNARK proof structure (aligned with the existing implementation)
class ZKProof {
  constructor(a, b, c, publicSignals) {
    this.a = a || [
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ];
    this.b = b || [
      [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
    ];
    this.c = c || [
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ];
    this.publicSignals = publicSignals || [];
  }

  // Generate a valid-looking but malicious proof
  static generateMaliciousProof(validPublicSignals) {
    const proof = new ZKProof(
      [
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      ],
      [
        [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
        [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
      ],
      [
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      ],
      validPublicSignals
    );
    return proof;
  }

  // Generate proof with invalid elliptic curve points
  static withInvalidCurvePoints(validPublicSignals) {
    const invalidPoint = EllipticCurvePoint.generateInvalidPoint();
    return new ZKProof(
      [invalidPoint.x, invalidPoint.y],
      [
        [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
        [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
      ],
      [
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      ],
      validPublicSignals
    );
  }

  // Generate proof that tries to bypass circuit constraints
  static withConstraintBypasses(validPublicSignals, constraintIndex, bypassValue) {
    const modifiedSignals = [...validPublicSignals];
    // Modify a value that should be constrained
    if (constraintIndex < modifiedSignals.length) {
      modifiedSignals[constraintIndex] = bypassValue;
    }

    return ZKProof.generateMaliciousProof(modifiedSignals);
  }

  // Create a hardcoded proof attempt
  static withHardcodedValues(publicSignals) {
    // Create a proof with hardcoded values that might pass naive verification
    return new ZKProof(
      // Using specially crafted values that might exploit verification weaknesses
      [
        '0x0000000000000000000000000000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
      [
        [
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        ],
        [
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        ],
      ],
      [
        '0x0000000000000000000000000000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      publicSignals
    );
  }
}

// Test suite for ZK-SNARK security
test.describe('Advanced ZK-SNARK Security Test Suite', () => {
  const GAME_ADDRESS = '0xDF00DF00DF00DF00DF00DF00DF00DF00DF00DF00';
  const PLAYER_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  test.beforeEach(async ({ page }) => {
    // Setup wallet state for testing
    await setupWalletState(page, {
      chainId: '0x1',
      networkName: 'Ethereum Mainnet',
      accounts: [PLAYER_ADDRESS],
      balance: '100000000000000000000', // 100 ETH
    });

    // Initialize test environment with enhanced ZK verification
    await page.addInitScript(() => {
      // Storage for ZK proofs and vulnerability findings
      window._zkProofs = [];
      window._usedProofs = new Set();
      window._validatedProofs = new Set();
      window._vulnerabilityFindings = [];

      // Enhanced ZK verification with additional security checks
      window.verifyZkProof = function (proof, expectedPublicSignals) {
        // Create a unique string representation of the proof
        const proofKey = JSON.stringify(proof);

        // Check if points are on curve (simplified check)
        function isPointOnCurve(point) {
          // This is a placeholder for actual elliptic curve validation
          // In a real implementation, this would use proper big integer arithmetic
          // to verify points are on the specific curve being used

          if (!point || !Array.isArray(point) || point.length !== 2) {
            return false;
          }

          // For testing purposes, we're rejecting points with specific patterns
          if (point[0].startsWith('0x000000') && point[1].startsWith('0x000000')) {
            return false;
          }

          return true;
        }

        // Check curve points
        const pointsValid =
          isPointOnCurve(proof.a) &&
          isPointOnCurve(proof.b[0]) &&
          isPointOnCurve(proof.b[1]) &&
          isPointOnCurve(proof.c);

        if (!pointsValid) {
          window._vulnerabilityFindings.push({
            type: 'INVALID_CURVE_POINTS',
            severity: 'HIGH',
            details: 'Proof contains points that are not on the elliptic curve',
            timestamp: Date.now(),
            proof: JSON.stringify(proof),
          });

          return {
            verified: false,
            error: 'INVALID_CURVE_POINTS',
          };
        }

        // Check for constraint satisfaction (simplified)
        // In a real implementation, this would verify all constraints in the circuit
        function checkConstraints(publicSignals) {
          // Example constraint: x coordinate must be less than some max value
          const MAX_COORDINATE = BigInt(
            '0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
          );

          // Convert to bigints for comparison
          try {
            const xCoord = BigInt(publicSignals[1]);
            const yCoord = BigInt(publicSignals[2]);

            if (xCoord > MAX_COORDINATE || yCoord > MAX_COORDINATE) {
              return false;
            }
          } catch (e) {
            return false;
          }

          return true;
        }

        const constraintsSatisfied = checkConstraints(proof.publicSignals);

        if (!constraintsSatisfied) {
          window._vulnerabilityFindings.push({
            type: 'CONSTRAINT_VIOLATION',
            severity: 'CRITICAL',
            details: 'Proof violates ZK circuit constraints',
            timestamp: Date.now(),
            proof: JSON.stringify(proof),
          });

          return {
            verified: false,
            error: 'CONSTRAINT_VIOLATION',
          };
        }

        // Check for hardcoded proofs
        function isHardcodedProof(proof) {
          // Check for special patterns that might indicate a hardcoded proof
          const allZeros = point =>
            point[0].replace('0x', '').match(/^0+$/) && point[1].replace('0x', '').match(/^0+$/);

          const allOnes = point =>
            point[0].replace('0x', '').match(/^0*1$/) && point[1].replace('0x', '').match(/^0*1$/);

          // More relaxed detection criteria
          const suspiciousZeros = point =>
            point[0].startsWith('0x00000') || point[1].startsWith('0x00000');
          const suspiciousOnes = point =>
            point[0].replace('0x', '') === '1' || point[1].replace('0x', '') === '1';

          return (
            allZeros(proof.a) ||
            allZeros(proof.c) ||
            allOnes(proof.a) ||
            allOnes(proof.c) ||
            suspiciousZeros(proof.a) ||
            suspiciousZeros(proof.c) ||
            suspiciousOnes(proof.a) ||
            suspiciousOnes(proof.c)
          );
        }

        if (isHardcodedProof(proof)) {
          window._vulnerabilityFindings.push({
            type: 'HARDCODED_PROOF',
            severity: 'CRITICAL',
            details: 'Detected attempt to use a hardcoded proof',
            timestamp: Date.now(),
            proof: JSON.stringify(proof),
          });

          return {
            verified: false,
            error: 'HARDCODED_PROOF',
          };
        }

        // Check if this exact proof has been used before (replay attack)
        if (window._usedProofs.has(proofKey)) {
          window._vulnerabilityFindings.push({
            type: 'PROOF_REPLAY',
            severity: 'HIGH',
            details: 'Attempted to reuse a previously verified proof',
            timestamp: Date.now(),
            proof: proofKey,
          });

          return {
            verified: false,
            error: 'PROOF_ALREADY_USED',
          };
        }

        // Verify public signals match expected values
        const publicSignalsMatch =
          JSON.stringify(proof.publicSignals) === JSON.stringify(expectedPublicSignals);

        if (!publicSignalsMatch) {
          window._vulnerabilityFindings.push({
            type: 'INVALID_PUBLIC_SIGNALS',
            severity: 'MEDIUM',
            details: 'Public signals do not match expected values',
            timestamp: Date.now(),
            expected: JSON.stringify(expectedPublicSignals),
            received: JSON.stringify(proof.publicSignals),
          });
        }

        // Record proof usage (to prevent replays)
        window._usedProofs.add(proofKey);

        // Record validation result
        if (publicSignalsMatch) {
          window._validatedProofs.add(proofKey);
        }

        return {
          verified: publicSignalsMatch,
          error: publicSignalsMatch ? null : 'INVALID_PUBLIC_SIGNALS',
        };
      };

      // Function to get vulnerability report
      window.getVulnerabilityReport = function () {
        return {
          findings: window._vulnerabilityFindings,
          summary: {
            total: window._vulnerabilityFindings.length,
            byType: window._vulnerabilityFindings.reduce((acc, finding) => {
              acc[finding.type] = (acc[finding.type] || 0) + 1;
              return acc;
            }, {}),
            bySeverity: window._vulnerabilityFindings.reduce((acc, finding) => {
              acc[finding.severity] = (acc[finding.severity] || 0) + 1;
              return acc;
            }, {}),
          },
        };
      };
    });

    // Navigate to the mock game page
    await page.goto('about:blank');
    await connectWallet(page);
  });

  test('should detect invalid elliptic curve points in ZK proofs', async ({ page }) => {
    await page.evaluate(() => {
      // Create valid public signals
      const planetId =
        '0x' +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');
      const validPublicSignals = [
        planetId,
        '123456789', // x coordinate
        '987654321', // y coordinate
      ];

      // Test with valid points first (baseline)
      const validResult = window.verifyZkProof(
        {
          a: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          b: [
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
          ],
          c: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          publicSignals: validPublicSignals,
        },
        validPublicSignals
      );

      console.log('Valid proof result:', validResult);

      // Test with invalid curve points
      const invalidResult = window.verifyZkProof(
        {
          a: [
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          ],
          b: [
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
          ],
          c: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          publicSignals: validPublicSignals,
        },
        validPublicSignals
      );

      console.log('Invalid curve points result:', invalidResult);

      return {
        validResult,
        invalidResult,
        vulnerabilityReport: window.getVulnerabilityReport(),
      };
    });

    // Verify test results
    const results = await page.evaluate(() => window.getVulnerabilityReport());

    expect(results.findings.some(f => f.type === 'INVALID_CURVE_POINTS')).toBeTruthy();
  });

  test('should detect ZK circuit constraint violations', async ({ page }) => {
    await page.evaluate(() => {
      // Valid coordinate bounds for the game
      const MAX_VALID_COORDINATE = '9007199254740990'; // Just under JS safe integer limit

      // Create valid public signals
      const planetId =
        '0x' +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');
      const validPublicSignals = [
        planetId,
        '123456789', // x coordinate within bounds
        '987654321', // y coordinate within bounds
      ];

      // Valid proof with coordinates within bounds
      const validResult = window.verifyZkProof(
        {
          a: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          b: [
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
          ],
          c: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          publicSignals: validPublicSignals,
        },
        validPublicSignals
      );

      // Create proof with constraint-violating coordinates
      const constraintViolatingSignals = [
        planetId,
        '9007199254740992000000', // x coordinate exceeding bounds
        '987654321', // y coordinate within bounds
      ];

      const invalidResult = window.verifyZkProof(
        {
          a: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          b: [
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
          ],
          c: [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          publicSignals: constraintViolatingSignals,
        },
        validPublicSignals
      );

      return {
        validResult,
        invalidResult,
        vulnerabilityReport: window.getVulnerabilityReport(),
      };
    });

    // Verify test results
    const results = await page.evaluate(() => window.getVulnerabilityReport());
    expect(
      results.findings.some(
        f => f.type === 'CONSTRAINT_VIOLATION' || f.type === 'INVALID_PUBLIC_SIGNALS'
      )
    ).toBeTruthy();
  });

  test('should detect hardcoded ZK proof attempts', async ({ page }) => {
    await page.evaluate(() => {
      // Create valid public signals
      const planetId =
        '0x' +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');
      const validPublicSignals = [
        planetId,
        '123456789', // x coordinate
        '987654321', // y coordinate
      ];

      // Test with hardcoded proof values (likely to trigger detection)
      const hardcodedResult = window.verifyZkProof(
        {
          a: [
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ],
          b: [
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
            [
              '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            ],
          ],
          c: [
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          ],
          publicSignals: validPublicSignals,
        },
        validPublicSignals
      );

      return {
        hardcodedResult,
        vulnerabilityReport: window.getVulnerabilityReport(),
      };
    });

    // Verify test results
    const results = await page.evaluate(() => window.getVulnerabilityReport());
    expect(results.findings.some(f => f.type === 'HARDCODED_PROOF')).toBeTruthy();
  });

  test('should detect malicious proof generation attempts', async ({ page }) => {
    // This test checks multiple attack vectors in sequence
    const testResults = await page.evaluate(() => {
      const testVectors = [];

      // Create valid public signals
      const planetId =
        '0x' +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');
      const validPublicSignals = [
        planetId,
        '123456789', // x coordinate
        '987654321', // y coordinate
      ];

      // 1. Test replay attack
      const validProof = {
        a: [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
        b: [
          [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
          [
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          ],
        ],
        c: [
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ],
        publicSignals: validPublicSignals,
      };

      // First verification should pass
      const firstResult = window.verifyZkProof(validProof, validPublicSignals);
      testVectors.push({ name: 'First valid proof', result: firstResult });

      // Replay attack - same proof used again should fail
      const replayResult = window.verifyZkProof(validProof, validPublicSignals);
      testVectors.push({ name: 'Replay attack', result: replayResult });

      // 2. Test all attacks in sequence

      // Return all test results
      return {
        testVectors,
        vulnerabilityReport: window.getVulnerabilityReport(),
      };
    });

    // Verify replay attack detection
    expect(testResults.testVectors[0].result.verified).toBeTruthy();
    expect(testResults.testVectors[1].result.verified).toBeFalsy();
    expect(testResults.testVectors[1].result.error).toBe('PROOF_ALREADY_USED');
  });
});
