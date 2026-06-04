"use client"

import { useState } from "react"

import { GroupList } from "./components/group-list"
import { OffsiteState } from "./components/offsite-state"
import { PausedState } from "./components/paused-state"
import { FooterPro, Header, MeterBar, PopupFrame } from "./components/popup-frame"
import { SettingsScreen } from "./components/settings-screen"
import { countHidden, defaultFlags, type FeatureId } from "./lib/model"
import { DEFAULTS, useSettings, type Settings } from "./lib/settings"
import { useResolvedTheme } from "./lib/theme"

import "./popup.css"

type Screen = "main" | "settings"

const LINK_URLS = {
  donate: "https://github.com/sponsors/PaoloJN",
  request: "https://github.com/PaoloJN/refine/issues/new?labels=enhancement",
  support: "https://github.com/PaoloJN/refine/issues"
} as const

function openExternal(url: string) {
  if (typeof window === "undefined") return
  window.open(url, "_blank", "noopener,noreferrer")
}

export function Popup({
  activeHost = "www.youtube.com",
  initial
}: {
  activeHost?: string | null
  initial?: Partial<Settings>
}) {
  const [settings, setSettings] = useSettings(initial)
  const [screen, setScreen] = useState<Screen>("main")
  const resolved = useResolvedTheme(settings.theme)

  const onYouTube =
    !!activeHost &&
    (activeHost === "www.youtube.com" ||
      activeHost === "m.youtube.com" ||
      activeHost === "youtube.com")
  const subtitle = activeHost ?? "—"
  const { on, total } = countHidden(settings.flags)
  const version = "1.0.0"

  const toggleFeature = (id: FeatureId) =>
    setSettings((prev) => ({
      ...prev,
      flags: { ...prev.flags, [id]: !prev.flags[id] }
    }))

  const toggleMany = (ids: FeatureId[], next: boolean) =>
    setSettings((prev) => {
      const flags = { ...prev.flags }
      for (const id of ids) flags[id] = next
      return { ...prev, flags }
    })

  const toggleMaster = () =>
    setSettings((prev) => ({ ...prev, master: !prev.master }))

  const toggleTheme = () =>
    setSettings((prev) => ({
      ...prev,
      theme:
        prev.theme === "system" ? "dark" : prev.theme === "dark" ? "light" : "system"
    }))

  const resetAll = () =>
    setSettings((prev) => ({ ...DEFAULTS, flags: defaultFlags(), theme: prev.theme }))

  // ─── Settings sub-screen ─────────────────────────────────────────────────
  if (screen === "settings") {
    return (
      <PopupFrame theme={resolved}>
        <SettingsScreen
          settings={settings}
          onPatch={setSettings}
          onBack={() => setScreen("main")}
          onReset={resetAll}
          version={version}
        />
      </PopupFrame>
    )
  }

  // ─── Off-site ────────────────────────────────────────────────────────────
  if (!onYouTube) {
    return (
      <PopupFrame theme={resolved}>
        <Header onTheme={toggleTheme} subtitle={subtitle} />
        <OffsiteState
          flags={settings.flags}
          onOpen={() => openExternal("https://www.youtube.com")}
        />
        <FooterPro
          onSettings={() => setScreen("settings")}
          onLink={(id) => openExternal(LINK_URLS[id])}
        />
      </PopupFrame>
    )
  }

  // ─── Paused on this site ─────────────────────────────────────────────────
  if (!settings.master) {
    return (
      <PopupFrame theme={resolved}>
        <Header
          master={false}
          onMaster={toggleMaster}
          onTheme={toggleTheme}
          subtitle={subtitle}
        />
        <PausedState host={activeHost ?? "this site"} onResume={toggleMaster} />
        <FooterPro
          onSettings={() => setScreen("settings")}
          onLink={(id) => openExternal(LINK_URLS[id])}
        />
      </PopupFrame>
    )
  }

  // ─── Default (main) ──────────────────────────────────────────────────────
  return (
    <PopupFrame theme={resolved}>
      <Header
        master={settings.master}
        onMaster={toggleMaster}
        onTheme={toggleTheme}
        subtitle={subtitle}
      />
      <MeterBar on={on} total={total} />
      <GroupList
        flags={settings.flags}
        onToggle={toggleFeature}
        onToggleMany={toggleMany}
      />
      <FooterPro
        onSettings={() => setScreen("settings")}
        onLink={(id) => openExternal(LINK_URLS[id])}
      />
    </PopupFrame>
  )
}
