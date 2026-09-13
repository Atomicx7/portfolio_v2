"use client"

import { motion } from "framer-motion"
import { Cloud, Code2, Database, GitBranch, Server, Smartphone } from "lucide-react"
import { SectionMarquee } from "./section-marquee"

const skills = [
  {
    title: "Languages",
    description: "Java, Python, JavaScript, TypeScript, C++, SQL.",
    icon: <Code2 className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
  {
    title: "Backend & APIs",
    description: "REST API design, Microservices, FastAPI, Node.js, Express.js.",
    icon: <Server className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
  {
    title: "Databases",
    description: "MySQL, MongoDB, Firestore — relational + NoSQL modeling.",
    icon: <Database className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
  {
    title: "Cloud & DevOps",
    description: "GCP, Docker, Jenkins, Git/GitHub, Linux, Postman, CI/CD.",
    icon: <Cloud className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
  {
    title: "Engineering Practices",
    description: "Agile/Scrum, sprint planning, code reviews, unit & integration testing, SDLC.",
    icon: <GitBranch className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
  {
    title: "Core CS + Mobile",
    description: "DSA, OOP, DBMS, OS, CN, System Design; React Native / Expo.",
    icon: <Smartphone className="h-6 w-6 sm:h-7 sm:w-7" />,
  },
]

export function Skills() {
  return (
    <div className="relative py-20 sm:py-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarquee
          eyebrow="Skills"
          title="My Skills"
          sub="The tools and practices I use to ship production software end to end."
          texts={["Skills ✦"]}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl p-5 sm:p-8 flex flex-row items-center gap-4 text-left sm:flex-col sm:text-center"
            >
              <div className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 sm:mb-4 rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/15 dark:from-purple-500/20 dark:to-pink-500/20 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                {skill.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-zinc-900 dark:text-white">{skill.title}</h3>
                <p className="text-[15px] sm:text-base text-zinc-600 dark:text-zinc-400">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
