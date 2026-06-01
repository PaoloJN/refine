// Service worker. Three jobs:
//   1. Hotkey: Alt+Shift+P → toggle master.
//   2. Network-layer redirects via declarativeNetRequest. Fires before YT
//      starts loading — no flash, no client-side bounce.
//   3. Keep DNR rule updates serialized so concurrent storage writes don't
//      install stale rules.

import { getSettings, KEY, updateSettings, type Settings } from "~lib/settings"

export {}

// ─── Hotkey ──────────────────────────────────────────────────────────────

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-master") return
  await updateSettings((s) => ({ ...s, master: !s.master }))
})

// ─── Redirect rules ──────────────────────────────────────────────────────

const RULE_TRENDING = 1
const RULE_EXPLORE = 2
const RULE_HOME_TO_SUBS = 3
const ALL_RULE_IDS = [RULE_TRENDING, RULE_EXPLORE, RULE_HOME_TO_SUBS]

const YT_HOME = "https://www.youtube.com/"
const YT_SUBS = "https://www.youtube.com/feed/subscriptions"

function buildRules(s: Settings): chrome.declarativeNetRequest.Rule[] {
  if (!s.master) return []
  const rules: chrome.declarativeNetRequest.Rule[] = []

  if (s.flags.trending) {
    rules.push({
      id: RULE_TRENDING,
      priority: 1,
      action: { type: "redirect", redirect: { url: YT_HOME } },
      condition: {
        urlFilter: "||youtube.com/feed/trending",
        resourceTypes: ["main_frame"]
      }
    })
    rules.push({
      id: RULE_EXPLORE,
      priority: 1,
      action: { type: "redirect", redirect: { url: YT_HOME } },
      condition: {
        urlFilter: "||youtube.com/feed/explore",
        resourceTypes: ["main_frame"]
      }
    })
  }

  if (s.flags.home && s.flags["redirect-home"] && !s.flags.subscriptions) {
    rules.push({
      id: RULE_HOME_TO_SUBS,
      priority: 1,
      action: { type: "redirect", redirect: { url: YT_SUBS } },
      condition: {
        regexFilter: "^https://www\\.youtube\\.com/(\\?.*)?$",
        resourceTypes: ["main_frame"]
      }
    })
  }

  return rules
}

let dnrChain: Promise<void> = Promise.resolve()
function syncRedirectRules(): Promise<void> {
  dnrChain = dnrChain.then(async () => {
    const s = await getSettings()
    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ALL_RULE_IDS,
        addRules: buildRules(s)
      })
    } catch (e) {
      console.warn("[refine] DNR update failed:", e)
    }
  })
  return dnrChain
}

// ─── Wiring ──────────────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(() => {
  syncRedirectRules()
})
chrome.runtime.onStartup.addListener(() => {
  syncRedirectRules()
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return
  if (!changes[KEY]) return
  syncRedirectRules()
})

syncRedirectRules()
