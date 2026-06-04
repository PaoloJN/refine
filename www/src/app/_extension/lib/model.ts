// Feature model — single source of truth for the popup list and the content-script
// CSS rules. Each item has a stable `id` (also used as the data attribute on
// <html>: data-refine-<id>="hide").
//
// Labels are written so an enabled switch reads naturally — "Hide Shorts"
// becomes obvious. Behavior-style toggles use their own verb ("Disable
// autoplay", "Redirect to Subscriptions"). Children are always rendered
// alongside their parent, regardless of whether the parent is on; they're
// independent CSS rules and the UI nesting is purely organizational.

export type FeatureId =
  // Home
  | "home"
  | "redirect-home"
  | "shorts"
  | "mixes"
  | "trending"
  | "subscriptions"
  // Watch page
  | "sidebar"
  | "recommended"
  | "livechat"
  | "playlist"
  | "endfeed"
  | "endcards"
  | "fundraiser"
  | "merch"
  | "video-info"
  | "buttons-bar"
  | "channel"
  | "description"
  | "autoplay"
  | "annotations"
  // Comments
  | "comments"
  | "avatars"
  // Chrome
  | "notifications"
  | "search-suggest"
  | "inapt-search"
  | "more-yt"
  | "top-header"

export type IconName =
  | "home"
  | "play-circle"
  | "list-music"
  | "trending-up"
  | "grid"
  | "panel-right"
  | "layers"
  | "heart-handshake"
  | "tag"
  | "info"
  | "rotate-cw"
  | "message-square-text"
  | "message-circle"
  | "bell"
  | "search"
  | "filter"
  | "boxes"
  | "layout"

export type FeatureItem = {
  id: FeatureId
  label: string
  icon: IconName
  defaultOn: boolean
  children?: { id: FeatureId; label: string; defaultOn: boolean }[]
}

export type FeatureGroup = {
  group: string
  items: FeatureItem[]
}

export const MODEL: FeatureGroup[] = [
  {
    group: "Home",
    items: [
      {
        id: "home",
        label: "Hide home feed",
        icon: "home",
        defaultOn: true,
        children: [
          // Behavior, not a hide — keep its own verb.
          { id: "redirect-home", label: "Redirect to subscriptions", defaultOn: false }
        ]
      },
      { id: "shorts", label: "Hide shorts", icon: "play-circle", defaultOn: true },
      { id: "mixes", label: "Hide mixes", icon: "list-music", defaultOn: false },
      { id: "trending", label: "Hide trending & explore", icon: "trending-up", defaultOn: false },
      { id: "subscriptions", label: "Hide subscriptions feed", icon: "grid", defaultOn: false }
    ]
  },
  {
    group: "Watch page",
    items: [
      {
        id: "sidebar",
        label: "Hide video sidebar",
        icon: "panel-right",
        defaultOn: true,
        children: [
          { id: "recommended", label: "Hide recommended", defaultOn: true },
          { id: "livechat", label: "Hide live chat", defaultOn: true },
          { id: "playlist", label: "Hide playlist", defaultOn: false }
        ]
      },
      { id: "endfeed", label: "Hide end-screen feed", icon: "grid", defaultOn: true },
      { id: "endcards", label: "Hide end-screen cards", icon: "layers", defaultOn: true },
      { id: "fundraiser", label: "Hide fundraiser", icon: "heart-handshake", defaultOn: false },
      { id: "merch", label: "Hide merch, tickets, offers", icon: "tag", defaultOn: true },
      {
        id: "video-info",
        label: "Hide video info",
        icon: "info",
        defaultOn: false,
        children: [
          { id: "buttons-bar", label: "Hide buttons bar", defaultOn: false },
          { id: "channel", label: "Hide channel", defaultOn: false },
          { id: "description", label: "Hide description", defaultOn: false }
        ]
      },
      // Behaviors — keep their own verbs.
      { id: "autoplay", label: "Disable autoplay", icon: "rotate-cw", defaultOn: false },
      { id: "annotations", label: "Disable annotations", icon: "message-circle", defaultOn: false }
    ]
  },
  {
    group: "Comments",
    items: [
      {
        id: "comments",
        label: "Hide comments",
        icon: "message-square-text",
        defaultOn: false,
        children: [{ id: "avatars", label: "Hide profile photos", defaultOn: true }]
      }
    ]
  },
  {
    group: "Chrome",
    items: [
      { id: "notifications", label: "Hide notifications", icon: "bell", defaultOn: false },
      { id: "search-suggest", label: "Hide search suggestions", icon: "search", defaultOn: false },
      { id: "inapt-search", label: "Hide inapt search results", icon: "filter", defaultOn: false },
      { id: "more-yt", label: "Hide “More from YouTube”", icon: "boxes", defaultOn: false },
      { id: "top-header", label: "Hide top header", icon: "layout", defaultOn: false }
    ]
  }
]

export const ALL_IDS: FeatureId[] = MODEL.flatMap((g) =>
  g.items.flatMap((it) => [it.id, ...(it.children ?? []).map((c) => c.id)])
)

export function defaultFlags(): Record<FeatureId, boolean> {
  const out = {} as Record<FeatureId, boolean>
  MODEL.forEach((g) =>
    g.items.forEach((it) => {
      out[it.id] = it.defaultOn
      it.children?.forEach((c) => {
        out[c.id] = c.defaultOn
      })
    })
  )
  return out
}

// Children that are pure behavior (no CSS rule, no hidden element) should
// not count toward the "X of Y hidden" meter. List them here.
const META_ONLY_IDS = new Set<FeatureId>(["redirect-home"])

export function countHidden(flags: Record<FeatureId, boolean>): { on: number; total: number } {
  let on = 0
  let total = 0
  MODEL.forEach((g) =>
    g.items.forEach((it) => {
      total++
      if (flags[it.id]) on++
      it.children?.forEach((c) => {
        if (META_ONLY_IDS.has(c.id)) return
        total++
        if (flags[c.id]) on++
      })
    })
  )
  return { on, total }
}
