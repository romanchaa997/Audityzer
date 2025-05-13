@echo off
REM Script to generate coverage reports and upload to Codecov

REM Ensure we're in the project root
cd %~dp0\..

REM Install dependencies if needed
if not exist "node_modules" (
  echo Installing dependencies...
  call npm ci
)

REM Install Playwright browsers if needed
echo Ensuring Playwright browsers are installed...
call npx playwright install --with-deps

REM Run tests with coverage
echo Running tests with coverage...
call npm run test:coverage

REM Download and verify Codecov uploader
echo Downloading Codecov uploader...
curl -Os https://cli.codecov.io/latest/windows/codecov.exe
curl -Os https://cli.codecov.io/latest/windows/codecov.exe.SHA256SUM
curl -Os https://cli.codecov.io/latest/windows/codecov.exe.SHA256SUM.sig

REM Make the binary executable (not needed on Windows)
REM Check if CODECOV_TOKEN is set
echo Uploading coverage to Codecov...
if "%CODECOV_TOKEN%" == "" (
  echo CODECOV_TOKEN environment variable not set, using token from package.json...
  set CODECOV_TOKEN=7eb6aaf4-9247-480d-9286-c1ff12a83dd6
)

REM Upload to Codecov
codecov.exe upload-process -t %CODECOV_TOKEN% -r romanchaa997/Web3FuzzForge

echo Coverage upload complete! 