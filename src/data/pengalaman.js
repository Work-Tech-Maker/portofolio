/**
 * pengalaman.js — timeline pengalaman, pendidikan, sertifikasi, dan keahlian
 * (PRD §4.5).
 *
 * PENTING (PRD §10): nama perusahaan, pelanggan, dan data internal TIDAK boleh
 * ditulis. Gunakan bentuk umum seperti "Perusahaan Manufaktur".
 *
 * DUMMY: periode dan poin tugas di bawah adalah contoh. Ganti dengan yang asli.
 */

export const pengalaman = [
  {
    id: 'akuntansi-pajak',
    peran: 'Staf Akuntansi & Pajak',
    tempat: 'Perusahaan Manufaktur',
    periode: 'DUMMY — 20XX – sekarang',
    poin: [
      'Menyusun laporan keuangan bulanan dan tahunan',
      'Menghitung koreksi fiskal dan menyiapkan data SPT Tahunan',
      'Menyiapkan pelaporan PPh 21 dan faktur pajak',
    ],
  },
  {
    id: 'administrasi-keuangan',
    peran: 'Staf Administrasi Keuangan',
    tempat: 'Perusahaan Distribusi',
    periode: 'DUMMY — 20XX – 20XX',
    poin: [
      'Mengelola kas kecil dan rekonsiliasi harian',
      'Membuat rekap penjualan dan pembelian untuk manajemen',
    ],
  },
  {
    id: 'it-support',
    peran: 'IT Support & Otomasi',
    tempat: 'Proyek lepas',
    periode: 'DUMMY — 20XX – sekarang',
    poin: [
      'Merancang alat otomasi untuk pekerjaan administrasi berulang',
      'Instalasi dan perawatan perangkat serta jaringan kantor kecil',
    ],
  },
]

export const pendidikan = [
  {
    id: 'd3-teknik-komputer',
    jenjang: 'D3 Teknik Komputer',
    institusi: 'Universitas Pakuan',
    keterangan: '',
  },
  {
    id: 'smk-elektronika',
    jenjang: 'SMKN 1 Gunung Putri',
    institusi: 'Teknik Elektronika Industri',
    keterangan: '',
  },
]

/**
 * Sertifikasi / pelatihan / brevet (opsional).
 * Kosongkan array ini bila belum ada — bagiannya otomatis tidak ditampilkan.
 */
export const sertifikasi = [
  // Contoh bentuk:
  // { id: 'brevet-ab', nama: 'Brevet AB', penerbit: 'Institusi', tahun: '20XX' },
]

/**
 * Keahlian, dikelompokkan (PRD §4.5).
 * Tambah atau kurangi item sesuai kemampuan sebenarnya.
 */
export const keahlian = [
  {
    id: 'pajak-akuntansi',
    kelompok: 'Pajak & Akuntansi',
    butir: ['Coretax', 'PPN', 'PPh 21', 'ACCURATE Online', 'Laporan keuangan', 'Koreksi fiskal'],
  },
  {
    id: 'it',
    kelompok: 'IT',
    butir: [
      'Otomasi pekerjaan',
      'Pengembangan web',
      'Jaringan',
      'Instalasi sistem operasi',
      'Server rumah & virtualisasi',
    ],
  },
]
