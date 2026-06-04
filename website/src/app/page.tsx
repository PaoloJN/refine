import { ArrowRight, ArrowUpRight, Plus } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"

import { DemoPopup } from "./_extension/demo-popup"

const CHROME_STORE_URL = "https://chromewebstore.google.com/"
const GITHUB_URL = "https://github.com/PaoloJN/refine"

type HideGroup = {
  name: string
  items: string[]
}

const HIDE_GROUPS: HideGroup[] = [
  { name: "Home", items: ["Home feed", "Shorts shelf", "Trending", "Subscriptions"] },
  {
    name: "Watch",
    items: [
      "Sidebar recs",
      "End-screen feed",
      "End-screen cards",
      "Live chat",
      "Playlist panel",
      "Merch & offers"
    ]
  },
  { name: "Comments", items: ["Comments", "Avatars"] },
  {
    name: "Chrome",
    items: ["Notifications", "Search suggestions", "More from YouTube", "Top header"]
  }
]

// Official GitHub mark (octocat silhouette). One filled path, scales with
// currentColor so it follows the surrounding text colour in either theme.
function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LogoMark({ size = 14, color = "var(--fg)" }: { size?: number; color?: string }) {
  // viewBox cropped to the marks themselves (the design fits inside x=40-140,
  // y=40-140). Same approach as the extension's Mark component — fills the
  // rendered box instead of leaving 20% empty padding around the glyph, so
  // the perceived size matches the px we pass in.
  return (
    <svg viewBox="35 35 110 110" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M40 60C40 48.9543 48.9543 40 60 40V123H40V60Z" />
      <rect x="80" y="80" width="20" height="20" />
      <rect x="100" y="60" width="20" height="20" />
      <rect x="120" y="40" width="20" height="20" />
      <path d="M120 80H140V120C140 131.046 131.046 140 120 140V140V80Z" />
      <path d="M40 60C40 48.9543 48.9543 40 60 40L100 40V60L40 60Z" />
      <path d="M140 120C140 131.046 131.046 140 120 140H60V120L140 120Z" />
    </svg>
  )
}

function Brand() {
  return (
    <a className="rf-brand" href="/">
      <span className="rf-brand-mark">
        <LogoMark size={26} />
      </span>
      <span className="rf-brand-name">Refine</span>
      <span className="rf-brand-version">v1.0</span>
    </a>
  )
}

function StatusBar() {
  return (
    <div className="rf-statusbar">
      <div className="rf-wrap rf-statusbar-inner">
        <div className="rf-statusbar-left">
          <span className="rf-statusbar-dot" />
          <span>v1.0 shipped</span>
          <span className="rf-statusbar-sep">·</span>
          <span>free</span>
          <span className="rf-statusbar-sep">·</span>
          <span>local-only</span>
          <span className="rf-statusbar-sep">·</span>
          <span>open source</span>
        </div>
        <div className="rf-statusbar-right">
          <a
            className="rf-statusbar-link"
            href={`${GITHUB_URL}/releases`}
            target="_blank"
            rel="noreferrer">
            Changelog
            <ArrowUpRight size={10} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="rf-nav">
      <div className="rf-wrap rf-nav-inner">
        <div className="rf-nav-left">
          <Brand />
          <span className="rf-nav-sep" aria-hidden />
          <span className="rf-nav-link" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
            YouTube · refined
          </span>
        </div>
        <div className="rf-nav-links">
          <a className="rf-nav-link" href="#hides">
            Features
          </a>
          <a className="rf-nav-link" href="#how">
            How it works
          </a>
          <a className="rf-nav-link" href="/privacy">
            Privacy
          </a>
          <a className="rf-nav-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GithubMark size={13} />
            GitHub
          </a>
          <ThemeToggle />
          <a
            className="rf-nav-link rf-nav-link-cta rf-btn rf-btn-primary"
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noreferrer">
            <Plus size={13} strokeWidth={2.4} />
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  )
}

