import type { ReactNode } from "react"

import {
  IconBlack,
  IconBleed,
  IconClay,
  IconPaper,
  Marquee,
  Shot1Popup,
  Shot2Toggles,
  Shot3BeforeAfter,
  Shot4Pause,
  Shot5Presets,
  SmallPromo,
} from "./screens"

export type CwsAsset = {
  slug: string
  label: string
  width: number
  height: number
  group: "icon" | "promo" | "screenshot"
  description?: string
  render: () => ReactNode
}

export const CWS_ASSETS: CwsAsset[] = [
  // Icons — Chrome auto-rounds to a squircle.
  {
    slug: "icon-paper",
    label: "Icon · paper",
    width: 128,
    height: 128,
    group: "icon",
    description: "Light bg, dark mark (default)",
    render: () => <IconPaper />,
  },
  {
    slug: "icon-black",
    label: "Icon · black",
    width: 128,
    height: 128,
    group: "icon",
    description: "Dark bg, light mark",
    render: () => <IconBlack />,
  },
  {
    slug: "icon-clay",
    label: "Icon · clay",
    width: 128,
    height: 128,
    group: "icon",
    description: "Clay-accent variant",
    render: () => <IconClay />,
  },
  {
    slug: "icon-bleed",
    label: "Icon · bleed",
    width: 128,
    height: 128,
    group: "icon",
    description: "Bare mark on ink",
    render: () => <IconBleed />,
  },
  // Promo tiles
  {
    slug: "small-promo",
    label: "Small promo tile",
    width: 440,
    height: 280,
    group: "promo",
    description: "Carousel card",
    render: () => <SmallPromo />,
  },
  {
    slug: "marquee",
    label: "Marquee · large promo",
    width: 1400,
    height: 560,
    group: "promo",
    description: "Hero banner above the listing",
    render: () => <Marquee />,
  },
  // Screenshots
  {
    slug: "shot-1-popup",
    label: "Screenshot 1 · The popup",
    width: 1280,
    height: 800,
    group: "screenshot",
    description: "Default popup over YouTube",
    render: () => <Shot1Popup />,
  },
  {
    slug: "shot-2-toggles",
    label: "Screenshot 2 · What it hides",
    width: 1280,
    height: 800,
    group: "screenshot",
    description: "All 16 toggles expanded",
    render: () => <Shot2Toggles />,
  },
  {
    slug: "shot-3-before-after",
    label: "Screenshot 3 · Before / after",
    width: 1280,
    height: 800,
    group: "screenshot",
    description: "Split watch page",
    render: () => <Shot3BeforeAfter />,
  },
  {
    slug: "shot-4-pause",
    label: "Screenshot 4 · Pause",
    width: 1280,
    height: 800,
    group: "screenshot",
    description: "Paused state",
    render: () => <Shot4Pause />,
  },
  {
    slug: "shot-5-presets",
    label: "Screenshot 5 · Presets",
    width: 1280,
    height: 800,
    group: "screenshot",
    description: "First-run preset tiles",
    render: () => <Shot5Presets />,
  },
]

export function getAsset(slug: string) {
  return CWS_ASSETS.find((a) => a.slug === slug)
}
