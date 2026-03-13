/**
 * @fileoverview Core Digital Twin module for Bakhmach Green Energy installation.
 *
 * Manages real-time state for solar, wind, battery, and grid assets.
 * Provides simulation engine for what-if scenarios and MQTT integration
 * for live sensor data ingestion.
 *
 * @module twin-model
 */

import { EventEmitter } from "events";

// ---------------------------------------------------------------------------
// Types — IoT Sensor Data
// ---------------------------------------------------------------------------

/** Base telemetry payload received from any sensor. */
export interface SensorReading {
  /** ISO-8601 timestamp of the reading */
  time: string;
  /** Asset category */
  assetType: "solar" | "wind" | "battery" | "grid";
  /** Unique identifier of the physical asset */
  assetId: string;
  /** Metric name (e.g. 'power', 'temp', 'soc') */
  metric: string;
  /** Numeric value */
  value: number;
  /** Engineering unit (kW, °C, %, V, A, etc.) */
  unit: string;
  /** Data quality score 0–100 */
  quality: number;
}

/** Solar panel telemetry snapshot. */
export interface SolarSensorData {
  /** DC power output in kW */
  power: number;
  /** Panel surface temperature in °C */
  temperature: number;
  /** Irradiance in W/m² */
  irradiance: number;
  /** DC bus voltage in V */
  voltage: number;
  /** DC current in A */
  current: number;
  /** Inverter conversion efficiency 0–100 % */
  efficiency: number;
  /** Cumulative daily energy yield in kWh */
  dailyYield: number;
}

/** Wind turbine telemetry snapshot. */
export interface WindSensorData {
  /** Power output in kW */
  power: number;
  /** Rotor speed in RPM */
  rotorSpeed: number;
  /** Wind speed in m/s */
  windSpeed: number;
  /** Wind direction in degrees */
  windDirection: number;
  /** Nacelle temperature in °C */
  nacelleTemp: number;
  /** Vibration level in mm/s */
  vibration: number;
  /** Yaw angle in degrees */
  yawAngle: number;
  /** Blade pitch angle in degrees */
  pitchAngle: number;
}

/** Battery bank telemetry snapshot. */
export interface BatterySensorData {
  /** State of charge 0–100 % */
  soc: number;
  /** Charge (positive) or discharge (negative) power in kW */
  power: number;
  /** Battery terminal voltage in V */
  voltage: number;
  /** Battery current in A (positive = charging) */
  current: number;
  /** Average cell temperature in °C */
  cellTemp: number;
  /** Cumulative charge/discharge cycle count */
  cycleCount: number;
  /** State of health 0–100 % */
  soh: number;
}

/** Grid interconnection telemetry snapshot. */
export interface GridSensorData {
  /** Power exported to grid in kW */
  exportPower: number;
  /** Power imported from grid in kW */
  importPower: number;
  /** Grid frequency in Hz */
  frequency: number;
  /** Grid voltage in V (line-to-line) */
  voltage: number;
  /** Power factor (-1 to 1) */
  powerFactor: number;
  /** Cumulative energy exported in kWh */
  totalExport: number;
}

// ---------------------------------------------------------------------------
// Types — Asset State
// ---------------------------------------------------------------------------

/** Health status for any energy asset. */
export type AssetHealth = "healthy" | "degraded" | "warning" | "critical" | "offline";

/** Base asset state shared by all asset types. */
interface BaseAssetState {
  /** Unique asset identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Current health classification */
  health: AssetHealth;
  /** ISO-8601 timestamp of last sensor update */
  lastUpdated: string;
  /** Whether the asset is online and reporting data */
  online: boolean;
}

/** Runtime state of a solar array. */
export interface SolarAssetState extends BaseAssetState {
  type: "solar";
  /** Nameplate capacity in kWp */
  ratedCapacity: number;
  /** Latest sensor data */
  sensors: SolarSensorData;
  /** Current capacity factor (actual / rated) */
  capacityFactor: number;
  /** Estimated annual degradation rate (fraction, e.g. 0.005) */
  degradationRate: number;
  /** Installation commissioning date ISO-8601 */
  commissionedDate: string;
}

