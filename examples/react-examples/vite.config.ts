import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // resolve: {
  //   alias: [
  //     { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  //     { find: '@reducer', replacement: path.resolve(__dirname, 'src/reducer') },
  //   ],
  // },
})
