"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"

const STORAGE_KEY = "refine-theme"

function applyTheme(t: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", t === "dark")
  root.classList.toggle("light", t === "light")
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
      aria-label="Toggle theme"
      className="rf-theme-toggle">
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
