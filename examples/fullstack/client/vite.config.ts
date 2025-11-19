import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const simpleApisDist = fileURLToPath(new URL('../../../dist/index.js', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'simple-apis': simpleApisDist,
    },
  },
  server: {
    port: 5173,
  },
})