/**
 * Hero.jsx — bagian pembuka: foto, nama, posisi, kalimat nilai jual, dua tombol.
 *
 * Data diambil dari src/data/profil.js dan src/data/teks.js.
 * Untuk mengubah teks, edit berkas data tersebut — bukan berkas ini.
 *
 * Animasi (PRD §5.2): teks muncul bertahap, foto menyusul. Bila pengunjung
 * memilih "kurangi animasi", semua tampil langsung tanpa gerakan.
 *
 * PENTING soal performa: elemen pertama (judul) TIDAK dibuat transparan
 * menunggu JavaScript, supaya halaman tetap terlihat cepat (LCP).
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'

import { varianAnak, varianWadah } from '../config/gerak'
import { profil } from '../data/profil'
import { MODE_DUMMY, teks } from '../data/teks'
import { adaTautan, tautanWhatsApp } from '../data/kontak'
import Tombol from './ui/Tombol'

/** Inisial nama untuk placeholder foto, mis. "Indra Gunawan" -> "IG". */
function inisial(nama) {
  return nama
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0])
    .join('')
    .toUpperCase()
}

export default function Hero() {
  const kurangiGerak = useReducedMotion()

  const gerakTeks = kurangiGerak
    ? {}
    : { variants: varianWadah, initial: 'tersembunyi', animate: 'muncul' }

  return (
    <section
      id="atas"
      data-zona="terang"
      aria-labelledby="hero-judul"
      className="bg-terang-bg pt-24 md:pt-32"
    >
      <div className="mx-auto grid w-full max-w-isi items-center gap-10 px-5 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:px-8 md:pb-24">
        {/* ---------- Teks ---------- */}
        <motion.div {...gerakTeks}>
          <motion.p
            variants={varianAnak}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-lembut px-3 py-1 text-micro font-semibold text-teal"
          >
            <span className="size-1.5 rounded-full bg-teal" aria-hidden="true" />
            {profil.posisi}
          </motion.p>

          <motion.h1
            id="hero-judul"
            variants={varianAnak}
            className="text-display md:text-[56px] md:leading-[60px]"
          >
            {profil.nama}
          </motion.h1>

          <motion.p
            variants={varianAnak}
            className="mt-5 max-w-xl text-body-lg text-terang-ink-2 md:text-[19px] md:leading-[31px]"
          >
            {profil.nilaiJual}
          </motion.p>

          <motion.div variants={varianAnak} className="mt-8 flex flex-wrap gap-3">
            {adaTautan(profil.cv) ? (
              <Tombol href={profil.cv} variant="utama" ukuran="lg" ikon={Download} download>
                {teks.nav.unduhCv}
              </Tombol>
            ) : null}

            <Tombol
              href={tautanWhatsApp(
                'Halo, saya melihat portofolio Anda dan ingin berdiskusi.',
              )}
              variant="sekunder"
              ukuran="lg"
              denganIkonWa
            >
              {teks.tombol.hubungi}
            </Tombol>
          </motion.div>

          {/* Catatan bantu: HANYA saat mode contoh, tidak tampil di situs publik */}
          {MODE_DUMMY && !adaTautan(profil.cv) ? (
            <motion.p variants={varianAnak} className="mt-4 text-micro text-terang-ink-3">
              Tombol “Unduh CV” akan muncul setelah berkas PDF ditambahkan.
            </motion.p>
          ) : null}
        </motion.div>

        {/* ---------- Foto ---------- */}
        <motion.div
          initial={kurangiGerak ? false : { opacity: 0, y: 16 }}
          animate={kurangiGerak ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] md:justify-self-end"
        >
          {/* Bingkai foto: rasio 4:5 */}
          <div className="relative overflow-hidden rounded-media border border-terang-border bg-terang-surface-2">
            {profil.foto ? (
              <img
                src={profil.foto}
                alt={profil.fotoAlt}
                width="640"
                height="800"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label="Foto profil menyusul"
                className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-terang-surface-2"
              >
                <span
                  aria-hidden="true"
                  className="font-judul text-[56px] font-extrabold text-terang-ink-3"
                >
                  {inisial(profil.nama)}
                </span>
                <span className="px-6 text-center text-micro text-terang-ink-3">
                  {MODE_DUMMY ? 'Foto profil menyusul' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Aksen garis emas di sudut, penanda identitas visual */}
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 -z-10 hidden h-24 w-24 rounded-media border-2 border-emas/40 md:block"
          />
        </motion.div>
      </div>
    </section>
  )
}
