# Panduan Deploy ke Hostinger

Situs ini **statis**: hasil `npm run build` (folder `dist/`) diunggah ke hosting.
Tidak ada database, PHP, atau proses server yang perlu disiapkan.

Berkas alur kerja: `.github/workflows/deploy.yml`.

Cara kerjanya:

```
push ke main → GitHub Actions → npm ci → lint → build → verifikasi → unggah dist/ via FTPS
```

Deploy hanya berjalan dari branch **`main`**. Push ke branch fitur tidak menyentuh
situs produksi. Branch fitur di-merge ke `main` oleh pemilik repo, bukan oleh agent.

---

## 1. Yang harus ada di GitHub (sekali saja)

Buka **Settings → Secrets and variables → Actions → New repository secret**.
Buat tiga rahasia berikut (namanya harus sama, huruf besar):

| Nama secret | Isi | Contoh |
|---|---|---|
| `FTP_SERVER` | alamat server FTP/SFTP dari hPanel | `153.92.13.236` |
| `FTP_USERNAME` | nama pengguna FTP | `u863379326` |
| `FTP_PASSWORD` | kata sandi FTP | *(rahasia)* |

Opsional, dipakai bila folder tujuan bukan `public_html/`:

| Nama secret | Isi | Contoh |
|---|---|---|
| `FTP_SERVER_DIR` | folder tujuan, **diakhiri garis miring** | `domains/indragunawan.luckywater.web.id/public_html/` |

> Jangan pernah menaruh nilai rahasia ini di dalam kode atau di berkas yang di-commit.

## 2. Menentukan folder tujuan (`server-dir`) — langkah paling sering salah

Alamat FTP Hostinger bisa masuk ke salah satu dari dua tempat:

1. **Langsung ke folder domain** → login sudah berada di dalam `public_html`,
   jadi folder tujuannya `public_html/`.
2. **Ke akar akun hosting** → login berada di `/home/<user>`.
   Folder subdomain ada di `domains/<domain>/public_html/`, jadi folder tujuannya:
   `domains/indragunawan.luckywater.web.id/public_html/`

Alur kerja memeriksa keduanya otomatis dan memakai yang ada. Bila ingin memaksa
satu nilai, isi secret **`FTP_SERVER_DIR`**, atau isi kolom `server_dir` saat
menjalankan workflow manual.

Cara memastikan: buka File Manager hPanel, lihat path lengkap folder subdomain
(biasanya ditampilkan di bagian atas berkas). Salin bagian setelah `/home/<user>/`.

**subdomain harus sudah dibuat lebih dulu** di hPanel (menu Subdomains).
Membuat subdomain sekaligus membuat folder `public_html`-nya. Tanpa itu, unggahan
akan gagal dengan pesan `550 No such directory`.

## 3. Uji tanpa mengunggah (dry run) — cara klik dari browser

Alur kerja ini mencari folder tujuan **sendiri**: ia mencoba `domains/<domain>/public_html/`
lalu `public_html/` lewat FTP, dan memilih yang benar-benar ada. Jadi pada umumnya
tidak perlu mengisi apa pun.

1. Buka `https://github.com/Work-Tech-Maker/portofolio/actions`
2. Di kiri, klik **Deploy ke Hostinger (FTPS)**.
3. Klik tombol **Run workflow** (kanan atas) → pilih branch **main**.
4. Isi `dry_run` = **true** (opsional: kolom `server_dir` bila ingin memaksa folder tertentu).
5. Klik **Run workflow** berwarna hijau, tunggu sampai selesai, lalu klik baris hasilnya.
6. Buka langkah **Unggah ke Hostinger**: akan tampil daftar berkas yang *akan*
   dibuat/dihapus, tanpa mengubah apa pun di server.

Bila daftarnya sudah benar (hanya `index.html`, `.htaccess`, `favicon.svg`, dan
berkas di `assets/`), ulangi langkah di atas dengan `dry_run` = **false**.

> Catatan: tombol **Run workflow** hanya muncul bila berkas alur kerja ini sudah ada
> di **branch default** repo. Kalau belum muncul, ubah dulu branch default ke `main`
> di **Settings → General → Default branch**.

## 4. Deploy normal

Setelah alur kerja ini ada di `main`, setiap push ke `main` langsung membangun
dan mengunggah. Selesai deploy, buka `https://indragunawan.luckywater.web.id`
dan lakukan hard-refresh (Ctrl+Shift+R) karena `index.html` sengaja tidak di-cache.

## 5. Kalau gagal

| Gejala | Penyebab biasanya | Tindakan |
|---|---|---|
| `530 Login incorrect` | username/password salah, atau IP diblokir | buat ulang akun FTP di hPanel, perbarui secret |
| `550 No such directory` | `server-dir` salah atau subdomain belum dibuat | perbaiki `FTP_SERVER_DIR`, buat subdomain dulu |
| `ECONNREFUSED` / timeout | server memblokir FTPS pada port 21 | coba `port: 990` dengan `protocol: ftps-legacy`, atau aktifkan FTP di hPanel |
| Situs tampil daftar folder | `index.html` tidak terunggah ke folder yang benar | cek `server-dir`, lihat log "Isi dist" pada langkah verifikasi |
| Halaman blank, aset 404 | `base` di `vite.config.js` bukan `/` | pastikan situs dipasang di **akar** subdomain, bukan subfolder |
| Situs tidak mau dibuka (redirect terus) | SSL subdomain belum aktif sementara `.htaccess` memaksa HTTPS | aktifkan SSL di hPanel, atau matikan sementara blok nomor 1 di `public/.htaccess` |

## 6. Berkas yang ikut terunggah

Hanya isi `dist/`:

```
dist/index.html
dist/.htaccess          (aturan HTTPS, cache, kompresi, 404)
dist/favicon.svg
dist/assets/*.js, *.css (nama berkas mengandung kode unik per build)
```

Berkas di `assets/` di-cache satu tahun oleh `.htaccess` karena namanya berganti
setiap build; `index.html` tidak di-cache supaya perubahan langsung terlihat.