"use client"

import { useEffect, useState } from "react"
import { ScrollVelocity } from "./ScrollVelocity"

interface SectionMarqueeProps {
  eyebrow: string
  title: string
  sub?: string
  texts: string[]
  velocity?: number
}

/**
 * Velocity-reactive marquee section header on sm+ screens, falling back to a
 * compact static title on phones (the marquee's always-on rAF loops are not
 * worth it on low-end mobile GPUs).
 */
export function SectionMarquee({ eyebrow, title, sub, texts, velocity = 45 }: SectionMarqueeProps) {
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    setWide(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setWide(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <div className="mb-10 sm:mb-14">
      {wide ? (
        <>
          <h2 className="sr-only">{title}</h2>
          <div aria-hidden className="relative left-1/2 w-screen -translate-x-1/2 select-none">
            <ScrollVelocity
              texts={texts}
              velocity={velocity}
              numCopies={6}
              className="font-black uppercase tracking-tight text-transparent text-6xl md:text-8xl [-webkit-text-stroke:2px_rgba(130,130,150,0.35)]"
            />
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-foreground">{title}</h2>
        </>
      )}
      {sub && (
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">{sub}</p>
      )}
    </div>
  )
}

export default SectionMarquee
