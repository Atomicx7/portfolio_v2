import type { StaticImageData } from "next/image"
import advoKids from "../assets/advo-kids.png"
import koolNotes from "../assets/kool.png"
import kwick from "../assets/kwick.png"
import pixelWalls from "../assets/pixelwalls.png"

export type ProjectTag = "mobile" | "ai" | "web"

export interface Project {
  slug: string
  title: string
  year: number
  tags: ProjectTag[]
  outcome: string
  summary: string
  highlights: string[]
  stack: string[]
  image: string | StaticImageData
  links?: { live?: string; code?: string }
  github?: { owner: string; repo: string }
  media?: { driveId: string; poster: string }
  caseStudy?: { problem: string; approach: string; result: string }
}

export const projects: Project[] = [
  {
    slug: "duofold",
    title: "DuoFold",
    year: 2026,
    tags: ["mobile"],
    outcome: "iPhone-style Duo fold animation for Android, rendered with a custom AGSL shader.",
    summary:
      "An open-source Android experiment that turns a fold interaction into a physically tuned, shader-driven surface.",
    highlights: [
      "Built a custom AGSL RuntimeShader that traces eye → glass → panel per pixel.",
      "Added rotation-vector sensor tracking with zero-pose calibration and a manual tilt mode.",
      "Tuned gap-proportional blur and darkening through live FoldParameters uniforms.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "AGSL", "Material 3"],
    image: "/duo-animation.svg",
    github: { owner: "Atomicx7", repo: "Duo-animation" },
    links: { code: "https://github.com/Atomicx7/Duo-animation" },
    media: {
      driveId: "10RBnfDSVlrWp4Kkp8l8sN-TeqFhdswiX",
      poster: "/duo-animation.svg",
    },
    caseStudy: {
      problem: "Android needed an expressive fold interaction without compromising the illusion at the seam.",
      approach: "Model the visual as a shader pipeline, then drive it with calibrated device orientation data.",
      result: "A reusable, open-source Duo fold effect with live GitHub signals below.",
    },
  },
  {
    slug: "bb-help",
    title: "BB Help",
    year: 2026,
    tags: ["ai", "web"],
    outcome: "Production RAG assistant for 1,500+ internal users, grounded in 70,000+ helpdesk tickets.",
    summary:
      "An internal IT support assistant built during my BigBasket internship. Details here are limited to safe, public resume claims.",
    highlights: [
      "Designed FastAPI services around business requirements and defined REST contracts.",
      "Turned 70,000+ historic helpdesk tickets into automation with RCA mapping.",
      "Connected backend workflows to Google Workspace Chat for on-call defect resolution.",
    ],
    stack: ["Python", "FastAPI", "RAG", "ChromaDB", "GCP"],
    image: "/duo-animation.svg",
    caseStudy: {
      problem: "Internal support knowledge was fragmented across a high-volume ticket history.",
      approach: "Created a retrieval-led support workflow with focused APIs, runbooks, and chat integration.",
      result: "A production service supporting 1,500+ stakeholders while reducing repetitive L1 work.",
    },
  },
  {
    slug: "koolnotes",
    title: "KOOLNOTES",
    year: 2025,
    tags: ["ai", "web"],
    outcome: "AI note-sharing with search, summaries, and Q&A over stored notes.",
    summary:
      "A student-focused notes platform with conversational search and a multi-user API foundation.",
    highlights: [
      "Implemented AI summaries, keyword extraction, and Q&A over notes.",
      "Designed JWT-authenticated REST APIs for a multi-user workload.",
      "Improved discoverability with intelligent note search.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    image: koolNotes,
    links: { live: "https://koolnotes.vercel.app" },
  },
  {
    slug: "kwick",
    title: "KWICK",
    year: 2025,
    tags: ["mobile", "web"],
    outcome: "Cross-platform marketplace with provider matching, live tracking, and push notifications.",
    summary:
      "A service marketplace that brings booking status, location, and notifications into one mobile experience.",
    highlights: [
      "Built booking status and provider-matching workflows.",
      "Integrated live tracking, navigation, and distance-based matching.",
      "Structured modular backend services around the booking lifecycle.",
    ],
    stack: ["React Native", "Expo", "Node.js", "MongoDB"],
    image: kwick,
  },
  {
    slug: "advo-kids",
    title: "ADVO-KIDS",
    year: 2024,
    tags: ["web"],
    outcome: "Gamified legal education for children, with interactive quizzes and progress tracking.",
    summary:
      "A collaborative learning platform that makes legal literacy approachable for young learners.",
    highlights: [
      "Built interactive quiz and progress-tracking flows.",
      "Contributed secure, role-based REST APIs.",
      "Shipped collaboratively as part of a multi-member team.",
    ],
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    image: advoKids,
    links: { live: "https://advo-kids.inder.pro" },
  },
  {
    slug: "pixel-walls",
    title: "Pixel Walls",
    year: 2024,
    tags: ["web"],
    outcome: "A curated wallpaper web experience built with a visual-first UI system.",
    summary: "A personal wallpaper website focused on crisp browsing and an expressive interface.",
    highlights: [
      "Created responsive browsing and collection interactions.",
      "Built the interface with reusable TypeScript and Tailwind primitives.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: pixelWalls,
    links: {
      live: "https://pixelwalls.vercel.app",
      code: "https://github.com/atomicx7/pixelwallsV2",
    },
  },
]
