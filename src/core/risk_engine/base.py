#!/usr/bin/env python3
"""
Audityzer Risk Engine Core
Foundational classes for risk calculation and rule-based assessment
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any, Callable
from enum import Enum
import json


class Severity(Enum):
    """Risk severity levels"""
    CRITICAL = 5
    HIGH = 4
    MEDIUM = 3
    LOW = 2
    MINIMAL = 1
    NONE = 0


@dataclass
class Rule:
    """Represents a risk assessment rule"""
    id: str
    name: str
    description: str
    severity: Severity
    weight: float = 1.0
    enabled: bool = True
    condition: Optional[Callable[[Any], bool]] = None
    tags: List[str] = field(default_factory=list)
    
    def evaluate(self, context: Dict[str, Any]) -> bool:
        """Evaluate rule against context"""
        if not self.enabled:
            return False
        if self.condition:
            return self.condition(context)
        return True


@dataclass
class RiskAssessment:
    """Result of a risk assessment"""
    subject_id: str
    risk_score: float  # 0-100
    severity: Severity
    triggered_rules: List[Rule]
    details: Dict[str, Any] = field(default_factory=dict)
    timestamp: str = ""
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization"""
        return {
            "subject_id": self.subject_id,
            "risk_score": round(self.risk_score, 2),
            "severity": self.severity.name,
            "triggered_rules": [rule.id for rule in self.triggered_rules],
            "details": self.details,
            "timestamp": self.timestamp
        }


class RiskCalculator(ABC):
    """Abstract base class for risk calculation"""
    
    def __init__(self, name: str):
        self.name = name
        self.rules: List[Rule] = []
        self.max_score: float = 100.0
    
    def add_rule(self, rule: Rule) -> None:
        """Add a rule to the calculator"""
        self.rules.append(rule)
    
    def remove_rule(self, rule_id: str) -> None:
        """Remove a rule by ID"""
        self.rules = [r for r in self.rules if r.id != rule_id]
    
    def get_rule(self, rule_id: str) -> Optional[Rule]:
        """Get a rule by ID"""
        for rule in self.rules:
            if rule.id == rule_id:
                return rule
        return None
    
    def calculate_score(self, context: Dict[str, Any]) -> float:
        """Calculate risk score based on triggered rules
        
        Override in subclasses for custom scoring logic
        """
        score = 0
        triggered_rules = []
        
        for rule in self.rules:
            if rule.evaluate(context):
                score += rule.severity.value * rule.weight
                triggered_rules.append(rule)
        
        # Normalize to 0-100 scale
        normalized_score = min((score / len(self.rules)) * 100 if self.rules else 0, self.max_score)
        return normalized_score
    
    @abstractmethod
    def assess_risk(self, subject_id: str, context: Dict[str, Any]) -> RiskAssessment:
        """Perform risk assessment on a subject
        
        Must be implemented by subclasses
        """
        pass


class WebApplicationRiskCalculator(RiskCalculator):
    """Risk calculator for web applications and smart contracts"""
    
    def __init__(self):
        super().__init__("WebApplicationRiskCalculator")
        self._initialize_default_rules()
    
    def _initialize_default_rules(self):
        """Initialize with default security rules"""
        rules = [
            Rule(
                id="sql_injection",
                name="SQL Injection Risk",
                description="Detects potential SQL injection vulnerabilities",
                severity=Severity.CRITICAL,
                weight=1.0,
                tags=["injection", "database"]
            ),
            Rule(
                id="xss_vulnerability",
                name="Cross-Site Scripting (XSS)",
                description="Detects potential XSS vulnerabilities",
                severity=Severity.HIGH,
                weight=0.8,
                tags=["injection", "web"]
            ),
            Rule(
                id="auth_bypass",
                name="Authentication Bypass Risk",
                description="Detects authentication weaknesses",
                severity=Severity.CRITICAL,
                weight=1.0,
                tags=["authentication", "security"]
            ),
            Rule(
                id="unencrypted_data",
                name="Unencrypted Data Transmission",
                description="Detects unencrypted sensitive data transfers",
                severity=Severity.HIGH,
                weight=0.9,
                tags=["encryption", "data-protection"]
            ),
        ]
        for rule in rules:
            self.add_rule(rule)
    
    def assess_risk(self, subject_id: str, context: Dict[str, Any]) -> RiskAssessment:
        """Assess risk for a web application"""
        from datetime import datetime
        
        score = self.calculate_score(context)
        
        # Determine severity level
        if score >= 80:
            severity = Severity.CRITICAL
        elif score >= 60:
            severity = Severity.HIGH
        elif score >= 40:
            severity = Severity.MEDIUM
        elif score >= 20:
            severity = Severity.LOW
        else:
            severity = Severity.MINIMAL
        
        # Find triggered rules
        triggered_rules = [rule for rule in self.rules if rule.evaluate(context)]
        
        assessment = RiskAssessment(
            subject_id=subject_id,
            risk_score=score,
            severity=severity,
            triggered_rules=triggered_rules,
            details={
                "calculator": self.name,
                "rule_count": len(self.rules),
                "triggered_count": len(triggered_rules)
            },
            timestamp=datetime.utcnow().isoformat()
        )
        
        return assessment


if __name__ == "__main__":
    # Example usage
    calculator = WebApplicationRiskCalculator()
    
    # Example context with vulnerabilities
    test_context = {
        "has_sql_injection": True,
        "has_xss": False,
        "auth_enabled": False,
        "encryption_enabled": True
    }
    
    assessment = calculator.assess_risk("app_001", test_context)
    print(f"Risk Assessment: {assessment.subject_id}")
    print(f"Risk Score: {assessment.risk_score:.2f}/100")
    print(f"Severity: {assessment.severity.name}")
    print(f"Triggered Rules: {[r.name for r in assessment.triggered_rules]}")
    print(json.dumps(assessment.to_dict(), indent=2))
