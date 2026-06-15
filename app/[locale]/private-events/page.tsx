import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
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
  const locale = useLocale()
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

      {/* CTA */}
      <section className="bg-hueso py-20 px-4 text-center">
        <RevealOnScroll>
          <div className="w-12 h-px bg-oro mx-auto mb-6" />
          <h2 className="font-display text-3xl text-negro mb-8">{t('ctaTitle')}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`} className="btn-gold">{t('ctaButton')}</Link>
            <a
              href="https://wa.me/525534010899"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !border-negro !text-negro hover:!bg-negro hover:!text-oro"
            >
              WhatsApp
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </>
  )
}
