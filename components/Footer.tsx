'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const year = new Date().getFullYear()

  // La barra de CTA no se muestra en Contacto (el usuario ya está ahí)
  const isContact = pathname?.includes('/contact')

  const services = [
    { href: `/${locale}/weddings`, label: nav('weddings') },
    { href: `/${locale}/private-events`, label: nav('privateEvents') },
    { href: `/${locale}/venues`, label: nav('venues') },
    { href: `/${locale}/live-music/tulum`, label: 'Live Music Tulum' },
    { href: `/${locale}/live-music/playa-del-carmen`, label: 'Live Music Playa del Carmen' },
  ]

  const links = [
    { href: `/${locale}/repertoire`, label: nav('repertoire') },
    { href: `/${locale}/videos`, label: nav('videos') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/epk`, label: nav('epk') },
    { href: `/${locale}/blog`, label: nav('blog') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ]

  const socials = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/nachorodriguez.music',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@NachoRodriguezmusic',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
          <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/525534010899',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.1 4 4.1-1.1A10 10 0 1 0 12 2z" />
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
            <Link href={`/${locale}/contact`} className="btn-gold">
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
            <Link href={`/${locale}`}>
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
                  <li key={s.href}>
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
