import { ImageResponse } from "next/og";

export const alt = "St Simon and St Jude, Thurcroft — website prototype";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1f333b",
          padding: "72px 80px",
          color: "#fbf8f3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", position: "relative", width: 64, height: 64 }}>
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 0,
                width: 12,
                height: 64,
                background: "#fbf8f3",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 22,
                width: 64,
                height: 12,
                background: "#fbf8f3",
              }}
            />
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>
            Thurcroft Parish Church
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 82, lineHeight: 1.05, fontWeight: 700 }}>
            St Simon and St Jude
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, opacity: 0.9 }}>
            Everyone is welcome — at the heart of the community it serves.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8f7226", fontWeight: 600 }}>
          Prototype — not a live website
        </div>
      </div>
    ),
    { ...size },
  );
}
