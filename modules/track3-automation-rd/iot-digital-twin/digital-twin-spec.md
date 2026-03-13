# Green Energy IoT Digital Twin — System Specification

**Project:** AuditorSEC Track 3 — Automation & R&D
**Location:** Bakhmach, Chernihiv Oblast, Ukraine
**Version:** 1.0.0
**Date:** 2026-03-13

---

## 1. Executive Summary

This specification defines a digital twin system for monitoring and simulating green energy infrastructure in Bakhmach. The system ingests real-time sensor data from solar panels, wind turbines, battery storage, and grid connections, maintains a virtual replica of the physical installation, and provides predictive analytics, what-if simulation, and carbon credit tracking.

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Physical Layer                               │
│  ┌──────────┐  ┌──────────────┐  ┌─────────┐  ┌─────────────┐  │
│  │  Solar    │  │ Wind Turbine │  │ Battery │  │ Grid Feed-in│  │
│  │  Panels   │  │  Arrays      │  │ Storage │  │ Meter       │  │
│  └────┬─────┘  └──────┬───────┘  └────┬────┘  └──────┬──────┘  │
│       │               │               │              │          │
│       └───────────────┴───────┬───────┴──────────────┘          │
│                               │                                  │
│                    IoT Gateways (ESP32 / RPi)                   │
└───────────────────────────────┼──────────────────────────────────┘
                                │ MQTT (TLS)
┌───────────────────────────────┼──────────────────────────────────┐
│                     Data Ingestion Layer                         │
│                               │                                  │
│                    ┌──────────▼──────────┐                      │
│                    │  MQTT Broker        │                      │
│                    │  (Mosquitto/EMQX)   │                      │
│                    └──────────┬──────────┘                      │
│                               │                                  │
│               ┌───────────────┼───────────────┐                 │
│               │               │               │                  │
│    ┌──────────▼──┐  ┌────────▼────────┐  ┌───▼──────────────┐  │
│    │ Stream      │  │ TimescaleDB     │  │ Redis Cache      │  │
│    │ Processor   │  │ (Time-series)   │  │ (Real-time state)│  │
│    └──────────┬──┘  └────────┬────────┘  └───┬──────────────┘  │
│               │              │               │                   │
└───────────────┼──────────────┼───────────────┼───────────────────┘
                │              │               │
┌───────────────┼──────────────┼───────────────┼───────────────────┐
│               │    Digital Twin Engine        │                   │
│    ┌──────────▼──────────────▼───────────────▼──────────┐       │
│    │                                                     │       │
│    │  ┌────────────┐  ┌──────────────┐  ┌────────────┐  │       │
│    │  │ Asset      │  │ Simulation   │  │ Predictive │  │       │
│    │  │ Models     │  │ Engine       │  │ Maintenance│  │       │
│    │  └────────────┘  └──────────────┘  └────────────┘  │       │
│    │                                                     │       │
│    │  ┌────────────┐  ┌──────────────┐                  │       │
│    │  │ Carbon     │  │ Weather      │                  │       │
│    │  │ Tracker    │  │ Integration  │                  │       │
│    │  └────────────┘  └──────────────┘                  │       │
│    └─────────────────────────┬───────────────────────────┘       │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │ REST API / WebSocket
┌──────────────────────────────┼────────────────────────────────────┐
│                    Presentation Layer                              │
│                              │                                    │
│    ┌─────────────┐  ┌───────▼────────┐  ┌─────────────────────┐ │
│    │ Dashboard   │  │ API Gateway    │  │ Telegram Alerts     │ │
│    │ (React)     │  │ (Express)      │  │ (@audityzerbot)     │ │
│    └─────────────┘  └────────────────┘  └─────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

## 3. Sensor Types & Data Schema

### 3.1 Solar Panel Sensors

| Metric | Unit | Frequency | Range |
|--------|------|-----------|-------|
| DC Power Output | kW | 5s | 0–500 |
| Panel Temperature | °C | 30s | -30–90 |
| Irradiance | W/m² | 5s | 0–1400 |
| Efficiency | % | 60s | 0–25 |
| Inverter Status | enum | 10s | online/offline/fault |
| String Voltage | V | 5s | 0–1000 |
| String Current | A | 5s | 0–50 |

