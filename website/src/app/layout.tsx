import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Refine — hide what you didn't come for",
  description:
    "A small Chrome extension that switches off YouTube's distractions one at a time — Shorts, recommendations, end screens, comments, the homepage feed. Pre-paint, no flicker, no tracking.",
  openGraph: {
    title: "Refine — hide what you didn't come for",
    description:
      "Quiet YouTube, one toggle at a time. Free, local, open source.",
    type: "website"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