function BrowserMock() {
  return (
    <div className="rf-browser" aria-hidden>
      <div className="rf-browser-bar">
        <span className="rf-browser-dot" />
        <span className="rf-browser-dot" />
        <span className="rf-browser-dot" />
        <span className="rf-browser-url">
          <span className="rf-browser-url-dot" />
          youtube.com/watch
        </span>
        <span className="rf-browser-tag">refined</span>
      </div>
      <div className="rf-browser-body">
        <div className="rf-browser-video">
          <span className="rf-browser-play" />
        </div>
        <div className="rf-browser-bars">
          <div className="rf-browser-bar-line" style={{ width: "72%" }} />
          <div className="rf-browser-bar-line thin" style={{ width: "44%" }} />
        </div>
        <div className="rf-browser-channel">
          <span className="rf-browser-avatar" />
          <span className="rf-browser-channel-name" />
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="rf-hero">
      <div className="rf-hero-glow" aria-hidden />
      <span className="rf-hero-rail" aria-hidden>
        001 ── REFINE FOR CHROME ── YOUTUBE
      </span>

      <div className="rf-wrap rf-hero-inner">
        <div className="rf-hero-text">
          <div className="rf-hero-eyebrow">v1.0 · Chrome extension</div>
          <h1 className="rf-hero-title">
            Hide what
            <br />
            you didn&apos;t
            <br />
            <em>come for.</em>
          </h1>
          <p className="rf-hero-support">
            A small extension that turns YouTube back into a video player.
            Toggle off Shorts, the sidebar, end screens, comments, the
            homepage feed — quietly, before the page paints.
          </p>
          <div className="rf-hero-ctas">
            <a
              className="rf-btn rf-btn-primary rf-btn-lg"
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noreferrer">
              <Plus size={14} strokeWidth={2.4} />
              Add to Chrome
            </a>
            <a className="rf-btn rf-btn-ghost rf-btn-lg" href="#hides">
              See what it hides
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>
          </div>
          <div className="rf-hero-meta">
            <span>chrome 121+</span>
            <span className="rf-hero-meta-sep">·</span>
            <span>no account</span>
            <span className="rf-hero-meta-sep">·</span>
            <span>local only</span>
          </div>
        </div>

        <div className="rf-stage">
          <BrowserMock />
          <div className="rf-popup-overlay">
            <DemoPopup theme="dark" />
          </div>
          <div className="rf-stage-meta">
            <span className="rf-stage-meta-dot" />
            Active · 11/16 hidden
          </div>
        </div>
      </div>
    </section>
  )
}

