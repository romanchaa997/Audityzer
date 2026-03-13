# Green Energy Dashboard — Requirements Specification

**Project:** AuditorSEC Track 3 — Bakhmach Digital Twin
**Version:** 1.0.0
**Date:** 2026-03-13

---

## 1. Overview

React-based dashboard for real-time monitoring and management of the Bakhmach green energy digital twin. Built on the AuditorSEC platform stack (React + Vite + Tailwind + shadcn/ui + Recharts).

## 2. Pages & Components

### 2.1 Overview Dashboard (`/energy`)

**Real-time energy production/consumption charts:**

- **Total Power Gauge**: Live aggregate power output (kW) with animated radial gauge
- **Production Breakdown**: Stacked area chart showing solar vs wind contribution over time
- **Net Energy Flow**: Real-time Sankey diagram — Solar → Battery / Grid, Wind → Battery / Grid, Battery → Grid / Load
- **24-Hour Production Timeline**: Line chart with 5-minute resolution, overlaid with weather data
- **Key Metrics Cards**:
  - Total energy produced today (kWh)
  - Current power output (kW)
  - Grid feed-in rate (kW)
  - Battery state of charge (%)
  - Carbon credits accumulated today (tCO₂)
  - System efficiency (%)

### 2.2 Solar Farm (`/energy/solar`)

- Individual panel/string performance heatmap
- Irradiance vs output efficiency scatter plot
- Inverter status indicators (online/offline/fault)
- Panel temperature map
- String-level current/voltage charts
- Degradation trend per panel (monthly view)

### 2.3 Wind Farm (`/energy/wind`)

- Turbine power curves (actual vs theoretical)
- Wind rose diagram showing direction/speed distribution
- Individual turbine status cards with key metrics
- Vibration trend analysis chart
- Nacelle/generator temperature monitoring
- Historical capacity factor chart

### 2.4 Battery Storage (`/energy/battery`)

- State of Charge timeline (24h, 7d, 30d views)
- Charge/discharge rate real-time chart
- Temperature monitoring with threshold alerts
- State of Health trend over time
- Cycle count and remaining cycles estimate
- Optimal charge schedule (from simulation engine)

### 2.5 Grid Connection (`/energy/grid`)

- Power import/export balance chart
- Grid frequency stability monitor
- Voltage quality (3-phase) chart
- Monthly energy export/import summary
- Revenue estimation based on feed-in tariffs
- Power factor monitoring

### 2.6 Predictive Maintenance (`/energy/maintenance`)

**Predictive maintenance alerts:**

- Alert list sorted by urgency (Critical / Urgent / Warning)
- Asset health scores as a sortable table
- Predicted failure timeline (Gantt-style chart)
- Maintenance history log
- Recommended actions for each alert
- Integration with ticketing system for work order creation

### 2.7 Carbon Credits (`/energy/carbon`)

**Carbon credit accumulation tracker:**

- Real-time carbon credit counter (tCO₂ avoided)
- Monthly accumulation bar chart
- Year-over-year comparison
- Revenue projection at current market prices
- Verification status and audit trail
- Export buttons for compliance reports (PDF/CSV)

### 2.8 Weather Integration (`/energy/weather`)

**Weather integration for production forecasting:**

- Current weather conditions at Bakhmach (temperature, cloud cover, wind speed/direction, humidity)
- 72-hour weather forecast overlay on production chart
- Historical weather vs production correlation analysis
- Solar irradiance forecast map
- Wind speed forecast with power production estimate
- Weather data source: Open-Meteo API (free tier, no key required)

### 2.9 Map View (`/energy/map`)

**Map view of Bakhmach installation sites:**

- Interactive map (Mapbox GL JS or Leaflet) centered on Bakhmach (51.1833°N, 32.8167°E)
- Asset markers:
  - Solar panels: yellow markers with power output tooltip
  - Wind turbines: blue markers with wind speed/power tooltip
  - Battery units: green markers with SoC tooltip
  - Grid connection point: red marker
- Heatmap overlay for energy density
- Satellite/terrain toggle
- Click-to-zoom on individual assets
- Real-time animation showing energy flow direction

## 3. Common UI Components

### 3.1 Header

- AuditorSEC logo with dark Chainalysis/Palantir theme
- Navigation breadcrumb
- System health indicator (green/yellow/red)
- Last data update timestamp (auto-refreshing)
- User avatar and settings

### 3.2 Real-time Indicators

- WebSocket connection status badge
- Data freshness indicator per widget (stale if > 30s old)
- Auto-reconnect with exponential backoff

### 3.3 Time Range Selector

- Preset ranges: Live, 1h, 6h, 24h, 7d, 30d, Custom
- Date picker for custom range
- Resolution auto-adjustment based on range

### 3.4 Alert Toast System

- Top-right toast notifications for new maintenance alerts
- Severity-colored borders (red/orange/yellow)
- Click to navigate to affected asset
- Grouped if multiple alerts fire simultaneously

## 4. Data Integration

### 4.1 REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/twin/state` | GET | Current digital twin state |
| `/api/twin/assets/{id}` | GET | Individual asset details |
| `/api/twin/history` | GET | Historical data (query params: asset, metric, from, to) |
| `/api/twin/simulate` | POST | Run what-if simulation |
| `/api/twin/carbon` | GET | Carbon credit summary |
| `/api/twin/maintenance` | GET | Maintenance alerts |
| `/api/twin/weather` | GET | Current and forecast weather |

### 4.2 WebSocket Channels

| Channel | Payload | Frequency |
|---------|---------|-----------|
| `state:realtime` | Full twin state snapshot | 5s |
| `alerts:new` | New alert object | On event |
| `carbon:update` | Carbon credit delta | 60s |

## 5. Non-Functional Requirements

- **Latency**: Dashboard updates within 2 seconds of sensor reading
- **Browser support**: Chrome 100+, Firefox 100+, Safari 16+, Edge 100+
- **Responsive**: Functional on 1280px+ (desktop/tablet focus)
- **Accessibility**: WCAG 2.1 AA compliance for all interactive elements
- **Theme**: Dark mode only (Chainalysis/Palantir aesthetic — dark backgrounds, green/blue accent colors, monospace numbers)

## 6. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts (existing) + D3 (Sankey, wind rose) |
| Maps | Leaflet + React-Leaflet |
| State | Zustand (real-time twin state) |
| WebSocket | Native WebSocket with reconnect wrapper |
| API Client | TanStack Query (React Query) |
| Date handling | date-fns with IANA timezone support |
