"""Fuel Trip Analytics Service - Z-score anomaly detection
AuditorSEC Fuel Compliance MVP | Mar 22 2026
"""
from __future__ import annotations
from statistics import mean, stdev
from uuid import uuid4, UUID
from datetime import date, timedelta
from sqlalchemy.orm import Session

MIN_DISTANCE = 10
Z_THRESHOLD = 2.0
DEVIATION_THRESHOLD_PCT = 15.0
DEFAULT_NORM = {"truck": 28.0, "car": 8.0, "bus": 20.0}


def build_trips_for_client(db: Session, client_id: UUID) -> None:
    from backend.models.fuel import FuelTransaction, Vehicle, VehicleTripMetric
    txs = (
        db.query(FuelTransaction)
        .filter(
            FuelTransaction.client_id == client_id,
            FuelTransaction.odometer_km.isnot(None),
        )
        .order_by(FuelTransaction.vehicle_id, FuelTransaction.ts)
        .all()
    )
    by_vehicle: dict[UUID, list] = {}
    for tx in txs:
        by_vehicle.setdefault(tx.vehicle_id, []).append(tx)
    for vid, vtxs in by_vehicle.items():
        _build_vehicle_trips(db, client_id, vid, vtxs)
    db.commit()


def _build_vehicle_trips(db, client_id, vehicle_id, txs):
    from backend.models.fuel import Vehicle, VehicleTripMetric
    vehicle = db.get(Vehicle, vehicle_id)
    norm = float(vehicle.norm_l_per_100 or DEFAULT_NORM.get(vehicle.type, 10.0))
    trips, prev = [], None
    for tx in txs:
        if prev is None:
            prev = tx
            continue
        dist = float(tx.odometer_km or 0) - float(prev.odometer_km or 0)
        if dist <= 0:
            prev = tx
            continue
        fuel = float(tx.volume_l or 0)
        fact = (fuel / dist * 100) if dist > 0 else None
        t = VehicleTripMetric(
            id=uuid4(), client_id=client_id, vehicle_id=vehicle_id,
            start_tx_id=prev.id, end_tx_id=tx.id,
            start_ts=prev.ts, end_ts=tx.ts,
            distance_km=dist, fuel_used_l=fuel,
            fact_l_per_100=fact, norm_l_per_100=norm,
        )
        trips.append(t)
        prev = tx
    facts = [t.fact_l_per_100 for t in trips
             if t.distance_km and t.distance_km >= MIN_DISTANCE and t.fact_l_per_100]
    if not facts:
        return
    mu = mean(facts)
    sigma = stdev(facts) if len(facts) > 1 else 0.0
    for t in trips:
        if not t.distance_km or t.distance_km < MIN_DISTANCE:
            t.deviation_abs = t.deviation_pct = t.z_score = None
            t.anomaly_flag = False
        else:
            t.deviation_abs = t.fact_l_per_100 - t.norm_l_per_100
            t.deviation_pct = (t.fact_l_per_100 / t.norm_l_per_100 - 1) * 100
            if sigma > 0:
                t.z_score = (t.fact_l_per_100 - mu) / sigma
                t.anomaly_flag = abs(t.z_score) >= Z_THRESHOLD
            else:
                t.z_score = 0.0
                t.anomaly_flag = abs(t.deviation_pct) >= DEVIATION_THRESHOLD_PCT
        db.merge(t)


def recompute_station_scores(
    db: Session, client_id: UUID, period_start: date, period_end: date
) -> None:
    from backend.models.fuel import FuelTransaction, VehicleTripMetric, StationScore
    rows = (
        db.query(VehicleTripMetric, FuelTransaction.station_id)
        .join(FuelTransaction, VehicleTripMetric.end_tx_id == FuelTransaction.id)
        .filter(
            VehicleTripMetric.client_id == client_id,
            VehicleTripMetric.start_ts >= period_start,
            VehicleTripMetric.end_ts < period_end + timedelta(days=1),
            VehicleTripMetric.distance_km >= MIN_DISTANCE,
        )
        .all()
    )
    by_station: dict[UUID, list] = {}
    for trip, sid in rows:
        by_station.setdefault(sid, []).append(trip)
    for sid, trips in by_station.items():
        facts = [float(t.fact_l_per_100) for t in trips if t.fact_l_per_100]
        devs  = [float(t.deviation_pct)  for t in trips if t.deviation_pct is not None]
        anom  = [t for t in trips if t.anomaly_flag]
        score = _score(mean(devs) if devs else None,
                       len(anom) / len(trips) * 100 if trips else None)
        db.merge(StationScore(
            client_id=client_id, station_id=sid,
            period_start=period_start, period_end=period_end,
            trips_count=len(trips),
            avg_fact_l_per_100=mean(facts) if facts else None,
            avg_deviation_pct=mean(devs) if devs else None,
            anomaly_share_pct=len(anom)/len(trips)*100 if trips else None,
            score=score,
        ))
    db.commit()


def _score(avg_dev_pct, anomaly_share_pct):
    s = 100.0
    if avg_dev_pct is not None:
        s -= max(0.0, min(40.0, abs(avg_dev_pct) * 2 - 40))
    if anomaly_share_pct is not None:
        s -= max(0.0, min(40.0, anomaly_share_pct * 2 - 40))
    return max(0.0, min(100.0, s))
