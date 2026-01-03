# Field Validation Schema - Audityzer Turbine Inspection Form v0.1

## Overview

This document defines validation rules and constraints for all inspection form fields. Each field includes type specifications, range limits, format requirements, and business logic rules to ensure data quality and consistency.

---

## Equipment Identification Fields

### Equipment ID
- **Type**: String (alphanumeric)
- **Format**: `[FACILITY]-[EQUIPMENT]-[SERIAL]` e.g., `THERMAL-TURBINE-001`
- **Length**: 20-30 characters
- **Required**: Yes
- **Validation Rule**: Must match registered equipment in system database
- **Error Message**: "Equipment not found in registry. Verify ID format."

### Equipment Type
- **Type**: Enum
- **Allowed Values**: `steam-turbine`, `gas-turbine`, `hydraulic-turbine`, `generator`, `pump`
- **Required**: Yes
- **Cascading Dependencies**: Selection determines available measurement fields
- **Cross-validation**: Must match SCADA system equipment classification

### Facility Location
- **Type**: Geographic coordinate
- **Format**: Latitude, Longitude (ISO 6709)
- **Range**: -90 to +90 (lat), -180 to +180 (lon)
- **Precision**: ≥ 4 decimal places
- **Required**: Yes (when not synced from SCADA)
- **GPS Accuracy**: ±10 meters preferred

---

## Measurement Fields

### Vibration Amplitude
- **Type**: Float (decimal number)
- **Unit**: mm/s (millimeters per second)
- **Range**: 0.1 - 250.0
- **Precision**: 0.01 mm/s
- **Required**: Yes (for rotating equipment)
- **Validation Rules**:
  - Value < 2.8 mm/s → Normal (Green)
  - 2.8 - 7.1 mm/s → Acceptable (Yellow)
  - 7.1 - 11.2 mm/s → Marginal (Orange)
  - > 11.2 mm/s → Unacceptable (Red)
- **Dependency**: Only visible if Equipment Type = turbine/generator

### Temperature
- **Type**: Float
- **Unit**: Celsius (°C)
- **Range**: -50 to +400
- **Precision**: 0.1°C
- **Required**: Yes
- **Validation Rules**:
  - Equipment-specific thresholds (e.g., steam turbine: normal 200-350°C)
  - Rate of change ≤ 20°C per 5 minutes (overheating detection)
- **Cross-validation**: If SCADA sensor shows > 10°C difference, flag manual verification

### Pressure
- **Type**: Float
- **Unit**: Bar (pressure units)
- **Range**: 0 - 350
- **Precision**: 0.1 bar
- **Required**: Yes (for pressurized equipment)
- **Validation Rules**:
  - Must not exceed equipment rated pressure
  - Sudden drops (> 30% in 10 sec) → Alert urgent maintenance

### Frequency (Hz)
- **Type**: Float
- **Unit**: Hertz
- **Range**: 10 - 3000
- **Precision**: 0.1 Hz
- **Required**: For rotating equipment analysis
- **Validation**: Should match rated equipment frequency ± 2%

---

## Operator Observations

### Visual Condition Assessment
- **Type**: Enum with sub-categories
- **Options**:
  - `excellent`: No visible issues
  - `good`: Minor cosmetic wear
  - `acceptable`: Minor surface corrosion, functional
  - `poor`: Significant wear, possible functional impact
  - `critical`: Immediate maintenance required
- **Required**: Yes
- **Visual Evidence**: Automatic flag for 'critical' to require photo documentation

### Unusual Observations
- **Type**: Multi-select text array
- **Max selections**: 10
- **Predefined options**:
  - Leakage detection
  - Abnormal vibration
  - Temperature gradient
  - Unusual noise
  - Oil condition degradation
  - Bearing wear indicators
  - Seal degradation
- **Custom text**: Up to 500 characters if "Other" selected
- **Cross-validation**: Custom text triggers AI analysis for severity assessment

### Maintenance History
- **Type**: Text field (rich text with markdown support)
- **Max length**: 2000 characters
- **Required**: No, but encouraged
- **Format validation**: Auto-parse for dates (ISO 8601 format)
- **Links**: Automatically hyperlink referenced maintenance tickets (format: `#123`)

---

## Fluid Analysis Fields

### Oil Sample Condition
- **Type**: Enum
- **Options**: `new`, `excellent`, `good`, `acceptable`, `poor`, `critical`
- **Required**: For equipment with oil lubrication
- **Linked fields**: If 'poor' or 'critical', enable detailed oil analysis fields

