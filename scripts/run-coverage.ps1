# Script to generate and upload code coverage for Audityzer
# Must be run with administrator privileges to verify and download Codecov CLI

Write-Host "Generating code coverage report for Audityzer..."

# Run tests with coverage
npm run test:coverage

# Prepare Codecov CLI
Write-Host "Downloading and verifying Codecov CLI..."
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri https://keybase.io/codecovsecurity/pgp_keys.asc -OutFile codecov.asc 

# Check if gpg is installed
$gpgInstalled = $null
try {
    $gpgInstalled = Get-Command gpg.exe -ErrorAction SilentlyContinue
} catch {
    $gpgInstalled = $null
}

if (-not $gpgInstalled) {
    Write-Warning "GPG not found. Skipping signature verification."
} else {
    gpg.exe --import codecov.asc
}

# Download Codecov CLI
Invoke-WebRequest -Uri https://cli.codecov.io/latest/windows/codecov.exe -Outfile codecov.exe
Invoke-WebRequest -Uri https://cli.codecov.io/latest/windows/codecov.exe.SHA256SUM -Outfile codecov.exe.SHA256SUM
Invoke-WebRequest -Uri https://cli.codecov.io/latest/windows/codecov.exe.SHA256SUM.sig -Outfile codecov.exe.SHA256SUM.sig

# Verify the signature if GPG is available
if ($gpgInstalled) {
    gpg.exe --verify codecov.exe.SHA256SUM.sig codecov.exe.SHA256SUM
    If ($(Compare-Object -ReferenceObject $(($(certUtil -hashfile codecov.exe SHA256)[1], "codecov.exe") -join "  ") -DifferenceObject $(Get-Content codecov.exe.SHA256SUM)).length -eq 0) { 
        Write-Host "SHASUM verified" -ForegroundColor Green 
    } Else {
        Write-Host "SHASUM verification failed" -ForegroundColor Red
        exit 1
    }
}

# Get Codecov token
$env:CODECOV_TOKEN = "c03a6d88-a2cf-435b-aa2c-bca32c939ead"

# Upload coverage
Write-Host "Uploading coverage to Codecov..."
./codecov.exe upload-process

Write-Host "Coverage process complete!" -ForegroundColor Green 