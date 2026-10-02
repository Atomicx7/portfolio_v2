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
    const timeout = window.setTimeout(() => setVisible(false), 2550)
    return () => window.clearTimeout(timeout)
  }, [reduceMotion])

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-reveal" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.24 } }} aria-label="Portfolio introduction">
          <motion.div className="intro-panel intro-panel-left" initial={{ x: 0 }} animate={{ x: "-102%" }} transition={{ delay: 1.52, duration: 0.72, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="intro-panel intro-panel-right" initial={{ x: 0 }} animate={{ x: "102%" }} transition={{ delay: 1.52, duration: 0.72, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="intro-grid" aria-hidden />
          <div className="intro-content">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }} className="intro-index">
              <span>Atomicx7</span><i /> <span>01 / 01</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, rotate: -18, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ delay: 0.12, type: "spring", stiffness: 190, damping: 15 }} className="intro-mark" aria-hidden>{"</>"}</motion.div>
            <div className="intro-title-mask">
              <motion.h1 initial={{ y: "112%" }} animate={{ y: 0 }} transition={{ delay: 0.24, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>Welcome<br />to my corner.</motion.h1>
            </div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.44 }} className="intro-subtitle">Systems, side quests, and the tiny details worth obsessing over.</motion.p>
          </div>
          <div className="intro-status" aria-hidden>
            <span>Preparing the good stuff</span>
            <motion.div className="intro-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.24, duration: 1.35, ease: [0.32, 0.72, 0, 1] }} /></motion.div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>100%</motion.span>
          </div>
          <button onClick={dismiss} className="intro-skip">Skip intro</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
