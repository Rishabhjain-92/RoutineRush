import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'RoutineRush',
        short_name: 'RoutineRush',
        description: 'Track your routines and build better habits',
        theme_color: '#f43f5e',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: '/Preview.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Preview.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/Preview.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
