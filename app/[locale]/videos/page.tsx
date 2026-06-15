import type { Metadata } from 'next'
import { useLocale } from 'next-intl'
import PageHero from '@/components/PageHero'
import VideoCard from '@/components/VideoCard'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'es' ? 'Videos | Nacho Rodriguez Músico' : 'Videos | Nacho Rodriguez Musician',
    description: locale === 'es'
      ? 'Videos de actuaciones en vivo: bodas, eventos privados, hoteles y restaurantes en la Riviera Maya.'
      : 'Live performance videos: weddings, private events, hotels and restaurants in the Riviera Maya.',
    alternates: altsFor(locale, '/videos', '/videos'),
  }
}

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@NachoRodriguezmusic'

// Videos de YouTube. Para agregar más: pegá el ID (lo que va después de
// "youtu.be/" o "watch?v=") y un título/subtítulo en cada idioma.
const VIDEOS: Array<{ id: string; es: string; en: string; sub: string }> = [
  { id: 'uJeqJAVMHrA', es: 'Bella Ciao — Cover acústico', en: 'Bella Ciao — Acoustic cover', sub: 'Live session' },
  { id: '7Xdbo4JA-hI', es: 'Dos Gardenias — Cover', en: 'Dos Gardenias — Cover', sub: '2023' },
  { id: 'aLEIAHYI4fM', es: 'Tuyo — versión Nacho Rodríguez', en: 'Tuyo — Nacho Rodríguez version', sub: 'Cover' },
]

export default function VideosPage() {
  const locale = useLocale()
  const [featured, ...rest] = VIDEOS

  return (
    <>
      <PageHero
        title={locale === 'es' ? 'Videos' : 'Videos'}
        subtitle={locale === 'es'
          ? 'Hacé click en cualquier video para reproducirlo'
          : 'Click any video to play it'
        }
      />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured / hero video */}
          <RevealOnScroll className="mb-6">
            <div className="max-w-4xl mx-auto">
              <VideoCard
                youtubeId={featured.id}
                title={locale === 'es' ? featured.es : featured.en}
                subtitle={featured.sub}
              />
            </div>
          </RevealOnScroll>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((v, i) => (
              <RevealOnScroll key={v.id} delay={i * 80}>
                <VideoCard youtubeId={v.id} title={locale === 'es' ? v.es : v.en} subtitle={v.sub} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Channel CTA */}
          <RevealOnScroll className="mt-16 text-center">
            <p className="font-sans text-sm text-arena/60 mb-4">
              {locale === 'es' ? 'Mirá más en mi canal de YouTube' : 'Watch more on my YouTube channel'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                YouTube — @NachoRodriguezmusic
              </a>
              <a
                href="https://www.instagram.com/nachorodriguez.music"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                @nachorodriguez.music
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
