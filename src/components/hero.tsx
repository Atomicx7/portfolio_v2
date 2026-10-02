"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { site } from "../content/site"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -34])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "24%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100svh] overflow-hidden bg-bg pt-24" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden />
      <div className="hero-orb hero-orb-one" aria-hidden />
      <div className="hero-orb hero-orb-two" aria-hidden />
      <div className="absolute inset-x-0 top-1/2 z-10 h-px bg-accent/80" aria-hidden />
      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col justify-between px-5 pb-7 pt-[14vh] sm:px-8 sm:pb-9">
        <motion.div style={{ opacity }}>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent" />Open to opportunities</span>
            <span>{site.location} · IST</span>
          </div>
          <motion.div style={shouldReduceMotion ? undefined : { rotateX, y, transformOrigin: "50% 100%" }} className="hero-fold mt-[8vh]" >
            <p className="eyebrow mb-4"><span className="text-accent">// 00</span> — {site.name}</p>
            <h1 id="hero-title" className="hero-title">
              Software<br />Engineer<span className="text-accent">.</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-8 max-w-xl text-lg leading-8 text-[#d8d5d1] sm:text-xl">
            Building production AI backends and GPU-shader Android experiments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="button">See selected work <ArrowDownRight className="size-4" /></a>
            <a href="#contact" className="button button-quiet">Get in touch <ArrowUpRight className="size-4" /></a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }} className="grid gap-3 border-t border-line pt-4 text-sm text-muted sm:grid-cols-[1fr_auto] sm:items-end">
          <p>1,500+ internal users · 70k+ tickets automated · <span className="text-fg">200+ GitHub stars</span></p>
          <a href="#about" className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg"><span className="size-7 border border-line grid place-items-center transition-transform group-hover:translate-y-1">↓</span> Scroll to unfold</a>
        </motion.div>
      </div>
    </section>
  )
}
