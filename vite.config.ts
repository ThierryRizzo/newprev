import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Assets relativos — funciona em qualquer subpasta (GitHub Pages: /<repo>/).
  base: './',
  server: { port: 5173 },
})
