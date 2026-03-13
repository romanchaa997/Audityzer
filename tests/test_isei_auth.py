"""Tests for ІСЕІ (id.gov.ua) OAuth 2.0 authentication module.

All HTTP calls to id.gov.ua are mocked — no real network access.
"""

from __future__ import annotations

import asyncio
from unittest.mock import AsyncMock, MagicMock, patch
from urllib.parse import parse_qs, urlparse

import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from starlette.middleware.sessions import SessionMiddleware

from auth.isei import router
from auth.isei_config import ISEISettings

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

TEST_SETTINGS = ISEISettings(
    client_id="test-client-id",
    client_secret="test-client-secret",
    redirect_uri="https://audityzer.test/auth/callback/isei",
    base_url="https://test.id.gov.ua",
    auth_types="dig_sign,bank_id",
    fields="givenname,lastname,email",
)


@pytest.fixture()
def app() -> FastAPI:
    application = FastAPI()
    application.add_middleware(SessionMiddleware, secret_key="test-secret")
    application.include_router(router)
    return application


@pytest.fixture()
def client(app: FastAPI) -> TestClient:
    return TestClient(app, follow_redirects=False)


@pytest.fixture(autouse=True)
def _override_settings():
    with patch("auth.isei.get_settings", return_value=TEST_SETTINGS):
        yield


# ---------------------------------------------------------------------------
# Mock HTTP response helpers
# ---------------------------------------------------------------------------

TOKEN_RESPONSE = {
    "access_token": "at-single-use-abc123",
    "token_type": "bearer",
    "expires_in": "3600",
    "refresh_token": "rt-xyz789",
    "user_id": "user-42",
}

USERINFO_RESPONSE = {
    "givenname": "Тарас",
    "lastname": "Шевченко",
    "email": "taras@example.ua",
}

REFRESHED_TOKEN_RESPONSE = {
    "access_token": "at-refreshed-new-token",
    "token_type": "bearer",
    "expires_in": "3600",
    "refresh_token": "rt-refreshed-new",
    "user_id": "user-42",
}


def _make_response(status_code: int, json_data: dict) -> MagicMock:
    """Create a mock httpx.Response (json() is sync in httpx)."""
    resp = MagicMock()
    resp.status_code = status_code
    resp.text = str(json_data)
    resp.json.return_value = json_data
    return resp


def _mock_post(url: str, **kwargs) -> MagicMock:
    """Return a mock httpx response based on the URL being called."""
    if "/get-access-token" in url:
        data = kwargs.get("data", {})
        if data.get("grant_type") == "refresh_token":
            return _make_response(200, REFRESHED_TOKEN_RESPONSE)
        return _make_response(200, TOKEN_RESPONSE)
    if "/get-user-info" in url:
        return _make_response(200, USERINFO_RESPONSE)
    return _make_response(404, {"error": "not_found"})


def _make_mock_http_client(post_side_effect=None, post_return_value=None):
    """Build an AsyncMock that behaves like httpx.AsyncClient context manager."""
    mock_instance = AsyncMock()
    mock_instance.__aenter__ = AsyncMock(return_value=mock_instance)
    mock_instance.__aexit__ = AsyncMock(return_value=False)
    if post_side_effect is not None:
        mock_instance.post = AsyncMock(side_effect=post_side_effect)
    elif post_return_value is not None:
        mock_instance.post = AsyncMock(return_value=post_return_value)
    return mock_instance


# ---------------------------------------------------------------------------
# Tests: /auth/isei/login
# ---------------------------------------------------------------------------


class TestLogin:
    def test_login_redirects_to_isei(self, client: TestClient):
        resp = client.get("/auth/isei/login")
        assert resp.status_code == 307

        location = resp.headers["location"]
        assert location.startswith("https://test.id.gov.ua/")

        parsed = urlparse(location)
        params = parse_qs(parsed.query)

        assert params["response_type"] == ["code"]
        assert params["client_id"] == ["test-client-id"]
        assert params["auth_type"] == ["dig_sign,bank_id"]
        assert params["redirect_uri"] == ["https://audityzer.test/auth/callback/isei"]
        assert "state" in params
        assert len(params["state"][0]) > 16  # sufficiently random

    def test_login_sets_state_in_session(self, client: TestClient):
        resp = client.get("/auth/isei/login")
        assert resp.status_code == 307
        assert "session" in resp.cookies or any(
            "session" in c for c in resp.headers.getlist("set-cookie")
        )


# ---------------------------------------------------------------------------
# Tests: /auth/callback/isei
# ---------------------------------------------------------------------------


def _login_and_get_state(client: TestClient) -> str:
    """Perform login to set session state, return the state value."""
    resp = client.get("/auth/isei/login")
    location = resp.headers["location"]
    params = parse_qs(urlparse(location).query)
    return params["state"][0]


