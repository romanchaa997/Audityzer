#!/usr/bin/env python3
"""
Improved Import statement updater for Audityzer with progress logging and optimized file traversal
"""
import os

import json
import time
from pathlib import Path
from typing import Dict
import re

class ImportUpdater:
    def __init__(self, mapping_file: str):
        with open(mapping_file, 'r') as f:
            self.file_mapping = json.load(f)
        self.import_replacements = self.generate_import_map()

    def generate_import_map(self) -> Dict[str, str]:
        import_map = {}
        for target_dir, files in self.file_mapping.items():
            for old_path in files:
                old_import = self.path_to_import(old_path)
                new_import = self.path_to_package_import(target_dir, old_path)
                import_map[old_import] = new_import
        return import_map

    def path_to_import(self, file_path: str) -> str:
        return file_path.replace('.js', '').replace('.ts', '').replace('\\', '/')

    def path_to_package_import(self, target_dir: str, old_path: str) -> str:
        filename = os.path.basename(old_path).replace('.js', '').replace('.ts', '')
        if target_dir.startswith('packages/'):
            package_name = target_dir.split('/')[1]
            return f"@audityzer/{package_name}/{filename}"
        elif target_dir.startswith('tools/'):
            return f"@audityzer/tools/{filename}"
        else:
            return f"@audityzer/core/{filename}"


    def update_file_imports(self, file_path: Path) -> bool:
        try:
            if file_path.stat().st_size > 500_000:
                print(f"⚠️ Skipped large file: {file_path}")
                return False

            print(f"→ Scanning: {file_path}")

            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            original_content = content

            for old_import, new_import in self.import_replacements.items():
                print(f"Replacing import: {old_import} → {new_import}")
                content = re.sub(
                    rf'(import.*from\s+[\'"])({re.escape(old_import)})([\'"])',
                    rf'\1{new_import}\3',
                    content
                )

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Updated: {file_path}")
                return True
            return False
        except Exception as e:
            print(f"✗ Failed: {file_path} — {e}")
            return False

    def walk_filtered(self, directory: Path):
        ignore_dirs = {'node_modules', '.git', 'dist', 'build', 'coverage', '.venv'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for file in files:
                if file.endswith(('.js', '.ts')):
                    yield Path(root) / file

    def update_all_imports(self):
        print("🔧 Updating import statements...\n")
        start = time.time()
        total_files = 0
        updated_files = 0

        for file_path in self.walk_filtered(Path('.')):
            total_files += 1
            if self.update_file_imports(file_path):
                updated_files += 1

        duration = time.time() - start
        print(f"\n🏁 Done! Updated {updated_files} of {total_files} files in {duration:.2f} seconds.")

if __name__ == "__main__":
    updater = ImportUpdater("migration_mapping.json")
    updater.update_all_imports()
