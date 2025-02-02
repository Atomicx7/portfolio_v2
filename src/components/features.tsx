"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Code2, Database, Layout, Palette, Server, Smartphone } from "lucide-react"

const skills = [
  {
    title: "Web Development",
    description: "Proficient in HTML, CSS, JavaScript, React, Next.js, and more.",
    icon: <Code2 />,
  },
  {
    title: "UI/UX Design",
    description: "Experienced in designing user-friendly and visually appealing interfaces.",
    icon: <Palette />,
  },
  {
    title: "Backend Development",
    description: "Skilled in Node.js, Express.js, and database management.",
    icon: <Server />,
  },
  {
    title: "Mobile Development",
    description: "Familiar with React Native and cross-platform development.",
    icon: <Smartphone />,
  },
  {
    title: "Database Management",
    description: "Experienced with SQL and NoSQL databases.",
    icon: <Database />,
  },
  {
    title: "UI Frameworks",
    description: "Proficient in Tailwind CSS, Material UI, and other UI frameworks.",
    icon: <Layout />,
  },
]

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-900/50"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Light mode animated backgrounds */}
        <motion.div
          className="absolute -left-20 top-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-20 dark:opacity-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 dark:opacity-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Dark mode animated backgrounds */}
        <motion.div
          className="absolute -left-20 top-0 w-40 h-40 bg-zinc-200 rounded-full blur-3xl opacity-0 dark:opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-0 w-40 h-40 bg-zinc-300 rounded-full blur-3xl opacity-0 dark:opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-6 rounded-xl bg-white/40 dark:bg-zinc-800/40 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">{skill.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

