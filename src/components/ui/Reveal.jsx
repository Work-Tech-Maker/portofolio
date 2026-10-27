/**
 * Reveal.jsx — animasi "muncul saat digulir" (scroll reveal).
 *
 * Dipakai membungkus kartu atau item agar muncul halus ketika masuk layar
 * (PRD §5.2). Animasi hanya berjalan SEKALI, tidak berulang tiap lewat.
 *
 * Pengunjung yang mengaktifkan "kurangi animasi" di sistemnya akan melihat
 * konten langsung tanpa gerakan — ini wajib (PRD §5.2).
 */

import { motion, useReducedMotion } from 'framer-motion'

import { varianReveal, viewportReveal } from '../../config/gerak'

export default function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const kurangiGerak = useReducedMotion()
  const Komponen = motion[as] || motion.div

  // Tanpa animasi: langsung tampil, tanpa geser.
  if (kurangiGerak) {
    const Statis = as
    return <Statis className={className}>{children}</Statis>
  }

  return (
    <Komponen
      className={className}
      variants={varianReveal}
      initial="tersembunyi"
      whileInView="muncul"
      viewport={viewportReveal}
      transition={{ delay }}
    >
      {children}
    </Komponen>
  )
}
