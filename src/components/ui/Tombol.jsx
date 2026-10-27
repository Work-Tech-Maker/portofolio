/**
 * Tombol.jsx — tombol dengan beberapa varian (DESIGN.md §6).
 *
 * Varian: utama | sekunder | whatsapp | teks
 * Ukuran: md (44–48 px) | lg (52 px, untuk aksi utama di layar kecil)
 *
 * Bila `href` diisi, komponen menjadi tautan <a>. Bila tidak, menjadi <button>.
 * Target sentuh selalu minimal 44 px (PRD §9, aksesibilitas).
 */

import { MessageCircle } from 'lucide-react'

const GAYA = {
  utama:
    'bg-teal text-white hover:bg-teal-tua active:bg-teal-tua border border-transparent',
  utamaGelap:
    'bg-teal-terang text-[#04201F] hover:bg-[#0fa396] border border-transparent',
  sekunder:
    'bg-transparent text-terang-ink border border-terang-border-kuat hover:border-teal hover:text-teal',
  sekunderGelap:
    'bg-transparent text-gelap-ink border border-gelap-border hover:border-teal-terang hover:text-teal-terang',
  whatsapp: 'bg-teal text-white hover:bg-teal-tua border border-transparent',
  teks: 'bg-transparent text-teal hover:text-teal-tua underline-offset-4 hover:underline border border-transparent',
}

export default function Tombol({
  variant = 'utama',
  ukuran = 'md',
  href,
  ikon: Ikon,
  denganIkonWa = false,
  className = '',
  children,
  ...sisa
}) {
  const tinggi = ukuran === 'lg' ? 'h-[52px] px-6 text-[16px]' : 'h-12 px-5 text-label'
  const kelas = `inline-flex items-center justify-center gap-2 rounded-tombol font-semibold transition-colors duration-200 ${tinggi} ${GAYA[variant] || GAYA.utama} ${className}`

  const isi = (
    <>
      {denganIkonWa ? <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" /> : null}
      {Ikon && !denganIkonWa ? <Ikon size={18} strokeWidth={1.75} aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  )

  if (href) {
    const luar = href.startsWith('http')
    return (
      <a
        href={href}
        className={kelas}
        {...(luar ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...sisa}
      >
        {isi}
      </a>
    )
  }

  return (
    <button type="button" className={kelas} {...sisa}>
      {isi}
    </button>
  )
}
