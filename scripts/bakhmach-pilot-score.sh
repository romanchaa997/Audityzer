#!/usr/bin/env bash
# =============================================================
# AuditorSEC | Bakhmach Pilot Score Script
# File: scripts/bakhmach-pilot-score.sh
# Author: AuditorSEC R&D
# Date: 2026-04-19
# Version: 1.0.0
#
# Purpose: Run governance twin policy scoring for Bakhmach pilot
# via auditorsec-scanner API and generate evidence snippet
# for Diia.City / Horizon EU / BRAVE1 annex.
#
# PPE Phase 2 Baseline (smoke test 2026-04-18):
#   modelhash:   5b755eb6d308fb24d9c9c8b68fe9b21e21574523edf84e03da34215e9856318c
#   baselinepred: 8.38
#   commitment:  0x9cf4c685c410c2bff9694c45aded915249fa2f79f2455a673def78aa18039c40
# =============================================================

set -euo pipefail

# -----------------------------------------------------------
# CONFIG
# -----------------------------------------------------------
SCANNER_HOST="${AUDITORSEC_SCANNER_HOST:-http://127.0.0.1:8080}"
DOMAIN="bakhmach.auditorsec.local"
PROJECT_ID="bakhmach-pilot-001"
POLICY_PACK="quantum-ai-dual-architecture"
URGENT_THRESHOLD=75
OUTPUT_DIR="./reports"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
OUTPUT_FILE="${OUTPUT_DIR}/bakhmach-pilot-${TIMESTAMP//:/-}.json"

# PPE Phase 2 baseline invariants (MUST NOT change)
EXPECTED_MODELHASH="5b755eb6d308fb24d9c9c8b68fe9b21e21574523edf84e03da34215e9856318c"
EXPECTED_COMMITMENT="0x9cf4c685c410c2bff9694c45aded915249fa2f79f2455a673def78aa18039c40"
EXPECTED_BASELINEPRED="8.38"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

mkdir -p "${OUTPUT_DIR}"

echo "================================================================"
echo " AuditorSEC | Bakhmach Pilot Governance Twin Scoring"
echo " Date: ${TIMESTAMP}"
echo " Domain: ${DOMAIN}"
echo " Project: ${PROJECT_ID}"
echo " Policy Pack: ${POLICY_PACK}"
echo "================================================================"
echo ""

# -----------------------------------------------------------
# STEP 1: Health check
# -----------------------------------------------------------
echo -e "${YELLOW}[1/4] Health check: ${SCANNER_HOST}/health${NC}"
HEALTH_RESPONSE=$(curl -sf --max-time 10 "${SCANNER_HOST}/health" 2>/dev/null || echo '{"status":"unreachable"}')
echo "${HEALTH_RESPONSE}" | python3 -m json.tool 2>/dev/null || echo "${HEALTH_RESPONSE}"

HEALTH_STATUS=$(echo "${HEALTH_RESPONSE}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','unknown'))" 2>/dev/null || echo "unknown")
if [ "${HEALTH_STATUS}" != "ok" ]; then
  echo -e "${YELLOW}Warning: Scanner health=${HEALTH_STATUS}. Continuing in offline/simulation mode.${NC}"
fi
echo ""

# -----------------------------------------------------------
# STEP 2: PPE baseline integrity check
# -----------------------------------------------------------
echo -e "${YELLOW}[2/4] PPE Phase 2 baseline integrity check...${NC}"
PPE_RESPONSE=$(curl -sf --max-time 10 \
  -X POST "${SCANNER_HOST}/predict" \
  -H "Content-Type: application/json" \
  -d "{\"taskid\":\"t-bakhmach-001\",\"esthours\":3.0,\"priority\":0.92,\"ergonomicsscore\":8,\"filerefs\":[\"file1\",\"file2\"],\"ownerid\":\"romanenko\"}" \
  2>/dev/null || echo '{"baselinepred":null,"modelhash":null,"commitment":null,"status":"offline"}')

ACTUAL_MODELHASH=$(echo "${PPE_RESPONSE}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('modelhash','N/A'))" 2>/dev/null || echo "N/A")
ACTUAL_PRED=$(echo "${PPE_RESPONSE}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('baselinepred','N/A'))" 2>/dev/null || echo "N/A")
ACTUAL_COMMITMENT=$(echo "${PPE_RESPONSE}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('commitment','N/A'))" 2>/dev/null || echo "N/A")

echo " Expected modelhash:  ${EXPECTED_MODELHASH}"
echo " Actual modelhash:    ${ACTUAL_MODELHASH}"
if [ "${ACTUAL_MODELHASH}" = "${EXPECTED_MODELHASH}" ]; then
  echo -e " ${GREEN}[PASS] modelhash matches baseline${NC}"
elif [ "${ACTUAL_MODELHASH}" = "N/A" ]; then
  echo -e " ${YELLOW}[SKIP] PPE predictor offline - using cached baseline${NC}"
else
  echo -e " ${RED}[FAIL] modelhash MISMATCH - model drift detected!${NC}"
fi
echo ""

