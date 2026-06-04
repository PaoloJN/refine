// Single icon import surface. Maps the design's icon names (Phosphor) to the
// real `@phosphor-icons/react` components. Keeping the indirection means the
// rest of the popup uses string names ("eye-slash", "gear-six") and never
// imports icons directly — adding/swapping icons is one file.

import {
  ArrowClockwise,
  ArrowUpRight,
  Bell,
  CaretLeft,
  CaretRight,
  CardsThree,
  ChatCircle,
  ChatText,
  CircleHalf,
  CloudArrowUp,
  Crosshair,
  EyeSlash,
  Funnel,
  GearSix,
  GridFour,
  HandHeart,
  Heart,
  House,
  Info,
  Keyboard,
  Layout,
  Lifebuoy,
  Lightbulb,
  Lightning,
  MagnifyingGlass,
  Moon,
  MusicNotes,
  NumberCircleOne,
  Pause,
  PlayCircle,
  Power,
  SidebarSimple,
  Sliders,
  Sparkle,
  SquaresFour,
  Tag,
  TrendUp,
  YoutubeLogo,
  type Icon as PhosphorIcon
} from "@phosphor-icons/react"

const ICON_MAP: Record<string, PhosphorIcon> = {
  // Mark / theme / control
  "eye-slash": EyeSlash,
  "circle-half": CircleHalf,
  power: Power,
  pause: Pause,
  sparkle: Sparkle,
  "gear-six": GearSix,
  "youtube-logo": YoutubeLogo,
  "caret-left": CaretLeft,
  "caret-right": CaretRight,
  "arrow-up-right": ArrowUpRight,
  keyboard: Keyboard,
  // Footer
  heart: Heart,
  lightbulb: Lightbulb,
  lifebuoy: Lifebuoy,
  // Settings rows
  "number-circle-one": NumberCircleOne,
  lightning: Lightning,
  "cloud-arrow-up": CloudArrowUp,
  // Feature icons (model.ts → IconName)
  home: House,
  "play-circle": PlayCircle,
  "list-music": MusicNotes,
  "trending-up": TrendUp,
  grid: GridFour,
  "panel-right": SidebarSimple,
  layers: CardsThree,
  "heart-handshake": HandHeart,
  tag: Tag,
  info: Info,
  "rotate-cw": ArrowClockwise,
  "message-square-text": ChatText,
  "message-circle": ChatCircle,
  bell: Bell,
  search: MagnifyingGlass,
  filter: Funnel,
  boxes: SquaresFour,
  layout: Layout,
  // First-run preset tiles (kept for future use)
  crosshair: Crosshair,
  moon: Moon,
  sliders: Sliders,
  squares: SquaresFour
}

export function Ico({
  name,
  size = 16,
  strokeWidth,
  weight,
  className,
  style
}: {
  name: string
  size?: number
  // Backwards-compat with the lucide-style API. strokeWidth >= 2 maps to
  // Phosphor's `bold` weight; anything else uses `regular`. Callers can
  // also pass `weight` directly to override.
  strokeWidth?: number
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  className?: string
  style?: React.CSSProperties
}) {
  const C = ICON_MAP[name]
  if (!C) return null
  const resolvedWeight =
    weight ?? (strokeWidth !== undefined && strokeWidth >= 2 ? "bold" : "regular")
  return (
    <C
      size={size}
      weight={resolvedWeight}
      className={className}
      style={style}
      aria-hidden
    />
  )
}
