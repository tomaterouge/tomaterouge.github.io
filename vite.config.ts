import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],

  define: {
    'process.env': {},
    // gray-matter needs this in some environments
    'global': 'globalThis',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Ensure base is set for GitHub Pages if needed, strictly defaults to '/'
  base: '/', 
})
