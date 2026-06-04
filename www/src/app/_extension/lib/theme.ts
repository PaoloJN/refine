import { useEffect, useState } from "react"

import type { ThemePref } from "./settings"

export type ResolvedTheme = "dark" | "light"

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === "dark" || pref === "light") return pref
  if (typeof window === "undefined" || !window.matchMedia) return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// Resolves a theme preference to "dark" | "light". Unlike the extension
// version, this does NOT toggle classes on <html> — the marketing site
// owns its own theming, and PopupFrame already applies the theme class
// to its own wrapper div so the popup stays isolated.
export function useResolvedTheme(pref: ThemePref): ResolvedTheme {
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(pref))

  useEffect(() => {
    setResolved(resolveTheme(pref))
    if (pref !== "system") return
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setResolved(mq.matches ? "dark" : "light")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [pref])

  return resolved
}