### 3.2 Wind Turbine Sensors

| Metric | Unit | Frequency | Range |
|--------|------|-----------|-------|
| Active Power Output | kW | 5s | 0–3000 |
| Wind Speed | m/s | 1s | 0–50 |
| Wind Direction | degrees | 5s | 0–360 |
| Rotor RPM | rpm | 5s | 0–25 |
| Nacelle Temperature | °C | 30s | -30–80 |
| Blade Pitch Angle | degrees | 5s | 0–90 |
| Generator Temperature | °C | 30s | -10–150 |
| Vibration Level | mm/s | 10s | 0–50 |
| Yaw Angle | degrees | 5s | 0–360 |

### 3.3 Battery Storage Sensors

| Metric | Unit | Frequency | Range |
|--------|------|-----------|-------|
| State of Charge (SoC) | % | 10s | 0–100 |
| Charge/Discharge Rate | kW | 5s | -500–500 |
| Battery Temperature | °C | 30s | -20–60 |
| Voltage | V | 5s | 0–800 |
| Current | A | 5s | -1000–1000 |
| Cycle Count | count | 3600s | 0–10000 |
| State of Health (SoH) | % | 3600s | 0–100 |

### 3.4 Grid Feed-in Sensors

| Metric | Unit | Frequency | Range |
|--------|------|-----------|-------|
| Active Power | kW | 5s | -5000–5000 |
| Reactive Power | kVAR | 5s | -5000–5000 |
| Frequency | Hz | 1s | 49–51 |
| Voltage (3-phase) | V | 5s | 0–400 |
| Power Factor | ratio | 10s | -1–1 |
| Energy Exported | kWh | 60s | cumulative |
| Energy Imported | kWh | 60s | cumulative |

## 4. MQTT Topic Structure

```
bakhmach/
├── solar/
│   ├── {panel_id}/power        # DC power output
│   ├── {panel_id}/temperature  # Panel temperature
│   ├── {panel_id}/irradiance   # Solar irradiance
│   ├── {panel_id}/efficiency   # Current efficiency
│   ├── {panel_id}/inverter     # Inverter status
│   └── {panel_id}/string       # String voltage/current
├── wind/
│   ├── {turbine_id}/power      # Active power output
│   ├── {turbine_id}/wind       # Speed and direction
│   ├── {turbine_id}/rotor      # RPM and pitch
│   ├── {turbine_id}/nacelle    # Temperature
│   ├── {turbine_id}/vibration  # Vibration levels
│   └── {turbine_id}/generator  # Generator metrics
├── battery/
│   ├── {unit_id}/soc           # State of charge
│   ├── {unit_id}/power         # Charge/discharge rate
│   ├── {unit_id}/temperature   # Battery temperature
│   ├── {unit_id}/health        # SoH and cycle count
│   └── {unit_id}/electrical    # Voltage and current
├── grid/
│   ├── feed-in/power           # Active/reactive power
│   ├── feed-in/frequency       # Grid frequency
│   ├── feed-in/voltage         # 3-phase voltage
│   └── feed-in/energy          # Cumulative energy
└── system/
    ├── status                  # Overall system health
    ├── alerts                  # System-generated alerts
    └── weather                 # Weather station data
```

## 5. Data Pipeline

### 5.1 Ingestion

1. IoT gateways (ESP32/RPi 4) collect sensor readings via Modbus TCP, RS-485, or analog inputs
2. Gateway publishes to MQTT broker over TLS 1.3 with client certificate authentication
3. MQTT broker: Eclipse Mosquitto or EMQX cluster (2-node HA)

### 5.2 Stream Processing

1. Node.js stream processor subscribes to all `bakhmach/#` topics
2. Validates incoming data against schema (Zod)
3. Detects anomalies using sliding-window statistics (z-score > 3σ)
4. Publishes derived metrics (efficiency calculations, power factor corrections)
5. Triggers alerts for out-of-range values

### 5.3 Storage

| Store | Purpose | Retention |
|-------|---------|-----------|
| TimescaleDB | Time-series sensor data | 5 years (with compression after 30 days) |
| Redis | Real-time asset state cache | Current values only |
| PostgreSQL | Asset registry, maintenance logs, carbon credits | Permanent |

