/**
 * Tentang.jsx — tentang saya, timeline pengalaman, pendidikan, sertifikasi,
 * dan keahlian (PRD §4.5).
 *
 * Data diambil dari src/data/profil.js (paragraf) dan src/data/pengalaman.js
 * (timeline, pendidikan, sertifikasi, keahlian).
 *
 * Aturan privasi: nama perusahaan tidak ditulis; gunakan bentuk umum seperti
 * "Perusahaan Manufaktur" (PRD §10).
 *
 * Bagian sertifikasi otomatis disembunyikan bila datanya kosong.
 */

import { GraduationCap, Sparkles } from 'lucide-react'

import { profil } from '../data/profil'
import { keahlian, pendidikan, pengalaman, sertifikasi } from '../data/pengalaman'
import { teks } from '../data/teks'
import Bagian from './ui/Bagian'
import Kartu from './ui/Kartu'
import Reveal from './ui/Reveal'

export default function Tentang() {
  return (
    <Bagian
      id="tentang"
      zona="terang"
      judul={teks.bagian.tentang}
      sub={teks.bagian.tentangSub}
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* ---------- Kiri: paragraf + keahlian ---------- */}
        <div>
          <Reveal>
            <div className="flex flex-col gap-4">
              {profil.tentang.map((paragraf) => (
                <p key={paragraf.slice(0, 24)} className="text-body-lg text-terang-ink-2">
                  {paragraf}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {keahlian.map((kelompok) => (
                <Kartu key={kelompok.id} hover={false} className="p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-judul text-[15px] font-bold text-terang-ink">
                    <Sparkles
                      size={16}
                      strokeWidth={2}
                      className="text-emas-tua"
                      aria-hidden="true"
                    />
                    {kelompok.kelompok}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {kelompok.butir.map((b) => (
                      <li
                        key={b}
                        className="rounded-full bg-terang-surface-2 px-2.5 py-1 text-micro text-terang-ink-2"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </Kartu>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------- Kanan: timeline + pendidikan ---------- */}
        <div>
          <Reveal delay={0.04}>
            <h3 className="mb-5 font-judul text-[17px] font-bold uppercase tracking-wide text-terang-ink-3">
              Pengalaman
            </h3>

            <ol className="relative border-l-2 border-terang-border pl-6">
              {pengalaman.map((item, i) => (
                <li key={item.id} className={i === pengalaman.length - 1 ? '' : 'pb-8'}>
                  {/* Titik penanda timeline */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] mt-1.5 size-3 rounded-full border-4 border-terang-bg bg-teal"
                  />
                  <h4 className="font-judul text-[18px] font-bold leading-7 text-terang-ink">
                    {item.peran}
                  </h4>
                  <p className="text-label text-terang-ink-2">
                    {item.tempat} · <span className="text-terang-ink-3">{item.periode}</span>
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {item.poin.map((p) => (
                      <li key={p} className="flex gap-2 text-body text-terang-ink-2">
                        <span aria-hidden="true" className="text-terang-ink-3">
                          –
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Pendidikan */}
          <Reveal delay={0.08}>
            <h3 className="mb-4 mt-9 font-judul text-[17px] font-bold uppercase tracking-wide text-terang-ink-3">
              Pendidikan
            </h3>
            <ul className="flex flex-col gap-3">
              {pendidikan.map((p) => (
                <li key={p.id} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-chip bg-terang-surface-2 text-terang-ink-2"
                  >
                    <GraduationCap size={17} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-body font-semibold text-terang-ink">{p.jenjang}</p>
                    <p className="text-label text-terang-ink-2">
                      {p.institusi}
                      {p.keterangan ? ` · ${p.keterangan}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sertifikasi: hanya tampil bila ada isinya (PRD §4.5) */}
          {sertifikasi.length > 0 ? (
            <Reveal delay={0.1}>
              <h3 className="mb-4 mt-9 font-judul text-[17px] font-bold uppercase tracking-wide text-terang-ink-3">
                Sertifikasi & Pelatihan
              </h3>
              <ul className="flex flex-col gap-2">
                {sertifikasi.map((s) => (
                  <li key={s.id} className="text-body text-terang-ink-2">
                    <span className="font-semibold text-terang-ink">{s.nama}</span>
                    {s.penerbit ? ` · ${s.penerbit}` : ''}
                    {s.tahun ? ` · ${s.tahun}` : ''}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Bagian>
  )
}
