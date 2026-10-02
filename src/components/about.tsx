"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import portrait from "../assets/avatar-new2cutout.png"
import { fadeUp } from "../lib/motion"
import { SectionHeading } from "./layout/section-heading"

const copy = "I built the RAG-based support assistant at BigBasket that serves 1,500+ employees, and the open-source DuoFold animation for Android with 200+ stars. I like problems where backend reliability and visual polish both matter."

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
              ["8.96", "CGPA · B.Tech IT"],
            ].map(([value, label]) => (
              <motion.div variants={fadeUp} key={label} className="py-5 pr-3 first:border-r first:border-line sm:py-7 sm:pr-6 [&:nth-child(2)]:border-r [&:nth-child(2)]:border-line">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">{value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative mx-auto w-full max-w-sm self-stretch border border-line bg-surface">
          <div className="absolute left-0 top-8 z-10 h-px w-full bg-accent" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={portrait} alt="Yashdeep Singh" fill className="object-cover object-[50%_30%] opacity-90 grayscale transition duration-700 hover:grayscale-0" sizes="(max-width: 1024px) 384px, 30vw" />
          </div>
          <div className="relative flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span>Yashdeep Singh</span><span className="text-accent">// 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
