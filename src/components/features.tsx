"use client"

import { motion } from "framer-motion"
import { Cloud, Code2, Database, GitBranch, Server, Smartphone } from "lucide-react"

const skills = [
  {
    title: "Languages",
    description: "Java, Python, JavaScript, TypeScript, C++, SQL.",
    icon: <Code2 className="w-7 h-7" />,
  },
  {
    title: "Backend & APIs",
    description: "REST API design, Microservices, FastAPI, Node.js, Express.js.",
    icon: <Server className="w-7 h-7" />,
  },
  {
    title: "Databases",
    description: "MySQL, MongoDB, Firestore — relational + NoSQL modeling.",
    icon: <Database className="w-7 h-7" />,
  },
  {
    title: "Cloud & DevOps",
    description: "GCP, Docker, Jenkins, Git/GitHub, Linux, Postman, CI/CD.",
    icon: <Cloud className="w-7 h-7" />,
  },
  {
    title: "Engineering Practices",
    description: "Agile/Scrum, sprint planning, code reviews, unit & integration testing, SDLC.",
    icon: <GitBranch className="w-7 h-7" />,
  },
  {
    title: "Core CS + Mobile",
    description: "DSA, OOP, DBMS, OS, CN, System Design; React Native / Expo.",
    icon: <Smartphone className="w-7 h-7" />,
  },
]

export function Skills() {
  return (
    <div className="relative py-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center"
        >
          My Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
        >
          The tools and practices I use to ship production software end to end.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl p-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/15 dark:from-purple-500/20 dark:to-pink-500/20 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">{skill.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
