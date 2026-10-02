export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

export const dur = { fast: 0.18, base: 0.45, slow: 0.9 } as const

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export const stagger = (s = 0.06) => ({
  show: { transition: { staggerChildren: s } },
})
