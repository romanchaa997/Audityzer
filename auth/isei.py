"""ІСЕІ (id.gov.ua) OAuth 2.0 FastAPI router.

ІСЕІ is Ukraine's Integrated System of Electronic Identification.
It is NOT Keycloak/OIDC — it uses custom OAuth 2.0 endpoints:

  Authorization : {base_url}/?response_type=code&client_id=...&auth_type=...&state=...&redirect_uri=...
  Token         : {base_url}/get-access-token
  UserInfo      : {base_url}/get-user-info

CRITICAL: access_token is SINGLE-USE. After one request to /get-user-info,
the token is consumed and you must use the refresh_token to obtain a new one.
"""

from __future__ import annotations

import logging
import secrets
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse

from auth.isei_config import ISEISettings, get_settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["isei"])

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

SESSION_KEY = "isei"


def _session(request: Request) -> dict[str, Any]:
    """Return (and lazily initialise) the ІСЕІ session bucket."""
    if SESSION_KEY not in request.session:
        request.session[SESSION_KEY] = {}
    return request.session[SESSION_KEY]


async def _exchange_code(
    code: str,
    settings: ISEISettings,
) -> dict[str, Any]:
    """Exchange an authorization code for tokens via /get-access-token."""
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            settings.token_url,
            data={
                "grant_type": "authorization_code",
                "client_id": settings.client_id,
                "client_secret": settings.client_secret,
                "code": code,
            },
        )
    if resp.status_code != 200:
        logger.error("Token exchange failed: %s %s", resp.status_code, resp.text)
        raise HTTPException(502, "ІСЕІ token exchange failed")
    data = resp.json()
    if "error" in data:
        logger.error("Token error: %s", data)
        raise HTTPException(502, data.get("error_description", data["error"]))
    return data


async def _fetch_userinfo(
    access_token: str,
    user_id: str,
    settings: ISEISettings,
) -> dict[str, Any]:
    """Fetch user profile from /get-user-info.

    WARNING: this consumes the access_token (single-use).
    """
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            settings.userinfo_url,
            data={
                "access_token": access_token,
                "user_id": user_id,
                "fields": settings.fields,
            },
        )
    if resp.status_code != 200:
        logger.error("UserInfo fetch failed: %s %s", resp.status_code, resp.text)
        raise HTTPException(502, "ІСЕІ userinfo request failed")
    data = resp.json()
    if "error" in data:
        logger.error("UserInfo error: %s", data)
        raise HTTPException(502, data.get("error_description", data["error"]))
    return data


async def _refresh_access_token(
    refresh_token: str,
    settings: ISEISettings,
) -> dict[str, Any]:
    """Use a refresh_token to obtain a new (single-use) access_token."""
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            settings.token_url,
            data={
                "grant_type": "refresh_token",
                "client_id": settings.client_id,
                "client_secret": settings.client_secret,
                "refresh_token": refresh_token,
            },
        )
    if resp.status_code != 200:
        logger.error("Token refresh failed: %s %s", resp.status_code, resp.text)
        raise HTTPException(502, "ІСЕІ token refresh failed")
    data = resp.json()
    if "error" in data:
        logger.error("Refresh error: %s", data)
        raise HTTPException(502, data.get("error_description", data["error"]))
    return data


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@router.get("/isei/login")
async def login(request: Request) -> RedirectResponse:
    """Redirect the user to the ІСЕІ authorization page."""
    settings: ISEISettings = get_settings()
    state = secrets.token_urlsafe(32)

    session = _session(request)
    session["state"] = state

    params = (
        f"?response_type=code"
        f"&client_id={settings.client_id}"
        f"&auth_type={settings.auth_types}"
        f"&state={state}"
        f"&redirect_uri={settings.redirect_uri}"
    )
    return RedirectResponse(f"{settings.authorization_url}{params}")


@router.get("/callback/isei")
async def callback(
    request: Request,
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
    error_description: str | None = None,
) -> dict[str, Any]:
    """Handle the OAuth callback from ІСЕІ.

    1. Validate CSRF state
    2. Exchange code for tokens
    3. Fetch user info (consumes the single-use access_token)
    4. Cache everything in the session
    """
    if error:
        raise HTTPException(400, error_description or error)

    if not code or not state:
        raise HTTPException(400, "Missing code or state parameter")

    session = _session(request)
    expected_state = session.pop("state", None)
    if not expected_state or state != expected_state:
        raise HTTPException(403, "Invalid state — possible CSRF attack")

    settings: ISEISettings = get_settings()

    # Step 1: exchange code → tokens
    token_data = await _exchange_code(code, settings)
    access_token = token_data["access_token"]
    user_id = token_data["user_id"]

    # Step 2: fetch user info (consumes the access_token)
    userinfo = await _fetch_userinfo(access_token, user_id, settings)

    # Step 3: persist in session
    session["user_id"] = user_id
    session["userinfo"] = userinfo
    session["refresh_token"] = token_data.get("refresh_token")
    session["token_type"] = token_data.get("token_type", "bearer")
    session["expires_in"] = token_data.get("expires_in")

    return {
        "status": "authenticated",
        "user_id": user_id,
        "userinfo": userinfo,
    }


@router.get("/isei/userinfo")
async def userinfo(request: Request) -> dict[str, Any]:
    """Return cached user profile from the session.

    If the caller needs *fresh* data, they should use the stored
    refresh_token to obtain a new access_token and call /get-user-info
    again.  This endpoint returns the profile fetched during the initial
    callback.
    """
    session = _session(request)
    if "userinfo" not in session:
        raise HTTPException(401, "Not authenticated — call /auth/isei/login first")
    return {
        "user_id": session.get("user_id"),
        "userinfo": session["userinfo"],
    }


@router.post("/isei/logout")
async def logout(request: Request) -> dict[str, str]:
    """Clear the ІСЕІ session data."""
    request.session.pop(SESSION_KEY, None)
    return {"status": "logged_out"}
