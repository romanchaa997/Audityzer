
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { config } from 'dotenv';
import path from 'path';

// Load test environment variables
config({ path: path.resolve(process.cwd(), '.env.test') });

// Global test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.MOCK_MODE = 'true';
  
  // Initialize test database or mock services if needed
  console.log('🧪 Setting up test environment...');
});

afterAll(async () => {
  // Cleanup after all tests
  console.log('🧹 Cleaning up test environment...');
});

beforeEach(() => {
  // Reset mocks before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Cleanup after each test
  vi.restoreAllMocks();
});

// Global test utilities
global.testUtils = {
  createMockConfig: () => ({
    apiKey: 'test-api-key',
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
    retries: 3
  }),
  
  createMockAuditResult: () => ({
    id: 'test-audit-123',
    status: 'completed',
    score: 85,
    issues: [],
    timestamp: new Date().toISOString()
  }),
  
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
};

// Mock external dependencies
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }))
  }
}));

vi.mock('fs-extra', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
  ensureDir: vi.fn(),
  pathExists: vi.fn(),
  remove: vi.fn(),
  copy: vi.fn()
}));