/** Runtime state of a wind turbine. */
export interface WindAssetState extends BaseAssetState {
  type: "wind";
  /** Nameplate capacity in kW */
  ratedCapacity: number;
  /** Latest sensor data */
  sensors: WindSensorData;
  /** Current capacity factor */
  capacityFactor: number;
  /** Cut-in wind speed m/s */
  cutInSpeed: number;
  /** Rated wind speed m/s */
  ratedSpeed: number;
  /** Cut-out wind speed m/s */
  cutOutSpeed: number;
}

/** Runtime state of a battery bank. */
export interface BatteryAssetState extends BaseAssetState {
  type: "battery";
  /** Nameplate capacity in kWh */
  ratedCapacity: number;
  /** Currently usable capacity accounting for SOH */
  usableCapacity: number;
  /** Latest sensor data */
  sensors: BatterySensorData;
  /** Maximum charge/discharge rate in kW */
  maxPower: number;
}

/** Runtime state of the grid interconnection. */
export interface GridAssetState extends BaseAssetState {
  type: "grid";
  /** Maximum export capacity in kW */
  maxExport: number;
  /** Maximum import capacity in kW */
  maxImport: number;
  /** Latest sensor data */
  sensors: GridSensorData;
}

/** Union type for all asset states. */
export type AssetState =
  | SolarAssetState
  | WindAssetState
  | BatteryAssetState
  | GridAssetState;

// ---------------------------------------------------------------------------
// Types — Simulation
// ---------------------------------------------------------------------------

/** Parameters for a what-if simulation run. */
export interface SimulationParams {
  /** Duration of simulation in hours */
  durationHours: number;
  /** Simulation time step in seconds */
  timeStepSeconds: number;
  /** Optional overrides for asset configurations */
  assetOverrides?: Partial<Record<string, Partial<AssetState>>>;
  /** Weather scenario to use */
  weatherScenario?: WeatherScenario;
}

/** Weather input for simulation. */
export interface WeatherScenario {
  /** Array of hourly weather data points */
  hourly: WeatherDataPoint[];
}

/** Single weather data point. */
export interface WeatherDataPoint {
  /** ISO-8601 timestamp */
  time: string;
  /** Global horizontal irradiance W/m² */
  ghi: number;
  /** Wind speed at hub height m/s */
  windSpeed: number;
  /** Wind direction degrees */
  windDirection: number;
  /** Ambient temperature °C */
  temperature: number;
  /** Cloud cover 0–100 % */
  cloudCover: number;
}

/** Result of a simulation run. */
export interface SimulationResult {
  /** Unique simulation run ID */
  runId: string;
  /** Start time of simulation window */
  startTime: string;
  /** End time of simulation window */
  endTime: string;
  /** Total energy produced in kWh */
  totalProduction: number;
  /** Total energy consumed in kWh */
  totalConsumption: number;
  /** Net grid export in kWh */
  netGridExport: number;
  /** Carbon offset in tCO₂ */
  carbonOffset: number;
  /** Per-asset production breakdown */
  assetProduction: Record<string, number>;
  /** Time-series output at each simulation step */
  timeSeries: SimulationTimeStep[];
}

/** Single time step in simulation output. */
export interface SimulationTimeStep {
  /** ISO-8601 timestamp */
  time: string;
  /** Total solar production kW */
  solarPower: number;
  /** Total wind production kW */
  windPower: number;
  /** Battery power kW (positive = discharging) */
  batteryPower: number;
  /** Battery SOC % */
  batterySoc: number;
  /** Grid export kW */
  gridExport: number;
  /** Grid import kW */
  gridImport: number;
}

// ---------------------------------------------------------------------------
// Types — Carbon Credits
// ---------------------------------------------------------------------------

