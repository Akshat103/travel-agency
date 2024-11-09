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
  build: {
    minify: 'esbuild',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yaraholidays.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
