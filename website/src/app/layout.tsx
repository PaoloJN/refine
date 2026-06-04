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

// Read stored theme (or fall back to OS) and apply before first paint so the
// page never flashes the wrong palette. Inline so it runs synchronously
// before the React tree mounts. The body of the function is the only thing
// shipped; keep it small.
const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('refine-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.add(t);}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
