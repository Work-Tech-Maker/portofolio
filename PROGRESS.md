# PROGRESS

## Posisi terakhir (2026-10-27)

**Tahap 0 — bootstrap selesai. `DESIGN.md` ditulis, menunggu persetujuan pemilik.**
**Belum ada kode aplikasi.**

- `PRD.md` — 294 baris, 14 bagian, tersimpan verbatim (dicek `cmp`, identik byte-per-byte).
- `DESIGN.md` — keputusan desain lengkap: Opsi A (terang → gelap → terang), palet biru tua
  + teal/emas, Plus Jakarta Sans + Inter, `framer-motion`, `VideoEmbed` dua sumber,
  token warna/radius/bayangan, aturan animasi, aksesibilitas.
- Remote `origin` = `git@github.com:Work-Tech-Maker/portofolio.git` (repo kosong, akses SSH OK).
- Data milik pemilik yang belum tersedia ditandai `[ISI: …]` di berkas data nanti
  (PRD §11). Tidak ada isi yang dikarang.

## Rencana (mengikuti PRD §12, satu tahap = satu konfirmasi pemilik)

1. **DESIGN.md** — wawancara desain dulu (DESIGN-GUIDE tahap 1), lalu tulis DESIGN.md
   berisi: pilihan tema (Opsi A/B), palet, font, pustaka animasi, aturan komponen.
   **Wajib disetujui sebelum kode UI.**
2. **Tahap 1 — Kerangka:** scaffold React + Vite + Tailwind, Navbar, variabel tema,
   seluruh bagian dengan teks placeholder, responsif, data dipisah ke `src/data/`.
3. **Tahap 2 — Isi dan data:** kartu Layanan + tombol WhatsApp berisi pesan awal,
   proyek unggulan (Masalah → Solusi → Fitur → Hasil), proyek pendukung,
   timeline pengalaman, kontak.
4. **Tahap 3 — Media dan demo:** foto (WebP responsif), video proyek unggulan
   (`VideoEmbed`: YouTube unlisted **atau** MP4 lokal), galeri screenshot, Kalkulator PPN.
5. **Tahap 4 — Animasi dan polesan:** scroll reveal, hitung naik, hover,
   `prefers-reduced-motion`, SEO + Open Graph, optimasi gambar, cek Lighthouse.
6. **Tahap 5 — README dan rilis:** README untuk pemula (PRD §7.4), build,
   panduan unggah ke Hostinger, uji di `indragunawan.luckywater.web.id`.

## Yang ditunggu dari pemilik

**Data (PRD §11)** — boleh menyusul per tahap, jangan sampai menghambat Tahap 1:

- nama lengkap & posisi tampil; foto (opsional foto kedua)
- kalimat nilai jual (ada usulan di PRD §4.1, boleh pakai)
- teks "Tentang Saya" 1–2 paragraf
- periode kerja + poin tugas (tanpa nama perusahaan), sertifikasi bila ada
- nomor WhatsApp, email, LinkedIn; file CV (PDF)
- video rekaman layar proyek unggulan (60–90 detik, data dummy)
- screenshot: 3–4 laporan keuangan + 1 per proyek pendukung
- angka hasil/penghematan waktu (opsional, bagian disembunyikan bila kosong)
- **file asli kalkulator PPN** — logika harus disalin dari situ, bukan dikarang (PRD §4.4.1)

**Keputusan yang sudah diambil pemilik (27 Okt 2026):**

- Tema **Opsi A** (terang → gelap → terang), font Plus Jakarta Sans + Inter,
  palet biru tua + teal/emas, animasi `framer-motion`, video dua sumber.
- Remote Git: `git@github.com:Work-Tech-Maker/portofolio.git`.

## Rencana teknis yang perlu diingat saat Tahap 1

- Navbar harus **berganti warna** saat melewati zona gelap (`data-zona` + `IntersectionObserver`),
  kalau tidak tautannya tidak terbaca. Detail di `DESIGN.md` §2.
- Token warna/radius/bayangan didaftarkan di `@theme` `src/index.css`; durasi animasi di
  `src/config/gerak.js` — supaya tidak ada angka ajaib (PRD §7.3 butir 6).
- `prefers-reduced-motion` wajib dihormati dan diuji (PRD §5.2).

## Catatan teknis

- Proyek lama `manajemen-keuangan-indra` ada di folder terpisah; proyek ini berdiri sendiri.
- `public/media/` belum ada; video mentah jangan di-commit (lihat `.gitignore`).
- Target Lighthouse: Performance, Accessibility, SEO masing-masing ≥ 90 (PRD §9).
