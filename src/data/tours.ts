import type { Locale } from "@/lib/locale";

/** A point on the screenshot, in percent of its width and height. */
type Pt = [number, number];

export type TourStep = {
  id: string;
  image: string;
  label: Record<Locale, string>;
  caption: Record<Locale, string>;
  /** Where the camera settles: the point it zooms toward and how far. */
  focus: { at: Pt; zoom: number };
  /** Where the cursor ends up and clicks before the next step. */
  click: Pt;
};

export type Tour = {
  id: string;
  /** A browser window for the desktop product, a phone for the mobile one. */
  device: "browser" | "phone";
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  /** Shown in the browser bar. */
  url: string;
  width: number;
  height: number;
  steps: TourStep[];
  /**
   * The same surface on a phone, shown next to the browser. Only for tours
   * where the phone really is the same product the tour is walking through;
   * a panel we never captured on a phone does not get one.
   */
  mobile?: { src: string; video?: string; width: number; height: number; alt: Record<Locale, string> };
};

/** Product tours, keyed by case slug. Every screen is from the live product: a fictional demo case where one exists, blurred figures and names otherwise. */
export const TOURS: Record<string, Tour[]> = {
  imagiq: [
    {
      id: "operacion",
      device: "browser",
      title: {
        ES: "La operación, en un solo panel",
        EN: "Operations, on a single panel",
      },
      intro: {
        ES: "Pantallas reales del panel en producción, con nombres, documentos e importes difuminados. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production, with names, documents and amounts blurred. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com",
      width: 1512,
      height: 806,
      mobile: {
        src: "/projects/mobile/imagiq-panel.webp",
        width: 604,
        height: 1308,
        alt: {
          ES: "El mismo panel en un teléfono",
          EN: "The same panel on a phone",
        },
      },
      steps: [
        {
          id: "panel",
          image: "/projects/imagiq/tour/operacion/panel.jpg",
          label: {
            ES: "El negocio de un vistazo",
            EN: "The business at a glance",
          },
          caption: {
            ES: "Ventas, órdenes, clientes nuevos y ticket promedio del período, con la actividad reciente de la tienda al lado.",
            EN: "Sales, orders, new customers and average ticket for the period, with the store's recent activity alongside.",
          },
          focus: {
            at: [55, 45],
            zoom: 1.06,
          },
          click: [4.4, 24.8],
        },
        {
          id: "ordenes",
          image: "/projects/imagiq/tour/operacion/ordenes.jpg",
          label: {
            ES: "Cada orden, con su estado",
            EN: "Every order, with its status",
          },
          caption: {
            ES: "Todas las órdenes con su estado y su medio de pago: datáfono en tienda, PSE o crédito. Se filtran por estado, por pago o por cliente.",
            EN: "Every order with its status and payment method: in store card terminal, bank transfer or credit. Filter by status, payment or customer.",
          },
          focus: {
            at: [58, 55],
            zoom: 1.08,
          },
          click: [5.2, 59.6],
        },
        {
          id: "tiendas",
          image: "/projects/imagiq/tour/operacion/tiendas.jpg",
          label: {
            ES: "Toda la red de tiendas",
            EN: "The whole store network",
          },
          caption: {
            ES: "Cada punto de venta con su código, dirección y horario, junto a las órdenes de kiosko y las recogidas pendientes por verificar.",
            EN: "Every point of sale with its code, address and opening hours, next to kiosk orders and pickups waiting to be verified.",
          },
          focus: {
            at: [56, 68],
            zoom: 1.1,
          },
          click: [4.2, 64],
        },
        {
          id: "bodega",
          image: "/projects/imagiq/tour/operacion/bodega.jpg",
          label: {
            ES: "La demanda que no se ve",
            EN: "The demand you cannot see",
          },
          caption: {
            ES: "Los productos agotados que los clientes siguen pidiendo, ordenados por cuántos esperan. Debajo, el estado de cada guía de envío en tiempo real.",
            EN: "Sold out products customers keep asking for, ranked by how many are waiting. Below, the live status of every shipping label.",
          },
          focus: {
            at: [55, 50],
            zoom: 1.08,
          },
          click: [4.8, 68.5],
        },
        {
          id: "cobertura",
          image: "/projects/imagiq/tour/operacion/cobertura.jpg",
          label: {
            ES: "Zonas de entrega dibujadas a mano",
            EN: "Delivery zones drawn by hand",
          },
          caption: {
            ES: "El equipo dibuja sobre el mapa hasta dónde llega cada ciudad, con las tiendas encima, y verifica una dirección antes de prometer la entrega.",
            EN: "The team draws on the map how far each city reaches, with the stores on top, and checks an address before promising delivery.",
          },
          focus: {
            at: [48, 62],
            zoom: 1.12,
          },
          click: [89, 34.7],
        },
      ],
    },
    {
      id: "marketing",
      device: "browser",
      title: {
        ES: "Campañas por cada canal",
        EN: "Campaigns on every channel",
      },
      intro: {
        ES: "Pantallas reales del panel en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com/marketing",
      width: 1512,
      height: 806,
      mobile: {
        src: "/projects/mobile/imagiq-campanas.webp",
        width: 604,
        height: 1308,
        alt: {
          ES: "Las mismas campañas en un teléfono",
          EN: "The same campaigns on a phone",
        },
      },
      steps: [
        {
          id: "campanas",
          image: "/projects/imagiq/tour/marketing/campanas.jpg",
          label: {
            ES: "Todas las campañas, con su resultado",
            EN: "Every campaign, with its result",
          },
          caption: {
            ES: "Correo, WhatsApp, SMS y mensajes dentro del sitio en una sola lista, con alcance, aperturas y clics de cada envío.",
            EN: "Email, WhatsApp, SMS and on site messages in a single list, with reach, opens and clicks for every send.",
          },
          focus: {
            at: [50, 55],
            zoom: 1.06,
          },
          click: [93.6, 11.7],
        },
        {
          id: "canales",
          image: "/projects/imagiq/tour/marketing/canales.jpg",
          label: {
            ES: "Un canal para cada objetivo",
            EN: "A channel for every goal",
          },
          caption: {
            ES: "Al crear una campaña se elige por dónde sale: automatización por eventos, WhatsApp, correo, SMS o un mensaje dentro de la tienda.",
            EN: "Creating a campaign starts by choosing where it goes out: event automation, WhatsApp, email, SMS or a message inside the store.",
          },
          focus: {
            at: [58, 35],
            zoom: 1.1,
          },
          click: [58.5, 34.7],
        },
        {
          id: "correo",
          image: "/projects/imagiq/tour/marketing/correo.jpg",
          label: {
            ES: "Correos armados arrastrando bloques",
            EN: "Emails built by dragging blocks",
          },
          caption: {
            ES: "Un editor visual con plantillas propias: columnas, botones, imágenes y HTML. El equipo de mercadeo arma el correo sin pedirle nada a desarrollo.",
            EN: "A visual editor with the brand's own templates: columns, buttons, images and HTML. Marketing builds the email without asking engineering for anything.",
          },
          focus: {
            at: [52, 55],
            zoom: 1.06,
          },
          click: [84, 23.4],
        },
        {
          id: "whatsapp",
          image: "/projects/imagiq/tour/marketing/whatsapp.jpg",
          label: {
            ES: "WhatsApp, con vista previa en vivo",
            EN: "WhatsApp, with a live preview",
          },
          caption: {
            ES: "Producto, precio, descuento y botones de compra. A la derecha, el mensaje tal como lo verá el cliente en su teléfono mientras se escribe.",
            EN: "Product, price, discount and buy buttons. On the right, the message exactly as the customer will see it on their phone, as it is written.",
          },
          focus: {
            at: [70, 55],
            zoom: 1.1,
          },
          click: [86, 48],
        },
        {
          id: "sms",
          image: "/projects/imagiq/tour/marketing/sms.jpg",
          label: {
            ES: "SMS con plantillas y variables",
            EN: "SMS with templates and variables",
          },
          caption: {
            ES: "Plantillas por categoría, variables de nombre y apellido, y el conteo de caracteres y segmentos antes de enviar.",
            EN: "Templates by category, first and last name variables, and the character and segment count before sending.",
          },
          focus: {
            at: [62, 55],
            zoom: 1.08,
          },
          click: [58.4, 37.5],
        },
        {
          id: "inweb",
          image: "/projects/imagiq/tour/marketing/inweb.jpg",
          label: {
            ES: "Mensajes dentro de la tienda",
            EN: "Messages inside the store",
          },
          caption: {
            ES: "Un pop up o un aviso sobre el sitio real, segmentado por audiencia, ciudad, número de compras y edad, con vista previa en escritorio y móvil.",
            EN: "A pop up or a notice over the real site, segmented by audience, city, number of purchases and age, with desktop and mobile preview.",
          },
          focus: {
            at: [45, 55],
            zoom: 1.06,
          },
          click: [89, 10.2],
        },
      ],
    },
    {
      id: "sitio",
      device: "browser",
      title: {
        ES: "El sitio lo maneja el equipo",
        EN: "The team runs the site",
      },
      intro: {
        ES: "Pantallas reales del panel en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com/pagina-web",
      width: 1512,
      height: 806,
      mobile: {
        src: "/projects/mobile/imagiq-sitio.webp",
        width: 604,
        height: 1308,
        alt: {
          ES: "La misma gestión del sitio en un teléfono",
          EN: "The same site management on a phone",
        },
      },
      steps: [
        {
          id: "banners",
          image: "/projects/imagiq/tour/sitio/banners.jpg",
          label: {
            ES: "Los banners de la portada",
            EN: "The home page banners",
          },
          caption: {
            ES: "Cada banner con su ubicación, su llamado a la acción y su estado. Se activan y se ordenan sin tocar código.",
            EN: "Every banner with its placement, call to action and status. They are switched on and reordered without touching code.",
          },
          focus: {
            at: [55, 60],
            zoom: 1.06,
          },
          click: [94, 11.7],
        },
        {
          id: "landing",
          image: "/projects/imagiq/tour/sitio/landing.jpg",
          label: {
            ES: "Landings con vista previa en vivo",
            EN: "Landing pages with a live preview",
          },
          caption: {
            ES: "Título, fechas, carrusel de banners y secciones de productos a la izquierda. A la derecha, la página real actualizándose mientras se edita.",
            EN: "Title, dates, banner carousel and product sections on the left. On the right, the real page updating as it is edited.",
          },
          focus: {
            at: [72, 60],
            zoom: 1.08,
          },
          click: [55.5, 70],
        },
        {
          id: "en-vivo",
          image: "/projects/imagiq/tour/sitio/en-vivo.jpg",
          label: {
            ES: "Transmisiones en vivo con compra",
            EN: "Live streams you can buy from",
          },
          caption: {
            ES: "Un YouTube Live con chat y cuenta regresiva dentro de la landing, con enlace de respaldo, horario programado y hasta 12 productos para comprar durante la transmisión.",
            EN: "A YouTube Live with chat and countdown inside the landing page, with a backup link, a schedule and up to 12 products to buy during the stream.",
          },
          focus: {
            at: [38, 55],
            zoom: 1.1,
          },
          click: [51, 36.2],
        },
      ],
    },
    {
      id: "tienda",
      device: "browser",
      title: {
        ES: "La tienda que ve el cliente",
        EN: "The store the customer sees",
      },
      intro: {
        ES: "La tienda pública en producción, recorrida con datos ficticios. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "The public store in production, walked through with fictional details. Hover to pause, or pick a stop on the rail.",
      },
      url: "imagiq.com",
      width: 1512,
      height: 806,
      mobile: {
        src: "/projects/mobile/imagiq.webp",
        video: "/projects/video/imagiq-mobile.mp4",
        width: 604,
        height: 1314,
        alt: {
          ES: "La misma tienda en un iPhone",
          EN: "The same store on an iPhone",
        },
      },
      steps: [
        {
          id: "inicio",
          image: "/projects/imagiq/tour/tienda/inicio.jpg",
          label: {
            ES: "La portada",
            EN: "The home page",
          },
          caption: {
            ES: "Los banners que mercadeo administra desde el panel, el buscador y el asistente siempre a un clic.",
            EN: "The banners marketing manages from the panel, search, and the assistant always one click away.",
          },
          focus: {
            at: [55, 50],
            zoom: 1.05,
          },
          click: [96.7, 72.7],
        },
        {
          id: "asistente",
          image: "/projects/imagiq/tour/tienda/asistente.jpg",
          label: {
            ES: "Un asistente que conoce el catálogo",
            EN: "An assistant that knows the catalog",
          },
          caption: {
            ES: "El cliente pregunta como le hablaría a un vendedor y recibe una recomendación con la tarjeta del producto, su precio y el botón de compra.",
            EN: "The customer asks the way they would ask a salesperson and gets a recommendation with the product card, its price and the buy button.",
          },
          focus: {
            at: [16, 50],
            zoom: 1.18,
          },
          click: [25.4, 4.1],
        },
        {
          id: "producto",
          image: "/projects/imagiq/tour/tienda/producto.jpg",
          label: {
            ES: "La página de producto",
            EN: "The product page",
          },
          caption: {
            ES: "Variantes de almacenamiento y color con su precio y su cuota mensual, siempre con el botón de compra a la vista.",
            EN: "Storage and color variants with their price and monthly installment, with the buy button always in view.",
          },
          focus: {
            at: [70, 50],
            zoom: 1.08,
          },
          click: [92.5, 15.6],
        },
        {
          id: "carrito",
          image: "/projects/imagiq/tour/tienda/carrito.jpg",
          label: {
            ES: "El carrito",
            EN: "The cart",
          },
          caption: {
            ES: "Descuentos aplicados, plan de entrega del equipo usado, accesorios sugeridos para ese modelo y las opciones de financiación.",
            EN: "Discounts applied, trade in of the old device, accessories suggested for that model and the financing options.",
          },
          focus: {
            at: [55, 40],
            zoom: 1.08,
          },
          click: [67, 37],
        },
        {
          id: "datos",
          image: "/projects/imagiq/tour/tienda/datos.jpg",
          label: {
            ES: "Comprar sin crear cuenta",
            EN: "Buying without an account",
          },
          caption: {
            ES: "Cuatro pasos: datos, entrega, pago y confirmación. Se puede seguir como invitado o iniciar sesión para acumular puntos.",
            EN: "Four steps: details, delivery, payment and confirmation. Continue as a guest or sign in to collect points.",
          },
          focus: {
            at: [45, 50],
            zoom: 1.08,
          },
          click: [51.3, 7.7],
        },
        {
          id: "tiendas",
          image: "/projects/imagiq/tour/tienda/tiendas.jpg",
          label: {
            ES: "Todas las tiendas en el mapa",
            EN: "Every store on the map",
          },
          caption: {
            ES: "Cada punto de venta con su dirección, su horario y la ruta en Maps o Waze. La misma red desde la que se despacha cada pedido.",
            EN: "Every point of sale with its address, opening hours and the route in Maps or Waze. The same network every order ships from.",
          },
          focus: {
            at: [55, 60],
            zoom: 1.06,
          },
          click: [10.2, 51.2],
        },
      ],
    },
  ],
  futtem: [
    {
      id: "app",
      device: "phone",
      title: {
        ES: "La app, en el ambiente de pruebas",
        EN: "The app, on the staging environment",
      },
      intro: {
        ES: "Pantallas reales de la build de staging con una cuenta de prueba: el mismo ambiente que el equipo revisa antes de cada salida a producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the staging build with a test account: the environment the team checks before every production release. Hover to pause, or pick a stop on the rail.",
      },
      url: "FUTTEM · staging",
      width: 603,
      height: 1311,
      steps: [
        {
          id: "inicio",
          image: "/projects/futtem/tour/inicio.jpg",
          label: {
            ES: "Tus clubes",
            EN: "Your clubs",
          },
          caption: {
            ES: "Cada jugador entra a sus clubes, crea uno nuevo o busca otro. La etiqueta de staging marca en qué ambiente está corriendo la app.",
            EN: "Every player opens their clubs, creates a new one or searches for another. The staging badge shows which environment the app is running on.",
          },
          focus: {
            at: [50, 40],
            zoom: 1.05,
          },
          click: [27.1, 29.9],
        },
        {
          id: "club",
          image: "/projects/futtem/tour/club.jpg",
          label: {
            ES: "El club y su plantilla",
            EN: "The club and its squad",
          },
          caption: {
            ES: "Escudo, director técnico, jugadores y las próximas partidas del club, con el botón para convocar una nueva.",
            EN: "Crest, coach, players and the club's upcoming matches, with the button to call a new one.",
          },
          focus: {
            at: [50, 50],
            zoom: 1.05,
          },
          click: [78.9, 89.7],
        },
        {
          id: "partida",
          image: "/projects/futtem/tour/partida.jpg",
          label: {
            ES: "La partida, con todo lo que hace falta",
            EN: "The match, with everything needed",
          },
          caption: {
            ES: "Cancha y ubicación, fecha y hora, grupo de WhatsApp, cómo llegar, cuándo se lanza la convocatoria, cupos y costo por jugador.",
            EN: "Pitch and location, date and time, WhatsApp group, directions, when the call up goes out, spots and cost per player.",
          },
          focus: {
            at: [50, 55],
            zoom: 1.05,
          },
          click: [10, 14],
        },
        {
          id: "jugadores",
          image: "/projects/futtem/tour/jugadores.jpg",
          label: {
            ES: "Dos equipos, una lista de espera",
            EN: "Two teams, one waiting list",
          },
          caption: {
            ES: "Los convocados se reparten en Equipo A y Equipo B, con los cupos que faltan, los que están por confirmar y la lista de espera.",
            EN: "The players called up are split into Team A and Team B, with the spots still open, the ones yet to confirm and the waiting list.",
          },
          focus: { at: [50, 30], zoom: 1.08 },
          click: [10, 14],
        },
        {
          id: "partidas",
          image: "/projects/futtem/tour/partidas.jpg",
          label: {
            ES: "Partidas cerca, próximas e historial",
            EN: "Matches nearby, upcoming and past",
          },
          caption: {
            ES: "Con el perfil público activado la app muestra partidas cerca del jugador. Debajo, las próximas y las ya jugadas.",
            EN: "With a public profile the app shows matches near the player. Below, the upcoming ones and those already played.",
          },
          focus: {
            at: [50, 45],
            zoom: 1.05,
          },
          click: [65.9, 94.3],
        },
        {
          id: "entreno",
          image: "/projects/futtem/tour/entreno.jpg",
          label: {
            ES: "Entrenamiento en video",
            EN: "Training on video",
          },
          caption: {
            ES: "Videos de entrenamiento, físico y promocionales, con los últimos vistos por el jugador.",
            EN: "Training, fitness and promotional videos, with the ones the player watched last.",
          },
          focus: {
            at: [50, 45],
            zoom: 1.05,
          },
          click: [87.8, 94.3],
        },
        {
          id: "notificaciones",
          image: "/projects/futtem/tour/notificaciones.jpg",
          label: {
            ES: "Convocatorias que llegan al teléfono",
            EN: "Call ups that reach the phone",
          },
          caption: {
            ES: "Cada convocatoria avisa con hora y partida, y se confirma desde la app.",
            EN: "Every call up arrives with time and match, and is confirmed from the app.",
          },
          focus: {
            at: [50, 35],
            zoom: 1.08,
          },
          click: [31.6, 9.2],
        },
        {
          id: "ajustes",
          image: "/projects/futtem/tour/ajustes.jpg",
          label: {
            ES: "El club se administra desde el teléfono",
            EN: "The club is run from the phone",
          },
          caption: {
            ES: "Nombre, escudo, descripción, reglas y jugadores del club, en tres pestañas.",
            EN: "Name, crest, description, rules and players of the club, in three tabs.",
          },
          focus: { at: [50, 45], zoom: 1.05 },
          click: [10, 17],
        },
        {
          id: "crear-partida",
          image: "/projects/futtem/tour/crear-partida.jpg",
          label: {
            ES: "Convocar en un minuto",
            EN: "Call a match in a minute",
          },
          caption: {
            ES: "Nombre, fecha, hora, ciudad, cancha, duración, tipo de juego y número de jugadores. La convocatoria sale a todo el club.",
            EN: "Name, date, time, city, pitch, duration, game type and number of players. The call up goes out to the whole club.",
          },
          focus: {
            at: [50, 45],
            zoom: 1.05,
          },
          click: [50, 56.5],
        },
      ],
    },
  ],
};
