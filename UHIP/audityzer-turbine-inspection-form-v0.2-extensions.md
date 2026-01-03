# Audityzer Turbine Inspection Form v0.2 Extensions
## IoT Integration, AI Prediction & Blockchain Verification

### Overview
Version 0.2 introduces three major feature extensions to the base form:
1. **IoT Integration** - Real-time sensor data and gateway connectivity
2. **AI Health Prediction** - Machine learning-based failure prediction
3. **Blockchain Audit Trail** - Immutable verification records

All extensions maintain backward compatibility with v0.1 submissions.

---

## 1. IoT-Oriented Fields

### IoT Gateway Integration
Fields for connecting turbine monitoring systems and sensors:

```json
"iotContext": {
  "iot_gateway_id": {
    "type": "text",
    "label": "IoT Gateway ID",
    "description": "Unique identifier for the edge/gateway device (e.g., gw-uzb-001)",
    "required": false,
    "version": "0.2"
  },
  "sensor_group_id": {
    "type": "text",
    "label": "Sensor Group ID",
    "description": "Logical group of sensors assigned to this turbine (e.g., tg-12-sensors)",
    "required": false,
    "version": "0.2"
  },
  "iot_stream_status": {
    "type": "select",
    "label": "IoT Stream Status",
    "options": ["online", "intermittent", "offline"],
    "required": false,
    "version": "0.2"
  },
  "last_iot_update_ts": {
    "type": "datetime",
    "label": "Last IoT Data Packet Timestamp",
    "description": "ISO 8601 datetime of most recent sensor update",
    "required": false,
    "version": "0.2"
  }
}
```

### IoT Metrics (Last 24-Hour Aggregates)

```json
"iotMetrics": {
  "window_hours": 24,
  "metrics": {
    "avg_vibration_mm_s": {
      "type": "number",
      "unit": "mm/s",
      "description": "Average vibration over window"
    },
    "max_vibration_mm_s": {
      "type": "number",
      "unit": "mm/s",
      "description": "Peak vibration measurement"
    },
    "avg_bearing_temp_c": {
      "type": "number",
      "unit": "°C",
      "description": "Average bearing temperature"
    },
    "max_bearing_temp_c": {
      "type": "number",
      "unit": "°C",
      "description": "Maximum bearing temperature spike"
    }
  }
}
```

---

## 2. AI Prediction Fields

### Health Scoring & Risk Assessment

```json
"aiPrediction": {
  "ai_health_score": {
    "type": "number",
    "label": "AI Health Score",
    "description": "Overall turbine health (0.0-1.0 scale)",
    "minimum": 0.0,
    "maximum": 1.0,
    "required": false,
    "version": "0.2"
  },
  "ai_failure_risk_30d": {
    "type": "number",
    "label": "Failure Risk (30-day)",
    "description": "Probability of failure within 30 days (0.0-1.0)",
    "minimum": 0.0,
    "maximum": 1.0,
    "required": false,
    "version": "0.2"
  },
  "ai_failure_risk_180d": {
    "type": "number",
    "label": "Failure Risk (180-day)",
    "description": "Probability of failure within 180 days (0.0-1.0)",
    "minimum": 0.0,
    "maximum": 1.0,
    "required": false,
    "version": "0.2"
  },
  "predicted_remaining_useful_life_hours": {
    "type": "number",
    "label": "Predicted RUL (Hours)",
    "description": "Estimated remaining operational hours before major maintenance",
    "unit": "hours",
    "required": false,
    "version": "0.2"
  },
  "ai_top_risk_components": {
    "type": "array",
    "label": "Top Risk Components",
    "items": {
      "component": "string (e.g., front_bearing, lube_oil_system)",
      "risk_type": "string (e.g., increased_vibration, high_temperature)",
      "probability": "number (0.0-1.0)"
    },
    "required": false,
    "version": "0.2"
  },
  "model_version": {
    "type": "text",
    "label": "AI Model Version",
    "description": "Specific ML model used (e.g., turbine-rul-v0.4.1)",
    "required": false,
    "version": "0.2"
  },
  "inference_ts": {
    "type": "datetime",
    "label": "Inference Timestamp",
    "description": "When the prediction was computed (ISO 8601)",
    "required": false,
    "version": "0.2"
  }
}
```

### Example AI Prediction JSON

