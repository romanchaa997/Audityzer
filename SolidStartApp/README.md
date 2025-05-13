# SolidStart App with Codecov Integration

This is a SolidStart application configured with Codecov bundle analysis integration.

## Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build the application (with Codecov bundle analysis)
npm run build
```

## Codecov Integration

This project is configured with the `@codecov/solidstart-plugin` to automatically upload bundle analysis data to Codecov during the build process.

The configuration is in `app.config.ts`:

```typescript
codecovSolidStartPlugin({
  enableBundleAnalysis: true,
  bundleName: 'solidstart-app-bundle',
  uploadToken: process.env.CODECOV_TOKEN || '7eb6aaf4-9247-480d-9286-c1ff12a83dd6',
});
```

## Features

- SolidJS-based web application
- Fast and lightweight
- Built-in Codecov integration for bundle analysis
- TypeScript support
