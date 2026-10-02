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
    const timeout = window.setTimeout(() => setVisible(false), 1650)
    return () => window.clearTimeout(timeout)
  }, [reduceMotion])

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-reveal" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.16 } }} aria-label="Portfolio introduction">
          <motion.div className="intro-panel intro-panel-left" initial={{ x: 0 }} animate={{ x: "-102%" }} transition={{ delay: 0.98, duration: 0.48, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="intro-panel intro-panel-right" initial={{ x: 0 }} animate={{ x: "102%" }} transition={{ delay: 0.98, duration: 0.48, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="intro-grid" initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} transition={{ delay: 0.22, duration: 0.25 }} aria-hidden />
          <motion.div className="intro-sweep" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.72, duration: 0.32, ease: [0.22, 1, 0.36, 1] }} aria-hidden />
          <div className="intro-content">
            <motion.div initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.24 }} className="intro-index">
              <span>Atomicx7</span><i /> <span>01 / 01</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, rotate: -18, scale: 0.65 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ delay: 0.36, type: "spring", stiffness: 260, damping: 17 }} className="intro-mark" aria-hidden>{"</>"}</motion.div>
            <div className="intro-title-mask">
              <motion.h1 initial={{ y: "112%" }} animate={{ y: 0 }} transition={{ delay: 0.44, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}>Hey, I’m<br />Yashdeep.</motion.h1>
            </div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.69, duration: 0.22 }} className="intro-subtitle">Systems, side quests, better details.</motion.p>
          </div>
          <div className="intro-status" aria-hidden>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.18 }}>Warming up the workspace</motion.span>
            <motion.div className="intro-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }} /></motion.div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.16 }}>100%</motion.span>
          </div>
          <button onClick={dismiss} className="intro-skip">Skip intro</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
