/**
 * main.jsx — titik masuk aplikasi.
 *
 * Tidak perlu diubah saat menambah konten. Semua isi halaman disusun di
 * src/App.jsx, dan datanya ada di src/data/.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
