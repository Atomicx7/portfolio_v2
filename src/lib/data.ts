import { StaticImageData } from "next/image"
import kool from "../assets/kool.png"

export interface Project {
  title: string
  description: string
  imageUrl: string | StaticImageData
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
}

export const featuredProjects: Project[] = [
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
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["React", "OpenAI", "TailwindCSS", "Node.js"],
  },
  {
    title: "Advo-Kids",
    description: "The modern way to learn about your rights as a child. A platform for children to understand their rights through interactive content.",
    imageUrl: "/placeholder.svg?height=600&width=801",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
  },
]

export const allProjects: Project[] = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    imageUrl: "/projects/portfolio.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication and payment integration.",
    imageUrl: "/projects/ecommerce.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://yourecommerce.com",
  },
  
  ...featuredProjects.slice(2),
]
