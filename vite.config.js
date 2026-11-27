import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://api.ladakhheritage.com',
        changeOrigin: true,
        secure: true,
      },
      '/uploads': {
        target: 'https://api.ladakhheritage.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
