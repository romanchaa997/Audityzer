#!/bin/sh

# Health check script for Audityzer

PORT="${PORT:-3000}"
curl -fsS "http://localhost:${PORT}/health" || exit 1

