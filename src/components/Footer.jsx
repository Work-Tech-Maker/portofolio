/**
 * Footer.jsx — penutup halaman (PRD §4.6).
 *
 * Isi: hak cipta dengan tahun otomatis, tautan kontak singkat, dan tombol
 * "kembali ke atas". Footer selalu bernuansa gelap apa pun zona di atasnya
 * (DESIGN.md §2).
 */

import { ArrowUp } from 'lucide-react'

import { adaTautan, kontak, tautanWhatsApp } from '../data/kontak'
import { profil } from '../data/profil'
import { teks } from '../data/teks'

// Dihitung sekali saat modul dimuat, bukan di dalam render (React "purity").
const TAHUN = new Date().getFullYear()

export default function Footer() {
  const wa = tautanWhatsApp()

  return (
    <footer data-zona="gelap" className="bg-gelap-bg text-gelap-ink-2">
      <div className="mx-auto w-full max-w-isi px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 border-t border-gelap-border pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-judul text-[15px] font-bold text-gelap-ink">
              {profil.nama} · {profil.posisi}
            </p>
            <p className="mt-1 text-micro text-gelap-ink-3">
              © {TAHUN} {teks.footer.hakCipta} {teks.footer.dibuatDengan}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {wa ? (
              <a
                href={wa}
                className="inline-flex min-h-11 items-center text-label text-gelap-ink-2 hover:text-teal-terang"
                target="_blank"
                rel="noopener noreferrer"
              >
                {kontak.labelWhatsapp}
              </a>
            ) : null}
            {kontak.email ? (
              <a
                href={`mailto:${kontak.email}`}
                className="inline-flex min-h-11 items-center text-label text-gelap-ink-2 hover:text-teal-terang"
              >
                {kontak.labelEmail}
              </a>
            ) : null}
            {adaTautan(kontak.linkedin) ? (
              <a
                href={kontak.linkedin}
                className="inline-flex min-h-11 items-center text-label text-gelap-ink-2 hover:text-teal-terang"
                target="_blank"
                rel="noopener noreferrer"
              >
                {kontak.labelLinkedin}
              </a>
            ) : null}

            <a
              href="#atas"
              aria-label={teks.nav.keAtas}
              className="flex size-11 items-center justify-center rounded-full border border-gelap-border text-gelap-ink-2 transition-colors duration-200 hover:border-teal-terang hover:text-teal-terang"
            >
              <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
