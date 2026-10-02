"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import portrait from "../assets/avatar-new2cutout.webp"
import { fadeUp } from "../lib/motion"
import { SectionHeading } from "./layout/section-heading"
import ProfileCard from "./ProfileCard"

const copy = "At BigBasket, I helped build a support tool used by 1,500+ people. On the side, I made DuoFold, an Android animation experiment that picked up 200+ GitHub stars. I care about the unglamorous reliability work as much as the satisfying final detail."

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
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)")
    const update = () => setFinePointer(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <section id="about" className="section-shell">
      <div className="page-shell grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <SectionHeading index="01" eyebrow="About" title="Two sides of the same build.">
            The reliable system underneath. The interaction someone remembers on top.
          </SectionHeading>
          <div className="mt-12"><RevealParagraph /></div>
          <motion.dl initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} transition={{ staggerChildren: 0.1 }} className="mt-14 grid grid-cols-3 border-y border-line">
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
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.7 }} className="profile-card-wrap relative mx-auto w-full max-w-sm self-stretch">
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
        </motion.div>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="about-after-hours page-shell"
        aria-labelledby="after-hours-title"
      >
        <div className="about-after-hours-intro">
          <p className="eyebrow"><span className="text-accent">// 01.5</span> — Outside the editor</p>
          <h3 id="after-hours-title">The other tabs<br />are open too.</h3>
          <p>Some things that keep the brain curious when I am not shipping code.</p>
        </div>
        <div className="about-interest-list">
          <article className="about-interest" tabIndex={0} data-cursor="Music">
            <div className="about-interest-art about-interest-art-headphones"><img src="/media/hero-headphones.webp" alt="" aria-hidden loading="lazy" decoding="async" /></div>
            <div><p className="about-interest-kicker">On repeat</p><p>English, Hindi, Japanese, instrumentals — if it carries a mood, it is probably in rotation.</p></div>
          </article>
          <article className="about-interest" tabIndex={0} data-cursor="Games">
            <div className="about-interest-art about-interest-art-controller"><img src="/media/hero-controller.webp" alt="" aria-hidden loading="lazy" decoding="async" /></div>
            <div><p className="about-interest-kicker">Off duty</p><p>Genshin Impact, BeamNG.drive, and Ghost of Tsushima. Plenty of hours logged.</p></div>
          </article>
          <article className="about-interest" tabIndex={0} data-cursor="Cars">
            <div className="about-interest-art about-interest-art-car"><img src="/media/about-bmw-m5.webp" alt="" aria-hidden loading="lazy" decoding="async" /></div>
            <div><p className="about-interest-kicker">Dream garage</p><p>BMW M5 F90 LCI. I have a thing for cars with presence and performance to match.</p></div>
          </article>
        </div>
      </motion.section>
    </section>
  )
}
