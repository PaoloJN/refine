import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  CircleMinus,
  Crosshair,
  Heart,
  LifeBuoy,
  Lightbulb,
  MonitorPlay,
  MousePointer2,
  Pin,
  Plus,
  Power,
} from "lucide-react"

import { Confetti } from "@/components/landing/Confetti"

export const metadata: Metadata = {
  title: "Welcome — Refine",
  description: "Refine is installed. Pin it, open YouTube, and flip what you don't want.",
}

const CHROME_STORE_URL = "https://chromewebstore.google.com/"

export default function WelcomePage() {
  return (
    <>
      <StatusBar />
      <WelcomeHero />
      <StepsRow />
      <Presets />
      <HotkeyHint />
      <Footer />
    </>
  )
}

// ─── Brand mark (matches landing) ────────────────────────────────────

function LogoMark({ size = 18, color = "var(--cream)" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 180 180" width={size} height={size} fill={color} aria-hidden="true">
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

function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? 28 : 32
  const fs = size === "sm" ? 15 : 17
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        color: "var(--ink)",
      }}>
      <span
        style={{
          width: box,
          height: box,
          borderRadius: 8,
          background: "var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <LogoMark size={Math.round(box * 0.62)} color="var(--cream)" />
      </span>
      <span style={{ fontSize: fs, fontWeight: 600, letterSpacing: "-0.015em" }}>refine</span>
    </Link>
  )
}

// ─── Status bar (matches landing) ────────────────────────────────────

function StatusBar() {
  return (
    <div className="statusbar">
      <div className="wrap">
        <span className="sb-on">
          <span className="sb-dot" />
          refine v1.0
        </span>
        <span className="sb-r">
          <span>chrome 121+</span>
          <span className="sep">·</span>
          <span>free</span>
          <span className="sep">·</span>
          <span>open source</span>
        </span>
      </div>
    </div>
  )
}

// ─── Welcome hero ────────────────────────────────────────────────────

function WelcomeHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "88px 0 28px",
        textAlign: "center",
        overflow: "hidden",
      }}>
      <Confetti />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "var(--paper)",
            border: "1px solid var(--hairline-2)",
            marginBottom: 28,
            whiteSpace: "nowrap",
          }}>
          <Check size={15} strokeWidth={2.6} style={{ color: "var(--clay)" }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Refine is installed</span>
        </div>
        <h1 className="headline" style={{ fontSize: "clamp(52px,8vw,88px)" }}>
          You&apos;re in.
        </h1>
        <p
          className="support"
          style={{
            margin: "22px auto 0",
            maxWidth: 520,
            fontSize: 19,
          }}>
          Pin Refine to your toolbar, open YouTube, and flip what you don&apos;t want to see.
          It runs locally — nothing leaves your browser.
        </p>
      </div>
    </section>
  )
}

// ─── Step mocks ──────────────────────────────────────────────────────

