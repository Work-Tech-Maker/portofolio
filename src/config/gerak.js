/**
 * gerak.js — konfigurasi animasi (DESIGN.md §7).
 *
 * Semua durasi, easing, dan jarak animasi dikumpulkan di sini supaya tidak ada
 * angka "ajaib" yang tersebar di komponen (PRD §7.3 butir 6).
 *
 * Cara mengubah rasa animasi:
 *   - ingin lebih cepat  -> kecilkan `durasi.normal`
 *   - ingin lebih halus  -> ganti `easing`
 *   - ingin tanpa geser  -> set `jarakReveal: 0`
 */

export const durasi = {
  cepat: 0.18,
  normal: 0.32,
  lambat: 0.5,
  hitungNaik: 1.2, // durasi angka menghitung naik pada bagian "Hasil"
}

// Kurva easing "keluar lembut" — terasa mahal, tidak berlebihan.
export const easing = [0.22, 1, 0.36, 1]

export const jarakReveal = 16 // piksel, geser vertikal saat elemen muncul
export const jedaStagger = 0.08 // jeda antar anak elemen (teks Hero, daftar kartu)
export const ambangLihat = 0.2 // 20% elemen terlihat -> animasi mulai

/**
 * Varian untuk elemen yang muncul saat digulir.
 * `sekali: true` membuat animasi hanya berjalan sekali, bukan setiap lewat.
 */
export const varianReveal = {
  tersembunyi: { opacity: 0, y: jarakReveal },
  muncul: {
    opacity: 1,
    y: 0,
    transition: { duration: durasi.normal, ease: easing },
  },
}

/** Pengaturan viewport untuk framer-motion `whileInView`. */
export const viewportReveal = { once: true, amount: ambangLihat }

/**
 * Varian anak untuk animasi bertahap (stagger).
 * Dipakai pada wadah dengan `variants={varianWadah}`.
 */
export const varianWadah = {
  tersembunyi: {},
  muncul: {
    transition: { staggerChildren: jedaStagger, delayChildren: 0.05 },
  },
}

export const varianAnak = {
  tersembunyi: { opacity: 0, y: jarakReveal },
  muncul: {
    opacity: 1,
    y: 0,
    transition: { duration: durasi.normal, ease: easing },
  },
}
