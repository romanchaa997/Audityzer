# PQC TEE/HSM Hybrid KEM
# AuditorSEC Deep-Dive #1
# Date: 2026-04-19 | Status: BASELINE | Policy: quantum-ai-dual-architecture.yaml#pqcteehsm

---

## Summary

Post-Quantum Cryptography (PQC) with TEE/HSM integration is the foundational security layer for AuditorSEC. This document covers Hybrid KEM deployment, ML-DSA-65 signing, and HNDL (Harvest Now Decrypt Later) mitigation strategy.

**ClickUp Field:** `pqcteehsmlevel`
**OPA Path:** `quantum-ai-dual-architecture.yaml#pqcteehsm.hybridkem`
**BRAVE1 Relevance:** Critical — MoD-grade ops require FIPS 140-3 Level 3

---

## 1. Threat Model: HNDL

**Harvest Now Decrypt Later (HNDL):** Adversary captures encrypted traffic today, decrypts when quantum computer becomes available (~5-10 years horizon).

Affected data:
- Classified battlefield communications
- Long-term intelligence assets
- Smart contract signing keys
- IoT sensor authentication tokens

Mitigation: Deploy hybrid KEM **now**, before quantum threat materializes.

---

## 2. Hybrid KEM Architecture

```
Client                          Server
  |                               |
  |-- X25519 ephemeral key ------->|
  |-- ML-KEM-768 encapsulation --->|
  |                               |
  |<-- Combined session key -------|
  |   (X25519_output XOR MLKEM_output)
  |
  [Classical + Post-Quantum protection]
```

### Algorithm Stack

| Layer | Production | Fallback (current baseline) |
|---|---|---|
| KEM | X25519MLKEM768 | X25519 only (HNDL risk flagged) |
| Signature | ML-DSA-65 (FIPS 204) | HMAC-SHA256 (liboqs not installed) |
| Hash | Poseidon BN254 | SHA256 (poseidon-hash lib absent) |
| HSM Level | FIPS 140-3 Level 3 | Software key (dev only) |

### Current Baseline State (PPE Phase 2 smoke test 2026-04-18)
```json
{
  "public_key_prefix": "4445565f46414c4c",
  "decoded": "DEVFALL",
  "meaning": "DEV FALLBACK - NO OQS INSTALLED",
  "signature_bytes": 32,
  "expected_prod": 3309,
  "status": "FALLBACK_ACTIVE"
}
```

**Phase 2 acceptance:** signature length >= 3000 bytes (ML-DSA-65), public key length 1952 bytes.

---

## 3. HSM Integration

### FIPS 140-3 Level 3 Requirements
- Physical tamper resistance
- Role-based authentication
- Private keys never leave HSM boundary
- Hardware RNG for key generation

### Deployment Path
```bash
# Step 1: Provision HSM (Hetzner dedicated + HSM module)
# Step 2: Install liboqs-python
pip install liboqs-python

# Step 3: Generate ML-KEM-768 keypair in HSM
python3 -c "
import oqs
with oqs.KeyEncapsulation('Kyber768') as kem:
    public_key = kem.generate_keypair()
    print(f'PK length: {len(public_key)} bytes')  # Expected: 1184
"

# Step 4: Generate ML-DSA-65 keypair
with oqs.Signature('Dilithium3') as sig:
    public_key = sig.generate_keypair()
    print(f'PK length: {len(public_key)} bytes')  # Expected: 1952
```

---

## 4. Policy Checks (from YAML)

| ID | Rule | Severity | Status |
|---|---|---|---|
| pqc-001 | `tls_kem_algorithm IN ['X25519MLKEM768', 'X25519Kyber768']` | critical | FAIL (fallback) |
| pqc-002 | `hsm_fips_level >= 3` | critical | FAIL (dev) |
| pqc-003 | `signature_algorithm == 'ML-DSA-65' OR fallback_documented == true` | high | PASS (fallback documented) |

---

## 5. Phase 2 Acceptance Criteria

- [ ] liboqs-python installed and functional
- [ ] ML-DSA-65 signing active: public_key_prefix != `DEVFALL`, signature bytes >= 3000
- [ ] X25519MLKEM768 configured in TLS stack
- [ ] HSM FIPS 140-3 Level 3 provisioned (or documented exception for Tier 3)
- [ ] `pqcteehsmlevel` ClickUp field updated to `PRODUCTION`

---

## 6. References

- NIST FIPS 204 (ML-DSA)
- NIST FIPS 203 (ML-KEM)
- liboqs: https://github.com/open-quantum-safe/liboqs-python
- PPE Phase 2 baseline: `ppe-phase2-baseline.md`
- Policy: `policy-packs/quantum-ai-dual-architecture.yaml#pqcteehsm`
