import type { CSSProperties, MouseEvent, ReactNode } from "react"

import { Ico } from "./icons"

// ─── Switch ─────────────────────────────────────────────────────────────────
//
// Grayscale per design: off = inset track + muted knob, on = solid fg track +
// bg knob. Two sizes; same dimensions as `popup-kit.jsx`.

type SwitchSize = "sm" | "md"

export function Switch({
  on,
  indeterminate,
  onClick,
  size = "md",
  disabled
}: {
  on: boolean
  indeterminate?: boolean
  onClick: (e: MouseEvent) => void
  size?: SwitchSize
  disabled?: boolean
}) {
  // Indeterminate = some-but-not-all on. Knob sits centered, track is half
  // filled. aria-checked="mixed" is the spec-compliant value.
  const stateClass = indeterminate
    ? "rf-switch--mixed"
    : on
      ? "rf-switch--on"
      : ""
  return (
    <button
      type="button"
      role="switch"
      aria-checked={indeterminate ? "mixed" : on}
      disabled={disabled}
      onClick={onClick}
      className={`rf-switch rf-switch--${size} ${stateClass}`}>
      <span className="rf-switch__knob" />
    </button>
  )
}

// ─── Row ────────────────────────────────────────────────────────────────────

export function Row({
  icon,
  label,
  hint,
  on,
  onToggle,
  nested,
  dense
}: {
  icon?: string
  label: string
  hint?: string
  on: boolean
  onToggle: () => void
  nested?: boolean
  dense?: boolean
}) {
  return (
    <div
      className={`rf-row ${nested ? "rf-row--nested" : ""} ${dense ? "rf-row--dense" : ""} ${
        on ? "rf-row--on" : ""
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}>
      {icon && (
        <span className="rf-row__icon">
          <Ico name={icon} size={16} />
        </span>
      )}
      <div className="rf-row__main">
        <div className="rf-row__label">{label}</div>
        {hint && <div className="rf-row__hint">{hint}</div>}
      </div>
      <Switch
        on={on}
        size={dense ? "sm" : "md"}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      />
    </div>
  )
}

// ─── Mark (logo) ────────────────────────────────────────────────────────────

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <div
      className="rf-mark"
      style={{ width: size, height: size, borderRadius: 6 } as CSSProperties}>
      <svg
        viewBox="35 35 110 110"
        fill="currentColor"
        width={Math.round(size * 0.92)}
        height={Math.round(size * 0.92)}
        aria-hidden="true">
        <path d="M40 60C40 48.9543 48.9543 40 60 40V123H40V60Z" />
        <rect x="80" y="80" width="20" height="20" />
        <rect x="100" y="60" width="20" height="20" />
        <rect x="120" y="40" width="20" height="20" />
        <path d="M120 80H140V120C140 131.046 131.046 140 120 140V140V80Z" />
        <path d="M40 60C40 48.9543 48.9543 40 60 40L100 40V60L40 60Z" />
        <path d="M140 120C140 131.046 131.046 140 120 140H60V120L140 120Z" />
      </svg>
    </div>
  )
}

// ─── Kbd ────────────────────────────────────────────────────────────────────

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rf-kbd">{children}</kbd>
}
