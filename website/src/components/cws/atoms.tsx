import type { CSSProperties, ReactNode } from "react"

export const FONT_MONO =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace"
export const FONT_SANS =
  "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"

// ─── Frame: exact-size canvas with theme tokens ──────────────────────

export function CwsFrame({
  width,
  height,
  themeName = "light",
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
    <div
      data-rf-theme={themeName}
      className="cws-frame"
      style={{ width, height, ...style }}>
      {children}
    </div>
  )
}

// ─── Refine brand mark (matches assets/logo.svg) ─────────────────────

export function RefineMark({
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
      style={{ flex: "0 0 auto", color, ...style }}>
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

// ─── Kbd chip ────────────────────────────────────────────────────────

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 18,
        height: 18,
        padding: "0 5px",
        background: "var(--rf-kbd-bg)",
        border: "1px solid var(--rf-kbd-border)",
        borderRadius: 4,
        fontFamily: FONT_MONO,
        fontSize: 10.5,
        fontWeight: 500,
        color: "var(--rf-kbd-fg)",
        lineHeight: 1,
      }}>
      {children}
    </kbd>
  )
}

// ─── Eyebrow + headline + sub — the editorial left-block ─────────────

export function EditorialBlock({
  eyebrow,
  headline,
  sub,
  width = 420,
  style,
}: {
  eyebrow: string
  headline: ReactNode
  sub: string
  width?: number
  style?: CSSProperties
}) {
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 18, ...style }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 600,
          color: "var(--rf-fg-subtle)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
        {eyebrow}
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: FONT_SANS,
          fontSize: 60,
          lineHeight: 1.04,
          fontWeight: 600,
          letterSpacing: "-0.028em",
          color: "var(--rf-fg)",
        }}>
        {headline}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: FONT_SANS,
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--rf-fg-muted)",
          letterSpacing: "-0.005em",
        }}>
        {sub}
      </p>
    </div>
  )
}

// ─── Footer captions strip — three UPPERCASE label · value pairs ─────

export function CaptionStrip({
  items,
  style,
}: {
  items: { label: string; value: string }[]
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: 32,
        padding: "20px 60px",
        borderTop: "1px solid var(--rf-border)",
        background: "var(--rf-bg)",
        ...style,
      }}>
      {items.map((it) => (
        <div
          key={it.label}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 10,
              fontWeight: 600,
              color: "var(--rf-fg-subtle)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
            {it.label}
          </span>
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--rf-fg)",
              letterSpacing: "-0.005em",
            }}>
            {it.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Window chrome (for product mocks) ───────────────────────────────

export function WindowChrome({
  title,
  width,
  height,
  children,
  style,
}: {
  title?: string
  width: number | string
  height?: number | string
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        width,
        height,
        background: "var(--rf-surface)",
        border: "1px solid var(--rf-border-strong)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.04), 0 18px 36px rgba(0,0,0,0.10), 0 48px 96px rgba(0,0,0,0.16)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}>
      <div
        style={{
          height: 32,
          flex: "0 0 auto",
          background: "var(--rf-inset)",
          borderBottom: "1px solid var(--rf-border)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
        }}>
        {[
          "#ff5f57",
          "#febc2e",
          "#28c840",
        ].map((c) => (
          <span
            key={c}
            style={{
              width: 11,
              height: 11,
              borderRadius: 99,
              background: c,
              opacity: 0.78,
            }}
          />
        ))}
        {title && (
          <span
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              transform: "translateX(-16px)",
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: "var(--rf-fg-subtle)",
              letterSpacing: "0.02em",
            }}>
            {title}
          </span>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>{children}</div>
    </div>
  )
}

// ─── Refine popup mock — mirrors src/components/popup-frame.tsx ──────

export type ToggleRow = {
  id: string
  label: string
  on: boolean
  child?: boolean
}

export type ToggleGroup = {
  name: string
  count: string
  expanded?: boolean
  rows: ToggleRow[]
}

export function RefinePopupMock({
  variant = "default",
  width = 360,
  groups,
  meter = { on: 12, total: 16 },
  master = true,
  style,
}: {
  variant?: "default" | "paused" | "firstrun"
  width?: number
  groups?: ToggleGroup[]
  meter?: { on: number; total: number }
  master?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        width,
        background: "var(--rf-surface)",
        border: "1px solid var(--rf-border-strong)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.12), 0 48px 96px rgba(0,0,0,0.18)",
        fontFamily: FONT_SANS,
        ...style,
      }}>
      <PopupHeader master={master} subtitle="youtube.com" />
      {variant === "paused" && <PopupPausedBody />}
      {variant === "firstrun" && <PopupFirstRunBody />}
      {variant === "default" && (
        <>
          <PopupMeter on={meter.on} total={meter.total} />
          <PopupGroupList groups={groups ?? DEFAULT_GROUPS} />
        </>
      )}
      <PopupFooter />
    </div>
  )
}

