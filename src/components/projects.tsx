"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, ChevronDown, Github, ExternalLink, Star, GitFork, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { featuredProjects, otherProjects, Project } from "../lib/data"

function primaryLink(project: Project): string | undefined {
  if (project.liveUrl && project.liveUrl !== "#") return project.liveUrl
  if (project.githubUrl && project.githubUrl !== "#") return project.githubUrl
  return undefined
}

function IconLinks({ project }: { project: Project }) {
  const showGithub = project.githubUrl && project.githubUrl !== "#"
  const showLive = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== project.githubUrl
  if (!showGithub && !showLive) return null
  return (
    <div className="flex items-center gap-1">
      {showGithub && (
        <Link
          href={project.githubUrl!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} code on GitHub`}
          className="flex size-9 items-center justify-center rounded-full text-zinc-500 transition-all hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
        >
          <Github className="size-4" />
        </Link>
      )}
      {showLive && (
        <Link
          href={project.liveUrl!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live demo`}
          className="flex size-9 items-center justify-center rounded-full text-zinc-500 transition-all hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      )}
    </div>
  )
}

function Stats({ project }: { project: Project }) {
  if (project.stars === undefined && project.forks === undefined) return null
  return (
    <div className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-300">
      {project.stars !== undefined && (
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          {project.stars}
        </span>
      )}
      {project.forks !== undefined && (
        <span className="inline-flex items-center gap-1.5">
          <GitFork className="size-4" />
          {project.forks}
        </span>
      )}
    </div>
  )
}

export function ProjectCard({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project
  index: number
  open: boolean
  onToggle: () => void
}) {
  const href = primaryLink(project)
  const isFeatured = index === 0
  const hasDetails = !!project.highlights?.length || !!href

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 p-5 backdrop-blur-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:gap-7 sm:p-7"
    >
      {/* hover sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100 dark:via-white/10"
      />

      <div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-2xl sm:aspect-auto sm:h-44 sm:w-60 lg:h-48 lg:w-72">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-widest text-zinc-300 dark:text-zinc-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          {isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <Sparkles className="size-3" />
              Featured
            </span>
          )}
          <span className="ml-auto flex items-center gap-1">
            <Stats project={project} />
            <IconLinks project={project} />
            {hasDetails && (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-label={open ? `Collapse ${project.title} details` : `Expand ${project.title} details`}
                className="flex size-9 items-center justify-center rounded-full text-zinc-500 transition-all hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="size-4" />
                </motion.span>
              </button>
            )}
          </span>
        </div>

        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 text-2xl font-extrabold tracking-tight text-zinc-900 transition-colors group-hover:text-purple-600 dark:text-zinc-50 dark:group-hover:text-purple-300 sm:text-3xl"
          >
            {project.title}
            <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        ) : (
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {project.title}
          </h3>
        )}

        <p className="mt-2.5 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
          {project.technologies.join("  ·  ")}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-zinc-200/70 pt-5 mt-5 dark:border-zinc-700/70">
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2.5">
                    {project.highlights.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i }}
                        className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                        />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                )}
                {(project.githubUrl !== "#" || project.liveUrl !== "#") && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      </Link>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export function ProjectList({
  projects,
  offset = 0,
  defaultOpen = 0,
}: {
  projects: Project[]
  offset?: number
  defaultOpen?: number | null
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  return (
    <div className="flex flex-col gap-5">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          index={offset + i}
          open={openIndex === i}
          onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
        />
      ))}
    </div>
  )
}

export function Projects() {
  return (
    <div className="relative py-32 overflow-hidden">
      {/* giant backdrop word */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none text-zinc-900/[0.04] dark:text-white/[0.04]"
      >
        WORK
      </span>
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold tracking-tight mb-4 text-center md:text-6xl"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground text-center mb-14 max-w-2xl mx-auto"
        >
          Shipped products, open source, and experiments — click a row to dig in.
        </motion.p>

        <ProjectList projects={featuredProjects} defaultOpen={0} />

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 mt-14 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          More Projects
        </motion.h3>
        <ProjectList projects={otherProjects} offset={featuredProjects.length} defaultOpen={null} />
      </div>
    </div>
  )
}
