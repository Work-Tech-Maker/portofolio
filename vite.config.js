import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Situs statis satu halaman. `base: '/'` karena dipasang di root subdomain
// (indragunawan.luckywater.web.id), bukan di dalam subfolder — PRD §8.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Pisahkan pustaka animasi & ikon dari bundel utama supaya halaman pertama
    // tetap ringan (target Lighthouse Performance >= 90, PRD §9).
    // Catatan: Vite 8 (rolldown) memakai bentuk fungsi, bukan objek.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'gerak'
          if (id.includes('node_modules/lucide-react')) return 'ikon'
          return undefined
        },
      },
    },
  },
})
