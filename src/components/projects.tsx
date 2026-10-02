"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github, Play, Star, X } from "lucide-react"
import { useEffect, useState } from "react"
import { projects, type Project, type ProjectTag } from "../content/projects"
import type { RepoStats } from "../lib/github"
import { SectionHeading } from "./layout/section-heading"

const filters: { id: "all" | ProjectTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
]

function ProjectVisual({ project }: { project: Project }) {
  if (project.slug === "bb-help") return <div className="case-visual case-visual-bb" aria-hidden><span>BB</span><i /><small>RAG / SUPPORT</small></div>
  return <Image src={project.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 768px) 100vw, 700px" />
}

function ProjectDialog({ project, stats, onClose }: { project: Project | null; stats: RepoStats; onClose: () => void }) {
  return (
    <Dialog.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm" />
        {project && (
          <Dialog.Content data-lenis-prevent className="case-dialog">
            <div className="flex items-start justify-between gap-5 border-b border-line px-5 py-4 sm:px-7">
              <div><p className="eyebrow"><span className="text-accent">// {project.year}</span> — CASE STUDY</p><Dialog.Title className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</Dialog.Title></div>
              <Dialog.Close className="grid size-10 shrink-0 place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-fg" aria-label="Close case study"><X className="size-4" /></Dialog.Close>
            </div>
            <div className="max-h-[calc(90vh-82px)] overflow-y-auto" data-lenis-prevent>
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="min-h-[280px] border-b border-line bg-[#101015] lg:min-h-[520px] lg:border-b-0 lg:border-r">
                  {project.media ? (
                    <iframe
                      className="h-full min-h-[280px] w-full lg:min-h-[520px]"
                      src={`https://drive.google.com/file/d/${project.media.driveId}/preview`}
                      title={`${project.title} video demo`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : <div className="case-art"><ProjectVisual project={project} /></div>}
                </div>
                <div className="p-5 sm:p-7">
                  <Dialog.Description className="text-base leading-7 text-muted">{project.summary}</Dialog.Description>
                  {project.caseStudy && <dl className="mt-8 space-y-5 border-y border-line py-6"><div><dt className="eyebrow text-accent">Problem</dt><dd className="mt-2 text-sm leading-6 text-fg">{project.caseStudy.problem}</dd></div><div><dt className="eyebrow text-accent">Approach</dt><dd className="mt-2 text-sm leading-6 text-fg">{project.caseStudy.approach}</dd></div><div><dt className="eyebrow text-accent">Result</dt><dd className="mt-2 text-sm leading-6 text-fg">{project.caseStudy.result}</dd></div></dl>}
                  <div className="mt-7"><p className="eyebrow">Build notes</p><ul className="mt-4 space-y-3">{project.highlights.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div>
                  {project.slug === "duofold" && <div className="mt-7 flex gap-5 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.12em] text-muted"><span><Star className="mr-1 inline size-3.5 text-accent" />{stats.stars} stars</span><span>{stats.downloads.toLocaleString()}+ downloads</span></div>}
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.links?.code && <a href={project.links.code} target="_blank" rel="noreferrer" className="button button-small"><Github className="size-4" />Code</a>}
                    {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="button button-small button-quiet"><ExternalLink className="size-4" />Live site</a>}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function ProjectIndex({ duoStats, compact = false }: { duoStats: RepoStats; compact?: boolean }) {
  const [filter, setFilter] = useState<"all" | ProjectTag>("all")
  const [selected, setSelected] = useState<Project | null>(null)
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const focusProject = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail
      setFilter("all")
      setFocusedSlug(slug)
      window.setTimeout(() => document.getElementById(`project-${slug}`)?.focus({ preventScroll: false }), 50)
    }
    document.addEventListener("portfolio:project-focus", focusProject)
    return () => document.removeEventListener("portfolio:project-focus", focusProject)
  }, [])
  const visibleProjects = projects.filter((project) => filter === "all" || project.tags.includes(filter))

  return (
    <>
      {!compact && <div className="mb-12 flex flex-wrap gap-2" aria-label="Filter projects">{filters.map((item) => <button key={item.id} onClick={() => { setFilter(item.id); setFocusedSlug(null) }} className={`filter-chip ${filter === item.id ? "is-active" : ""}`}>{item.label}</button>)}</div>}
      <div className="project-list border-t border-line">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => {
            const focused = focusedSlug === project.slug
            return (
              <motion.article key={project.slug} id={`project-${project.slug}`} tabIndex={-1} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }} transition={{ duration: 0.35 }} className={`project-row group ${focused ? "project-focused" : ""}`}>
                <button className="absolute inset-0 z-10 cursor-pointer" onClick={() => setSelected(project)} aria-label={`Open ${project.title} case study`} />
                <div className="relative z-0 grid gap-5 py-7 md:grid-cols-[70px_minmax(0,1fr)_minmax(150px,0.45fr)_90px] md:items-center md:gap-7 md:py-9">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}{project.slug === "duofold" && <span className="ml-2 inline-flex align-middle text-accent"><Play className="size-4 fill-current" /></span>}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">{project.outcome}</p></div>
                  <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}{project.slug === "duofold" && <span className="tag border-accent/50 text-fg"><Star className="size-3 text-accent" />{duoStats.stars}</span>}</div>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:justify-end"><span className="transition-transform duration-300 group-hover:translate-x-1">View</span><ArrowUpRight className="size-4 text-accent" /></span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[44%] overflow-hidden opacity-0 transition duration-500 group-hover:opacity-100 md:block"><ProjectVisual project={project} /><div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" /></div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>
      <ProjectDialog project={selected} stats={duoStats} onClose={() => setSelected(null)} />
    </>
  )
}

export function Projects({ duoStats }: { duoStats: RepoStats }) {
  return (
    <section id="work" className="section-shell">
      <div className="page-shell">
        <SectionHeading index="02" eyebrow="Selected work" title="Built to be used.">
          Open-source experiments, production systems, and products with a real interaction at the center.
        </SectionHeading>
        <div className="mt-12"><ProjectIndex duoStats={duoStats} /></div>
      </div>
    </section>
  )
}
