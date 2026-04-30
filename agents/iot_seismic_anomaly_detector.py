"""IoT Seismic Anomaly Detector for AuditorSEC infrastructure monitoring.
Based on grok_report-96.pdf: Z-score + IQR statistical anomaly detection
for seismic/vibration sensor streams from IoT devices.
Integrates with the policy simulator for automated incident response.
"""
from __future__ import annotations
import math
import statistics
from collections import deque
from dataclasses import dataclass, field
from typing import Deque, Dict, List, Optional, Tuple
import datetime


@dataclass
class SensorReading:
    sensor_id: str
    timestamp: str
    value: float  # acceleration in m/s^2 or mg
    channel: str = "Z"  # X, Y, Z axis
    metadata: Dict = field(default_factory=dict)


@dataclass
class SeismicAnomaly:
    sensor_id: str
    timestamp: str
    value: float
    z_score: float
    iqr_flag: bool
    severity: str  # LOW / MEDIUM / HIGH / CRITICAL
    magnitude_estimate: float  # Richter-scale estimate
    alert_message: str


class RollingStats:
    """Efficient rolling window statistics (mean, std, IQR) without full history."""

    def __init__(self, window: int = 100):
        self.window = window
        self._data: Deque[float] = deque(maxlen=window)

    def add(self, value: float) -> None:
        self._data.append(value)

    @property
    def mean(self) -> float:
        return statistics.mean(self._data) if self._data else 0.0

    @property
    def stdev(self) -> float:
        return statistics.stdev(self._data) if len(self._data) > 1 else 1.0

    @property
    def iqr(self) -> Tuple[float, float]:
        """Return (Q1, Q3) for IQR-based outlier detection."""
        if len(self._data) < 4:
            return (0.0, float("inf"))
        sorted_data = sorted(self._data)
        n = len(sorted_data)
        q1 = sorted_data[n // 4]
        q3 = sorted_data[(3 * n) // 4]
        iqr_val = q3 - q1
        lower = q1 - 1.5 * iqr_val
        upper = q3 + 1.5 * iqr_val
        return (lower, upper)

    def z_score(self, value: float) -> float:
        std = self.stdev
        return (value - self.mean) / std if std > 0 else 0.0


# Richter magnitude proxy based on peak acceleration (simplified)
def estimate_magnitude(peak_acceleration_mg: float) -> float:
    """Rough Richter magnitude estimate from peak ground acceleration in mg."""
    if peak_acceleration_mg <= 0:
        return 0.0
    # Empirical: M ~ log10(a) + 3 (approximate for local magnitude)
    return round(math.log10(peak_acceleration_mg + 1) + 3.0, 2)


SEVERITY_THRESHOLDS = [
    (5.0, "CRITICAL", "Major seismic event — evacuate and alert authorities"),
    (3.5, "HIGH", "Significant seismic anomaly — inspect infrastructure"),
    (2.5, "MEDIUM", "Moderate anomaly — monitor closely"),
    (1.5, "LOW", "Minor anomaly — log and continue monitoring"),
]


class IoTSeismicAnomalyDetector:
    """Real-time seismic anomaly detector using Z-score + IQR methods."""

    def __init__(self, window: int = 200, z_threshold: float = 3.0):
        self.window = window
        self.z_threshold = z_threshold
        self._stats: Dict[str, RollingStats] = {}
        self.anomalies: List[SeismicAnomaly] = []

    def _get_stats(self, sensor_id: str) -> RollingStats:
        if sensor_id not in self._stats:
            self._stats[sensor_id] = RollingStats(self.window)
        return self._stats[sensor_id]

    def _classify_severity(self, z_score: float) -> Tuple[str, str]:
        mag = estimate_magnitude(abs(z_score) * 10)
        for threshold, severity, message in SEVERITY_THRESHOLDS:
            if mag >= threshold:
                return severity, message
        return "INFO", "Normal activity — no action required"

    def process(self, reading: SensorReading) -> Optional[SeismicAnomaly]:
        """Process a single sensor reading. Returns SeismicAnomaly if detected."""
        stats = self._get_stats(reading.sensor_id)
        z = stats.z_score(reading.value)
        lower, upper = stats.iqr
        iqr_flag = reading.value < lower or reading.value > upper
        stats.add(reading.value)

        is_anomaly = abs(z) > self.z_threshold or iqr_flag
        if not is_anomaly:
            return None

        severity, message = self._classify_severity(z)
        mag = estimate_magnitude(abs(reading.value))
        anomaly = SeismicAnomaly(
            sensor_id=reading.sensor_id,
            timestamp=reading.timestamp,
            value=reading.value,
            z_score=round(z, 3),
            iqr_flag=iqr_flag,
            severity=severity,
            magnitude_estimate=mag,
            alert_message=message,
        )
        self.anomalies.append(anomaly)
        return anomaly

    def process_batch(self, readings: List[SensorReading]) -> List[SeismicAnomaly]:
        """Process a batch of readings and return all detected anomalies."""
        results = []
        for r in readings:
            anomaly = self.process(r)
            if anomaly:
                results.append(anomaly)
        return results

    def get_summary(self) -> Dict:
        return {
            "total_anomalies": len(self.anomalies),
            "critical": sum(1 for a in self.anomalies if a.severity == "CRITICAL"),
            "high": sum(1 for a in self.anomalies if a.severity == "HIGH"),
            "medium": sum(1 for a in self.anomalies if a.severity == "MEDIUM"),
            "low": sum(1 for a in self.anomalies if a.severity == "LOW"),
            "sensors_monitored": list(self._stats.keys()),
        }


if __name__ == "__main__":
    import random
    detector = IoTSeismicAnomalyDetector(window=50, z_threshold=2.8)

    # Simulate 200 normal readings + 3 anomalous spikes
    now = datetime.datetime.utcnow()
    readings = []
    for i in range(200):
        ts = (now + datetime.timedelta(seconds=i * 0.1)).isoformat()
        val = random.gauss(0.5, 0.1)  # normal baseline ~0.5mg
        readings.append(SensorReading("SEN-UA-001", ts, val))

    # Inject seismic spikes
    for spike_val, spike_ts in [(8.5, 180), (12.3, 185), (6.1, 190)]:
        ts = (now + datetime.timedelta(seconds=spike_ts * 0.1)).isoformat()
        readings.append(SensorReading("SEN-UA-001", ts, spike_val))

    anomalies = detector.process_batch(readings)
    print(f"Detected {len(anomalies)} anomalies:")
    for a in anomalies:
        print(f"  [{a.severity}] sensor={a.sensor_id} val={a.value:.2f}mg z={a.z_score} mag~{a.magnitude_estimate} | {a.alert_message}")
    print("Summary:", detector.get_summary())
