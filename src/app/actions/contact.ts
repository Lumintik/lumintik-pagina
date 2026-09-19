"use server";

import nodemailer from "nodemailer";

/** Result codes the client maps to localized copy in the contact form. */
export type ContactCode =
  | "success"
  | "missing_fields"
  | "invalid_email"
  | "file_too_large"
  | "not_configured"
  | "send_failed";

export type ContactState = {
  status: "idle" | "success" | "error";
  code?: ContactCode;
  /** Names of required fields that failed validation, for client-side highlighting. */
  fields?: string[];
  /**
   * Set when the honeypot caught the submission. The bot still sees a plain
   * success, but the client uses this to keep it out of the conversion count.
   */
  dropped?: boolean;
};

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field. Silently accept + drop.
  if (str(formData, "company_website")) {
    return { status: "success", code: "success", dropped: true };
  }

  const name = str(formData, "name");
  const email = str(formData, "email");
  const service = str(formData, "service");
  const company = str(formData, "company");
  const role = str(formData, "role");
  const message = str(formData, "message");
  const terms = formData.get("terms");
  const countryCode = str(formData, "countryCode") || "+57";
  const phoneRaw = str(formData, "phone");
  const phone = phoneRaw ? `${countryCode} ${phoneRaw}` : "";

  // Server-side validation (mirrors the required attributes on the client).
  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!service) missing.push("service");
  if (!terms) missing.push("terms");
  if (missing.length) {
    return { status: "error", code: "missing_fields", fields: missing };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", code: "invalid_email", fields: ["email"] };
  }

  // Optional attachment.
  const file = formData.get("file");
  const attachments: { filename: string; content: Buffer }[] = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return { status: "error", code: "file_too_large", fields: ["file"] };
    }
    attachments.push({
      filename: file.name || "attachment",
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  // Credentials come only from the environment — never hard-coded.
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO || user;

  if (!user || !pass || !to) {
    // Misconfiguration should never crash the page.
    console.error(
      "[contact] Missing SMTP env vars (SMTP_USER / SMTP_PASSWORD / CONTACT_TO).",
    );
    return { status: "error", code: "not_configured" };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Service", service],
    ["Phone", phone],
    ["Company", company],
    ["Role", role],
    ["Message", message],
  ];

  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New contact request, lumintik.com</h2>
      <p style="color:#64748b;margin:0 0 16px">Sent from the website contact form.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;white-space:nowrap;vertical-align:top">${esc(
                   k,
                 )}</td>
                 <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">${esc(
                   v,
                 ).replace(/\n/g, "<br>")}</td>
               </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Lumintik Website" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `New contact request: ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
      attachments,
    });

    return { status: "success", code: "success" };
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return { status: "error", code: "send_failed" };
  }
}
