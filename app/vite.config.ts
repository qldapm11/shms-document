import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project Hub phục vụ dưới /shms/docs/ qua gateway Nginx.
export default defineConfig({
  base: '/shms/docs/',
  plugins: [react()],
  server: {
    port: 3012,
    host: '127.0.0.1',
    proxy: {
      '/shms/api': { target: 'http://127.0.0.1:3010', changeOrigin: true },
    },
  },
});
