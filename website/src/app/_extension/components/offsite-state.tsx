import { countHidden, type FeatureId } from "../lib/model"

import { Ico } from "./icons"

type Flags = Record<FeatureId, boolean>

const PREVIEW: { id: FeatureId; label: string; icon: string }[] = [
  { id: "home", label: "Home feed", icon: "home" },
  { id: "shorts", label: "Shorts", icon: "play-circle" },
  { id: "sidebar", label: "Video sidebar", icon: "panel-right" }
]

export function OffsiteState({ flags, onOpen }: { flags: Flags; onOpen: () => void }) {
  const { on, total } = countHidden(flags)
  const moreCount = Math.max(0, on - PREVIEW.length)

  return (
    <div className="rf-offsite">
      <div className="rf-offsite__hero">
        <div className="rf-offsite__ring" aria-hidden />
        <div className="rf-offsite__tile">
          <Ico name="youtube-logo" size={28} weight="fill" />
        </div>
        <span className="rf-offsite__dot" aria-hidden>
          <span />
        </span>
      </div>

      <div className="rf-offsite__title">Refine is asleep here</div>
      <div className="rf-offsite__body">
        It only runs on <code>youtube.com</code>. Open a tab there and your settings apply
        automatically.
      </div>

      <button className="rf-offsite__action" onClick={onOpen}>
        <Ico name="arrow-up-right" size={14} strokeWidth={2.4} />
        Open YouTube
      </button>

      <div className="rf-offsite__divider">
        <div className="rf-offsite__eyebrow">
          <span>What it'll hide there</span>
          <span className="rf-offsite__count">
            {on}/{total} on
          </span>
        </div>

        <div className="rf-offsite__list">
          {PREVIEW.map((row) => {
            const active = !!flags[row.id]
            return (
              <div
                key={row.id}
                className={`rf-offsite__row ${active ? "rf-offsite__row--on" : ""}`}>
                <span className="rf-offsite__row-icon">
                  <Ico name={row.icon} size={15} />
                </span>
                <span className="rf-offsite__row-label">{row.label}</span>
                <span
                  className={`rf-offsite__switch ${active ? "rf-offsite__switch--on" : ""}`}
                  aria-hidden>
                  <span />
                </span>
              </div>
            )
          })}
          {moreCount > 0 && (
            <div className="rf-offsite__more">+ {moreCount} more</div>
          )}
        </div>
      </div>
    </div>
  )
}
