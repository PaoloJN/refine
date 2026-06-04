import { Ico } from "./icons"

export function CenterState({
  icon,
  title,
  body,
  action,
  secondary,
  tone = "default"
}: {
  icon: string
  title: string
  body: string
  action?: { label: string; icon?: string; onClick?: () => void }
  secondary?: { label: string; onClick?: () => void }
  tone?: "default" | "solid"
}) {
  return (
    <div className="rf-center">
      <div className={`rf-center__icon ${tone === "solid" ? "rf-center__icon--solid" : ""}`}>
        <Ico name={icon} size={24} strokeWidth={tone === "solid" ? 2.4 : 1.8} />
      </div>
      <div className="rf-center__title">{title}</div>
      <div className="rf-center__body">{body}</div>
      {action && (
        <button className="rf-center__action" onClick={action.onClick}>
          {action.icon && <Ico name={action.icon} size={14} strokeWidth={2.4} />}
          {action.label}
        </button>
      )}
      {secondary && (
        <button className="rf-center__secondary" onClick={secondary.onClick}>
          {secondary.label}
        </button>
      )}
    </div>
  )
}
