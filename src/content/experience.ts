export interface TimelineEntry {
  id: string
  kind: "experience" | "education"
  version: string
  title: string
  organization: string
  location: string
  dates: string
  summary: string
  bullets: string[]
}

export const experience: TimelineEntry[] = [
  {
    id: "bigbasket",
    kind: "experience",
    version: "v2026.01 — v2026.07",
    title: "Software Engineering Intern",
    organization: "BigBasket · A Tata Enterprise",
    location: "Bengaluru, India",
    dates: "Jan 2026 — Jul 2026",
    summary: "BB Help — AI-powered internal IT support assistant.",
    bullets: [
      "Built production FastAPI backend services for 1,500+ internal stakeholders.",
      "Created ticket-driven automation from 70,000+ helpdesk records with RCA mapping.",
      "Integrated Google Workspace Chat workflows, runbooks, and production debugging practices.",
    ],
  },
  {
    id: "cec",
    kind: "education",
    version: "v2022.07 — v2026.06",
    title: "B.Tech, Information Technology",
    organization: "Chandigarh Engineering College",
    location: "SAS Nagar, India",
    dates: "Jul 2022 — Jun 2026",
    summary: "Software engineering focus · CGPA 8.96 / 10.",
    bullets: [
      "Smart India Hackathon participant — delivered a working solution under time pressure.",
      "Built a strong base in systems, databases, networks, and practical software delivery.",
    ],
  },
]
