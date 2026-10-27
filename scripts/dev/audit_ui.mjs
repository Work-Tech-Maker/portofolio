/**
 * audit_ui.mjs — pemeriksa otomatis tata letak & aksesibilitas Tahap 1.
 *
 * Cara pakai (dari folder proyek, dev server harus jalan):
 *   npm run dev -- --host 127.0.0.1 --port 5175   (terminal lain)
 *   node scripts/dev/audit_ui.mjs http://127.0.0.1:5175/
 *
 * Yang diperiksa:
 *   1. tidak ada gulir mendatar (elemen keluar layar)
 *   2. tepat satu <h1>, dan urutan judul menurun wajar
 *   3. setiap <img> punya atribut alt
 *   4. setiap tombol/tautan punya nama (teks atau aria-label)
 *   5. target sentuh minimal 44 px (PRD §5.2, §9)
 *   6. semua bagian punya isi dan tampil (opacity 1) setelah digulir
 *
 * Keluar dengan kode 1 bila ada pemeriksaan yang gagal, supaya bisa dipakai
 * sebagai gerbang sebelum commit.
 */

import { buka } from './cdp.mjs'

const ALAMAT = process.argv[2] || 'http://127.0.0.1:5175/'
const BAGIAN = ['layanan', 'proyek', 'proyek-pendukung', 'kalkulator', 'tentang', 'kontak']

const galat = []
const cek = (syarat, pesan) => {
  if (syarat) {
    console.log(`  OK   ${pesan}`)
  } else {
    console.log(`  GAGAL ${pesan}`)
    galat.push(pesan)
  }
}

/** Gulir bertahap agar animasi "muncul saat digulir" terpicu semua. */
async function picuAnimasi(b) {
  const tinggi = await b.js('document.documentElement.scrollHeight')
  for (let y = 0; y < tinggi; y += 400) {
    await b.js(`window.scrollTo(0, ${y})`)
    await b.sleep(100)
  }
  await b.js('window.scrollTo(0, 0)')
  await b.sleep(700)
}

async function periksa(b, label) {
  console.log(`\n== ${label} (${await b.js('window.innerWidth')} px) ==`)
  await picuAnimasi(b)

  const laporan = JSON.parse(
    await b.js(`(() => {
      const lebarLayar = window.innerWidth;
      const meluber = Array.from(document.querySelectorAll('main *')).filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > lebarLayar + 1 || r.left < -1;
      }).map((e) => e.tagName + '.' + String(e.className).slice(0, 40));

      const judul = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
      const tingkat = judul.map((h) => Number(h.tagName[1]));
      let urutanSalah = 0;
      for (let i = 1; i < tingkat.length; i++) if (tingkat[i] - tingkat[i - 1] > 1) urutanSalah++;

      const gambar = Array.from(document.querySelectorAll('img'));
      const tanpaAlt = gambar.filter((i) => !i.hasAttribute('alt')).length;

      const tanpaNama = Array.from(document.querySelectorAll('button, a')).filter((e) => {
        const teks = (e.innerText || '').trim();
        return !teks && !e.getAttribute('aria-label');
      }).length;

      const targetKecil = Array.from(document.querySelectorAll('main a, main button, header a, header button, footer a, footer button'))
        .filter((e) => {
          const r = e.getBoundingClientRect();
          const cs = getComputedStyle(e);
          return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && (r.height < 44 || r.width < 24);
        })
        .map((e) => (e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30));

      const bagian = ${JSON.stringify(BAGIAN)}.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, ada: false };
        const daun = Array.from(el.querySelectorAll('*')).filter((e) => e.children.length === 0);
        const transparan = daun.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length;
        return { id, ada: true, tinggi: Math.round(el.getBoundingClientRect().height), panjangTeks: el.innerText.trim().length, transparan, jumlahH1DiDalam: el.querySelectorAll('h1').length };
      });

      // Periksa penanda data yang belum diisi tidak bocor ke tampilan
      const bocorPenanda = (document.body.innerText.match(/\\[ISI[^\\]]*\\]/g) || []).length;

      return JSON.stringify({
        lebarLayar, meluber, h1: document.querySelectorAll('h1').length, urutanSalah,
        jumlahGambar: gambar.length, tanpaAlt, tanpaNama, targetKecil,
        bagian, bocorPenanda, judulHalaman: document.title,
        metaDeskripsi: document.querySelector('meta[name="description"]')?.content?.length || 0,
        ogJudul: document.querySelector('meta[property="og:title"]')?.content || '',
      });
    })()`),
  )

  cek(laporan.meluber.length === 0, `tidak ada elemen keluar layar (${laporan.meluber.slice(0, 3).join(', ') || 'bersih'})`)
  cek(laporan.h1 === 1, `tepat satu <h1> (ditemukan ${laporan.h1})`)
  cek(laporan.urutanSalah === 0, `urutan judul menurun wajar (lompatan: ${laporan.urutanSalah})`)
  cek(laporan.tanpaAlt === 0, `semua gambar punya alt (${laporan.jumlahGambar} gambar)`)
  cek(laporan.tanpaNama === 0, `semua tombol/tautan punya nama (${laporan.tanpaNama} tanpa nama)`)
  cek(laporan.targetKecil.length === 0, `target sentuh >= 44 px (kecil: ${laporan.targetKecil.join(', ') || 'tidak ada'})`)
  cek(laporan.bocorPenanda === 0, `tidak ada penanda [ISI: …] bocor ke tampilan (${laporan.bocorPenanda})`)
  cek(laporan.metaDeskripsi > 50, `meta deskripsi terisi (${laporan.metaDeskripsi} karakter)`)
  cek(Boolean(laporan.ogJudul), `og:title terisi ("${laporan.ogJudul}")`)

  for (const s of laporan.bagian) {
    cek(s.ada && s.tinggi > 200 && s.panjangTeks > 80, `bagian #${s.id}: tinggi ${s.tinggi}px, teks ${s.panjangTeks} karakter`)
    if (s.ada) cek(s.transparan === 0, `bagian #${s.id}: semua elemen tampil (transparan: ${s.transparan})`)
    if (s.ada) cek(s.jumlahH1DiDalam === 0, `bagian #${s.id}: tidak ada <h1> tambahan`)
  }
}

for (const ukuran of [
  { label: 'HP', lebar: 390, tinggi: 844 },
  { label: 'Tablet', lebar: 834, tinggi: 1112 },
  { label: 'Desktop', lebar: 1440, tinggi: 900 },
]) {
  const b = await buka({ lebar: ukuran.lebar, tinggi: ukuran.tinggi })
  try {
    await b.buka_url(ALAMAT)
    await b.tungguElemen('#layanan', 15000)
    await b.sleep(700)
    await periksa(b, ukuran.label)
  } catch (e) {
    console.log(`  GAGAL ${ukuran.label}: ${e.message}`)
    galat.push(`${ukuran.label}: ${e.message}`)
  } finally {
    b.tutup()
  }
}

console.log(`\n${galat.length === 0 ? 'SEMUA LULUS' : `GAGAL ${galat.length}`}`)
process.exit(galat.length === 0 ? 0 : 1)