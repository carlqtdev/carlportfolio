import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Route-inherited Open Graph image. Satori only supports flexbox and a subset
 * of CSS, so this is intentionally built from simple flex containers.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1115",
          padding: "72px 80px",
          color: "#f4f6f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#5eead4",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8b95a5",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.1, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#a9b3c1",
              maxWidth: 900,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262c36",
            paddingTop: 28,
            fontSize: 24,
            color: "#7c8798",
          }}
        >
          <div style={{ display: "flex" }}>{profile.location}</div>
          <div style={{ display: "flex" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
