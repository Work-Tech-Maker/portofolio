# PRD — Website Portofolio: Tax Accounting & IT Support

> Dokumen ini ditujukan untuk agent/developer yang akan membangun website. Baca seluruhnya sebelum menulis kode. Bagian bertanda **[ISI OLEH PEMILIK]** adalah data yang belum ada: **jangan mengarang isinya**, pakai placeholder yang jelas dan mudah dicari (contoh: `[ISI: nomor WhatsApp]`).

---

## 1. Ringkasan

Website portofolio **satu halaman (single page)** berbahasa Indonesia untuk seorang profesional di dua bidang: **Akuntansi & Pajak** dan **IT Support**. Nilai jual utamanya: *paham logika pajak dan akuntansi, sekaligus mampu membangun sendiri alat otomasinya*. Benang merah semua proyek: **mengubah pekerjaan manual yang berulang menjadi otomatis, dengan hasil yang langsung siap diunggah ke sistem (Coretax atau ACCURATE Online).**

- **Nama proyek (folder):** `portofolio`
- **Alamat publik:** `indragunawan.luckywater.web.id` (subdomain pada share hosting Hostinger)
- **Bahasa:** Indonesia saja (arsitektur harus memudahkan penambahan bahasa Inggris di masa depan, lihat bagian 7.3)
- **Sifat situs:** statis. Tanpa backend, tanpa database, tanpa login.

## 2. Tujuan dan Target Pengunjung

Pemilik ingin dua jenis pengunjung terlayani sekaligus:

| Pengunjung | Yang dicari | Yang harus cepat ditemukan |
|---|---|---|
| **Recruiter / HR** | Siapa orangnya, pengalaman, bukti kemampuan | Ringkasan profil, pengalaman, tombol **Unduh CV** |
| **Klien freelance / jasa** | Masalah apa yang bisa diselesaikan, contoh hasil, cara menghubungi | Bagian **Layanan**, **Proyek**, tombol **WhatsApp** |

Tujuan terukur:
1. Pengunjung memahami profil dan keahlian dalam **±10 detik** pertama (bagian Hero).
2. Pengunjung dapat menghubungi pemilik atau mengunduh CV dalam **maksimal 2 klik**.
3. Pemilik dapat **menambah proyek baru sendiri** tanpa mengubah kode tampilan.

## 3. Ruang Lingkup

**Termasuk:**
- Satu halaman dengan 6 bagian (lihat bagian 4)
- Animasi halus, foto pemilik, tema perpaduan terang/gelap
- Video rekaman layar proyek unggulan + screenshot
- Satu demo interaktif: Kalkulator PPN
- Komponen kode terpisah per bagian dengan komentar bahasa Indonesia
- `README.md` panduan perawatan untuk pemula
- Panduan build dan unggah ke Hostinger

**Tidak termasuk (versi ini):**
- Backend, database, formulir yang menyimpan data, login/admin panel
- Blog, multi-halaman, multi-bahasa (hanya disiapkan agar mudah ditambah)
- Demo interaktif untuk tools selain Kalkulator PPN (cukup video/screenshot)

## 4. Struktur Halaman dan Spesifikasi per Bagian

Urutan dari atas ke bawah. Navigasi tetap (sticky) di atas dengan tautan anchor ke tiap bagian. Di layar kecil menjadi menu hamburger.

### 4.1 Hero
- Foto pemilik (**[ISI OLEH PEMILIK]**), nama, posisi: **"Tax Accounting & IT Support"**.
- Satu kalimat nilai jual (usulan, boleh disesuaikan pemilik): *"Akuntansi dan pajak yang paham teknologi: saya membangun alat otomasi yang menghemat waktu kerja."*
- Dua tombol utama: **Unduh CV** (tautan ke file PDF, **[ISI OLEH PEMILIK]**) dan **Hubungi Saya** (scroll ke Kontak atau buka WhatsApp).
- Animasi: teks muncul bertahap, foto muncul dengan transisi halus.

### 4.2 Layanan
Tiga kartu. Setiap kartu: ikon, judul, 2–3 kalimat, daftar poin singkat, dan tombol **"Konsultasi via WhatsApp"** dengan **pesan awal sudah terisi** sesuai jasanya (memakai `https://wa.me/<nomor>?text=<pesan>`).

