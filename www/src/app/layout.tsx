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

// Read stored theme and apply before first paint so the page never flashes
// the wrong palette. Light is the default — the user has to explicitly
// switch to dark for it to stick. We don't follow the OS preference so the
// marketing surface always lands "cream" on first impression.
const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('refine-theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.classList.add(t);}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the THEME_BOOT_SCRIPT below adds a
    // `light` or `dark` class to <html> before React hydrates, so the
    // server-rendered className intentionally differs from the client
    // className on first paint. This is the canonical next-themes pattern.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
