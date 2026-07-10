'use client'

import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const year = new Date().getFullYear()

  // La barra de CTA no se muestra en Contacto (el usuario ya está ahí)
  const isContact = pathname?.includes('/contact')

  const services = [
    { href: '/weddings', label: nav('weddings') },
    { href: '/private-events', label: nav('privateEvents') },
    { href: '/venues', label: nav('venues') },
    { href: { pathname: '/live-music/[city]', params: { city: 'tulum' } }, label: 'Live Music Tulum' },
    { href: { pathname: '/live-music/[city]', params: { city: 'playa-del-carmen' } }, label: 'Live Music Playa del Carmen' },
  ] as const

  const links = [
    { href: '/repertoire', label: nav('repertoire') },
    { href: '/videos', label: nav('videos') },
    { href: '/about', label: nav('about') },
    { href: '/epk', label: nav('epk') },
    { href: '/blog', label: nav('blog') },
    { href: '/contact', label: nav('contact') },
  ] as const

  const socials = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/nachorodriguez.music',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@NachoRodriguezmusic',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/525534010899',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-negro border-t border-arena/10">
      {/* Top CTA banner — oculto en la página de Contacto */}
      {!isContact && (
        <div className="bg-oro/10 border-b border-oro/20 py-8 px-4 text-center">
          <p className="font-display text-2xl text-oro mb-3">
            {locale === 'es' ? '¿Listo para reservar tu fecha?' : 'Ready to book your date?'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn-gold">
              {locale === 'es' ? 'Solicitar cotización' : 'Get a quote'}
            </Link>
            <a
              href={`https://wa.me/525534010899?text=${encodeURIComponent(
                locale === 'es'
                  ? '¡Hola Nacho! Me interesa cotizar música en vivo para mi evento.'
                  : 'Hi Nacho! I am interested in getting a quote for live music at my event.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/">
              <p className="font-display text-2xl text-oro mb-1">Nacho Rodriguez</p>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-arena mb-4">
                {locale === 'es' ? 'Músico · Música en vivo' : 'Musician · Live Music'}
              </p>
            </Link>
            <p className="font-sans text-sm text-arena/80 italic mb-4">{t('tagline')}</p>
            <p className="font-sans text-xs text-arena/60">{t('location')}</p>

            {/* Social — íconos */}
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-arena/20 text-arena/70 hover:text-oro hover:border-oro transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios + Links: 2 columnas en mobile, fluyen al grid en desktop */}
          <div className="grid grid-cols-2 gap-6 border-t border-arena/10 pt-8 md:border-t-0 md:pt-0 md:contents">
            {/* Services */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-4">
                {t('services')}
              </p>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="font-sans text-xs text-arena/70 hover:text-oro transition-colors"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-4">
                {t('quickLinks')}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-sans text-xs text-arena/70 hover:text-oro transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-arena/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-arena/40">
            © {year} Nacho Rodriguez. {t('rights')}.
          </p>
          <p className="font-sans text-xs text-arena/40">
            {t('developedBy')}{' '}
            <a
              href={t('developerUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oro hover:text-oro-dark transition-colors"
            >
              {t('developer')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
