import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
       server: {
   hmr: {
          host: 'localhost',
          port: 15000,
          protocol: 'ws'
        }
      },
   plugins: [svelte()]
})
