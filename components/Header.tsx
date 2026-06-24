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

  // Servicios agrupados en el dropdown "Música en vivo"
  const serviceItems = [
    { href: `/${locale}/weddings`, label: t('weddings') },
    { href: `/${locale}/private-events`, label: t('privateEvents') },
    { href: `/${locale}/venues`, label: t('venues') },
  ]

  // Ítems sueltos del navbar (Prensa queda solo en el footer)
  const navItems = [
    { href: `/${locale}/videos`, label: t('videos') },
    { href: `/${locale}/about`, label: t('about') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-negro/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo / Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-3 mt-5 group">
          <Image
            src="/Logo-nachoRodriguez-blancoHueso.webp"
            alt="Nacho Rodriguez"
            width={100}
            height={100}
            className="object-contain transition-opacity group-hover:opacity-80"
            priority
          />
          
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* Dropdown: Música en vivo (agrupa los servicios) */}
          <div className="relative group">
            <button
              className="font-sans text-xs tracking-widest uppercase text-arena hover:text-oro transition-colors duration-200 flex items-center gap-1"
              aria-haspopup="true"
            >
              {t('liveMusic')}
              <svg
                className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* pt-3 actúa de puente para no perder el hover al bajar al panel */}
            <div className="absolute left-0 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
              <div className="bg-negro/95 backdrop-blur-sm border border-arena/10 shadow-xl rounded-sm py-2 min-w-[230px]">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-2.5 font-sans text-xs tracking-widest uppercase text-arena hover:text-oro hover:bg-arena/5 transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
        <nav className="flex flex-col items-center gap-5 px-4">
          {/* Grupo Música en vivo */}
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro/70">
            {t('liveMusic')}
          </span>
          {serviceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-arena hover:text-oro transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="w-8 h-px bg-arena/15 my-1" />

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
