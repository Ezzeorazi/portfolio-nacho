import type { Metadata } from 'next'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { readdirSync } from 'fs'
import { join } from 'path'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'epk' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/epk', '/epk') }
}

// Lee automáticamente las fotos subidas a /public/prensa (build-time).
function getPressPhotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), 'public', 'prensa'))
      .filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f))
      .sort()
      .map((f) => `/prensa/${f}`)
  } catch {
    return []
  }
}

export default function EPKPage() {
  const locale = useLocale()
  const photos = getPressPhotos()

  return (
    <>
      <PageHero
        title={locale === 'es' ? 'Fotos de Prensa' : 'Press Photos'}
        subtitle={
          locale === 'es'
            ? 'Imágenes en alta resolución libres para prensa, flyers y promoción'
            : 'High-resolution images free for press, flyers and promotion'
        }
      />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((src, i) => (
                <RevealOnScroll key={src} delay={i * 60}>
                  <div className="group relative aspect-[4/5] overflow-hidden border border-oro/15">
                    <Image
                      src={src}
                      alt={`Nacho Rodriguez — foto de prensa ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-negro/0 group-hover:bg-negro/40 transition-colors" />
                    <a
                      href={src}
                      download
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity btn-gold text-xs px-4 py-2 whitespace-nowrap"
                    >
                      {locale === 'es' ? 'Descargar' : 'Download'}
                    </a>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <RevealOnScroll className="text-center border border-oro/15 p-12">
              <p className="font-display text-2xl text-hueso mb-3">
                {locale === 'es' ? 'Galería en preparación' : 'Gallery coming soon'}
              </p>
              <p className="font-sans text-sm text-arena/60">
                {locale === 'es'
                  ? 'Pronto vas a poder descargar las fotos de prensa desde acá.'
                  : 'Press photos will be available for download here soon.'}
              </p>
            </RevealOnScroll>
          )}

          {/* Contact info */}
          <RevealOnScroll className="mt-16 p-8 border border-oro/20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro mb-4">
              {locale === 'es' ? 'Contacto para prensa y reservas' : 'Press & booking contact'}
            </p>
            <div className="space-y-2">
              <a href="mailto:nachorodriguez.fora@gmail.com" className="block font-sans text-hueso hover:text-oro transition-colors">
                nachorodriguez.fora@gmail.com
              </a>
              <a href="https://wa.me/525534010899" className="block font-sans text-hueso hover:text-oro transition-colors">
                WhatsApp: +52 55 3401 0899
              </a>
              <a href="https://www.instagram.com/nachorodriguez.music" className="block font-sans text-hueso hover:text-oro transition-colors">
                @nachorodriguez.music
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