```json
"ai_prediction": {
  "model_version": "turbine-rul-v0.4.1",
  "inference_ts": "2026-01-03T10:35:00Z",
  "ai_health_score": 0.82,
  "ai_failure_risk_30d": 0.07,
  "ai_failure_risk_180d": 0.21,
  "predicted_remaining_useful_life_hours": 14500,
  "ai_top_risk_components": [
    {
      "component": "front_bearing",
      "risk_type": "increased_vibration",
      "probability": 0.64
    },
    {
      "component": "lube_oil_system",
      "risk_type": "high_temperature",
      "probability": 0.41
    }
  ]
}
```

---

## 3. Blockchain Audit Trail Fields

### Blockchain Verification Records

```json
"blockchainAudit": {
  "bc_audit_id": {
    "type": "text",
    "label": "Blockchain Transaction Hash",
    "description": "Immutable identifier of audit record on blockchain",
    "required": false,
    "version": "0.2"
  },
  "bc_network": {
    "type": "select",
    "label": "Blockchain Network",
    "options": ["polygon-mainnet", "polygon-mumbai", "ethereum", "base-mainnet", "base-sepolia", "arbitrum"],
    "required": false,
    "version": "0.2"
  },
  "bc_status": {
    "type": "select",
    "label": "Blockchain Confirmation Status",
    "options": ["not_submitted", "pending", "confirmed", "failed"],
    "required": false,
    "version": "0.2"
  },
  "bc_confirmations": {
    "type": "integer",
    "label": "Blockchain Confirmations",
    "description": "Number of network confirmations (PoS/PoW based)",
    "required": false,
    "version": "0.2"
  },
  "hash_algorithm": {
    "type": "text",
    "label": "Hashing Algorithm",
    "description": "Algorithm used for payload hashing (e.g., sha256, keccak256)",
    "required": false,
    "version": "0.2"
  },
  "hashed_fields": {
    "type": "array",
    "label": "Fields Included in Hash",
    "items": "string",
    "description": "List of fields hashed for immutability (audit_id, inspection_ts, summary, ai_prediction, iot_metrics)",
    "required": false,
    "version": "0.2"
  },
  "audit_entry_hash": {
    "type": "text",
    "label": "Complete Audit Entry Hash",
    "description": "Cryptographic hash of entire audit record",
    "required": false,
    "version": "0.2"
  }
}
```

### Example Blockchain Audit JSON

```json
"blockchain_audit": {
  "bc_network": "polygon-mainnet",
  "bc_audit_id": "0x7e7c9f...a2f8",
  "bc_status": "confirmed",
  "bc_confirmations": 18,
  "hash_algorithm": "sha256",
  "hashed_fields": [
    "audit_id",
    "object_id",
    "inspection_ts",
    "summary.general_state",
    "ai_prediction.ai_health_score"
  ],
  "audit_entry_hash": "0xb9fd63a3b7cz0..."
}
```

---

## Complete v0.2 JSON Example

```json
{
  "formMetadata": {
    "version": "0.2",
    "timestamp": "2026-01-03T10:45:00Z"
  },
  "audit_id": "audit-2026-0901234",
  "object_id": "turbine-uzb-12",
  "sections": {
    "iotContext": {
      "iot_gateway_id": "gw-uzb-B01",
      "sensor_group_id": "tg-12-sensors",
      "iot_stream_status": "online",
      "last_iot_update_ts": "2026-01-03T10:35:12Z",
      "aggregates": {
        "avg_vibration_mm_s": 3.2,
        "max_vibration_mm_s": 7.8,
        "avg_bearing_temp_c": 68.4,
        "max_bearing_temp_c": 82.1
      }
    },
    "ai_prediction": {
      "model_version": "turbine-rul-v0.4.1",
      "inference_ts": "2026-01-03T10:35:00Z",
      "ai_health_score": 0.82,
      "ai_failure_risk_30d": 0.07,
      "ai_failure_risk_180d": 0.21,
      "predicted_remaining_useful_life_hours": 14500,
      "ai_top_risk_components": [
        {"component": "front_bearing", "risk_type": "increased_vibration", "probability": 0.64}
      ]
    },
    "blockchain_audit": {
      "bc_network": "polygon-mainnet",
      "bc_audit_id": "0x7e7c9f...a2f8",
      "bc_status": "confirmed",
      "bc_confirmations": 18
    }
  }
}
```

---

## Implementation Notes

- All v0.2 fields are **optional** to maintain backward compatibility
- IoT updates occur at variable intervals (minimum 5 minutes)
- AI models update daily or when inspection occurs
- Blockchain submission is async and retry-capable
- Hashed fields provide immutability of key records

## Next Steps for v0.3

- Multi-language support (Ukrainian, English, Mandarin)
- Mobile-optimized form variants
- WebAssembly-based offline signature verification
- GraphQL API for federated queries
