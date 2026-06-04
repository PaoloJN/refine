import type { CSSProperties, ReactNode } from "react"

import { Icon, type IconName } from "./icons"

export const FONT_MONO =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace"
export const FONT_SANS =
  "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"

// ─── Frame: exact-size canvas with theme tokens ──────────────────────

export function CwsFrame({
  width,
  height,
  children,
  style,
}: {
  width: number
  height: number
  themeName?: "light" | "dark"
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div className="cws-frame" style={{ width, height, ...style }}>
      {children}
    </div>
  )
}

// ─── Refine brand mark — single SVG, clipPath squircle, currentColor.
// Construction mirrors snipprompt's BracketMark: one self-contained
// SVG, no wrapper div. `color` controls the ink body; `glyphColor`
// controls the `R` paths drawn over it.

export function RefineMark({
  size = 24,
  color = "currentColor",
  glyphColor = "var(--cream)",
  style,
}: {
  size?: number
  color?: string
  glyphColor?: string
  style?: CSSProperties
}) {
  const id = `rf-mark-${size}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Refine"
      style={{ flex: "0 0 auto", display: "block", color, ...style }}>
      <defs>
        <clipPath id={id}>
          <rect width="180" height="180" rx="40" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="180" height="180" fill="currentColor" />
        <g fill={glyphColor}>
          <path d="M40 60C40 48.9543 48.9543 40 60 40V123H40V60Z" />
          <rect x="80" y="80" width="20" height="20" />
          <rect x="100" y="60" width="20" height="20" />
          <rect x="120" y="40" width="20" height="20" />
          <path d="M120 80H140V120C140 131.046 131.046 140 120 140V140V80Z" />
          <path d="M40 60C40 48.9543 48.9543 40 60 40L100 40V60L40 60Z" />
          <path d="M140 120C140 131.046 131.046 140 120 140H60V120L140 120Z" />
        </g>
      </g>
    </svg>
  )
}

// ─── Bare `R` glyph — single color, no squircle wrapper. ─────────────

export function RefineGlyph({
  size = 32,
  color = "currentColor",
  style,
}: {
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill={color}
      aria-label="Refine"
      style={{ flex: "0 0 auto", display: "block", ...style }}>
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

// ─── Brand wordmark ──────────────────────────────────────────────────

export function BrandMark({
  size = "md",
  sub,
}: {
  size?: "sm" | "md" | "lg"
  sub?: string
}) {
  const s = { sm: 18, md: 22, lg: 28 }[size]
  const fs = { sm: 15, md: 18, lg: 23 }[size]
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <RefineMark size={s} />
      <span
        style={{
          fontWeight: 600,
          fontSize: fs,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}>
        refine
      </span>
      {sub && (
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: "var(--subtle)",
            letterSpacing: "0.02em",
          }}>
          {sub}
        </span>
      )}
    </div>
  )
}

// ─── Editorial left-block: eyebrow + headline + support ──────────────

export function EditorialBlock({
  num,
  label,
  headline,
  support,
  headlineSize = 50,
  width,
  style,
}: {
  num: string
  label: string
  headline: ReactNode
  support: string
  headlineSize?: number
  width?: number
  style?: CSSProperties
}) {
  return (
    <div style={{ width, ...style }}>
      <div className="eyebrow">
        <span className="num">{num}</span>&nbsp;—&nbsp;{label}
      </div>
      <h1
        className="headline"
        style={{ fontSize: headlineSize, marginTop: 24 }}>
        {headline}
      </h1>
      <p className="support" style={{ marginTop: 24, maxWidth: 430 }}>
        {support}
      </p>
    </div>
  )
}

// ─── Caption strip ───────────────────────────────────────────────────

export function CaptionStrip({ cells }: { cells: [string, string][] }) {
  return (
    <div className="caption-strip">
      {cells.map((c, i) => (
        <div key={i} className="caption-cell">
          <span className="caption-label">{c[0]}</span>
          <span className="caption-value">{c[1]}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Annotation label (used in shot #02) ─────────────────────────────

export function Anno({ top, text }: { top: number; text: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        display: "flex",
        alignItems: "center",
      }}>
      <span style={{ width: 46, height: 1, background: "var(--hairline-3)" }} />
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: "var(--ink)",
          marginLeft: -3,
        }}
      />
      <span
        style={{
          marginLeft: 12,
          fontFamily: FONT_MONO,
          fontSize: 13,
          letterSpacing: "0.02em",
          color: "var(--ink-2)",
          whiteSpace: "nowrap",
        }}>
        {text}
      </span>
    </div>
  )
}

// ─── Placeholder slot — drop a real YouTube screenshot in here ───────

export function Placeholder({
  width,
  height,
  hint = "Drop a YouTube screenshot here",
  style,
}: {
  width?: number | string
  height?: number | string
  hint?: string
  style?: CSSProperties
}) {
  return (
    <div className="placeholder" style={{ width, height, ...style }}>
      <span>{hint}</span>
    </div>
  )
}

// ─── 6 groups × 16 toggles. `on` = element is hidden. ────────────────
// Labels mirror the extension's MODEL where they can; the structure
// matches the Claude Design popup (Feed / Shorts / Recommendations /
// Watch page / Comments / Chrome).

export type RToggle = {
  id: string
  label: string
  icon: IconName | string
  on: boolean
}

export type RGroup = {
  group: string
  items: RToggle[]
}

export const RMODEL: RGroup[] = [
  {
    group: "Feed",
    items: [
      { id: "home", label: "Home feed", icon: "house", on: true },
      { id: "explore", label: "Explore & Trending", icon: "compass", on: true },
      { id: "subs", label: "Subscriptions grid", icon: "squares-four", on: false },
    ],
  },
  {
    group: "Shorts",
    items: [
      { id: "shorts", label: "Shorts shelf", icon: "play-circle", on: true },
      { id: "shortsside", label: "Shorts in sidebar", icon: "rows", on: true },
    ],
  },
  {
    group: "Recommendations",
    items: [
      { id: "watchnext", label: "Watch-next sidebar", icon: "sidebar-simple", on: true },
      { id: "endfeed", label: "End-screen feed", icon: "grid-four", on: true },
      { id: "infocards", label: "Info cards", icon: "cards-three", on: true },
    ],
  },
  {
    group: "Watch page",
    items: [
      { id: "livechat", label: "Live chat", icon: "chat-circle-dots", on: true },
      { id: "autoplay", label: "Autoplay next", icon: "skip-forward", on: false },
      { id: "merch", label: "Merch shelf", icon: "tag", on: true },
    ],
  },
  {
    group: "Comments",
    items: [
      { id: "comments", label: "Comments", icon: "chat-text", on: true },
      { id: "avatars", label: "Profile photos", icon: "user-circle", on: false },
    ],
  },
  {
    group: "Chrome",
    items: [
      { id: "notif", label: "Notifications", icon: "bell", on: true },
      { id: "search", label: "Search suggestions", icon: "magnifying-glass", on: false },
      { id: "header", label: "Top header", icon: "layout", on: true },
    ],
  },
]

function countAll(model: RGroup[], all: boolean) {
  let on = 0
  let total = 0
  model.forEach((g) =>
    g.items.forEach((it) => {
      total++
      if (all || it.on) on++
    }),
  )
  return { on, total }
}

// ─── Switch ──────────────────────────────────────────────────────────

function Switch({ on, size = "md" }: { on: boolean; size?: "sm" | "md" }) {
  const d = { sm: { w: 30, h: 18, k: 12, p: 3 }, md: { w: 34, h: 20, k: 14, p: 3 } }[size]
  const travel = d.w - d.k - d.p * 2
  return (
    <span
      style={{
        position: "relative",
        flexShrink: 0,
        width: d.w,
        height: d.h,
        borderRadius: 999,
        background: on ? "var(--ink)" : "var(--cream-2)",
        border: `1px solid ${on ? "var(--ink)" : "var(--hairline-3)"}`,
        display: "inline-block",
      }}>
      <span
        style={{
          position: "absolute",
          top: d.p - 1,
          left: d.p - 1,
          width: d.k,
          height: d.k,
          borderRadius: 999,
          transform: on ? `translateX(${travel}px)` : "translateX(0)",
          background: on ? "var(--paper)" : "var(--faint)",
        }}
      />
    </span>
  )
}

// ─── Toggle row ──────────────────────────────────────────────────────

function Row({ it, dense }: { it: RToggle; dense?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: dense ? "7px 14px" : "8px 14px",
      }}>
      <span
        style={{
          width: 18,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          color: it.on ? "var(--ink-2)" : "var(--faint)",
        }}>
        <Icon name={it.icon} size={16} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
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
        </div>
      </div>
      <Switch on={it.on} size={dense ? "sm" : "md"} />
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────

function Header({
  subtitle = "youtube.com",
  active = true,
}: {
  subtitle?: string
  active?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
        height: 56,
        borderBottom: "1px solid var(--hairline)",
      }}>
      <RefineMark size={26} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
          Refine
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 3,
            lineHeight: 1,
          }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: active ? "var(--clay)" : "var(--faint)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontFamily: FONT_MONO,
              color: "var(--subtle)",
            }}>
            {subtitle}
          </span>
        </div>
      </div>
      <button
        type="button"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          background: active ? "var(--cream-2)" : "transparent",
          color: active ? "var(--ink)" : "var(--faint)",
        }}>
        <Icon name="power" size={16} weight={active ? "bold" : "regular"} />
      </button>
    </div>
  )
}

// ─── Meter bar ───────────────────────────────────────────────────────

function MeterBar({ on, total }: { on: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
        borderBottom: "1px solid var(--hairline)",
      }}>
      <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>
        {on} of {total} hidden
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 64,
            height: 4,
            borderRadius: 999,
            background: "var(--cream-3)",
            overflow: "hidden",
          }}>
          <div
            style={{
              width: `${(on / total) * 100}%`,
              height: "100%",
              borderRadius: 999,
              background: "var(--ink)",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "var(--subtle)",
          }}>
          {on}/{total}
        </span>
      </div>
    </div>
  )
}

// ─── Grouped list ────────────────────────────────────────────────────

function GroupList({
  model,
  openSet,
  forceAllOn,
  maxH,
}: {
  model: RGroup[]
  openSet: Set<string>
  forceAllOn?: boolean
  maxH?: number
}) {
  return (
    <div style={{ maxHeight: maxH, overflowY: "hidden" }}>
      {model.map((g) => {
        const items = forceAllOn ? g.items.map((it) => ({ ...it, on: true })) : g.items
        const grpOn = items.filter((it) => it.on).length
        const allOn = grpOn === items.length
        const isOpen = openSet.has(g.group)
        return (
          <div key={g.group} style={{ borderBottom: "1px solid var(--hairline)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
              }}>
              <Icon
                name="caret-right"
                size={11}
                style={{
                  color: "var(--subtle)",
                  transform: isOpen ? "rotate(90deg)" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}>
                {g.group}
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontFamily: FONT_MONO,
                  color: "var(--subtle)",
                }}>
                {grpOn}/{items.length}
              </span>
              <span style={{ marginLeft: "auto" }}>
                <Switch on={allOn} size="sm" />
              </span>
            </div>
            {isOpen &&
              items.map((it) => (
                <Row key={it.id} it={it} dense />
              ))}
          </div>
        )
      })}
    </div>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "8px 10px",
        borderTop: "1px solid var(--hairline)",
      }}>
      {[
        ["heart", "Donate"],
        ["lightbulb", "Request"],
      ].map(([ic, lbl]) => (
        <span
          key={lbl}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 9px",
            fontSize: 11.5,
            color: "var(--muted)",
          }}>
          <Icon name={ic} size={14} />
          {lbl}
        </span>
      ))}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 7,
          paddingRight: 4,
        }}>
        <span style={{ fontSize: 11, color: "var(--subtle)" }}>pause</span>
        <span className="kbd">⌘⇧Y</span>
      </div>
    </div>
  )
}

// ─── The popup, all variants ─────────────────────────────────────────

type Variant = "default" | "all" | "paused" | "presets"

export function RefinePopup({
  variant = "default",
  width = 344,
  listMaxH,
  openGroups,
}: {
  variant?: Variant
  width?: number
  listMaxH?: number
  openGroups?: string[]
}) {
  const Wrap = ({ children }: { children: ReactNode }) => (
    <div
      style={{
        width,
        background: "var(--paper)",
        borderRadius: 14,
        border: "1px solid var(--hairline-2)",
        overflow: "hidden",
        fontFamily: FONT_SANS,
        color: "var(--ink)",
        boxShadow: "var(--shadow-pop)",
      }}>
      {children}
    </div>
  )

  if (variant === "paused") {
    return (
      <Wrap>
        <Header active={false} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 30px 34px",
          }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--cream-2)",
              border: "1px solid var(--hairline-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink)",
              marginBottom: 16,
            }}>
            <Icon name="power" size={26} weight="bold" />
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Refine is paused on this tab
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--muted)",
              marginTop: 7,
              lineHeight: 1.5,
              maxWidth: 244,
            }}>
            Everything you hid is back for now. Resume whenever you want it gone again.
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 38,
              marginTop: 20,
              padding: "0 18px",
              borderRadius: 9,
              background: "var(--ink)",
              color: "var(--cream)",
              fontSize: 13,
              fontWeight: 500,
            }}>
            <Icon name="power" size={15} weight="bold" />
            Resume
          </span>
        </div>
        <Footer />
      </Wrap>
    )
  }

  if (variant === "presets") {
    const tiles = [
      {
        id: "focused",
        icon: "crosshair-simple",
        name: "Focused",
        desc: "Everything off-page, hidden",
        meta: "12 hidden",
        primary: true,
      },
      {
        id: "watchonly",
        icon: "monitor-play",
        name: "Watch-only",
        desc: "Kills sidebar + comments",
        meta: "7 hidden",
        primary: false,
      },
      {
        id: "minimal",
        icon: "minus-circle",
        name: "Minimal",
        desc: "Master only — toggle as you go",
        meta: "0 hidden",
        primary: false,
      },
    ]
    return (
      <Wrap>
        <Header />
        <div style={{ padding: "18px 15px 6px" }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Pick a starting point
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            You can tune every element afterward.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px 15px 4px",
          }}>
          {tiles.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 13px",
                borderRadius: 11,
                textAlign: "left",
                background: t.primary ? "var(--ink)" : "var(--paper)",
                border: `1px solid ${t.primary ? "var(--ink)" : "var(--hairline-2)"}`,
                color: t.primary ? "var(--cream)" : "var(--ink)",
              }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: t.primary ? "rgba(255,255,255,0.12)" : "var(--cream-2)",
                  color: t.primary ? "var(--cream)" : "var(--ink-2)",
                }}>
                <Icon name={t.icon} size={18} weight={t.primary ? "bold" : "regular"} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}>
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    marginTop: 2,
                    color: t.primary ? "rgba(251,250,245,0.7)" : "var(--muted)",
                  }}>
                  {t.desc}
                </div>
              </div>
              <span
                style={{
                  fontSize: 10.5,
                  fontFamily: FONT_MONO,
                  color: t.primary ? "rgba(251,250,245,0.6)" : "var(--subtle)",
                  whiteSpace: "nowrap",
                }}>
                {t.meta}
              </span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "12px 0 16px" }}>
          <span
            style={{
              fontSize: 12,
              color: "var(--muted)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}>
            I&apos;ll configure manually
          </span>
        </div>
      </Wrap>
    )
  }

  // default / all
  const allOn = variant === "all"
  const openSet = new Set(
    openGroups ??
      (allOn
        ? ["Feed", "Shorts", "Recommendations", "Watch page", "Comments", "Chrome"]
        : ["Feed"]),
  )
  const { on, total } = countAll(RMODEL, allOn)
  return (
    <Wrap>
      <Header />
      <MeterBar on={on} total={total} />
      <GroupList
        model={RMODEL}
        openSet={openSet}
        forceAllOn={allOn}
        maxH={listMaxH ?? (allOn ? 520 : 318)}
      />
      <Footer />
    </Wrap>
  )
}

// ─── Watch page wireframe (CSS-only, no YouTube branding) ────────────

const Bar = ({
  w = "100%",
  h = 8,
  r = 4,
  c = "var(--hairline-2)",
  style,
}: {
  w?: number | string
  h?: number
  r?: number
  c?: string
  style?: CSSProperties
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: c,
      ...style,
    }}
  />
)

export function WatchPage({ refined = false }: { refined?: boolean }) {
  const ink = "var(--hairline-3)"
  const soft = "var(--cream-2)"
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 16px",
          borderBottom: "1px solid var(--hairline)",
          flexShrink: 0,
        }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: ink }} />
        <Bar w={62} h={9} c={ink} />
        <div style={{ flex: 1 }} />
        {!refined && <Bar w={180} h={20} r={10} c={soft} />}
        <div style={{ flex: refined ? 1 : 0 }} />
        {!refined && <Bar w={16} h={16} r={8} c={ink} />}
        <div style={{ width: 22, height: 22, borderRadius: 999, background: ink }} />
      </div>
      <div style={{ display: "flex", gap: 16, padding: 16, flex: 1, minHeight: 0 }}>
        <div
          style={{
            flex: refined ? "0 0 72%" : "0 0 64%",
            display: "flex",
            flexDirection: "column",
            margin: refined ? "0 auto" : 0,
            minWidth: 0,
          }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 10,
              background: "#26241e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "12px 0 12px 20px",
                borderColor: "transparent transparent transparent rgba(251,250,245,0.85)",
                marginLeft: 4,
              }}
            />
            {!refined && (
              <div
                style={{
                  position: "absolute",
                  inset: "14% 8%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  alignItems: "center",
                }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "16 / 9",
                      borderRadius: 6,
                      background: "rgba(251,250,245,0.16)",
                      border: "1px solid rgba(251,250,245,0.22)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            <Bar w="82%" h={11} c={ink} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Bar w="48%" h={9} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginTop: 14,
            }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, background: ink }} />
            <Bar w={90} h={8} c={ink} />
            <div style={{ flex: 1 }} />
            {!refined && <Bar w={64} h={22} r={11} c={soft} />}
            {!refined && <Bar w={44} h={22} r={11} c={soft} />}
          </div>
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 9,
              background: soft,
              display: "flex",
              flexDirection: "column",
              gap: 7,
            }}>
            <Bar w="40%" h={8} c={ink} />
            <Bar w="100%" h={7} />
            <Bar w="92%" h={7} />
            {!refined && (
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 52,
                      height: 30,
                      borderRadius: 6,
                      background: "var(--clay-soft)",
                      border: "1px solid var(--clay-line)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          {!refined && (
            <div
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}>
              <Bar w="30%" h={8} c={ink} />
              {[0, 1].map((i) => (
                <div key={i} style={{ display: "flex", gap: 9 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: ink,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}>
                    <Bar w="34%" h={6} />
                    <Bar w="90%" h={6} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!refined && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 11,
              minWidth: 0,
            }}>
            <div style={{ display: "flex", gap: 7 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    aspectRatio: "9 / 15",
                    borderRadius: 7,
                    background: soft,
                    border: "1px solid var(--hairline)",
                  }}
                />
              ))}
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: 9 }}>
                <div
                  style={{
                    width: "42%",
                    aspectRatio: "16 / 9",
                    borderRadius: 7,
                    background: "#2c2a23",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    paddingTop: 3,
                  }}>
                  <Bar w="100%" h={7} c={ink} />
                  <Bar w="70%" h={6} />
                  <Bar w="48%" h={6} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Before / after split with a labeled seam ────────────────────────

export function SplitWatch({
  height = 360,
  radius = 14,
  labels = ["off", "on"],
}: {
  height?: number
  radius?: number
  labels?: [string, string]
}) {
  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: radius,
        overflow: "hidden",
        border: "1px solid var(--hairline-2)",
        boxShadow: "var(--shadow-card)",
        background: "var(--paper)",
      }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <WatchPage refined={false} />
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden", background: "var(--cream)" }}>
          <WatchPage refined={true} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1,
          background: "var(--ink)",
          transform: "translateX(-0.5px)",
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
        <span style={{ padding: "0 9px", opacity: 0.55 }}>{labels[0]}</span>
        <span style={{ width: 1, height: 12, background: "rgba(251,250,245,0.3)" }} />
        <span style={{ padding: "0 9px", fontWeight: 600 }}>{labels[1]}</span>
      </div>
    </div>
  )
}
