
// Main entry point for Audityzer
import { AudityzerCore } from './core/audityzer-core';

export * from './core/audityzer-core';
export * from './core/security-scanner';
export * from './core/vulnerability-detector';

// Initialize Audityzer
const audityzer = new AudityzerCore();

if (require.main === module) {
  logger.info('🔒 Audityzer Security Scanner initialized');
  audityzer.start().catch(console.error);
}

export default audityzer;
