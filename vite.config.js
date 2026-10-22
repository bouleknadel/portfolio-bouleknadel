import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
// Multi-page build: one HTML entry per page, so every URL is a real static file
// (no client-side router, no host rewrite rules needed).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects/index.html'),
        certifications: resolve(import.meta.dirname, 'certifications/index.html'),
      },
    },
  },
})
