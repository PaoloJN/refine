// Per-feature CSS rules. Each block is gated on a data attribute on <html>:
//   data-refine-<id>="hide"   → the rule applies
//   data-refine-<id>="show"   → no match, element stays visible
// All rules are also gated by data-refine-on="1" so the master toggle
// disables every rule in one flip.
//
// Selectors target YouTube's web component tags. They're broad on purpose —
// YouTube ships layout changes constantly, so a slightly-too-greedy match is
// preferable to a missed one. Anything purely textual (no semantic attribute)
// is avoided since YT localizes labels.
//
// Requires Chrome 105+ for native :has().

import type { FeatureId } from "./model"

type Rule = {
  id: FeatureId
  selectors: string[]
}

const RULES: Rule[] = [
  // ─── Home ────────────────────────────────────────────────────────────────
  {
    id: "home",
    selectors: [
      "ytd-browse[page-subtype='home'] ytd-rich-grid-renderer",
      "ytd-browse[page-subtype='home'] ytd-feed-filter-chip-bar-renderer"
    ]
  },
  {
    id: "shorts",
    selectors: [
      "ytd-rich-shelf-renderer[is-shorts]",
      "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
      "ytd-reel-shelf-renderer",
      "grid-shelf-view-model:has(a[href*='/shorts/'])",
      "ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model)",
      "ytd-rich-item-renderer:has([overlay-style='SHORTS'])",
      "ytd-video-renderer:has(a[href*='/shorts/'])",
      "ytd-grid-video-renderer:has(a[href*='/shorts/'])",
      "ytd-guide-entry-renderer:has(a[title='Shorts'])",
      "ytd-mini-guide-entry-renderer[aria-label='Shorts']",
      "ytd-pivot-bar-item-renderer:has(a[href='/shorts'])",
      "tp-yt-paper-tab:has(a[href='/shorts'])",
      "ytd-shorts"
    ]
  },
  {
    id: "mixes",
    // Auto-generated playlists / "Mix" rows. RDMM is the canonical Mix
    // playlist prefix; start_radio=1 is the watch-page radio trigger.
    selectors: [
      "ytd-rich-item-renderer:has(a[href*='list=RDMM'])",
      "ytd-rich-item-renderer:has(a[href*='start_radio=1'])",
      "ytd-radio-renderer",
      "ytd-compact-radio-renderer",
      "ytd-shelf-renderer:has(a[href*='list=RDMM'])",
      "yt-lockup-view-model:has(a[href*='list=RDMM'])"
    ]
  },
  {
    id: "trending",
    selectors: [
      "ytd-guide-entry-renderer:has(a[title='Trending'])",
      "ytd-guide-entry-renderer:has(a[title='Explore'])",
      "ytd-mini-guide-entry-renderer[aria-label='Explore']",
      "ytd-browse[page-subtype='trending']",
      "ytd-browse[page-subtype='explore']"
    ]
  },
  {
    id: "subscriptions",
    selectors: [
      "ytd-browse[page-subtype='subscriptions'] ytd-rich-grid-renderer",
      "ytd-browse[page-subtype='subscriptions'] ytd-shelf-renderer"
    ]
  },

  // ─── Watch page ──────────────────────────────────────────────────────────
  {
    id: "sidebar",
    selectors: ["ytd-watch-flexy #secondary", "ytd-watch-flexy #related"]
  },
  {
    id: "recommended",
    selectors: [
      "ytd-watch-next-secondary-results-renderer ytd-compact-video-renderer",
      "ytd-watch-next-secondary-results-renderer ytd-compact-radio-renderer",
      "ytd-watch-next-secondary-results-renderer ytd-compact-playlist-renderer",
      "ytd-watch-next-secondary-results-renderer yt-lockup-view-model",
      "ytd-watch-next-secondary-results-renderer ytd-item-section-renderer"
    ]
  },
  {
    id: "livechat",
    selectors: [
      "ytd-watch-flexy #chat",
      "ytd-watch-flexy #chat-container",
      "ytd-live-chat-frame"
    ]
  },
  {
    id: "playlist",
    selectors: ["ytd-watch-flexy #playlist", "ytd-playlist-panel-renderer"]
  },
  {
    id: "endfeed",
    selectors: [".html5-endscreen", ".ytp-endscreen-content"]
  },
  {
    id: "endcards",
    selectors: [
      ".ytp-ce-element",
      ".ytp-cards-button",
      ".ytp-cards-teaser",
      ".iv-branding",
      ".ytp-ce-covering-overlay",
      ".ytp-ce-shadow"
    ]
  },
  {
    id: "fundraiser",
    // Donation shelves + creator-fundraiser banners + panel.
    selectors: [
      "ytd-donation-shelf-renderer",
      "ytd-banner-promo-renderer-background",
      "#donation-shelf",
      "ytd-engagement-panel-section-list-renderer[target-id*='fundraiser']",
      "ytd-engagement-panel-section-list-renderer[target-id*='donation']",
      "ytd-watch-flexy [target-id*='fundraiser']"
    ]
  },
  {
    id: "merch",
    selectors: [
      "ytd-merch-shelf-renderer",
      "ytd-product-list-renderer",
      "ytd-shopping-product-card-renderer",
      "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-product-shelf']",
      "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-ads']",
      "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-clip-create']",
      "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-structured-description']:has(ytd-merch-shelf-renderer)"
    ]
  },
  {
    id: "video-info",
    // The whole metadata block under the player (title, view count, channel,
    // actions, description). The sub-toggles below target individual pieces
    // for when you want to keep some but not others.
    selectors: ["ytd-watch-flexy ytd-watch-metadata"]
  },
  {
    id: "buttons-bar",
    // Like/Dislike/Share/Save/Clip row + the overflow menu.
    selectors: [
      "ytd-watch-metadata #actions",
      "ytd-watch-metadata ytd-menu-renderer",
      "ytd-watch-metadata #top-row #actions"
    ]
  },
  {
    id: "channel",
    // Channel avatar + name + subscribe button row.
    selectors: [
      "ytd-watch-metadata ytd-video-owner-renderer",
      "ytd-watch-metadata #owner",
      "ytd-watch-metadata #subscribe-button"
    ]
  },
  {
    id: "description",
    selectors: [
      "ytd-watch-metadata #description",
      "ytd-watch-metadata #description-inline-expander",
      "ytd-text-inline-expander#description-inline-expander"
    ]
  },
  {
    id: "annotations",
    // Legacy player annotations + cards container. Deprecated since 2019
    // but the surfaces still exist and creators still drop cards.
    selectors: [
      ".ytp-iv-video-content",
      ".iv-click-target",
      ".annotation",
      ".annotation-iv",
      ".ytp-iv-player-content"
    ]
  },
  // `autoplay` is JS-driven (no CSS) — handled by the content script.

  // ─── Comments ────────────────────────────────────────────────────────────
  {
    id: "comments",
    selectors: ["ytd-watch-flexy #comments", "ytd-comments#comments"]
  },
  {
    id: "avatars",
    selectors: [
      "ytd-comment-renderer #author-thumbnail",
      "ytd-comment-view-model #author-thumbnail",
      "ytd-comment-renderer img.yt-img-shadow",
      "ytd-comment-view-model #author-thumbnail-container"
    ]
  },

  // ─── Chrome (the YT shell) ──────────────────────────────────────────────
  {
    id: "notifications",
    selectors: [
      "ytd-masthead ytd-notification-topbar-button-renderer",
      "ytd-notification-topbar-button-renderer"
    ]
  },
  {
    id: "search-suggest",
    selectors: [
      ".ytSearchboxComponentSuggestionsContainer",
      "ytd-search-suggestion-renderer",
      "#sbtc tbody.sbsb_a",
      "tp-yt-paper-listbox#search-suggestions"
    ]
  },
  {
    id: "inapt-search",
    // Off-topic shelves and panels in search results — "People also watched",
    // "From related searches", "Latest from", news shelves, reel shelves.
    // Keeps the actual video results visible.
    selectors: [
      "ytd-search ytd-shelf-renderer",
      "ytd-search ytd-horizontal-card-list-renderer",
      "ytd-search ytd-secondary-search-container-renderer",
      "ytd-search ytd-reel-shelf-renderer",
      "ytd-search ytd-universal-watch-card-renderer"
    ]
  },
  {
    id: "more-yt",
    // The "More from YouTube" section in the sidebar guide (YT Music, Kids,
    // Premium, Studio, TV). Detected by anchor href since the heading is
    // localized.
    selectors: [
      "ytd-guide-section-renderer:has(a[href*='music.youtube.com'])",
      "ytd-guide-section-renderer:has(a[href*='kids.youtube.com'])",
      "ytd-guide-section-renderer:has(a[href*='youtube.com/premium'])",
      "ytd-guide-section-renderer:has(a[href*='youtube.com/creators'])",
      "ytd-guide-section-renderer:has(a[href*='studio.youtube.com'])",
      "ytd-guide-section-renderer:has(a[href*='tv.youtube.com'])"
    ]
  },
  {
    id: "top-header",
    selectors: ["ytd-masthead", "#masthead-container"]
  }
]

