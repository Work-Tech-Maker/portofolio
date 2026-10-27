/**
 * kontak.js — tautan kontak (PRD §4.6).
 *
 * Yang AMAN diubah: semua nilai di bawah.
 * Tautan yang dikosongkan ('') otomatis TIDAK ditampilkan di situs.
 *
 * Nomor WhatsApp harus format internasional tanpa tanda + dan tanpa spasi,
 * contoh: 6281234567890
 */

import { MODE_DUMMY } from './teks.js'

export const kontak = {
  // DUMMY: nomor contoh. Ganti dengan nomor asli.
  whatsapp: MODE_DUMMY ? '6281234567890' : '',

  // DUMMY: email contoh.
  email: MODE_DUMMY ? 'nama@contoh.com' : '',

  // DUMMY: tautan profil contoh.
  linkedin: MODE_DUMMY ? 'https://www.linkedin.com/in/contoh' : '',

  // Teks yang tampil di samping tautan (boleh dikosongkan)
  labelWhatsapp: 'WhatsApp',
  labelEmail: 'Email',
  labelLinkedin: 'LinkedIn',
}

/**
 * Membuat tautan WhatsApp lengkap dengan pesan awal terisi (PRD §4.2).
 * @param {string} pesan - pesan pembuka, otomatis di-encode
 */
export function tautanWhatsApp(pesan = '') {
  if (!kontak.whatsapp) return ''
  const dasar = `https://wa.me/${kontak.whatsapp}`
  return pesan ? `${dasar}?text=${encodeURIComponent(pesan)}` : dasar
}

/** True bila nilainya layak ditampilkan (bukan kosong & bukan penanda [ISI: …]). */
export function adaTautan(nilai) {
  if (!nilai || typeof nilai !== 'string') return false
  return !nilai.trim().startsWith('[ISI')
}
