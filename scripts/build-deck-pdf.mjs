// Prints the public sector page to public/documentos/ in both languages.
// Run against a production server: `npm run build && npm start`, then
// `node scripts/build-deck-pdf.mjs [base URL]` (defaults to http://localhost:3000).
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const pages = [
  { path: "/es/gobierno", file: "public/documentos/lumintik-sector-publico-es.pdf" },
  { path: "/en/government", file: "public/documentos/lumintik-sector-publico-en.pdf" },
];

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
for (const { path, file } of pages) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: file, width: "1440px", height: "810px", printBackground: true, preferCSSPageSize: true });
  console.log(file);
}
await browser.close();
