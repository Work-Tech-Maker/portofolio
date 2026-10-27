/**
 * teks.js — semua teks antarmuka (label tombol, judul bagian, catatan kecil).
 *
 * Kenapa dipisah? Supaya nanti bisa ditambah bahasa Inggris hanya dengan
 * menambah satu berkas terjemahan (PRD §7.3 butir 5). Sekarang masih satu bahasa.
 *
 * Yang AMAN diubah di sini: semua kalimat di bawah.
 * Yang JANGAN diubah: nama kunci (kata di sebelah kiri titik dua), karena
 * komponen mengambil teks berdasarkan kunci tersebut.
 */

/**
 * MODE_DUMMY — penanda bahwa situs masih memakai contoh isi.
 *
 * true  = angka "Hasil" dan tautan kontak memakai contoh (untuk melihat tata letak)
 * false = hanya data asli yang tampil; yang kosong otomatis disembunyikan
 *
 * WAJIB diubah menjadi false sebelum situs dipublikasikan (PRD §11 & §10).
 */
export const MODE_DUMMY = true

export const teks = {
  // Navigasi
  nav: {
    layanan: 'Layanan',
    proyek: 'Proyek',
    tentang: 'Tentang',
    kontak: 'Kontak',
    unduhCv: 'Unduh CV',
    bukaMenu: 'Buka menu',
    tutupMenu: 'Tutup menu',
    keAtas: 'Kembali ke atas',
  },

  // Judul bagian
  bagian: {
    layanan: 'Layanan',
    layananSub: 'Tiga hal yang paling sering saya bantu.',
    proyekUnggulan: 'Proyek Unggulan',
    proyekUnggulanSub: 'Studi kasus: masalah, solusi, fitur, dan hasil.',
    proyekPendukung: 'Proyek Pendukung',
    proyekPendukungSub: 'Alat kecil yang menghemat waktu tiap hari.',
    tentang: 'Tentang Saya',
    tentangSub: 'Pengalaman, pendidikan, dan keahlian.',
    kontak: 'Kontak',
    kontakSub: 'Mari bicara soal pekerjaan Anda.',
  },

  // Tombol
  tombol: {
    hubungi: 'Hubungi Saya',
    konsultasi: 'Konsultasi via WhatsApp',
    putarVideo: 'Putar video',
    lihatProyek: 'Lihat proyek',
    cobaKalkulator: 'Coba kalkulator',
    tutup: 'Tutup',
    sebelumnya: 'Sebelumnya',
    berikutnya: 'Berikutnya',
  },

  // Label studi kasus proyek unggulan
  studiKasus: {
    masalah: 'Masalah',
    solusi: 'Solusi',
    fitur: 'Fitur unggulan',
    hasil: 'Hasil',
    teknologi: 'Teknologi',
  },

  // Kalkulator PPN
  kalkulator: {
    judul: 'Kalkulator PPN',
    sub: 'Hitung DPP Nilai Lain dan PPN dari harga jual.',
    labelHarga: 'Harga jual / DPP (Rp)',
    labelMewah: 'Barang/jasa mewah',
    dpp: 'DPP',
    dppNilaiLain: 'DPP Nilai Lain',
    ppn: 'PPN',
    total: 'Total',
    catatan: 'Alat bantu hitung untuk simulasi, bukan pengganti konsultasi pajak.',
    placeholder: '0',
  },

  // Catatan kecil / status
  catatan: {
    sedangDikembangkan: 'Demo interaktif sedang disiapkan.',
    galeri: 'Klik gambar untuk memperbesar.',
  },

  // Footer
  footer: {
    hakCipta: 'Hak cipta dilindungi.',
    dibuatDengan: 'Dibangun dengan React, Vite, dan Tailwind CSS.',
  },
}