/** Carbon credit accumulation record. */
export interface CarbonCreditRecord {
  /** Reporting period start ISO-8601 */
  periodStart: string;
  /** Reporting period end ISO-8601 */
  periodEnd: string;
  /** Total energy exported to grid in MWh */
  energyExportedMwh: number;
  /** Grid emission factor used (tCO₂/MWh) */
  emissionFactor: number;
  /** Carbon offset in tCO₂ */
  carbonOffsetTonnes: number;
  /** Estimated credit value in EUR */
  estimatedValueEur: number;
}

// ---------------------------------------------------------------------------
// Types — Alerts
// ---------------------------------------------------------------------------

/** Maintenance or operational alert. */
export interface MaintenanceAlert {
  id: string;
  assetId: string;
  assetType: "solar" | "wind" | "battery" | "grid";
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  metric: string;
  currentValue: number;
  threshold: number;
  createdAt: string;
  acknowledged: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Ukraine average grid emission factor in tCO₂ per MWh. */
const UKRAINE_GRID_EMISSION_FACTOR = 0.6;

/** Average EU carbon credit price in EUR per tCO₂. */
const CARBON_CREDIT_PRICE_EUR = 65;

/** Stale data threshold — mark asset offline after this many ms without data. */
const STALE_THRESHOLD_MS = 120_000; // 2 minutes

// ---------------------------------------------------------------------------
// MQTT Client Interface
// ---------------------------------------------------------------------------

/**
 * Minimal MQTT client interface.
 * Consumers should provide an implementation (e.g. from the `mqtt` npm package).
 */
export interface MqttClientAdapter {
  subscribe(topic: string, opts?: Record<string, unknown>): void;
  on(event: "message", cb: (topic: string, payload: Buffer) => void): void;
  on(event: "connect", cb: () => void): void;
  on(event: "error", cb: (err: Error) => void): void;
  publish(topic: string, payload: string | Buffer): void;
}

// ---------------------------------------------------------------------------
// Digital Twin Engine
// ---------------------------------------------------------------------------

/**
 * Core Digital Twin engine.
 *
 * Manages the live state of all energy assets, processes incoming sensor
 * data, runs simulations, and exposes a REST-compatible API surface.
 *
 * @example
 * ```ts
 * const twin = new DigitalTwinEngine();
 * twin.registerAsset({ id: 'solar-01', name: 'Array A', type: 'solar', ... });
 * twin.connectMqtt(mqttClient);
 * twin.on('alert', (alert) => console.log(alert));
 * ```
 */
export class DigitalTwinEngine extends EventEmitter {
  /** Map of asset ID → current state. */
  private assets: Map<string, AssetState> = new Map();

  /** Accumulated carbon credit records. */
  private carbonRecords: CarbonCreditRecord[] = [];

  /** Active maintenance alerts. */
  private alerts: MaintenanceAlert[] = [];

  /** Stale-check interval handle. */
  private staleCheckInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    super();
    this.startStaleCheck();
  }

  // -----------------------------------------------------------------------
  // Asset Registration
  // -----------------------------------------------------------------------

  /**
   * Register a new energy asset in the digital twin.
   * @param asset - Full initial state of the asset.
   */
  registerAsset(asset: AssetState): void {
    this.assets.set(asset.id, asset);
    this.emit("assetRegistered", asset);
  }

  /**
   * Remove an asset from the digital twin.
   * @param assetId - ID of the asset to remove.
   */
  removeAsset(assetId: string): boolean {
    const deleted = this.assets.delete(assetId);
    if (deleted) this.emit("assetRemoved", assetId);
    return deleted;
  }

  /**
   * Get current state of a single asset.
   * @param assetId - Asset identifier.
   */
  getAsset(assetId: string): AssetState | undefined {
    return this.assets.get(assetId);
  }

  /**
   * Get current state of all registered assets.
   */
  getAllAssets(): AssetState[] {
    return Array.from(this.assets.values());
  }

  // -----------------------------------------------------------------------
  // Sensor Data Ingestion
  // -----------------------------------------------------------------------