class TestCallback:
    @patch("auth.isei.httpx.AsyncClient")
    def test_callback_success(self, mock_client_cls, client: TestClient):
        state = _login_and_get_state(client)

        mock_client_cls.return_value = _make_mock_http_client(
            post_side_effect=_mock_post
        )

        resp = client.get(f"/auth/callback/isei?code=auth-code-123&state={state}")
        assert resp.status_code == 200

        body = resp.json()
        assert body["status"] == "authenticated"
        assert body["user_id"] == "user-42"
        assert body["userinfo"]["givenname"] == "Тарас"
        assert body["userinfo"]["lastname"] == "Шевченко"

    def test_callback_missing_code(self, client: TestClient):
        state = _login_and_get_state(client)
        resp = client.get(f"/auth/callback/isei?state={state}")
        assert resp.status_code == 400

    def test_callback_missing_state(self, client: TestClient):
        _login_and_get_state(client)
        resp = client.get("/auth/callback/isei?code=some-code")
        assert resp.status_code == 400

    def test_callback_invalid_state_csrf(self, client: TestClient):
        _login_and_get_state(client)
        resp = client.get("/auth/callback/isei?code=some-code&state=wrong-state")
        assert resp.status_code == 403

    def test_callback_error_from_isei(self, client: TestClient):
        resp = client.get(
            "/auth/callback/isei?error=access_denied&error_description=User+cancelled"
        )
        assert resp.status_code == 400

    @patch("auth.isei.httpx.AsyncClient")
    def test_callback_token_exchange_failure(self, mock_client_cls, client: TestClient):
        state = _login_and_get_state(client)

        error_resp = _make_response(400, {"error": "bad request"})
        error_resp.text = "bad request"
        mock_client_cls.return_value = _make_mock_http_client(
            post_return_value=error_resp
        )

        resp = client.get(f"/auth/callback/isei?code=bad-code&state={state}")
        assert resp.status_code == 502


# ---------------------------------------------------------------------------
# Tests: /auth/isei/userinfo
# ---------------------------------------------------------------------------


class TestUserInfo:
    @patch("auth.isei.httpx.AsyncClient")
    def test_userinfo_returns_cached_profile(self, mock_client_cls, client: TestClient):
        state = _login_and_get_state(client)

        mock_client_cls.return_value = _make_mock_http_client(
            post_side_effect=_mock_post
        )

        client.get(f"/auth/callback/isei?code=auth-code-123&state={state}")

        resp = client.get("/auth/isei/userinfo")
        assert resp.status_code == 200
        body = resp.json()
        assert body["user_id"] == "user-42"
        assert body["userinfo"]["email"] == "taras@example.ua"

    def test_userinfo_unauthenticated(self, client: TestClient):
        resp = client.get("/auth/isei/userinfo")
        assert resp.status_code == 401


# ---------------------------------------------------------------------------
# Tests: /auth/isei/logout
# ---------------------------------------------------------------------------


class TestLogout:
    @patch("auth.isei.httpx.AsyncClient")
    def test_logout_clears_session(self, mock_client_cls, client: TestClient):
        state = _login_and_get_state(client)

        mock_client_cls.return_value = _make_mock_http_client(
            post_side_effect=_mock_post
        )

        client.get(f"/auth/callback/isei?code=auth-code-123&state={state}")

        resp = client.post("/auth/isei/logout")
        assert resp.status_code == 200
        assert resp.json()["status"] == "logged_out"

        resp = client.get("/auth/isei/userinfo")
        assert resp.status_code == 401


# ---------------------------------------------------------------------------
# Tests: Refresh token flow
# ---------------------------------------------------------------------------


class TestRefreshToken:
    @patch("auth.isei.httpx.AsyncClient")
    def test_refresh_token_returns_new_access_token(self, mock_client_cls):
        from auth.isei import _refresh_access_token

        refresh_resp = _make_response(200, REFRESHED_TOKEN_RESPONSE)
        mock_client_cls.return_value = _make_mock_http_client(
            post_return_value=refresh_resp
        )

        loop = asyncio.new_event_loop()
        try:
            result = loop.run_until_complete(
                _refresh_access_token("rt-xyz789", TEST_SETTINGS)
            )
        finally:
            loop.close()

        assert result["access_token"] == "at-refreshed-new-token"
        assert result["refresh_token"] == "rt-refreshed-new"

    @patch("auth.isei.httpx.AsyncClient")
    def test_refresh_token_failure(self, mock_client_cls):
        from auth.isei import _refresh_access_token

        error_resp = _make_response(400, {"error": "invalid"})
        error_resp.text = "invalid refresh token"
        mock_client_cls.return_value = _make_mock_http_client(
            post_return_value=error_resp
        )

        loop = asyncio.new_event_loop()
        try:
            with pytest.raises(HTTPException) as exc_info:
                loop.run_until_complete(
                    _refresh_access_token("bad-token", TEST_SETTINGS)
                )
            assert exc_info.value.status_code == 502
        finally:
            loop.close()


# ---------------------------------------------------------------------------
# Tests: ISEISettings config
# ---------------------------------------------------------------------------


class TestConfig:
    def test_derived_urls(self):
        s = TEST_SETTINGS
        assert s.authorization_url == "https://test.id.gov.ua/"
        assert s.token_url == "https://test.id.gov.ua/get-access-token"
        assert s.userinfo_url == "https://test.id.gov.ua/get-user-info"

    def test_production_urls(self):
        s = ISEISettings(
            client_id="c",
            client_secret="s",
            base_url="https://id.gov.ua",
        )
        assert s.authorization_url == "https://id.gov.ua/"
        assert s.token_url == "https://id.gov.ua/get-access-token"
        assert s.userinfo_url == "https://id.gov.ua/get-user-info"

    def test_default_fields(self):
        s = ISEISettings(client_id="c", client_secret="s")
        assert "givenname" in s.fields
        assert "drfocode" in s.fields
        assert "unzr" in s.fields
