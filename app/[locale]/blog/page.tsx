import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: t('metaTitle'), description: t('metaDesc') }
}

export default function BlogPage() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const posts = t.raw('posts') as Array<{
    slug: string
    title: string
    excerpt: string
    category: string
    date: string
  }>

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 80}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block border border-oro/15 p-8 hover:border-oro/40 transition-colors"
                >
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-4">
                    {post.category} · {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="w-8 h-px bg-oro mb-4" />
                  <h2 className="font-display text-xl text-hueso mb-4 group-hover:text-oro transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="font-sans text-sm text-arena/70 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <span className="font-sans text-xs tracking-widest uppercase text-oro flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t('readMore')} →
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
