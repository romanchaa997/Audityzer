"""AI Agent Pipeline for AuditorSEC — streaming multi-agent architecture.
Implements parallel agent streams for Web3 security analysis:
  - VulnScanAgent: smart contract vulnerability detection
  - ComplianceAgent: NIS2/GDPR rule checks
  - PQCAgent: post-quantum cryptography readiness
  - ReportAgent: aggregates findings into structured output
Based on complete-tasks-parallely.pdf and recommend-advanced-alternative-suggestions.pdf.
"""
from __future__ import annotations
import asyncio
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, AsyncIterator, Dict, List, Optional
import datetime


class AgentStatus(Enum):
    IDLE = "idle"
    RUNNING = "running"
    DONE = "done"
    ERROR = "error"


@dataclass
class AgentMessage:
    agent_id: str
    content: str
    timestamp: str = field(default_factory=lambda: datetime.datetime.utcnow().isoformat())
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class AgentResult:
    agent_id: str
    status: AgentStatus
    findings: List[Dict[str, Any]] = field(default_factory=list)
    summary: str = ""
    duration_ms: float = 0.0
    error: Optional[str] = None


class BaseAgent:
    """Base class for all AuditorSEC pipeline agents."""

    def __init__(self, agent_id: str, config: Optional[Dict] = None):
        self.agent_id = agent_id
        self.config = config or {}
        self.status = AgentStatus.IDLE
        self._messages: List[AgentMessage] = []

    async def stream(self, payload: Dict) -> AsyncIterator[AgentMessage]:
        """Yield intermediate messages during analysis (streaming mode)."""
        raise NotImplementedError

    async def run(self, payload: Dict) -> AgentResult:
        """Run the agent and return a final result."""
        start = asyncio.get_event_loop().time()
        self.status = AgentStatus.RUNNING
        findings = []
        try:
            async for msg in self.stream(payload):
                self._messages.append(msg)
                if "finding" in msg.metadata:
                    findings.append(msg.metadata["finding"])
            self.status = AgentStatus.DONE
            duration = (asyncio.get_event_loop().time() - start) * 1000
            return AgentResult(
                agent_id=self.agent_id,
                status=AgentStatus.DONE,
                findings=findings,
                summary=f"{self.agent_id}: {len(findings)} findings in {duration:.0f}ms",
                duration_ms=duration,
            )
        except Exception as exc:
            self.status = AgentStatus.ERROR
            return AgentResult(
                agent_id=self.agent_id,
                status=AgentStatus.ERROR,
                error=str(exc),
            )


class VulnScanAgent(BaseAgent):
    """Scans Solidity/EVM bytecode for common vulnerability patterns."""

    VULN_PATTERNS = [
        ("reentrancy", ["call.value", ".call{", "msg.sender.call"]),
        ("tx_origin", ["tx.origin"]),
        ("unchecked_return", ["send(", "transfer("]),
        ("integer_overflow", ["SafeMath", "unchecked {"]),
        ("delegatecall", ["delegatecall("]),
        ("selfdestruct", ["selfdestruct(", "suicide("]),
    ]

    async def stream(self, payload: Dict) -> AsyncIterator[AgentMessage]:
        source = payload.get("source", "")
        contract = payload.get("contract_name", "Unknown")
        yield AgentMessage(
            self.agent_id,
            f"Starting vulnerability scan for {contract}...",
        )
        for vuln_type, patterns in self.VULN_PATTERNS:
            await asyncio.sleep(0)  # yield control
            for pattern in patterns:
                if pattern in source:
                    finding = {
                        "type": vuln_type,
                        "pattern": pattern,
                        "contract": contract,
                        "severity": "HIGH" if vuln_type in ("reentrancy", "delegatecall") else "MEDIUM",
                    }
                    yield AgentMessage(
                        self.agent_id,
                        f"[VULN] {vuln_type}: pattern '{pattern}' found in {contract}",
                        metadata={"finding": finding},
                    )
                    break
        yield AgentMessage(self.agent_id, f"Scan complete for {contract}.")


