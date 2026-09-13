"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      // Touch scrolling stays native on phones — smoother and cheaper.
      syncTouch: false,
      touchMultiplier: coarse ? 1 : 1.5,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

export default SmoothScroll
