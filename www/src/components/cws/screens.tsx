import type { ReactNode } from "react"

import {
  BrandMark,
  CaptionStrip,
  EditorialBlock,
  FONT_MONO,
  FONT_SANS,
  Placeholder,
  RefineGlyph,
  RefineMark,
  RefinePopup,
  WatchPage,
} from "./atoms"
import { Icon } from "./icons"

// ─────────────────────────────────────────────────────────────────────
// Editorial CWS frame shell (1280×800). Eyebrow + headline + support
// on the left, mock on the right, caption strip pinned to the bottom.
// Mirrors the Claude Design composition.
// ─────────────────────────────────────────────────────────────────────

function CwsFrame1280({
  num,
  label,
  headline,
  support,
  caption,
  children,
  mockLeft = 660,
  headlineSize = 50,
}: {
  num: string
  label: string
  headline: ReactNode
  support: string
  caption: [string, string][]
  children: ReactNode
  mockLeft?: number
  headlineSize?: number
}) {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
      }}>
      <div style={{ position: "absolute", left: 76, top: 80, width: mockLeft - 100 }}>
        <EditorialBlock
          num={num}
          label={label}
          headline={headline}
          support={support}
          headlineSize={headlineSize}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: mockLeft,
          right: 0,
          top: 0,
          bottom: 116,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          bottom: 0,
          height: 92,
          borderTop: "1px solid var(--hairline-2)",
          display: "flex",
          alignItems: "center",
        }}>
        <CaptionStrip cells={caption} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 1 — THE POPUP
// Popup foreground, large windowed watch-page wireframe filling the
// right column behind. Editorial left, the popup overhangs the window's
// upper-left corner to read as "this controls that".
// ─────────────────────────────────────────────────────────────────────

export function Shot1Popup() {
  return (
    <CwsFrame1280
      num="#01"
      label="THE POPUP"
      headline={
        <>
          Hide the parts of
          <br />
          YouTube you don&apos;t want.
        </>
      }
      support="One toggle per distraction, grouped and quiet. It lives in the toolbar and does exactly one thing."
      caption={[
        ["TOGGLES", "16 in 6 groups"],
        ["STORAGE", "local-only"],
        ["TRACKING", "none"],
      ]}
      mockLeft={520}>
      <div style={{ position: "relative", width: 720, height: 600 }}>
        <div
          className="win"
          style={{
            position: "absolute",
            right: 24,
            top: 60,
            width: 600,
            height: 460,
            opacity: 0.78,
          }}>
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
            <span
              style={{
                marginLeft: 16,
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: "var(--subtle)",
              }}>
              youtube.com
            </span>
          </div>
          <div style={{ height: 426 }}>
            <WatchPage />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 30,
            filter: "drop-shadow(0 26px 60px rgba(45,40,28,0.32))",
          }}>
          <RefinePopup variant="default" width={360} />
        </div>
      </div>
    </CwsFrame1280>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 2 — WHAT IT HIDES
// Catalog of all 16 toggles laid out as a 3-column × 2-row group grid.
// No popup chrome — different visual treatment from #01.
// ─────────────────────────────────────────────────────────────────────

const CATALOG: { name: string; items: { icon: string; label: string; on: boolean }[] }[] = [
  {
    name: "Feed",
    items: [
      { icon: "house", label: "Home feed", on: true },
      { icon: "compass", label: "Explore & Trending", on: true },
      { icon: "squares-four", label: "Subscriptions grid", on: false },
    ],
  },
  {
    name: "Shorts",
    items: [
      { icon: "play-circle", label: "Shorts shelf", on: true },
      { icon: "rows", label: "Shorts in sidebar", on: true },
    ],
  },
  {
    name: "Recommendations",
    items: [
      { icon: "sidebar-simple", label: "Watch-next sidebar", on: true },
      { icon: "grid-four", label: "End-screen feed", on: true },
      { icon: "cards-three", label: "Info cards", on: true },
    ],
  },
  {
    name: "Watch page",
    items: [
      { icon: "chat-circle-dots", label: "Live chat", on: true },
      { icon: "skip-forward", label: "Autoplay next", on: false },
      { icon: "tag", label: "Merch shelf", on: true },
    ],
  },
  {
    name: "Comments",
    items: [
      { icon: "chat-text", label: "Comments", on: true },
      { icon: "user-circle", label: "Profile photos", on: false },
    ],
  },
  {
    name: "Browser chrome",
    items: [
      { icon: "bell", label: "Notifications", on: true },
      { icon: "magnifying-glass", label: "Search suggestions", on: false },
      { icon: "layout", label: "Top header", on: true },
    ],
  },
]

