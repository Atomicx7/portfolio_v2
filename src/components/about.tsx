"use client"

import type { About as AboutType, Timeline } from "../utils/interfaces"
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion"
import { Download, GitFork, GraduationCap, Star } from "lucide-react"
import ProfileCard from "./ProfileCard"
import avatarImg from "../assets/avatar-new2cutout.png"

interface AboutProps {
  about: AboutType
  timeline: Timeline[]
}

const defaultAbout: AboutType = {
  quote: "Turning Ideas into Reality",
  description:
    "I'm a passionate developer with a keen eye for design and a love for creating seamless user experiences. With expertise in both frontend and backend technologies, I bring ideas to life through clean, efficient code.",
  name: "Yashdeep Singh",
  avatar: {
    url: avatarImg.src,
  },
}

/* ---------- scroll-linked word reveal ---------- */

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span
      style={{ opacity }}
      whileHover={{ scale: 1.12, color: "#c084fc" }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="mr-[0.26em] inline-block cursor-default"
    >
      {word}
    </motion.span>
  )
}

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  })
  const words = text.split(" ")
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </p>
  )
}

/* ---------- animated counters ---------- */

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number
  decimals?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const duration = 1400
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setVal(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const stats = [
  { icon: Download, value: 5.6, suffix: "k+", decimals: 1, label: "DuoFold v1 downloads" },
  { icon: Star, value: 202, suffix: "", decimals: 0, label: "GitHub stars on DuoFold" },
  { icon: GraduationCap, value: 9, suffix: "/10", decimals: 0, label: "CGPA, B.Tech IT" },
  { icon: GitFork, value: 31, suffix: "", decimals: 0, label: "Forks on DuoFold" },
]

/* ---------- section ---------- */

export function About({ about = defaultAbout }: Partial<AboutProps>) {
  const quoteWords = about.quote.split(" ")
  // Tilt + hover loops are desktop-only: they jank low-end phone GPUs.
  const [finePointer, setFinePointer] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setFinePointer(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <section id="about" className="relative py-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          About
        </motion.p>

        <h3 className="mx-auto mb-10 sm:mb-12 max-w-5xl text-center text-4xl font-bold uppercase leading-[1.05] sm:text-5xl md:text-7xl">
          {quoteWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                className={`mr-[0.24em] inline-block ${
                  i === quoteWords.length - 1
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h3>

        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <ScrollRevealText
              text={about.description}
              className="max-w-3xl text-xl font-medium leading-snug text-foreground/90 sm:text-2xl md:text-[2rem] md:leading-[1.35]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="inline-block size-2 animate-pulse rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
              Scroll to read
            </motion.p>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-zinc-200/60 bg-white/70 p-5 shadow-lg backdrop-blur-lg transition-colors hover:border-purple-500/40 dark:border-zinc-700/60 dark:bg-zinc-800/70 dark:hover:border-purple-400/40"
                >
                  <stat.icon className="mb-3 size-5 text-purple-600 dark:text-purple-300" />
                  <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
                    <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[360px]"
            >
              <ProfileCard
                name={about.name}
                title="Software Engineer"
                handle="atomicx7"
                status="Open to Work"
                contactText="Contact Me"
                avatarUrl={about.avatar.url || avatarImg.src}
                miniAvatarUrl={about.avatar.url || avatarImg.src}
                iconUrl="/assets/demo/iconpattern.svg"
                showUserInfo={true}
                enableTilt={finePointer}
                enableMobileTilt={false}
                behindGlowEnabled={finePointer}
                behindGlowColor="rgba(168, 85, 247, 0.55)"
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                // Below sm the card switches from fixed-height to width-driven
                // so it stays centered instead of overflowing its column.
                className="max-sm:[&_section]:!h-auto max-sm:[&_section]:!max-h-none max-sm:[&_section]:!w-full"
                onContactClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
