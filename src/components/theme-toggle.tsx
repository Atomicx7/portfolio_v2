"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

const storageKey = "portfolio-color-scheme"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const next = !isDark
    const apply = () => {
      document.documentElement.classList.toggle("dark", next)
      window.localStorage.setItem(storageKey, next ? "dark" : "light")
      setIsDark(next)
    }
    const documentWithTransition = document as Document & { startViewTransition?: (callback: () => void) => void }
    if (documentWithTransition.startViewTransition) documentWithTransition.startViewTransition(apply)
    else apply()
  }

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Light mode" : "Dark mode"}>
      <Sun className={`size-3.5 transition-all duration-300 ${isDark ? "scale-75 opacity-45" : "scale-100 opacity-100"}`} />
      <Moon className={`size-3.5 transition-all duration-300 ${isDark ? "scale-100 opacity-100" : "scale-75 opacity-45"}`} />
    </button>
  )
}
