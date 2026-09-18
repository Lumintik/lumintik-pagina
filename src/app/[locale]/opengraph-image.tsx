import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumintik SAS — software studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #ffffff 0%, #eaf2ff 45%, #c9dcff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            color: "#0f172a",
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          LUMINTIK SAS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              color: "#3b82f6",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Software studio · 2026
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              color: "#0f172a",
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>We build software that feels&nbsp;</span>
            <span style={{ color: "#3b82f6" }}>inevitable.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#475569",
            fontSize: 24,
          }}
        >
          <div>Samsung · Claro · Coca-Cola · EZDocuAI</div>
          <div>lumintik.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
