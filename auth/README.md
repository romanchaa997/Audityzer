# ІСЕІ (id.gov.ua) OAuth 2.0 Integration

Integration with Ukraine's Integrated System of Electronic Identification (ІСЕІ) provided by ДП «ДІЯ».

> **ІСЕІ is NOT Keycloak/OIDC.** It uses a custom OAuth 2.0 implementation with non-standard endpoints.

## Endpoints

| Route | Method | Description |
|---|---|---|
| `/auth/isei/login` | GET | Redirects user to id.gov.ua for authentication |
| `/auth/callback/isei` | GET | Handles OAuth callback, exchanges code, fetches user info |
| `/auth/isei/userinfo` | GET | Returns cached user profile from the session |
| `/auth/isei/logout` | POST | Clears ІСЕІ session data |

## ІСЕІ OAuth Flow

```
User → /auth/isei/login
  ↓ redirect
id.gov.ua (user authenticates via BankID / Diia / digital signature)
  ↓ redirect with ?code=...&state=...
/auth/callback/isei
  → POST /get-access-token  (exchange code → tokens)
  → POST /get-user-info     (fetch profile — consumes the single-use access_token)
  ↓
User is authenticated, profile cached in session
```

**Critical:** The `access_token` from ІСЕІ is **single-use**. After one call to `/get-user-info`, it is consumed. Use the `refresh_token` to obtain new access tokens.

## Environment Variables

Add these to your `.env` file:

```bash
ISEI_CLIENT_ID=<your_client_id>
ISEI_CLIENT_SECRET=<your_client_secret>
ISEI_REDIRECT_URI=https://audityzer.com/auth/callback/isei
ISEI_BASE_URL=https://test.id.gov.ua          # or https://id.gov.ua for production
ISEI_AUTH_TYPES=dig_sign,diia_id,bank_id
ISEI_FIELDS=givenname,middlename,lastname,edrpoucode,drfocode,email,phone,o,ou,title,unzr
```

## Authentication Methods

| `auth_type` | Description |
|---|---|
| `dig_sign` | Qualified electronic signature (file / cloud / hardware) |
| `diia_id` | Diia.Signature via Diia mobile app |
| `diia_oauth` | QR-code authentication via Diia mobile app |
| `bank_id` | BankID NBU — bank-based identification |

Multiple types can be combined: `dig_sign,diia_id,bank_id`

## Testing with Test BankID Users

Use `ISEI_BASE_URL=https://test.id.gov.ua` and one of these test accounts:

| Bank | Login | Password | OTP/Code |
|---|---|---|---|
| Банк ВОСТОК | +380508132875 | Qwer1234 | 111111 |
| Банк ГРАНТ | 567 | 0000 | 0000 |
| Банк ГРАНТ | 27111 | 27111 | 0000 |
| TEST NBU | 380990110101 | ZAQ!2wsx2 | — |
| TEST NBU | 380990990909 | ZAQ!2wsx1 | — |
| PrivatBank | +380738291588 | password9304 | — |

> Test environment limit: **250 successful authentications per month**.

## FastAPI Integration

```python
from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from auth import isei_router

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your-session-secret")
app.include_router(isei_router)
```

## Official Documentation

- Production: https://id.gov.ua/downloads/IDInfoProcessingD.pdf
- Test environment: https://id.gov.ua/downloads/IDInfoProcessingD_QA.pdf
- Test certificates: https://id.gov.ua/connectqa#key
- Trust service providers: https://www.czo.gov.ua/ca-registry
