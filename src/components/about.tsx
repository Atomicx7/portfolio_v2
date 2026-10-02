"use client"

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import portrait from "../assets/avatar-new2cutout.webp"
import { fadeUp } from "../lib/motion"
import { SectionHeading } from "./layout/section-heading"
import ProfileCard from "./ProfileCard"

const copy = "At BigBasket, I helped build a support tool used by 1,500+ people. On the side, I made DuoFold, an Android animation experiment that picked up 200+ GitHub stars. I care about the unglamorous reliability work as much as the satisfying final detail."

function AboutSticker({ className, src, label, note, cursor, x, y }: { className: string; src: string; label: string; note: string; cursor: string; x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.button
      type="button"
      style={{ x, y }}
      whileHover={{ y: -9, rotate: className.includes("controller") ? 6 : -4, scale: 1.04 }}
      whileFocus={{ y: -9, rotate: className.includes("controller") ? 6 : -4, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 19 }}
      data-cursor={cursor}
      aria-label={`${label}. ${note}`}
      className={`about-photo-sticker ${className}`}
    >
      <img src={src} alt="" loading="lazy" decoding="async" />
      <span className="about-sticker-note"><b>{label}</b>{note}</span>
    </motion.button>
  )
}

function RevealParagraph() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = copy.split(" ")

  return (
    <p ref={ref} className="max-w-3xl text-2xl font-medium leading-[1.35] text-fg sm:text-3xl">
      {words.map((word, index) => {
        const opacity = useTransform(scrollYProgress, [index / words.length, Math.min(1, (index + 3) / words.length)], [reduce ? 1 : 0.18, 1])
        return <motion.span key={`${word}-${index}`} style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>
      })}
    </p>
  )
}

export function About({ stats }: { stats: { stars: number; downloads: number } }) {
  const [finePointer, setFinePointer] = useState(false)
  const stageRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const softX = useSpring(pointerX, { stiffness: 52, damping: 16, mass: 0.45 })
  const softY = useSpring(pointerY, { stiffness: 52, damping: 16, mass: 0.45 })
  const headphonesX = useTransform(softX, (value) => value * 24)
  const headphonesY = useTransform(softY, (value) => value * 16)
  const controllerX = useTransform(softX, (value) => value * -22)
  const controllerY = useTransform(softY, (value) => value * -20)
  const carX = useTransform(softX, (value) => value * 15)
  const carY = useTransform(softY, (value) => value * -12)

  const moveStage = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)")
    const update = () => setFinePointer(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <section id="about" className="section-shell">
      <div className="page-shell">
        <SectionHeading index="01" eyebrow="About" title="Two sides of the same build.">
          The reliable system underneath. The interaction someone remembers on top.
        </SectionHeading>
        <div className="mt-12"><RevealParagraph /></div>
        <motion.dl initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} transition={{ staggerChildren: 0.1 }} className="mt-14 grid max-w-3xl grid-cols-3 border-y border-line">
          {[
            ["1,500+", "internal users"],
            [`${stats.stars}+`, "DuoFold stars"],
            ["9.0", "CGPA · B.Tech IT"],
          ].map(([value, label]) => (
            <motion.div variants={fadeUp} key={label} className="py-5 pr-3 first:border-r first:border-line sm:py-7 sm:pr-6 [&:nth-child(2)]:border-r [&:nth-child(2)]:border-line">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">{value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
      <motion.section ref={stageRef} onPointerMove={moveStage} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.7 }} className="about-photo-stage page-shell" aria-labelledby="off-clock-title">
        <div className="about-stage-copy">
          <p className="eyebrow"><span className="text-accent">// 01.5</span> Off the clock</p>
          <h3 id="off-clock-title">More than<br />the merge.</h3>
          <p>Hover around.</p>
        </div>
        <AboutSticker className="about-photo-sticker-headphones" src="/media/hero-headphones.webp" label="ON LOOP" note="Sound on." cursor="Music" x={headphonesX} y={headphonesY} />
        <AboutSticker className="about-photo-sticker-controller" src="/media/hero-controller.webp" label="SIDE QUEST" note="Just one more round." cursor="Games" x={controllerX} y={controllerY} />
        <AboutSticker className="about-photo-sticker-car" src="/media/about-bmw-m5.webp" label="GOOD ROADS" note="Always looking for the long way home." cursor="Cars" x={carX} y={carY} />
        <div className="profile-card-wrap relative z-10 mx-auto w-full max-w-sm">
          <ProfileCard
            name="Yashdeep Singh"
            title="Software Engineer"
            handle="atomicx7"
            status="Building, learning, shipping"
            contactText="Say hi"
            avatarUrl={portrait.src}
            miniAvatarUrl={portrait.src}
            imageLoading="eager"
            enableTilt={finePointer}
            enableMobileTilt={false}
            behindGlowEnabled={finePointer}
            behindGlowColor="rgba(141, 184, 40, 0.2)"
            innerGradient="linear-gradient(155deg, rgba(24, 26, 20, 1) 0%, rgba(31, 35, 24, 0.98) 66%, rgba(69, 78, 42, 0.9) 100%)"
            onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          />
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Move your cursor over the card</p>
        </div>
      </motion.section>
    </section>
  )
}
