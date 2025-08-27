"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "../../components/projects"
import { allProjects } from "../../lib/data"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8 text-center"
        >
          Other Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-600 dark:text-zinc-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Explore my complete collection of projects, showcasing my skills and experience in web development.
        </motion.p>
        <div className="grid gap-8 md:grid-cols-2">
          {allProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}