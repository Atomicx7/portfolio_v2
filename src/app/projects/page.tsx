"use client"

import { motion } from "framer-motion"
import { ProjectList } from "../../components/projects"
import { allProjects } from "../../lib/data"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8 text-center"
        >
          All Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
        >
          My complete collection of projects, from open source to shipped products.
        </motion.p>
        <ProjectList projects={allProjects} defaultOpen={0} />
      </div>
    </main>
  )
}
