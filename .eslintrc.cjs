module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
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
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // Turn off or downgrade rules causing many errors
    eqeqeq: 'warn',
    'no-sequences': 'warn',
    'no-unused-expressions': 'warn',
    'no-void': 'warn',
    'new-cap': 'warn',
    'no-mixed-operators': 'warn',
    'no-return-assign': 'warn',
    'no-throw-literal': 'warn',
    camelcase: 'warn',
    'no-case-declarations': 'warn',
    'no-inner-declarations': 'warn',
    'no-empty-pattern': 'warn',
    'promise/param-names': 'warn',
    'brace-style': 'warn',
    'no-lone-blocks': 'warn',
  },
};
