# DESIGN.md — Portofolio Tax Accounting & IT Support

Keputusan desain untuk situs portofolio satu halaman. Dibuat dari wawancara
(27 Okt 2026) mengikuti `DESIGN-GUIDE.md`. **PRD tetap sumber kebenaran untuk isi
dan fitur; berkas ini sumber kebenaran untuk tampilan.**

## 1. Keputusan yang dipilih

| No | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Tema | **Opsi A** — bagian Akuntansi/Pajak terang, bagian IT lebih gelap, transisi halus (PRD §5.1) |
| 2 | Font | **Plus Jakarta Sans** (judul) + **Inter** (isi) |
| 3 | Palet | **Biru tua + aksen teal & emas** |
| 4 | Animasi | **`framer-motion`** |
| 5 | Video | **`VideoEmbed` mendukung dua sumber** (YouTube unlisted *atau* MP4 lokal), dipilih lewat data |

Keputusan ini wajib dijelaskan juga di `README.md` (PRD §14).

## 2. Peta zona warna (inti Opsi A)

Halaman dibagi tiga zona. Perpindahan zona memakai gradasi 128 px supaya tidak
terlihat seperti dua situs berbeda.

| Zona | Bagian | Nuansa |
|---|---|---|
| **Terang** | Hero, Layanan, Proyek Unggulan | Akuntansi & pajak — bersih, lapang, banyak ruang putih |
| **Gelap** | Proyek Pendukung + Kalkulator PPN | IT & otomasi — teknis, kontras tinggi, demo terasa "aplikasi" |
| **Terang** | Tentang Saya & Pengalaman, Kontak | Kembali terbaca nyaman untuk teks panjang (timeline, paragraf) |

Footer selalu gelap (navy) sebagai penutup, apa pun zona di atasnya.

**Konsekuensi teknis yang wajib dikerjakan:** Navbar transparan di atas zona terang
dan **berubah gelap** saat melewati zona gelap. Implementasi: `IntersectionObserver`
pada tiap `<section data-zona="terang|gelap">`, lalu Navbar memakai
`data-zona-aktif` untuk mengganti warna latar, teks, dan garis bawah tautan.
Tanpa ini, tautan navbar akan hilang di atas bagian gelap.

## 3. Token warna

Semua nilai di bawah ini didaftarkan sebagai variabel CSS (`@theme` Tailwind v4) di
`src/index.css`. **Komponen tidak boleh menulis kode warna langsung.**

### Zona terang
| Token | Hex | Dipakai untuk |
|---|---|---|
| `--color-terang-bg` | `#F7F9FC` | latar halaman zona terang |
| `--color-terang-surface` | `#FFFFFF` | kartu, navbar, panel |
| `--color-terang-surface-2` | `#EEF2F8` | isian, chip tidak aktif, kerangka muat |
| `--color-terang-border` | `#DCE3EE` | garis pemisah, tepi kartu |
| `--color-terang-border-kuat` | `#C3CEDF` | tepi saat hover |
| `--color-terang-ink` | `#0B1B33` | judul, teks utama |
| `--color-terang-ink-2` | `#41546E` | teks isi kedua, label |
| `--color-terang-ink-3` | `#7C8CA3` | keterangan, satuan, placeholder |

### Zona gelap
| Token | Hex | Dipakai untuk |
|---|---|---|
| `--color-gelap-bg` | `#0A1F38` | latar zona gelap & footer |
| `--color-gelap-surface` | `#0F2C4D` | kartu di zona gelap |
| `--color-gelap-border` | `#1E4066` | garis & tepi kartu gelap |
| `--color-gelap-ink` | `#EAF1F9` | judul & teks utama |
| `--color-gelap-ink-2` | `#A9BDD4` | teks isi kedua |
| `--color-gelap-ink-3` | `#7B93AE` | keterangan |

### Aksen (dipakai hemat, dua warna saja)
| Token | Hex | Aturan pakai |
|---|---|---|
| `--color-teal` | `#0F766E` | aksen utama di zona terang: tombol, tautan, ikon, garis aktif |
| `--color-teal-terang` | `#14B8A6` | aksen utama di zona gelap (kontras cukup di navy) |
| `--color-teal-lembut` | `#E6F4F2` | latar chip/badge di zona terang |
| `--color-emas` | `#B07C24` | aksen kedua **hanya** untuk: garis pendek di bawah judul, ikon kecil, label "hasil" |
| `--color-emas-terang` | `#E9B44C` | aksen kedua di zona gelap |

