"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "../components/ui/button"
import GlassSurface from "./GlassSurface"
import { ModeToggle } from "./mode-toggle"

const navigationItems = [
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
]

export function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
    setMenuOpen(false)
    // Let the menu close first so the pill doesn't cover the target.
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
    })
  }

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-3 z-50 mx-auto w-[92%] max-w-3xl"
    >
      <GlassSurface
        width="100%"
        height={52}
        borderRadius={999}
        borderWidth={0.08}
        brightness={58}
        opacity={0.88}
        blur={24}
        displace={4}
        backgroundOpacity={0.38}
        saturation={1.6}
        distortionScale={-110}
        redOffset={2}
        greenOffset={8}
        blueOffset={14}
        mixBlendMode="screen"
        className="w-full border border-zinc-200/60 dark:border-zinc-700/60"
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-1 px-3 py-0.5 sm:gap-2 sm:px-4">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="shrink-0 text-base font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Return to the top of the portfolio"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AtomicX
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary navigation">
            {navigationItems.map(({ label, target }) => (
              <Button
                key={target}
                variant="ghost"
                onClick={() => scrollToSection(target)}
                className="h-8 rounded-full px-3 text-[13px] text-zinc-800 transition-colors hover:bg-white/35 hover:text-zinc-950 dark:text-zinc-100 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ModeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-white/35 dark:text-zinc-100 dark:hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </GlassSurface>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
            className="mt-2 overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/85 p-2 shadow-xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/85 md:hidden"
          >
            {navigationItems.map(({ label, target }, i) => (
              <motion.button
                key={target}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                onClick={() => scrollToSection(target)}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
              >
                <span className="text-xs font-black text-zinc-300 dark:text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
