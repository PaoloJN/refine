// Isolated-world content script, runs at document_start. Jobs:
//   1. Inject the stylesheet (static).
//   2. Set data-refine-* attributes on <html> from stored settings before
//      YouTube paints. The CSS rules are gated on these attrs, so the
//      element never flashes into view.
//        → To avoid the storage.local round-trip latency on every page load
//          (which leaves a brief window where DEFAULTS apply instead of the
//          user's actual settings), we also cache the last-known settings in
//          per-origin localStorage. That read IS synchronous, so the first
//          paint already reflects the user's state.
//   3. Rewrite the YT logo's href + trap clicks when "redirect to subs" is
//      on, so SPA navigation also bounces.
//   4. Strip the "(N) " unread-notifications prefix from <title>.
//   5. Tell the page-world script to disable autoplay when on.

import type { PlasmoCSConfig } from "plasmo"

import { ALL_IDS, type FeatureId } from "~lib/model"
import { DEFAULTS, type Settings } from "~lib/settings"
import { buildStylesheet, HOME_REDIRECT_TARGET } from "~lib/youtube-css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"],
  run_at: "document_start",
  all_frames: false
}

const STORAGE_KEY = "refine:settings"
const LOCAL_CACHE_KEY = "refine:settings:cache"
const STYLE_ID = "refine-stylesheet"

let current: Settings = DEFAULTS

// ─── Attribute mirroring ─────────────────────────────────────────────────

function applyAttrs(s: Settings) {
  const root = document.documentElement
  if (!root) return
  root.setAttribute("data-refine-on", s.master ? "1" : "0")
  ALL_IDS.forEach((id: FeatureId) => {
    root.setAttribute(`data-refine-${id}`, s.flags[id] ? "hide" : "show")
  })
}

function ensureStylesheet() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = buildStylesheet()
  ;(document.head || document.documentElement).appendChild(style)
}

function parseStored(raw: unknown): Partial<Settings> | undefined {
  if (!raw) return undefined
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Partial<Settings>
    } catch {
      return undefined
    }
  }
  if (typeof raw === "object") return raw as Partial<Settings>
  return undefined
}

function reconcile(raw: unknown): Settings {
  const parsed = parseStored(raw)
  if (!parsed) return DEFAULTS
  return {
    master: parsed.master ?? DEFAULTS.master,
    flags: { ...DEFAULTS.flags, ...(parsed.flags ?? {}) } as Settings["flags"],
    theme: parsed.theme ?? DEFAULTS.theme
  }
}

// ─── Synchronous boot cache ──────────────────────────────────────────────

function readLocalCache(): Settings | null {
  try {
    const raw = window.localStorage.getItem(LOCAL_CACHE_KEY)
    if (!raw) return null
    return reconcile(JSON.parse(raw))
  } catch {
    return null
  }
}

function writeLocalCache(s: Settings) {
  try {
    window.localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(s))
  } catch {
    // Quota or disabled storage — not fatal; we'll re-try on the next change.
  }
}

// ─── Logo href rewrite (SPA-side home redirect) ──────────────────────────

let logoEl: HTMLAnchorElement | null = null
let logoClick: ((e: Event) => void) | null = null
let logoObserver: MutationObserver | null = null

function shouldRewriteLogo(s: Settings) {
  return (
    s.master && s.flags.home && s.flags["redirect-home"] && !s.flags.subscriptions
  )
}

function trapEvent(e: Event) {
  e.stopImmediatePropagation()
}

function attachLogo() {
  const el = document.querySelector<HTMLAnchorElement>("a#logo")
  if (!el) return
  if (el === logoEl) return
  // YT replaced the element (sign-in, channel swap). Tear down the old one
  // first so we don't leak observers / listeners on a detached node.
  detachLogo()
  logoEl = el
  if (logoEl.getAttribute("href") !== HOME_REDIRECT_TARGET) {
    logoEl.setAttribute("href", HOME_REDIRECT_TARGET)
  }
  logoClick = trapEvent
  logoEl.addEventListener("click", logoClick, true)
  logoEl.addEventListener("touchend", logoClick, true)
  logoObserver = new MutationObserver(() => {
    if (logoEl && logoEl.getAttribute("href") !== HOME_REDIRECT_TARGET) {
      logoEl.setAttribute("href", HOME_REDIRECT_TARGET)
    }
  })
  logoObserver.observe(logoEl, { attributes: true, attributeFilter: ["href"] })
}

function detachLogo() {
  // Disconnect BEFORE mutating href — otherwise the observer is still live
  // and can re-rewrite the href back to HOME_REDIRECT_TARGET in the same
  // microtask. Disconnect drops queued records.
  logoObserver?.disconnect()
  logoObserver = null
  if (logoEl && logoClick) {
    logoEl.removeEventListener("click", logoClick, true)
    logoEl.removeEventListener("touchend", logoClick, true)
    if (logoEl.getAttribute("href") === HOME_REDIRECT_TARGET) {
      logoEl.setAttribute("href", "/")
    }
  }
  logoEl = null
  logoClick = null
}

function syncLogo(s: Settings) {
  if (shouldRewriteLogo(s)) attachLogo()
  else detachLogo()
}

// ─── Title prefix strip ───────────────────────────────────────────────────

let titleObserver: MutationObserver | null = null
const TITLE_PREFIX_RE = /^\(\d+\)\s*/

function stripTitleOnce() {
  const t = document.title
  const next = t.replace(TITLE_PREFIX_RE, "")
  if (next !== t) document.title = next
}

function syncTitleStrip(s: Settings) {
  const want = s.master && s.flags.notifications
  if (want) {
    if (titleObserver) return
    stripTitleOnce()
    const titleEl = document.querySelector("title")
    if (!titleEl) return
    titleObserver = new MutationObserver(stripTitleOnce)
    titleObserver.observe(titleEl, { childList: true })
  } else {
    titleObserver?.disconnect()
    titleObserver = null
  }
}

// ─── Page-world bridge: autoplay ──────────────────────────────────────────

function pingAutoplay() {
  if (!current.master || !current.flags.autoplay) return
  window.dispatchEvent(new CustomEvent("refine:disable-autoplay"))
}

// ─── Bootstrap ────────────────────────────────────────────────────────────

ensureStylesheet()

// Use the synchronous localStorage cache for the first paint. On a tab that
// has been to YouTube before, this is exact. On a truly cold first visit, we
// fall back to DEFAULTS — same one-time cost as before.
current = readLocalCache() ?? DEFAULTS
applyAttrs(current)

// Then verify against the canonical chrome.storage.local value.
chrome.storage.local.get(STORAGE_KEY, (out) => {
  current = reconcile(out?.[STORAGE_KEY])
  applyAttrs(current)
  writeLocalCache(current)
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return
  const ch = changes[STORAGE_KEY]
  if (!ch) return
  current = reconcile(ch.newValue)
  applyAttrs(current)
  writeLocalCache(current)
  syncLogo(current)
  syncTitleStrip(current)
  pingAutoplay()
})

function runAttachments() {
  syncLogo(current)
  syncTitleStrip(current)
  pingAutoplay()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runAttachments, { once: true })
} else {
  runAttachments()
}

window.addEventListener("yt-navigate-finish", runAttachments)
