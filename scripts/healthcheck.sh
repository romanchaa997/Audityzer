#!/bin/sh

# Health check script for Audityzer

curl -f http://localhost:5000/health || exit 1
