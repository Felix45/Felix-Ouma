import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/site-settings";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#06090a",
          backgroundImage:
            "linear-gradient(rgba(61,220,132,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(61,220,132,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#3ddc84", fontFamily: "monospace" }}>
          $ whoami
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#e7f3ec",
            marginTop: 24,
          }}
        >
          {settings.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#92a89d", marginTop: 20 }}>
          {settings.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
