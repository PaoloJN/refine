import type { Metadata } from "next"

import "@/components/cws/cws.css"

export const metadata: Metadata = {
  title: "CWS assets — Refine",
  description: "Editable Chrome Web Store visuals.",
  robots: { index: false, follow: false },
}

export default function CwsLayout({ children }: { children: React.ReactNode }) {
  return <main className="cws-page">{children}</main>
}
