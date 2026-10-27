/**
 * profil.js — data diri untuk bagian Hero dan Tentang Saya.
 *
 * Yang AMAN diubah: semua nilai di bawah ini.
 * Catatan: teks yang ditandai DUMMY adalah contoh supaya tata letak bisa dilihat.
 * Ganti dengan data asli sebelum situs dipublikasikan (PRD §11).
 */

export const profil = {
  nama: 'Indra Gunawan',

  // Posisi yang tampil di Hero dan judul halaman
  posisi: 'Tax Accounting & IT Support',

  // Satu kalimat nilai jual. Usulan dari PRD §4.1, boleh disesuaikan.
  nilaiJual:
    'Akuntansi dan pajak yang paham teknologi: saya membangun alat otomasi yang menghemat waktu kerja.',

  // Empat penanda keahlian yang tampil sebagai label kecil di bawah tombol Hero.
  // Tujuan: pengunjung paham bidangnya dalam ±10 detik (PRD §2 tujuan 1).
  keunggulan: ['Coretax & SPT Tahunan', 'ACCURATE Online', 'Otomasi Excel', 'IT Support'],

  // Foto utama di Hero. Taruh berkasnya di public/media/ lalu tulis path-nya di sini.
  // Kosongkan ('') untuk memakai placeholder inisial nama — tata letak tetap rapi.
  foto: '',
  fotoAlt: 'Foto Indra Gunawan',

  // Tautan file CV (PDF). Taruh PDF-nya di public/media/.
  // Kosongkan ('') bila belum ada — tombol Unduh CV otomatis disembunyikan.
  cv: '',

  // Paragraf "Tentang Saya" (PRD §4.5). DUMMY — ganti dengan cerita sendiri.
  tentang: [
    'Saya bekerja di persimpangan dua bidang: akuntansi dan pajak di satu sisi, teknologi di sisi lain. Sebagian besar waktu saya dipakai menyusun laporan keuangan, menghitung koreksi fiskal, dan menyiapkan data SPT Tahunan.',
    'Dari pekerjaan itu saya belajar satu hal: bagian yang paling melelahkan biasanya bukan analisisnya, melainkan pekerjaan manual yang berulang — memindahkan angka dari Excel ke aplikasi pajak, menyalin nota satu per satu, menyusun template impor. Karena itu saya membangun sendiri alat bantunya, supaya waktu yang tersisa bisa dipakai untuk hal yang benar-benar butuh pertimbangan.',
  ],

  // Foto kedua di bagian Tentang (opsional). Kosongkan bila tidak ada.
  fotoKedua: '',
  fotoKeduaAlt: 'Suasana bekerja',
}
