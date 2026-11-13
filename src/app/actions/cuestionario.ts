"use server";

import nodemailer from "nodemailer";
import { CAMPOS, CLIENTE, PANTALLAS } from "@/components/cuestionario/preguntas";

export type Respuestas = Record<string, string | string[]>;

export type ResultadoCuestionario =
  | { ok: true }
  | { ok: false; codigo: "faltan_campos" | "correo_invalido" | "sin_configurar" | "fallo_envio"; campos?: string[] };

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXTO = 8000;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Deja solo los campos conocidos, como texto o lista de texto, y recorta lo muy largo. */
function limpiar(entrada: unknown): Respuestas {
  const limpio: Respuestas = {};
  if (!entrada || typeof entrada !== "object") return limpio;
  const datos = entrada as Record<string, unknown>;
  for (const campo of CAMPOS) {
    const v = datos[campo.id];
    if (typeof v === "string") limpio[campo.id] = v.trim().slice(0, MAX_TEXTO);
    else if (Array.isArray(v)) {
      const permitidas = new Set(campo.opciones?.map((o) => o.valor) ?? []);
      limpio[campo.id] = v.filter((x): x is string => typeof x === "string" && permitidas.has(x));
    }
  }
  return limpio;
}

const vacio = (v: string | string[] | undefined) => (Array.isArray(v) ? v.length === 0 : !v);

export async function enviarCuestionario(entrada: unknown, trampa: string): Promise<ResultadoCuestionario> {
  // Campo trampa: una persona nunca lo llena. Al bot se le dice que salió bien y no se envía nada.
  if (trampa) return { ok: true };

  const r = limpiar(entrada);

  const faltan = CAMPOS.filter((c) => c.requerido && vacio(r[c.id])).map((c) => c.id);
  if (faltan.length) return { ok: false, codigo: "faltan_campos", campos: faltan };
  const correo = r.correo as string;
  if (!CORREO_RE.test(correo)) return { ok: false, codigo: "correo_invalido", campos: ["correo"] };

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const destinos = new Set(
    [process.env.CONTACT_TO || user || "", "david@lumintik.com"]
      .join(",")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  );
  if (!user || !pass) {
    console.error("[cuestionario] Faltan SMTP_USER o SMTP_PASSWORD.");
    return { ok: false, codigo: "sin_configurar" };
  }

  const nombre = r.nombre as string;
  const valor = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v ?? "");

  const bloques = PANTALLAS.map((p) => {
    const filas = p.campos
      .map((c) => [c.etiqueta, valor(r[c.id])] as const)
      .filter(([, v]) => v);
    return { p, filas };
  }).filter((b) => b.filas.length);

  const texto = bloques
    .map(({ p, filas }) => `${p.numero ? `${p.numero}. ` : ""}${p.titulo}\n${filas.map(([k, v]) => `${k}\n${v}`).join("\n\n")}`)
    .join("\n\n\n");

  const html = `
  <div style="font-family:Poppins,system-ui,Segoe UI,Arial,sans-serif;max-width:640px;color:#0a0a0a">
    <p style="margin:0;color:#737373;font-size:13px;letter-spacing:.08em;text-transform:uppercase">Cuestionario de marca</p>
    <h1 style="margin:6px 0 4px;font-size:24px">${esc(CLIENTE)} · ${esc(nombre)}</h1>
    <p style="margin:0 0 28px;color:#525252">${esc(valor(r.cargo))} ${esc(correo)}</p>
    ${bloques
      .map(
        ({ p, filas }) => `
      <div style="background:#f5f5f5;border-radius:16px;padding:20px 22px;margin:0 0 12px">
        <p style="margin:0 0 12px;font-weight:600;font-size:16px">${p.numero ? `${p.numero}. ` : ""}${esc(p.titulo)}</p>
        ${filas
          .map(
            ([k, v]) => `
          <p style="margin:0 0 2px;color:#737373;font-size:13px">${esc(k)}</p>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.55">${esc(v).replace(/\n/g, "<br>")}</p>`,
          )
          .join("")}
      </div>`,
      )
      .join("")}
  </div>`;

  try {
    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transporter.sendMail({
      from: `"Lumintik" <${user}>`,
      to: [...destinos].join(", "),
      replyTo: `"${nombre}" <${correo}>`,
      subject: `Cuestionario de marca ${CLIENTE} · ${nombre}`,
      text: texto,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error("[cuestionario] Falló el envío:", err);
    return { ok: false, codigo: "fallo_envio" };
  }
}