function Hides() {
  const total = HIDE_GROUPS.reduce((n, g) => n + g.items.length, 0)
  let counter = 0
  return (
    <section className="rf-section rf-section--alt" id="hides">
      <div className="rf-wrap">
        <div className="rf-sec-head">
          <div>
            <div className="rf-sec-label">What it hides</div>
            <h2 className="rf-h2" style={{ marginTop: 10, maxWidth: 520 }}>
              Sixteen toggles. Four groups. Flip whatever you don&apos;t want to see.
            </h2>
          </div>
          <div className="rf-mono" style={{ alignSelf: "flex-end" }}>
            {total.toString().padStart(2, "0")} elements
          </div>
        </div>

        <div className="rf-hides-groups">
          {HIDE_GROUPS.map((group) => (
            <div className="rf-hides-group" key={group.name}>
              <div className="rf-hides-group-head">
                <span className="rf-hides-group-name">{group.name}</span>
                <span className="rf-hides-group-count">
                  {group.items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {group.items.map((item) => {
                  counter += 1
                  return (
                    <li className="rf-hides-item" key={item}>
                      <span className="rf-hides-item-num">
                        {counter.toString().padStart(2, "0")}
                      </span>
                      <span className="rf-hides-item-label">{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepInstallMock() {
  return (
    <div className="rf-how-mock">
      <div className="rf-mock-bar">
        <span className="rf-mock-dot" />
        <span className="rf-mock-dot" />
        <span className="rf-mock-dot" />
        <span className="rf-mock-url">chrome.google.com/webstore</span>
      </div>
      <div className="rf-mock-install-body">
        <div className="rf-mock-install-row">
          <span className="rf-mock-logo">
            <LogoMark size={15} />
          </span>
          <div className="rf-mock-install-text">
            <span className="rf-mock-install-name">Refine for YouTube</span>
            <span className="rf-mock-install-meta">4.9 · free</span>
          </div>
          <span className="rf-mock-install-cta">
            <Plus size={11} strokeWidth={2.6} />
            Add
          </span>
        </div>
      </div>
    </div>
  )
}

function StepOpenMock() {
  return (
    <div className="rf-how-mock">
      <div className="rf-mock-tabs">
        <span className="rf-mock-tab rf-mock-tab-active">
          <span className="rf-mock-tab-dot" />
          YouTube
        </span>
        <span className="rf-mock-tab">+ New</span>
      </div>
      <div className="rf-mock-open-body">
        <div className="rf-mock-video">
          <span className="rf-mock-play" />
        </div>
      </div>
    </div>
  )
}

function StepFlipMock() {
  const rows = [
    { l: "Home feed", on: true },
    { l: "Shorts shelf", on: true },
    { l: "Comments", on: false }
  ]
  return (
    <div className="rf-how-mock rf-mock-flip-wrap">
      <div className="rf-mock-flip-header">
        <span className="rf-mock-logo" style={{ width: 22, height: 22 }}>
          <LogoMark size={12} />
        </span>
        <span className="rf-mock-flip-name">Refine</span>
        <span className="rf-mock-flip-host">youtube.com</span>
      </div>
      <div className="rf-mock-flip-rows">
        {rows.map((r) => (
          <div key={r.l} className="rf-mock-flip-row">
            <span className={`rf-mock-flip-label ${r.on ? "" : "off"}`}>{r.l}</span>
            <span className={`rf-mock-toggle ${r.on ? "on" : ""}`}>
              <span className="rf-mock-toggle-knob" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function How() {
  const steps = [
    {
      n: "01",
      t: "Install it",
      d: "Add Refine from the Chrome Web Store. One click. No account, no onboarding.",
      mock: <StepInstallMock />
    },
    {
      n: "02",
      t: "Open YouTube",
      d: "The extension wakes only on youtube.com and applies your settings before the page paints.",
      mock: <StepOpenMock />
    },
    {
      n: "03",
      t: "Flip what you don't want",
      d: "Open the popup, switch elements off. They stay off until you say otherwise.",
      mock: <StepFlipMock />
    }
  ]
  return (
    <section className="rf-section" id="how">
      <div className="rf-wrap">
        <div className="rf-sec-head">
          <div>
            <div className="rf-sec-label">How it works</div>
            <h2 className="rf-h2" style={{ marginTop: 10, maxWidth: 520 }}>
              Three steps. Then forget it&apos;s there.
            </h2>
          </div>
        </div>

        <div className="rf-how">
          {steps.map((s) => (
            <div className="rf-how-step" key={s.n}>
              {s.mock}
              <span className="rf-how-step-num">{s.n}</span>
              <h3 className="rf-how-title">{s.t}</h3>
              <p className="rf-how-body">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="rf-cta">
      <div className="rf-wrap rf-cta-inner">
        <div className="rf-mono" style={{ marginBottom: 18 }}>
          Free · Local · Open source
        </div>
        <h2 className="rf-cta-title">
          Quiet YouTube,
          <br />
          one toggle at a time.
        </h2>
        <p className="rf-cta-sub">
          Free, local, open source. No accounts, no analytics, no servers.
        </p>
        <div className="rf-cta-ctas">
          <a
            className="rf-btn rf-btn-primary rf-btn-lg"
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noreferrer">
            <Plus size={14} strokeWidth={2.4} />
            Add to Chrome
          </a>
          <a
            className="rf-btn rf-btn-ghost rf-btn-lg"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer">
            <GithubMark size={14} />
            View source
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="rf-footer">
      <div className="rf-wrap">
        <div className="rf-footer-top">
          <div className="rf-footer-brand">
            <LogoMark size={42} />
            <div className="rf-footer-brand-text">
              <span className="rf-footer-brand-name">Refine</span>
              <span className="rf-footer-brand-meta">Chrome extension · v1.0</span>
            </div>
          </div>
          <p className="rf-footer-blurb">
            A small extension that turns YouTube back into a video player. Built by one person.
            No tracking, no accounts, no servers — your settings live on your machine and
            only on your machine.
          </p>
        </div>

        <div className="rf-footer-grid">
          <div>
            <div className="rf-footer-head">Product</div>
            <a className="rf-footer-link" href="#hides">
              What it hides
            </a>
            <a className="rf-footer-link" href="#how">
              How it works
            </a>
            <a
              className="rf-footer-link"
              href={`${GITHUB_URL}/releases`}
              target="_blank"
              rel="noreferrer">
              Changelog
              <ArrowUpRight size={11} strokeWidth={2} style={{ opacity: 0.7 }} />
            </a>
            <a className="rf-footer-link" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
              Chrome Web Store
              <ArrowUpRight size={11} strokeWidth={2} style={{ opacity: 0.7 }} />
            </a>
          </div>
          <div>
            <div className="rf-footer-head">Project</div>
            <a className="rf-footer-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <GithubMark size={11} />
              GitHub
            </a>
            <a
              className="rf-footer-link"
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noreferrer">
              Issues
            </a>
            <a
              className="rf-footer-link"
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer">
              License (MIT)
            </a>
            <a className="rf-footer-link" href="/privacy">
              Privacy
            </a>
          </div>
          <div>
            <div className="rf-footer-head">Support</div>
            <a
              className="rf-footer-link"
              href="https://github.com/sponsors/PaoloJN"
              target="_blank"
              rel="noreferrer">
              Donate
            </a>
            <a
              className="rf-footer-link"
              href={`${GITHUB_URL}/issues/new?labels=enhancement`}
              target="_blank"
              rel="noreferrer">
              Request a feature
            </a>
            <a
              className="rf-footer-link"
              href={`${GITHUB_URL}/discussions`}
              target="_blank"
              rel="noreferrer">
              Discussions
            </a>
          </div>
        </div>

        <div className="rf-footer-wordmark" aria-hidden>
          Refine
        </div>

        <div className="rf-footer-bottom">
          <span>© {new Date().getFullYear()} · Refine · MIT</span>
          <span className="rf-footer-bottom-status">
            <span className="rf-footer-bottom-dot" />
            v1.0.0 · chrome 121+ · 0 trackers
          </span>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main>
      <StatusBar />
      <Nav />
      <Hero />
      <Hides />
      <How />
      <CTA />
      <Footer />
    </main>
  )
}
