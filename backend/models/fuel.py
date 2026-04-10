"""Fuel Compliance MVP — SQLAlchemy 2.0 ORM Models
AuditorSEC — Fuel Analytics API v0.1.0
Mar 22 2026
"""
from __future__ import annotations
from datetime import datetime, date
from uuid import uuid4, UUID
from sqlalchemy import Column, String, DateTime, Numeric, Boolean, Integer, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Client(Base):
    __tablename__ = "clients"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    vehicles = relationship("Vehicle", back_populates="client")
    stations = relationship("Station", back_populates="client")


class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    client_id = Column(PGUUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    reg_number = Column(String, nullable=False)
    type = Column(String, nullable=False)  # truck, car, bus
    fuel_type = Column(String, nullable=False)  # diesel, a95
    norm_l_per_100 = Column(Numeric(10, 3))
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    client = relationship("Client", back_populates="vehicles")
    transactions = relationship("FuelTransaction", back_populates="vehicle")
    trips = relationship("VehicleTripMetric", back_populates="vehicle")


class Station(Base):
    __tablename__ = "stations"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    client_id = Column(PGUUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    external_id = Column(String)
    name = Column(String, nullable=False)
    network_name = Column(String)
    latitude = Column(Numeric(9, 6))
    longitude = Column(Numeric(9, 6))
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    client = relationship("Client", back_populates="stations")
    transactions = relationship("FuelTransaction", back_populates="station")
    scores = relationship("StationScore", back_populates="station")


class FuelTransaction(Base):
    __tablename__ = "fuel_transactions"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    client_id = Column(PGUUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    vehicle_id = Column(PGUUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False)
    station_id = Column(PGUUID(as_uuid=True), ForeignKey("stations.id"), nullable=False)
    ts = Column(DateTime(timezone=True), nullable=False)
    fuel_type = Column(String, nullable=False)
    volume_l = Column(Numeric(12, 3), nullable=False)
    price_per_l = Column(Numeric(12, 4))
    total_amount = Column(Numeric(14, 2))
    odometer_km = Column(Numeric(12, 2))
    source = Column(String, nullable=False)  # csv_upload, api, manual
    raw_payload = Column(JSONB)
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    vehicle = relationship("Vehicle", back_populates="transactions")
    station = relationship("Station", back_populates="transactions")


class VehicleTripMetric(Base):
    __tablename__ = "vehicle_trip_metrics"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    client_id = Column(PGUUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    vehicle_id = Column(PGUUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False)
    start_tx_id = Column(PGUUID(as_uuid=True), ForeignKey("fuel_transactions.id"), nullable=False)
    end_tx_id = Column(PGUUID(as_uuid=True), ForeignKey("fuel_transactions.id"), nullable=False)
    start_ts = Column(DateTime(timezone=True), nullable=False)
    end_ts = Column(DateTime(timezone=True), nullable=False)
    distance_km = Column(Numeric(12, 2))
    fuel_used_l = Column(Numeric(12, 3))
    fact_l_per_100 = Column(Numeric(10, 3))
    norm_l_per_100 = Column(Numeric(10, 3))
    deviation_abs = Column(Numeric(10, 3))
    deviation_pct = Column(Numeric(10, 3))
    z_score = Column(Numeric(10, 3))
    anomaly_flag = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    vehicle = relationship("Vehicle", back_populates="trips")
    start_tx = relationship("FuelTransaction", foreign_keys=[start_tx_id])
    end_tx = relationship("FuelTransaction", foreign_keys=[end_tx_id])


class StationScore(Base):
    __tablename__ = "station_scores"
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    client_id = Column(PGUUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    station_id = Column(PGUUID(as_uuid=True), ForeignKey("stations.id"), nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    trips_count = Column(Integer, nullable=False)
    avg_fact_l_per_100 = Column(Numeric(10, 3))
    avg_deviation_pct = Column(Numeric(10, 3))
    anomaly_share_pct = Column(Numeric(10, 3))
    score = Column(Numeric(5, 2))  # 0-100
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    station = relationship("Station", back_populates="scores")
