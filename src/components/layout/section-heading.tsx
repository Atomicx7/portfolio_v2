import { motion } from "framer-motion"
import { fadeUp } from "../../lib/motion"

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  align = "left",
}: {
  index: string
  eyebrow: string
  title: string
  children?: React.ReactNode
  align?: "left" | "center"
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ staggerChildren: 0.08 }}
      className={align === "center" ? "reveal-blur mx-auto max-w-3xl text-center" : "reveal-blur max-w-3xl"}
    >
      <motion.p variants={fadeUp} className="eyebrow">
        <span className="text-accent">// {index}</span> — {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="section-title mt-5">
        {title}
      </motion.h2>
      {children && (
        <motion.div variants={fadeUp} className="mt-5 text-base leading-7 text-muted sm:text-lg">
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
