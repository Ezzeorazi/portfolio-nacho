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
  'musica-en-vivo-posadas-fin-de-ano-riviera-maya': 'live-music-holiday-parties-new-years-eve-riviera-maya',
  'pedida-de-mano-con-musica-en-vivo-tulum-playa-del-carmen': 'marriage-proposal-live-music-tulum-playa-del-carmen',
  'duo-de-guitarras-para-boda': 'guitar-duo-for-wedding',
  'live-music-holiday-parties-new-years-eve-riviera-maya': 'musica-en-vivo-posadas-fin-de-ano-riviera-maya',
  'marriage-proposal-live-music-tulum-playa-del-carmen': 'pedida-de-mano-con-musica-en-vivo-tulum-playa-del-carmen',
  'guitar-duo-for-wedding': 'duo-de-guitarras-para-boda',
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
  updated?: string
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
      title: '¿Cuánto cuesta música en vivo para una boda en Playa del Carmen? (precios 2026-2027)',
      excerpt: 'Rangos de precio 2026-2027 para solista, dúo de guitarras y banda en la Riviera Maya, qué debe incluir la cotización y cómo ahorrar sin perder calidad.',
      category: 'Guías y Consejos',
      date: '2024-02-20',
      updated: '2026-10-21',
      content: `
Contratar música en vivo para tu boda en Playa del Carmen es una de las mejores inversiones que podés hacer. Pero ¿cuánto cuesta exactamente? Actualicé esta guía para la temporada 2026-2027 con rangos de mercado reales de la Riviera Maya.

## Factores que determinan el precio

**Formato:** Un solista (voz + guitarra) es más accesible que un dúo de guitarras o una banda. Un dúo suele costar entre un 30% y un 50% más que un solista.

**Duración:** Los sets más comunes son de 45 o 90 minutos. Muchas parejas arman paquetes para varios momentos del día (ceremonia + cóctel + cena), que salen mejor que contratar cada momento por separado.

**Ubicación:** El traslado varía según la distancia. Playa del Carmen suele ser la más económica de la Riviera Maya; Tulum y la zona hotelera de Cancún suman traslado.

**Temporada:** Alta temporada (noviembre-abril) tiene más demanda, y las fechas de fin de semana se reservan con meses de anticipación.

## Rangos de precio 2026-2027 en la Riviera Maya

Estos son rangos de referencia del mercado, no una tarifa cerrada. El precio final depende de la fecha, el lugar y la duración.

| Formato | Ceremonia (30-45 min) | Evento completo (2-3 sets) |
| --- | --- | --- |
| Solista (voz y guitarra) | $4,000 – $9,000 MXN | $8,000 – $15,000 MXN |
| Dúo de guitarras | $6,000 – $12,000 MXN | $12,000 – $22,000 MXN |
| Banda completa | — | Desde $25,000 MXN |

En directorios de bodas vas a ver solistas "desde $2,500 MXN". Ojo: ese suele ser el precio de una hora en interior, sin traslado ni equipo para exteriores. Para una boda en la playa conviene comparar paquetes completos.

## Lo que debe incluir

- Equipo de sonido profesional, apto para exteriores si la boda es en playa o jardín
- Repertorio amplio (sin costo extra por canciones del repertorio)
- Coordinación de tiempos con tu wedding planner
- Puntualidad garantizada
- Vestuario apropiado para el evento

## Cómo ahorrar sin perder calidad

- **Combiná formatos:** solista en la ceremonia y dúo en el cóctel y la fiesta.
- **Reservá temprano:** en temporada alta, cuanto antes cerrás, más opciones de fecha y formato tenés.
- **Un solo proveedor para todo el día:** evitás pagar dos traslados y dos equipos.

Si estás comparando opciones, en la [guía para elegir la música de tu boda](/guia-musica-boda) están las preguntas que conviene hacerle a cualquier músico antes de reservar. Y si ya tenés fecha, escribime y te paso la cotización exacta.
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
    'musica-en-vivo-posadas-fin-de-ano-riviera-maya': {
      title: 'Música en vivo para posadas y cenas de fin de año en la Riviera Maya',
      excerpt: 'Posadas de empresa, cenas navideñas en villa y Año Nuevo: cómo elegir el formato, qué repertorio funciona y con cuánta anticipación reservar en plena temporada alta.',
      category: 'Guías y Consejos',
      date: '2026-10-21',
      content: `
