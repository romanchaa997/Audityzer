
# Audityzer Migration Guide

## Overview
This guide helps developers migrate to the new Audityzer structure after the major restructuring.

## Directory Changes

### Old Structure → New Structure

```
Old:                          New:
├── src/                     ├── src/
│   ├── ai-vulnerability/    │   ├── core/
│   ├── defi-testing/        │   │   ├── engine/
│   ├── bridge-testing/      │   │   ├── security/
│   └── ...                  │   │   ├── wallets/
├── playwright-tests/        │   │   ├── chains/
├── autotests/               │   │   ├── ai/
└── ...                      │   │   └── reporting/
                             │   ├── plugins/
                             │   ├── api/
                             │   ├── cli/
                             │   ├── web/
                             │   └── utils/
                             └── tests/
                                 ├── unit/
                                 ├── integration/
                                 ├── e2e/
                                 └── security/
```

## Import Path Changes

### Before
```javascript
import { SecurityTest } from '../ai-vulnerability/detector';
import { WalletAdapter } from '../defi-testing/wallet';
```

### After
```javascript
import { SecurityTest } from '../core/security/detector';
import { WalletAdapter } from '../core/wallets/adapter';
```

## Configuration Updates

### Package.json Changes
- Package name changed from `devforge` to `audityzer`
- Main entry point updated to `src/index.js`
- Types entry point updated to `src/types/index.d.ts`

### Test Configuration
- All tests consolidated under `tests/` directory
- Test categories: `unit/`, `integration/`, `e2e/`, `security/`

## Breaking Changes

1. **Package Name**: `devforge` → `audityzer`
2. **Import Paths**: All relative imports updated to new structure
3. **Test Organization**: Tests moved to consolidated `tests/` directory
4. **Configuration Files**: Updated to reflect new naming and structure

## Migration Steps

1. Update package.json dependencies
2. Update import statements in your code
3. Update test configurations
4. Update CI/CD pipelines
5. Update documentation references

## Automated Migration

Use the provided migration script:
```bash
npm run migrate
```

This script will:
- Update import paths
- Fix configuration files
- Update test references
- Generate migration report
