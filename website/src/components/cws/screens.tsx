import {
  ALL_EXPANDED_GROUPS,
  CaptionStrip,
  EditorialBlock,
  FONT_MONO,
  FONT_SANS,
  Kbd,
  RefineMark,
  RefinePopupMock,
  YouTubeMock,
} from "./atoms"

// ─────────────────────────────────────────────────────────────────────
// ICONS — 128×128, four variants. CWS only requires one but we render
// candidates so we can pick the strongest.
// ─────────────────────────────────────────────────────────────────────

export function IconPaper() {
  return (
    <div
      style={{
        width: 128,
        height: 128,
        background: "#fbfaf5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <RefineMark size={92} color="#111" />
    </div>
  )
}

export function IconBlack() {
  return (
    <div
      style={{
        width: 128,
        height: 128,
        background: "#0d0d0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <RefineMark size={92} color="#f3f3f3" />
    </div>
  )
}

export function IconAmber() {
  return (
    <div
      style={{
        width: 128,
        height: 128,
        background: "#e8d9b0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <RefineMark size={92} color="#2a2418" />
    </div>
  )
}

export function IconBleed() {
  return (
    <div
      style={{
        width: 128,
        height: 128,
        background: "#fbfaf5",
        position: "relative",
        overflow: "hidden",
      }}>
      <RefineMark
        size={170}
        color="#111"
        style={{ position: "absolute", left: -22, top: -22 }}
      />
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
        background: "var(--rf-bg)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "var(--rf-fg)",
            color: "var(--rf-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <RefineMark size={18} />
        </span>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 15,
            fontWeight: 600,
            color: "var(--rf-fg)",
            letterSpacing: "-0.012em",
          }}>
          Refine
        </span>
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: FONT_SANS,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.04,
          letterSpacing: "-0.024em",
          color: "var(--rf-fg)",
        }}>
        Hide YouTube
        <br />
        noise.
      </h2>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: "var(--rf-fg-subtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
          Free · local · no tracking
        </span>
      </div>
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
        background: "var(--rf-bg)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        alignItems: "center",
        padding: "0 80px",
        position: "relative",
      }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--rf-fg)",
              color: "var(--rf-surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <RefineMark size={20} />
          </span>
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              fontWeight: 600,
              color: "var(--rf-fg)",
              letterSpacing: "-0.012em",
            }}>
            refine
          </span>
          <span
            style={{
              marginLeft: 8,
              fontFamily: FONT_MONO,
              fontSize: 12,
              color: "var(--rf-fg-subtle)",
            }}>
            v1.0 · chrome 121+
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 84,
            lineHeight: 1.02,
            fontWeight: 600,
            letterSpacing: "-0.032em",
            color: "var(--rf-fg)",
          }}>
          Hide what
          <br />
          you didn&apos;t
          <br />
          come for.
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--rf-fg-muted)",
            maxWidth: 480,
            letterSpacing: "-0.005em",
          }}>
          One toggle per distraction on YouTube. Pre-paint, no flicker, no
          tracking. Free.
        </p>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              padding: "8px 14px",
              background: "var(--rf-fg)",
              color: "var(--rf-surface)",
              borderRadius: 8,
              fontFamily: FONT_SANS,
              fontSize: 13.5,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}>
            Add to Chrome — free
          </span>
          {["16 toggles", "no sign-up", "no logs"].map((c) => (
            <span
              key={c}
              style={{
                padding: "6px 10px",
                border: "1px solid var(--rf-border)",
                background: "var(--rf-surface)",
                borderRadius: 99,
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: "var(--rf-fg-muted)",
                letterSpacing: "0.02em",
              }}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RefinePopupMock
          variant="default"
          width={400}
          groups={ALL_EXPANDED_GROUPS.slice(0, 2)}
          meter={{ on: 10, total: 13 }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Helper — the screenshot shell. Eyebrow + headline + sub on the left,
// product mock on the right, caption strip pinned to the bottom.
// ─────────────────────────────────────────────────────────────────────

function ScreenshotShell({
  eyebrow,
  headline,
  sub,
  mock,
  captions,
  mockAlign = "center",
}: {
  eyebrow: string
  headline: React.ReactNode
  sub: string
  mock: React.ReactNode
  captions: { label: string; value: string }[]
  mockAlign?: "center" | "start"
}) {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--rf-bg)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "440px 1fr",
          gap: 40,
          padding: "72px 64px",
          alignItems: mockAlign === "center" ? "center" : "start",
        }}>
        <EditorialBlock eyebrow={eyebrow} headline={headline} sub={sub} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}>
          {mock}
        </div>
      </div>
      <CaptionStrip items={captions} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 1 — THE POPUP
// ─────────────────────────────────────────────────────────────────────

export function Shot1Popup() {
  return (
    <ScreenshotShell
      eyebrow="#01 — The popup"
      headline={
        <>
          Hide the parts of
          <br />
          YouTube you don&apos;t want.
        </>
      }
      sub="One toggle per distraction. Open the popup, flip the rows that bother you, close it. Settings apply before the page paints — no flicker, no flash of the thing you're trying not to see."
      mock={
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -40,
              background: "var(--rf-inset)",
              border: "1px solid var(--rf-border)",
              borderRadius: 16,
              opacity: 0.6,
            }}
          />
          <RefinePopupMock variant="default" width={400} />
        </div>
      }
      captions={[
        { label: "Toggles", value: "16 in 6 groups" },
        { label: "Storage", value: "local only" },
        { label: "Tracking", value: "none" },
      ]}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 2 — WHAT IT HIDES
// ─────────────────────────────────────────────────────────────────────

export function Shot2Toggles() {
  return (
    <ScreenshotShell
      eyebrow="#02 — What it hides"
      headline={
        <>
          Sixteen toggles.
          <br />
          Six groups.
        </>
      }
      sub="Shorts, recommendations, end screens, merch shelves, comments, the homepage feed — each on its own row. Independent and reversible. Tune the page once, walk away."
      mock={<RefinePopupMock variant="default" width={400} groups={ALL_EXPANDED_GROUPS} />}
      mockAlign="start"
      captions={[
        { label: "Groups", value: "6" },
        { label: "Toggles", value: "16" },
        { label: "Hotkey", value: "⌘⇧Y to pause" },
      ]}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 3 — BEFORE / AFTER
// ─────────────────────────────────────────────────────────────────────

export function Shot3BeforeAfter() {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "var(--rf-bg)",
        display: "flex",
        flexDirection: "column",
      }}>
      <div
        style={{
          padding: "60px 64px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--rf-fg-subtle)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
          #03 — Before / After
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-0.028em",
            color: "var(--rf-fg)",
            maxWidth: 760,
          }}>
          Settings apply before paint.
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: FONT_SANS,
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--rf-fg-muted)",
            maxWidth: 720,
          }}>
          Refine writes one attribute on{" "}
          <code
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              background: "var(--rf-inset)",
              border: "1px solid var(--rf-border)",
              padding: "1px 6px",
              borderRadius: 4,
            }}>
            &lt;html&gt;
          </code>{" "}
          before YouTube renders. CSS rules gated on those attributes hide
          everything you don&apos;t want. Zero JavaScript on every frame.
        </p>
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          padding: "0 64px",
          alignItems: "center",
        }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: -22,
              left: 0,
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--rf-fg-subtle)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
            Off — vanilla
          </span>
          <YouTubeMock refined={false} width={520} height={400} />
        </div>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: -22,
              left: 0,
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--rf-fg)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
            On — refined
          </span>
          <YouTubeMock refined={true} width={520} height={400} />
        </div>
      </div>
      <div style={{ height: 40 }} />
      <CaptionStrip
        items={[
          { label: "Timing", value: "pre-paint" },
          { label: "Method", value: "CSS attribute gating" },
          { label: "Cost", value: "0 frames" },
        ]}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 4 — PAUSE
