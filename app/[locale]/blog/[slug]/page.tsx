import type { Metadata } from 'next'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

// Pares de slug ES ↔ EN (cada post es traducción del otro), para hreflang.
const SLUG_PAIRS: Record<string, string> = {
  'mejor-musica-para-boda-en-playa': 'best-songs-beach-wedding-ceremony',
  'cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen': 'how-much-does-live-music-cost-wedding-mexico',
  'de-mendoza-a-tulum': 'from-mendoza-to-tulum',
  'best-songs-beach-wedding-ceremony': 'mejor-musica-para-boda-en-playa',
  'how-much-does-live-music-cost-wedding-mexico': 'cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen',
  'from-mendoza-to-tulum': 'de-mendoza-a-tulum',
}

const BLOG_POSTS: Record<string, Record<string, { title: string; excerpt: string; content: string; category: string; date: string }>> = {
  es: {
    'mejor-musica-para-boda-en-playa': {
      title: 'Las mejores canciones para una boda en la playa',
      excerpt: 'Una guía completa para elegir la banda sonora perfecta para tu ceremonia frente al mar Caribe.',
      category: 'Guías y Consejos',
      date: '2024-03-15',
      content: `
Una boda en la playa del Caribe es uno de los escenarios más hermosos del mundo. La combinación del mar turquesa, la brisa cálida y la música en vivo crea una experiencia que tus invitados recordarán toda la vida.

## Para la entrada de la novia

Las canciones más elegidas son aquellas que combinan emoción con sofisticación. "Canon en Re" de Pachelbel sigue siendo un clásico que nunca falla. Si buscás algo más moderno, "A Thousand Years" de Christina Perri es perfecta para una ceremonia frente al mar.

## Para el intercambio de votos

Este es el momento más íntimo. Recomiendo algo suave y emotivo: "La Vie En Rose" en versión acústica, o "Bésame Mucho" para un toque latino que honra la cultura mexicana.

## Para la salida de los novios

Este es el momento de celebración. "Here Comes the Sun" de The Beatles o "Can't Help Falling In Love" de Elvis crean una atmósfera perfecta de alegría y amor.

## Tip final

Siempre coordiná con tu músico con anticipación. Un buen intérprete puede adaptar cualquier canción al contexto de la playa, ajustando el tempo y el arreglo para que suene perfectamente en el exterior.
      `,
    },
    'cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen': {
      title: '¿Cuánto cuesta música en vivo para una boda en Playa del Carmen?',
      excerpt: 'Desglose completo de precios, formatos y todo lo que necesitás saber antes de contratar música para tu boda.',
      category: 'Guías y Consejos',
      date: '2024-02-20',
      content: `
Contratar música en vivo para tu boda en Playa del Carmen es una de las mejores inversiones que podés hacer. Pero ¿cuánto cuesta exactamente?

## Factores que determinan el precio

**Formato:** Un solista (voz + guitarra) es más accesible que un dúo o banda. La diferencia puede ser de un 30-50% más.

**Duración:** Los sets más comunes son de 45 o 90 minutos. Algunos músicos ofrecen paquetes para varios momentos del día (ceremonia + cóctel + cena).

**Ubicación:** El costo de desplazamiento varía según la distancia. Playa del Carmen suele ser la más económica de la Riviera Maya.

**Temporada:** Alta temporada (noviembre-abril) suele tener precios mayores por la demanda.

## Rangos de precio en 2024

Para Playa del Carmen, los precios de un solista de calidad rondan entre $8,000 y $15,000 MXN por set, dependiendo de la duración y experiencia del músico.

## Lo que debe incluir

- Equipo de sonido profesional
- Repertorio amplio (sin costo extra por canciones del repertorio)
- Puntualidad garantizada
- Vestuario apropiado para el evento

Contactame para obtener una cotización exacta para tu fecha.
      `,
    },
    'de-mendoza-a-tulum': {
      title: 'De Mendoza a Tulum: la historia detrás de la música',
      excerpt: 'Cómo un guitarrista argentino terminó tocando en las bodas más exclusivas del Caribe mexicano.',
      category: 'Raíces',
      date: '2024-01-10',
      content: `
Hay una frase que me gusta mucho: "La música no tiene fronteras". Yo le agregaría: "ni la pasión por ella."

## Los primeros acordes

Crecí en Mendoza, Argentina, rodeado de montañas y viñedos. Mi tío tenía una guitarra que siempre estuvo en un rincón de la sala. Un día, cuando tenía 12 años, la agarré y ya no la solté.

## La decisión

En 2014, después de años tocando en bares y eventos de Argentina, tomé una decisión que cambió mi vida: viajarme a México. No sabía exactamente qué iba a encontrar, pero algo me llamaba hacia el Caribe.

## La Riviera Maya me adoptó

Mi primer año fue difícil. Tocar en la calle, en pequeños bares, conocer músicos locales. Pero poco a poco, la Riviera Maya fue abriéndome sus puertas. Primero hoteles pequeños, después bodas, luego eventos privados en villas de lujo.

## Hoy

Más de 10 años después, puedo decir que encontré mi lugar en el mundo. La Riviera Maya me dio una carrera, amigos, y la posibilidad de hacer lo que más amo: conectar con personas a través de la música en los momentos más importantes de sus vidas.
      `,
    },
  },
  en: {
    'best-songs-beach-wedding-ceremony': {
      title: 'Best songs for a beach wedding ceremony',
      excerpt: 'A complete guide to choosing the perfect soundtrack for your ceremony in front of the Caribbean Sea.',
      category: 'Guides & Tips',
      date: '2024-03-15',
      content: `
A Caribbean beach wedding is one of the most beautiful settings in the world. The combination of turquoise sea, warm breeze, and live music creates an experience your guests will remember for a lifetime.

## For the bridal entrance

The most chosen songs combine emotion with sophistication. Pachelbel's "Canon in D" remains a classic that never fails. For something more modern, Christina Perri's "A Thousand Years" is perfect for a ceremony by the sea.

## For the exchange of vows

This is the most intimate moment. I recommend something soft and emotional: "La Vie En Rose" in acoustic version, or "Bésame Mucho" for a Latin touch that honors Mexican culture.

## For the recessional

This is the celebration moment. "Here Comes the Sun" by The Beatles or "Can't Help Falling In Love" by Elvis create the perfect atmosphere of joy and love.

## Final tip

Always coordinate with your musician in advance. A skilled performer can adapt any song to the beach context, adjusting the tempo and arrangement so it sounds perfect outdoors.
      `,
    },
    'how-much-does-live-music-cost-wedding-mexico': {
      title: 'How much does live music cost for a wedding in Mexico?',
      excerpt: 'Complete breakdown of prices, formats and everything you need to know before hiring music for your wedding.',
      category: 'Guides & Tips',
      date: '2024-02-20',
      content: `
Hiring live music for your wedding in the Riviera Maya is one of the best investments you can make. But what does it actually cost?

## Factors that determine the price

**Format:** A solo musician (voice + guitar) is more affordable than a duo or band. The difference can be 30-50% more.

**Duration:** The most common sets are 45 or 90 minutes. Some musicians offer packages for multiple moments of the day (ceremony + cocktail + dinner).

**Location:** Travel costs vary by distance. Playa del Carmen tends to be the most affordable in the Riviera Maya.

**Season:** High season (November-April) typically has higher prices due to demand.

## Price ranges in 2024

For Playa del Carmen, prices for a quality solo musician range from $8,000 to $15,000 MXN per set, depending on duration and musician experience.

## What should be included

- Professional sound equipment
- Wide repertoire (no extra charge for repertoire songs)
- Guaranteed punctuality
- Appropriate attire for the event

Contact me to get an exact quote for your date.
      `,
    },
    'from-mendoza-to-tulum': {
      title: 'From Mendoza to Tulum: the story behind the music',
      excerpt: 'How an Argentine guitarist ended up playing at the most exclusive weddings in the Mexican Caribbean.',
      category: 'Roots',
      date: '2024-01-10',
      content: `
There's a phrase I love: "Music has no borders." I would add: "nor does the passion for it."

## The first chords

I grew up in Mendoza, Argentina, surrounded by mountains and vineyards. My uncle had a guitar that always sat in a corner of the living room. One day, when I was 12 years old, I picked it up and never put it down.

## The decision

In 2014, after years playing in bars and events in Argentina, I made a decision that changed my life: I moved to Mexico. I didn't know exactly what I would find, but something was calling me to the Caribbean.

## The Riviera Maya adopted me

My first year was difficult. Playing in the street, in small bars, meeting local musicians. But little by little, the Riviera Maya opened its doors to me. First small hotels, then weddings, then private events at luxury villas.

## Today

More than 10 years later, I can say I found my place in the world. The Riviera Maya gave me a career, friends, and the possibility to do what I love most: connect with people through music at the most important moments of their lives.
      `,
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS.es).flatMap((slug) =>
    ['es', 'en'].map((locale) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = BLOG_POSTS[locale]?.[slug]
  if (!post) return {}
  const pair = SLUG_PAIRS[slug] ?? slug
  const esSlug = locale === 'es' ? slug : pair
  const enSlug = locale === 'en' ? slug : pair
  return {
    title: post.title,
    description: post.excerpt,
    alternates: altsFor(locale, `/blog/${esSlug}`, `/blog/${enSlug}`),
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params
  const post = BLOG_POSTS[locale]?.[slug]
  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-negro">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro mb-6">
            {post.category} · {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="w-12 h-px bg-oro mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl text-hueso leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-hueso py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <p className="font-display text-xl text-negro/70 italic mb-10 border-l-2 border-oro pl-6">
              {post.excerpt}
            </p>
          </RevealOnScroll>
          <div className="prose prose-lg max-w-none font-sans text-negro/80 leading-relaxed">
            {post.content.trim().split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-display text-2xl text-negro mt-10 mb-4">
                    {block.replace('## ', '')}
                  </h2>
                )
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="font-sans font-semibold text-negro mb-3">
                    {block.replace(/\*\*/g, '')}
                  </p>
                )
              }
              return <p key={i} className="mb-4">{block}</p>
            })}
          </div>
        </div>
      </section>

      {/* Back + CTA */}
      <section className="bg-negro py-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/${locale}/blog`}
            className="font-sans text-xs tracking-widest uppercase text-oro hover:text-oro-dark flex items-center gap-2"
          >
            ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {locale === 'es' ? 'Cotizar mi evento' : 'Get a quote'}
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { '@type': 'Person', name: 'Nacho Rodriguez' },
            publisher: {
              '@type': 'Organization',
              name: 'Nacho Rodriguez Músico',
              url: 'https://nachorodriguezmusic.com',
            },
          }),
        }}
      />
    </>
  )
}
