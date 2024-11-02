import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://13.202.215.205:5000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
