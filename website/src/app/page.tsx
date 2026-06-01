import Link from "next/link"
import { Heart, Lightbulb, LifeBuoy, Power, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="currentColor" className={className} aria-hidden="true">
      <path d="M40 60C40 48.9543 48.9543 40 60 40V123H40V60Z" />
      <rect x="80" y="80" width="20" height="20" />
      <rect x="100" y="60" width="20" height="20" />
      <rect x="120" y="40" width="20" height="20" />
      <path d="M120 80H140V120C140 131.046 131.046 140 120 140V140V80Z" />
      <path d="M40 60C40 48.9543 48.9543 40 60 40L100 40V60L40 60Z" />
      <path d="M140 120C140 131.046 131.046 140 120 140H60V120L140 120Z" />
    </svg>
  )
}

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/" // TODO: replace with the real listing once published

const FEATURES = [
  {
    title: "Pre-paint hiding",
    body: "Settings apply before YouTube renders. No flicker, no flash of the thing you came here to hide."
  },
  {
    title: "Per-element control",
    body: "Shorts, recommendations, comments, end screens, merch shelves, search suggestions — flip each one independently."
  },
  {
    title: "Pause per site",
    body: "One tap, one keypress. Resume when you actually want to scroll."
  }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <LogoMark className="h-5 w-5" />
            </span>
            Refine
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <a href="#features">Features</a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="https://github.com/PaoloJN/refine" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
            <Button asChild size="sm">
              <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
                Add to Chrome
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Free · open source · zero tracking
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Hide the parts of YouTube you don&apos;t want to see.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Shorts, recommendations, comments, end screens — gone. Refine ships one toggle per
            element so you keep the player and lose the rest.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
                Add to Chrome — free
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#features">See what it hides</a>
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Chrome · Edge · Brave · Arc — anything Chromium.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Built for the watch page.</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Refine is a single extension with a single job: keep YouTube focused on the video you
            opened.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it hides */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Every distraction. One window.</h2>
          <div className="mt-10 grid gap-x-12 gap-y-3 font-mono text-sm md:grid-cols-2">
            {[
              "Home feed",
              "Shorts (shelf + tab + reels)",
              "Trending & Explore",
              "Subscriptions feed",
              "Video sidebar",
              "Recommended videos",
              "Live chat",
              "Playlist panel",
              "End-screen feed",
              "End-screen cards",
              "Merch & offers",
              "Comments (with avatar opt-out)",
              "Notifications",
              "Search suggestions",
              "Top header"
            ].map((row) => (
              <div key={row} className="flex items-center gap-3 text-muted-foreground">
                <Power className="h-3.5 w-3.5 text-foreground" />
                {row}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Install once. Stop seeing the noise.
          </h2>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
                Add Refine to Chrome
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-background">
              <LogoMark className="h-3.5 w-3.5" />
            </span>
            <span>Refine</span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              className="inline-flex items-center gap-1.5 hover:text-foreground"
              href="https://github.com/sponsors/PaoloJN"
              target="_blank"
              rel="noreferrer">
              <Heart className="h-3.5 w-3.5" /> Donate
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-foreground"
              href="https://github.com/PaoloJN/refine/issues/new?labels=enhancement"
              target="_blank"
              rel="noreferrer">
              <Lightbulb className="h-3.5 w-3.5" /> Request a feature
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-foreground"
              href="https://github.com/PaoloJN/refine/issues"
              target="_blank"
              rel="noreferrer">
              <LifeBuoy className="h-3.5 w-3.5" /> Support
            </a>
            <Link
              className="ml-2 inline-flex items-center gap-1.5 hover:text-foreground"
              href="/privacy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
