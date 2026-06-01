import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { ALL_IDS, defaultFlags, type FeatureId } from "./model"

export const storage = new Storage({ area: "local" })

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

export const KEY = "refine:settings"

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

export async function getSettings(): Promise<Settings> {
  const raw = await storage.get<Partial<Settings>>(KEY)
  return reconcile(raw)
}

export async function setSettings(next: Settings): Promise<void> {
  await storage.set(KEY, next)
}

// Serialize updates through a single promise chain. Two rapid updateSettings
// calls in flight can otherwise interleave their read-modify-write — A reads,
// B reads, A writes, B writes — and the second write clobbers the first.
let writeChain: Promise<Settings> = Promise.resolve(DEFAULTS)

export function updateSettings(
  patch: (prev: Settings) => Settings
): Promise<Settings> {
  writeChain = writeChain.then(async () => {
    const prev = await getSettings()
    const next = patch(prev)
    await storage.set(KEY, next)
    return next
  })
  return writeChain
}

// React hook for the popup. Returns reconciled settings + an updater that
// always serializes through updateSettings (avoiding stale-closure clobbers
// from rapid clicks). The hook re-renders via @plasmohq's onChanged
// subscription, so the round-trip is invisible.
export function useSettings(): [
  Settings,
  (patch: (prev: Settings) => Settings) => void
] {
  const [raw] = useStorage<Partial<Settings>>(
    { key: KEY, instance: storage },
    DEFAULTS
  )
  return [reconcile(raw), (patch) => void updateSettings(patch)]
}