### 5.4 Data Retention Policy

- Raw data (5s intervals): 30 days
- 1-minute aggregates: 1 year
- 15-minute aggregates: 5 years
- Daily summaries: permanent

## 6. Digital Twin Model

### 6.1 Asset Hierarchy

```
Bakhmach Installation
├── Solar Farm (N panels in M strings)
│   ├── String 1
│   │   ├── Panel S1-001
│   │   ├── Panel S1-002
│   │   └── ...
│   ├── String 2
│   └── Inverter INV-001
├── Wind Farm (K turbines)
│   ├── Turbine WT-001
│   ├── Turbine WT-002
│   └── ...
├── Battery Storage (J units)
│   ├── Battery Unit BAT-001
│   └── Battery Unit BAT-002
└── Grid Connection
    └── Feed-in Meter GRD-001
```

### 6.2 Simulation Engine

The simulation engine supports what-if scenarios:

- **Production forecasting**: Given weather forecast data, predict energy production for the next 24–72 hours
- **Battery scheduling**: Optimize charge/discharge cycles based on energy prices and predicted production
- **Capacity planning**: Model adding N additional panels or turbines to the installation
- **Failure impact**: Simulate asset failure to assess impact on total production

### 6.3 State Synchronization

- Real-time state updates via MQTT subscriptions (< 1s latency)
- State snapshots stored every 60 seconds for historical replay
- Conflict resolution: sensor data always takes precedence over simulated values

## 7. Predictive Maintenance

### 7.1 Algorithms (Stubs — Phase 2 Implementation)

| Asset | Algorithm | Input Features | Prediction |
|-------|-----------|----------------|------------|
| Solar Panel | Degradation curve fitting | efficiency, temperature, age | Remaining useful life |
| Wind Turbine | Vibration anomaly detection | vibration spectrum, RPM, temperature | Bearing failure probability |
| Battery | Capacity fade model | cycle count, temperature history, SoH | Replacement timeline |
| Inverter | Thermal stress analysis | temperature, load factor, uptime | MTBF estimate |

### 7.2 Alert Thresholds

- **Warning**: Predicted failure within 30 days
- **Urgent**: Predicted failure within 7 days
- **Critical**: Imminent failure (< 24 hours) or safety hazard

## 8. Carbon Credit Tracking

### 8.1 Methodology

Based on UNFCCC CDM (Clean Development Mechanism) small-scale methodology:

- Baseline: Ukraine grid emission factor (0.764 tCO₂/MWh — 2024 value from IFI Harmonized Grid Emission Factor dataset)
- Monitored: Actual renewable energy produced and fed to grid
- Credits = (Energy_exported_MWh) × (Grid_emission_factor) × (Reserve_discount_factor)

### 8.2 Reporting

- Real-time carbon credit accumulation display
- Monthly verification reports
- Annual audit-ready documentation
- Integration with voluntary carbon markets (Verra VCS, Gold Standard)

## 9. Security

- All MQTT traffic encrypted with TLS 1.3
- Client certificate authentication for IoT gateways
- API authentication via JWT with role-based access
- Sensor data integrity: HMAC-SHA256 signatures on gateway readings
- Network segmentation: IoT VLAN isolated from corporate network
- Firmware OTA updates signed with Ed25519

## 10. Deployment

### 10.1 Infrastructure

| Component | Deployment | Specs |
|-----------|-----------|-------|
| MQTT Broker | Docker (2-node HA) | 2 vCPU, 4GB RAM |
| TimescaleDB | Docker | 4 vCPU, 16GB RAM, 1TB SSD |
| Redis | Docker | 1 vCPU, 2GB RAM |
| Twin Engine | Docker | 4 vCPU, 8GB RAM |
| Dashboard | Static + CDN | Vercel/Cloudflare Pages |
| IoT Gateways | On-site | ESP32-S3 / RPi 4 |

### 10.2 Monitoring

- Prometheus + Grafana for infrastructure metrics
- Custom health checks for MQTT connectivity
- Telegram alerts via @audityzer_alerts_bot for system issues
