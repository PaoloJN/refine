import { useEffect, useState } from "react"

import type { Settings, ThemePref } from "../lib/settings"

import { Ico } from "./icons"

const THEME_OPTIONS: { value: ThemePref; label: string }[] = [
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" }
]

type ShortcutInfo = { name: string; description: string; shortcut: string }

export function SettingsScreen({
  settings,
  onPatch,
  onBack,
  onReset,
  version
}: {
  settings: Settings
  onPatch: (patch: (prev: Settings) => Settings) => void
  onBack: () => void
  onReset: () => void
  version: string
}) {
  const [shortcuts, setShortcuts] = useState<ShortcutInfo[]>([])

  useEffect(() => {
    const c =
      typeof globalThis !== "undefined"
        ? (globalThis as { chrome?: { commands?: { getAll?: (cb: (cmds: { name?: string; description?: string; shortcut?: string }[]) => void) => void } } }).chrome
        : undefined
    c?.commands?.getAll?.((cmds) => {
      setShortcuts(
        (cmds ?? []).map((c) => ({
          name: c.name ?? "",
          description: c.description || (c.name === "_execute_action" ? "Open Refine" : ""),
          shortcut: c.shortcut ?? ""
        }))
      )
    })
  }, [])

  const setTheme = (t: ThemePref) => onPatch((prev) => ({ ...prev, theme: t }))

  return (
    <>
      <div className="rf-subhead">
        <button onClick={onBack} className="rf-icon-btn rf-icon-btn--sm" title="Back">
          <Ico name="caret-left" size={16} />
        </button>
        <span className="rf-subhead__title">Settings</span>
      </div>

      <div className="rf-settings-list">
        {/* Theme picker — 3-segment control. */}
        <div className="rf-setting-block">
          <div className="rf-setting-block__head">
            <span className="rf-row__icon">
              <Ico name="circle-half" size={16} />
            </span>
            <span className="rf-setting-block__label">Theme</span>
          </div>
          <div className="rf-segments">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`rf-segment ${settings.theme === opt.value ? "rf-segment--active" : ""}`}
                onClick={() => setTheme(opt.value)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rf-divider" />

        {/* Shortcuts — read live from chrome.commands. */}
        <div className="rf-setting-block">
          <div className="rf-setting-block__head">
            <span className="rf-row__icon">
              <Ico name="keyboard" size={16} />
            </span>
            <span className="rf-setting-block__label">Keyboard shortcuts</span>
          </div>
          <div className="rf-shortcuts">
            {shortcuts.length === 0 && (
              <div className="rf-shortcuts__empty">No commands registered.</div>
            )}
            {shortcuts.map((s) => (
              <div key={s.name} className="rf-shortcuts__row">
                <span className="rf-shortcuts__label">{s.description}</span>
                {s.shortcut ? (
                  <kbd className="rf-kbd">{formatShortcut(s.shortcut)}</kbd>
                ) : (
                  <span className="rf-shortcuts__none">Not set</span>
                )}
              </div>
            ))}
          </div>
          <button
            className="rf-text-btn rf-shortcuts__edit"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open("chrome://extensions/shortcuts", "_blank", "noopener,noreferrer")
              }
            }}>
            Customize →
          </button>
        </div>
      </div>

      <div className="rf-settings-foot">
        <span className="rf-version">v{version}</span>
        <button className="rf-text-btn" onClick={onReset}>
          Reset all
        </button>
      </div>
    </>
  )
}

// "Alt+Shift+U" → "⌥⇧U" on mac, kept as-is elsewhere.
function formatShortcut(raw: string): string {
  const isMac =
    typeof navigator !== "undefined" &&
    /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent)
  if (!isMac) return raw
  return raw
    .replace(/MacCtrl/g, "⌃")
    .replace(/Command/g, "⌘")
    .replace(/Ctrl/g, "⌃")
    .replace(/Alt/g, "⌥")
    .replace(/Shift/g, "⇧")
    .replace(/\+/g, "")
}
