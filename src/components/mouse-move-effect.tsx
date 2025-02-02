"use client"

import { useEffect } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MouseMoveEffect() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 300) // Offset by half the gradient width
      cursorY.set(event.clientY - 300) // Offset by half the gradient height
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        width: "600px",
        height: "600px",
        x,
        y,
      }}
    >
      {/* Light theme gradient */}
      <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-300">
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Dark theme gradient */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />
      </div>
    </motion.div>
  )
}

