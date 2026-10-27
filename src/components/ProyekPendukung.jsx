/**
 * ProyekPendukung.jsx — tiga kartu proyek kecil (PRD §4.4).
 *
 * Data diambil dari src/data/proyek.js (array `proyekPendukung`).
 * CARA MENAMBAH PROYEK: salin satu blok di berkas data itu, lalu isi.
 * Kartu bertambah otomatis, tata letak menyesuaikan.
 *
 * Kartu yang `demoDiHalaman: true` mengarah ke Kalkulator PPN di bawahnya.
 */

import { ArrowDownRight } from 'lucide-react'

import { proyekPendukung } from '../data/proyek'
import { teks } from '../data/teks'
import Bagian from './ui/Bagian'
import Kartu from './ui/Kartu'
import LabelBidang from './ui/LabelBidang'
import MediaPlaceholder from './ui/MediaPlaceholder'
import Reveal from './ui/Reveal'

export default function ProyekPendukung() {
  return (
    <Bagian
      id="proyek-pendukung"
      zona="gelap"
      judul={teks.bagian.proyekPendukung}
      sub={teks.bagian.proyekPendukungSub}
      className="pt-0 md:pt-0"
    >
      <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
        {proyekPendukung.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.06} className="h-full">
            <Kartu zona="gelap" className="flex h-full flex-col">
              {/* Media: gambar bila ada, selain itu placeholder rapi */}
              <div className="mb-5">
                {p.media?.tipe === 'gambar' && p.media.sumber ? (
                  <img
                    src={p.media.sumber}
                    alt={p.media.alt || ''}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-tombol border border-gelap-border object-cover"
                  />
                ) : (
                  <MediaPlaceholder
                    rasio="16 / 10"
                    label={p.media?.tipe === 'demo' ? 'Demo ada di bawah' : 'Tangkapan layar menyusul'}
                    zona="gelap"
                  />
                )}
              </div>

              <LabelBidang anak={p.bidang} zona="gelap" />

              <h3 className="mt-3 font-judul text-[19px] font-bold leading-7 text-gelap-ink">
                {p.judul}
              </h3>
              <p className="mt-2 flex-1 text-body text-gelap-ink-2">{p.ringkas}</p>

              {p.teknologi?.length ? (
                <p className="mt-4 text-micro text-gelap-ink-3">{p.teknologi.join(' · ')}</p>
              ) : null}

              {p.demoDiHalaman ? (
                <a
                  href="#kalkulator"
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-label font-semibold text-teal-terang hover:underline"
                >
                  {teks.tombol.cobaKalkulator}
                  <ArrowDownRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              ) : null}
            </Kartu>
          </Reveal>
        ))}
      </ul>
    </Bagian>
  )
}
