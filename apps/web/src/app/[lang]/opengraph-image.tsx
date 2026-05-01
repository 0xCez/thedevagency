import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Dev Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tagline =
    lang === "fr"
      ? "On conçoit et développe des logiciels."
      : "We design and build software.";
  const sub =
    lang === "fr" ? "Mobile, web, IA, automatisation." : "Mobile, web, AI, automation.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: "#a1a1aa",
            textTransform: "uppercase",
          }}
        >
          ◼ The Dev Agency
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -2,
              maxWidth: "980px",
            }}
          >
            {tagline}
          </div>
          <div style={{ fontSize: 32, color: "#a1a1aa" }}>{sub}</div>
        </div>

        <div
          style={{
            fontSize: 20,
            letterSpacing: 2,
            color: "#a1a1aa",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>thedevagency.xyz</span>
          <span>cesar@thedevagency.xyz</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
