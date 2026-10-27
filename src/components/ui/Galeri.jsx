/**
 * Galeri.jsx — galeri screenshot dengan penampil layar penuh (lightbox).
 *
 * Perilaku (DESIGN.md §6):
 *   - klik gambar -> terbuka layar penuh
 *   - panah kiri/kanan atau tombol untuk pindah gambar
 *   - Esc atau tombol X untuk menutup
 *   - fokus keyboard terkunci di dalam penampil selama terbuka
 *
 * Gambar diambil dari `galeri` pada src/data/proyek.js. Bila `sumber` masih
 * kosong, kotak placeholder yang ditampilkan (bukan gambar karangan).
 */

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { teks } from '../../data/teks'
import MediaPlaceholder from './MediaPlaceholder'

export default function Galeri({ daftar = [], zona = 'gelap' }) {
  const [aktif, setAktif] = useState(null) // indeks gambar yang dibuka, null = tertutup
  const panelRef = useRef(null)

  const tutup = useCallback(() => setAktif(null), [])
  const geser = useCallback(
    (arah) => {
      setAktif((kini) => {
        if (kini === null) return kini
        const jumlah = daftar.length
        return (kini + arah + jumlah) % jumlah
      })
    },
    [daftar.length],
  )

  // Keyboard: Esc menutup, panah untuk berpindah.
  useEffect(() => {
    if (aktif === null) return undefined
    const tangani = (e) => {
      if (e.key === 'Escape') tutup()
      if (e.key === 'ArrowLeft') geser(-1)
      if (e.key === 'ArrowRight') geser(1)
    }
    document.addEventListener('keydown', tangani)
    // Kunci gulir halaman selama penampil terbuka
    const sebelumnya = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Pindahkan fokus ke panel supaya keyboard langsung bekerja di dalam
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', tangani)
      document.body.style.overflow = sebelumnya
    }
  }, [aktif, tutup, geser])

  if (daftar.length === 0) return null

  const gambar = aktif !== null ? daftar[aktif] : null

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {daftar.map((item, i) => (
          <li key={item.alt || i}>
            <button
              type="button"
              onClick={() => setAktif(i)}
              className="block w-full overflow-hidden rounded-tombol border border-gelap-border transition-colors duration-200 hover:border-teal-terang"
              aria-label={`${teks.tombol.lihatProyek}: ${item.alt || `gambar ${i + 1}`}`}
            >
              {item.sumber ? (
                <img
                  src={item.sumber}
                  alt={item.alt || ''}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <MediaPlaceholder rasio="16 / 10" label={item.alt || 'Screenshot menyusul'} zona={zona} />
              )}
            </button>
          </li>
        ))}
      </ul>

      {gambar ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gambar.alt || 'Penampil gambar'}
          className="fixed inset-0 z-50 flex flex-col bg-[rgb(4_12_24_/_0.92)] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-label text-white/80">
              {aktif + 1} / {daftar.length}
            </p>
            <button
              type="button"
              onClick={tutup}
              className="flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
              aria-label={teks.tombol.tutup}
            >
              <X size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={panelRef}
            tabIndex={-1}
            className="flex min-h-0 flex-1 items-center justify-center gap-2 outline-none"
          >
            {daftar.length > 1 ? (
              <button
                type="button"
                onClick={() => geser(-1)}
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
                aria-label={teks.tombol.sebelumnya}
              >
                <ChevronLeft size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ) : null}

            {gambar.sumber ? (
              <img
                src={gambar.sumber}
                alt={gambar.alt || ''}
                className="max-h-full max-w-full rounded-tombol object-contain"
              />
            ) : (
              <div className="w-full max-w-3xl">
                <MediaPlaceholder rasio="16 / 10" label={gambar.alt || 'Screenshot menyusul'} zona={zona} />
              </div>
            )}

            {daftar.length > 1 ? (
              <button
                type="button"
                onClick={() => geser(1)}
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
                aria-label={teks.tombol.berikutnya}
              >
                <ChevronRight size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <p className="text-center text-label text-white/70">{gambar.alt}</p>
        </div>
      ) : null}
    </>
  )
}