1. **Laporan Keuangan & SPT Tahunan** — penyusunan laporan keuangan, perhitungan koreksi fiskal, penyiapan data SPT Tahunan (badan maupun pribadi).
2. **Tools Otomasi Bisnis** — mengubah pekerjaan manual berulang (input data, rekap, template impor Coretax/ACCURATE) menjadi otomatis.
3. **IT Support** — jaringan, pembuatan website, instalasi OS dan aplikasi, troubleshooting perangkat.

Kartu 3 belum punya bukti visual seperti dua lainnya. Sediakan daftar kemampuan konkret dan slot opsional untuk foto/cerita singkat (**[ISI OLEH PEMILIK]**, boleh dikosongkan; jika kosong, slot tidak ditampilkan).

### 4.3 Proyek Unggulan
**Tools Laporan Keuangan & SPT Tahunan** (aplikasi web buatan sendiri, dapat dipakai untuk laporan PPh tahunan badan maupun pribadi).

Format studi kasus: **Masalah → Solusi → Fitur Unggulan → Hasil**.
- **Masalah:** tiap awal tahun rekap laporan keuangan dibuat manual di Excel, lalu angka diinput satu per satu ke Coretax.
- **Solusi:** aplikasi web yang menyusun Laba Rugi, Neraca, dan Ekuitas; menghitung penyusutan komersial dan fiskal; menghasilkan koreksi fiskal otomatis; menyiapkan angka sesuai format Coretax.
- **Fitur unggulan:** mendukung beberapa perusahaan dan tahun, kunci tahun dan saldo awal otomatis, ekspor PDF/Excel dengan kolom tanda tangan dinamis.
- **Hasil:** **[ISI OLEH PEMILIK]** (angka waktu yang dihemat, misalnya "dari X jam menjadi Y menit"). Jika kosong, bagian ini disembunyikan, jangan diisi angka karangan.
- **Media:** satu **video rekaman layar** (60–90 detik, data dummy) + 3–4 screenshot (galeri dengan klik untuk memperbesar).
- Aplikasi aslinya **tidak** dibuka publik. Hanya video dan screenshot.

### 4.4 Proyek Pendukung
Tiga kartu lebih kecil, masing-masing berisi: judul, label bidang (*Pajak / Akuntansi / Otomasi-IT*), satu kalimat masalah→solusi, daftar teknologi, dan satu screenshot atau GIF pendek.

1. **Template Coretax Otomatis** — pembuat template siap unggah ke Coretax untuk **PPh 21** dan **Faktur Pajak Keluaran** dari data Excel.
2. **Otomasi Petty Cash dari Foto** — foto nota diubah otomatis (OCR/AI) menjadi template impor siap unggah ke **ACCURATE Online**.
3. **Kalkulator PPN** — **demo interaktif langsung di halaman** (lihat 4.4.1).

#### 4.4.1 Demo Kalkulator PPN
- Komponen React yang dapat dicoba langsung: input harga/DPP → hasil DPP Nilai Lain dan PPN.
- **Logika harus mengikuti kalkulator PPN buatan pemilik yang sudah ada.** Pemilik akan menyertakan file aslinya (HTML/CSS). Reuse logikanya, jangan membuat ulang dari ingatan.
- Perlu dipastikan dengan pemilik (karena regulasi bisa berubah): tarif 12% dengan DPP Nilai Lain untuk barang/jasa non-mewah, dan perlakuan barang mewah.
- Beri catatan kecil di bawah kalkulator: *"Alat bantu hitung untuk simulasi, bukan pengganti konsultasi pajak."*
- Tidak ada data yang dikirim ke server. Semua perhitungan di browser.

### 4.5 Tentang Saya dan Pengalaman
- Paragraf singkat tentang saya (**[ISI OLEH PEMILIK]**), foto kedua opsional.
- **Timeline pengalaman.** Karena privasi, **nama perusahaan, customer, dan data internal tidak boleh dicantumkan**. Tuliskan umum, contoh: *"Staf Akuntansi & Pajak, Perusahaan Manufaktur — [periode]"* diikuti poin tugas (**[ISI OLEH PEMILIK]** untuk periode dan poin tugas).
- **Pendidikan:** SMKN 1 Gunung Putri (Teknik Elektronika Industri); D3 Teknik Komputer, Universitas Pakuan.
- Bagian opsional (tampilkan hanya jika diisi): sertifikasi/pelatihan/brevet.
- Daftar keahlian dikelompokkan: **Pajak & Akuntansi** (Coretax, PPN, PPh 21, ACCURATE Online, laporan keuangan) dan **IT** (otomasi, pengembangan web, jaringan, instalasi OS, server rumah/virtualisasi).

