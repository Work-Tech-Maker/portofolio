/**
 * Navbar.jsx — navigasi tetap di atas (sticky) dengan tautan anchor.
 *
 * Data diambil dari: src/data/teks.js (label), src/data/profil.js (nama),
 * src/data/kontak.js (tidak dipakai di sini).
 *
 * Dua perilaku penting:
 *  1. Warnanya BERUBAH mengikuti zona bagian yang sedang berada di bawahnya
 *     (terang <-> gelap). Tanpa ini, tautan akan hilang saat melewati bagian
 *     gelap (DESIGN.md §2).
 *  2. Menandai bagian yang sedang aktif saat halaman digulir (PRD §5.2).
 *
 * Di layar kecil (< 768 px) tautan berubah menjadi menu hamburger.
 */

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { profil } from '../data/profil'
import { teks } from '../data/teks'
import { adaTautan } from '../data/kontak'
import Tombol from './ui/Tombol'

const TAUTAN = [
  { id: 'layanan', label: teks.nav.layanan },
  { id: 'proyek', label: teks.nav.proyek },
  { id: 'tentang', label: teks.nav.tentang },
  { id: 'kontak', label: teks.nav.kontak },
]

const TINGGI_NAV = 72 // px, dipakai juga sebagai offset gulir anchor

export default function Navbar() {
  const [tergulir, setTergulir] = useState(false)
  const [zona, setZona] = useState('terang')
  const [aktif, setAktif] = useState('')
  const [menuBuka, setMenuBuka] = useState(false)

  useEffect(() => {
    let rencana = 0

    const hitung = () => {
      rencana = 0
      setTergulir(window.scrollY > 24)

      const bagian = Array.from(document.querySelectorAll('section[data-zona]'))
      if (bagian.length === 0) return

      // Zona diukur di tengah navbar: warna nav mengikuti bagian yang menutupi
      // posisi itu.
      const garisNav = TINGGI_NAV / 2
      const diNav = bagian.find((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= garisNav && r.bottom > garisNav
      })
      if (diNav) setZona(diNav.dataset.zona || 'terang')

      // Tautan aktif: bagian yang judulnya paling dekat dengan sepertiga atas layar.
      const garisBaca = window.innerHeight * 0.3
      const kandidat = bagian
        .filter((el) => el.getBoundingClientRect().top <= garisBaca)
        .pop()
      setAktif(kandidat?.id || '')
    }

    const saatGulir = () => {
      if (rencana) return
      rencana = window.requestAnimationFrame(hitung)
    }

    hitung()
    window.addEventListener('scroll', saatGulir, { passive: true })
    window.addEventListener('resize', saatGulir)
    return () => {
      window.removeEventListener('scroll', saatGulir)
      window.removeEventListener('resize', saatGulir)
      if (rencana) window.cancelAnimationFrame(rencana)
    }
  }, [])

  // Menu mobile: kunci gulir halaman selama terbuka
  useEffect(() => {
    if (!menuBuka) return undefined
    const sebelum = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = sebelum
    }
  }, [menuBuka])

  const gelap = zona === 'gelap'

  const gayaNav = gelap
    ? 'bg-gelap-bg text-gelap-ink border-gelap-border'
    : 'bg-terang-surface/95 text-terang-ink border-terang-border'

  const gayaTautan = (id) => {
    const aktifIni = aktif === id
    if (gelap) {
      return `${aktifIni ? 'text-teal-terang' : 'text-gelap-ink-2 hover:text-gelap-ink'} ${
        aktifIni ? 'after:scale-x-100 after:bg-teal-terang' : ''
      }`
    }
    return `${aktifIni ? 'text-teal' : 'text-terang-ink-2 hover:text-terang-ink'} ${
      aktifIni ? 'after:scale-x-100 after:bg-teal' : ''
    }`
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        tergulir || menuBuka ? gayaNav : gelap ? 'bg-gelap-bg/80 border-transparent backdrop-blur' : 'bg-terang-bg/80 border-transparent backdrop-blur'
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-isi items-center justify-between gap-4 px-5 md:h-[72px] md:px-8"
      >
        {/* Nama / logo teks */}
        <a
          href="#atas"
          className="flex min-h-11 items-center gap-2 font-judul text-[17px] font-extrabold tracking-tight"
        >
          <span
            aria-hidden="true"
            className={`flex size-8 items-center justify-center rounded-chip text-[13px] font-bold ${
              gelap ? 'bg-teal-terang text-[#04201F]' : 'bg-teal text-white'
            }`}
          >
            IG
          </span>
          <span className="hidden sm:inline">{profil.nama}</span>
        </a>

        {/* Tautan desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {TAUTAN.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={aktif === t.id ? 'true' : undefined}
                className={`relative inline-flex min-h-11 items-center px-1 text-label font-semibold transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-3 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-200 hover:after:scale-x-100 ${gayaTautan(
                  t.id,
                )}`}
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {adaTautan(profil.cv) ? (
            <Tombol
              href={profil.cv}
              variant={gelap ? 'utamaGelap' : 'utama'}
              ukuran="md"
              className="hidden sm:inline-flex"
              download
            >
              {teks.nav.unduhCv}
            </Tombol>
          ) : null}

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setMenuBuka((v) => !v)}
            aria-expanded={menuBuka}
            aria-controls="menu-mobile"
            aria-label={menuBuka ? teks.nav.tutupMenu : teks.nav.bukaMenu}
            className={`flex size-11 items-center justify-center rounded-tombol md:hidden ${
              gelap ? 'hover:bg-gelap-surface' : 'hover:bg-terang-surface-2'
            }`}
          >
            {menuBuka ? (
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Panel menu mobile */}
      {menuBuka ? (
        <div
          id="menu-mobile"
          className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto px-5 py-6 md:hidden ${
            gelap ? 'bg-gelap-bg' : 'bg-terang-surface'
          }`}
        >
          <ul className="flex flex-col">
            {TAUTAN.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  onClick={() => setMenuBuka(false)}
                  className={`flex h-12 items-center border-b text-[17px] font-semibold ${
                    gelap ? 'border-gelap-border text-gelap-ink' : 'border-terang-border text-terang-ink'
                  }`}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
          {adaTautan(profil.cv) ? (
            <Tombol
              href={profil.cv}
              variant={gelap ? 'utamaGelap' : 'utama'}
              ukuran="lg"
              className="mt-6 w-full"
              download
            >
              {teks.nav.unduhCv}
            </Tombol>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
