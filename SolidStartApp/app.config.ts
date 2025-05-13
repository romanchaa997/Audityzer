import { defineConfig } from '@solidjs/start/config';
import solidPlugin from 'vite-plugin-solid';
import { codecovSolidStartPlugin } from '@codecov/solidstart-plugin';

export default defineConfig({
  vite: {
    plugins: [
      solidPlugin(),
      // Put the Codecov SolidStart plugin after all other plugins
      codecovSolidStartPlugin({
        enableBundleAnalysis: true,
        bundleName: 'solidstart-app-bundle',
        uploadToken: process.env.CODECOV_TOKEN || '7eb6aaf4-9247-480d-9286-c1ff12a83dd6',
      }),
    ],
  },
});
