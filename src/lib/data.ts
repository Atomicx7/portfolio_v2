import { StaticImageData } from "next/image"
import type { Timeline } from "../utils/interfaces"
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
  stars?: number
  forks?: number
  highlights?: string[]
}

export const featuredProjects: Project[] = [
  {
    title: "DuoFold — Duo Animation",
    description:
      "iPhone-style Duo fold/opening animation for Android. Per-pixel ray eye → glass → plane with gap-proportional disk blur + darken, RuntimeShader (AGSL), rotation-vector sensor with zero-pose calibration and runtime-resolved hinge.",
    imageUrl: "/duo-animation.svg",
    githubUrl: "https://github.com/Atomicx7/Duo-animation",
    technologies: ["Kotlin", "Jetpack Compose", "Android", "AGSL Shader", "Material 3"],
    stars: 202,
    forks: 31,
    highlights: [
      "Custom AGSL RuntimeShader: per-pixel ray eye → glass → plane with disk blur",
      "Rotation-vector sensor tracking with zero-pose calibration and manual tilt mode",
      "Gap-proportional blur + darken tuned live via FoldParameters uniforms",
    ],
  },
  {
    title: "KOOLNOTES",
    description:
      "AI-powered note-sharing web app with intelligent search, automatic summarization, keyword extraction, and conversational Q&A over stored notes. Scalable REST APIs with JWT auth optimized for multi-user workloads.",
    imageUrl: kool,
    liveUrl: "https://koolnotes.vercel.app",
    githubUrl: "#",
    technologies: ["Next.js", "Node.js", "TypeScript", "MongoDB"],
    highlights: [
      "AI summarization, keyword extraction, and Q&A over stored notes",
      "JWT-authenticated REST APIs built for multi-user workloads",
      "Intelligent search that boosts content retention and discoverability",
    ],
  },
  {
    title: "KWICK",
    description:
      "Service-marketplace app for iOS and Android connecting users with providers via real-time booking status, provider matching, Google Maps live tracking, navigation, and push notifications.",
    imageUrl: kwick,
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["React Native", "Expo", "Node.js", "MongoDB"],
    highlights: [
      "Real-time booking status with provider-matching logic",
      "Google Maps live tracking, turn-by-turn navigation, distance-based matching",
      "Push notifications and modular booking-lifecycle backend services",
    ],
  },
  {
    title: "ADVO-KIDS",
    description:
      "Gamified legal-education platform for children with interactive quizzes and progress tracking; role-based backend with secure REST APIs, shipped as part of a multi-member team.",
    imageUrl: advo,
    liveUrl: "https://advo-kids.inder.pro",
    githubUrl: "#",
    technologies: ["React", "Next.js", "Node.js", "MongoDB"],
    highlights: [
      "Interactive quizzes and progress tracking for young learners",
      "Role-based backend with secure REST APIs",
      "Shipped collaboratively as part of a multi-member team",
    ],
  },
]

export const otherProjects: Project[] = [
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
]

export const allProjects: Project[] = [...featuredProjects, ...otherProjects]

export const timeline: Timeline[] = [
  {
    _id: "0",
    jobTitle: "Software Engineering Intern",
    company_name: "BigBasket (A Tata Enterprise)",
    jobLocation: "Bengaluru, India",
    startDate: "2026-01-01",
    endDate: "2026-07-31",
    summary: "BB Help – AI-Powered Internal IT Support Assistant. Production RAG backend service (FastAPI, Python) serving 1,500+ internal stakeholders.",
    bulletPoints: [
      "Translated business requirements into REST APIs against defined specs in an agile team",
      "Built live automation from 70,000+ helpdesk tickets with RCA mapping, cutting L1 escalations",
      "Integrated backend workflows with Google Workspace Chat for on-call defect resolution",
      "Authored runbooks and debugged production workflows with cross-functional teams",
    ],
    forEducation: false,
    enabled: true,
    sequence: 0,
  },
  {
    _id: "1",
    jobTitle: "Information Technology",
    company_name: "Chandigarh Engineering College",
    jobLocation: "SAS Nagar, India",
    startDate: "2022-07-01",
    endDate: "2026-06-30",
    summary: "B.Tech – Information Technology (CGPA: 9/10) with a focus on Software Engineering",
    bulletPoints: [
      "CGPA 9 / 10",
      "Smart India Hackathon Participant – delivered a working solution under time pressure",
      "Shipped production backend used daily by 1,500+ employees during internship",
    ],
    forEducation: true,
    enabled: true,
    sequence: 1,
  },
]
