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
    slug: "una-funcion-que-moria-por-memoria",
    date: "2026-09-21",
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
      "Serverless",
      "AWS Lambda",
      "Observabilidad",
      "Node.js",
    ],
    relatedCase: "griver",
    copy: {
      ES: {
        title: "Una función que moría por memoria: cómo pasamos de un 504 a seis segundos",
        excerpt: "Un panel serverless fallaba con rangos de 30 días. La causa no era la base de datos sino un objeto creado por cada fila. Así lo medimos y lo arreglamos en producción.",
        sections: [
          {
            heading: "El síntoma",
            paragraphs: [
              "La consola de operación de RECO mostraba un error críptico al pedir las métricas de 30 días: Unexpected end of JSON input. En la red, la petición se quedaba pendiente y a los 29,4 segundos volvía un 504 con cero bytes. La API corre en una función serverless detrás de CloudFront, que corta toda respuesta que pase de 30 segundos, y el navegador intentaba leer ese cuerpo vacío como JSON.",
              "El primer arreglo fue el obvio: un presupuesto de tiempo para la lectura, que devuelve lo que alcanzó a sumar y lo marca como incompleto, y un lector de JSON en el cliente que no asume que un error trae cuerpo. Con eso el mensaje dejó de ser críptico. Pero la petición de 30 días seguía sin llegar.",
            ],
          },
          {
            heading: "Lo que decían los logs",
            paragraphs: [
              "En CloudWatch, cada ejecución de una función Lambda termina con una línea REPORT que dice cuánto duró y cuánta memoria usó. Las nuestras decían 1024 MB de 1024 MB. La función no moría por tiempo: moría por memoria, y el borde traducía esa muerte a un 500 vacío.",
              "Medimos la misma lectura en local contra los datos de producción: el heap vivo de una petición de 30 días eran unos 70 MB. Es decir, la petición cabía de sobra. Lo que no cabía era la basura acumulada entre peticiones. Bajamos la concurrencia de lectura, convertimos cada día a filas ligeras apenas llega y forzamos una recolección de basura al cerrar cada lote. El máximo bajó de 1024 a unos 780 MB y las peticiones empezaron a responder.",
            ],
          },
          {
            heading: "Medir antes de optimizar",
            paragraphs: [
              "Aun así, una petición con todos los días ya en caché y cero lecturas a la base de datos tardaba 17 segundos. Antes de tocar nada, publicamos en la cabecera Server-Timing el reparto exacto: cuánto en descomprimir la caché, cuánto en leer, cuánto en mapear, cuánto en agregar, cuánto en recolectar. La respuesta fue contundente: agregar 58.000 filas costaba 10 de los 16 segundos, unos 180 microsegundos por fila.",
              "La función que decide a qué día local pertenece cada fila construía un Intl.DateTimeFormat nuevo en cada llamada. Crear ese objeto cuesta más que todo lo demás que hace la fila. Un formateador memorizado por zona horaria bajó una prueba de 100.000 filas de 2.978 a 55 milisegundos.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Cinco peticiones seguidas de 30 días en producción: todas completas, la primera en frío en 13,5 segundos y las siguientes en 6. La memoria de la instancia bajó de unos 830 a unos 300 MB, porque ya no se crean 58.000 formateadores por petición.",
              "Dos lecciones que nos llevamos. La primera: una Lambda de 1024 MB tiene poco más de media CPU, así que lo que en un portátil es rápido allí no lo es; hay que medir en producción. La segunda: instrumentar antes de optimizar. Sin el desglose en Server-Timing habríamos seguido culpando a la base de datos.",
            ],
          },
        ],
      },
      EN: {
        title: "A function that died of memory: from a 504 to six seconds",
        excerpt: "A serverless panel failed on 30 day ranges. The cause was not the database but an object created for every row. This is how we measured it and fixed it in production.",
        sections: [
          {
            heading: "The symptom",
            paragraphs: [
              "RECO's operations console showed a cryptic error when asked for 30 days of metrics: Unexpected end of JSON input. On the network tab the request stayed pending and after 29.4 seconds came back as a 504 with zero bytes. The API runs on a serverless function behind CloudFront, which cuts any response longer than 30 seconds, and the browser tried to parse that empty body as JSON.",
              "The first fix was the obvious one: a time budget for the read, which returns whatever it managed to add up and flags it as incomplete, plus a JSON reader on the client that does not assume an error carries a body. The message stopped being cryptic. But the 30 day request still never arrived.",
            ],
          },
          {
            heading: "What the logs said",
            paragraphs: [
              "In CloudWatch, every execution of a Lambda function ends with a REPORT line stating how long it took and how much memory it used. Ours said 1024 MB out of 1024 MB. The function was not dying of time: it was dying of memory, and the edge translated that death into an empty 500.",
              "We measured the same read locally against production data: the live heap of a 30 day request was about 70 MB. The request fit comfortably. What did not fit was the garbage accumulated between requests. We lowered the read concurrency, turned each day into light rows as soon as it arrived and forced a garbage collection after every batch. The peak dropped from 1024 to about 780 MB and requests started to answer.",
            ],
          },
          {
            heading: "Measure before optimizing",
            paragraphs: [
              "Even so, a request with every day already cached and zero database reads took 17 seconds. Before touching anything we published the exact split in the Server-Timing header: decompressing the cache, reading, mapping, aggregating, collecting. The answer was blunt: aggregating 58,000 rows took 10 of the 16 seconds, about 180 microseconds per row.",
              "The function that decides which local day a row belongs to built a new Intl.DateTimeFormat on every call. Creating that object costs more than everything else the row does. One formatter memoized per time zone took a 100,000 row test from 2,978 to 55 milliseconds.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "Five consecutive 30 day requests in production: all complete, the first one cold in 13.5 seconds and the rest in 6. The instance's memory dropped from about 830 to about 300 MB, because 58,000 formatters are no longer created per request.",
              "Two lessons. First: a 1024 MB Lambda has a little over half a CPU, so what is fast on a laptop is not fast there; measure in production. Second: instrument before optimizing. Without the Server-Timing split we would still be blaming the database.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "responder-a-tiempo-aunque-sea-incompleto",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/reco/tour/entrenamiento.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Tiempos de entrenamiento en la consola de RECO",
        EN: "Training times in the RECO console",
      },
    },
    tags: [
      "APIs",
      "Serverless",
      "Diseño de sistemas",
    ],
    relatedCase: "griver",
    copy: {
      ES: {
        title: "Responder a tiempo aunque sea incompleto: presupuestos de tiempo detrás de un borde de 30 segundos",
        excerpt: "Cuando un proxy corta a los 30 segundos, una API que intenta terminar siempre acaba no respondiendo nunca. Cómo diseñamos un presupuesto de tiempo honesto.",
        sections: [
          {
            heading: "El límite que nadie configuró",
            paragraphs: [
              "CloudFront, el balanceador de Amplify y muchos otros bordes cortan una respuesta a los 30 segundos. No es un parámetro de la aplicación: es la infraestructura, y no se negocia. Una API que lee 30 días de telemetría y suma decenas de miles de filas puede pasar de ese límite en un mal día, y entonces el usuario recibe un error vacío en lugar de datos.",
              "Nuestra primera versión del presupuesto contaba 20 segundos desde que empezaba a leer. Fallaba en instancias frías: el arranque del servidor, la obtención de credenciales, la agregación y la serialización de 2,4 MB de JSON se sumaban y pasaban de 30. Ahora el reloj arranca cuando entra la petición y deja 14 segundos para leer; el resto es margen para todo lo demás.",
            ],
          },
          {
            heading: "Cortar con gracia",
            paragraphs: [
              "El presupuesto no cancela lo que está en vuelo: compite con él. Cada lectura de un día corre contra un temporizador; si el reloj gana, la respuesta sale con lo que se alcanzó a sumar y un campo truncated en true. Lo leído de más no se pierde: entra a la caché de días inmutables y la siguiente petición llega más lejos.",
              "El orden importa. Se lee de lo más reciente a lo más antiguo, de modo que lo que falta cuando se corta es siempre lo viejo, nunca lo que la vista muestra arriba.",
            ],
          },
          {
            heading: "Decirlo",
            paragraphs: [
              "Una respuesta parcial que no se anuncia es una mentira: los días no leídos aparecen en cero y nadie distingue eso de un día sin actividad. La vista muestra un aviso cuando truncated es verdadero y explica que los días más antiguos pueden faltar. Y la cabecera Server-Timing dice cuántos días salieron de la caché y cuántos de la base, para que quien diagnostique lo haga con números del servidor y no a ojo.",
              "Con el presupuesto, la caché comprimida y las optimizaciones de CPU que contamos en otra entrada, el rango de 30 días dejó de truncarse. Pero el presupuesto sigue ahí, porque el día que un cliente procese el triple de documentos, la respuesta seguirá llegando.",
            ],
          },
        ],
      },
      EN: {
        title: "Answering on time even when incomplete: time budgets behind a 30 second edge",
        excerpt: "When a proxy cuts at 30 seconds, an API that tries to finish no matter what ends up never answering. How we designed an honest time budget.",
        sections: [
          {
            heading: "The limit nobody configured",
            paragraphs: [
              "CloudFront, Amplify's balancer and many other edges cut a response at 30 seconds. It is not an application parameter: it is infrastructure, and it is not negotiable. An API that reads 30 days of telemetry and adds up tens of thousands of rows can cross that limit on a bad day, and then the user gets an empty error instead of data.",
              "Our first version of the budget counted 20 seconds from the start of the read. It failed on cold instances: server start, credentials, aggregation and serializing 2.4 MB of JSON added up and went past 30. Now the clock starts when the request enters and leaves 14 seconds for reading; the rest is margin for everything else.",
            ],
          },
          {
            heading: "Cutting gracefully",
            paragraphs: [
              "The budget does not cancel what is in flight: it races it. Each day's read runs against a timer; if the clock wins, the response leaves with whatever was added up and a truncated field set to true. Extra reads are not wasted: they enter the cache of immutable days and the next request gets further.",
              "Order matters. Reads go from newest to oldest, so what is missing when the cut happens is always the old part, never what the view shows at the top.",
            ],
          },
          {
            heading: "Saying so",
            paragraphs: [
              "A partial response that is not announced is a lie: unread days show as zero and nobody can tell that apart from a quiet day. The view shows a notice when truncated is true and explains that the oldest days may be missing. And the Server-Timing header states how many days came from the cache and how many from the database, so whoever diagnoses does it with server numbers rather than by eye.",
              "With the budget, the compressed cache and the CPU optimizations we describe in another post, the 30 day range stopped being truncated. But the budget stays, because the day a client processes three times as many documents, the answer will still arrive.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "tasa-de-entrega-cero-por-ciento",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/imagiq/tour/operacion/ordenes.jpg",
      width: 1512,
      height: 806,
      alt: {
        ES: "Tabla de órdenes del panel de Imagiq",
        EN: "Orders table in the Imagiq admin panel",
      },
    },
    tags: [
      "SQL",
      "Datos",
      "Comercio electrónico",
    ],
    relatedCase: "imagiq",
    copy: {
      ES: {
        title: "Tasa de entrega 0,0% con diez entregadas: cuando el SQL cuenta la guía equivocada",
        excerpt: "Un tablero decía 0% de entregas junto a diez órdenes entregadas. La consulta contaba las guías anuladas. Una lección sobre numeradores, denominadores y poblaciones.",
        sections: [
          {
            heading: "Dos números que no cuadran",
            paragraphs: [
              "En el panel de Imagiq, la tarjeta Tasa de entrega mostraba 0,0% y, justo debajo, 10 entregadas. Nadie lo había reportado: un número raro en una esquina se acepta con facilidad si el resto del tablero parece bien. Lo vimos recorriendo el producto para documentarlo.",
              "La tasa salía de una consulta que dividía guías entregadas entre guías totales, filtrando por activo = false. En el sistema de pagos, la guía vigente de una orden es la que tiene activo = true; activo = false es la guía que se anuló al regenerarla. La tasa se calculaba, entonces, solo sobre guías anuladas, mientras el conteo de entregadas de al lado sí miraba las vigentes.",
            ],
          },
          {
            heading: "La regla",
            paragraphs: [
              "Numerador y denominador tienen que salir de la misma población que el resto de las métricas del tablero. Si una tarjeta cuenta órdenes con guía vigente, la tasa de al lado no puede contar otra cosa. El arreglo fue una línea: activo = true, con un comentario en la consulta que explica por qué.",
              "Tras el despliegue la tarjeta pasó a 62,5%, un número que sí cuadra con las diez entregadas.",
            ],
          },
          {
            heading: "Cómo evitarlo",
            paragraphs: [
              "Nombrar en el código qué significa cada bandera. Un booleano llamado activo se lee de tres formas distintas por tres personas; un comentario de una línea junto al filtro evita la tercera.",
              "Y mirar los tableros como los mira un cliente: dos números vecinos que se contradicen son un bug aunque cada consulta, por separado, sea correcta.",
            ],
          },
        ],
      },
      EN: {
        title: "Delivery rate 0.0% next to ten deliveries: when the SQL counts the wrong label",
        excerpt: "A dashboard said 0% deliveries next to ten delivered orders. The query was counting cancelled shipping labels. A lesson about numerators, denominators and populations.",
        sections: [
          {
            heading: "Two numbers that do not add up",
            paragraphs: [
              "In Imagiq's admin panel, the Delivery rate card showed 0.0% and, right below it, 10 delivered. Nobody had reported it: an odd number in a corner is easy to accept when the rest of the dashboard looks fine. We noticed it while walking through the product to document it.",
              "The rate came from a query dividing delivered labels by total labels, filtered by activo = false. In the payments system, an order's live label is the one with activo = true; activo = false is the label that was voided when a new one was generated. The rate was computed only over voided labels, while the delivered count next to it looked at the live ones.",
            ],
          },
          {
            heading: "The rule",
            paragraphs: [
              "Numerator and denominator must come from the same population as the rest of the dashboard's metrics. If one card counts orders with a live label, the rate beside it cannot count something else. The fix was one line: activo = true, with a comment in the query explaining why.",
              "After the deploy the card read 62.5%, a number that does add up with the ten deliveries.",
            ],
          },
          {
            heading: "How to avoid it",
            paragraphs: [
              "Name in the code what each flag means. A boolean called activo gets read three different ways by three people; a one line comment next to the filter prevents the third.",
              "And look at dashboards the way a customer does: two neighboring numbers that contradict each other are a bug even if each query, on its own, is correct.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "pantalla-roja-en-flutter-por-leer-traducciones-en-initstate",
    date: "2026-09-21",
    author: LUMINTIK,
    cover: {
      src: "/projects/futtem/tour/partida.jpg",
      width: 603,
      height: 1311,
      alt: {
        ES: "Pantalla de una partida en la app FUTTEM",
        EN: "A match screen in the FUTTEM app",
      },
    },
    tags: [
      "Flutter",
      "Móvil",
      "Calidad",
    ],
    relatedCase: "futtem",
    copy: {
      ES: {
        title: "Pantalla roja en Flutter por leer traducciones en initState",
        excerpt: "Dos pantallas de una app en staging reventaban al abrirse. La causa: pedir las traducciones antes de que el widget tuviera contexto. El arreglo, y cómo comprobamos que no había más.",
        sections: [
          {
            heading: "El error",
            paragraphs: [
              "En la build de staging de FUTTEM, abrir la pestaña Jugadores de una partida o los ajustes de un club mostraba la pantalla roja de Flutter: dependOnInheritedWidgetOfExactType fue llamado antes de que initState terminara. El código leía context.l10n dentro de initState para poner nombres traducidos a los equipos y a las pestañas.",
              "En initState el widget aún no tiene acceso a sus dependencias heredadas, y las traducciones son una. Flutter lo reprocha con un assert. En una build de release ese assert no existe, así que producción no reventaba; pero era el mismo código, y cualquier build de pruebas lo hacía.",
            ],
          },
          {
            heading: "El arreglo",
            paragraphs: [
              "Mover esa inicialización a didChangeDependencies, que Flutter llama después de initState y cada vez que cambia una dependencia heredada. Para los equipos, una sola vez, con una bandera; para las pestañas, cada vez, de modo que si cambia el idioma se rehacen con él.",
              "Antes de cerrar buscamos el mismo patrón en todo el código y en las tres ramas: main, qa y staging. Un script recorre cada initState y avisa si dentro lee un widget heredado. Solo aparecieron esas dos pantallas.",
            ],
          },
          {
            heading: "Por qué importa en staging",
            paragraphs: [
              "Que producción no falle no significa que el código esté bien. Los asserts de Flutter existen para avisar de estados que en release simplemente quedan indefinidos. Por eso mantenemos tres ambientes y probamos en el de pruebas con la misma cuenta que usaría un jugador.",
              "El arreglo salió a staging el mismo día, verificado en el simulador antes de mezclarlo.",
            ],
          },
        ],
      },
      EN: {
        title: "Red screen in Flutter from reading translations in initState",
        excerpt: "Two screens of an app in staging crashed on open. The cause: asking for translations before the widget had context. The fix, and how we checked there were no more.",
        sections: [
          {
            heading: "The error",
            paragraphs: [
              "In FUTTEM's staging build, opening the Players tab of a match or a club's settings showed Flutter's red screen: dependOnInheritedWidgetOfExactType was called before initState completed. The code read context.l10n inside initState to give translated names to the teams and the tabs.",
              "Inside initState the widget has no access to its inherited dependencies yet, and translations are one of them. Flutter complains with an assert. In a release build that assert does not exist, so production did not crash; but it was the same code, and any test build did.",
            ],
          },
          {
            heading: "The fix",
            paragraphs: [
              "Move that initialization to didChangeDependencies, which Flutter calls after initState and whenever an inherited dependency changes. For the teams, once, behind a flag; for the tabs, every time, so a language change rebuilds them.",
              "Before closing we searched for the same pattern across the whole codebase and the three branches: main, qa and staging. A script walks every initState and flags any that reads an inherited widget. Only those two screens showed up.",
            ],
          },
          {
            heading: "Why staging matters",
            paragraphs: [
              "Production not failing does not mean the code is right. Flutter's asserts exist to warn about states that in release simply become undefined. That is why we keep three environments and test in the staging one with the same account a player would use.",
              "The fix shipped to staging the same day, verified on the simulator before merging.",
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
              "Recorrer un producto con ojos de cliente saca bugs que ningún reporte trae. En un solo día: un botón de crear campaña sin acción, una paginación que decía página 1 de menos uno, un estado sin traducir, una tasa de entrega en cero, dos pantallas que reventaban en pruebas. Todos salieron arreglados el mismo día, cada uno con su pull request.",
              "Documentar no es solo escribir lo que hay. Es la mejor prueba de aceptación que conocemos.",
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
              "Walking a product with a customer's eyes surfaces bugs no report brings. In a single day: a create campaign button with no action, a pagination that read page 1 of minus one, an untranslated status, a delivery rate stuck at zero, two screens crashing in testing. All fixed the same day, each with its own pull request.",
              "Documenting is not just writing down what exists. It is the best acceptance test we know.",
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
        title: "Cinco hábitos para medir en producción sin adivinar",
        excerpt: "Lo que aprendimos arreglando una API serverless en un solo día: cabeceras Server-Timing, líneas REPORT de Lambda, presupuestos honestos y la regla de instrumentar antes de optimizar.",
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
              "Cada ejecución de Lambda deja en CloudWatch una línea con duración, duración de arranque y memoria máxima. Es la única fuente que dice si una función muere por tiempo o por memoria. Un 500 vacío en el navegador no distingue las dos cosas; el REPORT sí.",
            ],
          },
          {
            heading: "3. Exponer la memoria",
            paragraphs: [
              "Añadimos al Server-Timing el heap vivo, el heap comprometido, el techo de V8 y el RSS al entrar y al responder. Así supimos que el techo real de esa Lambda eran 620 MB de heap y que la instancia arrastraba cientos de MB entre peticiones.",
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
              "Con esos cinco hábitos, una API que fallaba pasó a responder en seis segundos. Ninguno requiere herramientas nuevas: solo mirar lo que ya está ahí.",
            ],
          },
        ],
      },
      EN: {
        title: "Five habits for measuring in production without guessing",
        excerpt: "What we learned fixing a serverless API in a single day: Server-Timing headers, Lambda REPORT lines, honest budgets and the rule of instrumenting before optimizing.",
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
              "Every Lambda execution leaves a line in CloudWatch with duration, init duration and peak memory. It is the only source that says whether a function dies of time or of memory. An empty 500 in the browser does not tell the two apart; the REPORT does.",
            ],
          },
          {
            heading: "3. Expose memory",
            paragraphs: [
              "We added the live heap, the committed heap, V8's limit and the RSS on entry and on response to Server-Timing. That is how we learned the real heap limit of that Lambda was 620 MB and that the instance carried hundreds of MB between requests.",
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
              "With those five habits, an API that failed went on to answer in six seconds. None of them needs new tools: only looking at what is already there.",
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
      src: "/projects/reco/plataforma-desktop.png",
      width: 2400,
      height: 1500,
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
      src: "/projects/samsung/home-desktop.png",
      width: 2880,
      height: 1800,
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
      src: "/projects/ezdocu/home-desktop.png",
      width: 2880,
      height: 1800,
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
