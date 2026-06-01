// Page-world content script. Runs in YouTube's JavaScript context so it can
// reach `window` globals and the player's public API directly.
//
// The isolated-world script (`youtube.ts`) dispatches CustomEvents on the
// shared `window`; this script listens and acts on them. We use this only
// for things the isolated world can't do cleanly:
//
//   - Calling `movie_player.setAutonavState(1)` to flip autoplay off via
//     YT's own API — no DOM polling, no fake button clicks.
//
// Anything achievable from CSS or the isolated world stays out of here so
// the page-world surface stays minimal.

import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"],
  run_at: "document_idle",
  all_frames: false,
  world: "MAIN"
}

type YtPlayer = HTMLElement & {
  setAutonavState?: (state: number) => void
  // State constants (from leaked YT player source):
  //   0 = ENABLED  (default)
  //   1 = DISABLED
}

function findPlayer(): YtPlayer | null {
  const byId = document.getElementById("movie_player") as YtPlayer | null
  if (byId?.setAutonavState) return byId
  // Fallback: the watch page wraps the player in .html5-video-player too.
  const byClass = document.querySelector<YtPlayer>(".html5-video-player")
  return byClass?.setAutonavState ? byClass : null
}

function disableAutoplay() {
  const player = findPlayer()
  if (player?.setAutonavState) {
    try {
      player.setAutonavState(1)
      return true
    } catch {
      // fall through to retry
    }
  }
  return false
}

function disableAutoplayWithRetry() {
  if (disableAutoplay()) return
  // Player not ready yet — observe the DOM for it to appear, give up after
  // ~10s to avoid leaking observers across navigations.
  const start = Date.now()
  const obs = new MutationObserver(() => {
    if (disableAutoplay() || Date.now() - start > 10_000) obs.disconnect()
  })
  obs.observe(document.documentElement, { childList: true, subtree: true })
}

window.addEventListener("refine:disable-autoplay", disableAutoplayWithRetry)

// Also flip whenever YT navigates internally — a fresh watch page resets
// autoplay state — but ONLY if the feature is actually on. The isolated
// world writes data-refine-on / data-refine-autoplay on <html>; those
// attributes are shared between worlds because the DOM is shared. We gate
// on them so users who never enabled the feature don't get autoplay
// silently disabled on every navigation.
function autoplayShouldBeOff(): boolean {
  const root = document.documentElement
  return (
    root.getAttribute("data-refine-on") === "1" &&
    root.getAttribute("data-refine-autoplay") === "hide"
  )
}

window.addEventListener("yt-navigate-finish", () => {
  if (!autoplayShouldBeOff()) return
  disableAutoplayWithRetry()
})
