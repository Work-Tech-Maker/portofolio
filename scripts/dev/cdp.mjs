// cdp.mjs — klien CDP kecil memakai WebSocket bawaan Node.
// Dipakai untuk menguji & memotret UI tanpa browser tool hermes.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME =
  process.env.CHROME || '/home/hermes/.hermes/tools/chromium-1208/chrome-linux64/chrome'
const PORT = Number(process.env.CDP_PORT || 9333)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function buka({ lebar = 390, tinggi = 844 } = {}) {
  // Profil Chrome dibuat di folder sementara milik sistem lalu DIHAPUS saat tutup().
  // Penting: /tmp di mesin ini adalah tmpfs kecil (822 MB); membiarkan profil
  // menumpuk sempat membuatnya penuh dan menghentikan penulisan berkas.
  const profil = mkdtempSync(join(tmpdir(), 'cdp-profil-'))
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-dev-shm-usage',
      '--force-device-scale-factor=2',
      `--window-size=${lebar},${tinggi}`,
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profil}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let target = null
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })
      if (r.ok) {
        target = await r.json()
        break
      }
    } catch {
      /* belum siap */
    }
    await sleep(250)
  }
  if (!target) throw new Error('Chrome tidak siap')

  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true })
    ws.addEventListener('error', rej, { once: true })
  })

  let id = 0
  const tunggu = new Map()
  const peristiwa = [] // event CDP (console, exception) untuk keperluan debug
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (!msg.id) {
      peristiwa.push(msg)
    }
    if (msg.id && tunggu.has(msg.id)) {
      const { res, rej } = tunggu.get(msg.id)
      tunggu.delete(msg.id)
      if (msg.error) rej(new Error(JSON.stringify(msg.error)))
      else res(msg.result)
    }
  })

  const cmd = (method, params = {}) =>
    new Promise((res, rej) => {
      const n = ++id
      tunggu.set(n, { res, rej })
      ws.send(JSON.stringify({ id: n, method, params }))
      setTimeout(() => {
        if (tunggu.has(n)) {
          tunggu.delete(n)
          rej(new Error(`timeout: ${method}`))
        }
      }, 20000)
    })

  await cmd('Page.enable')
  await cmd('Runtime.enable')
  await cmd('Log.enable')
  await cmd('Emulation.setDeviceMetricsOverride', {
    width: lebar,
    height: tinggi,
    deviceScaleFactor: 2,
    mobile: true,
  })

  const js = async (ekspresi) => {
    const r = await cmd('Runtime.evaluate', {
      expression: ekspresi,
      returnByValue: true,
      awaitPromise: true,
    })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + (r.exceptionDetails.exception?.description || ''))
    return r.result?.value
  }

  const teks = () => js('document.body.innerText')

  const buka_url = async (url) => {
    await cmd('Page.navigate', { url })
    for (let i = 0; i < 60; i++) {
      await sleep(250)
      try {
        if ((await js('document.readyState')) === 'complete') break
      } catch {
        /* belum */
      }
    }
    await sleep(600)
  }

  const klik = async (selektor) => {
    const ok = await js(`(() => {
      const el = document.querySelector(${JSON.stringify(selektor)});
      if (!el) return false;
      el.click();
      return true;
    })()`)
    if (!ok) throw new Error(`elemen tidak ada: ${selektor}`)
    await sleep(350)
  }

  // Klik tombol/tautan pertama yang teksnya memuat `teksDicari`.
  // `dalam` membatasi pencarian ke dalam satu wadah (mis. '[role="dialog"]').
  const klikTeks = async (teksDicari, dalam = 'body') => {
    const ok = await js(`(() => {
      const akar = document.querySelector(${JSON.stringify(dalam)}) || document.body;
      const semua = Array.from(akar.querySelectorAll('button, a'));
      const el = semua.find((e) => e.innerText.trim().toLowerCase().includes(${JSON.stringify(
        teksDicari.toLowerCase(),
      )}));
      if (!el) return false;
      el.click();
      return true;
    })()`)
    if (!ok) throw new Error(`tombol berteks "${teksDicari}" tidak ada di ${dalam}`)
    await sleep(350)
  }

  // Klik baris/elemen yang memuat teks tertentu (bukan sekadar tombol pertama).
  const klikBarisMemuat = async (teksDicari) => {
    const ok = await js(`(() => {
      const el = Array.from(document.querySelectorAll('button')).find((e) =>
        e.innerText.toLowerCase().includes(${JSON.stringify(teksDicari.toLowerCase())}),
      );
      if (!el) return false;
      el.click();
      return true;
    })()`)
    if (!ok) throw new Error(`baris memuat "${teksDicari}" tidak ada`)
    await sleep(500)
  }

  const isi = async (selektor, nilai) => {
    const ok = await js(`(() => {
      const el = document.querySelector(${JSON.stringify(selektor)});
      if (!el) return false;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, ${JSON.stringify(String(nilai))});
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`)
    if (!ok) throw new Error(`isian tidak ada: ${selektor}`)
    await sleep(200)
  }

  const pilih = async (selektor, nilai) => {
    const ok = await js(`(() => {
      const el = document.querySelector(${JSON.stringify(selektor)});
      if (!el) return false;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
      setter.call(el, ${JSON.stringify(String(nilai))});
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`)
    if (!ok) throw new Error(`pilihan tidak ada: ${selektor}`)
    await sleep(200)
  }

  // Tunggu sampai sebuah elemen muncul (untuk halaman/komponen yang dimuat malas).
  const tungguElemen = async (selektor, batasMs = 10000) => {
    const mulai = Date.now()
    while (Date.now() - mulai < batasMs) {
      const ada = await js(`!!document.querySelector(${JSON.stringify(selektor)})`)
      if (ada) return true
      await sleep(250)
    }
    throw new Error(`elemen tidak muncul dalam ${batasMs} ms: ${selektor}`)
  }

  const potret = async (berkas, tinggiPenuh = false) => {
    let clip
    if (tinggiPenuh) {
      // Ukur dari halaman, bukan dari nilai awal: lebar/tinggi bisa berubah
      // setelah Emulation.setDeviceMetricsOverride.
      const ukuran = JSON.parse(
        await js(`JSON.stringify({
          w: window.innerWidth,
          h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        })`),
      )
      clip = { x: 0, y: 0, width: ukuran.w, height: Math.min(ukuran.h, 20000), scale: 1 }
    }
    const r = await cmd('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: tinggiPenuh,
      ...(clip ? { clip } : {}),
    })
    writeFileSync(berkas, Buffer.from(r.data, 'base64'))
    return berkas
  }

  const tutup = () => {
    try {
      ws.close()
    } catch {
      /* abaikan */
    }
    chrome.kill()
    // Tunggu Chrome benar-benar berhenti sebelum menghapus profilnya.
    setTimeout(() => {
      try {
        rmSync(profil, { recursive: true, force: true })
      } catch {
        /* abaikan */
      }
    }, 800)
  }

  /** Kumpulan error konsol & exception halaman sejak awal. */
  const galatHalaman = () =>
    peristiwa
      .filter((e) => e.method === 'Runtime.exceptionThrown' || e.method === 'Runtime.consoleAPICalled' || e.method === 'Log.entryAdded')
      .map((e) => {
        if (e.method === 'Runtime.exceptionThrown') {
          const d = e.params.exceptionDetails
          return `[exception] ${d.text} ${d.exception?.description || ''}`.trim()
        }
        if (e.method === 'Log.entryAdded') {
          return `[log:${e.params.entry.level}] ${e.params.entry.text}`
        }
        const args = (e.params.args || []).map((a) => a.description || a.value || '').join(' ')
        return `[console:${e.params.type}] ${args}`
      })

  return { cmd, js, teks, galatHalaman, buka_url, klik, klikTeks, klikBarisMemuat, isi, pilih, potret, tungguElemen, tutup, sleep }
}