**Aturan kontras (sudah dihitung):**
- `teal #0F766E` di atas putih ≈ 4.9:1 → aman untuk teks.
- `emas #B07C24` di atas putih ≈ 3.9:1 → **hanya untuk teks ≥ 19 px tebal atau elemen non-teks**.
  Untuk teks kecil, pakai `emas` versi lebih gelap `#8A6119` (≈ 5.3:1).
- Di zona gelap, `teal-terang` dan `emas-terang` di atas `#0A1F38` keduanya > 7:1.

**Larangan:** gradasi ungu-biru, blob blur, glassmorphism, aksen ketiga, warna
semaunya di komponen.

## 4. Huruf

Dimuat dari Google Fonts di `index.html` (`display=swap`, hanya bobot yang dipakai).

| Peran | Font | Bobot |
|---|---|---|
| Judul & angka besar | **Plus Jakarta Sans** | 600, 700, 800 |
| Isi, label, tombol | **Inter** | 400, 500, 600 |

### Skala (mobile → desktop)
| Nama | Mobile | Desktop | Dipakai untuk |
|---|---|---|---|
| `display` | 40 / 44 px | 56 / 60 px, tracking −0.02em | judul Hero |
| `h2` | 30 / 36 px | 38 / 44 px | judul bagian |
| `h3` | 21 / 28 px | 23 / 32 px | judul kartu |
| `body-lg` | 17 / 28 px | 18 / 30 px | paragraf utama, kalimat nilai jual |
| `body` | 16 / 26 px | 17 / 28 px | isi kartu, timeline |
| `label` | 14 / 20 px | 14 / 20 px, tracking 0.01em | tombol, label bidang |
| `micro` | 13 / 18 px | 13 / 18 px | keterangan, catatan kecil |

Angka pada kalkulator dan statistik memakai `font-variant-numeric: tabular-nums`.

## 5. Ruang, lebar, radius, bayangan

- **Spasi kelipatan 4 px.** Nilai yang dipakai: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Kontainer:** `max-width: 1120px`, gutter 20 px (mobile) → 32 px (desktop).
- **Padding vertikal bagian:** 64 px (mobile) → 96 px (desktop).
- **Radius:** `8` (chip/badge), `12` (tombol, isian), `16` (kartu), `24` (bingkai
  media/foto/video), `full` (pil).
- **Bayangan:** hanya di zona terang, sangat tipis.
  - kartu: `0 1px 2px rgb(11 27 51 / .05), 0 8px 24px -12px rgb(11 27 51 / .10)`
  - kartu saat hover: `0 2px 4px rgb(11 27 51 / .06), 0 16px 32px -16px rgb(11 27 51 / .18)`
  - Di zona gelap **tidak pakai bayangan** — kedalaman dibentuk oleh `gelap-surface` + `gelap-border`.
- **Garis pemisah:** 1 px `terang-border` / `gelap-border`. Tidak memakai `<hr>` tebal.

## 6. Komponen

### Navbar
Tinggi 64 px (mobile) / 72 px (desktop). Latar transparan + `backdrop-blur` tipis saat
halaman belum digulir; setelah 24 px bergulir menjadi latar solid (`terang-surface` atau
`gelap-bg` sesuai zona) + garis bawah. Berisi: nama/logo teks, tautan anchor
(Layanan · Proyek · Tentang · Kontak), dan tombol **Unduh CV** (kecil, `secondary`).
Di bawah 768 px: tombol hamburger → panel menu penuh layar, tautan 48 px, tombol CV di bawah.
Tautan aktif ditandai garis bawah teal 2 px + tebal 600.

