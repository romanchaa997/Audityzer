# move-files.ps1
# Safely moves files based on migration_mapping.json using git mv

$MAPPING_FILE = "migration_mapping.json"
$BACKUP_BRANCH = "pre-restructure-backup"

$json = Get-Content .\$MAPPING_FILE | ConvertFrom-Json

foreach ($target in $json.PSObject.Properties.Name) {
    $files = $json.$target
    foreach ($file in $files) {
        $filename = Split-Path $file -Leaf
        $destination = "$target\$filename"

        # Create target directory if needed
        if (-not (Test-Path $target)) {
            New-Item -ItemType Directory -Path $target -Force | Out-Null
        }

        if (Test-Path $file) {
            try {
                git mv $file $destination
                Write-Host "✔ Moved $file to $destination"
            } catch {
                Write-Host "❌ Failed to move $file to $destination. Error: $_"
            }
        } else {
            Write-Warning "⚠ File not found: $file"
        }
    }
}
