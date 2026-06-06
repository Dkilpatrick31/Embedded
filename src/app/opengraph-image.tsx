import { ImageResponse } from "next/og";

export const alt = "Embedded — Aviation Pilot Clothing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Top accent line */}
        <div style={{ width: 64, height: 1, background: "#C8A96E" }} />

        {/* Wordmark */}
        <div
          style={{
            color: "#C8A96E",
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: "0.14em",
            lineHeight: 1,
          }}
        >
          EMBEDDED
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "#7A7570",
            fontSize: 22,
            letterSpacing: "0.35em",
          }}
        >
          AVIATION CLOTHING
        </div>

        {/* Bottom accent line */}
        <div style={{ width: 64, height: 1, background: "#C8A96E" }} />
      </div>
    ),
    { ...size },
  );
}
