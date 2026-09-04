"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import GlassSurface from "./GlassSurface"
import { ModeToggle } from "./mode-toggle"

const navigationItems = [
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
]

export function Navigation() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const heroSection = document.getElementById("hero")
    if (!heroSection) return

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 },
    )

    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-4 z-50 mx-auto w-[92%] max-w-7xl"
    >
      <GlassSurface
        width="100%"
        height={68}
        borderRadius={999}
        borderWidth={0.08}
        brightness={58}
        opacity={0.88}
        blur={12}
        displace={0}
        backgroundOpacity={0.16}
        saturation={1.35}
        distortionScale={-110}
        redOffset={2}
        greenOffset={8}
        blueOffset={14}
        mixBlendMode="screen"
        className="w-full border border-zinc-200/60 dark:border-zinc-700/60"
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-2 px-3 py-1 sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="shrink-0 text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Return to the top of the portfolio"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AtomicX
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigationItems.map(({ label, target }) => (
              <Button
                key={target}
                variant="ghost"
                onClick={() => scrollToSection(target)}
                className="rounded-full px-4 text-sm text-zinc-800 transition-colors hover:bg-white/35 hover:text-zinc-950 dark:text-zinc-100 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {label}
              </Button>
            ))}
          </nav>

          <ModeToggle />
        </div>
      </GlassSurface>
    </motion.header>
  )
}