Diciembre en la Riviera Maya es la época más intensa del año: hoteles llenos, villas reservadas de punta a punta y todas las empresas buscando fecha para su posada. Si estás organizando una celebración de fin de año, la música es lo que más rápido se agota, así que conviene resolverla ahora.

## Tres tipos de evento, tres necesidades distintas

| Evento | Qué pide la música | Formato que mejor funciona |
| --- | --- | --- |
| Posada o cena de empresa | Ambiente para conversar al principio, energía para cerrar | Solista o dúo de guitarras, con set bailable al final |
| Cena navideña en villa | Calidez, cercanía, volumen bajo | Solista acústico o dúo de guitarras |
| Fiesta de Año Nuevo | Energía toda la noche y un brindis memorable | Dúo, banda o set híbrido con DJ |

## Posadas de empresa: que la música acompañe y después levante

En una posada la gente llega de trabajar, se saluda, come y recién después se suelta. El error más común es arrancar con volumen de fiesta cuando todavía nadie terminó de llegar. Lo que mejor funciona es un primer bloque acústico —clásicos en español e inglés, versiones conocidas por todos— y un cierre con rock, cumbia y pop para que el equipo termine bailando.

Si en la empresa hay personas de distintos países, el repertorio bilingüe hace una diferencia enorme: nadie queda afuera.

## Cenas navideñas en villa: la música como anfitriona

En una cena privada la música no tiene que competir con la mesa. Un solista o un dúo de guitarras arma un ambiente cálido sin invadir, y puede adaptar el repertorio en el momento según cómo vaya la noche: más tranquilo durante la cena, más arriba en la sobremesa.

## Año Nuevo: el brindis también se planea

Para la noche del 31 lo importante es la curva de energía: cena relajada, subida antes de la medianoche y fiesta después del brindis. Conviene acordar con el músico cuál va a ser la canción del brindis y qué pasa en los minutos previos, para que la cuenta regresiva no quede en silencio.

## Con cuánta anticipación reservar

Las fechas de diciembre —sobre todo los viernes y sábados, y el 24 y el 31— se reservan con meses de anticipación. Si tu evento es en diciembre, lo ideal es cerrar la música en octubre o principios de noviembre. Después quedan pocas fechas y menos opciones de formato.

## Qué tener listo para pedir cotización

- Fecha y horario aproximado
- Lugar (hotel, villa, restaurante) y si es interior o exterior
- Cantidad de invitados
- Si querés solo ambiente, solo fiesta, o las dos cosas

Con eso te puedo decir en el día si tengo la fecha libre y qué formato te conviene.
      `,
      faq: [
        {
          q: '¿Llevan equipo de sonido para una posada en hotel o villa?',
          a: 'Sí, el equipo de amplificación está incluido y se adapta al tamaño del lugar. Para eventos de más de cien personas conviene confirmar con el venue si ya tienen sonido propio.',
        },
        {
          q: '¿Pueden tocar en una villa en Tulum o Puerto Morelos aunque no sea en Playa del Carmen?',
          a: 'Sí, toco en toda la Riviera Maya: Playa del Carmen, Tulum, Cancún, Puerto Morelos y alrededores. El traslado se incluye en la cotización.',
        },
        {
          q: '¿Qué formato conviene para un grupo de 30 a 50 personas?',
          a: 'Para ese tamaño, un solista o un dúo de guitarras es ideal: suficiente presencia para animar, sin necesitar una producción grande.',
        },
      ],
      ctaLabel: 'Consultar fecha de diciembre →',
      ctaHref: waLink('Hola Nacho! Vi tu post sobre posadas y fin de año y quiero consultar disponibilidad para diciembre.'),
    },
    'pedida-de-mano-con-musica-en-vivo-tulum-playa-del-carmen': {
      title: 'Cómo organizar una pedida de mano con música en vivo en Tulum o Playa del Carmen',
      excerpt: 'Lugar, horario, la canción y el momento exacto en que entra la música: todo lo que hay que coordinar para que la propuesta salga perfecta.',
      category: 'Guías y Consejos',
      date: '2026-10-21',
      content: `