// ─────────────────────────────────────────────────────────────────────

export function Shot4Pause() {
  return (
    <ScreenshotShell
      eyebrow="#04 — Pause"
      headline={
        <>
          One tap.
          <br />
          Resume when you want.
        </>
      }
      sub="The master switch (⌘⇧Y) puts everything back exactly the way YouTube ships it. Useful for showing someone a thumbnail, or for one-off sessions where you actually want the recommendations."
      mock={<RefinePopupMock variant="paused" width={400} master={false} />}
      captions={[
        { label: "Hotkey", value: "⌘⇧Y" },
        { label: "Scope", value: "per-tab" },
        { label: "Persist", value: "resumes on reload" },
      ]}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────
// SHOT 5 — PRESETS
// ─────────────────────────────────────────────────────────────────────

export function Shot5Presets() {
  return (
    <ScreenshotShell
      eyebrow="#05 — Presets"
      headline={
        <>
          Pick a starting point.
          <br />
          Tune later.
        </>
      }
      sub="First time you open the popup you get three presets to choose from. Focused hides the noise but keeps the watch page intact. Watch-only kills the sidebar. Minimal just adds the master toggle so you can flip things on as you notice them."
      mock={<RefinePopupMock variant="firstrun" width={400} />}
      captions={[
        { label: "Presets", value: "3" },
        { label: "Customize", value: "per-element" },
        { label: "Undo", value: "one tap" },
      ]}
    />
  )
}
