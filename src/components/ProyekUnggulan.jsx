/**
 * ProyekUnggulan.jsx — studi kasus proyek utama (PRD §4.3).
 *
 * Susunan wajib: Masalah → Solusi → Fitur unggulan → Hasil, ditambah video
 * rekaman layar dan galeri screenshot.
 *
 * Data diambil dari src/data/proyek.js (objek `proyekUnggulan`).
 * Bagian "Hasil" hanya tampil bila ada angkanya — tidak pernah dikarang (PRD §11).
 */

import { ArrowRight, CircleCheck } from 'lucide-react'

import { MODE_DUMMY, teks } from '../data/teks'
import { proyekUnggulan } from '../data/proyek'
import Bagian from './ui/Bagian'
import Galeri from './ui/Galeri'
import Kartu from './ui/Kartu'
import LabelBidang from './ui/LabelBidang'
import Reveal from './ui/Reveal'
import VideoEmbed from './ui/VideoEmbed'

/** Satu blok narasi studi kasus: label kecil + paragraf. */
function Blok({ label, children, aksen = false }) {
  return (
    <div>
      <p className="mb-1.5 text-micro font-semibold uppercase tracking-wider text-gelap-ink-3">
        {label}
      </p>
      <p className={`text-body ${aksen ? 'text-gelap-ink' : 'text-gelap-ink-2'}`}>{children}</p>
    </div>
  )
}

export default function ProyekUnggulan() {
  const p = proyekUnggulan
  // Angka hasil: pakai data asli bila ada; saat masih mode contoh, tampilkan versi dummy.
  const hasil = p.hasil || (MODE_DUMMY ? p.hasilDummy : null)

  return (
    <Bagian
      id="proyek"
      zona="gelap"
      judul={teks.bagian.proyekUnggulan}
      sub={teks.bagian.proyekUnggulanSub}
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ---------- Kolom kiri: narasi ---------- */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <LabelBidang anak={p.bidang} zona="gelap" />
            {p.teknologi?.length ? (
              <span className="text-micro text-gelap-ink-2">{p.teknologi.join(' · ')}</span>
            ) : null}
          </div>

          <h3 className="mt-4 font-judul text-[26px] font-extrabold leading-9 text-gelap-ink md:text-[30px] md:leading-[38px]">
            {p.judul}
          </h3>
          <p className="mt-3 text-body-lg text-gelap-ink-2">{p.ringkas}</p>

          <div className="mt-7 flex flex-col gap-6">
            <Blok label={teks.studiKasus.masalah}>{p.masalah}</Blok>

            <Blok label={teks.studiKasus.solusi}>
              <span className="flex items-start gap-2">
                <ArrowRight
                  size={18}
                  strokeWidth={1.75}
                  className="mt-1 shrink-0 text-teal-terang"
                  aria-hidden="true"
                />
                <span>{p.solusi}</span>
              </span>
            </Blok>

            <div>
              <p className="mb-2 text-micro font-semibold uppercase tracking-wider text-gelap-ink-3">
                {teks.studiKasus.fitur}
              </p>
              <ul className="grid gap-2 lg:grid-cols-2 lg:gap-x-6">
                {p.fitur.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-body text-gelap-ink-2">
                    <CircleCheck
                      size={16}
                      strokeWidth={2}
                      className="mt-1.5 shrink-0 text-teal-terang"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hasil: hanya bila ada (angka asli atau contoh saat MODE_DUMMY) */}
            {hasil ? (
              <Kartu zona="gelap" hover={false} className="border-l-2 border-l-emas-terang">
                <p className="mb-1 text-micro font-semibold uppercase tracking-wider text-emas-terang">
                  {teks.studiKasus.hasil}
                </p>
                <p className="text-body-lg text-gelap-ink">{hasil}</p>
              </Kartu>
            ) : null}
          </div>
        </Reveal>

        {/* ---------- Kolom kanan: video + galeri ---------- */}
        <Reveal delay={0.08}>
          <VideoEmbed video={p.video} />

          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h4 className="font-judul text-[17px] font-bold text-gelap-ink">Tangkapan layar</h4>
              <span className="text-micro text-gelap-ink-2">{teks.catatan.galeri}</span>
            </div>
            <Galeri daftar={p.galeri} zona="gelap" />
          </div>
        </Reveal>
      </div>
    </Bagian>
  )
}