  /**
   * Process a single sensor reading and update asset state.
   * Emits 'stateUpdate' and optionally 'alert' events.
   *
   * @param reading - Incoming sensor data point.
   */
  processSensorReading(reading: SensorReading): void {
    const asset = this.assets.get(reading.assetId);
    if (!asset) return;

    asset.lastUpdated = reading.time;
    asset.online = true;

    switch (asset.type) {
      case "solar":
        this.updateSolarState(asset, reading);
        break;
      case "wind":
        this.updateWindState(asset, reading);
        break;
      case "battery":
        this.updateBatteryState(asset, reading);
        break;
      case "grid":
        this.updateGridState(asset, reading);
        break;
    }

    this.checkAlertThresholds(asset, reading);
    this.emit("stateUpdate", asset);
  }

  /** Update solar asset state from a sensor reading. */
  private updateSolarState(asset: SolarAssetState, reading: SensorReading): void {
    const { metric, value } = reading;
    const s = asset.sensors;

    switch (metric) {
      case "power":       s.power = value; break;
      case "temp":        s.temperature = value; break;
      case "irradiance":  s.irradiance = value; break;
      case "voltage":     s.voltage = value; break;
      case "current":     s.current = value; break;
      case "efficiency":  s.efficiency = value; break;
      case "yield":       s.dailyYield = value; break;
    }

    asset.capacityFactor = asset.ratedCapacity > 0
      ? s.power / asset.ratedCapacity
      : 0;
  }

  /** Update wind asset state from a sensor reading. */
  private updateWindState(asset: WindAssetState, reading: SensorReading): void {
    const { metric, value } = reading;
    const s = asset.sensors;

    switch (metric) {
      case "power":       s.power = value; break;
      case "rpm":         s.rotorSpeed = value; break;
      case "wind_speed":  s.windSpeed = value; break;
      case "wind_dir":    s.windDirection = value; break;
      case "nacelle_temp": s.nacelleTemp = value; break;
      case "vibration":   s.vibration = value; break;
      case "yaw":         s.yawAngle = value; break;
      case "pitch":       s.pitchAngle = value; break;
    }

    asset.capacityFactor = asset.ratedCapacity > 0
      ? s.power / asset.ratedCapacity
      : 0;
  }

  /** Update battery asset state from a sensor reading. */
  private updateBatteryState(asset: BatteryAssetState, reading: SensorReading): void {
    const { metric, value } = reading;
    const s = asset.sensors;

    switch (metric) {
      case "soc":     s.soc = value; break;
      case "power":   s.power = value; break;
      case "voltage": s.voltage = value; break;
      case "current": s.current = value; break;
      case "temp":    s.cellTemp = value; break;
      case "cycles":  s.cycleCount = value; break;
      case "soh":
        s.soh = value;
        asset.usableCapacity = asset.ratedCapacity * (value / 100);
        break;
    }
  }

  /** Update grid asset state from a sensor reading. */
  private updateGridState(asset: GridAssetState, reading: SensorReading): void {
    const { metric, value } = reading;
    const s = asset.sensors;

    switch (metric) {
      case "export_power":  s.exportPower = value; break;
      case "import_power":  s.importPower = value; break;
      case "frequency":     s.frequency = value; break;
      case "voltage":       s.voltage = value; break;
      case "power_factor":  s.powerFactor = value; break;
      case "total_export":  s.totalExport = value; break;
    }
  }

  // -----------------------------------------------------------------------
  // Alert Thresholds
  // -----------------------------------------------------------------------

