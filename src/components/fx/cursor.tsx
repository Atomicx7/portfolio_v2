"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function Cursor() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, { stiffness: 520, damping: 34, mass: 0.25 })
  const y = useSpring(rawY, { stiffness: 520, damping: 34, mass: 0.25 })
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      const active = pointer.matches && !reduced.matches
      setEnabled(active)
      document.documentElement.classList.toggle("has-custom-cursor", active)
    }
    update()
    pointer.addEventListener("change", update)
    reduced.addEventListener("change", update)

    const move = (event: PointerEvent) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null
      setLabel(target?.dataset.cursor || (target ? "Open" : ""))
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => {
      pointer.removeEventListener("change", update)
      reduced.removeEventListener("change", update)
      window.removeEventListener("pointermove", move)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [rawX, rawY])

  if (!enabled) return null
  return (
    <>
      <motion.span aria-hidden className="cursor-dot" style={{ x, y, translateX: "-50%", translateY: "-50%" }} />
      <motion.span aria-hidden className={`cursor-ring ${label ? "is-active" : ""}`} style={{ x, y, translateX: "-50%", translateY: "-50%" }}>
        {label && <span>{label}</span>}
      </motion.span>
    </>
  )
}
