import { useEffect, useState } from 'react'

export const cn = (...a) => a.filter(Boolean).join(' ')

// Works under any base path (Netlify, GitHub Pages sub-folder, etc.)
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif']
const cache = new Map()

const probe = (url) =>
  new Promise((res) => {
    const i = new Image()
    i.onload = () => res(true)
    i.onerror = () => res(false)
    i.src = url
  })

/** Finds <base>.jpg / .png / .webp ... whichever exists. Resolves to a url or null. */
export function resolveImage(base) {
  if (cache.has(base)) return cache.get(base)
  const hasExt = /\.(jpe?g|png|webp|avif|gif)$/i.test(base)
  const list = hasExt ? [base] : EXTS.map((e) => `${base}.${e}`)
  const p = (async () => {
    for (const c of list) if (await probe(asset(c))) return asset(c)
    return null
  })()
  cache.set(base, p)
  return p
}

/** undefined = still checking, null = no file, string = url */
export function useImage(base) {
  const [src, setSrc] = useState(undefined)
  useEffect(() => {
    let live = true
    resolveImage(base).then((s) => live && setSrc(s))
    return () => { live = false }
  }, [base])
  return src
}