Diciembre es la temporada de propuestas de matrimonio por excelencia, y la Riviera Maya es uno de los lugares más elegidos para hacerlas. Una pedida de mano con música en vivo es corta —a veces dura una sola canción— pero tiene que salir perfecta, porque no hay segunda toma.

## Elegí el lugar pensando en la música

La playa al atardecer es la opción clásica, pero tiene dos detalles: el viento y la gente alrededor. Un cenote, la terraza de un restaurante o una villa privada dan más intimidad y mejor sonido. Si elegís playa, buscá un tramo tranquilo y avisá al músico para que lleve el equipo adecuado para exteriores.

## La hora importa más de lo que parece

El atardecer en la Riviera Maya en diciembre es temprano, alrededor de las 17:30. Para tener la mejor luz en las fotos, la propuesta tiene que ocurrir unos 20-30 minutos antes. Todo el plan se arma hacia atrás desde esa hora.

## La canción

Lo ideal es una canción que tenga historia para ustedes dos. Si no hay una obvia, estas funcionan siempre en versión acústica:

- "Perfect" — Ed Sheeran
- "Can't Help Falling In Love" — Elvis Presley
- "Thinking Out Loud" — Ed Sheeran
- "Sabor a Mí"
- "Tú" — Alejandro Sanz

Si la canción no está en mi repertorio, avisame con anticipación y la preparo especialmente.

## Cómo se coordina el momento exacto

La parte más delicada es la señal. Antes del día acordamos:

- **Dónde espera el músico:** a la vista pero sin llamar la atención, o directamente escondido.
- **La señal de entrada:** un gesto, un mensaje o una frase.
- **Qué pasa después del "sí":** una segunda canción para celebrar, o un set corto si hay familia o amigos esperando.

## Solista o dúo de guitarras

Para una sorpresa íntima, un solista es más discreto y fácil de esconder. Si después de la propuesta hay festejo con amigos o una cena, el dúo de guitarras le da más cuerpo a ese momento.

## Con cuánta anticipación reservar

Para diciembre, apenas tengas la fecha. Las propuestas suelen caer en fines de semana y en días especiales como Navidad o Año Nuevo, que son las primeras fechas que se llenan.
      `,
      faq: [
        {
          q: '¿Cuánto dura una pedida de mano con música en vivo?',
          a: 'La propuesta en sí son una o dos canciones, pero conviene reservar al menos 30-45 minutos para coordinar, esperar el momento justo y seguir tocando en el festejo.',
        },
        {
          q: '¿Pueden coordinar con el fotógrafo o el restaurante?',
          a: 'Sí, es lo recomendable. Coordino la señal y los tiempos con el fotógrafo y con el lugar para que todo pase en el momento justo.',
        },
        {
          q: '¿Tocan en playa o cenote?',
          a: 'Sí, con equipo adaptado para exteriores. Para cenotes conviene confirmar antes las reglas del lugar sobre sonido amplificado.',
        },
      ],
      ctaLabel: 'Planear mi propuesta →',
      ctaHref: waLink('Hola Nacho! Estoy planeando una pedida de mano y quiero música en vivo. ¿Me ayudás a organizarla?'),
    },
    'duo-de-guitarras-para-boda': {
      title: 'Dúo de guitarras para tu boda: por qué funciona (y por qué toco con mi hermano)',
      excerpt: 'Más cuerpo que un solista, más cercanía que una banda: cuándo conviene un dúo de guitarras en tu boda o evento y cómo suena en cada momento.',
      category: 'El Cantautor',
      date: '2026-10-21',
      content: `
