import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  // resolve: {
  //   alias: [
  //     { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  //     { find: '@reducer', replacement: path.resolve(__dirname, 'src/reducer') },
  //   ],
  // },
})
