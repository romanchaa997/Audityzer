// ESLint configuration for Audityzer
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Code Quality
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-debugger': 'error',
    'no-alert': 'warn',
    
    // Style Consistency
    'comma-dangle': ['error', 'only-multiline'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    
    // Best Practices
    'eqeqeq': 'warn',
    'no-sequences': 'warn',
    'no-unused-expressions': 'warn',
    'no-void': 'warn',
    'new-cap': 'warn',
    'no-mixed-operators': 'warn',
    'no-return-assign': 'warn',
    'no-throw-literal': 'warn',
    'camelcase': 'warn',
    'no-case-declarations': 'warn',
    'no-inner-declarations': 'warn',
    'no-empty-pattern': 'warn',
    'no-lone-blocks': 'warn',
    
    // Security
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Performance
    'no-loop-func': 'warn',
    'no-await-in-loop': 'warn',
    
    // Promise handling
    'no-async-promise-executor': 'error',
    'require-atomic-updates': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['tests/**/*', '**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.min.js',
    'reports/',
    'playwright-report/',
    'test-results/',
    '.next/',
    '.nuxt/',
    '.output/',
    '.vuepress/dist/',
    '.serverless/',
    '.fusebox/',
    '.dynamodb/',
    '.tern-port',
    'sw.js',
    'workbox-*.js',
  ],
};
