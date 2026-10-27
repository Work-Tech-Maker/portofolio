/**
 * LabelBidang.jsx — pil kecil penanda bidang proyek: Pajak / Akuntansi /
 * Otomasi / IT (DESIGN.md §6).
 *
 * Warna diambil dari satu daftar tetap, bukan acak, supaya konsisten:
 *   Pajak     -> emas
 *   Akuntansi -> teal
 *   Otomasi   -> biru
 *   IT        -> abu-biru
 */

const WARNA = {
  Pajak: {
    terang: 'bg-[#FBF3E3] text-emas-tua',
    gelap: 'bg-[#3A2A12] text-emas-terang',
  },
  Akuntansi: {
    terang: 'bg-teal-lembut text-teal',
    gelap: 'bg-[#12395F] text-teal-terang',
  },
  Otomasi: {
    terang: 'bg-[#E8F0FB] text-[#1D4E89]',
    gelap: 'bg-[#12395F] text-[#8FC2F5]',
  },
  IT: {
    terang: 'bg-terang-surface-2 text-terang-ink-2',
    gelap: 'bg-gelap-surface text-gelap-ink-2',
  },
}

export default function LabelBidang({ anak = [], zona = 'terang' }) {
  const daftar = Array.isArray(anak) ? anak : [anak]
  if (daftar.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {daftar.map((bidang) => {
        const warna = WARNA[bidang] || WARNA.IT
        return (
          <li
            key={bidang}
            className={`rounded-full px-2.5 py-1 text-micro font-semibold ${
              zona === 'gelap' ? warna.gelap : warna.terang
            }`}
          >
            {bidang}
          </li>
        )
      })}
    </ul>
  )
}
