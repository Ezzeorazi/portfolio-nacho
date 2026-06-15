import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/sobre-nacho', '/about') }
}

export default function AboutPage() {
  const t = useTranslations('about')
  const locale = useLocale()
  const story = t.raw('story') as string[]
  const stats = t.raw('stats') as Array<{ value: string; label: string }>

  return (
    <>
      <PageHero title={t('heroTitle')} />

      {/* Story */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-negro mb-10">{t('storyTitle')}</h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
            <RevealOnScroll className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] overflow-hidden border border-oro/20">
                <Image
                  src="/foto-about-black-and-white.webp"
                  alt="Nacho Rodriguez — músico"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
            <div className="space-y-6">
              {story.map((para, i) => (
                <RevealOnScroll key={i} delay={i * 80}>
                  <p className="font-sans text-negro/75 text-base leading-relaxed">{para}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-14">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-hueso">{t('statsTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-oro/10">
            {stats.map((stat, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="bg-negro p-10 text-center border border-oro/5">
                  <p className="font-display text-5xl text-oro mb-2">{stat.value}</p>
                  <p className="font-sans text-xs tracking-wider uppercase text-arena/60">{stat.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Music & Spotify */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl text-negro mb-4">{t('musicTitle')}</h2>
            <p className="font-sans text-negro/75 leading-relaxed mb-8">{t('musicText')}</p>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              {locale === 'es' ? 'Escuchar en Spotify' : 'Listen on Spotify'}
            </a>
          </RevealOnScroll>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Nacho Rodriguez',
            birthPlace: { '@type': 'Place', name: 'Mendoza, Argentina' },
            jobTitle: locale === 'es' ? 'Músico, Cantautor' : 'Musician, Singer-Songwriter',
            knowsLanguage: ['es', 'en'],
            url: 'https://nachorodriguezmusic.com',
            sameAs: [
              'https://www.instagram.com/nachorodriguez.music',
              'https://www.youtube.com/@NachoRodriguezmusic',
            ],
          }),
        }}
      />
    </>
  )
}
