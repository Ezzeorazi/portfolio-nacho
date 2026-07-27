import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/weddings': { es: '/bodas', en: '/weddings' },
    '/private-events': { es: '/eventos-privados', en: '/private-events' },
    '/venues': { es: '/hoteles-restaurantes', en: '/venues' },
    '/live-music/[city]': {
      es: '/musica-en-vivo/[city]',
      en: '/live-music/[city]',
    },
    '/repertoire': { es: '/repertorio', en: '/repertoire' },
    '/videos': '/videos',
    '/about': { es: '/sobre-nacho', en: '/about' },
    '/epk': '/epk',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': { es: '/contacto', en: '/contact' },
    '/guide': { es: '/guia-musica-boda', en: '/wedding-music-guide' },
    // Link-in-bio: destino del QR del tacho, los llaveros y la bio de Instagram.
    // Mismo path en ambos idiomas para que el link impreso nunca cambie.
    '/links': '/links',
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames
