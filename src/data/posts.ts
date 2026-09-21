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
    slug: "una-consola-para-ver-cada-documento",
    date: "2026-09-22",
    author: LUMINTIK,
    cover: {
      src: "/projects/reco/tour/metricas.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Panel de métricas de la consola de RECO",
        EN: "Metrics panel of the RECO console",
      },
    },
    tags: [
      "Comercio exterior",
      "IA aplicada",
      "Operación",
    ],
    relatedCase: "griver",
    copy: {
      ES: {
        title: "Una consola para ver cada documento: lo que una agencia aduanera obtiene además del OCR",
        excerpt: "Leer facturas y pedimentos con IA es la mitad. La otra mitad es saber cuántos entran, cuánto tardan, qué falla y quién hizo qué. Así es la consola de operación de RECO.",
        sections: [
          {
            heading: "Más que una API",
            paragraphs: [
              "Cuando una agencia aduanera pasa de revisar documentos a mano a procesarlos con inteligencia artificial, la primera pregunta que aparece no es técnica: ¿cuántos van hoy, cuánto tardaron y cuáles se atascaron? La consola de operación de RECO responde eso sin abrir un solo documento: trabaja únicamente con metadatos de negocio, nunca con el contenido.",
              "En una semana de septiembre de 2026 la consola registró 11.546 documentos y 21.591 páginas. El 74% llegó escaneado, no digital, y aun así el proceso automático por documento estuvo en 18 segundos de mediana.",
            ],
          },
          {
            heading: "Dónde se va el tiempo",
            paragraphs: [
              "La vista de entrenamiento parte el recorrido de cada documento en tramos: proceso automático, espera, revisión humana y total. Se ve de inmediato qué parte es de la máquina y cuál de las personas, por agencia y por periodo. Esa es la conversación que un director de operaciones quiere tener con datos: dónde acortar, a quién apoyar.",
            ],
          },
          {
            heading: "Quién hizo qué",
            paragraphs: [
              "Cada acción administrativa, humana o de máquina, queda en un registro inmutable: accesos, canjes de credencial, planes asignados. Se filtra por tipo de actor y por evento, y se exporta por evento, por día o por usuario. En un sector regulado, poder mostrar ese registro vale tanto como la velocidad.",
            ],
          },
          {
            heading: "Probar como una agencia",
            paragraphs: [
              "La misma consola permite procesar un lote de facturas o conocimientos de embarque por el mismo endpoint público que usan las agencias, con la credencial de cada una. El resultado llega agrupado por factura y los documentos no se guardan. Así el equipo de RECO prueba lo que sus clientes van a ver, antes de que lo vean.",
              "Las cifras de esta entrada se leyeron en la consola en producción, semana del 14 al 20 de septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "A console to see every document: what a customs agency gets beyond OCR",
        excerpt: "Reading invoices and customs entries with AI is half the job. The other half is knowing how many come in, how long they take, what fails and who did what. This is RECO's operations console.",
        sections: [
          {
            heading: "More than an API",
            paragraphs: [
              "When a customs agency moves from reviewing documents by hand to processing them with artificial intelligence, the first question is not technical: how many today, how long did they take and which ones got stuck? RECO's operations console answers that without opening a single document: it works only with business metadata, never with the content.",
              "In one week of September 2026 the console logged 11,546 documents and 21,591 pages. 74% arrived scanned, not digital, and the automatic processing per document still sat at a median of 18 seconds.",
            ],
          },
          {
            heading: "Where the time goes",
            paragraphs: [
              "The training view splits each document's journey into stages: automatic processing, waiting, human review and total. It shows at a glance which part belongs to the machine and which to people, by agency and by period. That is the conversation an operations director wants to have with data: where to cut, whom to support.",
            ],
          },
          {
            heading: "Who did what",
            paragraphs: [
              "Every administrative action, human or machine, lands in an immutable record: logins, credential exchanges, assigned plans. It filters by actor and by event and exports by event, by day or by user. In a regulated sector, being able to show that record is worth as much as speed.",
            ],
          },
          {
            heading: "Testing like an agency",
            paragraphs: [
              "The same console can process a batch of invoices or bills of lading through the same public endpoint the agencies use, with each one's credential. The result comes back grouped by invoice and the documents are not stored. That is how RECO's team tests what their clients will see, before they see it.",
              "The figures in this post were read from the live console, week of September 14 to 20, 2026.",
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
    slug: "formularios-de-uscis-sin-errores",
    date: "2026-09-22",
    author: LUMINTIK,
    cover: {
      src: "/projects/ezmig/tour/formularios-demo.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Formularios de un caso en el portal del abogado de EZMig",
        EN: "Case forms in the EZMig attorney portal",
      },
    },
    tags: [
      "Inmigración",
      "IA aplicada",
      "Producto",
    ],
    relatedCase: "ezmig",
    copy: {
      ES: {
        title: "Formularios de USCIS sin errores: cómo EZMig guía al abogado, al cliente y al despacho",
        excerpt: "Diecinueve formularios, tres idiomas y tres portales. Cómo un despacho de inmigración pasa de llenar PDF a mano a un flujo guiado que valida antes de generar el documento oficial.",
        sections: [
          {
            heading: "Diecinueve formularios, un flujo",
            paragraphs: [
              "Un despacho de inmigración vive de formularios largos de USCIS: I-130, I-485, N-400 y otros dieciséis. EZMig los convierte en un flujo guiado, parte por parte, con validación antes de generar el PDF oficial. Lo que el abogado ya sabe del cliente no se vuelve a escribir.",
            ],
          },
          {
            heading: "El cliente, desde el teléfono",
            paragraphs: [
              "El cliente del abogado entra desde un enlace de invitación, sin instalar nada, escanea su documento y completa su parte desde el teléfono en español, inglés o portugués. Retoma el formulario donde lo dejó el abogado, y lo que corrige actualiza su perfil. Un asistente de inteligencia artificial responde sus dudas sin llamar al despacho.",
            ],
          },
          {
            heading: "El despacho, con control",
            paragraphs: [
              "El portal de administración define los formularios, su mapeo al PDF de USCIS y la analítica del despacho. Cuando USCIS cambia una versión, el cambio se hace una vez y aplica a todos los casos.",
            ],
          },
          {
            heading: "Por qué importa",
            paragraphs: [
              "Un error en un formulario de inmigración se paga en meses. Un flujo que valida, que reutiliza lo que ya se sabe y que habla el idioma del cliente reduce ese riesgo en cada caso, no solo en los que revisa el abogado más experimentado.",
              "Verificable en el producto en producción, septiembre de 2026.",
            ],
          },
        ],
      },
      EN: {
        title: "USCIS forms without mistakes: how EZMig guides the attorney, the client and the firm",
        excerpt: "Nineteen forms, three languages and three portals. How an immigration firm goes from filling PDFs by hand to a guided flow that validates before generating the official document.",
        sections: [
          {
            heading: "Nineteen forms, one flow",
            paragraphs: [
              "An immigration firm lives on long USCIS forms: I-130, I-485, N-400 and sixteen more. EZMig turns them into a guided flow, part by part, with validation before the official PDF is generated. What the attorney already knows about the client is never typed twice.",
            ],
          },
          {
            heading: "The client, from the phone",
            paragraphs: [
              "The attorney's client comes in from an invitation link, without installing anything, scans their document and completes their part from the phone in Spanish, English or Portuguese. They pick the form up where the attorney left it, and whatever they correct updates their profile. An AI assistant answers their questions without calling the firm.",
            ],
          },
          {
            heading: "The firm, in control",
            paragraphs: [
              "The admin portal defines the forms, their mapping to the USCIS PDF and the firm's analytics. When USCIS changes a version, the change is made once and applies to every case.",
            ],
          },
          {
            heading: "Why it matters",
            paragraphs: [
              "A mistake on an immigration form costs months. A flow that validates, reuses what is already known and speaks the client's language lowers that risk on every case, not only on the ones the most experienced attorney reviews.",
              "Verifiable in the live product, September 2026.",
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
        excerpt: "Cómo documentamos cinco productos con capturas de producción: cuentas de prueba, difuminado desde el DOM y una regla simple sobre credenciales.",
        sections: [
          {
            heading: "Por qué pantallas reales",
            paragraphs: [
              "Un mockup promete; una pantalla de producción demuestra. Para los casos de este sitio grabamos cada producto tal como está hoy: la consola de RECO, el panel de Imagiq, los tres portales de EZMig, el editor de EZDocuAI y la app de FUTTEM en un iPhone. Cada recorrido tiene paradas con cámara y cursor, como una demo guiada.",
              "El problema es que producción tiene datos de clientes. Nombres, cédulas, importes, correos. Nada de eso puede salir en una captura.",
            ],
          },
          {
            heading: "Tres reglas",
            paragraphs: [
              "Primera: cuentas de prueba siempre que existan. En EZMig creamos un despacho ficticio con un caso y un formulario de demostración; en FUTTEM usamos un club de pruebas; en la tienda de Imagiq compramos como invitado con datos inventados y sin llegar al pago.",
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
        excerpt: "How we documented five products with production screenshots: test accounts, blurring from the DOM and one simple rule about credentials.",
        sections: [
          {
            heading: "Why real screens",
            paragraphs: [
              "A mockup promises; a production screen proves. For the cases on this site we recorded each product as it is today: RECO's console, Imagiq's panel, EZMig's three portals, EZDocuAI's editor and the FUTTEM app on an iPhone. Every tour has stops with a camera and a cursor, like a guided demo.",
              "The problem is that production holds customer data. Names, ID numbers, amounts, emails. None of it can appear in a capture.",
            ],
          },
          {
            heading: "Three rules",
            paragraphs: [
              "First: test accounts whenever they exist. In EZMig we created a fictional firm with a demo case and form; in FUTTEM we used a test club; in Imagiq's store we bought as a guest with made up details and never reached payment.",
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
    slug: "por-que-quitamos-las-rayas",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/ezmig/tour/asistente-ia.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Asistente de IA del portal de EZMig",
        EN: "AI assistant in the EZMig portal",
      },
    },
    tags: [
      "Redacción",
      "IA",
      "Producto",
    ],
    relatedCase: "ezmig",
    copy: {
      ES: {
        title: "Por qué quitamos las rayas de todos nuestros productos",
        excerpt: "Una raya en medio de una frase se ha vuelto la marca de agua del texto generado. Cómo las sacamos de interfaces, formularios, centro de ayuda y de las respuestas de un asistente de IA.",
        sections: [
          {
            heading: "La señal",
            paragraphs: [
              "Hay un signo que en los últimos años se volvió sinónimo de texto escrito por una máquina: la raya larga en medio de una frase. Los lectores la reconocen sin saber por qué, y desconfían. Nuestros productos, escritos en parte con ayuda de modelos, estaban llenos de ellas.",
              "Decidimos que ningún contenido visible, en ningún idioma, llevaría una raya. Los guiones que forman parte de un nombre se quedan: un formulario I-130 sigue siendo I-130.",
            ],
          },
          {
            heading: "No es un buscar y reemplazar",
            paragraphs: [
              "Una raya cumple funciones distintas y cada una tiene un reemplazo distinto. Un inciso se convierte en paréntesis. Una etiqueta corta seguida de raya pide dos puntos. Una frase larga se parte en dos oraciones. Un rango de números se escribe con la palabra a. Un título con marca usa una barra vertical.",
              "Escribimos un script con esas reglas gramaticales y lo pasamos por 325 cadenas de interfaz, los esquemas de 19 formularios, los asuntos de correo, los títulos de pestaña y 84 artículos del centro de ayuda de EZMig. Cada archivo se revisó a mano después: el script propone, una persona decide.",
            ],
          },
          {
            heading: "El asistente también",
            paragraphs: [
              "Con un asistente de IA, cambiar el prompt no basta: el modelo obedece la mayoría de las veces, no todas. Añadimos un saneado en el servidor que quita las rayas de cada respuesta y de cada cita antes de que lleguen al cliente, con una prueba que lo garantiza.",
              "El resultado no se nota, y esa es la idea. El texto se lee como lo escribiría una persona con cuidado, porque una persona con cuidado lo revisó.",
            ],
          },
        ],
      },
      EN: {
        title: "Why we removed the dashes from every product we make",
        excerpt: "A dash in the middle of a sentence has become the watermark of generated text. How we took them out of interfaces, forms, a help center and the replies of an AI assistant.",
        sections: [
          {
            heading: "The tell",
            paragraphs: [
              "There is a mark that in recent years became synonymous with machine written text: the long dash in the middle of a sentence. Readers recognize it without knowing why, and they trust the text less. Our products, written partly with the help of models, were full of them.",
              "We decided that no visible content, in any language, would carry a dash. Hyphens that belong to a name stay: an I-130 form is still an I-130.",
            ],
          },
          {
            heading: "Not a find and replace",
            paragraphs: [
              "A dash does different jobs and each one has a different replacement. An aside becomes parentheses. A short label followed by a dash asks for a colon. A long sentence splits in two. A numeric range is written with the word to. A title with a brand uses a vertical bar.",
              "We wrote a script with those grammar rules and ran it over 325 interface strings, the schemas of 19 forms, email subjects, tab titles and 84 help center articles in EZMig. Every file was then reviewed by hand: the script proposes, a person decides.",
            ],
          },
          {
            heading: "The assistant too",
            paragraphs: [
              "With an AI assistant, changing the prompt is not enough: the model obeys most of the time, not always. We added a server side pass that strips dashes from every reply and every citation before they reach the client, with a test that guarantees it.",
              "The result goes unnoticed, and that is the point. The text reads the way a careful person would write it, because a careful person reviewed it.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "medir-en-produccion-sin-adivinar",
    date: "2026-09-22",
    author: LUMINTIK,
    cover: {
      src: "/projects/reco/tour/auditoria.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Auditoría y trazabilidad en la consola de RECO",
        EN: "Audit and traceability in the RECO console",
      },
    },
    tags: [
      "Observabilidad",
      "Serverless",
      "Buenas prácticas",
    ],
    relatedCase: "griver",
    copy: {
      ES: {
        title: "Cómo cuidamos un producto después de lanzarlo: cinco hábitos para medir en producción",
        excerpt: "Lanzar es la mitad del trabajo. Estos son los hábitos con los que mantenemos rápidas y estables las plataformas que ya usan nuestros clientes: medir en producción, publicar los tiempos y decidir con números.",
        sections: [
          {
            heading: "1. Publicar el reparto del tiempo",
            paragraphs: [
              "Una cabecera Server-Timing cuesta una línea y se lee en la pestaña Red del navegador. La nuestra dice cuánto tardó la lectura, cuántos días salieron de la caché, cuánto costó descomprimir, mapear, agregar y recolectar. Sin eso, habríamos optimizado la base de datos cuando el problema era un formateador de fechas.",
            ],
          },
          {
            heading: "2. Leer las líneas REPORT",
            paragraphs: [
              "Cada ejecución de una función serverless deja en CloudWatch una línea con duración, arranque y memoria máxima. Es la fuente que dice cuánto margen queda antes de que un pico de uso se note en la pantalla de alguien.",
            ],
          },
          {
            heading: "3. Exponer la memoria",
            paragraphs: [
              "Añadimos al Server-Timing la memoria viva, la comprometida y el techo real del proceso. Con eso las decisiones sobre caché y concurrencia dejan de ser opiniones.",
            ],
          },
          {
            heading: "4. Presupuestos que se cuentan desde la entrada",
            paragraphs: [
              "Un presupuesto de tiempo que arranca cuando empieza el trabajo pesado ignora el arranque en frío, las credenciales y la serialización. El reloj debe arrancar cuando entra la petición, y la respuesta parcial debe decir que lo es.",
            ],
          },
          {
            heading: "5. Medir donde corre",
            paragraphs: [
              "Una Lambda de 1024 MB tiene poco más de media CPU. Un bucle que en un portátil tarda un segundo allí tarda diez. Medimos localmente contra datos de producción para entender la memoria, pero las decisiones de CPU se tomaron con números de la función real.",
              "Con esos cinco hábitos, la consola de operación de uno de nuestros clientes pasó a entregar un mes completo de métricas en seis segundos. Ninguno requiere herramientas nuevas: solo mirar lo que ya está ahí, todas las semanas.",
            ],
          },
        ],
      },
      EN: {
        title: "How we look after a product after launch: five habits for measuring in production",
        excerpt: "Launching is half the work. These are the habits that keep the platforms our clients already use fast and stable: measuring in production, publishing timings and deciding with numbers.",
        sections: [
          {
            heading: "1. Publish the time split",
            paragraphs: [
              "A Server-Timing header costs one line and is readable in the browser's Network tab. Ours states how long the read took, how many days came from the cache, how much went to decompressing, mapping, aggregating and collecting. Without it we would have optimized the database when the problem was a date formatter.",
            ],
          },
          {
            heading: "2. Read the REPORT lines",
            paragraphs: [
              "Every serverless execution leaves a line in CloudWatch with duration, init time and peak memory. It is the source that says how much headroom is left before a usage spike shows up on someone's screen.",
            ],
          },
          {
            heading: "3. Expose memory",
            paragraphs: [
              "We added live memory, committed memory and the real ceiling of the process to Server-Timing. With that, decisions about caching and concurrency stop being opinions.",
            ],
          },
          {
            heading: "4. Budgets counted from entry",
            paragraphs: [
              "A time budget that starts when the heavy work begins ignores cold start, credentials and serialization. The clock must start when the request enters, and a partial response must say it is one.",
            ],
          },
          {
            heading: "5. Measure where it runs",
            paragraphs: [
              "A 1024 MB Lambda has a little over half a CPU. A loop that takes one second on a laptop takes ten there. We measured locally against production data to understand memory, but CPU decisions were made with numbers from the real function.",
              "With those five habits, the operations console of one of our clients went on to deliver a full month of metrics in six seconds. None of them needs new tools: only looking at what is already there, every week.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "revision-aduanera-con-ia",
    date: "2026-09-19",
    tags: ["IA aplicada", "OCR", "Comercio exterior"],
    relatedCase: "griver",
    author: LUMINTIK,
    cover: {
      src: "/projects/reco/plataforma-desktop.webp",
      width: 2000,
      height: 1250,
      alt: { ES: "Plataforma RECO de Griver", EN: "Griver's RECO platform" },
    },
    copy: {
      ES: {
        title: "De un día a diez minutos: revisar pedimentos con IA sin sacar los datos de casa",
        excerpt:
          "Cómo un modelo de lenguaje auto hospedado y una API de OCR convirtieron una revisión manual de un día en diez minutos para una agencia aduanera mexicana.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Las agencias aduaneras mexicanas revisan cada pedimento y cada factura a mano. Hay que leer los documentos, cruzar cantidades, valores y claves, y detectar cualquier diferencia antes de que llegue a la aduana. En Griver, ese proceso tomaba un día completo.",
              "Además, los documentos son confidenciales: contienen datos de clientes, proveedores y mercancía. Enviarlos a un servicio de IA externo no era una opción.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "Construimos una API de OCR con inteligencia artificial para el prevalidador RECO, la plataforma de comercio exterior de Griver. La API lee el documento, extrae los campos y los entrega listos para cruzar.",
              "La lectura la hace un modelo de lenguaje auto hospedado, servido con vLLM sobre GPU en AWS y empaquetado en Docker. Los datos no salen de la infraestructura del cliente y no se almacenan: cada documento se procesa y se descarta.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Lo que tomaba un día entero de revisión ahora toma diez minutos con el prevalidador RECO. El equipo dedica ese tiempo a resolver las diferencias que el sistema marca, no a encontrarlas.",
              "Para nosotros la lección fue clara: cuando los datos son sensibles, la pregunta no es si usar IA, sino dónde corre. Un modelo propio, dentro de la infraestructura del cliente, resuelve las dos cosas.",
            ],
          },
        ],
      },
      EN: {
        title: "From a day to ten minutes: reviewing customs entries with AI without the data leaving home",
        excerpt:
          "How a self hosted language model and an OCR API turned a full day of manual review into ten minutes for a Mexican customs agency.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "Mexican customs agencies review every customs entry and every invoice by hand. The documents have to be read, quantities, values and codes cross-checked, and any difference caught before it reaches customs. At Griver, that process took a full day.",
              "The documents are also confidential: they hold data about clients, suppliers and goods. Sending them to an external AI service was not an option.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "We built an AI OCR API for the RECO prevalidator, Griver's foreign trade platform. The API reads the document, extracts the fields and hands them over ready to cross-check.",
              "The reading is done by a self hosted language model, served with vLLM on GPU in AWS and packaged with Docker. The data never leaves the client's infrastructure and is not stored: each document is processed and discarded.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "What took a full day of review now takes ten minutes with the RECO prevalidator. The team spends that time resolving the differences the system flags, not finding them.",
              "The lesson for us was clear: when the data is sensitive, the question is not whether to use AI but where it runs. A model of your own, inside the client's infrastructure, solves both.",
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
  {
    slug: "traducir-sin-transcribir",
    tags: ["IA aplicada", "Documentos", "Traducción"],
    relatedCase: "ezdocuai",
    date: "2026-09-19",
    author: LUMINTIK,
    cover: {
      src: "/projects/ezdocu/home-desktop.webp",
      width: 2000,
      height: 1250,
      alt: { ES: "Página de inicio de EZDocuAI", EN: "EZDocuAI home page" },
    },
    copy: {
      ES: {
        title: "De 20 a 3 minutos por página: OCR con IA para traductores certificados",
        excerpt:
          "Los traductores certificados perdían horas formateando documentos escaneados antes de traducir. EZDocuAI extrae y formatea cada página automáticamente, con cifrado de extremo a extremo.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Un traductor certificado recibe actas, diplomas y contratos escaneados. Antes de traducir una sola palabra tiene que reconstruir el documento a mano: tablas, sellos, columnas, numeración. Ese formateo se llevaba la mayor parte del tiempo de cada página.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "EZDocuAI usa OCR con inteligencia artificial para extraer el contenido y reconstruir el formato automáticamente. El traductor recibe el documento listo para editar y se concentra en la traducción.",
              "Como los documentos son personales, la seguridad es parte del producto: cifrado TLS 1.3 en tránsito y AES 256 en reposo, borrado programado y un certificado de eliminación con hash SHA 256. Ningún documento queda guardado ni se usa para entrenar modelos.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Cada página pasa de 20 a 3 minutos para el traductor certificado. Y el cliente puede comprobar, con el certificado de eliminación, que su documento ya no existe en el sistema.",
            ],
          },
        ],
      },
      EN: {
        title: "From 20 to 3 minutes per page: AI OCR for certified translators",
        excerpt:
          "Certified translators lost hours formatting scanned documents before translating. EZDocuAI extracts and formats every page automatically, with end to end encryption.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "A certified translator receives scanned certificates, diplomas and contracts. Before translating a single word they have to rebuild the document by hand: tables, stamps, columns, numbering. That formatting took most of the time on every page.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "EZDocuAI uses AI OCR to extract the content and rebuild the layout automatically. The translator gets the document ready to edit and focuses on the translation.",
              "Since the documents are personal, security is part of the product: TLS 1.3 encryption in transit and AES 256 at rest, scheduled deletion and a deletion certificate with a SHA 256 hash. No document is kept or used to train models.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "Every page goes from 20 to 3 minutes for the certified translator. And the client can check, with the deletion certificate, that their document no longer exists in the system.",
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
