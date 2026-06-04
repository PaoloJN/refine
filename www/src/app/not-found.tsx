import Link from "next/link"

export default function NotFound() {
  return (
    <main className="rf-wrap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
      <div className="rf-mono">404</div>
      <h1 className="rf-h2">Nothing here.</h1>
      <p className="rf-lede" style={{ maxWidth: 360 }}>
        The page you were looking for doesn&apos;t exist — or you typed the URL slightly off.
      </p>
      <Link className="rf-btn rf-btn-primary" href="/" style={{ marginTop: 8 }}>
        Back to Refine
      </Link>
    </main>
  )
}
