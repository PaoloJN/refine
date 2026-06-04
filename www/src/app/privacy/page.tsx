import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy — Refine",
  description:
    "Refine collects nothing, transmits nothing, and stores your preferences only in your own browser."
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8">
        <Link href="/">← Back to Refine</Link>
      </Button>

      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Last updated: 2026-06-01
      </p>

      <div className="prose-block mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
        <p>
          Refine is a Chrome extension that hides distracting elements on YouTube.
          It is fully local and contains no analytics, no telemetry, and no
          third-party integrations.
        </p>

        <Section title="What we collect">
          <p>
            <strong>Nothing.</strong> Refine does not collect, transmit, or sell any
            data — personal or otherwise. No accounts. No servers. No tracking
            pixels.
          </p>
        </Section>

        <Section title="What we store">
          <p>
            Refine stores your toggle preferences (which YouTube elements you've
            chosen to hide, your selected theme, and your master on/off state)
            using Chrome's local storage API (<code>chrome.storage.local</code>).
            This data never leaves your browser. It is not synced, backed up, or
            transmitted anywhere.
          </p>
          <p>If you uninstall the extension, this data is removed by Chrome.</p>
        </Section>

        <Section title="Permissions we request and why">
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>storage</strong> — to remember your toggle preferences across
              browser sessions.
            </li>
            <li>
              <strong>tabs</strong> — to read the URL of the active tab so the popup
              can show the right state (active / paused / off-site).
            </li>
            <li>
              <strong>declarativeNetRequest</strong> — to redirect specific YouTube
              URLs (e.g. <code>/feed/trending</code> → home) when you've enabled the
              matching toggle.
            </li>
            <li>
              <strong>Host access to youtube.com</strong> — to run the content
              script that hides elements on YouTube pages.
            </li>
          </ul>
        </Section>

        <Section title="Network requests">
          <p>
            Refine makes no network requests of its own. No analytics SDK, no
            error-reporting service, no remote configuration. The popup loads the
            Geist font from Google Fonts on open; Google's font CDN privacy policy
            applies to that single request.
          </p>
        </Section>

        <Section title="Children's privacy">
          <p>
            Refine does not target or knowingly collect data from anyone, including
            children under 13.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            Any change to data handling will be reflected here and in the public
            commit history of the repository at{" "}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://github.com/PaoloJN/refine"
              target="_blank"
              rel="noreferrer">
              github.com/PaoloJN/refine
            </a>
            .
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Open an issue at{" "}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://github.com/PaoloJN/refine/issues"
              target="_blank"
              rel="noreferrer">
              github.com/PaoloJN/refine/issues
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  )
}
