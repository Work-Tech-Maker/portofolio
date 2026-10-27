/**
 * Bagian.jsx — pembungkus satu bagian halaman.
 *
 * Fungsinya:
 *  1. memberi jarak vertikal & lebar kontainer yang sama untuk semua bagian
 *     (PRD §5.1: konsisten dan responsif),
 *  2. menandai zona warna lewat `data-zona` — dipakai Navbar untuk mengganti
 *     warnanya saat melewati bagian gelap (DESIGN.md §2),
 *  3. menyediakan judul bagian dengan garis emas pendek.
 *
 * Untuk mengubah tampilan semua bagian sekaligus, edit berkas ini.
 * Untuk mengubah teks judul, edit src/data/teks.js.
 */

export default function Bagian({
  id,
  zona = 'terang',
  judul,
  sub,
  children,
  className = '',
  tanpaJudul = false,
  rapatAtas = false,
}) {
  const gelap = zona === 'gelap'

  return (
    <section
      id={id}
      data-zona={zona}
      data-jangkar
      aria-labelledby={judul ? `${id}-judul` : undefined}
      className={`relative ${gelap ? 'bg-gelap-bg text-gelap-ink' : 'bg-terang-bg text-terang-ink'} ${className}`}
    >
      {/* Tekstur kisi hanya di zona gelap, sebagai lapisan belakang (tidak menangkap klik) */}
      {gelap ? (
        <span aria-hidden="true" className="latar-kisi pointer-events-none absolute inset-0" />
      ) : null}

      <div
        className={`relative mx-auto w-full max-w-isi px-5 md:px-8 ${
          rapatAtas ? 'pb-16 pt-0 md:pb-24 md:pt-0' : 'py-16 md:py-24'
        }`}
      >
        {!tanpaJudul && judul ? (
          <header className="mb-10 max-w-2xl md:mb-14">
            {/* Garis emas pendek sebagai penanda judul (DESIGN.md §6) */}
            <span
              aria-hidden="true"
              className={`mb-4 block h-1 w-10 rounded-full ${gelap ? 'bg-emas-terang' : 'bg-emas'}`}
            />
            <h2
              id={`${id}-judul`}
              className={`text-h2 md:text-[38px] md:leading-[44px] ${gelap ? 'text-gelap-ink' : 'text-terang-ink'}`}
            >
              {judul}
            </h2>
            {sub ? (
              <p
                className={`mt-3 text-body-lg ${gelap ? 'text-gelap-ink-2' : 'text-terang-ink-2'}`}
              >
                {sub}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  )
}

/**
 * Gradasi perpindahan zona (DESIGN.md §2): 128 px, dari warna satu zona ke zona
 * berikutnya, supaya pergantian terang -> gelap tidak terasa mendadak.
 */
export function TransisiZona({ dari = 'terang', ke = 'gelap' }) {
  const kelasDari = dari === 'gelap' ? 'from-gelap-bg' : 'from-terang-bg'
  const kelasKe = ke === 'gelap' ? 'to-gelap-bg' : 'to-terang-bg'
  return (
    <div
      aria-hidden="true"
      className={`zona-transisi bg-gradient-to-b ${kelasDari} ${kelasKe}`}
    />
  )
}
