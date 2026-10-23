import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces for ngrok/tunnel access
    port: 5173,
    allowedHosts: true, // Allow any incoming ngrok / tunnel hostnames
    cors: true,
    proxy: {
      // Forward all backend API and admin requests to local Django server
      '/api': {
        target: 'https://portfolio-backend-five-ruby.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'https://portfolio-backend-five-ruby.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/static': {
        target: 'https://portfolio-backend-five-ruby.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