En los últimos meses el formato que más estoy tocando es el dúo de guitarras con mi hermano. Y no es casualidad: es el formato que mejor resuelve lo que la mayoría de las bodas y eventos necesitan.

## Qué agrega una segunda guitarra

Con una sola guitarra, el músico tiene que cubrir ritmo y melodía al mismo tiempo. Con dos, una puede sostener la base mientras la otra hace arreglos, punteos y solos. El resultado es un sonido más lleno, con más dinámica, sin perder la calidez de lo acústico.

## Por qué con mi hermano

Tocar con familia tiene algo que no se ensaya: nos conocemos de memoria. Sabemos cuándo el otro va a cambiar de tema, cuándo alargar una canción porque la pista está prendida o cuándo bajar porque empieza un brindis. Esa comunicación sin palabras es lo que hace que un dúo suene a uno solo.

## Cómo suena en cada momento de tu boda

| Momento | Qué hace el dúo |
| --- | --- |
| Ceremonia | Arreglos a dos guitarras para la entrada, los votos y la salida |
| Cóctel | Clásicos en español e inglés, con más presencia que un solista |
| Cena | Volumen bajo, repertorio tranquilo, sin competir con las mesas |
| Fiesta | Rock, cumbia y pop con energía para levantar la pista |

## Solista, dúo o banda: cómo decidir

- **Solista:** ideal para ceremonias íntimas, cenas y eventos de hasta unos cien invitados.
- **Dúo de guitarras:** el punto medio. Más cuerpo y energía, sin necesitar la logística ni el presupuesto de una banda.
- **Banda:** para fiestas grandes que piden volumen y una formación completa.

Si tenés dudas, una buena opción es combinar: solista en la ceremonia y dúo en el cóctel y la fiesta. En la [guía para elegir la música de tu boda](/guia-musica-boda) explico cómo repartir los formatos por momento.

## Escuchalo antes de decidir

En Instagram subo videos de los shows de cada semana, muchos en dúo. Es la mejor forma de saber cómo suena antes de reservar.
      `,
      faq: [
        {
          q: '¿El dúo de guitarras canta en español e inglés?',
          a: 'Sí, el repertorio es bilingüe, ideal para bodas de destino con invitados de distintos países.',
        },
        {
          q: '¿El dúo cuesta el doble que un solista?',
          a: 'No necesariamente. Suele estar entre un 30% y un 50% por encima del solista, según duración y lugar. Te paso la cotización exacta para tu fecha.',
        },
        {
          q: '¿Puedo pedir canciones especiales para el dúo?',
          a: 'Sí. Con anticipación preparamos el arreglo a dos guitarras de la canción que quieras.',
        },
      ],
      ctaLabel: 'Consultar el dúo para mi fecha →',
      ctaHref: waLink('Hola Nacho! Me interesa el dúo de guitarras para mi evento. ¿Tenés disponibilidad?'),
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
      title: 'How much does live music cost for a wedding in Mexico? (2026-2027 prices)',
      excerpt: '2026-2027 price ranges for a soloist, guitar duo and band in the Riviera Maya, what the quote should include and how to save without losing quality.',
      category: 'Guides & Tips',
      date: '2024-02-20',
      updated: '2026-10-21',
      content: `
Hiring live music for your wedding in the Riviera Maya is one of the best investments you can make. But what does it actually cost? I've updated this guide for the 2026-2027 season with real market ranges from the Riviera Maya.

## Factors that determine the price

**Format:** A solo musician (voice + guitar) is more affordable than a guitar duo or a band. A duo usually costs 30% to 50% more than a soloist.

**Duration:** The most common sets are 45 or 90 minutes. Many couples book packages for several moments of the day (ceremony + cocktail + dinner), which work out better than booking each moment separately.

**Location:** Travel costs vary by distance. Playa del Carmen tends to be the most affordable in the Riviera Maya; Tulum and Cancun's hotel zone add travel.

**Season:** High season (November-April) has more demand, and weekend dates get booked months in advance.

## 2026-2027 price ranges in the Riviera Maya

These are market reference ranges, not a fixed rate. The final price depends on the date, venue and duration.

