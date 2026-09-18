import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

async function font(weight: 500 | 600) {
  // next/font serves Poppins to browsers as woff2; the share card renderer
  // needs TrueType files, so a copy lives in the repo (OFL licence alongside).
  const file = weight === 600 ? "Poppins-SemiBold.ttf" : "Poppins-Medium.ttf";
  return readFile(path.join(process.cwd(), "src/assets/fonts", file));
}

async function logo() {
  const png = await readFile(path.join(process.cwd(), "public/brand/lumintik-lockup-white.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** Black share card: a capsule label, a large title and the white logo. */
export async function ogCard({ label, title, footer }: { label: string; title: string; footer: string }) {
  const [medium, semibold, logoSrc] = await Promise.all([font(500), font(600), logo()]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "Poppins",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={205} height={50} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.08)",
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            {label}
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 500 }}>{footer}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
