# Audityzer API Reference

Comprehensive API documentation for Audityzer security auditing platform.

## Base URL

```
https://api.audityzer.dev/v1
```

## Authentication

All API requests require authentication using your API key:

```bash
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## Error Responses

All error responses follow this format:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {}
}
```

### HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Audits

### Create Audit

Start a new security audit.

**Endpoint**: `POST /audits`

**Request**:
```json
{
  "name": "Smart Contract Audit",
  "description": "Audit of MyToken contract",
  "type": "smart-contract",
  "language": "solidity",
  "content": "contract code here...",
  "checks": ["security", "performance"],
  "severity": "medium"
}
```

**Response** (201):
```json
{
  "success": true,
  "audit": {
    "id": "audit_abc123",
    "name": "Smart Contract Audit",
    "status": "running",
    "progress": 0,
    "createdAt": "2025-12-28T08:00:00Z",
    "estimatedTime": 120
  }
}
```

### Get Audit

Retrieve audit details and progress.

**Endpoint**: `GET /audits/{auditId}`

**Response** (200):
```json
{
  "success": true,
  "audit": {
    "id": "audit_abc123",
    "name": "Smart Contract Audit",
    "status": "completed",
    "progress": 100,
    "createdAt": "2025-12-28T08:00:00Z",
    "completedAt": "2025-12-28T08:02:00Z",
    "findings": [
      {
        "id": "find_001",
        "type": "vulnerability",
        "severity": "high",
        "title": "Re-entrancy Vulnerability",
        "description": "Function vulnerable to re-entrancy attacks",
        "location": {"line": 45, "column": 10},
        "recommendation": "Use checks-effects-interactions pattern"
      }
    ]
  }
}
```

### List Audits

Retrieve list of audits.

**Endpoint**: `GET /audits`

**Query Parameters**:
- `limit`: Number of results (default: 10, max: 100)
- `offset`: Offset for pagination (default: 0)
- `status`: Filter by status (running, completed, failed)
- `type`: Filter by audit type

**Response** (200):
```json
{
  "success": true,
  "audits": [],
  "pagination": {
    "total": 5,
    "limit": 10,
    "offset": 0
  }
}
```

### Cancel Audit

Cancel a running audit.

**Endpoint**: `DELETE /audits/{auditId}`

**Response** (200):
```json
{
  "success": true,
  "message": "Audit cancelled successfully"
}
```

## Reports

### Get Report

Retrieve audit report in specified format.

**Endpoint**: `GET /audits/{auditId}/report`

**Query Parameters**:
- `format`: Output format (html, json, markdown, pdf) - default: json
- `includeRecommendations`: Include recommendations (true/false) - default: true
- `severity`: Filter findings by severity (critical, high, medium, low, info)

**Response** (200):
```json
{
  "success": true,
  "report": {
    "id": "report_001",
    "auditId": "audit_abc123",
    "generatedAt": "2025-12-28T08:02:00Z",
    "summary": {
      "totalFindings": 5,
      "critical": 1,
      "high": 2,
      "medium": 1,
      "low": 1,
      "info": 0
    },
    "findings": []
  }
}
```

### Export Report

Export report as HTML, PDF, or other formats.

**Endpoint**: `GET /audits/{auditId}/export`

**Query Parameters**:
- `format`: Export format (html, pdf, markdown)
- `filename`: Custom filename (optional)

**Response** (200):
Binary file download

## Projects

### Create Project

Create a new project.

**Endpoint**: `POST /projects`

**Request**:
```json
{
  "name": "My DApp",
  "description": "Production DApp",
  "repositories": ["https://github.com/user/repo"]
}
```

**Response** (201):
```json
{
  "success": true,
  "project": {
    "id": "proj_123",
    "name": "My DApp",
    "createdAt": "2025-12-28T08:00:00Z"
  }
}
```

### Get Project

**Endpoint**: `GET /projects/{projectId}`

### List Projects

**Endpoint**: `GET /projects`

**Query Parameters**:
- `limit`: Results limit (default: 10)
- `offset`: Pagination offset

### Update Project

**Endpoint**: `PUT /projects/{projectId}`

**Request**:
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

### Delete Project

**Endpoint**: `DELETE /projects/{projectId}`

## Webhooks

### Create Webhook

Set up event notifications.

**Endpoint**: `POST /webhooks`

**Request**:
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["audit.completed", "audit.failed"],
  "active": true
}
```

**Response** (201):
```json
{
  "success": true,
  "webhook": {
    "id": "wh_123",
    "url": "https://your-server.com/webhook",
    "events": ["audit.completed"],
    "createdAt": "2025-12-28T08:00:00Z"
  }
}
```

### Webhook Events

#### Audit Completed

```json
{
  "event": "audit.completed",
  "timestamp": "2025-12-28T08:02:00Z",
  "data": {
    "auditId": "audit_abc123",
    "status": "completed",
    "findingsCount": 5
  }
}
```

#### Audit Failed

```json
{
  "event": "audit.failed",
  "timestamp": "2025-12-28T08:05:00Z",
  "data": {
    "auditId": "audit_abc123",
    "error": "Invalid syntax"
  }
}
```

## Rate Limiting

API rate limits vary by plan:

| Plan | Requests/minute | Concurrent Audits |
|------|-----------------|-------------------|
| Free | 10 | 1 |
| Pro | 100 | 5 |
| Enterprise | Unlimited | Unlimited |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640736000
```

If rate limit exceeded, you'll receive 429 response:

```json
{
  "error": true,
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Retry after 60 seconds",
  "retryAfter": 60
}
```

## Code Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.audityzer.dev/v1',
  headers: {
    'Authorization': `Bearer ${process.env.AUDITYZER_API_KEY}`
  }
});

// Create audit
const audit = await api.post('/audits', {
  name: 'My Audit',
  type: 'smart-contract',
  language: 'solidity',
  content: 'contract code'
});

console.log('Audit ID:', audit.data.audit.id);

// Get audit status
const result = await api.get(`/audits/${audit.data.audit.id}`);
console.log('Status:', result.data.audit.status);
```

### Python

```python
import requests
import os

API_KEY = os.getenv('AUDITYZER_API_KEY')
BASE_URL = 'https://api.audityzer.dev/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# Create audit
response = requests.post(
    f'{BASE_URL}/audits',
    json={
        'name': 'My Audit',
        'type': 'smart-contract',
        'language': 'solidity',
        'content': 'contract code'
    },
    headers=headers
)

audit = response.json()['audit']
print(f'Audit ID: {audit["id"]}')

# Get audit status
response = requests.get(
    f'{BASE_URL}/audits/{audit["id"]}',
    headers=headers
)
print(f'Status: {response.json()["audit"]["status"]}')
```

### cURL

```bash
# Create audit
curl -X POST https://api.audityzer.dev/v1/audits \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Audit",
    "type": "smart-contract",
    "language": "solidity",
    "content": "contract code"
  }'

# Get audit status
curl https://api.audityzer.dev/v1/audits/audit_abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Pagination

List endpoints support cursor-based pagination:

```json
{
  "success": true,
  "items": [],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true,
    "nextCursor": "cursor_token_123"
  }
}
```

## Changelog

### v1.0.0 (Current)
- Initial API release
- Audits endpoint
- Reports endpoint
- Projects endpoint
- Webhooks support

### Planned
- v1.1.0: Batch operations
- v1.2.0: Custom rules
- v1.3.0: Team management

## Support

- **Documentation**: https://docs.audityzer.dev
- **Issues**: https://github.com/romanchaa997/Audityzer/issues
- **Email**: api-support@audityzer.dev
- **Status**: https://status.audityzer.dev