function PinMock() {
  return (
    <div style={{ width: 230 }}>
      <div className="win" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            background: "var(--paper)",
          }}>
          <div style={{ width: 96, height: 18, borderRadius: 9, background: "var(--cream-2)" }} />
          <div style={{ flex: 1 }} />
          <div
            style={{
              position: "relative",
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <LogoMark size={20} color="var(--cream)" />
            <span
              style={{
                position: "absolute",
                right: -7,
                top: -7,
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "var(--clay)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Pin size={11} strokeWidth={2.6} style={{ color: "#fff" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabMock() {
  return (
    <div style={{ width: 230 }}>
      <div className="win" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: "8px 8px 0",
            background: "var(--cream-2)",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 13px",
              borderRadius: "8px 8px 0 0",
              background: "var(--paper)",
            }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--clay)" }} />
            <span style={{ fontSize: 11.5, fontWeight: 500 }}>YouTube</span>
          </div>
        </div>
        <div
          style={{
            height: 58,
            background: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div
            style={{
              width: 96,
              aspectRatio: "16 / 9",
              borderRadius: 6,
              background: "#26241e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "6px 0 6px 10px",
                borderColor: "transparent transparent transparent rgba(251,250,245,0.85)",
                marginLeft: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PopupMock() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: 138,
          height: 130,
          borderRadius: 12,
          border: "1px solid var(--hairline-2)",
          background: "var(--paper)",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 10px",
            borderBottom: "1px solid var(--hairline)",
          }}>
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <LogoMark size={10} color="var(--cream)" />
          </span>
          <span style={{ fontSize: 11.5, fontWeight: 600 }}>Refine</span>
        </div>
        <div style={{ padding: "6px 0" }}>
          {[true, true, false].map((on, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 10px",
              }}>
              <div
                style={{
                  width: 52,
                  height: 6,
                  borderRadius: 3,
                  background: on ? "var(--ink-2)" : "var(--hairline-2)",
                }}
              />
              <div style={{ flex: 1 }} />
              <span
                style={{
                  width: 24,
                  height: 14,
                  borderRadius: 999,
                  position: "relative",
                  background: on ? "var(--ink)" : "var(--cream-2)",
                  border: `1px solid ${on ? "var(--ink)" : "var(--hairline-3)"}`,
                }}>
                <span
                  style={{
                    position: "absolute",
                    top: 1.5,
                    left: on ? 11 : 1.5,
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: on ? "var(--paper)" : "var(--faint)",
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      <span
        style={{
          position: "absolute",
          right: -10,
          top: -10,
          transform: "rotate(8deg)",
          color: "var(--clay)",
        }}>
        <MousePointer2 size={26} strokeWidth={2.4} fill="currentColor" />
      </span>
    </div>
  )
}

// ─── Steps row ───────────────────────────────────────────────────────

function StepsRow() {
  const steps = [
    {
      n: "01",
      t: "Pin the icon",
      d: "Click the puzzle piece in your toolbar, then pin Refine so it’s one click away.",
      mock: <PinMock />,
    },
    {
      n: "02",
      t: "Open YouTube",
      d: "Refine only runs on youtube.com. Open a tab there and it’s already working.",
      mock: <TabMock />,
    },
    {
      n: "03",
      t: "Open the popup",
      d: "Click the Refine icon and flip whatever you don’t want to see.",
      mock: <PopupMock />,
    },
  ]
  return (
    <section style={{ padding: "8px 0 56px" }}>
      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22,
          marginTop: 16,
        }}>
        {steps.map((s) => (
          <div key={s.n}>
            <div
              style={{
                height: 150,
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--hairline-2)",
                background: "var(--cream-2)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {s.mock}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 11,
                marginTop: 18,
              }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                  fontSize: 13,
                  color: "var(--clay)",
                  fontWeight: 600,
                }}>
                {s.n}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17.5,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}>
                {s.t}
              </h3>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}>
              {s.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Presets ─────────────────────────────────────────────────────────

function Presets() {
  const cards = [
    {
      id: "focused",
      Icon: Crosshair,
      name: "Focused",
      d: "Everything off-page, hidden. Shorts, recommendations, end screens — gone.",
      meta: "12 hidden",
      primary: true,
    },
    {
      id: "watchonly",
      Icon: MonitorPlay,
      name: "Watch-only",
      d: "Keeps the homepage, kills the watch-page sidebar and comments.",
      meta: "7 hidden",
      primary: false,
    },
    {
      id: "minimal",
      Icon: CircleMinus,
      name: "Minimal",
      d: "Nothing hidden yet. Master switch on — toggle elements as you go.",
      meta: "0 hidden",
      primary: false,
    },
  ]
  return (
    <section style={{ padding: "8px 0 56px" }}>
      <div className="wrap">
        <div className="eyebrow-c" style={{ marginBottom: 22 }}>
          <span className="eyebrow">TRY ONE OF THESE</span>
          <span className="rule" />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 28,
          }}>
          {cards.map((c) => {
            const I = c.Icon
            return (
              <a
                key={c.id}
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  background: c.primary ? "var(--ink)" : "var(--paper)",
                  border: `1px solid ${c.primary ? "var(--ink)" : "var(--hairline-2)"}`,
                  borderRadius: "var(--r-lg)",
                  padding: 22,
                  display: "block",
                  color: c.primary ? "var(--cream)" : "var(--ink)",
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: c.primary ? "rgba(255,255,255,0.12)" : "var(--cream-2)",
                      color: c.primary ? "var(--cream)" : "var(--ink-2)",
                    }}>
                    <I size={20} strokeWidth={c.primary ? 2.4 : 1.85} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      color: c.primary ? "rgba(251,250,245,0.6)" : "var(--subtle)",
                    }}>
                    {c.meta}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    marginTop: 16,
                  }}>
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    marginTop: 7,
                    color: c.primary ? "rgba(251,250,245,0.72)" : "var(--muted)",
                  }}>
                  {c.d}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 16,
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: c.primary ? "var(--cream)" : "var(--clay)",
                  }}>
                  Apply
                  <ArrowRight size={15} />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Hotkey hint ─────────────────────────────────────────────────────

function HotkeyHint() {
  return (
    <section style={{ padding: "8px 0 64px" }}>
      <div className="wrap">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "22px 26px",
            borderRadius: 13,
            background: "var(--cream-2)",
            border: "1px solid var(--hairline-2)",
            flexWrap: "wrap",
          }}>
          <span
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "var(--paper)",
              border: "1px solid var(--hairline-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink)",
              flexShrink: 0,
            }}>
            <Power size={20} strokeWidth={2.4} />
          </span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
              One hotkey to pause
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 3 }}>
              Press <span className="kbd">⌘⇧Y</span> to bring everything back on the current tab.
              Press it again to hide it.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", padding: "34px 0 44px" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
        <BrandMark size="sm" />
        <div style={{ display: "flex", gap: 22, fontSize: 13.5 }}>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Heart size={14} />
            Donate
          </a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Lightbulb size={14} />
            Request a feature
          </a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <LifeBuoy size={14} />
            Support
          </a>
          <Link
            href="/"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}>
            <Plus size={14} />
            Home
          </Link>
        </div>
      </div>
    </footer>
  )
}
