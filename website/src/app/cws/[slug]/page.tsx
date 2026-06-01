import Link from "next/link"
import { notFound } from "next/navigation"

import { CwsPreview } from "@/components/cws/preview"
import { CWS_ASSETS, getAsset } from "@/components/cws/registry"

const FONT_MONO =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace"

export function generateStaticParams() {
  return CWS_ASSETS.map((a) => ({ slug: a.slug }))
}

export default async function CwsAssetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const asset = getAsset(slug)
  if (!asset) notFound()

  return (
    <div
      style={{
        maxWidth: 1480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>
      <Link
        href="/cws"
        style={{
          fontFamily: FONT_MONO,
          fontSize: 12,
          color: "#888",
          letterSpacing: "0.04em",
          textDecoration: "none",
        }}>
        ← back to all assets
      </Link>
      <CwsPreview
        slug={asset.slug}
        width={asset.width}
        height={asset.height}
        description={asset.description}>
        {asset.render()}
      </CwsPreview>
    </div>
  )
}
