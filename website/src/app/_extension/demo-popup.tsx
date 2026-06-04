"use client"

import { Popup } from "./popup"
import type { ThemePref } from "./lib/settings"

export function DemoPopup({ theme = "dark" }: { theme?: "dark" | "light" } = {}) {
  return (
    <div
      style={{
        width: 344,
        borderRadius: 16,
        boxShadow:
          "0 30px 60px -15px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.25)",
        overflow: "hidden"
      }}>
      <Popup
        activeHost="www.youtube.com"
        initial={{ master: true, theme: theme as ThemePref }}
      />
    </div>
  )
}

export default DemoPopup
