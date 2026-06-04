import type { Metadata } from 'next'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import PageHero from '@/components/PageHero'
import VideoCard from '@/components/VideoCard'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'es' ? 'Videos | Nacho Rodriguez Músico' : 'Videos | Nacho Rodriguez Musician',
    description: locale === 'es'
      ? 'Videos de actuaciones en vivo: bodas, eventos privados, hoteles y restaurantes en la Riviera Maya.'
      : 'Live performance videos: weddings, private events, hotels and restaurants in the Riviera Maya.',
  }
}

export default function VideosPage() {
  const locale = useLocale()

  const videos = [
    { title: locale === 'es' ? 'Boda en la playa — Tulum 2023' : 'Beach Wedding — Tulum 2023', subtitle: 'Ceremonia' },
    { title: locale === 'es' ? 'Cóctel — Hotel boutique Playa del Carmen' : 'Cocktail — Boutique Hotel Playa del Carmen', subtitle: 'Evento' },
    { title: locale === 'es' ? 'Cena privada en villa' : 'Private villa dinner', subtitle: 'Riviera Maya' },
    { title: locale === 'es' ? 'Show acústico — Tulum' : 'Acoustic show — Tulum', subtitle: 'Live' },
    { title: locale === 'es' ? 'Ceremonia en cenote' : 'Cenote ceremony', subtitle: 'Riviera Maya' },
    { title: locale === 'es' ? 'Recepción boda — Cancún' : 'Wedding reception — Cancún', subtitle: 'Live' },
  ]

  return (
    <>
      <PageHero
        title={locale === 'es' ? 'Videos' : 'Videos'}
        subtitle={locale === 'es'
          ? 'Hacé click para escuchar el sonido'
          : 'Click to turn on sound'
        }
      />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured / hero video */}
          <RevealOnScroll className="mb-6">
            <div className="aspect-video max-h-[600px] overflow-hidden">
              <VideoCard
                title={locale === 'es' ? 'Reel 2024 — Nacho Rodriguez' : '2024 Reel — Nacho Rodriguez'}
                subtitle={locale === 'es' ? 'Bodas y eventos en la Riviera Maya' : 'Weddings and events in the Riviera Maya'}
                className="h-full"
              />
            </div>
          </RevealOnScroll>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {videos.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <VideoCard title={v.title} subtitle={v.subtitle} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Instagram CTA */}
          <RevealOnScroll className="mt-16 text-center">
            <p className="font-sans text-sm text-arena/60 mb-4">
              {locale === 'es' ? 'Más videos en Instagram' : 'More videos on Instagram'}
            </p>
            <a
              href="https://www.instagram.com/nachorodriguez.music"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              @nachorodriguez.music
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
