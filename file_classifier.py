
import os

    

import re
import json
from pathlib import Path
from typing import Dict, List, Set

class FileClassifier:
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.file_mapping = {}
        self.module_patterns = {
            'devforge': [
                r'server.*\.(js|ts)$',
                r'port.*\.(js|ts)$',
                r'health.*\.(js|ts)$',
                r'process.*\.(js|ts)$'
            ],
            'security-testing': [
                r'security.*\.(js|ts)$',
                r'vulnerability.*\.(js|ts)$',
                r'reentrancy.*\.(js|ts)$',
                r'oracle.*\.(js|ts)$',
                r'front.*running.*\.(js|ts)$',
                r'flash.*loan.*\.(js|ts)$'
            ],
            'account-abstraction': [
                r'aa.*\.(js|ts)$',
                r'erc.*4337.*\.(js|ts)$',
                r'pimlico.*\.(js|ts)$',
                r'social.*recovery.*\.(js|ts)$',
                r'session.*key.*\.(js|ts)$'
            ],
            'integrations': [
                r'firebase.*\.(js|ts|json)$',
                r'docker.*\.(js|ts|sh|dockerfile)$',
                r'ci.*cd.*\.(yml|yaml|js|ts)$'
            ]
        }
    
    def classify_file(self, file_path: Path) -> str:
        """Classify a file based on its path and content patterns"""
        file_str = str(file_path).lower()
        
        for module, patterns in self.module_patterns.items():
            for pattern in patterns:
                if re.search(pattern, file_str):
                    return module
        
        # Check file content for additional clues
        if file_path.suffix in ['.js', '.ts']:
            return self.classify_by_content(file_path)
            return 'core'
    
    def classify_by_content(self, file_path: Path) -> str:
        """Analyze file content for classification hints"""
        try:
            print(f"Reading file: {file_path}")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().lower()
            return "skipped-large-file"
        
        except UnicodeDecodeError as e:
            print (f"[Encoding error]  {file_path} - {e}")
            self.errors["unreadable-encoding"].append(file_path)    
                
            if 'devforge' in content or 'server' in content:
                return 'devforge'
            elif 'vulnerability' in content or 'security' in content:
                return 'security-testing'
            elif 'erc-4337' in content or 'account abstraction' in content:
                return 'account-abstraction'
            elif 'firebase' in content or 'docker' in content:
                return 'integrations'

        

                  
        
    def analyze_dependencies(self, file_path: Path) -> Set[str]:
        """Extract import/require statements to understand dependencies"""
        dependencies = set()
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Extract ES6 imports
                import_matches = re.findall(r'import.*from\s+[\'"]([^\'\"]+)[\'"]', content)
                dependencies.update(import_matches)
                
                # Extract CommonJS requires
                require_matches = re.findall(r'require\s*\(\s*[\'"]([^\'\"]+)[\'"]\s*\)', content)
                dependencies.update(require_matches)
                
        except (UnicodeDecodeError, IOError):
            pass
        
        return dependencies
    
    def generate_mapping(self) -> Dict:
        """Generate complete file mapping for migration"""
        mapping = {
            'packages/core/src': [],
            'packages/devforge/src': [],
            'packages/security-testing/src': [],
            'packages/account-abstraction/src': [],
            'packages/integrations': [],
            'tools/scripts': [],
            'examples': [],
            'docs': [],
            'tests': []
        }
        
        for file_path in self.repo_path.rglob('*'):
            if file_path.is_file() and not self.should_ignore(file_path):
                module = self.classify_file(file_path)
                relative_path = file_path.relative_to(self.repo_path)
                
                if module == 'core':
                    mapping['packages/core/src'].append(str(relative_path))
                elif module in ['devforge', 'security-testing', 'account-abstraction']:
                    mapping[f'packages/{module}/src'].append(str(relative_path))
                elif module == 'integrations':
                    mapping['packages/integrations'].append(str(relative_path))
                elif 'script' in str(file_path).lower():
                    mapping['tools/scripts'].append(str(relative_path))
                elif 'example' in str(file_path).lower():
                    mapping['examples'].append(str(relative_path))
                elif 'doc' in str(file_path).lower() or file_path.suffix in ['.md', '.rst']:
                    mapping['docs'].append(str(relative_path))
                elif 'test' in str(file_path).lower():
                    mapping['tests'].append(str(relative_path))
        
        return mapping
    
    def should_ignore(self, file_path: Path) -> bool:
        """Check if file should be ignored during migration"""
        ignore_patterns = [
            r'\.git/',
            r'node_modules/',
            r'\.npm/',
            r'\.cache/',
            r'dist/',
            r'build/',
            r'coverage/'
        ]
        
        file_str = str(file_path)
        return any(re.search(pattern, file_str) for pattern in ignore_patterns)

if __name__ == "__main__":
    classifier = FileClassifier(".")
    mapping = classifier.generate_mapping()
    
    with open("migration_mapping.json", "w") as f:
        json.dump(mapping, f, indent=2)
    
    print("File classification complete. Check migration_mapping.json for results.")
