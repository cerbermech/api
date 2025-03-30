import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.yclients.com/api/v1/clients/1267825/',
        changeOrigin: true,
        secure: true, // Включаем проверку SSL
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});