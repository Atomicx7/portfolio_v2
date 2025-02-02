"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "../components/ui/button"
import Image, { StaticImageData } from "next/image"
import kool from "../assets/kool.png"

interface Project {
  title: string
  description: string
  imageUrl: string | StaticImageData
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: "Koolnotes.ai",
    description:
      "A full-stack learning and notes uploading platform built with Next.js, featuring upload notes feature and Kool.ai agent.",
    imageUrl: kool,
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
  },
  {
    title: "Kwick",
    description: "Transform text prompts into stunning images using AI. Built with React and OpenAI's API.",
    imageUrl: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "OpenAI", "TailwindCSS", "Node.js"],
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Framer Motion.",
    imageUrl: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
  },
]

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
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
        <motion.div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl">
          <div className="aspect-video relative overflow-hidden">
            <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
          <div className="relative p-8">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">{project.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
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
        </motion.div>
      </div>
    </motion.div>
  )
}

