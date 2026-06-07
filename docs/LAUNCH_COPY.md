# Launch copy — Refine v1.0

Drafts for the YouTube demo upload and a Twitter/X announcement. Pick, tweak, or A/B.

---

## YouTube — title options

Pick whichever feels truest. The middle one is probably the best mix of clear + clickable.

1. **`I made a Chrome extension that hides every YouTube distraction`**
2. **`Refine — a small Chrome extension to make YouTube quiet (open source)`**
3. **`Hiding everything I don't want on YouTube — Shorts, comments, recommendations`**

## YouTube — description

```
Refine is a small Chrome extension I built to hide every distraction on YouTube — Shorts, the homepage feed, recommendations in the sidebar, comments, end screens, merch shelves, the Trending tab, even the top header. One switch per element, grouped into four sections, with a per-site pause toggle.

It's free, open source, no accounts, no telemetry — your settings live in your browser's local storage and nowhere else.

→ Install: https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg
→ Source: https://github.com/PaoloJN/refine
→ Site: https://refine-yt.vercel.app

What you can hide:
• Shorts (shelf, tab, reel grid, sidebar entry, the /shorts/ player)
• Home feed (with optional redirect to Subscriptions)
• Sidebar recommendations
• Live chat, playlist panel, end-screen feed, end-screen cards
• Comments (and profile photos, separately)
• Trending & Explore, "More from YouTube", search-result clutter
• Merch shelves, fundraiser banners
• Autoplay (via YouTube's own player API)
• The top header itself

How it works: Refine writes the hide state as data attributes on <html> before YouTube paints, then a single static stylesheet uses those attributes as gates. No flicker, no flash of the thing you came to hide. SPA navigation and the network-layer redirects are handled by a service worker. About 150 KB packed, MV3.

MIT licensed. Built with Plasmo, React, and the Phosphor icon set. PRs welcome — selectors break when YouTube ships layout changes and fixes are usually one line.

#chromeextension #youtube #productivity #opensource
```

## YouTube — tags (paste comma-separated)

```
chrome extension, youtube extension, hide youtube shorts, distraction free youtube, youtube focus, productivity extension, browser extension, open source, plasmo, manifest v3, react chrome extension, hide recommendations, hide comments, youtube hider, focus tools
```

## YouTube — pinned first comment (optional)

```
Free + open source: https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg

Source on GitHub if you want to fork it or open an issue when a selector breaks: https://github.com/PaoloJN/refine
```

---

## Twitter / X — personal, not an ad

The "got tired of shorts → made a thing" arc. Pick whichever lands closest. All under 280 chars.

### V1 — the shortest

```
got tired of youtube shorts hijacking my attention so i made a chrome extension that just turns them off. and the homepage feed. and recommendations. and comments. one switch each.

free + open source
https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg
```

### V2 — vibier

```
got really tired of youtube shorts so i did this

a chrome extension that just turns them off. and the homepage, the sidebar recs, comments, end screens. one toggle each. free, open source, no tracking.

https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg
```

### V3 — confessional

```
spent way too long doomscrolling shorts. made a chrome extension this weekend that just hides everything i don't want — shorts, the homepage feed, recs, comments. free, open source, no accounts.

https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg
```

## Twitter / X — thread version (if you want to add detail in replies)

**Tweet 1** (main):
```
vibe coded a small chrome extension to make youtube usable again — refine. flip off shorts, the home feed, sidebar recs, comments, end screens. one toggle per element. free, open source, no tracking.

https://chromewebstore.google.com/detail/refine-%E2%80%94-hide-youtube-dis/pmogecbmdkdmhokijcpjcldjlgebaecg
```

**Tweet 2** (reply, "how it works"):
```
settings get written as data-attrs on <html> before youtube paints, then one static stylesheet hides whatever's flipped on. zero flicker, no DOM polling. autoplay disable calls youtube's own player API. ~150 KB packed.
```

**Tweet 3** (reply, "open source"):
```
MIT. selectors break every couple months when youtube ships a layout change — PRs welcome.

source: https://github.com/PaoloJN/refine
```

---

## Reddit (optional — r/chrome, r/youtube, r/sideproject, r/opensource)

**Title:** `I built a Chrome extension that hides every YouTube distraction — Refine (open source, no telemetry)`

**Body:**
```
I got tired of YouTube's home feed eating my afternoons, so I made Refine — a Chrome extension that gives you one toggle per distraction. Hide Shorts (shelf, tab, sidebar, everything), recommendations, comments, end screens, the trending tab, merch shelves, even the top header. Per-site pause when you want to scroll. Group-level switches if you want to nuke a whole category in one tap.

It runs entirely client-side — no accounts, no telemetry, no servers. Settings live in chrome.storage.local. The hiding is done via CSS rules gated on data-attributes set on <html> before the page paints, so there's no flash of the thing you came to hide.

Free + MIT on GitHub. Selectors will break when YouTube ships layout changes — PRs welcome.

Install: <CWS link>
Source: <GitHub link>
Site: <Vercel link>
```

---

## Show HN (if you ever want to)

**Title:** `Show HN: Refine – Chrome extension to hide every YouTube distraction (MV3, open source)`

**Body:** roughly the Reddit text above, but mention the architecture choices early (Plasmo + MV3 + the attribute-gated CSS pattern + page-world script for the player API) because the HN crowd cares about how, not just what.
