import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Evolution Stables";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 48,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 300,
          color: "#d4af37",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        Evolution Stables
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 300,
          color: "rgba(255,255,255,0.6)",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Digital Racehorse Ownership & Tokenized RWA Platform
      </div>
    </div>,
    { ...size },
  );
}
