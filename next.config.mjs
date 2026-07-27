import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.mux.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  // URLs cortas para los canales que no dejan referrer (QR del tacho de
  // propinas, llaveros, bio de Instagram). Van a /links con UTMs para que GA4
  // atribuya la visita al canal en vez de contarla como tráfico directo.
  // El middleware de next-intl conserva los query params al resolver el locale
  // (/links → /es/links?utm_...). Imprimir: nachorodriguezmusic.com/qr
  async redirects() {
    const toLinks = (params) => `/links?${params}`
    return [
      {
        source: '/qr',
        destination: toLinks('utm_source=qr&utm_medium=offline&utm_campaign=tacho_propinas'),
        permanent: false,
      },
      {
        source: '/llavero',
        destination: toLinks('utm_source=llavero&utm_medium=offline&utm_campaign=llaveros_bar'),
        permanent: false,
      },
      {
        // Variante en inglés por si el llavero se imprime bilingüe
        source: '/keychain',
        destination: toLinks('utm_source=llavero&utm_medium=offline&utm_campaign=llaveros_bar'),
        permanent: false,
      },
      {
        // Para la bio de Instagram: separa el tráfico de IG del resto
        source: '/ig',
        destination: toLinks('utm_source=instagram&utm_medium=social&utm_campaign=bio'),
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
