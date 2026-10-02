"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import portrait from "../assets/avatar-new2cutout.png"
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
          <motion.dl initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.1 }} className="mt-14 grid grid-cols-3 border-y border-line">
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
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="profile-card-wrap relative mx-auto w-full max-w-sm self-stretch">
          <ProfileCard
            name="Yashdeep Singh"
            title="Software Engineer"
            handle="atomicx7"
            status="Building, learning, shipping"
            contactText="Say hi"
            avatarUrl={portrait.src}
            miniAvatarUrl={portrait.src}
            enableTilt={finePointer}
            enableMobileTilt={false}
            behindGlowEnabled={finePointer}
            behindGlowColor="rgba(25, 93, 210, 0.35)"
            innerGradient="linear-gradient(145deg, rgba(12, 29, 64, 0.96) 0%, rgba(27, 91, 191, 0.52) 100%)"
            onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          />
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Move your cursor over the card</p>
        </motion.div>
      </div>
    </section>
  )
}
