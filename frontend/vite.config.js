import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // Kluczowe dla Dockera
    port: 3000,       // Port zgodny z docker-compose
    watch: {
      usePolling: true 
    }
  }
})