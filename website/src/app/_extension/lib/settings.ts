import { useState } from "react"

import { ALL_IDS, defaultFlags, type FeatureId } from "./model"

export type ThemePref = "system" | "dark" | "light"

export type Settings = {
  // Master power. When false, content script removes all hide attributes
  // and YouTube renders normally on this profile.
  master: boolean
  // Per-feature toggles.
  flags: Record<FeatureId, boolean>
  theme: ThemePref
}

export const DEFAULTS: Settings = {
  master: true,
  flags: defaultFlags(),
  theme: "system"
}

// Some flags may be missing on upgrade. Fill them with model defaults so the
// content script never reads `undefined` for a known id.
function reconcile(stored: Partial<Settings> | undefined): Settings {
  if (!stored) return DEFAULTS
  const flags = { ...defaultFlags(), ...(stored.flags ?? {}) }
  ALL_IDS.forEach((id) => {
    if (typeof flags[id] !== "boolean") flags[id] = false
  })
  return {
    master: stored.master ?? DEFAULTS.master,
    flags,
    theme: stored.theme ?? DEFAULTS.theme
  }
}

// In-memory stub of the extension's useSettings hook. No chrome.storage,
// no @plasmohq/storage — just React state, seeded from `initial` so the
// demo wrapper on the marketing site can control the starting view.
export function useSettings(
  initial?: Partial<Settings>
): [Settings, (patch: (prev: Settings) => Settings) => void] {
  const [settings, setSettings] = useState<Settings>(() => reconcile(initial))
  const update = (patch: (prev: Settings) => Settings) =>
    setSettings((prev) => patch(prev))
  return [settings, update]
}
