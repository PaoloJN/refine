import { useEffect, useState } from "react"

import { GroupList } from "~components/group-list"
import { OffsiteState } from "~components/offsite-state"
import { PausedState } from "~components/paused-state"
import { FooterPro, Header, MeterBar, PopupFrame } from "~components/popup-frame"
import { SettingsScreen } from "~components/settings-screen"
import { countHidden, defaultFlags, type FeatureId } from "~lib/model"
import { DEFAULTS, useSettings } from "~lib/settings"
import { useResolvedTheme } from "~lib/theme"

import "./popup.css"

type Screen = "main" | "settings"

const LINK_URLS = {
  donate: "https://github.com/sponsors",
  request: "https://github.com",
  support: "https://github.com"
} as const

export default function Popup() {
  const [settings, setSettings] = useSettings()
  const [screen, setScreen] = useState<Screen>("main")
  const [activeHost, setActiveHost] = useState<string | null>(null)
  const resolved = useResolvedTheme(settings.theme)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      try {
        if (tab?.url) setActiveHost(new URL(tab.url).hostname)
      } catch {
        setActiveHost(null)
      }
    })
  }, [])

  const onYouTube =
    !!activeHost && (activeHost === "www.youtube.com" || activeHost === "m.youtube.com" || activeHost === "youtube.com")
  const subtitle = activeHost ?? "—"
  const { on, total } = countHidden(settings.flags)
  const version = chrome.runtime?.getManifest?.()?.version ?? "0.1.0"

  // All mutations go through the functional updater so rapid clicks serialize
  // through the storage layer instead of clobbering each other via stale
  // closures over `settings`.
  const toggleFeature = (id: FeatureId) =>
    setSettings((prev) => ({
      ...prev,
      flags: { ...prev.flags, [id]: !prev.flags[id] }
    }))

  // Bulk-toggle every flag in `ids` to the same `next` value. Used by
  // group-level switches in the section headers.
  const toggleMany = (ids: FeatureId[], next: boolean) =>
    setSettings((prev) => {
      const flags = { ...prev.flags }
      for (const id of ids) flags[id] = next
      return { ...prev, flags }
    })

  const toggleMaster = () => setSettings((prev) => ({ ...prev, master: !prev.master }))

  const toggleTheme = () =>
    setSettings((prev) => ({
      ...prev,
      // System → dark → light → system. Predictable cycle.
      theme: prev.theme === "system" ? "dark" : prev.theme === "dark" ? "light" : "system"
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
          onOpen={() => chrome.tabs.create({ url: "https://www.youtube.com" })}
        />
        <FooterPro onSettings={() => setScreen("settings")} onLink={(id) => chrome.tabs.create({ url: LINK_URLS[id] })} />
      </PopupFrame>
    )
  }

  // ─── Paused on this site ─────────────────────────────────────────────────
  if (!settings.master) {
    return (
      <PopupFrame theme={resolved}>
        <Header master={false} onMaster={toggleMaster} onTheme={toggleTheme} subtitle={subtitle} />
        <PausedState host={activeHost ?? "this site"} onResume={toggleMaster} />
        <FooterPro onSettings={() => setScreen("settings")} onLink={(id) => chrome.tabs.create({ url: LINK_URLS[id] })} />
      </PopupFrame>
    )
  }

  // ─── Default (main) ──────────────────────────────────────────────────────
  return (
    <PopupFrame theme={resolved}>
      <Header master={settings.master} onMaster={toggleMaster} onTheme={toggleTheme} subtitle={subtitle} />
      <MeterBar on={on} total={total} />
      <GroupList flags={settings.flags} onToggle={toggleFeature} onToggleMany={toggleMany} />
      <FooterPro onSettings={() => setScreen("settings")} onLink={(id) => chrome.tabs.create({ url: LINK_URLS[id] })} />
    </PopupFrame>
  )
}
