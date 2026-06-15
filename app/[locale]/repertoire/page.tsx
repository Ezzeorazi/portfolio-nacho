import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'repertoire' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/repertorio', '/repertoire') }
}

export default function RepertoirePage() {
  const t = useTranslations('repertoire')
  const locale = useLocale()
  const genres = t.raw('genres') as Array<{ name: string; songs: string[] }>

  const genreColors = ['#B59A5D', '#c0392b', '#B59A5D', '#c0392b', '#B59A5D', '#8C763F']

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="border border-oro/15 p-8 hover:border-oro/30 transition-colors">
                  <div className="w-8 h-px mb-4" style={{ background: genreColors[i] }} />
                  <h3 className="font-display text-xl text-hueso mb-5">{genre.name}</h3>
                  <ul className="space-y-2">
                    {genre.songs.map((song, j) => (
                      <li key={j} className="flex items-center gap-3 font-sans text-sm text-arena/70">
                        <span className="w-1 h-1 rounded-full bg-oro flex-shrink-0" />
                        {song}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="mt-16 p-8 border border-oro/20 text-center">
            <p className="font-display text-xl text-hueso mb-6">{t('requestNote')}</p>
            <Link href={`/${locale}/contact`} className="btn-gold">{t('ctaButton')}</Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicPlaylist',
            name: locale === 'es' ? 'Repertorio de Nacho Rodriguez' : 'Nacho Rodriguez Repertoire',
            creator: { '@type': 'Person', name: 'Nacho Rodriguez' },
            numTracks: 200,
          }),
        }}
      />
    </>
  )
}
