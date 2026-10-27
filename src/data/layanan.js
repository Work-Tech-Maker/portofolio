/**
 * layanan.js — tiga kartu layanan (PRD §4.2).
 *
 * Untuk mengubah isi kartu, edit teks di bawah. Untuk menambah layanan keempat,
 * salin satu blok objek dan ubah isinya — tata letak menyesuaikan sendiri.
 *
 * `pesanWa` adalah pesan awal yang otomatis terisi saat pengunjung menekan
 * tombol "Konsultasi via WhatsApp".
 */

import { FileSpreadsheet, Workflow, Wrench } from 'lucide-react'

export const layanan = [
  {
    id: 'laporan-spt',
    ikon: FileSpreadsheet,
    judul: 'Laporan Keuangan & SPT Tahunan',
    ringkas:
      'Penyusunan laporan keuangan yang rapi dan siap dipakai untuk pelaporan pajak, dari buku besar sampai angka final.',
    poin: [
      'Laporan Laba Rugi, Neraca, dan Perubahan Ekuitas',
      'Perhitungan koreksi fiskal',
      'Penyiapan data SPT Tahunan badan maupun pribadi',
    ],
    pesanWa:
      'Halo, saya ingin konsultasi soal penyusunan laporan keuangan dan SPT Tahunan.',
  },
  {
    id: 'tools-otomasi',
    ikon: Workflow,
    judul: 'Tools Otomasi Bisnis',
    ringkas:
      'Pekerjaan manual yang berulang saya ubah menjadi alat yang berjalan sendiri, dengan hasil langsung siap diunggah ke sistem.',
    poin: [
      'Template impor Coretax dan ACCURATE Online',
      'Rekap otomatis dari data Excel yang sudah ada',
      'Alat kecil sesuai alur kerja Anda, bukan sebaliknya',
    ],
    pesanWa:
      'Halo, saya ingin konsultasi soal otomasi pekerjaan administrasi di tempat saya.',
  },
  {
    id: 'it-support',
    ikon: Wrench,
    judul: 'IT Support',
    ringkas:
      'Bantuan teknis untuk perangkat dan jaringan kantor maupun rumah, dari pemasangan sampai penelusuran masalah.',
    poin: [
      'Instalasi sistem operasi dan aplikasi',
      'Pengaturan jaringan dan perangkat kantor',
      'Pembuatan website sederhana dan troubleshooting',
    ],
    pesanWa: 'Halo, saya butuh bantuan IT support untuk perangkat atau jaringan.',
  },
]
