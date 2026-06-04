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
      es: '/musica-en-vivo/[ciudad]',
      en: '/live-music/[city]',
    },
    '/repertoire': { es: '/repertorio', en: '/repertoire' },
    '/videos': '/videos',
    '/about': { es: '/sobre-nacho', en: '/about' },
    '/epk': '/epk',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': { es: '/contacto', en: '/contact' },
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames
