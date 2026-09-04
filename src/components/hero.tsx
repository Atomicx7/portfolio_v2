"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FaultyTerminal from "./FaultyTerminal"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-zinc-950" id="hero">
      <motion.div
        aria-hidden="true"
        style={{ y }}
        className="absolute inset-0 z-0 h-[115%] w-full"
      >
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#da23f4"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
          dpr={1}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/35 via-transparent to-zinc-950/90" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] md:text-8xl"
        >
          <span className="inline-block cursor-default transition-all duration-200 hover:scale-[1.02] hover:font-black hover:tracking-tight">
            Hi, I&apos;m
          </span>
          <br />
          <span className="italic">Yashdeep Singh</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-xl text-zinc-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
        >
          Full Stack Developer &amp; UI/UX Designer
        </motion.p>
      </motion.div>
    </div>
  )
}
