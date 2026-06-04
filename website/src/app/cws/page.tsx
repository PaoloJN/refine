import Link from "next/link"

import { CWS_ASSETS, type CwsAsset } from "@/components/cws/registry"

const FONT_MONO =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace"
const FONT_SANS =
  "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"

export default function CwsIndexPage() {
  const groups: { key: CwsAsset["group"]; title: string; sub: string }[] = [
    { key: "icon", title: "Icons", sub: "128×128 · Chrome auto-applies a squircle" },
    { key: "promo", title: "Promo tiles", sub: "Small (440×280) + Marquee (1400×560)" },
    { key: "screenshot", title: "Screenshots", sub: "1280×800 · 5 of them" },
  ]

  return (
    <div
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 600,
            color: "#888",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
          Chrome Web Store
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.024em",
            color: "#f3f3f3",
          }}>
          Editable store assets.
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 14.5,
            color: "#a3a3a3",
            lineHeight: 1.6,
            maxWidth: 720,
          }}>
          Each asset is a React component rendered at its exact CWS dimension.
          Tweak copy or layout in{" "}
          <code style={{ background: "#222", padding: "1px 6px", borderRadius: 4 }}>
            website/src/components/cws/screens.tsx
          </code>{" "}
          and refresh — no design-tool round-trip. Click an asset to preview and
          download as PNG or JPEG.
        </p>
      </header>

      {groups.map((g) => (
        <section
          key={g.key}
          style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              paddingBottom: 8,
              borderBottom: "1px solid #2a2a2a",
            }}>
            <h2
              style={{
                margin: 0,
                fontFamily: FONT_SANS,
                fontSize: 17,
                fontWeight: 600,
                color: "#f3f3f3",
                letterSpacing: "-0.012em",
              }}>
              {g.title}
            </h2>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: "#888",
                letterSpacing: "0.04em",
              }}>
              {g.sub}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}>
            {CWS_ASSETS.filter((a) => a.group === g.key).map((a) => (
              <AssetCard key={a.slug} asset={a} />
            ))}
          </div>
        </section>
      ))}

      <footer
        style={{
          marginTop: 32,
          padding: "20px 22px",
          background: "#0d0d0d",
          border: "1px solid #2a2a2a",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 600,
            color: "#888",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
          How to ship
        </div>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: FONT_SANS,
            fontSize: 13.5,
            color: "#c8c8c8",
            lineHeight: 1.55,
          }}>
          <li>1. Click any asset to open its preview page.</li>
          <li>
            2. Edit copy or layout in{" "}
            <code style={{ background: "#222", padding: "1px 6px", borderRadius: 4 }}>
              screens.tsx
            </code>{" "}
            and refresh — instant feedback.
          </li>
          <li>
            3. Hit <strong style={{ color: "#f3f3f3" }}>Download</strong> on the
            preview page. The file lands in your Downloads folder at the exact
            CWS dimensions.
          </li>
          <li>4. Upload to the Chrome Web Store dashboard during submission.</li>
        </ul>
      </footer>
    </div>
  )
}

function AssetCard({ asset }: { asset: CwsAsset }) {
  return (
    <Link
      href={`/cws/${asset.slug}`}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 14,
        background: "#0d0d0d",
        border: "1px solid #2a2a2a",
        borderRadius: 10,
      }}>
      <div
        style={{
          aspectRatio: `${asset.width} / ${asset.height}`,
          width: "100%",
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${getScale(asset)})`,
            transformOrigin: "top left",
            width: asset.width,
            height: asset.height,
          }}>
          <div className="cws-frame" style={{ width: asset.width, height: asset.height }}>
            {asset.render()}
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13.5,
            fontWeight: 600,
            color: "#f3f3f3",
            letterSpacing: "-0.005em",
          }}>
          {asset.label}
        </div>
        <div
          style={{
            marginTop: 2,
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: "#888",
            letterSpacing: "0.04em",
          }}>
          {asset.width}×{asset.height}
          {asset.description && <span style={{ marginLeft: 8 }}>· {asset.description}</span>}
        </div>
      </div>
    </Link>
  )
}

function getScale(asset: CwsAsset) {
  // Card thumbnails get a max width of ~252px (after padding). Scale the
  // asset's natural width down to fit.
  return 252 / asset.width
}
