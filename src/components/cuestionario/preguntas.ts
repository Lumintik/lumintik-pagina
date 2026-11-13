/**
 * Cuestionario de marca para Grupo Azul Energy (Sesión #1, 11 nov 2026).
 * Una pantalla por pregunta, al estilo Typeform. Las respuestas llegan por correo
 * a Lumintik (ver src/app/actions/cuestionario.ts).
 * Estilo Lumintik en los textos, sin guiones ni dos puntos.
 */

export type Opcion = { valor: string; etiqueta: string };

export type Campo = {
  id: string;
  etiqueta: string;
  ayuda?: string;
  tipo: "texto" | "correo" | "parrafo" | "unica" | "multiple";
  opciones?: Opcion[];
  requerido?: boolean;
  placeholder?: string;
};

export type Pantalla = {
  id: string;
  /** Número visible de la pregunta, si cuenta como una de las 10. */
  numero?: number;
  titulo: string;
  bajada?: string;
  campos: Campo[];
};

export const CLIENTE = "Grupo Azul Energy";

const op = (...xs: string[]): Opcion[] => xs.map((x) => ({ valor: x, etiqueta: x }));

export const PANTALLAS: Pantalla[] = [
  {
    id: "quien",
    titulo: "Primero, ¿quién responde?",
    bajada: "Cada persona responde por su cuenta, sin ponerse de acuerdo antes. Así vemos en qué coinciden y en qué no.",
    campos: [
      { id: "nombre", etiqueta: "Nombre", tipo: "texto", requerido: true, placeholder: "Tu nombre" },
      { id: "correo", etiqueta: "Correo", tipo: "correo", requerido: true, placeholder: "nombre@azulenergy.co" },
      { id: "cargo", etiqueta: "Cargo", tipo: "texto", placeholder: "Opcional" },
    ],
  },
  {
    id: "proposito",
    numero: 1,
    titulo: "¿Para qué existe Grupo Azul Energy?",
    bajada: "En una o dos frases y sin hablar de productos. Por ejemplo «existimos para que…».",
    campos: [{ id: "proposito", etiqueta: "Propósito", tipo: "parrafo", requerido: true }],
  },
  {
    id: "diferencia",
    numero: 2,
    titulo: "¿Qué hace a Azul diferente de cualquier otro proveedor del sector?",
    bajada: "Tres razones concretas por las que un cliente los escoge a ustedes.",
    campos: [{ id: "diferencia", etiqueta: "Diferencia", tipo: "parrafo", requerido: true }],
  },
  {
    id: "competidores",
    numero: 3,
    titulo: "¿Quiénes son sus competidores o comparables?",
    bajada: "Dos o tres empresas. Qué admiran de ellas y en qué no se quieren parecer.",
    campos: [{ id: "competidores", etiqueta: "Competidores", tipo: "parrafo" }],
  },
  {
    id: "historia",
    numero: 4,
    titulo: "¿Cuáles son los momentos clave de la historia del grupo?",
    bajada:
      "Con su año, si lo tienen. La alianza con Marmon y Kerite, la fundación de Azul ZF, la primera rehabilitación de cable, la planta nueva, el premio y las patentes.",
    campos: [{ id: "historia", etiqueta: "Historia", tipo: "parrafo" }],
  },
  {
    id: "bos",
    numero: 5,
    titulo: "¿Cómo escribimos la marca de bienes y servicios?",
    campos: [
      { id: "bosGrafia", etiqueta: "Grafía", tipo: "unica", requerido: true, opciones: op("BOS", "Boss", "Blue Oil Services", "Otra") },
      {
        id: "bosAlcance",
        etiqueta: "¿Qué productos y servicios quedan bajo BOS y cuáles bajo Azul ZF?",
        tipo: "parrafo",
      },
    ],
  },
  {
    id: "mercados",
    numero: 6,
    titulo: "¿Qué países son prioridad en los próximos dos años?",
    bajada: "Marquen todos los que apliquen.",
    campos: [
      {
        id: "paises",
        etiqueta: "Países y regiones",
        tipo: "multiple",
        opciones: op(
          "Colombia",
          "Venezuela",
          "Ecuador",
          "Perú",
          "México",
          "Brasil",
          "Argentina",
          "Chile",
          "Estados Unidos",
          "Europa",
          "Medio Oriente",
        ),
      },
      {
        id: "publicos",
        etiqueta: "¿Y qué públicos? Por ejemplo inversionistas extranjeros o fabricantes europeos que busquen representante",
        tipo: "parrafo",
      },
      { id: "portugues", etiqueta: "¿El sitio debe estar también en portugués?", tipo: "unica", opciones: op("Sí", "No", "Más adelante") },
    ],
  },
  {
    id: "cifras",
    numero: 7,
    titulo: "Cifras que podemos publicar",
    bajada: "Solo las que se puedan mostrar. Si no tienen una a mano, déjenla en blanco.",
    campos: [
      { id: "cifraPies", etiqueta: "Pies de cable recuperados", tipo: "texto", placeholder: "Por ejemplo 750.000" },
      { id: "cifraHuella", etiqueta: "Huella de carbono evitada", tipo: "texto" },
      { id: "cifraEmpalmes", etiqueta: "Empalmes realizados", tipo: "texto" },
      { id: "cifraClientes", etiqueta: "Número de clientes", tipo: "texto" },
      { id: "cifraPaises", etiqueta: "Países donde operan", tipo: "texto" },
      { id: "cifraPersonas", etiqueta: "Personas en el equipo", tipo: "texto" },
      { id: "cifraCorte", etiqueta: "Fecha de corte de estas cifras", tipo: "texto", placeholder: "Por ejemplo noviembre de 2026" },
    ],
  },
  {
    id: "logros",
    numero: 8,
    titulo: "Logros que podemos publicar",
    campos: [
      { id: "premio", etiqueta: "Nombre exacto del premio de economía circular y quién lo entregó", tipo: "texto" },
      { id: "patentes", etiqueta: "Patentes, número o estado de las solicitudes", tipo: "texto" },
      { id: "certificaciones", etiqueta: "Certificaciones vigentes y fecha de la ISO 9001", tipo: "texto" },
      {
        id: "ecopetrol",
        etiqueta: "¿Podemos mencionar a Ecopetrol u otros clientes?",
        tipo: "unica",
        opciones: op("Sí", "No", "Hay que consultarlo"),
      },
    ],
  },
  {
    id: "colores",
    numero: 9,
    titulo: "Colores y símbolos",
    bajada:
      "¿Hay un color o un símbolo que deba quedarse sí o sí, como el azul? ¿Alguno que no quieran ver nunca? ¿Qué recuerdan del logo anterior de BOS, la gota azul?",
    campos: [{ id: "colores", etiqueta: "Colores y símbolos", tipo: "parrafo" }],
  },
  {
    id: "referencias",
    numero: 10,
    titulo: "Referencias",
    bajada:
      "El enlace de la página de México que les gustó y cualquier otro sitio, logo o marca, de cualquier sector, que sientan cerca de lo que quieren proyectar.",
    campos: [{ id: "referencias", etiqueta: "Referencias", tipo: "parrafo", placeholder: "Pega aquí los enlaces" }],
  },
  {
    id: "cierre",
    titulo: "¿Algo más que quieras contarnos?",
    bajada: "Opcional. Lo que no cupo en las preguntas anteriores.",
    campos: [{ id: "comentarios", etiqueta: "Comentarios", tipo: "parrafo" }],
  },
];

/** Todos los ids de campo, en orden, para armar el correo con las respuestas. */
export const CAMPOS: Campo[] = PANTALLAS.flatMap((p) => p.campos);
