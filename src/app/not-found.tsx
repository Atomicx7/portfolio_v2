import Link from "next/link"

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-bg px-6 text-fg"><div><p className="eyebrow text-accent">// 404</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">This page folded away.</h1><p className="mt-4 text-muted">The hinge is still here — the route is not.</p><Link href="/" className="button mt-8">Return home</Link></div></main>
}
