'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLocale = () => {
    const next = locale === 'es' ? 'en' : 'es'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const navItems = [
    { href: `/${locale}/weddings`, label: t('weddings') },
    { href: `/${locale}/private-events`, label: t('privateEvents') },
    { href: `/${locale}/venues`, label: t('venues') },
    { href: `/${locale}/videos`, label: t('videos') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/blog`, label: t('blog') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-negro/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo / Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image
            src="/Logo-nachoRodriguez-blancoHueso.webp"
            alt="Nacho Rodriguez"
            width={44}
            height={44}
            className="object-contain transition-opacity group-hover:opacity-80"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-oro text-base md:text-lg tracking-wider group-hover:text-oro-dark transition-colors">
              Nacho Rodriguez
            </span>
            <span className="font-sans text-arena text-[9px] tracking-[0.3em] uppercase">
              {locale === 'es' ? 'Músico' : 'Musician'}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs tracking-widest uppercase text-arena hover:text-oro transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={switchLocale}
            className="hidden sm:flex items-center gap-1 font-sans text-xs tracking-widest uppercase text-arena hover:text-oro transition-colors"
            aria-label="Switch language"
          >
            <span className={locale === 'es' ? 'text-oro' : 'text-arena'}>ES</span>
            <span className="text-arena/40">|</span>
            <span className={locale === 'en' ? 'text-oro' : 'text-arena'}>EN</span>
          </button>

          {/* Book CTA */}
          <Link
            href={`/${locale}/contact`}
            className="btn-gold text-xs px-4 py-2"
          >
            {t('bookNow')}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-oro transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-oro transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-oro transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-negro/98 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen py-6' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-arena hover:text-oro transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={switchLocale}
            className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-arena hover:text-oro"
          >
            <span className={locale === 'es' ? 'text-oro' : ''}>ES</span>
            <span>/</span>
            <span className={locale === 'en' ? 'text-oro' : ''}>EN</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