### 4.6 Kontak dan Footer
- Tombol/tautan: **WhatsApp**, **Email**, **LinkedIn** (**[ISI OLEH PEMILIK]** untuk ketiganya). Tautan yang kosong tidak ditampilkan.
- Tanpa formulir pengiriman pesan.
- Footer: hak cipta, tahun otomatis, tombol "kembali ke atas".

## 5. Desain dan Animasi

### 5.1 Gaya visual: perpaduan profesional dan teknis
Dua bagian bernuansa berbeda dalam satu halaman. Agent boleh memilih salah satu pendekatan, lalu menjelaskannya di README:
- **Opsi A (disarankan):** bagian Pajak & Akuntansi bernuansa **terang** (putih/biru tua), bagian IT Support bernuansa **lebih gelap**, dengan transisi warna halus di antaranya.
- **Opsi B:** satu tema dengan **tombol ganti terang/gelap**.

Ketentuan umum:
- Warna disimpan sebagai **variabel tema** di satu tempat (Tailwind config / CSS variables) agar mudah diganti.
- Tipografi bersih dan mudah dibaca (maks. 2 jenis font). Ukuran teks nyaman, **kontras tinggi**.
- Pastikan tampilan **responsif**: HP, tablet, desktop. Prioritaskan HP karena banyak recruiter membuka dari ponsel.

### 5.2 Animasi (halus dan ringan)
- Teks Hero muncul bertahap; foto muncul dengan fade/slide.
- Kartu Layanan dan Proyek muncul saat digulir (**scroll reveal**).
- Efek **hover** pada kartu dan tombol.
- Angka pada bagian Hasil **menghitung naik** saat terlihat.
- Navigasi menandai bagian yang sedang aktif saat scroll.
- Gunakan `framer-motion` (atau pustaka setara yang ringan) atau CSS murni.
- **Wajib:** hormati pengaturan `prefers-reduced-motion` (matikan/kurangi animasi).
- Jangan sampai animasi memperlambat halaman. Target skor Lighthouse Performance ≥ 90.

### 5.3 Foto
- Tempat foto di Hero dan (opsional) di Tentang Saya.
- Foto disediakan pemilik; agent mengonversi/mengompres ke **WebP** dan menyediakan ukuran responsif. Beri `alt` yang deskriptif.
- Jika foto belum ada, tampilkan placeholder netral (inisial nama) tanpa merusak layout.

## 6. Konten dan Data

### 6.1 Prinsip: semua isi di satu file data
Semua teks yang bisa berubah **harus** disimpan di `src/data/` (bukan ditulis langsung di komponen). Menambah proyek baru = menyalin satu blok data dan mengisinya, tanpa menyentuh komponen tampilan.

Berkas yang disarankan:
```
src/data/
  profil.js       // nama, posisi, kalimat nilai jual, tentang saya, foto, tautan CV
  layanan.js      // 3 kartu layanan + pesan awal WhatsApp
  proyek.js       // proyek unggulan + daftar proyek pendukung
  pengalaman.js   // timeline pengalaman, pendidikan, sertifikasi, keahlian
  kontak.js       // WhatsApp, email, LinkedIn
  teks.js         // teks antarmuka (label tombol, judul bagian, dll.)
```

### 6.2 Contoh skema `proyek.js` (agent boleh menyempurnakan)
```js
// Setiap proyek pendukung = satu objek. Untuk menambah proyek, salin satu blok ini.
export const proyekPendukung = [
  {
    id: 'template-coretax',          // unik, tanpa spasi
    judul: 'Template Coretax Otomatis',
    bidang: ['Pajak', 'Otomasi'],     // label di kartu
    ringkas: 'Data Excel menjadi file siap unggah ke Coretax (PPh 21 & Faktur Pajak Keluaran).',
    teknologi: ['JavaScript', 'Excel', 'XML'],
    media: { tipe: 'gambar', sumber: '/media/coretax.webp', alt: '...' }, // atau tipe: 'video' | 'demo'
    tautan: null                      // opsional
  },
  // ...
];
```

### 6.3 Aturan konten
- Teks Indonesia yang rapi dan profesional, tanpa klaim berlebihan.
- Seluruh data dan gambar pada video/screenshot **harus dummy** (nama perusahaan contoh, misalnya "PT Contoh Sejahtera", angka rekaan yang masuk akal dan neraca seimbang). Agent tidak boleh memakai data nyata.
- Tidak ada nama perusahaan, customer, NPWP, atau data keuangan nyata di mana pun di kode, aset, maupun README.

