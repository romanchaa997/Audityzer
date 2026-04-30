"""Post-Quantum Cryptography (PQC) Readiness Scanner for AuditorSEC.
Scans smart contracts and Web3 infrastructure for quantum-vulnerable cryptographic
primitives and provides NIST PQC migration recommendations (FIPS 203/204/205).
"""
from dataclasses import dataclass, field
from typing import List, Dict, Tuple
import re

# NIST PQC Standards (2024)
NIST_PQC_ALGORITHMS = {
    "ML-KEM": {"standard": "FIPS 203", "type": "KEM", "quantum_safe": True},
    "ML-DSA": {"standard": "FIPS 204", "type": "signature", "quantum_safe": True},
    "SLH-DSA": {"standard": "FIPS 205", "type": "signature", "quantum_safe": True},
    "CRYSTALS-Kyber": {"standard": "Draft", "type": "KEM", "quantum_safe": True},
    "CRYSTALS-Dilithium": {"standard": "Draft", "type": "signature", "quantum_safe": True},
}

# Quantum-vulnerable algorithms commonly found in Web3
VULNERABLE_PATTERNS = [
    (r"secp256k1", "ECDSA/secp256k1", "HIGH", "Used by Ethereum wallets; vulnerable to Shor's algorithm."),
    (r"ECDSA|ecrecover", "ECDSA", "HIGH", "Elliptic curve signature; vulnerable to quantum attacks."),
    (r"RSA[-_]?\d{3,4}|rsa\.encrypt", "RSA", "CRITICAL", "RSA factoring vulnerable to Shor's algorithm at any key size."),
    (r"sha256|keccak256", "SHA-256/Keccak-256", "LOW", "Hash functions; Grover's reduces to 128-bit security (still acceptable with 2x key sizes)."),
    (r"AES[-_]128", "AES-128", "MEDIUM", "Grover reduces AES-128 to 64-bit security; upgrade to AES-256."),
    (r"DH|diffie.hellman|dhparam", "DH/ECDH", "HIGH", "Discrete log vulnerable to Shor's algorithm."),
    (r"ed25519|curve25519", "Ed25519/X25519", "HIGH", "Elliptic curve; vulnerable to quantum Shor's algorithm."),
]


@dataclass
class PQCFinding:
    algorithm: str
    vulnerability: str
    severity: str
    location: str
    line_number: int
    recommendation: str
    nist_replacement: str


@dataclass
class PQCReport:
    target: str
    total_lines: int
    findings: List[PQCFinding] = field(default_factory=list)
    pqc_ready: bool = False
    readiness_score: float = 0.0

    @property
    def critical_count(self) -> int:
        return sum(1 for f in self.findings if f.severity == "CRITICAL")

    @property
    def high_count(self) -> int:
        return sum(1 for f in self.findings if f.severity == "HIGH")

    def summary(self) -> Dict:
        return {
            "target": self.target,
            "pqc_ready": self.pqc_ready,
            "readiness_score": self.readiness_score,
            "total_findings": len(self.findings),
            "critical": self.critical_count,
            "high": self.high_count,
            "findings": [
                {
                    "algorithm": f.algorithm,
                    "severity": f.severity,
                    "location": f.location,
                    "line": f.line_number,
                    "recommendation": f.recommendation,
                    "nist_replacement": f.nist_replacement,
                }
                for f in self.findings
            ],
        }


NIST_REPLACEMENTS = {
    "ECDSA": "ML-DSA (FIPS 204) or SLH-DSA (FIPS 205)",
    "ECDSA/secp256k1": "ML-DSA (FIPS 204)",
    "RSA": "ML-KEM (FIPS 203) for key exchange; ML-DSA for signatures",
    "AES-128": "AES-256 (Grover-resistant)",
    "DH/ECDH": "ML-KEM (FIPS 203)",
    "Ed25519/X25519": "ML-DSA (FIPS 204) or SLH-DSA (FIPS 205)",
    "SHA-256/Keccak-256": "SHA-512 or SHA3-512 (Grover-resistant)",
}


class PQCReadinessScanner:
    """Scans source code and configs for quantum-vulnerable cryptographic primitives."""

    def scan_text(self, text: str, target_name: str = "input") -> PQCReport:
        lines = text.splitlines()
        report = PQCReport(target=target_name, total_lines=len(lines))
        found_algorithms = set()

        for line_num, line in enumerate(lines, start=1):
            line_lower = line.lower()
            for pattern, algo, severity, vuln_desc in VULNERABLE_PATTERNS:
                if re.search(pattern, line, re.IGNORECASE):
                    if algo not in found_algorithms:
                        found_algorithms.add(algo)
                        nist_replacement = NIST_REPLACEMENTS.get(algo, "Consult NIST PQC standards")
                        report.findings.append(
                            PQCFinding(
                                algorithm=algo,
                                vulnerability=vuln_desc,
                                severity=severity,
                                location=target_name,
                                line_number=line_num,
                                recommendation=f"Replace {algo} with {nist_replacement}.",
                                nist_replacement=nist_replacement,
                            )
                        )

        # Calculate readiness score
        if not report.findings:
            report.pqc_ready = True
            report.readiness_score = 100.0
        else:
            penalty = sum(
                {"CRITICAL": 30, "HIGH": 20, "MEDIUM": 10, "LOW": 5}.get(f.severity, 0)
                for f in report.findings
            )
            report.readiness_score = max(0.0, 100.0 - penalty)
            report.pqc_ready = report.readiness_score >= 80.0

        return report

    def scan_solidity(self, source: str, contract_name: str) -> PQCReport:
        """Specialized scan for Solidity smart contracts."""
        return self.scan_text(source, target_name=f"Solidity:{contract_name}")

    def generate_migration_plan(self, report: PQCReport) -> List[str]:
        """Generate step-by-step PQC migration plan."""
        plan = []
        if report.pqc_ready:
            plan.append("[OK] No quantum-vulnerable algorithms detected.")
            return plan

        plan.append("=== PQC Migration Plan ===")
        plan.append(f"Target: {report.target} | Score: {report.readiness_score}%")
        plan.append("")

        for i, finding in enumerate(report.findings, 1):
            plan.append(f"{i}. [{finding.severity}] {finding.algorithm} (Line {finding.line_number})")
            plan.append(f"   Issue: {finding.vulnerability}")
            plan.append(f"   Fix: {finding.recommendation}")
            plan.append(f"   NIST Standard: {finding.nist_replacement}")
            plan.append("")

        return plan


if __name__ == "__main__":
    sample_contract = """
    pragma solidity ^0.8.0;
    // Uses ecrecover (ECDSA secp256k1) for signature verification
    contract Wallet {
        function verify(bytes32 hash, bytes memory sig) public pure returns (address) {
            return ecrecover(hash, uint8(sig[0]), bytes32(sig[1:33]), bytes32(sig[33:65]));
        }
    }
    """
    scanner = PQCReadinessScanner()
    report = scanner.scan_solidity(sample_contract, "Wallet")
    plan = scanner.generate_migration_plan(report)
    for line in plan:
        print(line)
