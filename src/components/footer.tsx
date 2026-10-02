"use client"

import { ArrowUp } from "lucide-react"
import { site } from "../content/site"
import { LiveClock } from "./layout/live-clock"

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="page-shell flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <LiveClock />
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">© {new Date().getFullYear()} {site.name}</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex w-fit min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg transition-colors hover:text-accent">Back to top <ArrowUp className="size-4" /></button>
      </div>
    </footer>
  )
}
