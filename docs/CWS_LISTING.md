# Chrome Web Store listing copy

Paste each field into the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole) submission form.

> **Replace `https://refine-yt.vercel.app` everywhere below with the real Vercel
> URL** before submitting.

---

## Name (45-char limit)

```
Refine — Hide YouTube distractions
```

## Short description (132-char limit)

Shown under the title in store search results. Keep it punchy.

```
Turn YouTube back into a video player. Hide Shorts, the feed, recommendations, comments — one toggle per element.
```

(115 chars)

## Category

```
Productivity
```

## Language

```
English
```

---

## Detailed description (16,000-char limit; renders as plain text with line breaks)

```
Refine hides the parts of YouTube you didn't come to see.

The popup gives you a switch for every distraction YouTube tries to feed you — Shorts shelves and tabs, the home feed, recommended videos in the sidebar, the Trending tab, comments, end screens, merch shelves, the "More from YouTube" section in the menu, search-result clutter, even the top header. Flip each one independently, or use the group-level switch in each section header to hide everything in one tap.

WHAT YOU CAN HIDE

Home
• Home feed (with optional redirect to Subscriptions)
• Shorts (shelf, tab, reel grid, sidebar entry)
• Mixes
• Trending & Explore
• Subscriptions feed

Watch page
• Video sidebar (Recommended, Live chat, Playlist as sub-toggles)
• End-screen feed and end-screen cards
• Fundraiser banners
• Merch, tickets, offers
• Video info (title, channel, buttons, description — each its own toggle)
• Disable autoplay (via the player's own API)
• Disable annotations

Comments
• Comments (with profile-photos sub-toggle)

YouTube shell
• Notifications
• Search suggestions
• Off-topic search shelves
• "More from YouTube" section in the menu
• Top header

HOW IT WORKS

Refine writes your preferences as attributes on the YouTube page before it paints, then a single stylesheet hides whatever you've toggled off. No flicker, no flash of the thing you came here to hide. Per-site pause is one click — flip it off when you actually want to scroll, then back on. Network-layer redirects bounce you off Trending and Explore before they load. The autoplay toggle calls YouTube's own player API directly.

PRIVACY

Refine collects nothing. No accounts, no telemetry, no remote servers. Your toggle preferences live in your browser's local storage and nowhere else. Full privacy policy: https://refine-yt.vercel.app/privacy

OPEN SOURCE

Source, issues, and feature requests: https://github.com/PaoloJN/refine
MIT licensed.

Built by one person. Hope it gives you back the YouTube you wanted.
```

---

## Single-purpose description

Required by Google. Goes in the developer-console "Privacy practices" tab.

```
Refine is a Chrome extension that hides distracting elements on youtube.com (Shorts, the home feed, recommendations, comments, end screens, merch shelves, and others) via per-element toggles managed in its popup. Settings are stored locally and nothing is transmitted off-device.
```

---

## Permission justifications

Each goes in its own field under "Privacy practices → Permission justification."

### `storage`

```
Saves the user's per-element hide toggles, theme preference, and master on/off state in chrome.storage.local so they persist between browser sessions. No data leaves the device.
```

### `tabs`

```
Reads the active tab's URL so the popup can show the correct state — active on YouTube, paused on this site, or "open YouTube to start" when the user is on any other site. Nothing about other tabs is read or transmitted.
```

### `declarativeNetRequest`

```
Installs up to three redirect rules that bounce the user off YouTube pages the user has chosen to hide — /feed/trending and /feed/explore redirect to the home page, and the home page can optionally redirect to /feed/subscriptions when the matching toggle is enabled. This is the modern MV3 equivalent of webRequest URL filtering; no request bodies are read or modified.
```

### Host permission for `https://www.youtube.com/*`

```
Required to run the content script that hides YouTube elements on YouTube pages. No other origin is accessed.
```

---

## Remote code use

Goes in "Privacy practices → Are you using remote code?"

```
No. All JavaScript ships inside the extension package. The popup's CSS loads the Geist font from Google Fonts (https://fonts.googleapis.com) when the popup is open, but no executable code is fetched.
```

---

## Data usage disclosures

Tick **only**:

- [x] **Authentication information** → **No**
- [x] **Personal communications** → **No**
- [x] **Financial and payment information** → **No**
- [x] **Health information** → **No**
- [x] **Personal identifiable information** → **No**
- [x] **User activity** → **No** (preferences are not "activity" — they're configuration)
- [x] **Website content** → **No**
- [x] **Web history** → **No**
- [x] **Location** → **No**

And under the certification toggles at the bottom of the Privacy practices tab:

- [x] I do not sell or transfer user data to third parties, apart from the approved use cases
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

---

## Privacy policy URL

```
https://refine-yt.vercel.app/privacy
```

---

## Support URL

```
https://github.com/PaoloJN/refine/issues
```

## Homepage URL

```
https://refine-yt.vercel.app
```

---

## Screenshots and tiles (you handle these)

- **1280×800** screenshots (1 minimum, 5 maximum) — popup states + an annotated "before/after" of youtube.com works well
- **440×280** small promo tile (required)
- **1400×560** marquee tile (optional but recommended; shown on category pages)
- **128×128** icon — Plasmo derives this from `assets/icon.png` automatically