### Tombol
| Varian | Tampilan | Tinggi |
|---|---|---|
| `utama` | latar `teal`, teks putih, radius 12 | 48 px (mobile 52 px) |
| `utama` (zona gelap) | latar `teal-terang`, teks `#04201F` | 48 px |
| `sekunder` | latar transparan, tepi `border-kuat`, teks `ink` | 48 px |
| `whatsapp` | latar `teal` + ikon `MessageCircle`, teks putih | 44 px |
| `teks` | tanpa latar, teks `teal`, garis bawah saat hover | 44 px |

Keadaan: hover (warna 1 tingkat lebih tua / latar `teal-lembut`), fokus
(`outline` 2 px teal, offset 2 px), aktif (tanpa animasi), nonaktif (opasitas 50%).
Target sentuh minimal 44×44 px. Ikon selalu mendampingi teks, tidak berdiri sendiri.

### Kartu
Zona terang: latar `surface`, radius 16, tepi 1 px, bayangan kartu, padding 24–28.
Zona gelap: latar `gelap-surface`, radius 16, tepi `gelap-border`, tanpa bayangan.
Judul kartu `h3`, deskripsi `body` `ink-2`, daftar poin dengan ikon `Check` 16 px teal.
Hover: naik 2 px + bayangan naik (zona terang); di zona gelap tepi menjadi `teal-terang`.

### Label bidang (Pajak / Akuntansi / Otomasi / IT)
Pil kecil, `micro` 600, padding 4×10, radius `full`.
Terang: latar `teal-lembut`, teks `teal`. Gelap: latar `#12395F`, teks `teal-terang`.
Satu bidang satu warna dasar; tidak memakai warna acak per kartu.

### Timeline pengalaman
Garis vertikal 2 px `border` di kiri, titik 12 px `teal` (berisi cincin `bg` 4 px),
jarak antar-item 32 px. Judul peran `h3` kecil (18/26), periode `label` `ink-3`,
poin tugas sebagai daftar `body` dengan penanda `–`. Di mobile tetap satu kolom
(tidak ada dua kolom sempit).

### Kalkulator PPN
Kartu besar di zona gelap. Susunan: label isian → `input` angka (48 px, `tabular-nums`,
pemisah ribuan otomatis, `inputmode="numeric"`) → hasil dalam kotak `gelap-surface`
dengan garis teal di kiri. Hasil menampilkan: **DPP**, **DPP Nilai Lain**, **PPN**,
**Total**. Angka hasil memakai `display` kecil (28 px) + `tabular-nums`.
Catatan kecil di bawah: *"Alat bantu hitung untuk simulasi, bukan pengganti konsultasi pajak."*
Keadaan: kosong (placeholder `0`), tidak valid (tepi merah + pesan), hasil (garis teal).

### Galeri screenshot
Grid 2 kolom (mobile) / 4 kolom (desktop), rasio 16:10, `object-cover`, radius 12,
tepi 1 px. Klik → lightbox layar penuh (latar `rgb(4 12 24 / .92)`), gambar `object-contain`,
tombol tutup 44 px, panah kiri/kanan, `Esc` menutup, fokus terkunci di dalam lightbox.

### Video
Bingkai radius 24, rasio 16:9, `gelap-surface` sebagai latar sebelum video dimuat.
Wajib ada poster gambar + tombol putar sendiri (bukan autoplay). YouTube: `iframe`
dimuat **hanya setelah** tombol putar diklik. MP4: `<video controls preload="none">`.

### Footer
Latar `gelap-bg`, teks `gelap-ink-2`, garis atas `gelap-border`. Berisi: hak cipta
dengan tahun otomatis, tautan kontak singkat, tombol **kembali ke atas** (44 px,
ikon `ArrowUp`, `aria-label` jelas).

## 7. Animasi (`framer-motion`)

Konfigurasi dipusatkan di `src/config/gerak.js` (bukan angka tersebar):

| Nama | Nilai |
|---|---|
| `durasi.cepat` | 0.18 s |
| `durasi.normal` | 0.32 s |
| `durasi.lambat` | 0.5 s |
| `easing` | `[0.22, 1, 0.36, 1]` |
| `jarakReveal` | 16 px (vertikal) |
| `jedaStagger` | 0.08 s |
| `ambangLihat` | 0.2 (IntersectionObserver) |

