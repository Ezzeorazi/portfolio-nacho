import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'epk' })
  return { title: t('metaTitle'), description: t('metaDesc') }
}

export default function EPKPage() {
  const t = useTranslations('epk')
  const locale = useLocale()
  const sections = t.raw('sections') as Array<{ title: string; desc: string }>

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Download CTA */}
          <RevealOnScroll className="text-center mb-16">
            <a
              href="/epk/nacho-rodriguez-epk.pdf"
              download
              className="btn-gold text-base px-8 py-4"
            >
              {t('downloadButton')}
            </a>
          </RevealOnScroll>

          {/* Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((sec, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="border border-oro/15 p-8">
                  <p className="font-display text-oro text-3xl mb-4">
                    {['①', '②', '③', '④'][i]}
                  </p>
                  <div className="w-8 h-px bg-oro mb-4" />
                  <h3 className="font-display text-xl text-hueso mb-3">{sec.title}</h3>
                  <p className="font-sans text-sm text-arena/70 leading-relaxed">{sec.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

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