  /** Check a reading against alert thresholds and emit alerts as needed. */
  private checkAlertThresholds(asset: AssetState, reading: SensorReading): void {
    const { metric, value } = reading;
    let alert: MaintenanceAlert | null = null;

    if (asset.type === "solar") {
      if (metric === "temp" && value > 75) {
        alert = this.createAlert(asset, "critical", "Inverter Over-Temperature",
          `Panel ${asset.id} inverter temperature ${value}°C exceeds 75°C limit`,
          metric, value, 75);
      }
    }

    if (asset.type === "wind") {
      if (metric === "vibration" && value > 25) {
        alert = this.createAlert(asset, "critical", "Excessive Vibration — Emergency",
          `Turbine ${asset.id} vibration ${value} mm/s exceeds emergency threshold`,
          metric, value, 25);
      } else if (metric === "vibration" && value > 10) {
        alert = this.createAlert(asset, "warning", "Elevated Vibration",
          `Turbine ${asset.id} vibration ${value} mm/s exceeds inspection threshold`,
          metric, value, 10);
      }
    }

    if (asset.type === "battery") {
      if (metric === "temp" && value > 55) {
        alert = this.createAlert(asset, "critical", "Battery Thermal Emergency",
          `Battery ${asset.id} cell temperature ${value}°C exceeds 55°C — disconnect recommended`,
          metric, value, 55);
      } else if (metric === "temp" && value > 45) {
        alert = this.createAlert(asset, "warning", "Battery Over-Temperature",
          `Battery ${asset.id} cell temperature ${value}°C exceeds 45°C — reduce charge rate`,
          metric, value, 45);
      }
      if (metric === "soh" && value < 80) {
        alert = this.createAlert(asset, "warning", "Battery Degradation",
          `Battery ${asset.id} SOH ${value}% below 80% — plan replacement`,
          metric, value, 80);
      }
    }

    if (alert) {
      this.alerts.push(alert);
      this.emit("alert", alert);
    }
  }

