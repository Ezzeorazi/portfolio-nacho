import type { MetadataRoute } from 'next'

const BASE = process.env.SITE_URL || 'https://nachorodriguezmusic.com'

// Rutas estáticas como pares [pathES, pathEN] (sin prefijo de locale).
// Coinciden con los pathnames localizados de i18n/routing.ts.
const PAGES: Array<[string, string]> = [
  ['', ''], // home
  ['/bodas', '/weddings'],
  ['/eventos-privados', '/private-events'],
  ['/hoteles-restaurantes', '/venues'],
  ['/repertorio', '/repertoire'],
  ['/videos', '/videos'],
  ['/sobre-nacho', '/about'],
  ['/epk', '/epk'],
  ['/blog', '/blog'],
  ['/contacto', '/contact'],
]

const CITIES = ['playa-del-carmen', 'tulum', 'cancun', 'puerto-morelos']

// Posts del blog como pares [slugES, slugEN] (son traducciones entre sí).
const BLOG: Array<[string, string]> = [
  ['mejor-musica-para-boda-en-playa', 'best-songs-beach-wedding-ceremony'],
  ['cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen', 'how-much-does-live-music-cost-wedding-mexico'],
  ['de-mendoza-a-tulum', 'from-mendoza-to-tulum'],
]

function pair(esPath: string, enPath: string, priority: number): MetadataRoute.Sitemap {
  const esUrl = `${BASE}/es${esPath}`
  const enUrl = `${BASE}/en${enPath}`
  const languages = { es: esUrl, en: enUrl, 'x-default': esUrl }
  const common = {
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
    alternates: { languages },
  }
  return [
    { url: esUrl, ...common },
    { url: enUrl, ...common },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.flatMap(([es, en]) => pair(es, en, es === '' ? 1 : 0.8))
  const cities = CITIES.flatMap((c) =>
    pair(`/musica-en-vivo/${c}`, `/live-music/${c}`, 0.7)
  )
  const blog = BLOG.flatMap(([es, en]) => pair(`/blog/${es}`, `/blog/${en}`, 0.6))
  return [...pages, ...cities, ...blog]
}
