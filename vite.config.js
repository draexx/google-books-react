import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // Output file for the report
      open: true, // Automatically open the report in the browser after build
      gzipSize: true, // Show GZIP size
      brotliSize: true, // Show Brotli size
    }),
  ],
});
