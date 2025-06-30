import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'public/index.html'
      }
    }
  },
  server: {
    port: 5000,
    host: true
  },
  publicDir: 'public',
  root: '.'
});
