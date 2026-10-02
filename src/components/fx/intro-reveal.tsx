"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export function IntroReveal() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false)
      return
    }
    const timeout = window.setTimeout(() => setVisible(false), 1950)
    return () => window.clearTimeout(timeout)
  }, [reduceMotion])

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-reveal" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.22 } }} aria-label="Welcome animation">
          <motion.div className="intro-panel intro-panel-left" initial={{ x: 0 }} animate={{ x: "-102%" }} transition={{ delay: 1.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="intro-panel intro-panel-right" initial={{ x: 0 }} animate={{ x: "102%" }} transition={{ delay: 1.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="relative z-10 flex flex-col items-center px-6 text-center text-fg">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="eyebrow text-accent">Loading portfolio / 2026</motion.p>
            <div className="mt-4 overflow-hidden"><motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.18, duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="text-4xl font-semibold tracking-[-0.07em] sm:text-6xl">Yashdeep Singh</motion.h1></div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Software engineer / atomicx7</motion.p>
          </motion.div>
          <button onClick={dismiss} className="intro-skip">Skip intro</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
