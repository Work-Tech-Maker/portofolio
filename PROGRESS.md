# PROGRESS

## Posisi terakhir (27 Okt 2026)

**Tahap 1 — Kerangka selesai dan teruji. Menunggu keputusan pemilik untuk lanjut ke Tahap 2.**

Cabang: `fitur/kerangka-ui` (turunan dari `fitur/design-md`).

### Yang sudah jadi

Seluruh halaman bisa dibuka dan digulir dari atas ke bawah, responsif di HP, tablet,
dan desktop. Isi memakai **contoh (dummy)** karena data asli belum tersedia.

- Konfigurasi: `vite.config.js` (Tailwind v4, `base: '/'`, pemisahan bundel `gerak`/`ikon`).
- `index.html` — SEO + Open Graph, `lang="id"`, favicon `public/favicon.svg`.
- `src/index.css` — seluruh token tema di `@theme` (zona terang/gelap, aksen teal + emas,
  radius, bayangan, skala huruf). Tidak ada warna keras di komponen.
- `src/config/gerak.js` — semua durasi/easing/jarak animasi terpusat (PRD §7.3 butir 6).
- `src/data/` — `teks.js` (termasuk penanda `MODE_DUMMY`), `profil.js`, `kontak.js`,
  `layanan.js`, `proyek.js`, `pengalaman.js`. Menambah proyek = menambah blok di data.
- `src/components/Navbar.jsx` — sticky, tautan anchor, menu hamburger di HP, dan
  **berganti warna otomatis** saat melewati zona gelap; menandai bagian yang aktif.
- Bagian halaman: `Hero`, `Layanan` (3 kartu + tombol WhatsApp berisi pesan awal),
  `ProyekUnggulan` (Masalah → Solusi → Fitur → Hasil), `ProyekPendukung`,
  `KalkulatorPPN`, `Tentang` (timeline + pendidikan + keahlian), `Kontak`, `Footer`.
- Komponen UI: `Bagian`, `Reveal`, `Tombol`, `Kartu`, `LabelBidang`, `MediaPlaceholder`,
  `VideoEmbed`, `Galeri` (penampil layar penuh).
- `scripts/dev/audit_ui.mjs` — pemeriksa tata letak & aksesibilitas otomatis.

### Hasil uji nyata

`npm run build` → **berhasil**, keluaran: `index.html` 2,17 kB · CSS 31,4 kB (gzip 6,65) ·
`ikon` 8,2 kB · `gerak` 141,2 kB (gzip 46,6) · `index.js` 250,3 kB (gzip 76,9).
`npm run lint` → **0 peringatan**.

`node scripts/dev/audit_ui.mjs` pada 390 px / 834 px / 1440 px → **SEMUA LULUS**
(0 gagal), mencakup: tanpa gulir mendatar, tepat satu `<h1>`, urutan judul wajar,
semua gambar punya `alt`, semua tombol punya nama, **target sentuh ≥ 44 px**,
tidak ada penanda `[ISI: …]` bocor ke tampilan, meta deskripsi + OG terisi, dan
ketujuh bagian punya isi serta tampil penuh (tidak ada elemen tertinggal transparan).

Tangkapan layar bukti ada di `docs/tampilan/` (4 desktop + 3 HP).

### Yang belum (sengaja)

- **Kalkulator PPN belum berhitung.** Rumus sengaja dikosongkan sampai berkas kalkulator
  asli pemilik tersedia; PRD §4.4.1 melarang mengarang logikanya. Kerangka isian dan
  kotak hasil sudah tampil (‑ —).
- Foto profil, video rekaman layar, dan screenshot memakai penanda rapi
  (`MediaPlaceholder`), bukan gambar karangan.
- Tombol “Unduh CV” otomatis disembunyikan selama `profil.cv` kosong.
- `MODE_DUMMY` masih `true` → nomor WhatsApp/email/LinkedIn memakai contoh.
  **Wajib diubah ke `false` sebelum publikasi** (PRD §10, §11).

## Rencana berikutnya

- **Tahap 2 — Isi dan data:** ganti isi contoh dengan data asli begitu pemilik menyiapkan
  berkasnya (foto, CV, video, screenshot, nomor WhatsApp, angka hasil). Struktur sudah siap;
  hanya berkas di `src/data/` dan `public/media/` yang berubah.
- **Tahap 3 — Media dan demo:** pasang video (`VideoEmbed`: YouTube unlisted atau MP4),
  galeri screenshot, lalu **aktifkan Kalkulator PPN** setelah berkas aslinya diterima.
- **Tahap 4 — Animasi dan polesan:** hitung naik pada angka, penyempurnaan hover,
  uji `prefers-reduced-motion`, cek Lighthouse ≥ 90 (Performance/Accessibility/SEO).
- **Tahap 5 — README dan rilis:** README untuk pemula (PRD §7.4), `npm run build`,
  panduan unggah ke Hostinger, uji di `indragunawan.luckywater.web.id`.

## Yang ditunggu dari pemilik

Data (boleh menyusul per tahap; tidak menghambat Tahap 2 dimulai):

- foto profil (boleh 1–2 berkas), file CV PDF
- teks “Tentang Saya” versi sendiri (sekarang contoh 2 paragraf sudah ada)
- periode kerja + poin tugas, sertifikasi bila ada
- nomor WhatsApp, email, LinkedIn asli
- video rekaman layar proyek unggulan (60–90 detik, data dummy)
- screenshot: 3–4 laporan keuangan + 1 per proyek pendukung
- angka hasil/penghematan waktu (opsional)
- **berkas asli kalkulator PPN** — logika harus disalin dari situ (PRD §4.4.1)

## Catatan teknis

- Dev server proyek ini dipakai di `127.0.0.1:5175` (port lain sedang dipakai proyek keuangan).
- Pemeriksa UI memakai `scripts/dev/cdp.mjs` (Chrome mode tanpa antarmuka). Chrome di mesin ini
  butuh pustaka di `~/.local/chrome-libs` dan font di `~/.local/share/fonts`.
- Proyek lama `manajemen-keuangan-indra` berdiri sendiri di folder terpisah.
- Jangan commit berkas mentah pemilik; hanya versi akhir terkompres di `public/media/`.
- Target Lighthouse: Performance, Accessibility, SEO masing-masing ≥ 90 (PRD §9).