  /** Helper to construct a MaintenanceAlert object. */
  private createAlert(
    asset: AssetState,
    severity: MaintenanceAlert["severity"],
    title: string,
    description: string,
    metric: string,
    currentValue: number,
    threshold: number,
  ): MaintenanceAlert {
    return {
      id: `ALR-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      assetId: asset.id,
      assetType: asset.type,
      severity,
      title,
      description,
      metric,
      currentValue,
      threshold,
      createdAt: new Date().toISOString(),
      acknowledged: false,
    };
  }

  // -----------------------------------------------------------------------
  // MQTT Integration
  // -----------------------------------------------------------------------

  /**
   * Connect to an MQTT broker and subscribe to Bakhmach sensor topics.
   *
   * @param client - MQTT client adapter (e.g. from the `mqtt` npm package).
   */
  connectMqtt(client: MqttClientAdapter): void {
    client.on("connect", () => {
      client.subscribe("bakhmach/#", { qos: 1 } as Record<string, unknown>);
      this.emit("mqttConnected");
    });

    client.on("message", (topic: string, payload: Buffer) => {
      try {
        const reading = this.parseMqttMessage(topic, payload);
        if (reading) {
          this.processSensorReading(reading);
        }
      } catch (err) {
        this.emit("mqttError", err);
      }
    });

    client.on("error", (err: Error) => {
      this.emit("mqttError", err);
    });
  }

  /**
   * Parse an MQTT topic + payload into a SensorReading.
   *
   * Expected topic format: `bakhmach/{assetType}/{assetId}/{metric}`
   * For grid sensors: `bakhmach/grid/{metric}`
   */
  private parseMqttMessage(topic: string, payload: Buffer): SensorReading | null {
    const parts = topic.split("/");
    if (parts[0] !== "bakhmach" || parts.length < 3) return null;

    const assetType = parts[1] as SensorReading["assetType"];

    let assetId: string;
    let metric: string;

    if (assetType === "grid") {
      // bakhmach/grid/{metric}
      assetId = "grid-main";
      metric = parts.slice(2).join("_");
    } else {
      // bakhmach/{type}/{id}/{metric}
      if (parts.length < 4) return null;
      assetId = parts[2];
      metric = parts.slice(3).join("_");
    }

    let parsed: { value: number; unit?: string; quality?: number };
    try {
      parsed = JSON.parse(payload.toString());
    } catch {
      // Plain numeric payload
      const num = parseFloat(payload.toString());
      if (isNaN(num)) return null;
      parsed = { value: num };
    }

    return {
      time: new Date().toISOString(),
      assetType,
      assetId,
      metric,
      value: parsed.value,
      unit: parsed.unit ?? "",
      quality: parsed.quality ?? 100,
    };
  }

  // -----------------------------------------------------------------------
  // Simulation Engine
  // -----------------------------------------------------------------------

  /**
   * Run a what-if simulation over the configured assets.
   *
   * @param params - Simulation configuration.
   * @returns Simulation result with time-series output.
   */
  runSimulation(params: SimulationParams): SimulationResult {
    const runId = `SIM-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + params.durationHours * 3600_000);
    const steps = Math.ceil((params.durationHours * 3600) / params.timeStepSeconds);

    const timeSeries: SimulationTimeStep[] = [];
    let totalProduction = 0;
    let totalConsumption = 0;
    let netGridExport = 0;
    const assetProduction: Record<string, number> = {};

    // Collect current asset states (with optional overrides)
    const solarAssets = this.getAssetsByType<SolarAssetState>("solar");
    const windAssets = this.getAssetsByType<WindAssetState>("wind");
    const batteryAssets = this.getAssetsByType<BatteryAssetState>("battery");

    let simBatterySoc = batteryAssets.length > 0
      ? batteryAssets.reduce((sum, b) => sum + b.sensors.soc, 0) / batteryAssets.length
      : 0;

    const totalBatteryCapacity = batteryAssets.reduce((sum, b) => sum + b.usableCapacity, 0);
    const totalBatteryMaxPower = batteryAssets.reduce((sum, b) => sum + b.maxPower, 0);

    for (let i = 0; i < steps; i++) {
      const stepTime = new Date(startTime.getTime() + i * params.timeStepSeconds * 1000);
      const hourOfDay = stepTime.getUTCHours() + stepTime.getUTCMinutes() / 60;

      // Get weather for this step
      const weather = this.getWeatherAtTime(params.weatherScenario, stepTime);

      // Solar production model
      let solarPower = 0;
      for (const solar of solarAssets) {
        const irradiance = weather?.ghi ?? this.estimateIrradiance(hourOfDay);
        const tempDerate = 1 - Math.max(0, ((weather?.temperature ?? 25) - 25) * 0.004);
        const panelOutput = solar.ratedCapacity * (irradiance / 1000) * tempDerate;
        const ageYears = this.yearsSince(solar.commissionedDate);
        const ageDerate = Math.pow(1 - solar.degradationRate, ageYears);
        const output = Math.max(0, panelOutput * ageDerate);
        solarPower += output;
        assetProduction[solar.id] = (assetProduction[solar.id] || 0) +
          (output * params.timeStepSeconds) / 3600;
      }

      // Wind production model
      let windPower = 0;
      for (const wind of windAssets) {
        const ws = weather?.windSpeed ?? wind.sensors.windSpeed;
        let output = 0;
        if (ws >= wind.cutInSpeed && ws < wind.ratedSpeed) {
          // Cubic power curve between cut-in and rated
          output = wind.ratedCapacity *
            Math.pow((ws - wind.cutInSpeed) / (wind.ratedSpeed - wind.cutInSpeed), 3);
        } else if (ws >= wind.ratedSpeed && ws < wind.cutOutSpeed) {
          output = wind.ratedCapacity;
        }
        windPower += output;
        assetProduction[wind.id] = (assetProduction[wind.id] || 0) +
          (output * params.timeStepSeconds) / 3600;
      }

      const totalGeneration = solarPower + windPower;
      const consumption = 0; // Placeholder — no on-site consumption model yet

      // Battery dispatch (simple: charge from excess, discharge at night)
      let batteryPower = 0;
      const surplus = totalGeneration - consumption;

      if (surplus > 0 && simBatterySoc < 95) {
        // Charge battery from surplus
        const chargeRate = Math.min(surplus, totalBatteryMaxPower);
        const energyToCharge = (chargeRate * params.timeStepSeconds) / 3600; // kWh
        const roomInBattery = totalBatteryCapacity * (95 - simBatterySoc) / 100;
        const actualCharge = Math.min(energyToCharge, roomInBattery);
        batteryPower = -(actualCharge * 3600) / params.timeStepSeconds; // negative = charging
        simBatterySoc += (actualCharge / totalBatteryCapacity) * 100;
      } else if (surplus < 0 && simBatterySoc > 10) {
        // Discharge battery to cover deficit
        const dischargeRate = Math.min(Math.abs(surplus), totalBatteryMaxPower);
        const energyToDischarge = (dischargeRate * params.timeStepSeconds) / 3600;
        const availableEnergy = totalBatteryCapacity * (simBatterySoc - 10) / 100;
        const actualDischarge = Math.min(energyToDischarge, availableEnergy);
        batteryPower = (actualDischarge * 3600) / params.timeStepSeconds; // positive = discharging
        simBatterySoc -= (actualDischarge / totalBatteryCapacity) * 100;
      }

      const netPower = totalGeneration + batteryPower - consumption;
      const gridExport = Math.max(0, netPower);
      const gridImport = Math.max(0, -netPower);

      totalProduction += (totalGeneration * params.timeStepSeconds) / 3600;
      totalConsumption += (consumption * params.timeStepSeconds) / 3600;
      netGridExport += (gridExport * params.timeStepSeconds) / 3600;

      timeSeries.push({
        time: stepTime.toISOString(),
        solarPower,
        windPower,
        batteryPower,
        batterySoc: simBatterySoc,
        gridExport,
        gridImport,
      });
    }

    const carbonOffset = (netGridExport / 1000) * UKRAINE_GRID_EMISSION_FACTOR;

    return {
      runId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      totalProduction,
      totalConsumption,
      netGridExport,
      carbonOffset,
      assetProduction,
      timeSeries,
    };
  }

