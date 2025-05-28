#!/usr/bin/env python3
"""
Import statement updater for restructured Audityzer repository
"""
import os
import re
import json
from pathlib import Path
from typing import Dict, List


class ImportUpdater:
    def __init__(self, mapping_file: str):
        with open(mapping_file, "r") as f:
            self.file_mapping = json.load(f)

        self.import_replacements = self.generate_import_map()

    def generate_import_map(self) -> Dict[str, str]:
        """Generate mapping of old imports to new package-based imports"""
        import_map = {}

        # Map old file paths to new package structure
        for target_dir, files in self.file_mapping.items():
            for old_path in files:
                old_import = self.path_to_import(old_path)
                new_import = self.path_to_package_import(target_dir, old_path)
                import_map[old_import] = new_import

        return import_map

    def path_to_import(self, file_path: str) -> str:
        """Convert file path to import statement pattern"""
        # Remove file extension and normalize path
        import_path = file_path.replace(".js", "").replace(".ts", "")
        return import_path.replace("\\", "/")

    def path_to_package_import(self, target_dir: str, old_path: str) -> str:
        """Generate new package-based import path"""
        filename = os.path.basename(old_path).replace(".js", "").replace(".ts", "")

        if target_dir.startswith("packages/"):
            package_name = target_dir.split("/")[1]
            return f"@audityzer/{package_name}/{filename}"
        elif target_dir.startswith("tools/"):
            return f"@audityzer/tools/{filename}"
        else:
            return f"@audityzer/core/{filename}"

    def update_file_imports(self, file_path: Path):
        """Update import statements in a single file"""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            original_content = content

            # Update ES6 imports
            for old_import, new_import in self.import_replacements.items():
                # Match import statements
                import_pattern = rf"(import.*from\s+[\'\"])({re.escape(old_import)})([\'\"])"
                content = re.sub(import_pattern, rf"\1{new_import}\3", content)

                # Match require statements
                require_pattern = rf"(require\s*\(\s*[\'\"])({re.escape(old_import)})([\'\"])"
                content = re.sub(require_pattern, rf"\1{new_import}\3", content)

            # Write back if changes were made
            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"✓ Updated imports in {file_path}")

        except (UnicodeDecodeError, IOError) as e:
            print(f"✗ Error updating {file_path}: {e}")

    def update_all_imports(self):
        """Update import statements across the entire repository"""
        print("Updating import statements...")

        # Process all JavaScript and TypeScript files
        for file_path in Path(".").rglob("*.js"):
            if self.should_process(file_path):
                self.update_file_imports(file_path)

        for file_path in Path(".").rglob("*.ts"):
            if self.should_process(file_path):
                self.update_file_imports(file_path)

    def should_process(self, file_path: Path) -> bool:
        """Check if file should be processed for import updates"""
        ignore_patterns = [
            "node_modules",
            ".git",
            "dist",
            "build",
            "coverage",
        ]

        return not any(pattern in str(file_path) for pattern in ignore_patterns)


if __name__ == "__main__":
    updater = ImportUpdater("migration_mapping.json")
    updater.update_all_imports()
    print("Import updates complete!")
