"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useRef } from "react"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, shouldReduceMotion ? 1 : 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -10])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100svh] overflow-hidden bg-bg pt-24" aria-labelledby="hero-title">
      <div className="hero-wash" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col justify-between px-5 pb-7 pt-[15vh] sm:px-8 sm:pb-9">
        <motion.div style={{ opacity }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }} className="eyebrow">
            <span className="text-accent">// 00</span> — SOFTWARE ENGINEER / YASHDEEP SINGH
          </motion.p>
          <motion.div style={shouldReduceMotion ? undefined : { y, rotateX, transformOrigin: "50% 100%" }} className="mt-[7vh] hero-fold">
            <h1 id="hero-title" className="hero-title hero-title-clean">I build things<br />that <span className="hero-underlined">hold up</span>.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.55 }} className="mt-8 max-w-lg text-lg leading-8 text-muted sm:text-xl">
            Backend systems for real work. Android interactions for the fun of getting the details right.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.55 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="button">See selected work <ArrowDownRight className="size-4" /></a>
            <a href="#contact" className="button button-quiet">Get in touch <ArrowUpRight className="size-4" /></a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid gap-3 border-t border-line pt-4 text-sm text-muted sm:grid-cols-[1fr_auto] sm:items-end">
          <p>1,500+ internal users · 70k+ tickets · <span className="text-fg">200+ GitHub stars</span></p>
          <a href="#about" className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg"><span className="grid size-7 place-items-center border border-line transition-transform group-hover:translate-y-1">↓</span> Keep scrolling</a>
        </motion.div>
      </div>
    </section>
  )
}
