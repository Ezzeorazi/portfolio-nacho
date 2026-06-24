import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { existsSync } from 'fs'
import { join } from 'path'
import VideoCard from '@/components/VideoCard'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Nacho Rodriguez | Música en Vivo para Bodas y Eventos',
    description:
      locale === 'es'
        ? 'Música en vivo profesional para bodas y eventos privados en México y Estados Unidos. +10 años de experiencia, repertorio versátil, formato solista o dúo. Disponible para viajar.'
        : 'Professional live music for weddings and private events across Mexico and the United States. 10+ years of experience, versatile repertoire, solo or duo format. Available to travel.',
    alternates: altsFor(locale, '', ''),
  }
}

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()
  const heroPosterExists = existsSync(join(process.cwd(), 'public', 'hero-poster.webp'))
  const heroVideoExists = existsSync(join(process.cwd(), 'public', 'hero-video.mp4'))

  const testimonials = t.raw('testimonials') as Array<{ text: string; author: string; event: string }>
  const videos = [
    { id: 'uJeqJAVMHrA', title: locale === 'es' ? 'Bella Ciao — Cover acústico' : 'Bella Ciao — Acoustic cover', subtitle: 'Live session' },
    { id: '7Xdbo4JA-hI', title: 'Dos Gardenias — Cover', subtitle: '2023' },
    { id: 'aLEIAHYI4fM', title: locale === 'es' ? 'Tuyo — versión Nacho Rodríguez' : 'Tuyo — Nacho Rodríguez version', subtitle: 'Cover' },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════
          1. HERO — Full-bleed con foto de fondo
         ═══════════════════════════════════════ */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        {/* Video de fondo — /public/hero-video.{webm,mp4} (optimizado, sin audio).
            Usa hero-poster.webp (frame del propio video) como poster: pinta al
            instante (LCP rápido) mientras carga el video. Si no hay video, cae a
            la imagen fija. */}
        {heroVideoExists ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.webp"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          heroPosterExists && (
            <Image
              src="/hero-poster.webp"
              alt="Nacho Rodriguez — Música en vivo para bodas y eventos"
              fill
              priority
              quality={85}
              className="object-cover object-[center_20%]"
            />
          )
        )}

        {/* Overlay oscuro sobre la foto */}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/60 via-negro/50 to-negro/80" />

        {/* Detalles decorativos */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 50%, #B59A5D 0%, transparent 40%)`,
          }}
        />

        {/* Hero content — anclado abajo para no tapar la cara */}
        <div className="relative w-full text-center px-4 pb-16 sm:pb-20 animate-fade-in">
          {/* H1 semántico (oculto visualmente; el logo en cursiva es el título visual) */}
          <h1 className="sr-only">
            {locale === 'es'
              ? 'Nacho Rodriguez — Música en vivo profesional para bodas y eventos'
              : 'Nacho Rodriguez — Professional live music for weddings and events'}
          </h1>
          {/* Logo + subtítulo como unidad pegada */}
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/nacho-rodrguez-nmbre-completo-tipografia-en-cursiva-oficial.webp"
              alt="Nacho Rodriguez"
              width={600}
              height={160}
              priority
              className="object-contain w-[62vw] sm:w-[360px] md:w-[500px] drop-shadow-2xl -mb-3"
              style={{ height: 'auto' }}
            />
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-oro">
              {t('heroSubtitle')} · {t('heroLocation')}
            </p>
          </div>
          <div className="w-10 h-px bg-oro mx-auto mb-5" />
          <p className="font-display text-lg sm:text-xl text-arena/90 italic mb-8 max-w-lg mx-auto">
            &ldquo;{t('heroTagline')}&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-gold">
              {t('heroCta')}
            </Link>
            <Link href={`/${locale}/repertoire`} className="btn-outline">
              {t('heroCtaSecondary')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow opacity-60">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-arena/50">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-oro/50 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. VIDEO REEL
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-arena/60 tracking-wide">{t('reelSubtitle')}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {videos.map((v, i) => (
              <RevealOnScroll key={v.id} delay={i * 100}>
                <VideoCard youtubeId={v.id} title={v.title} subtitle={v.subtitle} />
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
          3. FORMATS — Solista / Dúo / Banda
         ═══════════════════════════════════════ */}
      <section className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro text-center mb-4">
              {t('formatsTitle')}
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-12 border border-oro/10">
            {[
              { title: t('formatsSoloTitle'), desc: t('formatsSoloDesc'), accent: 'bg-oro' },
              { title: t('formatsDuoTitle'), desc: t('formatsDuoDesc'), accent: 'bg-terracota' },
              { title: t('formatsBandaTitle'), desc: t('formatsBandaDesc'), accent: 'bg-oro' },
            ].map((f, i) => (
              <RevealOnScroll
                key={f.title}
                delay={i * 150}
                className="bg-negro p-10 md:p-14 border-t md:border-t-0 md:border-l first:border-t-0 md:first:border-l-0 border-oro/10"
              >
                <div className={`w-10 h-px ${f.accent} mb-6`} />
                <h3 className="font-display text-4xl text-hueso mb-4">{f.title}</h3>
                <p className="font-sans text-arena/70 leading-relaxed">{f.desc}</p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 mt-8 font-sans text-xs tracking-widest uppercase text-oro hover:gap-4 transition-all"
                >
                  {locale === 'es' ? 'Consultar precio' : 'Check price'}
                  <span>→</span>
                </Link>
              </RevealOnScroll>
            ))}
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
                <RevealOnScroll key={key} delay={i * 120} className="h-full">
                  <Link
                    href={href}
                    className="group flex flex-col h-full bg-negro p-8 md:p-10 hover:bg-negro/90 transition-colors border border-transparent hover:border-oro/20"
                  >
                    <p className="font-display text-3xl text-oro mb-2">{icon}</p>
                    <div className="w-8 h-px bg-oro mb-5" />
                    <h3 className="font-display text-2xl text-hueso mb-3">{service.title}</h3>
                    <p className="font-sans text-sm text-arena/70 leading-relaxed mb-6">{service.desc}</p>
                    <span className="font-sans text-xs tracking-widest uppercase text-oro flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
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
          Preparado para testimonios reales: la sección solo aparece cuando
          se cargan en messages/{es,en}.json → home.testimonials (array con
          { text, author, event }). Mientras el array esté vacío, no se muestra.
         ═══════════════════════════════════════ */}
      {testimonials.length > 0 && (
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
      )}

      {/* ═══════════════════════════════════════
          7. CITIES
         ═══════════════════════════════════════ */}
      <section className="bg-hueso/5 py-24 px-4 border-t border-oro/10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-hueso">{t('citiesTitle')}</h2>
            <p className="font-sans text-sm text-arena/60 mt-4 max-w-xl mx-auto leading-relaxed">{t('citiesSubtitle')}</p>
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                name: 'Nacho Rodriguez',
                jobTitle: locale === 'es' ? 'Músico, Cantautor' : 'Musician, Singer-Songwriter',
                url: 'https://nachorodriguezmusic.com',
                image: `https://nachorodriguezmusic.com/${locale}/opengraph-image`,
                sameAs: [
                  'https://www.instagram.com/nachorodriguez.music',
                  'https://www.youtube.com/@NachoRodriguezmusic',
                ],
                knowsLanguage: ['es', 'en'],
                address: { '@type': 'PostalAddress', addressLocality: 'Playa del Carmen', addressCountry: 'MX' },
              },
              {
                '@type': 'MusicGroup',
                name: 'Nacho Rodriguez',
                genre: ['Rock', 'Blues', 'Jazz', 'Latin', 'Cumbia', 'Electronic'],
                url: 'https://nachorodriguezmusic.com',
                areaServed: ['México', 'Estados Unidos'],
              },
              {
                '@type': 'LocalBusiness',
                name: 'Nacho Rodriguez — Música en Vivo',
                description: locale === 'es'
                  ? 'Música en vivo profesional para bodas y eventos en México y Estados Unidos'
                  : 'Professional live music for weddings and events in Mexico and the United States',
                url: 'https://nachorodriguezmusic.com',
                telephone: '+525534010899',
                areaServed: ['México', 'Estados Unidos'],
              },
            ],
          }),
        }}
      />
    </>
  )
}
