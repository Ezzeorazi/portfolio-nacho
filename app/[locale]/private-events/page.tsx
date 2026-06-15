import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privateEvents' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/eventos-privados', '/private-events') }
}

export default function PrivateEventsPage() {
  const t = useTranslations('privateEvents')
  const types = t.raw('types') as Array<{ title: string; desc: string }>

  const icons = ['◆', '◎', '♡', '✦', '♪', '★']

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {types.map((type, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="border border-oro/15 p-8 group hover:border-oro/40 transition-colors">
                  <p className="font-display text-oro text-3xl mb-4">{icons[i]}</p>
                  <div className="w-8 h-px bg-oro mb-4" />
                  <h3 className="font-display text-xl text-hueso mb-3">{type.title}</h3>
                  <p className="font-sans text-sm text-arena/70 leading-relaxed">{type.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
