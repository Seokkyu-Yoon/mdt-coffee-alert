import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'dist') : '',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./assets', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 23600,
    cors: {
      origin: '*',
      credentials: true,
    }
  }
})
