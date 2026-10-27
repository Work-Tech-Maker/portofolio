/**
 * proyek.js — proyek unggulan dan proyek pendukung (PRD §4.3 & §4.4).
 *
 * CARA MENAMBAH PROYEK BARU (PRD §13):
 *   salin satu blok objek di `proyekPendukung`, ubah isinya, selesai.
 *   Tidak perlu menyentuh komponen tampilan.
 *
 * Aturan isi (PRD §10): semua gambar/video memakai data dummy, tanpa nama
 * perusahaan atau pelanggan nyata.
 */

import { MODE_DUMMY } from './teks.js'

/* =============================================================================
   PROYEK UNGGULAN — satu studi kasus besar
   ========================================================================== */
export const proyekUnggulan = {
  id: 'tools-laporan-spt',
  judul: 'Tools Laporan Keuangan & SPT Tahunan',
  bidang: ['Pajak', 'Akuntansi', 'Otomasi'],
  ringkas:
    'Aplikasi web buatan sendiri untuk menyusun laporan keuangan dan menyiapkan angka PPh tahunan, badan maupun pribadi.',

  masalah:
    'Setiap awal tahun, rekap laporan keuangan dibuat ulang secara manual di Excel. Setelah itu angkanya diinput satu per satu ke Coretax, sehingga rawan salah ketik dan memakan waktu berhari-hari.',

  solusi:
    'Aplikasi web yang menyusun Laba Rugi, Neraca, dan Perubahan Ekuitas secara otomatis dari jurnal yang sama, menghitung penyusutan komersial dan fiskal, lalu menyiapkan angka sesuai format Coretax.',

  fitur: [
    'Mendukung beberapa perusahaan dan beberapa tahun buku',
    'Kunci tahun dan saldo awal otomatis, jadi angka tahun lalu tidak berubah',
    'Perhitungan penyusutan komersial dan fiskal berdampingan',
    'Koreksi fiskal tersusun otomatis dari selisih yang ditemukan',
    'Ekspor PDF dan Excel dengan kolom tanda tangan yang bisa disesuaikan',
  ],

  // `hasil` adalah KLAIM FAKTUAL. Biarkan null sampai pemilik punya angkanya.
  // Saat MODE_DUMMY aktif, `hasilDummy` dipakai supaya tata letak bisa dinilai.
  hasil: null,
  hasilDummy: 'Waktu penyusunan laporan tahunan turun dari hitungan hari menjadi hitungan jam.',

  teknologi: ['React', 'Vite', 'Tailwind CSS', 'PHP', 'MariaDB'],

  // Media: video rekaman layar + galeri screenshot.
  // `tipe` bisa 'youtube' (unlisted) atau 'mp4' (berkas lokal di public/media/).
  // Komponen VideoEmbed menangani keduanya tanpa perlu diubah (PRD §7.3 butir 7).
  video: {
    tipe: 'youtube',
    id: MODE_DUMMY ? 'dQw4w9WgXcQ' : '', // DUMMY: ganti dengan ID video unlisted Anda
    src: '', // dipakai bila tipe = 'mp4', contoh: '/media/demo-laporan.mp4'
    poster: '', // gambar poster, contoh: '/media/demo-poster.webp'
    judul: 'Rekaman layar: menyusun laporan dan menyiapkan angka SPT',
    durasi: '±90 detik',
  },

  // Galeri screenshot. DUMMY: berkas gambar belum ada, komponen menampilkan
  // kotak placeholder yang tetap rapi.
  galeri: [
    { sumber: '', alt: 'Laporan Laba Rugi dengan koreksi fiskal' },
    { sumber: '', alt: 'Neraca dan Perubahan Ekuitas' },
    { sumber: '', alt: 'Daftar penyusutan komersial dan fiskal' },
    { sumber: '', alt: 'Ringkasan angka siap input Coretax' },
  ],

  tautan: null, // aplikasi aslinya tidak dibuka publik (PRD §4.3)
}

/* =============================================================================
   PROYEK PENDUKUNG — kartu-kartu kecil
   ========================================================================== */
export const proyekPendukung = [
  {
    id: 'template-coretax',
    judul: 'Template Coretax Otomatis',
    bidang: ['Pajak', 'Otomasi'],
    ringkas:
      'Data Excel diubah menjadi file siap unggah ke Coretax untuk PPh 21 dan Faktur Pajak Keluaran.',
    teknologi: ['JavaScript', 'Excel', 'XML'],
    media: { tipe: 'gambar', sumber: '', alt: 'Contoh berkas template Coretax' },
    tautan: null,
  },
  {
    id: 'petty-cash-ocr',
    judul: 'Otomasi Petty Cash dari Foto',
    bidang: ['Akuntansi', 'Otomasi'],
    ringkas:
      'Foto nota dibaca otomatis lalu diubah menjadi template impor yang siap diunggah ke ACCURATE Online.',
    teknologi: ['OCR', 'JavaScript', 'ACCURATE Online'],
    media: { tipe: 'gambar', sumber: '', alt: 'Contoh nota dan hasil ekstraksinya' },
    tautan: null,
  },
  {
    id: 'kalkulator-ppn',
    judul: 'Kalkulator PPN',
    bidang: ['Pajak', 'Otomasi'],
    ringkas:
      'Menghitung DPP Nilai Lain dan PPN dari harga jual. Bisa dicoba langsung di halaman ini.',
    teknologi: ['React', 'JavaScript'],
    media: { tipe: 'demo', sumber: '', alt: 'Demo kalkulator PPN' },
    tautan: null,
    demoDiHalaman: true, // kartu ini mengarah ke bagian kalkulator di bawah
  },
]
