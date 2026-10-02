"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { site } from "../content/site"
import { CommandPalette } from "./layout/command-palette"
import { ScrollProgress } from "./layout/scroll-progress"
import { ThemeToggle } from "./theme-toggle"

const navigationItems = [
  { label: "Work", target: "work" },
  { label: "Skills", target: "skills" },
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scroll = (target: string) => {
    setMenuOpen(false)
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      return
    }
    window.location.assign(`/#${target}`)
  }

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
          <button onClick={() => scroll("hero")} className="group flex min-h-11 items-center gap-2 px-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-fg" aria-label="Return to page top">
            <span className="size-2 rounded-full bg-accent transition-transform group-hover:scale-150" />
            {site.handle}
          </button>
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
            {navigationItems.map((item, index) => (
              <button key={item.target} onClick={() => scroll(item.target)} className="nav-link">
                <span className="mr-1.5 font-mono text-[10px] text-muted">0{index + 1}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block"><CommandPalette /></div>
            <a href={site.resume} target="_blank" rel="noreferrer" className="button button-small hidden sm:inline-flex">Resume <span aria-hidden>↗</span></a>
            <button className="grid size-11 place-items-center lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto max-w-6xl border-x border-b border-line bg-surface p-3 lg:hidden" aria-label="Mobile navigation">
              {navigationItems.map((item, index) => (
                <button key={item.target} onClick={() => scroll(item.target)} className="flex min-h-12 w-full items-center gap-3 px-3 text-left text-lg transition-colors hover:bg-white/5">
                  <span className="font-mono text-[11px] text-accent">0{index + 1}</span>{item.label}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-line pt-3 sm:hidden">
                <CommandPalette />
                <a href={site.resume} target="_blank" rel="noreferrer" className="button button-small">Resume ↗</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