  /**
   * Simplified irradiance estimation based on hour of day.
   * Returns approximate GHI in W/m² for Bakhmach latitude (~51°N).
   */
  private estimateIrradiance(hourOfDay: number): number {
    // Gaussian approximation peaking at solar noon (~12:30 local, ~10:30 UTC)
    const solarNoon = 10.5;
    const sigma = 3.5;
    const peakGhi = 800; // W/m² typical summer peak
    return peakGhi * Math.exp(-Math.pow(hourOfDay - solarNoon, 2) / (2 * sigma * sigma));
  }

  /** Get interpolated weather data for a specific time. */
  private getWeatherAtTime(
    scenario: WeatherScenario | undefined,
    time: Date,
  ): WeatherDataPoint | null {
    if (!scenario || scenario.hourly.length === 0) return null;

    const timeMs = time.getTime();
    let closest = scenario.hourly[0];
    let minDiff = Infinity;

    for (const point of scenario.hourly) {
      const diff = Math.abs(new Date(point.time).getTime() - timeMs);
      if (diff < minDiff) {
        minDiff = diff;
        closest = point;
      }
    }

    return closest;
  }

  /** Calculate years elapsed since a given ISO date string. */
  private yearsSince(isoDate: string): number {
    const then = new Date(isoDate).getTime();
    const now = Date.now();
    return (now - then) / (365.25 * 24 * 3600_000);
  }

  /** Get assets of a specific type. */
  private getAssetsByType<T extends AssetState>(type: T["type"]): T[] {
    return Array.from(this.assets.values()).filter((a) => a.type === type) as T[];
  }

  // -----------------------------------------------------------------------
  // Carbon Credit Tracking
  // -----------------------------------------------------------------------