class ComplianceAgent(BaseAgent):
    """Checks deployment config against NIS2/GDPR requirements."""

    REQUIRED_KEYS = [
        ("mfa_enabled", "NIS2-ART21-1", "CRITICAL"),
        ("tls_enforced", "NIS2-ART21-4", "CRITICAL"),
        ("rbac_implemented", "NIS2-ART21-5", "HIGH"),
        ("privacy_by_design", "GDPR-ART25-1", "HIGH"),
        ("data_encryption_at_rest", "GDPR-ART32-1", "HIGH"),
    ]

    async def stream(self, payload: Dict) -> AsyncIterator[AgentMessage]:
        config = payload.get("config", {})
        yield AgentMessage(self.agent_id, "Starting NIS2/GDPR compliance checks...")
        for key, rule_id, severity in self.REQUIRED_KEYS:
            await asyncio.sleep(0)
            if not config.get(key, False):
                finding = {"rule": rule_id, "key": key, "severity": severity}
                yield AgentMessage(
                    self.agent_id,
                    f"[COMPLIANCE FAIL] {rule_id}: {key} not satisfied",
                    metadata={"finding": finding},
                )
            else:
                yield AgentMessage(self.agent_id, f"[OK] {rule_id}: {key}")
        yield AgentMessage(self.agent_id, "Compliance checks complete.")


class PQCAgent(BaseAgent):
    """Detects quantum-vulnerable cryptographic primitives."""

    QUANTUM_VULN = ["secp256k1", "ecrecover", "ECDSA", "RSA", "ed25519"]

    async def stream(self, payload: Dict) -> AsyncIterator[AgentMessage]:
        source = payload.get("source", "")
        yield AgentMessage(self.agent_id, "Scanning for quantum-vulnerable cryptography...")
        for algo in self.QUANTUM_VULN:
            await asyncio.sleep(0)
            if algo.lower() in source.lower():
                finding = {
                    "algorithm": algo,
                    "severity": "HIGH",
                    "recommendation": "Migrate to NIST PQC (ML-DSA FIPS 204 / ML-KEM FIPS 203)",
                }
                yield AgentMessage(
                    self.agent_id,
                    f"[PQC] Quantum-vulnerable: {algo} detected",
                    metadata={"finding": finding},
                )
        yield AgentMessage(self.agent_id, "PQC scan complete.")


class ReportAgent(BaseAgent):
    """Aggregates results from all agents into a unified security report."""

    async def stream(self, payload: Dict) -> AsyncIterator[AgentMessage]:
        results: List[AgentResult] = payload.get("results", [])
        yield AgentMessage(self.agent_id, "Generating unified security report...")
        all_findings = []
        for r in results:
            all_findings.extend(r.findings)
        critical = [f for f in all_findings if f.get("severity") == "CRITICAL"]
        high = [f for f in all_findings if f.get("severity") == "HIGH"]
        summary = {
            "total_findings": len(all_findings),
            "critical": len(critical),
            "high": len(high),
            "agents_run": [r.agent_id for r in results],
            "timestamp": datetime.datetime.utcnow().isoformat(),
        }
        yield AgentMessage(
            self.agent_id,
            f"Report ready: {len(all_findings)} findings ({len(critical)} critical, {len(high)} high)",
            metadata={"finding": summary},
        )


class AudityzerPipeline:
    """Orchestrates parallel execution of all security agents."""

    def __init__(self, config: Optional[Dict] = None):
        self.config = config or {}
        self.agents: List[BaseAgent] = [
            VulnScanAgent("vuln-scan"),
            ComplianceAgent("compliance"),
            PQCAgent("pqc"),
        ]
        self.report_agent = ReportAgent("report")

    async def run_parallel(self, payload: Dict) -> Dict:
        """Run all agents in parallel and aggregate results."""
        tasks = [agent.run(payload) for agent in self.agents]
        results: List[AgentResult] = await asyncio.gather(*tasks)
        report_payload = {**payload, "results": results}
        report_result = await self.report_agent.run(report_payload)
        return {
            "agent_results": [r.__dict__ for r in results],
            "report": report_result.__dict__,
            "pipeline_status": "completed" if all(r.status == AgentStatus.DONE for r in results) else "partial",
        }


if __name__ == "__main__":
    async def main():
        pipeline = AudityzerPipeline()
        payload = {
            "contract_name": "VulnerableWallet",
            "source": "function withdraw() { msg.sender.call{value: balance}(''); ecrecover(h, v, r, s); }",
            "config": {
                "mfa_enabled": True,
                "tls_enforced": True,
                "rbac_implemented": False,
                "privacy_by_design": True,
                "data_encryption_at_rest": False,
            },
        }
        result = await pipeline.run_parallel(payload)
        import json
        print(json.dumps(result, default=str, indent=2))

    asyncio.run(main())
