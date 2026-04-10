"""Ukraine B7 Biodiesel Rule Engine - DSTU 7688:2014
AuditorSEC Fuel Compliance MVP | Mar 22 2026
Mandate: B7 (7% biodiesel blend) for all diesel fuel sold in Ukraine since 2018.
Rules: DSTU 7688:2014 clause 4.3
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class LabReport:
    """Input: lab report parameters (JSON/CSV)"""
    sample_id: str
    fad_content_pct: Optional[float] = None       # Fatty Acid content %
    density_15c_kg_m3: Optional[float] = None     # Density at 15C kg/m3
    flash_point_c: Optional[float] = None          # Flash point Celsius
    cfpp_c: Optional[float] = None                 # Cold Filter Plugging Point
    sulfur_mg_kg: Optional[float] = None           # Sulfur content mg/kg
    water_mg_kg: Optional[float] = None            # Water content mg/kg
    cetane_number: Optional[float] = None          # Cetane number
    season: str = "summer"                         # summer | winter


@dataclass
class RuleResult:
    rule_id: str
    parameter: str
    value: Optional[float]
    min_val: Optional[float]
    max_val: Optional[float]
    status: str  # PASS | FAIL | SKIP
    message: str


@dataclass
class ComplianceReport:
    sample_id: str
    overall: str  # PASS | FAIL | INCOMPLETE
    rules: list[RuleResult] = field(default_factory=list)
    non_compliance_count: int = 0

    def to_dict(self) -> dict:
        return {
            "sample_id": self.sample_id,
            "overall": self.overall,
            "non_compliance_count": self.non_compliance_count,
            "rules": [
                {
                    "rule_id": r.rule_id,
                    "parameter": r.parameter,
                    "value": r.value,
                    "min": r.min_val,
                    "max": r.max_val,
                    "status": r.status,
                    "message": r.message,
                }
                for r in self.rules
            ],
        }


def validate_b7(report: LabReport) -> ComplianceReport:
    """Validate lab report against DSTU 7688:2014 B7 biodiesel standard.
    Returns ComplianceReport with PASS/FAIL per parameter + overall result.
    """
    results: list[RuleResult] = []

    # Rule 1: FAD content 6.5-13.5% v/v (DSTU 7688 clause 4.3)
    results.append(_check(
        rule_id="R01",
        parameter="FAD content %v/v",
        value=report.fad_content_pct,
        min_val=6.5,
        max_val=13.5,
    ))

    # Rule 2: Density at 15C: 820-860 kg/m3
    results.append(_check(
        rule_id="R02",
        parameter="Density @15C kg/m3",
        value=report.density_15c_kg_m3,
        min_val=820.0,
        max_val=860.0,
    ))

    # Rule 3: Flash point >= 55C
    results.append(_check(
        rule_id="R03",
        parameter="Flash point C",
        value=report.flash_point_c,
        min_val=55.0,
        max_val=None,
    ))

    # Rule 4: CFPP <= 0C summer, <= -20C winter
    cfpp_max = 0.0 if report.season == "summer" else -20.0
    results.append(_check(
        rule_id="R04",
        parameter=f"CFPP C ({report.season})",
        value=report.cfpp_c,
        min_val=None,
        max_val=cfpp_max,
    ))

    # Rule 5: Sulfur content <= 10 mg/kg (Euro 5)
    results.append(_check(
        rule_id="R05",
        parameter="Sulfur mg/kg",
        value=report.sulfur_mg_kg,
        min_val=None,
        max_val=10.0,
    ))

    # Rule 6: Water content <= 200 mg/kg
    results.append(_check(
        rule_id="R06",
        parameter="Water mg/kg",
        value=report.water_mg_kg,
        min_val=None,
        max_val=200.0,
    ))

    # Rule 7: Cetane number >= 51
    results.append(_check(
        rule_id="R07",
        parameter="Cetane number",
        value=report.cetane_number,
        min_val=51.0,
        max_val=None,
    ))

    failures = [r for r in results if r.status == "FAIL"]
    skipped = [r for r in results if r.status == "SKIP"]
    if failures:
        overall = "FAIL"
    elif len(skipped) == len(results):
        overall = "INCOMPLETE"
    else:
        overall = "PASS"

    return ComplianceReport(
        sample_id=report.sample_id,
        overall=overall,
        rules=results,
        non_compliance_count=len(failures),
    )


def _check(
    rule_id: str,
    parameter: str,
    value: Optional[float],
    min_val: Optional[float],
    max_val: Optional[float],
) -> RuleResult:
    if value is None:
        return RuleResult(
            rule_id=rule_id, parameter=parameter,
            value=None, min_val=min_val, max_val=max_val,
            status="SKIP", message="No value provided",
        )
    violations = []
    if min_val is not None and value < min_val:
        violations.append(f"{value} < min {min_val}")
    if max_val is not None and value > max_val:
        violations.append(f"{value} > max {max_val}")
    if violations:
        return RuleResult(
            rule_id=rule_id, parameter=parameter,
            value=value, min_val=min_val, max_val=max_val,
            status="FAIL", message="NON-COMPLIANT: " + "; ".join(violations),
        )
    return RuleResult(
        rule_id=rule_id, parameter=parameter,
        value=value, min_val=min_val, max_val=max_val,
        status="PASS", message="Within DSTU 7688:2014 limits",
    )


# Example usage
if __name__ == "__main__":
    import json
    sample = LabReport(
        sample_id="LAB-2026-001",
        fad_content_pct=8.5,
        density_15c_kg_m3=835.0,
        flash_point_c=62.0,
        cfpp_c=-3.0,
        sulfur_mg_kg=7.2,
        water_mg_kg=150.0,
        cetane_number=53.0,
        season="summer",
    )
    result = validate_b7(sample)
    print(json.dumps(result.to_dict(), indent=2, ensure_ascii=False))
