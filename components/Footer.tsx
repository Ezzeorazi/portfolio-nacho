import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const year = new Date().getFullYear()

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

  return (
    <footer className="bg-negro border-t border-arena/10">
      {/* Top CTA banner */}
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

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`}>
              <p className="font-display text-2xl text-oro mb-1">Nacho Rodriguez</p>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-arena mb-4">
                {locale === 'es' ? 'Músico · Riviera Maya' : 'Musician · Riviera Maya'}
              </p>
            </Link>
            <p className="font-sans text-sm text-arena/80 italic mb-4">{t('tagline')}</p>
            <p className="font-sans text-xs text-arena/60">{t('location')}</p>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/nachorodriguez.music"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-arena/60 hover:text-oro transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@NachoRodriguezmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-arena/60 hover:text-oro transition-colors"
              >
                YouTube
              </a>
              <a
                href={`https://wa.me/525534010899`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-arena/60 hover:text-oro transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-4">
              {t('services')}
            </p>
            <ul className="space-y-2">
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
            <ul className="space-y-2">
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