function PopupHeader({ master, subtitle }: { master: boolean; subtitle: string }) {
  return (
    <div
      style={{
        height: 56,
        padding: "0 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid var(--rf-border)",
      }}>
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.012em",
            color: "var(--rf-fg)",
          }}>
          Refine
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "var(--rf-fg-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: 99,
              background: master ? "#7aa67a" : "var(--rf-fg-faint)",
            }}
          />
          {subtitle}
        </span>
      </div>
      <button
        style={{
          marginLeft: "auto",
          width: 28,
          height: 28,
          borderRadius: 7,
          border: "1px solid var(--rf-border)",
          background: master ? "var(--rf-fg)" : "transparent",
          color: master ? "var(--rf-surface)" : "var(--rf-fg-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        aria-label="Power">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
          <path d="M12 2v10" />
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        </svg>
      </button>
    </div>
  )
}

function PopupMeter({ on, total }: { on: number; total: number }) {
  const pct = total === 0 ? 0 : (on / total) * 100
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid var(--rf-border)",
        background: "var(--rf-inset)",
      }}>
      <span style={{ fontSize: 11.5, color: "var(--rf-fg-muted)", letterSpacing: "-0.005em" }}>
        Elements hidden
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          borderRadius: 99,
          background: "var(--rf-border)",
          overflow: "hidden",
          position: "relative",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct}%`,
            background: "var(--rf-fg)",
          }}
        />
      </div>
      <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "var(--rf-fg)" }}>
        {on}/{total}
      </span>
    </div>
  )
}

function PopupGroupList({ groups }: { groups: ToggleGroup[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {groups.map((g) => (
        <div key={g.name} style={{ borderBottom: "1px solid var(--rf-border)" }}>
          <div
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--rf-surface)",
            }}>
            <svg
              width={11}
              height={11}
              viewBox="0 0 16 16"
              style={{
                color: "var(--rf-fg-subtle)",
                transform: g.expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 120ms",
              }}>
              <path d="M5 4l5 4-5 4z" fill="currentColor" />
            </svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--rf-fg)" }}>
              {g.name}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONT_MONO,
                fontSize: 10.5,
                color: "var(--rf-fg-subtle)",
              }}>
              {g.count}
            </span>
          </div>
          {g.expanded && (
            <div style={{ padding: "4px 0 8px" }}>
              {g.rows.map((r) => (
                <PopupRow key={r.id} row={r} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PopupRow({ row }: { row: ToggleRow }) {
  return (
    <div
      style={{
        height: 32,
        padding: row.child ? "0 14px 0 38px" : "0 14px 0 24px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
      <span
        style={{
          fontSize: 12.5,
          color: row.child ? "var(--rf-fg-muted)" : "var(--rf-fg)",
          letterSpacing: "-0.005em",
        }}>
        {row.label}
      </span>
      <Switch on={row.on} style={{ marginLeft: "auto" }} />
    </div>
  )
}

function Switch({ on, style }: { on: boolean; style?: CSSProperties }) {
  return (
    <span
      style={{
        width: 28,
        height: 16,
        borderRadius: 99,
        background: on ? "var(--rf-fg)" : "var(--rf-border-strong)",
        position: "relative",
        flex: "0 0 auto",
        transition: "background 120ms",
        ...style,
      }}>
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 14 : 2,
          width: 12,
          height: 12,
          borderRadius: 99,
          background: on ? "var(--rf-surface)" : "var(--rf-fg-faint)",
          transition: "left 120ms",
        }}
      />
    </span>
  )
}

function PopupFooter() {
  return (
    <div
      style={{
        height: 38,
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderTop: "1px solid var(--rf-border)",
        background: "var(--rf-footer)",
      }}>
      {[
        { label: "Donate" },
        { label: "Request" },
        { label: "Support" },
      ].map((l) => (
        <span
          key={l.label}
          style={{
            fontFamily: FONT_MONO,
            fontSize: 10.5,
            color: "var(--rf-fg-muted)",
            letterSpacing: "0.04em",
            textTransform: "lowercase",
          }}>
          {l.label.toLowerCase()}
        </span>
      ))}
      <span
        style={{
          marginLeft: "auto",
          width: 22,
          height: 22,
          borderRadius: 6,
          border: "1px solid var(--rf-border)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--rf-fg-muted)",
        }}>
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </span>
    </div>
  )
}

function PopupPausedBody() {
  return (
    <div
      style={{
        padding: "44px 24px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        textAlign: "center",
      }}>
      <span
        style={{
          width: 52,
          height: 52,
          borderRadius: 99,
          background: "var(--rf-inset)",
          border: "1px solid var(--rf-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--rf-fg-muted)",
        }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <path d="M12 2v10" />
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        </svg>
      </span>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--rf-fg)",
          letterSpacing: "-0.012em",
        }}>
        Refine is paused
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--rf-fg-muted)",
          lineHeight: 1.5,
          maxWidth: 240,
        }}>
        Nothing on this tab is being hidden. Resume to put your settings back.
      </div>
      <button
        style={{
          marginTop: 6,
          height: 32,
          padding: "0 14px",
          borderRadius: 7,
          border: "none",
          background: "var(--rf-fg)",
          color: "var(--rf-surface)",
          fontSize: 12.5,
          fontWeight: 500,
          fontFamily: FONT_SANS,
          letterSpacing: "-0.005em",
          cursor: "pointer",
        }}>
        Resume on this site
      </button>
      <span
        style={{
          marginTop: 8,
          fontFamily: FONT_MONO,
          fontSize: 10.5,
          color: "var(--rf-fg-subtle)",
          display: "inline-flex",
          gap: 4,
        }}>
        or <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>Y</Kbd>
      </span>
    </div>
  )
}

function PopupFirstRunBody() {
  const tiles = [
    {
      name: "Focused",
      sub: "Recommended default",
      count: "12 toggles",
      selected: true,
    },
    {
      name: "Watch-only",
      sub: "Player + title only",
      count: "16 toggles",
      selected: false,
    },
    {
      name: "Minimal",
      sub: "Master toggle alone",
      count: "0 toggles",
      selected: false,
    },
  ]
  return (
    <div style={{ padding: "18px 14px 12px" }}>
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--rf-fg)",
          marginBottom: 4,
          letterSpacing: "-0.005em",
        }}>
        Pick a starting point
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: "var(--rf-fg-muted)",
          marginBottom: 12,
          lineHeight: 1.45,
        }}>
        You can change anything later, one toggle at a time.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tiles.map((t) => (
          <div
            key={t.name}
            style={{
              padding: "10px 12px",
              border: "1px solid",
              borderColor: t.selected ? "var(--rf-fg)" : "var(--rf-border)",
              background: t.selected ? "var(--rf-inset)" : "var(--rf-surface)",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 99,
                border: `1.5px solid ${t.selected ? "var(--rf-fg)" : "var(--rf-border-strong)"}`,
                background: t.selected ? "var(--rf-fg)" : "transparent",
                position: "relative",
                flex: "0 0 auto",
              }}>
              {t.selected && (
                <span
                  style={{
                    position: "absolute",
                    inset: 3,
                    borderRadius: 99,
                    background: "var(--rf-surface)",
                  }}
                />
              )}
            </span>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--rf-fg)" }}>
                {t.name}
              </span>
              <span style={{ fontSize: 11, color: "var(--rf-fg-muted)" }}>{t.sub}</span>
            </div>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONT_MONO,
                fontSize: 10.5,
                color: "var(--rf-fg-subtle)",
              }}>
              {t.count}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
        <button
          style={{
            flex: 1,
            height: 32,
            border: "none",
            borderRadius: 7,
            background: "var(--rf-fg)",
            color: "var(--rf-surface)",
            fontFamily: FONT_SANS,
            fontSize: 12.5,
            fontWeight: 500,
            letterSpacing: "-0.005em",
            cursor: "pointer",
          }}>
          Apply Focused
        </button>
        <button
          style={{
            height: 32,
            padding: "0 12px",
            border: "1px solid var(--rf-border)",
            borderRadius: 7,
            background: "var(--rf-surface)",
            color: "var(--rf-fg-muted)",
            fontFamily: FONT_SANS,
            fontSize: 12,
            cursor: "pointer",
          }}>
          Skip
        </button>
      </div>
    </div>
  )
}

// ─── Default group payload — used by Screenshot #01 ──────────────────

export const DEFAULT_GROUPS: ToggleGroup[] = [
  {
    name: "Home",
    count: "4 of 5 hidden",
    expanded: true,
    rows: [
      { id: "home", label: "Hide home feed", on: true },
      { id: "shorts", label: "Hide shorts", on: true },
      { id: "mixes", label: "Hide mixes", on: false },
      { id: "trending", label: "Hide trending & explore", on: true },
      { id: "subscriptions", label: "Hide subscriptions feed", on: true },
    ],
  },
  { name: "Watch page", count: "6 of 8 hidden", rows: [] },
  { name: "Comments", count: "1 of 2 hidden", rows: [] },
  { name: "Chrome", count: "1 of 5 hidden", rows: [] },
]

export const ALL_EXPANDED_GROUPS: ToggleGroup[] = [
  {
    name: "Home",
    count: "4 of 5",
    expanded: true,
    rows: [
      { id: "home", label: "Hide home feed", on: true },
      { id: "shorts", label: "Hide shorts", on: true },
      { id: "mixes", label: "Hide mixes", on: false },
      { id: "trending", label: "Hide trending & explore", on: true },
      { id: "subscriptions", label: "Hide subscriptions feed", on: true },
    ],
  },
  {
    name: "Watch page",
    count: "6 of 8",
    expanded: true,
    rows: [
      { id: "sidebar", label: "Hide video sidebar", on: true },
      { id: "endfeed", label: "Hide end-screen feed", on: true },
      { id: "endcards", label: "Hide end-screen cards", on: true },
      { id: "merch", label: "Hide merch, tickets, offers", on: true },
      { id: "fundraiser", label: "Hide fundraiser", on: false },
      { id: "video-info", label: "Hide video info", on: false },
      { id: "autoplay", label: "Disable autoplay", on: true },
      { id: "annotations", label: "Disable annotations", on: true },
    ],
  },
  {
    name: "Comments",
    count: "1 of 2",
    expanded: true,
    rows: [
      { id: "comments", label: "Hide comments", on: true },
      { id: "avatars", label: "Hide profile photos", on: false, child: true },
    ],
  },
  {
    name: "Chrome",
    count: "1 of 5",
    expanded: true,
    rows: [
      { id: "notifications", label: "Hide notifications", on: false },
      { id: "search-suggest", label: "Hide search suggestions", on: false },
      { id: "inapt-search", label: "Hide inapt search results", on: false },
      { id: "more-yt", label: "Hide “More from YouTube”", on: true },
      { id: "top-header", label: "Hide top header", on: false },
    ],
  },
]

// ─── Mock YouTube watch page — half-and-half before/after ────────────

export function YouTubeMock({
  refined = false,
  width = 720,
  height = 560,
}: {
  refined?: boolean
  width?: number
  height?: number
}) {
  return (
    <div
      style={{
        width,
        height,
        background: "#fafafa",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT_SANS,
        color: "#0f0f0f",
      }}>
      {/* Top bar */}
      <div
        style={{
          height: 36,
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 10,
        }}>
        <span
          style={{
            width: 18,
            height: 12,
            borderRadius: 3,
            background: "var(--rf-yt-red)",
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 600 }}>YouTube</span>
        <div
          style={{
            marginLeft: 18,
            width: 220,
            height: 22,
            borderRadius: 99,
            border: "1px solid #ccc",
            background: "#fafafa",
          }}
        />
      </div>
      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: refined ? "1fr" : "1fr 220px",
          gap: 14,
          padding: 14,
          height: height - 36,
          boxSizing: "border-box",
        }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              aspectRatio: "16 / 9",
              background: "#0a0a0a",
              borderRadius: 8,
              position: "relative",
              overflow: "hidden",
            }}>
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 0,
                height: 0,
                borderLeft: "20px solid #fff",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
              }}
            />
            {!refined && (
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  display: "flex",
                  gap: 6,
                }}>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 56,
                      height: 32,
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.5)",
                      background: "rgba(0,0,0,0.5)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              height: 16,
              width: "78%",
              background: "#222",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 10,
              width: "40%",
              background: "#aaa",
              borderRadius: 3,
            }}
          />
          {!refined && (
            <div
              style={{
                marginTop: 10,
                height: 88,
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: 8,
                padding: 10,
              }}>
              <div style={{ height: 10, width: 110, background: "#222", borderRadius: 3 }} />
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}>
                {[60, 80, 50, 70].map((w, i) => (
                  <span
                    key={i}
                    style={{
                      width: w,
                      height: 18,
                      borderRadius: 99,
                      background: "#f4f4f4",
                      border: "1px solid #e5e5e5",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {!refined && (
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
              <div style={{ height: 10, width: 90, background: "#222", borderRadius: 3 }} />
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}>
                  <span style={{ width: 24, height: 24, borderRadius: 99, background: "#ddd" }} />
                  <span style={{ flex: 1, height: 8, background: "#ddd", borderRadius: 3 }} />
                </div>
              ))}
            </div>
          )}
        </div>
        {!refined && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                }}>
                <span
                  style={{
                    width: 88,
                    height: 50,
                    background: "#ddd",
                    borderRadius: 6,
                    flex: "0 0 auto",
                  }}
                />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ height: 9, background: "#222", borderRadius: 3 }} />
                  <span style={{ height: 7, width: "80%", background: "#aaa", borderRadius: 3 }} />
                  <span style={{ height: 7, width: "50%", background: "#aaa", borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
