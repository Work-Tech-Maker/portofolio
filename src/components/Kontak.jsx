/**
 * Kontak.jsx — tautan kontak dan penutup (PRD §4.6).
 *
 * Data diambil dari src/data/kontak.js. Tautan yang kosong OTOMATIS tidak
 * ditampilkan — jadi aman bila Anda belum punya akun LinkedIn, misalnya.
 *
 * Tidak ada formulir: pengunjung diarahkan ke WhatsApp/email (PRD §4.6).
 */

import { Link as IkonTautan, Mail, MessageCircle } from 'lucide-react'

import { adaTautan, kontak, tautanWhatsApp } from '../data/kontak'
import { teks } from '../data/teks'
import Bagian from './ui/Bagian'
import Reveal from './ui/Reveal'
import Tombol from './ui/Tombol'

export default function Kontak() {
  const wa = tautanWhatsApp('Halo, saya ingin berdiskusi soal pekerjaan akuntansi/pajak atau IT.')
  const surel = kontak.email ? `mailto:${kontak.email}` : ''
  const linkedin = adaTautan(kontak.linkedin) ? kontak.linkedin : ''

  return (
    <Bagian id="kontak" zona="terang" judul={teks.bagian.kontak} sub={teks.bagian.kontakSub}>
      <Reveal>
        <div className="rounded-kartu border border-terang-border bg-terang-surface p-6 shadow-kartu md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <p className="text-body-lg text-terang-ink-2">
                Cara tercepat menghubungi saya adalah lewat WhatsApp. Ceritakan sedikit
                pekerjaannya, saya balas dengan langkah berikutnya.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {wa ? (
                <Tombol href={wa} variant="utama" ukuran="lg" denganIkonWa>
                  {kontak.labelWhatsapp}
                </Tombol>
              ) : null}

              {surel ? (
                <Tombol href={surel} variant="sekunder" ukuran="lg" ikon={Mail}>
                  {kontak.labelEmail}
                </Tombol>
              ) : null}

              {linkedin ? (
                <Tombol href={linkedin} variant="sekunder" ukuran="lg" ikon={IkonTautan}>
                  {kontak.labelLinkedin}
                </Tombol>
              ) : null}
            </div>
          </div>

          {/* Rincian kontak sebagai teks yang bisa disalin */}
          <dl className="mt-8 grid gap-3 border-t border-terang-border pt-6 sm:grid-cols-3">
            {wa ? (
              <div>
                <dt className="text-micro text-terang-ink-3">WhatsApp</dt>
                <dd className="text-body font-semibold text-terang-ink">
                  {kontak.whatsapp ? `+${kontak.whatsapp}` : '—'}
                </dd>
              </div>
            ) : null}
            {kontak.email ? (
              <div>
                <dt className="text-micro text-terang-ink-3">Email</dt>
                <dd className="break-all text-body font-semibold text-terang-ink">{kontak.email}</dd>
              </div>
            ) : null}
            {linkedin ? (
              <div>
                <dt className="text-micro text-terang-ink-3">LinkedIn</dt>
                <dd className="break-all text-body font-semibold text-terang-ink">
                  {linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </dd>
              </div>
            ) : null}
          </dl>

          {!wa && !surel && !linkedin ? (
            <p className="mt-6 flex items-center gap-2 text-label text-terang-ink-3">
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
              Tautan kontak belum diisi.
            </p>
          ) : null}
        </div>
      </Reveal>
    </Bagian>
  )
}