### Oil Analysis Parameters
- **Viscosity Index**: 0-200 (lower indicates degradation)
- **Total Acid Number (TAN)**: 0-5 mg KOH/g (higher = more degraded)
- **Particle Count ISO**: ISO 4406 code (e.g., 16/14/11)
- **Water Content**: 0-1000 ppm (upper limit depends on oil type)
- **Validation**: Flag if multiple parameters exceed thresholds simultaneously

---

## Time-Based Fields

### Inspection Timestamp
- **Type**: DateTime (ISO 8601)
- **Format**: `YYYY-MM-DDTHH:MM:SSZ`
- **Timezone**: UTC required
- **Required**: Yes
- **Validation**:
  - Cannot be future date
  - Cannot be more than 90 days in past (data freshness)
  - Server applies NTP sync to prevent tampering

### Last Maintenance Date
- **Type**: Date
- **Format**: `YYYY-MM-DD`
- **Required**: No, but triggers historical analysis if provided
- **Validation**:
  - Must not be in future
  - If provided, must be chronologically before inspection date
  - Used to calculate "time since maintenance" risk metrics

---

## Compliance & Certification

### Compliance Status
- **Type**: Enum
- **Values**: `compliant`, `warning`, `non-compliant`
- **Automatic Determination**: Based on field validation rules above
- **Override**: Only by authenticated compliance officer (audit logged)

### Certification Required
- **Type**: Boolean
- **Auto-triggered**: If any field exceeds critical threshold
- **Effect**: Prevents form submission without certification
- **Certification Options**:
  - Self-certified by inspector
  - Requires supervisor approval
  - Requires regulatory body approval

---

## Advanced Validation Rules

### Cross-Field Validations

**Rule 1: Equipment Consistency**
```
IF Equipment Type = "steam-turbine"
  THEN Temperature must be between 150-350°C
  AND Pressure must be 10-100 bar
  AND Vibration recommended for measurement
ELSE IF Equipment Type = "gas-turbine"
  THEN Temperature must be between 300-700°C  
  AND Vibration critical for measurement
END IF
```

**Rule 2: Anomaly Detection**
```
IF (Current Vibration > Previous Average × 1.5)
  AND (Temperature Increase > 20°C in last hour)
  AND (Frequency Deviation > 2%)
  THEN Alert Level = CRITICAL
  ACTION: Auto-trigger maintenance alert
END IF
```

**Rule 3: Historical Trend Analysis**
```
IF (Last 3 Inspections show vibration increasing 10% each)
  THEN Prediction = "Failure likely within 30 days"
  ACTION: Flag equipment for preventive maintenance
END IF
```

---

## Error Handling & User Feedback

### Validation Error Messages

| Error Code | Message | Severity | Auto-Fix Available |
|-----------|---------|----------|-------------------|
| MISSING_REQUIRED | "{Field} is required" | Error | No |
| OUT_OF_RANGE | "{Field} must be between {min}-{max}" | Error | Yes (suggest bounds) |
| INVALID_FORMAT | "{Field} format invalid. Expected: {format}" | Error | Yes (show example) |
| TYPE_MISMATCH | "{Field} must be {type}" | Error | No |
| DEPENDENCY_UNMET | "{Field} unavailable until {dependency} selected" | Warning | Yes (highlight dependency) |
| INCONSISTENCY | "{Field1} conflicts with {Field2}" | Warning | No (suggest review) |
| DATA_FRESHNESS | "Data older than 90 days" | Info | Yes (offer historical note) |

### Client-Side vs Server-Side Validation

**Client-Side** (JavaScript validation):
- Format checking
- Range validation
- Required field checks
- Real-time feedback

**Server-Side** (authoritative):
- Database consistency checks
- Business logic validation
- SCADA system cross-reference
- Regulatory compliance verification
- Audit trail logging

---

## Implementation Example

### JSON Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "equipmentId": {
      "type": "string",
      "pattern": "^[A-Z]{3,10}-[A-Z]{3,10}-\\d{3}$",
      "minLength": 20,
      "maxLength": 30
    },
    "vibrationAmplitude": {
      "type": "number",
      "minimum": 0.1,
      "maximum": 250.0,
      "multipleOf": 0.01
    },
    "temperature": {
      "type": "number",
      "minimum": -50,
      "maximum": 400
    },
    "inspectionTimestamp": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["equipmentId", "temperature", "inspectionTimestamp"],
  "additionalProperties": false
}
```

---

## Version History & Changes

- **v0.1** (Current): Initial release with core turbine inspection fields
- **v0.2** (Planned): Add pump-specific validation rules
- **v0.3** (Planned): ML-based anomaly detection rules
- **v1.0** (Target): Full ISO 10694 alignment

**For schema updates and support**: Contact validation-team@audityzer.ua