| Format | Ceremony (30-45 min) | Full event (2-3 sets) |
| --- | --- | --- |
| Solo (voice and guitar) | $4,000 – $9,000 MXN | $8,000 – $15,000 MXN |
| Guitar duo | $6,000 – $12,000 MXN | $12,000 – $22,000 MXN |
| Full band | — | From $25,000 MXN |

On wedding directories you'll see soloists "from $2,500 MXN". Keep in mind that's usually the price of one indoor hour, without travel or outdoor gear. For a beach wedding, compare full packages.

## What should be included

- Professional sound equipment, outdoor-ready if the wedding is on the beach or in a garden
- Wide repertoire (no extra charge for repertoire songs)
- Timeline coordination with your wedding planner
- Guaranteed punctuality
- Appropriate attire for the event

## How to save without losing quality

- **Mix formats:** solo for the ceremony and duo for cocktail hour and the party.
- **Book early:** in high season, the sooner you book, the more date and format options you have.
- **One provider for the whole day:** you avoid paying for two travel fees and two sound systems.

If you're comparing options, the [guide to choosing your wedding music](/wedding-music-guide) has the questions worth asking any musician before booking. And if you already have a date, write to me and I'll send you the exact quote.
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
    'live-music-holiday-parties-new-years-eve-riviera-maya': {
      title: 'Live music for holiday parties and New Year\'s Eve in the Riviera Maya',
      excerpt: 'Company holiday parties, Christmas dinners at a villa and New Year\'s Eve: how to choose the format, what repertoire works and how far ahead to book in peak season.',
      category: 'Guides & Tips',
      date: '2026-10-21',
      content: `
December in the Riviera Maya is the busiest time of the year: hotels are full, villas are booked back to back and every company is looking for a date for its holiday party. If you're planning a year-end celebration, music is what sells out first, so it pays to sort it out now.

## Three kinds of event, three different needs

| Event | What the music needs to do | Format that works best |
| --- | --- | --- |
| Company holiday party | Background for conversation first, energy to close | Solo or guitar duo, with a dance set at the end |
| Christmas dinner at a villa | Warmth, closeness, low volume | Acoustic solo or guitar duo |
| New Year's Eve party | Energy all night and a memorable toast | Duo, band or hybrid set with DJ |

## Company parties: accompany first, lift later

At a holiday party people arrive from work, say hello, eat, and only then loosen up. The most common mistake is starting at party volume when half the guests haven't arrived. What works best is an acoustic first block —classics in Spanish and English, songs everybody knows— and a closing set of rock, cumbia and pop so the team ends up dancing.

If your team is international, a bilingual repertoire makes a huge difference: nobody is left out.

## Christmas dinners at a villa: music as the host

At a private dinner the music shouldn't compete with the table. A soloist or a guitar duo creates a warm atmosphere without taking over, and can adapt the repertoire on the fly: calmer during dinner, more upbeat afterwards.

## New Year's Eve: the toast needs a plan too

On the 31st what matters is the energy curve: relaxed dinner, build-up before midnight, party after the toast. Agree with your musician on the toast song and what happens in the minutes before, so the countdown isn't left in silence.

## How far ahead to book

December dates —especially Fridays, Saturdays, the 24th and the 31st— get booked months in advance. If your event is in December, the ideal is to lock in the music in October or early November. After that, few dates and fewer format options remain.

## What to have ready when you ask for a quote

- Date and approximate time
- Venue (hotel, villa, restaurant) and whether it's indoors or outdoors
- Number of guests
- Whether you want background music, a party, or both

With that I can tell you the same day whether I'm available and which format fits best.
      `,
      faq: [
        {
          q: 'Do you bring sound equipment for a party at a hotel or villa?',
          a: 'Yes, amplification is included and adapted to the size of the venue. For events of more than a hundred guests, check whether the venue already has its own sound system.',
        },
        {
          q: 'Can you play at a villa in Tulum or Puerto Morelos, not just Playa del Carmen?',
          a: 'Yes, I play all over the Riviera Maya: Playa del Carmen, Tulum, Cancun, Puerto Morelos and nearby. Travel is included in the quote.',
        },
        {
          q: 'Which format works for a group of 30 to 50 people?',
          a: 'For that size, a soloist or a guitar duo is ideal: enough presence to lift the room without needing a large production.',
        },
      ],
      ctaLabel: 'Check a December date →',
      ctaHref: waLink('Hi Nacho! I read your post about holiday parties and New Year\'s Eve and I want to check your availability for December.'),
    },
    'marriage-proposal-live-music-tulum-playa-del-carmen': {
      title: 'How to plan a marriage proposal with live music in Tulum or Playa del Carmen',
      excerpt: 'Location, timing, the song and the exact moment the music comes in: everything to coordinate so your proposal goes perfectly.',
      category: 'Guides & Tips',
      date: '2026-10-21',
      content: `
December is proposal season, and the Riviera Maya is one of the most popular places to pop the question. A proposal with live music is short —sometimes a single song— but it has to be perfect, because there's no second take.

## Choose the spot with the music in mind

The beach at sunset is the classic choice, but it comes with two details: wind and people around. A cenote, a restaurant terrace or a private villa give you more privacy and better sound. If you go with the beach, look for a quiet stretch and tell your musician so they bring outdoor-ready gear.

## Timing matters more than you think

Sunset in the Riviera Maya in December is early, around 5:30 pm. For the best light in your photos, the proposal should happen 20-30 minutes before. The whole plan is built backwards from that time.

## The song

Ideally, a song that has a story for the two of you. If there isn't an obvious one, these always work acoustically:

- "Perfect" — Ed Sheeran
- "Can't Help Falling In Love" — Elvis Presley
- "Thinking Out Loud" — Ed Sheeran
- "Sabor a Mí"
- "Tú" — Alejandro Sanz

If your song isn't in my repertoire, let me know in advance and I'll prepare it especially for you.

## How the exact moment is coordinated

The trickiest part is the cue. Before the day we agree on:

- **Where the musician waits:** in sight but low-key, or fully hidden.
- **The cue:** a gesture, a text or a phrase.
- **What happens after the "yes":** a second song to celebrate, or a short set if friends or family are waiting.

## Solo or guitar duo

For an intimate surprise, a soloist is more discreet and easier to hide. If there's a celebration with friends or a dinner afterwards, the guitar duo gives that moment more body.

## How far ahead to book

For December, as soon as you have the date. Proposals usually fall on weekends and special days like Christmas or New Year's Eve, which are the first dates to fill up.
      `,
      faq: [
        {
          q: 'How long does a proposal with live music take?',
          a: 'The proposal itself is one or two songs, but it\'s worth booking at least 30-45 minutes to coordinate, wait for the right moment and keep playing for the celebration.',
        },
        {
          q: 'Can you coordinate with the photographer or the restaurant?',
          a: 'Yes, and it\'s recommended. I coordinate the cue and timing with the photographer and the venue so everything happens at the right moment.',
        },
        {
          q: 'Do you play on the beach or in a cenote?',
          a: 'Yes, with outdoor-ready equipment. For cenotes, check the venue\'s rules on amplified sound beforehand.',
        },
      ],
      ctaLabel: 'Plan my proposal →',
      ctaHref: waLink('Hi Nacho! I\'m planning a marriage proposal and I\'d love live music. Can you help me organize it?'),
    },
    'guitar-duo-for-wedding': {
      title: 'A guitar duo for your wedding: why it works (and why I play with my brother)',
      excerpt: 'More body than a soloist, more intimacy than a band: when a guitar duo is the right call for your wedding or event, and how it sounds at each moment.',
      category: 'The Singer-Songwriter',
      date: '2026-10-21',
      content: `
Lately the format I play the most is a guitar duo with my brother. That's no accident: it's the format that best solves what most weddings and events need.

## What a second guitar adds

With a single guitar, the musician has to cover rhythm and melody at the same time. With two, one holds the groove while the other plays arrangements, fills and solos. The result is a fuller sound with more dynamics, without losing that acoustic warmth.

## Why with my brother

Playing with family has something you can't rehearse: we know each other by heart. We know when the other one is about to switch songs, when to stretch a tune because the dance floor is on fire, or when to bring it down because a toast is about to start. That wordless communication is what makes a duo sound like one.

## How it sounds at each moment of your wedding

| Moment | What the duo does |
| --- | --- |
| Ceremony | Two-guitar arrangements for the processional, vows and recessional |
| Cocktail hour | Classics in Spanish and English, with more presence than a soloist |
| Dinner | Low volume, calm repertoire, never competing with the tables |
| Party | Rock, cumbia and pop with enough energy to fill the floor |

## Solo, duo or band: how to decide

- **Solo:** ideal for intimate ceremonies, dinners and events of up to around a hundred guests.
- **Guitar duo:** the sweet spot. More body and energy, without the logistics or budget of a band.
- **Band:** for big parties that call for volume and a full line-up.

If you're unsure, a good option is to combine: solo for the ceremony and duo for cocktail hour and the party. In the [guide to choosing your wedding music](/wedding-music-guide) I explain how to split formats by moment.

## Hear it before you decide

On Instagram I post videos from each week's shows, many of them as a duo. It's the best way to know how it sounds before you book.
      `,
      faq: [
        {
          q: 'Does the guitar duo sing in Spanish and English?',
          a: 'Yes, the repertoire is bilingual, ideal for destination weddings with guests from different countries.',
        },
        {
          q: 'Does the duo cost twice as much as a soloist?',
          a: 'Not necessarily. It\'s usually 30% to 50% above the solo rate, depending on duration and venue. I\'ll send you the exact quote for your date.',
        },
        {
          q: 'Can I request special songs for the duo?',
          a: 'Yes. With some notice we prepare a two-guitar arrangement of any song you want.',
        },
      ],
      ctaLabel: 'Check the duo for my date →',
      ctaHref: waLink('Hi Nacho! I\'m interested in the guitar duo for my event. Are you available?'),
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
            {post.category} · {post.updated && (locale === 'es' ? 'Actualizado ' : 'Updated ')}
            {new Date(post.updated ?? post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
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

      {/* Guía — el que llega por el blog casi nunca viene a contratar todavía,
          así que le ofrecemos el paso intermedio antes del CTA de cotizar. */}
      <section data-loc="blog_guide" className="bg-negro pt-16 px-4">
        <div className="max-w-3xl mx-auto border border-oro/20 p-8 text-center">
          <div className="w-10 h-px bg-oro mx-auto mb-5" />
          <h2 className="font-display text-2xl text-hueso mb-3">
            {locale === 'es'
              ? 'La guía completa para la música de tu boda'
              : 'The complete guide to your wedding music'}
          </h2>
          <p className="font-sans text-sm text-arena/70 leading-relaxed mb-6">
            {locale === 'es'
              ? 'Cuándo contratar, qué formato va en cada momento, qué debería incluir el presupuesto y las 12 preguntas que le tenés que hacer a tu músico.'
              : 'When to book, which format fits each moment, what the quote should include, and the 12 questions to ask your musician.'}
          </p>
          <Link
            href={getPathname({ locale, href: '/guide' })}
            data-cta="guide"
            className="btn-outline"
          >
            {locale === 'es' ? 'Leer la guía' : 'Read the guide'}
          </Link>
        </div>
      </section>

      {/* Back + CTA */}
      <section className="bg-negro py-16 px-4">
        <div data-loc="blog_post" className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={getPathname({ locale, href: '/blog' })}
            className="font-sans text-xs tracking-widest uppercase text-oro hover:text-oro-dark flex items-center gap-2"
          >
            ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>
          {post.ctaHref ? (
            <a href={post.ctaHref} target="_blank" rel="noopener noreferrer" data-cta="quote" className="btn-gold">
              {post.ctaLabel}
            </a>
          ) : (
            <Link href={getPathname({ locale, href: '/contact' })} data-cta="quote" className="btn-gold">
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
            dateModified: post.updated ?? post.date,
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
