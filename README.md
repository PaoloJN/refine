<p align="center">
  <img src="assets/logo-readme.svg" alt="Refine logo" width="120" />
</p>

<h1 align="center">Refine</h1>

<p align="center">
  A Chrome extension that hides YouTube distractions — shorts, recommendations, comments, end screens, merch shelves, the lot.
</p>

<p align="center">
  <a href="#features">Features</a>
  &middot;
  <a href="#how-it-works">How it works</a>
  &middot;
  <a href="#running-locally">Running locally</a>
  &middot;
  <a href="PRIVACY.md">Privacy</a>
</p>

---

Open YouTube and Refine wipes the noise before the page paints. Per-element control over what gets hidden, a per-site pause toggle, dark/light themes, and a network-layer redirect that bounces you off `/feed/trending` before it loads. No accounts, no telemetry, no third-party requests.

## Features

**Hide on the home page**

- Home feed (with optional redirect to Subscriptions)
- Shorts (shelf, tab, reel grid, sidebar entry, the `/shorts/` player surface)
- Mixes
- Trending & Explore
- Subscriptions feed

**Hide on the watch page**

- Video sidebar (recommended, live chat, playlist as sub-toggles)
- End-screen feed and end-screen cards
- Fundraiser shelves
- Merch, tickets, offers
- Video info (with buttons-bar, channel, description as sub-toggles)
- Disable autoplay (via the player's own API)
- Disable annotations

**Hide on the YouTube shell**

- Comments (with profile-photos sub-toggle)
- Notifications
- Search suggestions
- Off-topic search shelves
- "More from YouTube" section
- Top header

**Popup UX**

- One switch per element, grouped into four sections
- Group-level switch in each section header — one tap hides everything in Watch page, or Comments, or whatever
- Indeterminate switch state when a group is partially on
- Status dot beside the domain — green = active, gray = paused on this site
- Live "elements hidden" meter
- Keyboard shortcut to pause Refine on the current site
- Theme picker (system / dark / light)

## How it works

Settings live in `chrome.storage.local`. The content script runs at `document_start` and mirrors them as `data-refine-*` attributes on `<html>` **before** YouTube paints. A single static stylesheet uses those attributes as gates:

```css
html[data-refine-on="1"][data-refine-shorts="hide"]
  ytd-rich-shelf-renderer[is-shorts] { display: none !important; }
```

A per-origin `localStorage` cache makes the first paint synchronous — no flash on repeat visits. SPA navigation, the network-layer redirects, and the autoplay disable are handled by a service worker and a page-world script. No DOM polling, no per-frame work.

## Tech stack

![Plasmo](https://img.shields.io/badge/Plasmo-0.89-7B5CFF?logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Phosphor Icons](https://img.shields.io/badge/Phosphor-Icons-1B1F3B?logo=phosphor&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?logo=shadcnui&logoColor=white)

## Running locally

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/PaoloJN/refine.git
cd refine
bun install
bun run dev
```

Then in Chrome: `chrome://extensions` → enable **Developer mode** → **Load unpacked** → pick `build/chrome-mv3-dev/`.

To run the marketing site:

```bash
cd www
bun install
bun run dev          # http://localhost:3000
```

## Scripts

```bash
bun run dev          # plasmo dev — hot-reloading extension build
bun run build        # production build to build/chrome-mv3-prod/
bun run package      # build + zip for Chrome Web Store upload
```

## Deploy the marketing site

1. Import the repo at <https://vercel.com/new>
2. In **Project Settings → General**, set **Root Directory** to `www`
3. Framework auto-detects as **Next.js**; build/install commands stay at defaults
4. Deploy

After the first deploy, update the `SITE` constant in `www/src/app/sitemap.ts` and the `sitemap` URL in `www/src/app/robots.ts` if your real domain differs from the placeholder.

## Repo layout

```
.                        # Plasmo Chrome extension (root)
├── src/
│   ├── popup.tsx              # action popup entry
│   ├── popup.css              # design tokens + popup styles
│   ├── background.ts          # service worker — DNR redirects, hotkey
│   ├── contents/
│   │   ├── youtube.ts         # document_start — attrs + stylesheet + logo rewrite
│   │   └── youtube-page-world.ts   # page-world — calls player.setAutonavState
│   ├── components/            # popup UI primitives
│   └── lib/                   # model, settings, theme, css generator
├── assets/                    # icon.png (Plasmo derives all sizes), logo.svg
├── www/                       # Next.js 16 marketing site (App Router)
├── PRIVACY.md
└── LICENSE
```

## Credits

The hiding pattern (data attributes on `<html>` + a single attribute-gated stylesheet) is a well-trodden approach popularised by [Unhook](https://chromewebstore.google.com/detail/unhook-remove-youtube-rec/khncfooichmfjbepaaaebmommgaepoid). The selectors and code here are independently written. The popup UI was designed in [Claude Design](https://claude.ai/design) and built on Plasmo.

## License

MIT — see [LICENSE](./LICENSE).
