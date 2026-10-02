"use client"

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useRef } from "react"

type HeroObjectProps = {
  className: string
  src: string
  x: MotionValue<number>
  y: MotionValue<number>
  rotate: number
  label: string
  eyebrow: string
  detail: string
  cursor: string
  href?: string
}

function HeroObject({ className, src, x, y, rotate, label, eyebrow, detail, cursor, href }: HeroObjectProps) {
  const objectContent = (
    <>
      <img aria-hidden alt="" src={src} loading="eager" decoding="async" />
      <span className="hero-object-note" role="tooltip">
        <span className="hero-object-note-kicker">{eyebrow}</span>
        <span className="hero-object-note-copy">{detail}</span>
        {href && <span className="hero-object-note-link">@amazecliks ↗</span>}
      </span>
    </>
  )

  const objectStyle = { x, y, rotate }
  const objectClassName = `hero-object ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label}. ${detail}. Opens Instagram in a new tab.`}
        data-cursor={cursor}
        className={objectClassName}
        style={objectStyle}
      >
        {objectContent}
      </motion.a>
    )
  }

  return (
    <motion.div tabIndex={0} aria-label={`${label}. ${detail}`} data-cursor={cursor} className={objectClassName} style={objectStyle}>
      {objectContent}
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const softX = useSpring(pointerX, { stiffness: 55, damping: 16, mass: 0.4 })
  const softY = useSpring(pointerY, { stiffness: 55, damping: 16, mass: 0.4 })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, shouldReduceMotion ? 1 : 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -10])

  const laptopX = useTransform(softX, (value) => value * 30)
  const laptopY = useTransform(softY, (value) => value * 22)
  const controllerX = useTransform(softX, (value) => value * -22)
  const controllerY = useTransform(softY, (value) => value * -28)
  const headphonesX = useTransform(softX, (value) => value * 17)
  const headphonesY = useTransform(softY, (value) => value * -20)
  const phoneX = useTransform(softX, (value) => value * -14)
  const phoneY = useTransform(softY, (value) => value * 20)

  const moveObjects = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section ref={ref} onPointerMove={moveObjects} id="hero" className="relative min-h-[100svh] overflow-hidden bg-bg pt-24" aria-labelledby="hero-title">
      <div className="hero-wash" aria-hidden />
      <div className="hero-playground">
        <HeroObject className="hero-object-laptop" src="/media/hero-laptop.webp" x={laptopX} y={laptopY} rotate={-6} label="Developer at work" eyebrow="DEV MODE" detail="Backend systems, Android experiments, and the inevitable late-night debug session." cursor="Dev" />
        <HeroObject className="hero-object-headphones" src="/media/hero-headphones.webp" x={headphonesX} y={headphonesY} rotate={-10} label="Music listener" eyebrow="ON REPEAT" detail="English, Hindi, Japanese, instrumentals — if it carries a mood, it is probably in rotation." cursor="Music" />
        <HeroObject className="hero-object-controller" src="/media/hero-controller.webp" x={controllerX} y={controllerY} rotate={8} label="Gamer" eyebrow="OFF DUTY" detail="Genshin Impact, BeamNG.drive, and Ghost of Tsushima. Plenty of hours logged." cursor="Games" />
        <HeroObject className="hero-object-phone" src="/media/hero-phone.webp" x={phoneX} y={phoneY} rotate={5} label="Mobile photographer" eyebrow="FRAME BY FRAME" detail="Mobile photography and edits, collected on my Instagram." cursor="Photos" href="https://www.instagram.com/amazecliks/" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col justify-between px-5 pb-7 pt-[15vh] sm:px-8 sm:pb-9">
        <motion.div style={{ opacity }}>
          <div className="flex flex-wrap items-center gap-3">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }} className="eyebrow">
              <span className="text-accent">// 00</span> — SOFTWARE ENGINEER / YASHDEEP SINGH
            </motion.p>
            <motion.span initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="open-chip"><i /> Open to work</motion.span>
          </div>
          <motion.div style={shouldReduceMotion ? undefined : { y, rotateX, transformOrigin: "50% 100%" }} className="mt-[7vh] hero-fold">
            <h1 id="hero-title" className="hero-title hero-title-clean">I build things<br />that <span className="hero-underlined">hold up</span>.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.55 }} className="mt-8 max-w-lg text-lg leading-8 text-muted sm:text-xl">
            Backend systems for real work. Android interactions for the fun of getting the details right.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.55 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="button" data-cursor="Work">See selected work <ArrowDownRight className="size-4" /></a>
            <a href="#contact" className="button button-quiet" data-cursor="Hello">Get in touch <ArrowUpRight className="size-4" /></a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid gap-3 border-t border-line pt-4 text-sm text-muted sm:grid-cols-[1fr_auto] sm:items-end">
          <p>1,500+ internal users · 70k+ tickets · <span className="text-fg">200+ GitHub stars</span></p>
          <a href="#about" data-cursor="Scroll" className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg"><span className="grid size-7 place-items-center border border-line transition-transform group-hover:translate-y-1">↓</span> Keep scrolling</a>
        </motion.div>
      </div>
    </section>
  )
}
