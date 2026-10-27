/**
 * App.jsx — menyusun semua bagian sesuai urutan PRD §4.
 *
 * Urutan: Hero → Layanan → Proyek Unggulan → Proyek Pendukung → Kalkulator PPN
 *         → Tentang → Kontak → Footer.
 *
 * Zona warna (DESIGN.md §2):
 *   terang : Hero, Layanan
 *   gelap  : Proyek Unggulan, Proyek Pendukung, Kalkulator PPN
 *   terang : Tentang, Kontak
 *   gelap  : Footer
 *
 * Untuk menambah atau memindah bagian, cukup ubah urutan komponen di bawah.
 * Jangan lupa menambahkan <TransisiZona> di antara pergantian zona supaya
 * warnanya tidak berubah mendadak.
 */

import Hero from './components/Hero'
import Layanan from './components/Layanan'
import ProyekUnggulan from './components/ProyekUnggulan'
import ProyekPendukung from './components/ProyekPendukung'
import KalkulatorPPN from './components/KalkulatorPPN'
import Tentang from './components/Tentang'
import Kontak from './components/Kontak'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { TransisiZona } from './components/ui/Bagian'

export default function App() {
  return (
    <>
      {/* Tautan lompat untuk pengguna keyboard (aksesibilitas) */}
      <a
        href="#layanan"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-tombol focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Lompat ke isi utama
      </a>

      <Navbar />

      <main id="konten">
        <Hero />
        <Layanan />

        <TransisiZona dari="terang" ke="gelap" />
        <ProyekUnggulan />
        <ProyekPendukung />
        <KalkulatorPPN />

        <TransisiZona dari="gelap" ke="terang" />
        <Tentang />
        <Kontak />
      </main>

      <Footer />
    </>
  )
}
