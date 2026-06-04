# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Refine is a Chrome extension (MV3) that hides YouTube distractions — Shorts, recommendations, comments, end-screen feeds, merch shelves, the homepage feed, etc. The companion `www/` is a Next.js marketing site that links to the Chrome Web Store listing.

The design comes from a Claude Design handoff bundle that lives in `/tmp/design/refine/` while the project is being scaffolded. The chosen variant ("Compact + grouped + meter + enriched footer") lives in `refine/project/lib/chosen.jsx` of that bundle and was the source for `src/popup.tsx`, the components in `src/components/`, and the tokens in `src/popup.css`.

## Repo layout

```
.                        # Plasmo Chrome extension (root)
├── src/
│   ├── popup.tsx              # action popup entry — handles all variants
│   ├── popup.css              # design tokens + popup component styles
│   ├── background.ts          # MV3 service worker (hotkey, first-run seed)
│   ├── contents/
│   │   └── youtube.ts         # runs at document_start on youtube.com
│   ├── components/
│   │   ├── icons.tsx          # Phosphor-name → lucide-react mapping
│   │   ├── primitives.tsx     # Switch, Row, Mark, Kbd
│   │   ├── popup-frame.tsx    # PopupFrame, Header, FooterPro, MeterBar
│   │   ├── center-state.tsx   # centered icon + title + body + action
│   │   ├── group-list.tsx     # collapsible grouped feature list
│   │   └── settings-screen.tsx
│   └── lib/
│       ├── model.ts           # MODEL (groups + items + ids) — SSOT
│       ├── settings.ts        # @plasmohq/storage wrapper + React hook
│       ├── theme.ts           # system / dark / light resolver
│       └── youtube-css.ts     # per-feature CSS selectors, gated on data-attrs
├── assets/                    # icon.png (Plasmo auto-derives all sizes)
├── www/                   # Next.js 16 marketing site (see below)
└── CLAUDE.md
```

## Stack (locked)

- **Extension:** Plasmo + TypeScript + React 18, `@plasmohq/storage` for settings, `lucide-react` icons, plain CSS with design tokens
- **Website:** Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui (`style: base-nova`)
- **Package manager:** bun (pnpm/npm work as fallbacks)

Do not introduce new tech without justification. shadcn lives in the website only — the popup uses plain CSS so the build stays small and the popup ships without Tailwind's runtime cost.

## Run locally

```bash
# Extension
bun install
bun run dev                  # plasmo dev → load build/chrome-mv3-dev as unpacked

# Website
cd www
bun install
bun run dev                  # http://localhost:3000
```

## Architecture — how hiding works

Every toggle in the popup writes a `data-refine-<id>` attribute to `<html>` via `chrome.storage.local`. The content script (`src/contents/youtube.ts`) runs at `document_start`, sets those attributes from stored settings before YouTube paints, and injects one static stylesheet whose rules are gated on the attributes:

```css
html[data-refine-on="1"][data-refine-shorts="hide"] ytd-rich-shelf-renderer[is-shorts] {
  display: none !important;
}
```

When the user flips a toggle, the popup mutates storage, the content script's storage listener fires, and the attribute updates. No DOM mutation observers, no per-frame work. The master toggle (`data-refine-on="0"`) short-circuits every rule.

This pattern is borrowed from the original Unhook extension. The whole CSS sheet is built once in `lib/youtube-css.ts` from `lib/model.ts` so adding a new toggle means one entry in `MODEL` plus one rule in `RULES`.

## Popup variants

`src/popup.tsx` renders one of five states from a single component, branching on tab + settings:

| Variant   | Condition                                                       |
| --------- | --------------------------------------------------------------- |
| firstrun  | `!settings.firstRunDone` — shows preset tiles                   |
| settings  | `screen === 'settings'`                                         |
| offsite   | Active tab is not youtube.com                                   |
| paused    | On YT, `master === false`                                       |
| default   | On YT, `master === true` — shows MeterBar + GroupList           |

All variants share `PopupFrame`, `Header`, and `FooterPro` from `components/popup-frame.tsx`.

## Where things live

- **Adding a new feature toggle:** add to `MODEL` in `src/lib/model.ts` (the `FeatureId` union too), then add a `Rule` with selectors to `RULES` in `src/lib/youtube-css.ts`. The popup picks it up automatically.
- **Tweaking the look:** all popup styling is in `src/popup.css` — design tokens at the top (oklch palette from the bundle), components below, prefixed `rf-`. Website styles use Tailwind classes against the tokens in `www/src/app/globals.css`.
- **YouTube selector breakage:** updates go in `RULES` of `src/lib/youtube-css.ts`. YouTube ships layout changes constantly — slightly-greedy selectors are preferred over slightly-missed ones.

## Need a design? Use Claude Design.

When you need a new visual asset — landing page revisions, popup variants, screenshot mocks, OG images, anything where seeing-before-building is faster than guess-and-iterate — invoke the `claude-design` skill (for UI/page layouts) or `claude-design-graphic` skill (for one-off assets like logos, OG images, CWS screenshots). Both work by writing a precise brief and handing off to Claude Design (claude.ai/design); Claude Code can't open Claude Design directly. After the user runs the brief, save the output back into this repo (popup goes to `src/`, marketing assets go to `www/public/` or `assets/cws/`).

The original Refine design bundle exported from Claude Design lives at `/tmp/design/refine/` during initial scaffolding — read `refine/project/Unhook States.html` and `refine/project/lib/chosen.jsx` if you need to reconstruct the source design decisions.

## Conventions

- One source of truth per concern: `MODEL` for the feature list, `DEFAULTS` for storage shape, `buildStylesheet()` for the injected sheet. Don't duplicate.
- The content script must stay tiny and synchronous — anything it does runs on every YouTube page load. No React, no third-party deps in there.
- Settings reads in the popup go through `useSettings()`; writes go through `setSettings()` (it's the second tuple element of the hook). Never call `chrome.storage.*` directly from React code.
- No analytics, no telemetry, no third-party requests from the extension. The CWS listing and the website both promise this.

## Things deliberately out of scope (for now)

- No backend, no accounts, no Pro tier. The extension is fully local.
- No sync. Settings live in `chrome.storage.local`.
- No Firefox build. The manifest is MV3 Chrome.
- No mobile YouTube parity beyond the manifest match — selectors target the desktop layout.
