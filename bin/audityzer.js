#!/usr/bin/env node

/**
 * Audityzer CLI
 * Cross-chain DeFi fuzzing toolkit for security researchers
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { runCLI } = require('../src/cli/index.cjs');

// Execute the CLI
runCLI(process.argv); 