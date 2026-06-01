import { useState } from "react"

import { MODEL, type FeatureId } from "~lib/model"

import { Ico } from "./icons"
import { Row, Switch } from "./primitives"

export function GroupList({
  flags,
  onToggle,
  onToggleMany,
  maxH = 318
}: {
  flags: Record<FeatureId, boolean>
  onToggle: (id: FeatureId) => void
  onToggleMany: (ids: FeatureId[], next: boolean) => void
  maxH?: number
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MODEL.map((g) => [g.group, true]))
  )

  return (
    <div className="rf-list" style={{ maxHeight: maxH }}>
      {MODEL.map((g) => {
        // Every id in this group, including children — bulk toggle covers
        // the full set so "Hide everything in the Watch page" really is
        // one tap.
        const ids: FeatureId[] = g.items.flatMap((it) => [
          it.id,
          ...(it.children ?? []).map((c) => c.id)
        ])
        const onCount = ids.filter((id) => flags[id]).length
        const total = ids.length
        const allOn = onCount === total
        const noneOn = onCount === 0
        const mixed = !allOn && !noneOn
        const isOpen = open[g.group]

        return (
          <div key={g.group} className="rf-group">
            <div className="rf-group__head">
              <button
                onClick={() => setOpen((o) => ({ ...o, [g.group]: !o[g.group] }))}
                className="rf-group__head-toggle"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${g.group}`}>
                <span className={`rf-group__caret ${isOpen ? "rf-group__caret--open" : ""}`}>
                  <Ico name="caret-right" size={11} />
                </span>
                <span className="rf-group__title">{g.group}</span>
                <span className="rf-group__count">
                  {onCount}/{total}
                </span>
              </button>
              <Switch
                size="sm"
                on={allOn}
                indeterminate={mixed}
                onClick={(e) => {
                  e.stopPropagation()
                  // All on → turn all off. Otherwise (mixed or all off) → turn
                  // all on. The "completing" action is the default.
                  onToggleMany(ids, !allOn)
                }}
              />
            </div>
            {isOpen &&
              g.items.map((it) => (
                <div key={it.id}>
                  <Row
                    icon={it.icon}
                    label={it.label}
                    on={flags[it.id]}
                    onToggle={() => onToggle(it.id)}
                    dense
                  />
                  {it.children?.map((c) => (
                    <Row
                      key={c.id}
                      label={c.label}
                      on={flags[c.id]}
                      onToggle={() => onToggle(c.id)}
                      nested
                      dense
                    />
                  ))}
                </div>
              ))}
          </div>
        )
      })}
    </div>
  )
}
