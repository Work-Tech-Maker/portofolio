/**
 * MediaPlaceholder.jsx — kotak pengganti ketika gambar belum tersedia.
 *
 * Kenapa ada? Karena foto dan screenshot milik pemilik belum siap. Kotak ini
 * menjaga tata letak tetap rapi (rasio tetap) tanpa memakai gambar karangan
 * (PRD §5.3 & §11).
 *
 * Cara memakai gambar asli: isi `sumber` pada data proyek/foto profil dengan
 * path berkas di public/media/, contoh '/media/laporan-1.webp'. Begitu `sumber`
 * terisi, komponen ini otomatis tidak dipakai.
 */

import { ImageIcon } from 'lucide-react'

export default function MediaPlaceholder({
  rasio = '16 / 10',
  label = 'Gambar menyusul',
  zona = 'terang',
  className = '',
}) {
  const gelap = zona === 'gelap'
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: rasio }}
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-tombol border border-dashed ${
        gelap
          ? 'border-gelap-border bg-gelap-surface text-gelap-ink-3'
          : 'border-terang-border-kuat bg-terang-surface-2 text-terang-ink-3'
      } ${className}`}
    >
      <ImageIcon size={24} strokeWidth={1.75} aria-hidden="true" />
      <span className="px-3 text-center text-micro">{label}</span>
    </div>
  )
}
