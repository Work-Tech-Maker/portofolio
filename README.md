# Portofolio — Tax Accounting & IT Support

Website portofolio **satu halaman** berbahasa Indonesia untuk dua bidang sekaligus:
**Akuntansi & Pajak** dan **IT Support**. Nilai jual utamanya: paham logika pajak dan
akuntansi, sekaligus mampu membangun sendiri alat otomasinya.

- **Alamat publik:** `indragunawan.luckywater.web.id` (subdomain Hostinger)
- **Sifat situs:** statis — tanpa backend, tanpa database, tanpa login
- **Sumber kebenaran kebutuhan:** [`PRD.md`](./PRD.md)

## Status

Tahap: **bootstrap** — folder dan PRD sudah ada, kode belum ditulis.
Rencana tahapan ada di `PROGRESS.md`, urutannya mengikuti PRD §12.

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

## Aturan kerja

- Branch fitur per pekerjaan; `main` hanya di-merge oleh pemilik proyek.
- Setiap tahap selesai → perbarui `PROGRESS.md` → commit → push branch fitur.
- **Tidak ada data nyata** (nama perusahaan, customer, NPWP, angka keuangan asli)
  di kode, aset, maupun README — PRD §10.
- Semua teks yang bisa berubah disimpan di `src/data/`, bukan di komponen — PRD §6.1.
- Komentar kode dan README berbahasa Indonesia (pemilik merawat sendiri) — PRD §7.3–7.4.
