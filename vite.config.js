import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development, requests to /api are forwarded to the Express server.
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 700 },
  server: { port: 5173, proxy: { '/api': 'http://localhost:5001' } },
});
