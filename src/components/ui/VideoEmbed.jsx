/**
 * VideoEmbed.jsx — pemutar video proyek unggulan (PRD §7.3 butir 7).
 *
 * Mendukung DUA sumber, dipilih lewat data (src/data/proyek.js):
 *   { tipe: 'youtube', id: 'XXXXXXXXXXX' }   -> YouTube unlisted (iframe)
 *   { tipe: 'mp4', src: '/media/demo.mp4' }  -> berkas MP4 lokal
 *
 * Kenapa tidak autoplay? Supaya video tidak memakan kuota pengunjung dan tidak
 * memperlambat halaman (PRD §9). Iframe YouTube baru dimuat SETELAH tombol putar
 * ditekan; MP4 memakai preload="none".
 *
 * Komponen ini tidak perlu diubah saat Anda mengganti video — cukup ubah data.
 */

import { Play } from 'lucide-react'
import { useState } from 'react'

import { teks } from '../../data/teks'
import MediaPlaceholder from './MediaPlaceholder'

export default function VideoEmbed({ video }) {
  const [diputar, setDiputar] = useState(false)

  const adaVideo = video && ((video.tipe === 'youtube' && video.id) || (video.tipe === 'mp4' && video.src))

  // Belum ada video: tampilkan kotak placeholder yang tetap rapi.
  if (!adaVideo) {
    return (
      <div className="relative">
        <MediaPlaceholder rasio="16 / 9" label={teks.catatan.videoMenyusul} zona="gelap" />
        {video?.judul ? (
          <p className="mt-3 text-label text-gelap-ink-2">{video.judul}</p>
        ) : null}
      </div>
    )
  }

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-media border border-gelap-border bg-gelap-surface">
        {!diputar ? (
          <button
            type="button"
            onClick={() => setDiputar(true)}
            className="group relative flex aspect-video w-full items-center justify-center"
            aria-label={`${teks.tombol.putarVideo}: ${video.judul || 'video proyek'}`}
          >
            {video.poster ? (
              <img
                src={video.poster}
                alt=""
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            ) : null}
            <span
              className="relative flex size-16 items-center justify-center rounded-full bg-teal-terang text-[#04201F] transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <Play size={26} strokeWidth={2} fill="currentColor" />
            </span>
          </button>
        ) : video.tipe === 'youtube' ? (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.judul || 'Video proyek'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video className="aspect-video w-full" src={video.src} controls preload="none" playsInline>
            <track kind="captions" />
          </video>
        )}
      </div>

      {video.judul ? (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 text-label text-gelap-ink-2">
          <span>{video.judul}</span>
          {video.durasi ? <span className="text-gelap-ink-3">· {video.durasi}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
