/**
 * Kartu.jsx — wadah isi dengan dua nuansa: terang dan gelap.
 *
 * Zona terang memakai bayangan tipis; zona gelap membentuk kedalaman dari warna
 * permukaan + garis tepi, tanpa bayangan (DESIGN.md §5).
 *
 * Efek hover: naik 2 px. Otomatis mati bila pengunjung memilih kurangi animasi.
 */

import { useReducedMotion } from 'framer-motion'

export default function Kartu({
  zona = 'terang',
  hover = true,
  className = '',
  children,
  ...sisa
}) {
  const kurangiGerak = useReducedMotion()
  const gelap = zona === 'gelap'

  const dasar = gelap
    ? 'bg-gelap-surface border border-gelap-border'
    : 'bg-terang-surface border border-terang-border shadow-kartu'

  const efekHover =
    hover && !kurangiGerak
      ? gelap
        ? 'transition-colors duration-200 hover:border-teal-terang'
        : 'transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-kartu-hover'
      : ''

  return (
    <div className={`rounded-kartu p-6 md:p-7 ${dasar} ${efekHover} ${className}`} {...sisa}>
      {children}
    </div>
  )
}
