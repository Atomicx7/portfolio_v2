"use client"

import { useEffect, useState } from "react"
import { site } from "../../content/site"

function timeInIst() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: site.timezone,
  }).format(new Date())
}

export function LiveClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(timeInIst())
    update()
    const interval = window.setInterval(update, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {time ?? ""} {time ? "· IST" : "IST"}
    </span>
  )
}
