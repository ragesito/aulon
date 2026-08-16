import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Aulon Detailing, Premium Auto Detailing in Melrose Park, IL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded black/gold OG card — no external assets needed. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
          position: "relative",
        }}
      >
        {/* top + bottom gold hairlines */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 120,
            right: 120,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(218,165,32,0) 0%, #daa520 50%, rgba(218,165,32,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 120,
            right: 120,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(218,165,32,0) 0%, #daa520 50%, rgba(218,165,32,0) 100%)",
          }}
        />
        {/* star sparkle */}
        <svg width="56" height="56" viewBox="0 0 24 24" style={{ marginBottom: 24 }}>
          <path
            d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
            fill="#eec95f"
          />
        </svg>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: 18,
            color: "#daa520",
            display: "flex",
          }}
        >
          AULON
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 30,
            color: "#f5f0e6",
            marginTop: 8,
            display: "flex",
          }}
        >
          DETAILING
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#b9b3a6",
            marginTop: 36,
            letterSpacing: 4,
            display: "flex",
          }}
        >
          PREMIUM AUTO DETAILING · MELROSE PARK, IL
        </div>
      </div>
    ),
    { ...size }
  );
}
