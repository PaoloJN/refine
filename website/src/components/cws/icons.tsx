"use client"

import type { CSSProperties } from "react"
import {
  Bell,
  CardsThree,
  CaretRight,
  ChatCircleDots,
  ChatText,
  Check,
  Compass,
  CrosshairSimple,
  GridFour,
  Heart,
  House,
  Layout,
  Lightbulb,
  MagnifyingGlass,
  MinusCircle,
  MonitorPlay,
  PlayCircle,
  Plus,
  Power,
  Rows,
  SidebarSimple,
  SkipForward,
  SquaresFour,
  Tag,
  UserCircle,
} from "@phosphor-icons/react"
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react"

const REGISTRY: Record<string, PhosphorIcon> = {
  house: House,
  compass: Compass,
  "squares-four": SquaresFour,
  "play-circle": PlayCircle,
  rows: Rows,
  "sidebar-simple": SidebarSimple,
  "grid-four": GridFour,
  "cards-three": CardsThree,
  "chat-circle-dots": ChatCircleDots,
  "skip-forward": SkipForward,
  tag: Tag,
  "chat-text": ChatText,
  "user-circle": UserCircle,
  bell: Bell,
  "magnifying-glass": MagnifyingGlass,
  layout: Layout,
  power: Power,
  "caret-right": CaretRight,
  heart: Heart,
  lightbulb: Lightbulb,
  "crosshair-simple": CrosshairSimple,
  "monitor-play": MonitorPlay,
  "minus-circle": MinusCircle,
  plus: Plus,
  check: Check,
}

export type IconName = keyof typeof REGISTRY

type Weight = "regular" | "bold" | "fill"

const WEIGHT_MAP: Record<Weight, IconWeight> = {
  regular: "regular",
  bold: "bold",
  fill: "fill",
}

export function Icon({
  name,
  size = 16,
  weight = "regular",
  style,
}: {
  name: IconName | string
  size?: number
  weight?: Weight
  style?: CSSProperties
}) {
  const Cmp = REGISTRY[name as IconName]
  if (!Cmp) {
    return (
      <span style={{ display: "inline-block", width: size, height: size, ...style }} />
    )
  }
  return (
    <Cmp
      size={size}
      weight={WEIGHT_MAP[weight]}
      style={{ display: "block", flexShrink: 0, ...style }}
    />
  )
}
