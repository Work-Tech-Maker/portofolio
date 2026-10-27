/**
 * KalkulatorPPN.jsx — demo interaktif Kalkulator PPN (PRD §4.4.1).
 *
 * STATUS: TAHAP 1 — baru kerangka tampilan. Perhitungan BELUM aktif.
 *
 * Kenapa belum? PRD §4.4.1 mewajibkan logika perhitungan disalin dari kalkulator
 * milik pemilik yang sudah ada, bukan dibuat dari ingatan — karena aturan PPN
 * (tarif 12% dengan DPP Nilai Lain, perlakuan barang mewah) bisa berubah.
 * Jadi rumusnya sengaja dikosongkan sampai berkas aslinya tersedia.
 *
 * Yang perlu dikerjakan di Tahap 3: isi fungsi `hitung()` di bawah dengan logika
 * dari kalkulator asli, lalu uji beberapa contoh angka terhadap hasil aslinya.
 *
 * Semua perhitungan nantinya berjalan di browser; tidak ada data yang dikirim
 * ke server (PRD §10).
 */

import { Calculator, Info } from 'lucide-react'

import { teks } from '../data/teks'
import Bagian from './ui/Bagian'
import Kartu from './ui/Kartu'
import Reveal from './ui/Reveal'

/** Kotak hasil: label kecil + angka besar (angka rata kolom). */
function Hasil({ label, nilai, utama = false }) {
  return (
    <div
      className={`rounded-tombol border-l-2 px-4 py-3 ${
        utama ? 'border-l-teal-terang bg-gelap-bg' : 'border-l-gelap-border bg-gelap-bg'
      }`}
    >
      <p className="text-micro text-gelap-ink-3">{label}</p>
      <p
        className={`tnum font-judul font-extrabold ${
          utama ? 'text-[26px] leading-8 text-gelap-ink' : 'text-[20px] leading-7 text-gelap-ink-2'
        }`}
      >
        {nilai}
      </p>
    </div>
  )
}

export default function KalkulatorPPN() {
  return (
    <Bagian id="kalkulator" zona="gelap" judul={teks.kalkulator.judul} sub={teks.kalkulator.sub}>
      <Reveal>
        <Kartu zona="gelap" hover={false} className="mx-auto max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emas-terang/50 px-3 py-1 text-micro font-semibold text-emas-terang">
            {teks.catatan.segera}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* ---------- Isian ---------- */}
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="harga"
                  className="mb-1.5 block text-label font-semibold text-gelap-ink-2"
                >
                  {teks.kalkulator.labelHarga}
                </label>
                <input
                  id="harga"
                  type="text"
                  inputMode="numeric"
                  placeholder={teks.kalkulator.placeholder}
                  disabled
                  className="tnum h-12 w-full rounded-tombol border border-gelap-border bg-gelap-bg px-4 text-[17px] text-gelap-ink placeholder:text-gelap-ink-3 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <label className="flex items-center gap-3 text-body text-gelap-ink-2">
                <input
                  type="checkbox"
                  disabled
                  className="size-5 rounded border-gelap-border bg-gelap-bg accent-[#14b8a6] disabled:opacity-60"
                />
                {teks.kalkulator.labelMewah}
              </label>

              <p className="flex items-start gap-2 rounded-tombol border border-gelap-border bg-gelap-bg px-4 py-3 text-micro text-gelap-ink-3">
                <Info size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
                {teks.catatan.sedangDikembangkan}
              </p>
            </div>

            {/* ---------- Hasil ---------- */}
            <div className="flex flex-col gap-2">
              <Hasil label={teks.kalkulator.dpp} nilai="—" />
              <Hasil label={teks.kalkulator.dppNilaiLain} nilai="—" />
              <Hasil label={teks.kalkulator.ppn} nilai="—" />
              <Hasil label={teks.kalkulator.total} nilai="—" utama />
            </div>
          </div>

          <p className="mt-6 flex items-start gap-2 border-t border-gelap-border pt-4 text-micro text-gelap-ink-3">
            <Calculator size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
            {teks.kalkulator.catatan}
          </p>
        </Kartu>
      </Reveal>
    </Bagian>
  )
}
