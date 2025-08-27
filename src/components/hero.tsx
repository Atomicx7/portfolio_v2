"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden" id="hero">
      <div className="absolute inset-0">
        <Image
          src=""
          alt="Hero Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight"
        >
          <span className="inline-block transition-all duration-200 hover:font-black hover:tracking-tight hover:scale-[1.02] cursor-default">
            Hi, I'm
          </span>
          <br />
          <span className="italic">{`Yashdeep Singh`}</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xl text-zinc-700 dark:text-zinc-200 max-w-2xl"
        >
          Full Stack Developer & UI/UX Designer
        </motion.p>
      </motion.div>
    </div>
  )
}

