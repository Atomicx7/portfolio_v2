"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SlideInProps {
  children: ReactNode
  delay?: number
}

export function SlideIn({ children, delay = 0 }: SlideInProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface TransitionProps {
  children: ReactNode
  className?: string
  viewport?: {
    once: boolean
  }
}

export function Transition({ children, className, viewport = { once: true } }: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

