"""ІСЕІ (id.gov.ua) OAuth 2.0 authentication module for Audityzer."""

from auth.isei import router as isei_router
from auth.isei_config import ISEISettings

__all__ = ["isei_router", "ISEISettings"]
