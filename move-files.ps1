# move-files.ps1
# This script reads migration_mapping.json and moves files with git mv

$json = Get-Content .\migration_mapping.json | ConvertFrom-Json
$MAPPING_FILE = "migration_mapping.json"
$BACKUP_BRANCH = "pre-restructure-backup"

foreach ($target in $json.PSObject.Properties.Name) {
    $files = $json.$target
    foreach ($file in $files) {
        $filename = Split-Path $file -Leaf
        $destination = Join-Path $target $filename
        # Ensure the destination directory exists
        if (-not (Test-Path $target)) {
            New-Item -ItemType Directory -Path $target -Force | Out-Null
        }
        if (Test-Path $file) {
            git mv $file $destination
            Write-Host "Moved $file to $destination"
        } else {
            Write-Host "File not found: $file"
        }
    }
}
