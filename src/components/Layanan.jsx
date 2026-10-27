/**
 * Layanan.jsx — tiga kartu layanan (PRD §4.2).
 *
 * Data diambil dari src/data/layanan.js. Untuk mengubah isi kartu, edit berkas
 * itu — komponen ini tidak perlu disentuh.
 *
 * Setiap kartu punya tombol WhatsApp dengan pesan awal yang sudah terisi sesuai
 * jasanya (`pesanWa` di data).
 */

import { Check } from 'lucide-react'

import { layanan } from '../data/layanan'
import { tautanWhatsApp } from '../data/kontak'
import { teks } from '../data/teks'
import Bagian from './ui/Bagian'
import Kartu from './ui/Kartu'
import Reveal from './ui/Reveal'
import Tombol from './ui/Tombol'

export default function Layanan() {
  return (
    <Bagian
      id="layanan"
      zona="terang"
      judul={teks.bagian.layanan}
      sub={teks.bagian.layananSub}
      rapatAtas
    >
      <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
        {layanan.map((item, i) => {
          const Ikon = item.ikon
          return (
            <Reveal as="li" key={item.id} delay={i * 0.06} className="h-full">
              <Kartu className="flex h-full flex-col">
                {/* Ikon layanan */}
                <span
                  aria-hidden="true"
                  className="mb-5 flex size-12 items-center justify-center rounded-tombol bg-teal-lembut text-teal"
                >
                  <Ikon size={24} strokeWidth={1.75} />
                </span>

                <h3 className="text-h3 text-terang-ink">{item.judul}</h3>
                <p className="mt-2 text-body text-terang-ink-2">{item.ringkas}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {item.poin.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-body text-terang-ink-2">
                      <Check
                        size={16}
                        strokeWidth={2.25}
                        className="mt-1.5 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol WhatsApp: pesan awal sudah terisi */}
                <div className="mt-6 pt-1">
                  <Tombol
                    href={tautanWhatsApp(item.pesanWa)}
                    variant="whatsapp"
                    denganIkonWa
                    className="w-full"
                  >
                    {teks.tombol.konsultasi}
                  </Tombol>
                </div>
              </Kartu>
            </Reveal>
          )
        })}
      </ul>
    </Bagian>
  )
}
