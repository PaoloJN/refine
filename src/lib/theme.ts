import { useEffect, useState } from "react"

import type { ThemePref } from "./settings"

export type ResolvedTheme = "dark" | "light"

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === "dark" || pref === "light") return pref
  if (typeof window === "undefined" || !window.matchMedia) return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useResolvedTheme(pref: ThemePref): ResolvedTheme {
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(pref))

  useEffect(() => {
    setResolved(resolveTheme(pref))
    if (pref !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setResolved(mq.matches ? "dark" : "light")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [pref])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark")
    document.documentElement.classList.toggle("light", resolved === "light")
  }, [resolved])

  return resolved
}
