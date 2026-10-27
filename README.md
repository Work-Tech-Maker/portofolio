# Portofolio — Tax Accounting & IT Support

Website portofolio **satu halaman** berbahasa Indonesia untuk dua bidang sekaligus:
**Akuntansi & Pajak** dan **IT Support**. Nilai jual utamanya: paham logika pajak dan
akuntansi, sekaligus mampu membangun sendiri alat otomasinya.

- **Alamat publik:** `indragunawan.luckywater.web.id` (subdomain Hostinger)
- **Sifat situs:** statis — tanpa backend, tanpa database, tanpa login
- **Sumber kebenaran kebutuhan:** [`PRD.md`](./PRD.md)

## Status

Tahap: **kerangka selesai (Tahap 1)** — seluruh halaman bisa dibuka di
`npm run dev`, isi masih **contoh (dummy)** sampai data asli disiapkan.
Rincian dan hasil uji ada di [`PROGRESS.md`](./PROGRESS.md).

## Menjalankan di komputer

```bash
npm install
npm run dev      # buka alamat yang muncul di terminal
```

Perintah lain yang sering dipakai:

```bash
npm run build    # membuat berkas siap unggah di folder dist/
npm run preview  # melihat hasil build
npm run lint     # memeriksa kesalahan penulisan kode
```

## Di mana saya mengubah isi situs?

Hampir semua isi ada di `src/data/` — bukan di dalam kode tampilan:

| Berkas | Isinya |
|---|---|
| `src/data/profil.js` | nama, posisi, kalimat nilai jual, paragraf Tentang Saya, foto, CV |
| `src/data/kontak.js` | nomor WhatsApp, email, LinkedIn |
| `src/data/layanan.js` | tiga kartu layanan + pesan WhatsApp tiap layanan |
| `src/data/proyek.js` | proyek unggulan (masalah/solusi/fitur/hasil) + proyek pendukung |
| `src/data/pengalaman.js` | pengalaman kerja, pendidikan, sertifikasi, keahlian |
| `src/data/teks.js` | label tombol dan judul bagian, serta penanda `MODE_DUMMY` |

Foto, CV, dan video diletakkan di `public/media/`, lalu path-nya ditulis di
berkas data (contoh: `'/media/foto-profil.webp'`). Selama berkasnya belum ada,
situs menampilkan kotak penanda yang rapi — tata letak tidak rusak.

> **Penting sebelum publikasi:** ubah `MODE_DUMMY` di `src/data/teks.js` menjadi
> `false` supaya tautan dan angka contoh tidak tampil (PRD §10 dan §11).

## Memeriksa tampilan

```bash
npm run dev -- --host 127.0.0.1 --port 5175     # terminal 1
node scripts/dev/audit_ui.mjs http://127.0.0.1:5175/   # terminal 2
```

Pemeriksa itu menguji HP (390 px), tablet (834 px), dan desktop (1440 px):
gulir mendatar, jumlah `<h1>`, `alt` gambar, nama tombol, target sentuh ≥ 44 px,
kelengkapan meta SEO, dan memastikan semua bagian tampil penuh.

## Stack

| Lapisan | Pilihan |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Navigasi | anchor/scroll (tanpa React Router) |
| Animasi | CSS murni atau `framer-motion` (diputuskan di DESIGN.md) |
| Deploy | Hostinger share hosting — unggah isi `dist/` |

## Struktur yang akan dibangun (PRD §7.2)

```
src/
  components/   Navbar, Hero, Layanan, ProyekUnggulan, ProyekPendukung,
                KalkulatorPPN, Tentang, Kontak, ui/
  data/         profil.js, layanan.js, proyek.js, pengalaman.js, kontak.js, teks.js
  App.jsx, main.jsx, index.css
public/
  media/        foto, screenshot, video, CV (PDF)
```

## Keputusan desain (PRD §14)

Dijelaskan lengkap di [`DESIGN.md`](./DESIGN.md), ringkasnya:

- **Tema:** Opsi A — zona terang (Akuntansi/Pajak) → zona gelap (IT & demo Kalkulator PPN)
  → terang kembali (Tentang & Kontak), dengan gradasi 128 px dan navbar yang ikut berubah warna.
- **Font:** Plus Jakarta Sans (judul) + Inter (isi), dari Google Fonts.
- **Palet:** biru tua `#0A1F38` dengan aksen teal `#0F766E` dan emas `#B07C24`.
- **Animasi:** `framer-motion`, durasi 0.18–0.5 s, dihormati `prefers-reduced-motion`.
- **Video:** `VideoEmbed` mendukung YouTube unlisted **dan** MP4 lokal, dipilih lewat data
  (PRD §7.3 butir 7).

## Aturan kerja

- Branch fitur per pekerjaan; `main` hanya di-merge oleh pemilik proyek.
- Setiap tahap selesai → perbarui `PROGRESS.md` → commit → push branch fitur.
- **Tidak ada data nyata** (nama perusahaan, customer, NPWP, angka keuangan asli)
  di kode, aset, maupun README — PRD §10.
- Semua teks yang bisa berubah disimpan di `src/data/`, bukan di komponen — PRD §6.1.
- Komentar kode dan README berbahasa Indonesia (pemilik merawat sendiri) — PRD §7.3–7.4.
