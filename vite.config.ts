import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { codecovVitePlugin } from '@codecov/vite-plugin';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    codecovVitePlugin({
      enableBundleAnalysis: true,
      bundleName: 'Audityzer',
      uploadToken: process.env.CODECOV_TOKEN || '7eb6aaf4-9247-480d-9286-c1ff12a83dd6',
    }),
  ],
  build: {
    sourcemap: true,
  },
});
