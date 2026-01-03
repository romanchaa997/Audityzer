# UHIP REST API Specification v0.2
## Turbine Inspection & Monitoring API

### Base Principles

- **Base URL**: `https://api.audityzer.io/v1/`
- **Format**: JSON, UTF-8
- **Authentication**: Bearer Token (JWT/API Key) + Authorization Header
- **Rate Limiting**: 1000 requests/hour per client
- **IoT Gateway Optimization**: Batch submission support (10-100 records per request)

---

## 1. Authentication

### 1.1 Get Token (Client Credentials - for IoT Gateways)

**Endpoint**: `POST /auth/token`

**Purpose**: For IoT gateways, edge devices, and service accounts

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "client_id": "gw-uzb-B01",
  "client_secret": "your-secret-key",
  "grant_type": "client_credentials",
  "scope": "iot:write audits:write blockchain:write"
}
```

**Response (200 OK)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "iot:write audits:write blockchain:write"
}
```

**Error (401 Unauthorized)**:
```json
{
  "error": "invalid_client",
  "error_description": "Client authentication failed"
}
```

---

## 2. Create Turbine Audit (Inspection)

### 2.1 Submit Inspection Record

**Endpoint**: `POST /audits/turbines`

**Callers**:
- IoT Gateway (bulk batch submissions)
- Mobile client (single inspection)
- Web application

**Request Headers**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
X-Request-ID: unique-request-uuid (recommended)
```

**Request Body** (based on v0.2 schema):
```json
{
  "audit_id": "audit-2026-0901234",
  "source": "gateway",
  "object": {
    "object_id": "turbine-uzb-12",
    "site": "Uzbekistan TPP-1",
    "turbine_type": "Steam",
    "model": "ST-168-13.8",
    "manufacturer": "ExampleTurbo"
  },
  "inspection": {
    "started_at": "2026-01-03T09:30:00Z",
    "finished_at": "2026-01-03T10:45:00Z",
    "inspector": {
      "id": "user-roman",
      "name": "Roman C.",
      "role": "field_engineer"
    },
    "mode": "running",
    "load_pct": 73
  },
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
      {
        "component": "front_bearing",
        "risk_type": "increased_vibration",
        "probability": 0.64
      }
    ]
  }
}
```

**Response (201 Created)**:
```json
{
  "audit_id": "audit-2026-0901234",
  "status": "created",
  "created_at": "2026-01-03T10:45:30Z",
  "links": {
    "self": "/audits/turbines/audit-2026-0901234",
    "blockchain_status": "/audits/turbines/audit-2026-0901234/blockchain"
  }
}
```

**Errors**:
- `400 Bad Request` - Invalid JSON or missing required fields
- `413 Payload Too Large` - Batch exceeds 10MB or 100 records
- `422 Unprocessable Entity` - Validation errors on turbine data
- `429 Too Many Requests` - Rate limit exceeded

---

## 3. Query Audit Records

### 3.1 Get Audit by ID

**Endpoint**: `GET /audits/turbines/{audit_id}`

**Query Parameters**:
- `include_blockchain` (boolean, optional): Include blockchain status
- `include_ai_details` (boolean, optional): Include AI model details

**Response (200 OK)**:
```json
{
  "audit_id": "audit-2026-0901234",
  "object_id": "turbine-uzb-12",
  "status": "completed",
  "created_at": "2026-01-03T10:45:30Z",
  "inspection": {...},
  "blockchain_audit": {
    "bc_network": "polygon-mainnet",
    "bc_audit_id": "0x7e7c9f...",
    "bc_status": "confirmed",
    "bc_confirmations": 18
  }
}
```

---

## 4. List Audits with Filters

### 4.1 Search Audits

**Endpoint**: `GET /audits/turbines`

**Query Parameters**:
- `object_id` (string): Filter by turbine ID
- `status` (string): Filter by audit status (created, processing, completed)
- `start_date` (ISO8601): Filter from date
- `end_date` (ISO8601): Filter to date
- `ai_health_min` (number, 0-1): Minimum health score
- `risk_level` (string): Filter by risk level (low, medium, high, critical)
- `limit` (integer, default: 50, max: 500): Results per page
- `offset` (integer, default: 0): Pagination offset

**Response (200 OK)**:
```json
{
  "total": 1234,
  "count": 50,
  "offset": 0,
  "audits": [
    {...},
    {...}
  ]
}
```

---

## 5. Blockchain Verification

### 5.1 Get Blockchain Status

**Endpoint**: `GET /audits/turbines/{audit_id}/blockchain`

**Response (200 OK)**:
```json
{
  "audit_id": "audit-2026-0901234",
  "blockchain_audit": {
    "bc_network": "polygon-mainnet",
    "bc_audit_id": "0x7e7c9f...a2f8",
    "bc_status": "confirmed",
    "bc_confirmations": 18,
    "hash_algorithm": "sha256",
    "hashed_fields": ["audit_id", "object_id", "inspection_ts"],
    "audit_entry_hash": "0xb9fd63a3b7cz0..."
  }
}
```

---

## 6. Error Handling

### Standard Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "iot_context.sensor_group_id",
        "message": "Invalid format (expected: tg-XX-sensors)"
      }
    ],
    "timestamp": "2026-01-03T10:50:00Z",
    "request_id": "req-abc123"
  }
}
```

### Common Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit
- `500 Internal Server Error` - Server error

---

## 7. Rate Limiting

Rate limits are enforced per client (identified by API key or client_id):

- **Standard clients**: 1000 requests/hour
- **IoT Gateways**: 10,000 requests/hour (bulk submission optimized)
- **Batch operations**: 100 records per request (IoT optimized)

Headers returned:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1672744800
```

---

## 8. Security Recommendations

1. **Token Management**:
   - Rotate tokens every 24 hours
   - Store securely (use environment variables for edge devices)
   - Never commit tokens to version control

2. **Data Encryption**:
   - Use HTTPS only (TLS 1.3+)
   - Encrypt sensitive fields in motion
   - Enable blockchain hashing for immutability

3. **Validation**:
   - Validate all input data before submission
   - Implement retries with exponential backoff
   - Log all API requests for audit trails

4. **IoT Gateway Optimization**:
   - Batch records (10-50 per request)
   - Implement local caching for offline resilience
   - Use async/await for non-blocking operations

---

## Appendix: Example cURL Commands

### Get Token
```bash
curl -X POST https://api.audityzer.io/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "gw-uzb-B01",
    "client_secret": "***",
    "grant_type": "client_credentials"
  }'
```

### Submit Inspection
```bash
curl -X POST https://api.audityzer.io/v1/audits/turbines \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @inspection-payload.json
```

### Query Audit
```bash
curl -X GET 'https://api.audityzer.io/v1/audits/turbines/audit-2026-0901234?include_blockchain=true' \
  -H "Authorization: Bearer $TOKEN"
```
