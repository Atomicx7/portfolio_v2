import type { ProjectTag } from "./projects"

export interface SkillTile {
  title: string
  kicker: string
  size: "large" | "medium" | "small"
  description: string
  skills: { name: string; projects?: string[] }[]
  tags: ProjectTag[]
}

export const skillTiles: SkillTile[] = [
  {
    title: "Backend & AI",
    kicker: "RETRIEVE → REASON → RESPOND",
    size: "large",
    description: "Reliable APIs and retrieval flows for support systems people depend on.",
    skills: [
      { name: "FastAPI", projects: ["bb-help"] },
      { name: "RAG", projects: ["bb-help", "koolnotes"] },
      { name: "ChromaDB", projects: ["bb-help"] },
      { name: "GCP", projects: ["bb-help"] },
    ],
    tags: ["ai", "web"],
  },
  {
    title: "Mobile & GPU",
    kicker: "SENSOR → SHADER → SURFACE",
    size: "large",
    description: "Tactile Android experiences where motion has a reason to exist.",
    skills: [
      { name: "Kotlin", projects: ["duofold"] },
      { name: "Compose", projects: ["duofold"] },
      { name: "AGSL", projects: ["duofold"] },
      { name: "React Native", projects: ["kwick"] },
    ],
    tags: ["mobile"],
  },
  {
    title: "Web",
    kicker: "PRODUCT INTERFACES",
    size: "medium",
    description: "Fast, legible web products from UI to API.",
    skills: [
      { name: "Next.js", projects: ["koolnotes", "advo-kids", "pixel-walls"] },
      { name: "React", projects: ["advo-kids"] },
      { name: "Node.js", projects: ["koolnotes", "kwick"] },
    ],
    tags: ["web"],
  },
  {
    title: "Data & cloud",
    kicker: "OPERATIONS",
    size: "medium",
    description: "Data stores and delivery tools that support the build.",
    skills: [
      { name: "MongoDB", projects: ["koolnotes", "kwick", "advo-kids"] },
      { name: "Firestore" },
      { name: "Docker" },
      { name: "CI/CD" },
    ],
    tags: ["web"],
  },
  {
    title: "Practices",
    kicker: "HOW I SHIP",
    size: "small",
    description: "Agile delivery, reviews, testing, and documentation.",
    skills: [{ name: "Code reviews" }, { name: "Testing" }, { name: "Runbooks" }],
    tags: ["web"],
  },
]
