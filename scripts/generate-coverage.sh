#!/bin/bash
# Script to generate coverage reports and upload to Codecov

# Ensure we're in the project root
cd "$(dirname "$0")/.." || exit

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Install Playwright browsers if needed
echo "Ensuring Playwright browsers are installed..."
npx playwright install --with-deps

# Run tests with coverage
echo "Running tests with coverage..."
npm run test:coverage

# Download and verify Codecov uploader
echo "Downloading Codecov uploader..."
curl -Os https://cli.codecov.io/latest/linux/codecov
curl -Os https://cli.codecov.io/latest/linux/codecov.SHA256SUM
curl -Os https://cli.codecov.io/latest/linux/codecov.SHA256SUM.sig

# Verify the binary (optional, may fail on some systems)
echo "Verifying Codecov binary..."
curl https://keybase.io/codecovsecurity/pgp_keys.asc | gpg --no-default-keyring --keyring trustedkeys.gpg --import || echo "GPG key import failed, continuing anyway..."
gpg --verify codecov.SHA256SUM.sig codecov.SHA256SUM || echo "GPG verification failed, continuing anyway..."
shasum -a 256 -c codecov.SHA256SUM || exit 1

# Make the binary executable
chmod +x codecov

# Upload to Codecov
echo "Uploading coverage to Codecov..."
if [ -z "$CODECOV_TOKEN" ]; then
  echo "CODECOV_TOKEN environment variable not set, using token from package.json..."
  CODECOV_TOKEN="7eb6aaf4-9247-480d-9286-c1ff12a83dd6"
fi

./codecov upload-process -t "$CODECOV_TOKEN" -r romanchaa997/Audityzer

echo "Coverage upload complete!" 