function CatalogCard({ group }: { group: (typeof CATALOG)[number] }) {
  const on = group.items.filter((it) => it.on).length
  return (
    <div
      style={{
        background: "var(--paper)",
        border: "1px solid var(--hairline-2)",
        borderRadius: 14,
        padding: "18px 18px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "var(--shadow-sm)",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          borderBottom: "1px solid var(--hairline)",
          paddingBottom: 10,
        }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}>
          {group.name}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: "var(--subtle)",
          }}>
          {on}/{group.items.length}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {group.items.map((it) => (
          <div
            key={it.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "4px 0",
            }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: it.on ? "var(--cream-2)" : "transparent",
                border: it.on ? "none" : "1px dashed var(--hairline-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: it.on ? "var(--ink-2)" : "var(--faint)",
                flexShrink: 0,
              }}>
              <Icon name={it.icon} size={13} weight={it.on ? "bold" : "regular"} />
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 450,
                letterSpacing: "-0.005em",
                color: it.on ? "var(--ink)" : "var(--muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {it.label}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONT_MONO,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: it.on ? "var(--ink-2)" : "var(--faint)",
              }}>
              {it.on ? "hide" : "off"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Shot2Toggles() {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
      }}>
      <TopStrip
        num="#02"
        label="WHAT IT HIDES"
        headline={<>Sixteen toggles. Six groups.</>}
        support="Flip a whole group, or open one and pick the element. Defaults stay sensible; tune the rest only if you want to."
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 230,
          bottom: 116,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 20,
        }}>
        {CATALOG.map((g) => (
          <CatalogCard key={g.name} group={g} />
        ))}
      </div>
      <BottomCaption
        caption={[
          ["GROUPS", "6"],
          ["TOGGLES", "16"],
          ["HOTKEY", "⌘⇧Y to pause"],
        ]}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Compact top-strip header. Used by the wide screenshot layouts (#03,
// #04, #05) so the visual fills more of the canvas.
// ─────────────────────────────────────────────────────────────────────

function TopStrip({
  num,
  label,
  headline,
  support,
}: {
  num: string
  label: string
  headline: ReactNode
  support: string
}) {
  return (
    <div
      style={{
        padding: "60px 76px 28px",
        display: "flex",
        alignItems: "flex-end",
        gap: 56,
      }}>
      <div style={{ flex: "0 0 auto" }}>
        <div className="eyebrow">
          <span className="num">{num}</span>&nbsp;—&nbsp;{label}
        </div>
        <h1
          className="headline"
          style={{ fontSize: 44, marginTop: 16, maxWidth: 540 }}>
          {headline}
        </h1>
      </div>
      <p
        className="support"
        style={{
          flex: 1,
          maxWidth: 380,
          fontSize: 16,
          paddingBottom: 6,
        }}>
        {support}
      </p>
    </div>
  )
}

function BottomCaption({ caption }: { caption: [string, string][] }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 0,
        height: 92,
        borderTop: "1px solid var(--hairline-2)",
        display: "flex",
        alignItems: "center",
      }}>
      <CaptionStrip cells={caption} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 3 — BEFORE / AFTER
// Two large side-by-side YouTube screenshot placeholders with the ink
// seam pill at midpoint. Compact top strip; full-width split below.
// ─────────────────────────────────────────────────────────────────────

export function Shot3BeforeAfter() {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
      }}>
      <TopStrip
        num="#03"
        label="BEFORE / AFTER"
        headline={<>Settings apply before paint.</>}
        support="Refine gates elements with a CSS attribute the instant the page loads. No flash of the stuff you hid, no layout jump."
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 220,
          bottom: 116,
          display: "flex",
          gap: 0,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid var(--hairline-2)",
          boxShadow: "var(--shadow-card)",
          background: "var(--paper)",
        }}>
        <Placeholder
          hint="OFF · vanilla YouTube screenshot"
          style={{
            flex: 1,
            border: "none",
            borderRadius: 0,
            height: "100%",
          }}
        />
        <Placeholder
          hint="ON · refined YouTube screenshot"
          style={{
            flex: 1,
            border: "none",
            borderRadius: 0,
            borderLeft: "1px solid var(--ink)",
            height: "100%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            background: "var(--ink)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "5px 4px",
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: "0.04em",
            boxShadow: "var(--shadow-sm)",
          }}>
          <span style={{ padding: "0 9px", opacity: 0.55 }}>off</span>
          <span style={{ width: 1, height: 12, background: "rgba(251,250,245,0.3)" }} />
          <span style={{ padding: "0 9px", fontWeight: 600 }}>on</span>
        </div>
      </div>
      <BottomCaption
        caption={[
          ["TIMING", "pre-paint"],
          ["METHOD", "CSS attribute gating"],
          ["COST", "0 frames"],
        ]}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 4 — PAUSE
// Full-bleed YouTube screenshot (cluttered, since paused), windowed.
// Paused popup floats top-right over it. Compact top strip.
// ─────────────────────────────────────────────────────────────────────

export function Shot4Pause() {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
      }}>
      <TopStrip
        num="#04"
        label="PAUSE"
        headline={<>One tap. Resume when you want.</>}
        support="Need the recommendations for a minute? Pause Refine on the current tab and everything comes back. Tap again to hide it."
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 220,
          bottom: 116,
        }}>
        <div
          className="win"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}>
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
            <span
              style={{
                marginLeft: 16,
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: "var(--subtle)",
              }}>
              youtube.com
            </span>
          </div>
          <Placeholder
            hint="YouTube screenshot — cluttered (paused state)"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 34,
              bottom: 0,
              borderRadius: 0,
              border: "none",
              height: "auto",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 28,
              top: 60,
              filter: "drop-shadow(0 26px 60px rgba(45,40,28,0.30))",
            }}>
            <RefinePopup variant="paused" width={344} />
          </div>
        </div>
      </div>
      <BottomCaption
        caption={[
          ["HOTKEY", "⌘⇧Y"],
          ["SCOPE", "per-tab"],
          ["PERSIST", "resumes on reload"],
        ]}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 5 — PRESETS
