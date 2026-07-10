// Sitemap servido como route handler para poder incluir la hoja de estilo XSL
// (<?xml-stylesheet?>), que lo hace legible en el navegador. Para buscadores
// sigue siendo un sitemap XML estándar con hreflang es/en/x-default.
export const dynamic = 'force-static'

const BASE = process.env.SITE_URL || 'https://nachorodriguezmusic.com'
const LASTMOD = new Date().toISOString()

// [pathES, pathEN, priority]
const PAGES: Array<[string, string, number]> = [
  ['', '', 1.0],
  ['/bodas', '/weddings', 0.8],
  ['/eventos-privados', '/private-events', 0.8],
  ['/hoteles-restaurantes', '/venues', 0.8],
  ['/repertorio', '/repertoire', 0.8],
  ['/videos', '/videos', 0.8],
  ['/sobre-nacho', '/about', 0.8],
  ['/epk', '/epk', 0.8],
  ['/blog', '/blog', 0.8],
  ['/contacto', '/contact', 0.8],
]

const CITIES = ['playa-del-carmen', 'tulum', 'cancun', 'puerto-morelos']

const BLOG: Array<[string, string]> = [
  ['mejor-musica-para-boda-en-playa', 'best-songs-beach-wedding-ceremony'],
  ['cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen', 'how-much-does-live-music-cost-wedding-mexico'],
  ['de-mendoza-a-tulum', 'from-mendoza-to-tulum'],
  ['musica-en-vivo-vs-dj-boda', 'live-music-vs-dj-wedding'],
]

function entry(self: string, es: string, en: string, priority: number): string {
  return `  <url>
    <loc>${self}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${es}"/>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
}

function pair(esPath: string, enPath: string, priority: number): string {
  const es = `${BASE}/es${esPath}`
  const en = `${BASE}/en${enPath}`
  return `${entry(es, es, en, priority)}\n${entry(en, es, en, priority)}`
}

export async function GET() {
  const blocks: string[] = []
  for (const [es, en, p] of PAGES) blocks.push(pair(es, en, p))
  for (const c of CITIES) blocks.push(pair(`/musica-en-vivo/${c}`, `/live-music/${c}`, 0.7))
  for (const [es, en] of BLOG) blocks.push(pair(`/blog/${es}`, `/blog/${en}`, 0.6))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
