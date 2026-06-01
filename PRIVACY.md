# Privacy Policy — Refine

_Last updated: 2026-06-01_

Refine is a Chrome extension that hides distracting elements on YouTube. It is
fully local and contains no analytics, no telemetry, and no third-party
integrations.

## What we collect

**Nothing.** Refine does not collect, transmit, or sell any data — personal or
otherwise. No accounts. No servers. No tracking pixels.

## What we store

Refine stores your toggle preferences (which YouTube elements you've chosen to
hide, your selected theme, and your master on/off state) using Chrome's local
storage API (`chrome.storage.local`). This data never leaves your browser. It
is not synced, backed up, or transmitted anywhere.

If you uninstall the extension, this data is removed by Chrome.

## What permissions we request and why

- **`storage`** — to remember your toggle preferences across browser sessions.
- **`tabs`** — to read the URL of the currently active tab so the popup can
  show the right state (active / paused / off-site) and tell whether you're
  on YouTube.
- **`declarativeNetRequest`** — to redirect specific YouTube URLs (e.g.
  `/feed/trending` → home) when you've enabled the matching toggle.
- **Host access to `https://www.youtube.com/*`** — to run the content script
  that hides elements on YouTube pages.

We do not request, and Refine cannot access, any other site or any data
outside what those permissions describe.

## Network requests

Refine makes no network requests of its own. The extension contains no
analytics SDK, no error-reporting service, no remote configuration. The only
fonts loaded are Google Fonts (Geist), requested directly by the popup's CSS
when the popup is open — Google's font CDN privacy policy applies to that
single request. If you'd like to avoid even that, future versions may ship
fonts locally.

## Children's privacy

Refine does not target or knowingly collect data from anyone, including
children under 13.

## Changes to this policy

Any change to data handling will be reflected here and in the public commit
history of the repository at
[github.com/PaoloJN/refine](https://github.com/PaoloJN/refine). The "Last
updated" date above will change accordingly.

## Contact

Open an issue at
[github.com/PaoloJN/refine/issues](https://github.com/PaoloJN/refine/issues).