## 7. Spesifikasi Teknis

### 7.1 Tumpukan teknologi
- **React + Vite + Tailwind CSS** (Tailwind sudah terpasang pada template awal pemilik).
- Tanpa React Router (single page, navigasi dengan anchor/scroll).
- Pustaka tambahan seperlunya (misalnya `framer-motion`, pustaka ikon ringan). Hindari pustaka berat.

### 7.2 Struktur folder
Mulai dari struktur awal proyek React + Vite + Tailwind milik pemilik (berisi `public/`, `src/` dengan `App.jsx`, `index.css`, `main.jsx`, serta `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `README.md`), lalu tambahkan:

```
portofolio/
├── public/
│   ├── favicon.svg
│   ├── media/                 // video/gambar besar, file CV (PDF)
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Layanan.jsx
│   │   ├── ProyekUnggulan.jsx
│   │   ├── ProyekPendukung.jsx
│   │   ├── KalkulatorPPN.jsx
│   │   ├── Tentang.jsx
│   │   ├── Kontak.jsx
│   │   └── ui/                // komponen kecil dipakai ulang: KartuProyek, TombolWA, VideoEmbed, Reveal, dll.
│   ├── data/                  // lihat bagian 6.1
│   ├── App.jsx                // menyusun semua bagian sesuai urutan
│   ├── main.jsx
│   └── index.css
├── README.md
└── ...
```

### 7.3 Aturan kode (penting: pemilik adalah pemula yang ingin merawat sendiri)
1. **Satu komponen = satu bagian halaman**, nama file dan nama bagian sama.
2. **Komentar bahasa Indonesia** di setiap berkas dan bagian penting: apa fungsinya, bagian mana yang aman diubah, dan bagian mana yang sebaiknya tidak disentuh.
3. Di bagian atas tiap komponen, tulis blok komentar singkat: *"Bagian ini menampilkan ... Data diambil dari `src/data/....js`. Untuk mengubah teks, edit file data tersebut."*
4. Nama variabel dan fungsi jelas (boleh bahasa Indonesia atau Inggris, tapi **konsisten**).
5. Teks antarmuka di `teks.js` agar penambahan bahasa Inggris nanti cukup menambah satu berkas terjemahan. **Belum perlu membuat fitur pengalih bahasa sekarang.**
6. Tidak ada angka/teks "ajaib" tersebar. Warna, ukuran, dan durasi animasi dikumpulkan di satu tempat konfigurasi.
7. Komponen `VideoEmbed` mendukung dua sumber: YouTube unlisted (iframe) **atau** file MP4 lokal, dipilih lewat data, tanpa mengubah komponen.

### 7.4 README.md (wajib, bahasa Indonesia, untuk pemula)
Harus memuat langkah bertahap dengan contoh:
1. Cara menjalankan secara lokal (`npm install`, `npm run dev`).
2. **Cara menambah proyek baru** (contoh nyata di `proyek.js`).
3. **Cara mengganti foto**, **mengganti video**, **mengganti file CV**.
4. **Cara mengubah teks dan kontak**.
5. **Cara mengubah warna tema**.
6. **Cara build dan mengunggah ke Hostinger** (bagian 8).
7. Peta singkat: "kalau mau mengubah X, buka file Y".

## 8. Deployment ke Hostinger (Share Hosting)

- Situs statis: hasil `npm run build` ada di folder `dist/`.
- Unggah **isi** folder `dist/` (bukan folder `dist` itu sendiri) ke direktori root subdomain `indragunawan.luckywater.web.id` melalui **File Manager** atau FTP Hostinger.
- Pastikan `base` pada `vite.config.js` sesuai (root `/`, karena memakai subdomain).
- Aktifkan HTTPS (SSL) di Hostinger.
- **Video berukuran besar jangan menumpuk di share hosting.** Prioritaskan embed YouTube (unlisted) atau MP4 yang sudah dikompres. Beri catatan ukuran file di README.
- Sertakan langkah memperbarui situs: ubah data → build → unggah ulang `dist/`.

## 9. SEO, Performa, Aksesibilitas

- Judul halaman dan meta description yang relevan (kata kunci: tax accounting, akuntansi pajak, IT support, otomasi, Coretax). Tag Open Graph (judul, deskripsi, gambar pratinjau) agar tautan tampil menarik saat dibagikan di WhatsApp/LinkedIn.
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), heading berurutan, `alt` pada semua gambar.
- Dapat dioperasikan dengan keyboard; fokus terlihat; kontras warna memadai.
- Gambar WebP, `loading="lazy"` untuk gambar di bawah layar pertama, video tidak dimuat otomatis sebelum diputar.
- Target: Lighthouse Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90.

## 10. Privasi dan Keamanan Konten

- Tidak ada data nyata perusahaan atau pelanggan di situs, aset, maupun repositori.
- Tidak ada kunci API atau kredensial di kode.
- Aplikasi laporan keuangan dan tools lain **tidak** dipublikasikan, hanya ditampilkan lewat video/screenshot.
- Kalkulator PPN berjalan penuh di browser dan tidak mengirim data apa pun.
- Pengalaman kerja ditulis umum (tanpa nama perusahaan) sesuai bagian 4.5.

## 11. Data yang Harus Disediakan Pemilik

| Item | Keterangan |
|---|---|
| Nama lengkap dan posisi tampil | Untuk Hero dan judul halaman |
| Foto | Satu foto utama (opsional kedua), latar rapi, wajah jelas |
| Kalimat nilai jual | Boleh pakai usulan di 4.1 |
| Teks "Tentang Saya" | 1–2 paragraf |
| Periode kerja dan poin tugas | Tanpa nama perusahaan |
| Sertifikasi/pelatihan | Opsional |
| Nomor WhatsApp, email, tautan LinkedIn | Untuk bagian Kontak dan tombol layanan |
| File CV (PDF) | Untuk tombol Unduh CV |
| Video rekaman layar proyek unggulan | 60–90 detik, data dummy |
| Screenshot (3–4 laporan keuangan; 1 tiap proyek pendukung) | Data dummy |
| Angka hasil/penghematan waktu | Opsional tapi sangat disarankan |
| File asli kalkulator PPN | Untuk disalin logikanya |
| Foto/cerita pekerjaan IT support | Opsional |

Selama data belum tersedia, agent memakai **placeholder yang jelas** dan menyembunyikan bagian opsional yang kosong.

## 12. Tahapan Pengerjaan (disarankan)

Pemilik akan menguji tiap tahap sebelum lanjut. Berhenti di akhir tiap tahap dan tunggu konfirmasi.

1. **Tahap 1 — Kerangka:** proyek dari struktur awal, Navbar, tema (variabel warna), seluruh bagian dengan teks placeholder, responsif. Data sudah dipisah ke `src/data/`.
2. **Tahap 2 — Isi dan data:** isi semua bagian dari file data, kartu Layanan dengan tombol WhatsApp, kartu proyek, timeline pengalaman, kontak.
3. **Tahap 3 — Media dan demo:** foto, video proyek unggulan, galeri screenshot, Kalkulator PPN interaktif.
4. **Tahap 4 — Animasi dan polesan:** animasi scroll/hover/hitung naik, `prefers-reduced-motion`, SEO dan Open Graph, optimasi gambar, pemeriksaan Lighthouse.
5. **Tahap 5 — README dan rilis:** README lengkap (bagian 7.4), build, panduan unggah ke Hostinger, uji di alamat subdomain.

## 13. Kriteria Penerimaan

- [ ] Semua 6 bagian tampil dan rapi di HP, tablet, dan desktop.
- [ ] Tombol Unduh CV, WhatsApp, email, dan LinkedIn berfungsi (yang kosong tidak tampil).
- [ ] Video proyek unggulan dapat diputar; galeri screenshot dapat diperbesar.
- [ ] Kalkulator PPN menghasilkan angka yang sama dengan kalkulator asli pemilik pada beberapa contoh uji.
- [ ] Animasi halus dan mati bila `prefers-reduced-motion` aktif.
- [ ] Pemilik dapat menambah satu proyek baru **hanya dengan mengedit `src/data/proyek.js`** (diuji mengikuti README).
- [ ] Tidak ada data nyata atau nama perusahaan di mana pun.
- [ ] Lighthouse Performance, Accessibility, dan SEO masing-masing ≥ 90.
- [ ] Situs berjalan di `indragunawan.luckywater.web.id` dengan HTTPS.
- [ ] Kode berkomentar bahasa Indonesia per bagian dan README lengkap.

## 14. Hal yang Diputuskan Agent (jelaskan pilihannya di README)

- Opsi tema A atau B (bagian 5.1).
- Pustaka animasi (`framer-motion` atau CSS murni).
- Sumber video (YouTube unlisted atau MP4 lokal) sesuai ukuran file dan kuota hosting.
- Pemilihan font dan palet warna spesifik dalam arah "profesional + teknis".
