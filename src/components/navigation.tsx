"use client"

import { Button } from "../components/ui/button"
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"

export function Navigation() {
  const [hidden, setHidden] = useState(true)
  const { scrollY } = useScroll()

  useEffect(() => {
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setHidden(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )
      observer.observe(heroSection)
      return () => observer.disconnect()
    }
  }, [])

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 flex items-center justify-between px-8 py-3 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 rounded-full border border-zinc-200 dark:border-zinc-800 w-[90%] max-w-7xl"
    >
      <div className="flex items-center gap-12">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AtomicX
        </span>
        <nav className="hidden md:flex items-center gap-8">
          <Button
            variant="ghost"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Projects
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Skills
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Contact
          </Button>
        </nav>
      </div>
      <ModeToggle />
    </motion.header>
  )
}

