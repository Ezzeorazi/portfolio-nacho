import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { existsSync } from 'fs'
import { join } from 'path'
import VideoCard from '@/components/VideoCard'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'Nacho Rodríguez | Músico en Vivo — Riviera Maya',
    description:
      locale === 'es'
        ? 'Músico en vivo para bodas y eventos en la Riviera Maya. Cantautor bilingüe ES/EN — Playa del Carmen, Tulum, Cancún.'
        : 'Live musician for weddings and events in the Riviera Maya. Bilingual singer-songwriter ES/EN — Playa del Carmen, Tulum, Cancún.',
  }
}

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()
  const heroBgExists = existsSync(join(process.cwd(), 'public', 'hero-bg.webp'))

  const testimonials = t.raw('testimonials') as Array<{ text: string; author: string; event: string }>
  const videos = [
    { title: locale === 'es' ? 'Boda en Tulum' : 'Wedding in Tulum', subtitle: '2023' },
    { title: locale === 'es' ? 'Cena privada' : 'Private dinner', subtitle: 'Riviera Maya' },
    { title: locale === 'es' ? 'Show acústico' : 'Acoustic show', subtitle: 'Playa del Carmen' },
    { title: locale === 'es' ? 'Ceremonia en playa' : 'Beach ceremony', subtitle: 'Puerto Morelos' },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════
          1. HERO — Full-bleed con foto de fondo
         ═══════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Foto de fondo — subir como /public/hero-bg.webp (1920×1080 mínimo) */}
        {heroBgExists && (
          <Image
            src="/hero-bg.webp"
            alt="Nacho Rodríguez — músico en vivo Riviera Maya"
            fill
            priority
            quality={85}
            className="object-cover object-center"
          />
        )}

        {/* Overlay oscuro sobre la foto */}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/60 via-negro/50 to-negro/80" />

        {/* Detalles decorativos */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 50%, #B59A5D 0%, transparent 40%)`,
          }}
        />

        {/* Hero content */}
        <div className="relative text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-oro mb-8">
            {t('heroLocation')}
          </p>

          {/* Logo completo en cursiva — el nombre en tipografía oficial */}
          <div className="flex justify-center mb-6">
            <Image
              src="/nacho-rodrguez-nmbre-completo-tipografia-en-cursiva-oficial.webp"
              alt="Nacho Rodríguez"
              width={600}
              height={160}
              priority
              className="object-contain max-w-[85vw] sm:max-w-[500px] md:max-w-[600px] drop-shadow-2xl"
            />
          </div>

          <p className="font-sans text-[11px] tracking-[0.5em] uppercase text-oro mb-8">
            {t('heroSubtitle')}
          </p>
          <div className="w-12 h-px bg-oro mx-auto mb-8" />
          <p className="font-display text-xl sm:text-2xl text-arena/90 italic mb-10 max-w-xl mx-auto">
            &ldquo;{t('heroTagline')}&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn-gold">
              {t('heroCta')}
            </Link>
            <Link href={`/${locale}/repertoire`} className="btn-outline">
              {t('heroCtaSecondary')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-arena/50">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-oro/50 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. STATEMENT
         ═══════════════════════════════════════ */}
      <section className="bg-hueso py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mx-auto mb-8" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-negro leading-tight mb-6">
              {t('statementTitle')}
            </h2>
            <p className="font-sans text-base sm:text-lg text-negro/70 leading-relaxed max-w-2xl mx-auto">
              {t('statementText')}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. FORMATS — Solista / Dúo
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro text-center mb-4">
              {t('formatsTitle')}
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-12 border border-oro/10">
            {/* Solista */}
            <RevealOnScroll className="bg-negro p-10 md:p-14 border-b md:border-b-0 border-r-0 md:border-r border-oro/10">
              <div className="w-10 h-px bg-oro mb-6" />
              <h3 className="font-display text-4xl text-hueso mb-4">{t('formatsSoloTitle')}</h3>
              <p className="font-sans text-arena/70 leading-relaxed">{t('formatsSoloDesc')}</p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 mt-8 font-sans text-xs tracking-widest uppercase text-oro hover:gap-4 transition-all"
              >
                {locale === 'es' ? 'Consultar precio' : 'Check price'}
                <span>→</span>
              </Link>
            </RevealOnScroll>
            {/* Dúo */}
            <RevealOnScroll delay={150} className="bg-negro/80 p-10 md:p-14">
              <div className="w-10 h-px bg-terracota mb-6" />
              <h3 className="font-display text-4xl text-hueso mb-4">{t('formatsDuoTitle')}</h3>
              <p className="font-sans text-arena/70 leading-relaxed">{t('formatsDuoDesc')}</p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 mt-8 font-sans text-xs tracking-widest uppercase text-oro hover:gap-4 transition-all"
              >
                {locale === 'es' ? 'Consultar precio' : 'Check price'}
                <span>→</span>
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. VIDEO REEL
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-hueso mb-3">{t('reelTitle')}</h2>
            <p className="font-sans text-sm text-arena/60 tracking-wide">{t('reelSubtitle')}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videos.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <VideoCard title={v.title} subtitle={v.subtitle} />
              </RevealOnScroll>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/videos`} className="btn-outline">
              {locale === 'es' ? 'Ver todos los videos' : 'See all videos'}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. SERVICES
         ═══════════════════════════════════════ */}
      <section className="bg-hueso py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-negro">{t('servicesTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'weddings', href: `/${locale}/weddings`, icon: '♡' },
              { key: 'private', href: `/${locale}/private-events`, icon: '◆' },
              { key: 'venues', href: `/${locale}/venues`, icon: '♪' },
            ].map(({ key, href, icon }, i) => {
              const service = t.raw(`services.${key}`) as { title: string; desc: string }
              return (
                <RevealOnScroll key={key} delay={i * 120}>
                  <Link
                    href={href}
                    className="group block bg-negro p-8 md:p-10 hover:bg-negro/90 transition-colors border border-transparent hover:border-oro/20"
                  >
                    <p className="font-display text-3xl text-oro mb-2">{icon}</p>
                    <div className="w-8 h-px bg-oro mb-5" />
                    <h3 className="font-display text-2xl text-hueso mb-3">{service.title}</h3>
                    <p className="font-sans text-sm text-arena/70 leading-relaxed mb-6">{service.desc}</p>
                    <span className="font-sans text-xs tracking-widest uppercase text-oro flex items-center gap-2 group-hover:gap-4 transition-all">
                      {locale === 'es' ? 'Ver más' : 'Learn more'} <span>→</span>
                    </span>
                  </Link>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. TESTIMONIALS
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-hueso">{t('testimonialsTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="border border-oro/15 p-8 relative">
                  <p className="font-display text-5xl text-oro/20 absolute -top-2 left-6">&ldquo;</p>
                  <p className="font-display text-base text-arena leading-relaxed italic mb-6 pt-4">
                    {testimonial.text}
                  </p>
                  <div className="w-6 h-px bg-oro mb-3" />
                  <p className="font-sans text-xs text-hueso font-semibold">{testimonial.author}</p>
                  <p className="font-sans text-xs text-arena/50 mt-0.5">{testimonial.event}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. CITIES
         ═══════════════════════════════════════ */}
      <section className="bg-hueso/5 py-24 px-4 border-t border-oro/10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-hueso">{t('citiesTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: 'playa-del-carmen', label: t('cities.playaDelCarmen') },
              { slug: 'tulum', label: t('cities.tulum') },
              { slug: 'cancun', label: t('cities.cancun') },
              { slug: 'puerto-morelos', label: t('cities.puertoMorelos') },
            ].map(({ slug, label }, i) => (
              <RevealOnScroll key={slug} delay={i * 80}>
                <Link
                  href={`/${locale}/live-music/${slug}`}
                  className="group block relative overflow-hidden aspect-square bg-gradient-to-br from-negro/80 to-negro border border-oro/10 hover:border-oro/40 transition-colors"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <p className="font-display text-oro text-3xl mb-3">♪</p>
                    <p className="font-display text-hueso text-lg leading-tight">{label}</p>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-oro mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {locale === 'es' ? 'Ver más' : 'Learn more'}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. FINAL CTA
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4 border-t border-oro/10">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mx-auto mb-8" />
            <h2 className="font-display text-4xl sm:text-5xl text-hueso mb-4">{t('ctaTitle')}</h2>
            <p className="font-sans text-arena/70 mb-10 leading-relaxed">{t('ctaText')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/contact`} className="btn-gold">
                {t('ctaButton')}
              </Link>
              <a
                href={`https://wa.me/525534010899?text=${encodeURIComponent(t('ctaWhatsapp'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {t('ctaWhatsapp')}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                name: 'Nacho Rodríguez',
                jobTitle: locale === 'es' ? 'Músico, Cantautor' : 'Musician, Singer-Songwriter',
                url: 'https://nachorodriguezmusic.com',
                image: 'https://nachorodriguezmusic.com/og-image.jpg',
                sameAs: ['https://www.instagram.com/nachorodriguez.music'],
                knowsLanguage: ['es', 'en'],
                address: { '@type': 'PostalAddress', addressLocality: 'Playa del Carmen', addressCountry: 'MX' },
              },
              {
                '@type': 'MusicGroup',
                name: 'Nacho Rodríguez',
                genre: ['Rock', 'Blues', 'Jazz', 'Country', 'Latin'],
                url: 'https://nachorodriguezmusic.com',
              },
              {
                '@type': 'LocalBusiness',
                name: 'Nacho Rodríguez — Músico en Vivo',
                description: locale === 'es'
                  ? 'Músico en vivo para bodas y eventos en la Riviera Maya'
                  : 'Live musician for weddings and events in the Riviera Maya',
                url: 'https://nachorodriguezmusic.com',
                telephone: '+525534010899',
                areaServed: ['Playa del Carmen', 'Tulum', 'Cancún', 'Puerto Morelos', 'Riviera Maya'],
              },
            ],
          }),
        }}
      />
    </>
  )
}
