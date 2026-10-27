import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Situs statis satu halaman. `base: '/'` karena dipasang di root subdomain
// (indragunawan.luckywater.web.id), bukan di dalam subfolder — PRD §8.
// Host tambahan yang boleh mengakses dev/preview server. Dipakai saat situs
// diuji lewat terowongan (mis. localhost.run) dari komputer lain.
// Setel lewat variabel lingkungan: HOST_TEROWONGAN=".lhr.life" npm run dev -- --host 0.0.0.0
const daftarHost = (process.env.HOST_TEROWONGAN || '.lhr.life,.trycloudflare.com')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean)

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { allowedHosts: daftarHost },
  preview: { allowedHosts: daftarHost },
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
