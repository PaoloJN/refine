"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "refine-theme"

function applyTheme(t: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", t === "dark")
  root.classList.toggle("light", t === "light")
}

// Half-disc theme-switch glyph. The same icon serves both states; we just
// rotate it 180° in dark mode so the filled half points the other way.
function ThemeSwitchIcon({ rotated }: { rotated: boolean }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
      style={{
        transform: rotated ? "rotate(180deg)" : "none",
        transition: "transform 0.25s ease"
      }}>
      <path d="M924.8 337.6a449.344 449.344 0 1 0-828.288 348.8 449.344 449.344 0 0 0 828.288-348.8z m-448.768 544.64A368.768 368.768 0 0 1 248.96 775.04a371.968 371.968 0 0 1 0-525.952 369.152 369.152 0 0 1 226.944-107.264v740.48z m298.944-633.216c10.112 10.048 19.584 20.672 28.416 31.808l-255.36 255.36V457.088l217.344-217.344c3.264 3.008 6.464 6.144 9.6 9.344z m60.48 78.976c9.856 17.28 18.304 35.328 25.216 54.016l-312.704 312.576V615.424l287.488-287.424z m42.304 116.032c4.16 22.4 6.208 45.184 6.272 67.968l-0.064 5.12-336 335.872v-79.168l329.792-329.792z m-156.352-239.616l-173.44 173.44V298.624l123.136-123.072c17.536 8.32 34.304 17.92 50.304 28.864z m-107.904-50.432L547.968 219.52V141.696c22.208 2.176 44.16 6.272 65.536 12.288z m161.472 620.992a369.664 369.664 0 0 1-166.08 96.256l262.4-262.336a369.728 369.728 0 0 1-96.32 166.08z" />
    </svg>
  )
}

export function ThemeToggle() {
  // Server render is `null`; the inline script in <head> has already set the
  // class on <html> before paint, so this useEffect just syncs React state.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const initial: Theme = root.classList.contains("dark") ? "dark" : "light"
    setTheme(initial)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="rf-theme-toggle">
      <ThemeSwitchIcon rotated={theme === "dark"} />
    </button>
  )
}
