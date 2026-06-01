"use client"

import { useRef, useState, type ReactNode } from "react"
import { toCanvas } from "html-to-image"

import { CwsFrame, FONT_MONO, FONT_SANS } from "./atoms"

export function CwsPreview({
  slug,
  width,
  height,
  themeName = "light",
  children,
  description,
}: {
  slug: string
  width: number
  height: number
  themeName?: "light" | "dark"
  children: ReactNode
  description?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  async function download(format: "png" | "jpeg") {
    if (!ref.current) return
    setBusy(true)
    try {
      // Render oversampled (2×) for sharp text/edges, then downscale to the
      // exact CWS target dimensions. CWS rejects assets that aren't pixel-exact.
      const SCALE = 2
      const big = await toCanvas(ref.current, {
        pixelRatio: SCALE,
        cacheBust: true,
        width,
        height,
      })
      const target = document.createElement("canvas")
      target.width = width
      target.height = height
      const ctx = target.getContext("2d")
      if (!ctx) throw new Error("2d context unavailable")
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      if (format === "jpeg") {
        ctx.fillStyle = "#fbfaf5"
        ctx.fillRect(0, 0, width, height)
      }
      ctx.drawImage(big, 0, 0, big.width, big.height, 0, 0, width, height)
      const mime = format === "jpeg" ? "image/jpeg" : "image/png"
      const dataUrl = target.toDataURL(mime, format === "jpeg" ? 0.94 : undefined)
      const link = document.createElement("a")
      link.download = `refine-${slug}-${width}x${height}.${format === "jpeg" ? "jpg" : "png"}`
      link.href = dataUrl
      link.click()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 14,
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          width: "100%",
          maxWidth: width,
          flexWrap: "wrap",
        }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: "#a3a3a3",
            letterSpacing: "0.04em",
          }}>
          <span style={{ color: "#f3f3f3" }}>{slug}</span>
          <span style={{ marginLeft: 8 }}>
            · {width}×{height} · {themeName}
          </span>
          {description && <span style={{ marginLeft: 12 }}>· {description}</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => download("png")}
            disabled={busy}
            style={{
              height: 32,
              padding: "0 14px",
              background: busy ? "#2a2a2a" : "#f3f3f3",
              color: busy ? "#888" : "#0a0a0a",
              border: "none",
              borderRadius: 7,
              cursor: busy ? "wait" : "pointer",
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}>
            {busy ? "Exporting…" : "Download PNG"}
          </button>
          <button
            type="button"
            onClick={() => download("jpeg")}
            disabled={busy}
            style={{
              height: 32,
              padding: "0 14px",
              background: "transparent",
              color: "#f3f3f3",
              border: "1px solid #2a2a2a",
              borderRadius: 7,
              cursor: busy ? "wait" : "pointer",
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}>
            JPEG
          </button>
        </div>
      </div>
      <div
        style={{
          padding: 0,
          background: "#222",
          border: "1px solid #2a2a2a",
          maxWidth: "100%",
          overflow: "auto",
        }}>
        <div
          ref={ref}
          style={{
            width,
            height,
          }}>
          <CwsFrame width={width} height={height} themeName={themeName}>
            {children}
          </CwsFrame>
        </div>
      </div>
    </div>
  )
}
