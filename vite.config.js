import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/fm-13-password-generator/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