Aturan:
1. **Hero:** teks muncul bertahap (judul → kalimat → tombol, stagger 0.08 s),
   foto fade + geser 16 px. Hanya sekali saat muat.
2. **Scroll reveal:** dipakai pada kartu Layanan, kartu Proyek, item timeline.
   `whileInView` + `viewport={{ once: true }}` — jangan berulang tiap lewat.
3. **Hover:** naik 2 px + bayangan (kartu), warna (tombol). Transisi ≤ 0.18 s.
4. **Hitung naik** pada bagian Hasil (bila datanya ada): 0 → nilai selama 1.2 s,
   mulai saat terlihat, hanya sekali.
5. **`prefers-reduced-motion`:** pakai `useReducedMotion()`; bila aktif, semua durasi 0,
   tanpa transform/geser, hitung naik langsung menampilkan angka akhir.
   Ini **wajib** (PRD §5.2) dan diuji.
6. Animasi tidak boleh menahan LCP: elemen Hero pertama tidak diberi `opacity: 0`
   yang menunggu JS — pakai animasi yang tetap menampilkan konten tanpa JS
   (`initial` hanya untuk transform, atau `animate` dengan durasi pendek).

## 8. Ikon

`lucide-react` saja, `stroke-width` 1.75. Ukuran: 16 (dalam teks/daftar), 18 (tombol kecil),
20 (tombol), 24 (judul kartu, lightbox). **Tanpa emoji** sebagai ikon.

## 9. Aksesibilitas

- Kontras teks minimal AA (4.5:1 teks normal, 3:1 teks besar).
- Fokus terlihat di semua elemen interaktif: `outline` 2 px `teal`, offset 2 px.
- Struktur semantik: `header`, `nav`, `main`, `section` + `aria-labelledby`, `footer`.
  Satu `h1` (nama di Hero), `h2` per bagian, `h3` per kartu — tidak melompat level.
- Semua gambar punya `alt` deskriptif; gambar dekoratif `alt=""`.
- Lightbox & menu mobile: fokus terkurung, `Esc` menutup, `aria-modal="true"`.
- Tombol ikon selalu punya `aria-label`.
- Teks tidak di dalam gambar (kecuali screenshot media proyek).

## 10. Format isi

- Bahasa Indonesia, sapaan profesional, tanpa klaim berlebihan.
- Judul bagian: **Layanan**, **Proyek Unggulan**, **Proyek Pendukung**,
  **Tentang Saya**, **Kontak**.
- Data yang belum ada ditulis `[ISI: …]` di `src/data/` dan **tidak ditampilkan**
  ke pengunjung; bagian opsional yang kosong disembunyikan (PRD §11).
- Nama perusahaan/customer **tidak pernah** ditulis; gunakan bentuk umum
  (mis. "Perusahaan Manufaktur").
- Angka contoh pada media: data dummy yang konsisten dan neraca seimbang.

## 11. Boleh / tidak boleh

**Boleh**
- Satu angka besar dan tegas (nilai penghematan waktu) bila datanya ada.
- Zona gelap penuh untuk bagian IT + demo kalkulator.
- Garis emas pendek sebagai penanda judul bagian.

**Tidak boleh**
- Gradasi ungu-biru, blob blur, glassmorphism, atau animasi tanpa fungsi.
- Lebih dari dua aksen (teal + emas sudah dua).
- Emoji sebagai ikon; ikon tanpa `aria-label` pada tombol ikon.
- Angka atau testimoni karangan; nama perusahaan nyata.
- Video autoplay bersuara; iframe YouTube dimuat sebelum diklik.
- Teks "Lorem ipsum" atau "Welcome to my portfolio".
- Menaruh seluruh isi teks di dalam komponen (harus di `src/data/`).

## 12. Pendaftaran token

- Warna, radius, bayangan, dan skala huruf → `@theme` Tailwind v4 di `src/index.css`.
- Durasi & easing animasi → `src/config/gerak.js`.
- Ukuran huruf/ruang yang dipakai berulang → kelas utilitas token, bukan angka lepas.

Komponen memakai kelas token (mis. `bg-terang-surface`, `text-gelap-ink-2`,
`rounded-kartu`). Tidak ada nilai warna literal di dalam komponen.