  /**
   * Calculate carbon credits for a reporting period.
   *
   * @param periodStart - ISO-8601 period start date.
   * @param periodEnd - ISO-8601 period end date.
   * @param energyExportedMwh - Total energy exported to grid in MWh.
   * @returns Carbon credit record.
   */
  calculateCarbonCredits(
    periodStart: string,
    periodEnd: string,
    energyExportedMwh: number,
  ): CarbonCreditRecord {
    const carbonOffsetTonnes = energyExportedMwh * UKRAINE_GRID_EMISSION_FACTOR;
    const estimatedValueEur = carbonOffsetTonnes * CARBON_CREDIT_PRICE_EUR;

    const record: CarbonCreditRecord = {
      periodStart,
      periodEnd,
      energyExportedMwh,
      emissionFactor: UKRAINE_GRID_EMISSION_FACTOR,
      carbonOffsetTonnes,
      estimatedValueEur,
    };

    this.carbonRecords.push(record);
    this.emit("carbonCreditCalculated", record);
    return record;
  }

  /**
   * Get all carbon credit records.
   */
  getCarbonRecords(): CarbonCreditRecord[] {
    return [...this.carbonRecords];
  }

  // -----------------------------------------------------------------------
  // Alerts
  // -----------------------------------------------------------------------

  /** Get all active (unacknowledged) alerts. */
  getActiveAlerts(): MaintenanceAlert[] {
    return this.alerts.filter((a) => !a.acknowledged);
  }

  /** Acknowledge an alert by ID. */
  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      this.emit("alertAcknowledged", alert);
      return true;
    }
    return false;
  }

  // -----------------------------------------------------------------------
  // REST API Surface
  // -----------------------------------------------------------------------

  /**
   * Get a summary snapshot suitable for the dashboard.
   */
  getDashboardSummary(): {
    totalSolarPower: number;
    totalWindPower: number;
    totalBatteryPower: number;
    averageBatterySoc: number;
    gridExport: number;
    gridImport: number;
    assetsOnline: number;
    assetsOffline: number;
    activeAlerts: number;
    totalCarbonOffset: number;
  } {
    const solarAssets = this.getAssetsByType<SolarAssetState>("solar");
    const windAssets = this.getAssetsByType<WindAssetState>("wind");
    const batteryAssets = this.getAssetsByType<BatteryAssetState>("battery");
    const gridAssets = this.getAssetsByType<GridAssetState>("grid");

    const allAssets = this.getAllAssets();

    return {
      totalSolarPower: solarAssets.reduce((s, a) => s + a.sensors.power, 0),
      totalWindPower: windAssets.reduce((s, a) => s + a.sensors.power, 0),
      totalBatteryPower: batteryAssets.reduce((s, a) => s + a.sensors.power, 0),
      averageBatterySoc: batteryAssets.length > 0
        ? batteryAssets.reduce((s, a) => s + a.sensors.soc, 0) / batteryAssets.length
        : 0,
      gridExport: gridAssets.reduce((s, a) => s + a.sensors.exportPower, 0),
      gridImport: gridAssets.reduce((s, a) => s + a.sensors.importPower, 0),
      assetsOnline: allAssets.filter((a) => a.online).length,
      assetsOffline: allAssets.filter((a) => !a.online).length,
      activeAlerts: this.getActiveAlerts().length,
      totalCarbonOffset: this.carbonRecords.reduce((s, r) => s + r.carbonOffsetTonnes, 0),
    };
  }

  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------

  /** Periodically mark assets as offline if no data received recently. */
  private startStaleCheck(): void {
    this.staleCheckInterval = setInterval(() => {
      const now = Date.now();
      for (const asset of this.assets.values()) {
        if (asset.online) {
          const lastUpdate = new Date(asset.lastUpdated).getTime();
          if (now - lastUpdate > STALE_THRESHOLD_MS) {
            asset.online = false;
            asset.health = "offline";
            this.emit("assetOffline", asset);
          }
        }
      }
    }, 30_000);
  }

  /** Shut down the engine gracefully. */
  destroy(): void {
    if (this.staleCheckInterval) {
      clearInterval(this.staleCheckInterval);
      this.staleCheckInterval = null;
    }
    this.removeAllListeners();
  }
}