// Full-bleed YouTube screenshot (first-load, cluttered). Presets popup
// floats center over it as the first-run moment.
// ─────────────────────────────────────────────────────────────────────

export function Shot5Presets() {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
      }}>
      <TopStrip
        num="#05"
        label="PRESETS"
        headline={<>Pick a starting point. Tune later.</>}
        support="First run drops you on three presets. Start close to what you want, then adjust any single element whenever."
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 220,
          bottom: 116,
        }}>
        <div
          className="win"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}>
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
            <span
              style={{
                marginLeft: 16,
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: "var(--subtle)",
              }}>
              youtube.com
            </span>
          </div>
          <Placeholder
            hint="YouTube screenshot — first install moment"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 34,
              bottom: 0,
              borderRadius: 0,
              border: "none",
              height: "auto",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 36,
              top: "50%",
              transform: "translateY(-50%)",
              filter: "drop-shadow(0 26px 60px rgba(45,40,28,0.32))",
            }}>
            <RefinePopup variant="presets" width={344} />
          </div>
        </div>
      </div>
      <BottomCaption
        caption={[
          ["PRESETS", "3"],
          ["CUSTOMIZE", "per-element"],
          ["UNDO", "one tap"],
        ]}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// MARQUEE — 1400×560
// ─────────────────────────────────────────────────────────────────────

export function Marquee() {
  return (
    <div
      style={{
        width: 1400,
        height: 560,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
        display: "flex",
      }}>
      <div
        style={{
          flex: "0 0 56%",
          padding: "70px 0 70px 84px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <BrandMark size="md" sub="v1.0 · chrome 121+" />
        <h1
          className="headline"
          style={{ fontSize: 72, marginTop: 30, lineHeight: 1.0 }}>
          Hide what
          <br />
          you didn&apos;t
          <br />
          come for.
        </h1>
        <p className="support" style={{ marginTop: 26, maxWidth: 460, fontSize: 19 }}>
          One toggle per distraction. Pre-paint, no flicker, no tracking. Free.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 30,
            flexWrap: "wrap",
          }}>
          <span className="chip chip--accent">
            <Icon name="plus" size={13} weight="bold" />
            Add to Chrome · free
          </span>
          <span className="chip">16 toggles</span>
          <span className="chip">no sign-up</span>
          <span className="chip">no logs</span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderLeft: "1px solid var(--hairline)",
          background: "var(--cream-2)",
        }}>
        <div
          className="win"
          style={{
            position: "absolute",
            right: 30,
            bottom: 36,
            width: 360,
            height: 240,
            opacity: 0.55,
          }}>
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
          </div>
          <div style={{ height: 206 }}>
            <WatchPage />
          </div>
        </div>
        <div style={{ transform: "rotate(-1.5deg)" }}>
          <RefinePopup variant="default" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SMALL PROMO — 440×280
// ─────────────────────────────────────────────────────────────────────

export function SmallPromo() {
  return (
    <div
      style={{
        width: 440,
        height: 280,
        background: "var(--cream)",
        position: "relative",
        fontFamily: FONT_SANS,
        overflow: "hidden",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <BrandMark size="sm" />
      <h1 className="headline" style={{ fontSize: 40, lineHeight: 1.02 }}>
        Hide YouTube
        <br />
        noise.
      </h1>
      <div>
        <span className="chip">
          <span className="dot" />
          Free · local
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -38,
          top: -38,
          width: 150,
          height: 150,
          borderRadius: 38,
          background: "var(--ink)",
          opacity: 0.04,
          transform: "rotate(12deg)",
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// ICONS — 128×128 variants of the new ink-square + declutter mark
// ─────────────────────────────────────────────────────────────────────

function IconShell({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: 128,
        height: 128,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
      {children}
    </div>
  )
}

export function IconPaper() {
  return (
    <IconShell bg="#fbfaf5">
      <RefineMark size={96} color="#1b1a16" glyphColor="#fbfaf5" />
    </IconShell>
  )
}

export function IconBlack() {
  return (
    <IconShell bg="#1b1a16">
      <RefineMark size={96} color="#fbfaf5" glyphColor="#1b1a16" />
    </IconShell>
  )
}

export function IconClay() {
  return (
    <IconShell bg="#fbfaf5">
      <RefineMark size={96} color="#b9543a" glyphColor="#fbfaf5" />
    </IconShell>
  )
}

export function IconBleed() {
  return (
    <IconShell bg="#1b1a16">
      <RefineGlyph size={100} color="#fbfaf5" />
    </IconShell>
  )
}

// Re-export Placeholder so it's easy to swap in real screenshots later.
export { Placeholder }
