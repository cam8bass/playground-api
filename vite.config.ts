import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './config.env',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: true,
    proxy: {
      '/playground-connect': 'http://localhost:4000'
    }
    // hmr: {
    //   overlay: import.meta.env.VITE_NODE_ENV === 'production' ? false : true
    // }
  },
  mode: 'production'
})
