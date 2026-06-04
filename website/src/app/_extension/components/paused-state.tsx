import { Ico } from "./icons"

export function PausedState({ host, onResume }: { host: string; onResume: () => void }) {
  return (
    <div className="rf-offsite">
      <div className="rf-offsite__hero">
        <div className="rf-offsite__ring" aria-hidden />
        <div className="rf-offsite__tile">
          <Ico name="pause" size={26} weight="fill" />
        </div>
        <span className="rf-offsite__dot rf-offsite__dot--warn" aria-hidden>
          <span />
        </span>
      </div>

      <div className="rf-offsite__title">Refine is paused here</div>
      <div className="rf-offsite__body">
        Hiding is off on <code>{host}</code>. Everything you hid is back — flip it on whenever you
        want it gone again.
      </div>

      <button className="rf-offsite__action" onClick={onResume}>
        <Ico name="power" size={14} strokeWidth={2.4} />
        Turn back on
      </button>
    </div>
  )
}
