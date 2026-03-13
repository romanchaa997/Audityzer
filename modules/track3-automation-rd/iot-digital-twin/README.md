# @auditorsec/iot-digital-twin

Green energy IoT digital twin for the AuditorSEC Bakhmach installation. Monitors solar panels, wind turbines, battery storage, and grid feed-in with real-time state management, simulation, and carbon credit tracking.

## Architecture

```
Physical Sensors (ESP32 / RPi 4)
        │ MQTT (TLS 1.3)
        ▼
┌─────────────────────────────────────────┐
│  MQTT Broker (Mosquitto / EMQX)        │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
Stream       TimescaleDB    Redis
Processor    (history)      (live state)
    │
    ▼
┌─────────────────────────────────────────┐
│  Digital Twin Engine (twin-model.ts)    │
│                                         │
│  ┌──────────┐  ┌─────────────────────┐  │
│  │ Asset    │  │ Simulation Engine   │  │
│  │ Registry │  │ • Production fcst   │  │
│  ├──────────┤  │ • Battery schedule  │  │
│  │ Sensor   │  │ • Capacity planning │  │
│  │ Ingestion│  │ • Failure impact    │  │
│  ├──────────┤  └─────────────────────┘  │
│  │ Alert    │  ┌─────────────────────┐  │
│  │ Engine   │  │ Carbon Credit       │  │
│  └──────────┘  │ Tracker (CDM)       │  │
│                └─────────────────────┘  │
└──────────────────┬──────────────────────┘
                   │ REST API / WebSocket
                   ▼
            React Dashboard
```

## Modules

| File | Description |
|---|---|
| `twin-model.ts` | Core digital twin engine — asset state management, sensor ingestion, simulation, MQTT integration, carbon tracking |
| `digital-twin-spec.md` | Full system specification — sensors, MQTT topics, data pipeline, asset hierarchy, predictive maintenance |
| `dashboard-spec.md` | Dashboard requirements — 9 pages, REST/WebSocket API, UI components, tech stack |

## Asset Types

| Asset | Sensors | Key Metrics |
|---|---|---|
| Solar Panel | power, temperature, irradiance, efficiency, voltage, current | DC output (kW), efficiency (%), string V/A |
| Wind Turbine | power, wind speed/direction, rotor RPM, vibration, nacelle/gen temp | Active power (kW), capacity factor, vibration (mm/s) |
| Battery Unit | SoC, charge/discharge rate, temperature, voltage, current, SoH | State of charge (%), health (%), cycle count |
| Grid Connection | active/reactive power, frequency, 3-phase voltage, power factor | Export/import (kW), frequency (Hz), power factor |

## MQTT Topic Structure

```
bakhmach/
├── solar/{panel_id}/{metric}
├── wind/{turbine_id}/{metric}
├── battery/{unit_id}/{metric}
├── grid/{metric}
└── system/{status|alerts|weather}
```

## Usage

```typescript
import { DigitalTwinEngine } from './twin-model.js';

const twin = new DigitalTwinEngine();

// Register assets
twin.registerAsset({
  id: 'solar-01',
  name: 'Array A',
  type: 'solar',
  health: 'healthy',
  lastUpdated: new Date().toISOString(),
  online: true,
  ratedCapacity: 500,
  sensors: { power: 0, temperature: 25, irradiance: 0, voltage: 0, current: 0, efficiency: 0, dailyYield: 0 },
  capacityFactor: 0,
  degradationRate: 0.005,
  commissionedDate: '2024-06-15',
});

// Connect MQTT for live sensor data
import mqtt from 'mqtt';
twin.connectMqtt(mqtt.connect('mqtts://broker.example.com'));

// Listen for events
twin.on('stateUpdate', (asset) => console.log('Updated:', asset.id));
twin.on('alert', (alert) => console.log('Alert:', alert.title));

// Run simulation
const result = twin.runSimulation({
  durationHours: 24,
  timeStepSeconds: 900,
});
console.log(`Projected: ${result.totalProduction.toFixed(1)} kWh, ${result.carbonOffset.toFixed(3)} tCO₂`);

// Dashboard API
const summary = twin.getDashboardSummary();
```

## Carbon Credit Methodology

Based on UNFCCC CDM small-scale methodology:
- **Baseline**: Ukraine grid emission factor (0.6 tCO₂/MWh)
- **Formula**: Credits = Energy_exported (MWh) × Grid_emission_factor
- **Valuation**: EU ETS carbon price (~€65/tCO₂)

## Location

**Bakhmach, Chernihiv Oblast, Ukraine** — 51.1833°N, 32.8167°E

## Setup

```bash
npm install
npm run build
```

## Deployment

Designed for containerized deployment alongside MQTT broker, TimescaleDB, and Redis.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
CMD ["node", "dist/twin-model.js"]
```
