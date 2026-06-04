"use client"

import { useEffect, useState } from "react"

// Deterministic mulberry32 PRNG so SSR and CSR produce the same layout.
function rng(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Hairline confetti drifts in once on mount. Honors prefers-reduced-motion.
export function Confetti() {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80)
    return () => clearTimeout(t)
  }, [])

  const r = rng(20260601)
  const strokes = Array.from({ length: 34 }, () => {
    const left = r() * 100
    const top = 6 + r() * 78
    const len = 12 + r() * 18
    const rot = r() * 180 - 90
    const clay = r() > 0.72
    const op = 0.1 + r() * 0.16
    const alpha = clay ? op + 0.16 : op
    const color = clay
      ? `rgba(185,84,58,${alpha.toFixed(2)})`
      : `rgba(27,26,22,${alpha.toFixed(2)})`
    return { left, top, len, rot, color, d: r() * 360 }
  })

  return (
    <>
      <style>{`
        .rf-stroke { position: absolute; }
        .rf-stroke-inner { display: block; border-radius: 999px; opacity: 0; transform: translateY(-14px); }
        .rf-stroke-inner.go { animation: rf-drift 760ms cubic-bezier(.2,0,0,1) forwards; animation-delay: var(--d); }
        @keyframes rf-drift {
          0%   { opacity: 0; transform: translateY(-14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-stroke-inner { opacity: 1; transform: none; }
          .rf-stroke-inner.go { animation: none; }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}>
        {strokes.map((s, i) => (
          <span
            key={i}
            className="rf-stroke"
            style={{ left: `${s.left}%`, top: `${s.top}%`, transform: `rotate(${s.rot}deg)` }}>
            <span
              className={`rf-stroke-inner${go ? " go" : ""}`}
              style={
                {
                  width: s.len,
                  height: 2.5,
                  background: s.color,
                  "--d": `${s.d}ms`,
                } as React.CSSProperties
              }
            />
          </span>
        ))}
      </div>
    </>
  )
}
