import type { Locale } from "@/lib/locale";

export type PostSection = { heading: string; paragraphs: string[] };

export type PostCopy = {
  title: string;
  excerpt: string;
  sections: PostSection[];
};

export type Post = {
  slug: string;
  /** ISO date of publication. */
  date: string;
  /** ISO date of the last substantive edit, when it differs from the publication. */
  updated?: string;
  /** Short topics, used as keywords and shown under the title. */
  tags?: string[];
  /** Slug of the case study the post expands on, linked at the end. */
  relatedCase?: string;
  author: { name: string; avatar: string };
  cover: { src: string; width: number; height: number; alt: Record<Locale, string> };
  copy: Record<Locale, PostCopy>;
};

const LUMINTIK = { name: "Lumintik", avatar: "/lumintik-icon.png" };

/**
 * The posts, newest first. Each one expands on a published case study or on
 * work done for it; every figure was measured on the live product or is
 * verifiable in its code, and nothing here goes beyond that.
 */
export const POSTS: Post[] = [
  {
    slug: "todas-tus-cuentas-en-una-sola-pantalla",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/fridoom/home.webp",
      width: 2000,
      height: 1250,
      alt: {
        ES: "Página de inicio de Fridoom",
        EN: "Fridoom home page",
      },
    },
    tags: ["Finanzas personales", "Móvil", "Privacidad"],
    copy: {
      ES: {
        title: "Todas tus cuentas en una sola pantalla: qué resuelve Fridoom",
        excerpt: "El dinero de una persona vive repartido entre bancos, tarjetas, inversiones y una hoja de cálculo. Fridoom lo junta en un solo lugar, en el teléfono, sin vender tu atención.",
        sections: [
          {
            heading: "El problema no es ahorrar, es no saber",
            paragraphs: [
              "Casi nadie tiene un solo banco. Hay una cuenta de nómina, otra de ahorros, dos tarjetas, un fondo de inversión, quizá algo de cripto y, casi siempre, una hoja de cálculo que se actualiza cuando uno se acuerda. Cada pieza sabe su parte y nadie sabe el total.",
              "Ese es el punto de partida de Fridoom: organizar las finanzas personales en un solo lugar, desde cuentas bancarias hasta inversiones, para poder centralizar, organizar y monitorear el dinero sin abrir siete aplicaciones.",
            ],
          },
          {
            heading: "Empezar no cuesta",
            paragraphs: [
              "El plan gratuito permite registrar hasta tres productos, trae una plantilla base, da acceso a información en tiempo real y un perfil de usuario observador. Es suficiente para responder la primera pregunta de cualquiera: cuánto tengo y dónde está.",
              "El plan Pro abre lo demás: productos ilimitados, plantillas propias, reportes y analíticas, programación de pagos y transacciones, bolsillos de gestión y un perfil transaccional. Se paga mensual y se ve el precio antes de registrarse, sin llamadas ni cotizaciones.",
            ],
          },
          {
            heading: "Aprender mientras se usa",
            paragraphs: [
              "Fridoom no es solo una hoja de cálculo bonita. Alrededor del producto hay una comunidad de educación financiera con más de 200.000 seguidores, y el perfil de usuario se puede compartir para invertir, compartir y aprender de otros. La aplicación es el lugar donde esa educación se vuelve una decisión concreta.",
            ],
          },
          {
            heading: "Una app de dinero que no vive de la publicidad",
            paragraphs: [
              "Una aplicación que ve tus cuentas tiene que ser explícita con lo que hace con esos datos. Fridoom usa una sola cookie propia para recordar tu elección y, solo si aceptas, una medición de visitas. Nada de publicidad. En el mismo pie de página están, con su propia sección, tus datos, el uso de inteligencia artificial y cómo eliminar la cuenta.",
              "Es la clase de decisión que no se ve en una demo y se agradece a los seis meses.",
            ],
          },
          {
            heading: "En el teléfono, en la tableta y en el navegador",
            paragraphs: [
              "La aplicación se descarga en el teléfono, se ve completa en un iPad y el sitio funciona igual en el navegador. Quien revisa su presupuesto en el bus y quien lo revisa en la mesa del comedor ven lo mismo.",
              "Datos leídos en el producto en producción en septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "Every account on one screen: what Fridoom solves",
        excerpt: "A person's money lives spread across banks, cards, investments and a spreadsheet. Fridoom brings it together in one place, on the phone, without selling your attention.",
        sections: [
          {
            heading: "The problem is not saving, it is not knowing",
            paragraphs: [
              "Almost nobody has a single bank. There is a payroll account, a savings one, two cards, an investment fund, maybe some crypto and, nearly always, a spreadsheet updated whenever you remember. Every piece knows its part and nobody knows the total.",
              "That is where Fridoom starts: organizing personal finances in one place, from bank accounts to investments, so you can centralize, organize and monitor your money without opening seven apps.",
            ],
          },
          {
            heading: "Starting costs nothing",
            paragraphs: [
              "The free plan lets you register up to three products, comes with a base template, gives access to real time information and an observer profile. That is enough to answer anyone's first question: how much do I have and where is it.",
              "The Pro plan opens the rest: unlimited products, custom templates, reports and analytics, scheduled payments and transactions, management pockets and a transactional profile. It is billed monthly and the price is on the page before you sign up, with no calls and no quotes.",
            ],
          },
          {
            heading: "Learning while using it",
            paragraphs: [
              "Fridoom is not just a pretty spreadsheet. Around the product there is a financial education community with more than 200,000 followers, and the user profile can be shared so you invest, share and learn from others. The app is where that education turns into a concrete decision.",
            ],
          },
          {
            heading: "A money app that does not live on advertising",
            paragraphs: [
              "An app that sees your accounts has to be explicit about what it does with that data. Fridoom uses a single first party cookie to remember your choice and, only if you accept, a visit measurement. No advertising. In the same footer, each with its own page: your data, the use of artificial intelligence and how to delete your account.",
              "It is the kind of decision you do not see in a demo and thank six months later.",
            ],
          },
          {
            heading: "On the phone, on the tablet and in the browser",
            paragraphs: [
              "The app downloads to the phone, fills an iPad and the site works the same in the browser. Whoever checks their budget on the bus and whoever checks it at the dining table see the same thing.",
              "Read from the live product in September 2026.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "37-tiendas-en-un-solo-panel",
    date: "2026-09-22",
    author: LUMINTIK,
    cover: {
      src: "/projects/imagiq/tour/operacion/cobertura.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Zonas de cobertura en el panel de Imagiq",
        EN: "Coverage zones in the Imagiq admin panel",
      },
    },
    tags: [
      "Comercio electrónico",
      "Logística",
      "Operación",
    ],
    relatedCase: "imagiq",
    copy: {
      ES: {
        title: "37 tiendas en un solo panel: cómo Imagiq administra la red, las entregas y la demanda",
        excerpt: "Cuando la tienda en línea y los puntos de venta comparten un mismo inventario, el panel de administración se vuelve el centro de la operación. Un recorrido por el de Imagiq.",
        sections: [
          {
            heading: "La red completa",
            paragraphs: [
              "Imagiq, el distribuidor oficial de Samsung en Colombia, tiene 37 tiendas en 13 ciudades. Cada una aparece en el panel con su código, su dirección y su horario, junto a las órdenes de kiosko que se cobran en tienda y las recogidas pendientes de verificar. La misma lista alimenta el mapa público donde el cliente elige a dónde ir.",
            ],
          },
          {
            heading: "Zonas dibujadas a mano",
            paragraphs: [
              "Las zonas de entrega de cada ciudad se dibujan sobre el mapa, con las tiendas encima, y se pueden verificar con una dirección antes de prometerle una entrega a alguien. Es un detalle pequeño que evita la peor experiencia posible en comercio electrónico: vender lo que no se puede entregar.",
            ],
          },
          {
            heading: "La demanda que no se ve",
            paragraphs: [
              "La bodega muestra los productos agotados que los clientes siguen pidiendo, ordenados por cuántos esperan, y debajo el estado de cada guía de envío en tiempo real: en transporte, en terminal destino, entregada. Reponer lo que la gente pide, y no lo que se supone que pide, sale de esa lista.",
            ],
          },
          {
            heading: "Cada orden con su historia",
            paragraphs: [
              "Las órdenes muestran su estado y su medio de pago: datáfono en tienda, transferencia bancaria o crédito. Se filtran por estado, por pago o por cliente, y el catálogo de 587 referencias se administra desde el mismo lugar.",
              "Las cifras se leyeron en la tienda y en el panel de administración en producción, en septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "37 stores on a single panel: how Imagiq runs the network, deliveries and demand",
        excerpt: "When the online store and the points of sale share one inventory, the admin panel becomes the center of the operation. A walk through Imagiq's.",
        sections: [
          {
            heading: "The whole network",
            paragraphs: [
              "Imagiq, Samsung's official distributor in Colombia, has 37 stores in 13 cities. Each one appears in the panel with its code, address and opening hours, next to the kiosk orders paid in store and the pickups waiting to be verified. The same list feeds the public map where the customer chooses where to go.",
            ],
          },
          {
            heading: "Zones drawn by hand",
            paragraphs: [
              "Each city's delivery zones are drawn on the map, with the stores on top, and an address can be checked before promising anyone a delivery. A small detail that avoids the worst experience in e commerce: selling what cannot be delivered.",
            ],
          },
          {
            heading: "The demand you cannot see",
            paragraphs: [
              "The warehouse view lists sold out products customers keep asking for, ranked by how many are waiting, and below it the live status of every shipping label: in transit, at the destination terminal, delivered. Restocking what people ask for, rather than what they are supposed to ask for, comes out of that list.",
            ],
          },
          {
            heading: "Every order with its story",
            paragraphs: [
              "Orders show their status and payment method: in store card terminal, bank transfer or credit. They filter by status, payment or customer, and the catalog of 587 products is managed from the same place.",
              "The figures were read from the live store and admin panel in September 2026.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "un-club-de-futbol-en-el-bolsillo",
    date: "2026-09-22",
    author: LUMINTIK,
    cover: {
      src: "/projects/futtem/tour/club.jpg",
      width: 603,
      height: 1311,
      alt: {
        ES: "Pantalla de un club en la app FUTTEM",
        EN: "A club screen in the FUTTEM app",
      },
    },
    tags: [
      "Móvil",
      "Deporte",
      "Producto",
    ],
    relatedCase: "futtem",
    copy: {
      ES: {
        title: "Un club de fútbol en el bolsillo: cómo FUTTEM organiza partidas, convocatorias y entrenamiento",
        excerpt: "Convocar a un partido, saber quién va, repartir los equipos y confirmar desde el teléfono. Lo que hace la app de FUTTEM por un club amateur.",
        sections: [
          {
            heading: "Del grupo de chat a la app",
            paragraphs: [
              "Organizar un partido amateur suele vivir en un grupo de chat: quién va, quién falta, a qué hora, cuánto se paga. FUTTEM lo pone en una app: cada jugador entra a sus clubes, ve las próximas partidas y confirma su asistencia con un toque.",
            ],
          },
          {
            heading: "Convocar en un minuto",
            paragraphs: [
              "Crear una partida pide nombre, fecha, hora, ciudad, cancha, duración, tipo de juego y número de jugadores. La convocatoria sale a todo el club y cada uno recibe la notificación con la hora y la partida. Los convocados se reparten en dos equipos, con los cupos que faltan, los que están por confirmar y la lista de espera.",
            ],
          },
          {
            heading: "La cancha y el grupo",
            paragraphs: [
              "Cada partida muestra la cancha y su ubicación, cómo llegar, el grupo de WhatsApp, cuándo se lanza la convocatoria, los cupos y el costo por jugador. Y el club se administra desde el teléfono: escudo, reglas y plantilla.",
            ],
          },
          {
            heading: "Lo que no se ve",
            paragraphs: [
              "La app está publicada en App Store y Google Play, con widget y Apple Watch. Cada cambio pasa por tres ambientes (pruebas, control de calidad y producción) con trazas de extremo a extremo antes de llegar a los jugadores. Es lo que permite mejorarla cada semana sin interrumpir un solo partido.",
              "Las pantallas del caso se grabaron en el ambiente de pruebas con una cuenta de prueba, en septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "A football club in your pocket: how FUTTEM organizes matches, call ups and training",
        excerpt: "Calling a match, knowing who is coming, splitting the teams and confirming from the phone. What the FUTTEM app does for an amateur club.",
        sections: [
          {
            heading: "From the chat group to the app",
            paragraphs: [
              "Organizing an amateur match usually lives in a chat group: who is in, who is out, what time, how much. FUTTEM puts it in an app: every player opens their clubs, sees the upcoming matches and confirms with a tap.",
            ],
          },
          {
            heading: "Call a match in a minute",
            paragraphs: [
              "Creating a match asks for name, date, time, city, pitch, duration, game type and number of players. The call up goes out to the whole club and everyone gets a notification with the time and the match. The players are split into two teams, with the open spots, the ones yet to confirm and the waiting list.",
            ],
          },
          {
            heading: "The pitch and the group",
            paragraphs: [
              "Every match shows the pitch and its location, directions, the WhatsApp group, when the call up goes out, the spots and the cost per player. And the club is run from the phone: crest, rules and squad.",
            ],
          },
          {
            heading: "What you do not see",
            paragraphs: [
              "The app is live on the App Store and Google Play, with a widget and Apple Watch. Every change goes through three environments (testing, quality control and production) with end to end traces before it reaches the players. That is what lets it improve every week without interrupting a single match.",
              "The case screens were recorded on the staging environment with a test account, in September 2026.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "recorridos-de-producto-con-pantallas-reales",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/imagiq/tour/marketing/whatsapp.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Creador de campañas de WhatsApp en el panel de Imagiq",
        EN: "WhatsApp campaign builder in the Imagiq admin panel",
      },
    },
    tags: [
      "Producto",
      "Documentación",
      "Privacidad",
    ],
    relatedCase: "imagiq",
    copy: {
      ES: {
        title: "Recorridos de producto con pantallas reales, sin exponer un solo dato",
        excerpt: "Cómo documentamos nuestros productos con capturas de producción: cuentas de prueba, difuminado desde el DOM y una regla simple sobre credenciales.",
        sections: [
          {
            heading: "Por qué pantallas reales",
            paragraphs: [
              "Un mockup promete; una pantalla de producción demuestra. Para los casos de este sitio grabamos cada producto tal como está hoy: el panel de Imagiq y la app de FUTTEM en un iPhone. Cada recorrido tiene paradas con cámara y cursor, como una demo guiada.",
              "El problema es que producción tiene datos de clientes. Nombres, cédulas, importes, correos. Nada de eso puede salir en una captura.",
            ],
          },
          {
            heading: "Tres reglas",
            paragraphs: [
              "Primera: cuentas de prueba siempre que existan. En FUTTEM usamos un club de pruebas; en la tienda de Imagiq compramos como invitado con datos inventados y sin llegar al pago.",
              "Segunda: cuando la pantalla mezcla datos reales, se difuminan antes de capturar, desde el DOM. Un pequeño script marca importes, columnas de cliente, correos y nombres con un filtro de desenfoque; la captura sale limpia y la interfaz intacta. Lo que se escapa se corrige en la imagen.",
              "Tercera: nadie del equipo teclea contraseñas ni crea cuentas en nombre del cliente para grabar. La sesión la abre el dueño del producto; la grabación la hace quien documenta. Y un formulario que crea usuarios no se envía, aunque los datos sean ficticios.",
            ],
          },
          {
            heading: "Lo que se encuentra por el camino",
            paragraphs: [
              "Recorrer un producto con ojos de cliente enseña más que cualquier reporte: se ve qué pantalla explica sola lo que hace, cuál necesita una frase, dónde un detalle de diseño se quedó atrás. Todo lo que encontramos en ese recorrido volvió al producto el mismo día, con su revisión y su despliegue.",
              "Documentar no es solo escribir lo que hay. Es la mejor manera que conocemos de volver a mirar un producto como lo mira quien lo usa.",
            ],
          },
        ],
      },
      EN: {
        title: "Product tours with real screens, without exposing a single record",
        excerpt: "How we document our products with production screenshots: test accounts, blurring from the DOM and one simple rule about credentials.",
        sections: [
          {
            heading: "Why real screens",
            paragraphs: [
              "A mockup promises; a production screen proves. For the cases on this site we recorded each product as it is today: Imagiq's panel and the FUTTEM app on an iPhone. Every tour has stops with a camera and a cursor, like a guided demo.",
              "The problem is that production holds customer data. Names, ID numbers, amounts, emails. None of it can appear in a capture.",
            ],
          },
          {
            heading: "Three rules",
            paragraphs: [
              "First: test accounts whenever they exist. In FUTTEM we used a test club; in Imagiq's store we bought as a guest with made up details and never reached payment.",
              "Second: when a screen mixes real data, it is blurred before capture, from the DOM. A small script marks amounts, customer columns, emails and names with a blur filter; the capture comes out clean and the interface intact. Whatever slips through is fixed on the image.",
              "Third: nobody on the team types passwords or creates accounts on the client's behalf to record. The product owner opens the session; the documenter records. And a form that creates users is not submitted, even with fictional data.",
            ],
          },
          {
            heading: "What you find along the way",
            paragraphs: [
              "Walking a product with a customer's eyes teaches more than any report: you see which screen explains itself, which one needs a sentence, where a design detail fell behind. Everything we found on that walk went back into the product the same day, reviewed and deployed.",
              "Documenting is not just writing down what exists. It is the best way we know to look at a product again the way its users do.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "campanas-por-canal-desde-un-solo-panel",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/imagiq/tour/marketing/inweb.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Creador de mensajes dentro del sitio en el panel de Imagiq",
        EN: "On site message builder in the Imagiq admin panel",
      },
    },
    tags: [
      "Marketing",
      "Comercio electrónico",
      "Producto",
    ],
    relatedCase: "imagiq",
    copy: {
      ES: {
        title: "Campañas por canal desde un solo panel: correo, WhatsApp, SMS y mensajes en el sitio",
        excerpt: "Lo que un equipo de mercadeo puede hacer sin pedirle nada a desarrollo cuando el panel de la tienda trae los canales integrados.",
        sections: [
          {
            heading: "Un panel, cuatro canales",
            paragraphs: [
              "En el panel de Imagiq, el distribuidor oficial de Samsung en Colombia, las campañas de correo, WhatsApp, SMS y mensajes dentro del sitio viven en una sola lista con su alcance, aperturas y clics. Desde ese panel han salido 341.139 correos. Crear una campaña empieza por elegir el canal.",
              "Cada canal tiene su editor. El de correo es visual, por bloques, con plantillas propias de la marca. El de WhatsApp muestra el mensaje en un teléfono mientras se escribe, con producto, precio, descuento y botones de compra. El de SMS trae plantillas por categoría, variables de nombre y el conteo de caracteres y segmentos antes de enviar.",
            ],
          },
          {
            heading: "Mensajes dentro de la tienda",
            paragraphs: [
              "El canal in web muestra un pop up o un aviso sobre el sitio real, con vista previa en escritorio y móvil. Se segmenta por audiencia, ciudad, número de compras y rango de edad, y se controla la frecuencia para no repetirse.",
              "El mismo panel administra los banners de la portada, las landings con vista previa en vivo y las transmisiones en vivo: un YouTube Live con chat y cuenta regresiva dentro de una landing, con hasta 12 productos para comprar durante la transmisión.",
            ],
          },
          {
            heading: "Por qué importa",
            paragraphs: [
              "Cuando mercadeo depende de desarrollo para cada campaña, las campañas se hacen menos. Cuando el panel trae los canales y las vistas previas, se hacen más y con menos errores, porque quien escribe el mensaje lo ve como lo verá el cliente.",
              "Las cifras de este texto se leyeron del panel en producción en septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "Campaigns on every channel from a single panel: email, WhatsApp, SMS and on site messages",
        excerpt: "What a marketing team can do without asking engineering for anything when the store's panel ships with the channels built in.",
        sections: [
          {
            heading: "One panel, four channels",
            paragraphs: [
              "In the panel of Imagiq, Samsung's official distributor in Colombia, email, WhatsApp, SMS and on site campaigns live in a single list with reach, opens and clicks. 341,139 emails have gone out from that panel. Creating a campaign starts by choosing the channel.",
              "Each channel has its own editor. Email is visual, block based, with the brand's own templates. WhatsApp shows the message on a phone as it is written, with product, price, discount and buy buttons. SMS brings templates by category, name variables and the character and segment count before sending.",
            ],
          },
          {
            heading: "Messages inside the store",
            paragraphs: [
              "The on site channel shows a pop up or a notice over the real site, with desktop and mobile preview. It is segmented by audience, city, number of purchases and age range, and frequency is capped so it does not repeat.",
              "The same panel manages the home page banners, landing pages with a live preview and live streams: a YouTube Live with chat and countdown inside a landing page, with up to 12 products to buy during the stream.",
            ],
          },
          {
            heading: "Why it matters",
            paragraphs: [
              "When marketing depends on engineering for every campaign, fewer campaigns get made. When the panel ships with the channels and the previews, more get made and with fewer mistakes, because whoever writes the message sees it the way the customer will.",
              "The figures in this text were read from the live panel in September 2026.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "un-solo-inventario-para-toda-la-red",
    tags: ["Logística", "Comercio electrónico", "Algoritmos"],
    relatedCase: "imagiq",
    date: "2026-09-19",
    author: LUMINTIK,
    cover: {
      src: "/projects/samsung/home-desktop.webp",
      width: 2000,
      height: 1250,
      alt: { ES: "Tienda en línea de Samsung Colombia", EN: "Samsung Colombia online store" },
    },
    copy: {
      ES: {
        title: "Más de 30 tiendas, un solo inventario: cómo elegimos desde dónde enviar cada pedido",
        excerpt:
          "El distribuidor oficial de Samsung en Colombia tenía el stock disperso entre sus puntos de venta. Un algoritmo lo convirtió en una sola red con entregas en máximo 24 horas.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Imagiq, distribuidor oficial de Samsung en Colombia, tiene más de 30 puntos de venta. Cada uno manejaba su inventario por separado: lo que se agotaba en una ciudad sobraba en otra, y un pedido en línea podía quedarse sin stock aunque el producto existiera a unas cuadras del cliente.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "Construimos un algoritmo que, para cada pedido, cruza el stock de todas las tiendas con la distancia real hasta el cliente. Con esa información elige la tienda óptima y genera la guía de envío, sin que nadie tenga que decidirlo a mano.",
              "La distancia no es la del mapa en línea recta sino la real, calculada con la API de Google Distance Matrix. La tienda en línea corre en Next.js y el back en NestJS con PostgreSQL y Redis.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Toda la red trabaja como un solo inventario, con entregas en máximo 24 horas. Un producto está disponible mientras exista en cualquier tienda, y sale desde la que puede llegar antes.",
            ],
          },
        ],
      },
      EN: {
        title: "More than 30 stores, one inventory: how we choose where each order ships from",
        excerpt:
          "Samsung's official distributor in Colombia had its stock scattered across points of sale. An algorithm turned them into one network with deliveries in 24 hours at most.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "Imagiq, Samsung's official distributor in Colombia, has more than 30 points of sale. Each one managed its inventory separately: what ran out in one city was left over in another, and an online order could show as out of stock even though the product sat a few blocks from the customer.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "We built an algorithm that, for every order, matches the stock of every store against the real distance to the customer. With that it picks the best store and generates the shipping label, with nobody deciding by hand.",
              "The distance is not a straight line on a map but the real one, from the Google Distance Matrix API. The storefront runs on Next.js and the back end on NestJS with PostgreSQL and Redis.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "The whole network works as a single inventory, with deliveries in 24 hours at most. A product is available as long as it exists in any store, and ships from the one that can get there first.",
            ],
          },
        ],
      },
    },
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
