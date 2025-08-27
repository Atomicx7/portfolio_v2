"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { featuredProjects, Project } from "../lib/data"

export function Projects() {
  return (
    <div className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Featured Projects
        </motion.h2>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
        <div className="text-center mt-4">
          <Link href="/projects">
            <Button className="py-4 px-8 text-lg font-semibold">Explore All Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? 200 : -200, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x,
      }}
      className="mb-32"
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl h-full flex flex-col">
          <div className="aspect-video relative overflow-hidden">
            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
          </div>
          <div className="relative p-8 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">{project.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              {project.githubUrl && (
                <Button variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              )}
              {project.liveUrl && (
                <Button>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
