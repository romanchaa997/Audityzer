"""Pydantic settings for ІСЕІ (id.gov.ua) OAuth 2.0 integration.

ІСЕІ is NOT Keycloak/OIDC. It uses custom endpoints:
  - Authorization: {base_url}/?response_type=code&...
  - Token:        {base_url}/get-access-token
  - UserInfo:     {base_url}/get-user-info
"""

from functools import lru_cache

from pydantic_settings import BaseSettings


class ISEISettings(BaseSettings):
    """Configuration loaded from ISEI_* environment variables."""

    client_id: str
    client_secret: str
    redirect_uri: str = "https://audityzer.com/auth/callback/isei"
    base_url: str = "https://test.id.gov.ua"
    auth_types: str = "dig_sign,diia_id,bank_id"
    fields: str = (
        "givenname,middlename,lastname,edrpoucode,drfocode,"
        "email,phone,o,ou,title,unzr"
    )

    model_config = {"env_prefix": "ISEI_"}

    # --- derived URLs ---

    @property
    def authorization_url(self) -> str:
        return f"{self.base_url}/"

    @property
    def token_url(self) -> str:
        return f"{self.base_url}/get-access-token"

    @property
    def userinfo_url(self) -> str:
        return f"{self.base_url}/get-user-info"


@lru_cache
def get_settings() -> ISEISettings:
    return ISEISettings()  # type: ignore[call-arg]
