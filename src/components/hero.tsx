"use client"

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, Code2, Gamepad2, Headphones, Laptop, Smartphone } from "lucide-react"
import { useRef } from "react"

function HeroSticker({
  className,
  icon: Icon,
  label,
  detail,
  x,
  y,
  rotate,
}: {
  className: string
  icon: typeof Laptop
  label: string
  detail: string
  x: MotionValue<number>
  y: MotionValue<number>
  rotate: number
}) {
  return (
    <motion.div aria-hidden className={`hero-sticker ${className}`} style={{ x, y, rotate }}>
      <Icon className="size-5" strokeWidth={1.7} />
      <span>{label}</span>
      <small>{detail}</small>
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

  const laptopX = useTransform(softX, (value) => value * 24)
  const laptopY = useTransform(softY, (value) => value * 18)
  const controllerX = useTransform(softX, (value) => value * -18)
  const controllerY = useTransform(softY, (value) => value * -26)
  const headphonesX = useTransform(softX, (value) => value * 14)
  const headphonesY = useTransform(softY, (value) => value * -16)
  const phoneX = useTransform(softX, (value) => value * -10)
  const phoneY = useTransform(softY, (value) => value * 15)

  const moveObjects = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section ref={ref} onPointerMove={moveObjects} id="hero" className="relative min-h-[100svh] overflow-hidden bg-bg pt-24" aria-labelledby="hero-title">
      <div className="hero-wash" aria-hidden />
      <div className="hero-playground" aria-hidden>
        <HeroSticker className="hero-sticker-laptop" icon={Laptop} label="BUILD MODE" detail="</>" x={laptopX} y={laptopY} rotate={-7} />
        <HeroSticker className="hero-sticker-controller" icon={Gamepad2} label="OFF DUTY" detail="PLAY" x={controllerX} y={controllerY} rotate={8} />
        <HeroSticker className="hero-sticker-headphones" icon={Headphones} label="FOCUS" detail="ON" x={headphonesX} y={headphonesY} rotate={-10} />
        <HeroSticker className="hero-sticker-phone" icon={Smartphone} label="MOBILE" detail="ANDROID" x={phoneX} y={phoneY} rotate={11} />
        <div className="hero-code-mark"><Code2 className="size-5" /><span>systems / shaders / side quests</span></div>
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