// Build one stylesheet. Each rule becomes:
//   html[data-refine-on="1"][data-refine-<id>="hide"] selector, … { display: none !important }
export function buildStylesheet(): string {
  const blocks = RULES.map((r) => {
    const prefix = `html[data-refine-on="1"][data-refine-${r.id}="hide"]`
    const selectors = r.selectors.map((s) => `${prefix} ${s}`).join(",\n")
    return `${selectors} { display: none !important; }`
  })
  // Cleanup: when the sidebar is hidden the player column stays pinned to
  // the left and leaves a giant void. Center it.
  blocks.push(
    `html[data-refine-on="1"][data-refine-sidebar="hide"] ytd-watch-flexy[is-two-columns_] #primary.ytd-watch-flexy { max-width: none !important; margin: 0 auto !important; }`
  )
  // Cleanup: collapse empty section wrappers after shorts/mixes are removed.
  blocks.push(
    `html[data-refine-on="1"][data-refine-shorts="hide"] ytd-rich-section-renderer:empty,
     html[data-refine-on="1"][data-refine-mixes="hide"] ytd-rich-section-renderer:empty { display: none !important; }`
  )
  // Always-on: promotional surfaces no user has ever wanted. Gated only on
  // the master toggle so flipping Refine off restores everything.
  blocks.push(
    `html[data-refine-on="1"] ytd-mealbar-promo-renderer[dialog],
     html[data-refine-on="1"] ytd-primetime-promo-renderer,
     html[data-refine-on="1"] ytd-popup-container ytd-single-option-survey-renderer[dialog],
     html[data-refine-on="1"] yt-mealbar-promo-renderer,
     html[data-refine-on="1"] ytd-statement-banner-renderer { display: none !important; }`
  )
  return blocks.join("\n\n")
}

export const HOME_REDIRECT_TARGET = "/feed/subscriptions"
export const HOME_PATHS = new Set(["/", ""])
