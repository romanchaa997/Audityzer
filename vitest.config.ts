
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', 'tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['tests/e2e/**', 'tests/**/*.spec.ts', 'tests/**/*.test.js', 'node_modules/**', 'dist/**', 'tests/security/**', 'tests/bridge-transfer.test.ts', 'tests/connection.test.*', 'tests/custom.test.*', 'tests/demo-flow.*', 'tests/layerzero-bridge.*', 'tests/metamask-*', 'tests/transaction.*', 'tests/wallet-*', 'tests/ci-circle-integration.*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'tests/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/coverage/**'
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    isolate: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@core': path.resolve(__dirname, './src/core'),
      '@cli': path.resolve(__dirname, './src/cli')
    }
  }
});