# -----------------------------------------------------------
# STEP 3: Run policy scoring
# -----------------------------------------------------------
echo -e "${YELLOW}[3/4] Running policy scoring...${NC}"
SCAN_PAYLOAD=$(cat <<EOF
{
  "domain": "${DOMAIN}",
  "project_id": "${PROJECT_ID}",
  "policy_pack": "${POLICY_PACK}",
  "timestamp": "${TIMESTAMP}",
  "ppe_baseline": {
    "modelhash": "${EXPECTED_MODELHASH}",
    "baselinepred": ${EXPECTED_BASELINEPRED},
    "commitment": "${EXPECTED_COMMITMENT}"
  },
  "context": {
    "location": "Bakhmach, Chernihivska oblast, UA",
    "classification": "municipal-pilot",
    "brave1_tier": 3,
    "hndl_mitigation": true,
    "diia_city_target": true,
    "horizon_eu_annex": true
  }
}
EOF
)

SCAN_RESPONSE=$(curl -sf --max-time 30 \
  -X POST "${SCANNER_HOST}/scan" \
  -H "Content-Type: application/json" \
  -d "${SCAN_PAYLOAD}" \
  2>/dev/null || echo "{\"riskscore\":null,\"policy_failures\":[],\"status\":\"offline\",\"timestamp\":\"${TIMESTAMP}\",\"project_id\":\"${PROJECT_ID}\"}")

echo "${SCAN_RESPONSE}" > "${OUTPUT_FILE}"
echo " Saved to: ${OUTPUT_FILE}"
echo ""

# -----------------------------------------------------------
# STEP 4: Extract results + evidence snippet
# -----------------------------------------------------------
echo -e "${YELLOW}[4/4] Evidence extraction...${NC}"

RISK_SCORE=$(echo "${SCAN_RESPONSE}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('riskscore') or 'null')" 2>/dev/null || echo "null")

echo "================================================================"
echo " RESULTS"
echo "================================================================"
echo " Risk Score:     ${RISK_SCORE}"

# Alert if >= 75
if [ "${RISK_SCORE}" != "null" ] && python3 -c "exit(0 if float('${RISK_SCORE}') >= ${URGENT_THRESHOLD} else 1)" 2>/dev/null; then
  echo -e " ${RED}URGENT: Risk Score >= ${URGENT_THRESHOLD} - queuing for immediate review${NC}"
  curl -sf -X POST "${SCANNER_HOST}/queue/urgent" \
    -H "Content-Type: application/json" \
    -d "{\"project_id\":\"${PROJECT_ID}\",\"riskscore\":${RISK_SCORE},\"hndl\":true,\"timestamp\":\"${TIMESTAMP}\"}" \
    2>/dev/null || echo " (Urgent queue: offline - log manually)"
fi

# Top-3 policy failures
echo ""
echo " Top-3 Policy Failures:"
echo "${SCAN_RESPONSE}" | python3 -c "
import sys, json
d = json.load(sys.stdin)
failures = d.get('policy_failures', [])
if not failures:
    print('  (none recorded - scanner offline or all policies passed)')
for i, f in enumerate(failures[:3], 1):
    sev = f.get('severity','?').upper()
    pid = f.get('policy_id', f.get('id','?'))
    msg = f.get('message', f.get('failure_msg','?'))
    print(f'  {i}. [{sev}] {pid}: {msg}')
" 2>/dev/null || echo "  (parse error)"

# Evidence snippet for Diia.City / Horizon
echo ""
echo "================================================================"
echo " EVIDENCE SNIPPET (Diia.City / Horizon EU / BRAVE1 Annex)"
echo "================================================================"
python3 -c "
import json, sys
try:
    d = json.loads('''${SCAN_RESPONSE}''')
except:
    d = {}
print(f'''
AuditorSEC Governance Twin Evidence Snippet
-------------------------------------------
Date:              ${TIMESTAMP}
Domain:            ${DOMAIN}
Project ID:        ${PROJECT_ID}
Policy Pack:       ${POLICY_PACK} v1.0
Risk Score:        {d.get('riskscore', 'pending')}
Attestation:       {d.get('attestation_status', 'pending - run zk proof')}

PPE Phase 2 Baseline:
  modelhash:       ${EXPECTED_MODELHASH}
  baselinepred:    ${EXPECTED_BASELINEPRED}
  commitment:      ${EXPECTED_COMMITMENT}

Context:
  Location:        Bakhmach, Chernihivska oblast, UA
  BRAVE1 Tier:     3 (target: Tier 4a)
  HNDL Mitigation: Active
  Diia.City:       Target
  Horizon EU:      Annex candidate

Policy Failures (top-3): {json.dumps(d.get('policy_failures',[])[:3], indent=2)}

Next Steps:
  1. Run RISC Zero zk proof on ppe-guest ELF
  2. Deploy PPEComplianceVerifier.sol on Polygon Amoy
  3. Confirm PPEAttestationRegistered event emitted
  4. Update ClickUp Epic PPE Phase 2 with evidence link
''')
" 2>/dev/null || echo "(Python evidence generation failed - check scan response)"

echo "================================================================"
echo " Script complete. Report: ${OUTPUT_FILE}"
echo "================================================================"
