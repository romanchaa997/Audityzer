"""NIS2 + GDPR Compliance Checker for AuditorSEC platform.
Checks smart contract deployments and dApp configurations against NIS2 Article 21
security requirements and GDPR data protection principles.
"""
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Dict, Optional
import json
import hashlib
import datetime


class ComplianceLevel(Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


@dataclass
class ComplianceFinding:
    rule_id: str
    title: str
    description: str
    level: ComplianceLevel
    regulation: str  # NIS2 or GDPR
    article: str
    remediation: str
    evidence: Optional[str] = None


@dataclass
class ComplianceReport:
    target: str
    timestamp: str = field(default_factory=lambda: datetime.datetime.utcnow().isoformat())
    findings: List[ComplianceFinding] = field(default_factory=list)
    passed_checks: List[str] = field(default_factory=list)
    score: float = 0.0

    def to_dict(self) -> Dict:
        return {
            "target": self.target,
            "timestamp": self.timestamp,
            "score": self.score,
            "findings": [
                {
                    "rule_id": f.rule_id,
                    "title": f.title,
                    "level": f.level.value,
                    "regulation": f.regulation,
                    "article": f.article,
                    "remediation": f.remediation,
                }
                for f in self.findings
            ],
            "passed_checks": self.passed_checks,
        }


NIS2_RULES = [
    {
        "id": "NIS2-ART21-1",
        "title": "Multi-factor Authentication Required",
        "article": "Article 21(2)(j)",
        "check_key": "mfa_enabled",
        "level": ComplianceLevel.CRITICAL,
        "remediation": "Enable MFA for all privileged access to smart contract admin functions.",
    },
    {
        "id": "NIS2-ART21-2",
        "title": "Incident Response Plan",
        "article": "Article 21(2)(c)",
        "check_key": "incident_response_plan",
        "level": ComplianceLevel.HIGH,
        "remediation": "Implement and document an incident response plan with 24h notification SLA.",
    },
    {
        "id": "NIS2-ART21-3",
        "title": "Supply Chain Security",
        "article": "Article 21(2)(d)",
        "check_key": "dependency_audit",
        "level": ComplianceLevel.HIGH,
        "remediation": "Audit all third-party libraries and smart contract dependencies.",
    },
    {
        "id": "NIS2-ART21-4",
        "title": "Encryption in Transit",
        "article": "Article 21(2)(h)",
        "check_key": "tls_enforced",
        "level": ComplianceLevel.CRITICAL,
        "remediation": "Enforce TLS 1.3 for all API endpoints and RPC connections.",
    },
    {
        "id": "NIS2-ART21-5",
        "title": "Access Control Policies",
        "article": "Article 21(2)(i)",
        "check_key": "rbac_implemented",
        "level": ComplianceLevel.HIGH,
        "remediation": "Implement role-based access control (RBAC) for all contract admin functions.",
    },
]

GDPR_RULES = [
    {
        "id": "GDPR-ART25-1",
        "title": "Privacy by Design",
        "article": "Article 25",
        "check_key": "privacy_by_design",
        "level": ComplianceLevel.HIGH,
        "remediation": "Minimize on-chain PII storage; use hashing or off-chain storage.",
    },
    {
        "id": "GDPR-ART17-1",
        "title": "Right to Erasure",
        "article": "Article 17",
        "check_key": "erasure_mechanism",
        "level": ComplianceLevel.MEDIUM,
        "remediation": "Implement data deletion or anonymization mechanism for user data.",
    },
    {
        "id": "GDPR-ART32-1",
        "title": "Security of Processing",
        "article": "Article 32",
        "check_key": "data_encryption_at_rest",
        "level": ComplianceLevel.HIGH,
        "remediation": "Encrypt all personal data at rest using AES-256 or equivalent.",
    },
    {
        "id": "GDPR-ART30-1",
        "title": "Records of Processing Activities",
        "article": "Article 30",
        "check_key": "processing_records",
        "level": ComplianceLevel.MEDIUM,
        "remediation": "Maintain records of all data processing activities including purpose and retention.",
    },
]


class NIS2GDPRChecker:
    """NIS2 and GDPR compliance checker for Web3/dApp deployments."""

    def __init__(self):
        self.rules = NIS2_RULES + GDPR_RULES

    def check(self, target: str, config: Dict) -> ComplianceReport:
        """Run all compliance checks against the provided configuration."""
        report = ComplianceReport(target=target)
        total = len(self.rules)
        passed = 0

        for rule in self.rules:
            check_key = rule["check_key"]
            passed_check = config.get(check_key, False)
            regulation = "NIS2" if rule["id"].startswith("NIS2") else "GDPR"

            if passed_check:
                passed += 1
                report.passed_checks.append(rule["id"])
            else:
                report.findings.append(
                    ComplianceFinding(
                        rule_id=rule["id"],
                        title=rule["title"],
                        description=f"[{regulation}] {rule['article']}: {rule['title']} check failed.",
                        level=rule["level"],
                        regulation=regulation,
                        article=rule["article"],
                        remediation=rule["remediation"],
                        evidence=config.get(f"{check_key}_evidence"),
                    )
                )

        report.score = round((passed / total) * 100, 2) if total > 0 else 0.0
        # Sort findings: critical first
        report.findings.sort(key=lambda f: list(ComplianceLevel).index(f.level))
        return report

    def generate_json_report(self, target: str, config: Dict) -> str:
        report = self.check(target, config)
        return json.dumps(report.to_dict(), indent=2)


if __name__ == "__main__":
    # Example usage with sample dApp config
    sample_config = {
        "mfa_enabled": True,
        "incident_response_plan": False,
        "dependency_audit": True,
        "tls_enforced": True,
        "rbac_implemented": False,
        "privacy_by_design": True,
        "erasure_mechanism": False,
        "data_encryption_at_rest": True,
        "processing_records": False,
    }
    checker = NIS2GDPRChecker()
    report_json = checker.generate_json_report("audityzer-platform-v2.0", sample_config)
    print(report_json)
