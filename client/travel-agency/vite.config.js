import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer' // Corrected plugin

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    visualizer({ open: true }) // Opens the analyzer report automatically after build
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // If the module is react-datepicker, put it in its own chunk
          if (id.includes('react-datepicker')) {
            return 'react-datepicker'; // This will create a file like 'react-datepicker.js'
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yaraholidays.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
