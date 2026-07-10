import type { Metadata } from 'next'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'
import { getPathname } from '@/i18n/navigation'

// Pares de slug ES ↔ EN (cada post es traducción del otro), para hreflang.
const SLUG_PAIRS: Record<string, string> = {
  'mejor-musica-para-boda-en-playa': 'best-songs-beach-wedding-ceremony',
  'cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen': 'how-much-does-live-music-cost-wedding-mexico',
  'de-mendoza-a-tulum': 'from-mendoza-to-tulum',
  'musica-en-vivo-vs-dj-boda': 'live-music-vs-dj-wedding',
  'best-songs-beach-wedding-ceremony': 'mejor-musica-para-boda-en-playa',
  'how-much-does-live-music-cost-wedding-mexico': 'cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen',
  'from-mendoza-to-tulum': 'de-mendoza-a-tulum',
  'live-music-vs-dj-wedding': 'musica-en-vivo-vs-dj-boda',
}

const WHATSAPP_NUMBER = '525534010899'
function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

type BlogPost = {
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  faq?: Array<{ q: string; a: string }>
  ctaLabel?: string
  ctaHref?: string
}

const BLOG_POSTS: Record<string, Record<string, BlogPost>> = {
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
    'musica-en-vivo-vs-dj-boda': {
      title: 'Música en vivo vs. DJ para tu boda: cuál elegir (o cómo combinar los dos)',
      excerpt: 'El falso dilema que casi nadie resuelve bien: no se trata de elegir entre DJ o banda, sino de saber combinarlos según cada momento de tu fiesta.',
      category: 'Guías y Consejos',
      date: '2026-07-09',
      content: `
Casi todas las guías de bodas te plantean una pregunta binaria: ¿DJ o música en vivo? Es la pregunta equivocada. La correcta es cómo repartís energía, presupuesto y emoción a lo largo de tu fiesta — y ahí un set híbrido le gana por lejos a elegir un solo formato.

## El falso dilema

Las productoras grandes de la Riviera Maya suelen vender paquetes cerrados: o contratás su DJ, o contratás su banda. Te hacen elegir porque así es más simple armar el presupuesto para ellas, no necesariamente lo mejor para vos. Pero tu boda no tiene un solo momento: tiene una ceremonia, un cóctel, una cena y una fiesta, y cada uno pide algo distinto. Forzar un solo formato para las cuatro cosas es, muchas veces, la razón por la que tantas fiestas de boda terminan sonando igual.

## DJ o banda en vivo: qué te da cada uno

Antes de pensar en combinar, conviene entender qué resuelve bien cada formato y qué no.

| Formato | Energía | Presupuesto | Mejor momento |
| --- | --- | --- | --- |
| DJ | Alta y constante, mezcla sin cortes | $ | Pista de baile toda la noche |
| Banda o solista en vivo | Emocional, cercana, con presencia real | $$ | Ceremonia, cóctel, entrada, primer baile |
| Set híbrido (DJ + instrumento en vivo) | Lo mejor de los dos: calidez humana + pista que no para | $$–$$$ | Todo el evento, de la ceremonia a la fiesta |

## Por qué no tenés que elegir: el set híbrido

Hace años que armo sets híbridos: DJ más acordeón y guitarra en vivo tocando por encima de la base electrónica. No es un DJ con un músico al lado turnándose el micrófono — es una sola propuesta sonora, pensada para que justo cuando suena el track que todos están esperando, aparezca una guitarra o un acordeón en vivo tocando arriba, en tiempo real. Es la diferencia entre una playlist con buen sonido y un show.

Esto resuelve el problema real de fondo: no perdés la calidez de tener un músico ahí, tocando para ustedes, pero tampoco perdés la pista llena y el mix sin cortes que un buen DJ garantiza toda la noche.

## Cómo se arma un set híbrido, momento por momento

En la práctica, esto se traduce en un armado por bloques del evento:

- **Ceremonia:** guitarra o acordeón en vivo, el momento más emotivo, sin necesidad de un DJ todavía. Si todavía estás armando ese repertorio, te sirve [esta guía de canciones para boda en la playa](/blog/mejor-musica-para-boda-en-playa).
- **Cóctel:** formato acústico o dúo, con transiciones suaves que ya empiezan a sumar algo de base electrónica de fondo.
- **Cena:** ambientación con DJ a bajo volumen, con intervenciones en vivo puntuales entre platos, sin interrumpir la conversación de las mesas.
- **Fiesta:** ahí es donde el híbrido se luce de verdad. El DJ maneja la base y el ritmo, y encima suena guitarra o acordeón en vivo sobre los temas — el momento en que la pista realmente no para.

## Cuánto necesitás presupuestar

En México, un grupo o solista suele cobrar entre $2,500 y $6,000 MXN por hora, y en destinos turísticos con alta demanda de bodas internacionales —como Playa del Carmen, Tulum o Cancún— los precios corren entre un 20% y un 40% más. Un set híbrido no se cobra como "DJ más banda" por separado: se arma como un solo paquete adaptado a la duración real de tu evento. Si querés el desglose completo de precios y formatos, tengo [una guía específica sobre cuánto cuesta la música en vivo para una boda en Playa del Carmen](/blog/cuanto-cuesta-musica-en-vivo-boda-playa-del-carmen).

## No es DJ vs. banda. Es tu fiesta, bien pensada

Cerrar este falso dilema es más simple de lo que parece: no se trata de renunciar a nada, sino de asignar el formato correcto a cada momento de tu día. Contame cómo te imaginás tu fiesta, de la ceremonia a la última canción, y armamos juntos el formato que la haga sonar como vos la soñaste.
      `,
      faq: [
        {
          q: '¿Puedo tener DJ y música en vivo el mismo día sin que se pisen los horarios?',
          a: 'Sí, y es justamente lo que resuelve un set híbrido bien coordinado: un solo proveedor cubre ceremonia, cóctel, cena y fiesta con un cronograma armado de antemano, sin huecos de silencio ni superposiciones. Cero problemas operativos para vos ni para el venue.',
        },
        {
          q: '¿El set híbrido cuesta más que contratar DJ y banda por separado?',
          a: 'Generalmente no. Al ser un solo proveedor cubriendo todo el evento, evitás pagar dos traslados, dos equipos de sonido y dos coordinaciones distintas. El precio se calcula sobre la duración total de tu evento, no como la suma de dos contrataciones independientes.',
        },
        {
          q: '¿El formato híbrido funciona en bodas chicas o solo en eventos grandes?',
          a: 'Funciona en cualquier escala. En bodas íntimas incluso rinde más, porque un solo músico con equipo de DJ integrado puede cubrir ceremonia, cóctel y fiesta sin necesitar una producción grande.',
        },
        {
          q: '¿Con cuánta anticipación tengo que reservar el formato híbrido?',
          a: 'Para temporada alta (noviembre a abril) en la Riviera Maya, lo ideal es reservar con 6 a 12 meses de anticipación. Las fechas de fin de semana en Tulum y Playa del Carmen se llenan rápido.',
        },
      ],
      ctaLabel: 'Contame cómo imaginás tu fiesta →',
      ctaHref: waLink('Hola Nacho! Vi tu blog sobre música en vivo vs. DJ y quiero contarte cómo imagino la música de mi boda.'),
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
    'live-music-vs-dj-wedding': {
      title: 'Live music vs. DJ for your wedding: how to choose (or how to combine both)',
      excerpt: 'The false dilemma almost nobody solves well: it is not about choosing between DJ or band, but knowing how to combine them for each moment of your party.',
      category: 'Guides & Tips',
      date: '2026-07-09',
      content: `
Almost every wedding guide asks you a binary question: DJ or live music? That is the wrong question. The right one is how you distribute energy, budget, and emotion across your celebration — and that is where a hybrid set beats picking a single format by a wide margin.

## The false dilemma

Large production companies in the Riviera Maya often sell closed packages: either you book their DJ, or you book their band. They make you choose because it is simpler for their budgeting, not necessarily best for you. But your wedding does not have a single moment: it has a ceremony, a cocktail hour, a dinner, and a party, and each one calls for something different. Forcing one format to cover all four is often why so many wedding parties end up sounding the same.

## DJ or live band: what each one actually gives you

Before thinking about combining them, it helps to understand what each format solves well, and what it does not.

| Format | Energy | Budget | Best moment |
| --- | --- | --- | --- |
| DJ | High and constant, seamless mix | $ | Dance floor all night |
| Live band or soloist | Emotional, close, with real presence | $$ | Ceremony, cocktail hour, entrance, first dance |
| Hybrid set (DJ + live instrument) | The best of both: human warmth + a floor that never stops | $$–$$$ | The whole event, from ceremony to party |

## Why you don't have to choose: the hybrid set

For years I've been building hybrid sets: DJ plus accordion and live guitar playing over the electronic base. It's not a DJ with a musician taking turns on the mic — it's a single sound proposal, built so that right when the track everyone's been waiting for drops, a live guitar or accordion comes in on top, in real time. That's the difference between a playlist with good sound and an actual show.

This solves the real underlying problem: you don't lose the warmth of having a musician there, playing for you, but you also don't lose the packed floor and seamless mix a good DJ guarantees all night.

## How a hybrid set is built, moment by moment

In practice, this means building the event in blocks:

- **Ceremony:** live guitar or accordion, the most emotional moment, no DJ needed yet. If you're still putting together that playlist, check out [this guide to beach wedding ceremony songs](/blog/best-songs-beach-wedding-ceremony).
- **Cocktail hour:** acoustic or duo format, with smooth transitions that start adding some electronic backing.
- **Dinner:** low-volume DJ ambiance, with occasional live interludes between courses, without interrupting conversation at the tables.
- **Party:** this is where the hybrid format really shines. The DJ drives the base and rhythm, and live guitar or accordion plays over the tracks — the moment the floor truly never stops.

## How much you need to budget

In Mexico, a band or soloist typically charges between $2,500 and $6,000 MXN per hour, and in tourist destinations with high demand for international weddings —like Playa del Carmen, Tulum, or Cancún— prices run 20% to 40% higher. A hybrid set isn't priced as "DJ plus band" separately: it's built as a single package adapted to your event's actual duration. For the full price and format breakdown, I have [a specific guide on how much live music costs for a wedding in Mexico](/blog/how-much-does-live-music-cost-wedding-mexico).

## It's not live music vs. DJ. It's your party, thought through

Closing this false dilemma is simpler than it looks: it's not about giving anything up, it's about assigning the right format to each moment of your day. Tell me how you picture your party, from the ceremony to the last song, and we'll build the format that makes it sound exactly like you imagined it.
      `,
      faq: [
        {
          q: 'Can I have a DJ and live music on the same day without the schedules clashing?',
          a: 'Yes, and that is exactly what a well-coordinated hybrid set solves: a single provider covers ceremony, cocktail hour, dinner, and party with a timeline built in advance, with no dead air or overlaps. Zero operational headaches for you or the venue.',
        },
        {
          q: 'Does a hybrid set cost more than booking a DJ and a band separately?',
          a: 'Generally, no. With a single provider covering the whole event, you avoid paying for two travel fees, two sound systems, and two separate coordination efforts. Pricing is based on your event\'s total duration, not the sum of two independent bookings.',
        },
        {
          q: 'Does the hybrid format work for small weddings, or only large events?',
          a: 'It works at any scale. For intimate weddings it can actually work even better, since a single musician with integrated DJ equipment can cover ceremony, cocktail hour, and party without needing a large production.',
        },
        {
          q: 'How far in advance do I need to book the hybrid format?',
          a: 'For high season (November to April) in the Riviera Maya, it\'s best to book 6 to 12 months in advance. Weekend dates in Tulum and Playa del Carmen fill up fast.',
        },
      ],
      ctaLabel: 'Tell me how you picture your party →',
      ctaHref: waLink('Hi Nacho! I saw your blog post about live music vs. DJ and I want to tell you how I imagine the music for my wedding.'),
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

// Parser inline muy simple para **negrita** y [texto](url) dentro de un bloque.
function renderInline(text: string, keyPrefix: string, locale: string) {
  const nodes: Array<string | ReactElement> = []
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let n = 0
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-${n++}`} className="font-semibold text-negro">
          {match[1]}
        </strong>
      )
    } else if (match[2] !== undefined) {
      const href = match[3].startsWith('/') ? `/${locale}${match[3]}` : match[3]
      nodes.push(
        <Link key={`${keyPrefix}-${n++}`} href={href} className="text-oro-dark underline hover:no-underline">
          {match[2]}
        </Link>
      )
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
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
              if (block.startsWith('### ')) {
                return (
                  <h3 key={i} className="font-display text-lg text-negro mt-6 mb-2">
                    {block.replace('### ', '')}
                  </h3>
                )
              }
              const lines = block.split('\n').filter(Boolean)
              if (lines.length > 1 && lines.every((l) => l.trim().startsWith('|'))) {
                const rows = lines.map((l) =>
                  l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())
                )
                const [header, , ...body] = rows
                return (
                  <div key={i} className="overflow-x-auto mb-8 not-prose">
                    <table className="w-full text-sm border border-negro/10">
                      <thead>
                        <tr className="bg-negro/5">
                          {header.map((h, hi) => (
                            <th key={hi} className="text-left font-sans font-semibold text-negro p-3 border-b border-negro/10">
                              {renderInline(h, `th-${i}-${hi}`, locale)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {body.map((row, ri) => (
                          <tr key={ri} className="border-b border-negro/5 last:border-0">
                            {row.map((cell, ci) => (
                              <td key={ci} className="p-3 align-top text-negro/80">
                                {renderInline(cell, `td-${i}-${ri}-${ci}`, locale)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              if (lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))) {
                return (
                  <ul key={i} className="list-disc pl-5 mb-4 space-y-2">
                    {lines.map((l, li) => (
                      <li key={li}>{renderInline(l.trim().replace(/^- /, ''), `li-${i}-${li}`, locale)}</li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="mb-4">
                  {renderInline(block, `p-${i}`, locale)}
                </p>
              )
            })}
          </div>

          {post.faq && post.faq.length > 0 && (
            <div className="mt-14 pt-10 border-t border-negro/10">
              <h2 className="font-display text-2xl text-negro mb-6">
                {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </h2>
              <div className="space-y-6">
                {post.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-sans font-semibold text-negro mb-2">{item.q}</h3>
                    <p className="font-sans text-negro/80 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back + CTA */}
      <section className="bg-negro py-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={getPathname({ locale, href: '/blog' })}
            className="font-sans text-xs tracking-widest uppercase text-oro hover:text-oro-dark flex items-center gap-2"
          >
            ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>
          {post.ctaHref ? (
            <a href={post.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-gold">
              {post.ctaLabel}
            </a>
          ) : (
            <Link href={getPathname({ locale, href: '/contact' })} className="btn-gold">
              {locale === 'es' ? 'Cotizar mi evento' : 'Get a quote'}
            </Link>
          )}
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
      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      )}
    </>
  )
}
