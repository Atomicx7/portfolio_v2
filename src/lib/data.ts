import { StaticImageData } from "next/image"
import kool from "../assets/kool.png"
import advo from "../assets/advo-kids.png"
import kwick from "../assets/kwick.png"
import pixelwalls from "../assets/pixelwalls.png"
import ecom from "../assets/ecom.png"
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
    liveUrl: "https://koolnotes.vercel.app",
    githubUrl: "#",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
  },
  {
    title: "Kwick",
    description: "Transform text prompts into stunning images using AI. Built with React and OpenAI's API.",
    imageUrl: kwick,
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["React", "OpenAI", "TailwindCSS", "Node.js"],
  },
  {
    title: "Advo-Kids",
    description: "The modern way to learn about your rights as a child. A platform for children to understand their rights through interactive content.",
    imageUrl: advo,
    liveUrl: "https://advo-kids.inder.pro",
    githubUrl: "#",
    technologies: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
  },
]

export const allProjects: Project[] = [
  {
    title: "Pixel Walls",
    description: "My personal wallpaper website built with React.js, TypeScript, and Tailwind CSS.",
    imageUrl: pixelwalls,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/atomicx7/pixelwallsV2",
    liveUrl: "https://pixelwalls.vercel.app",
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication and payment integration.",
    imageUrl: ecom,
    technologies: ["React Native", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  
  ...featuredProjects.slice(2),
]
