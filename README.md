# Refine

Hide YouTube shorts, recommendations, comments, end-screen feeds, and other distractions. Per-site pause, dark/light theme, instant pre-paint hide.

## Repo layout

```
.                    # Plasmo Chrome extension (root)
├── src/
│   ├── popup.tsx           # popup entry
│   ├── popup.css           # popup styles (design tokens + components)
│   ├── background.ts       # service worker
│   ├── contents/
│   │   └── youtube.ts      # runs at document_start on youtube.com
│   ├── components/         # popup UI primitives
│   └── lib/                # settings, model, theme, css generator
├── assets/                 # icons + CWS screenshots
└── CLAUDE.md
```

## Stack

- **Plasmo** + TypeScript + React 18
- **`@plasmohq/storage`** over `chrome.storage.local` for settings
- **`@phosphor-icons/react`** icons
- Plain CSS with design tokens (neutral grayscale, dark-first)
- MV3 service worker

## Run locally

```bash
bun install        # or pnpm / npm
bun run dev        # plasmo dev — load build/chrome-mv3-dev as unpacked
```

In Chrome: `chrome://extensions` → Developer mode → Load unpacked → pick `build/chrome-mv3-dev/`.

## Package for the store

```bash
bun run package    # produces build/chrome-mv3-prod.zip
```

## How it works

The content script runs at `document_start` on `youtube.com`. It writes the current settings as `data-*` attributes on `<html>` before YouTube paints, then injects one stylesheet whose selectors are gated on those attributes (e.g. `[data-refine-shorts="hide"] ytd-rich-shelf-renderer[is-shorts] { display: none; }`). The service worker watches storage; the content script watches in-page to update attributes when the user flips a toggle in the popup. No DOM mutation observers, no per-frame work.
