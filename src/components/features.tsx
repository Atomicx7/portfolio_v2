"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { skillTiles } from "../content/skills"
import { SectionHeading } from "./layout/section-heading"

function sendProjectFocus(slug?: string) {
  if (!slug) return
  document.dispatchEvent(new CustomEvent("portfolio:project-focus", { detail: slug }))
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "center" })
}

export function Skills() {
  const reduced = useReducedMotion()
  return (
    <section id="skills" className="section-shell border-y border-line bg-surface/40">
      <div className="page-shell">
        <SectionHeading index="03" eyebrow="Capabilities" title="Built across the stack.">
          Hover or tap a tool to trace it to the work it helped ship.
        </SectionHeading>
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {skillTiles.map((tile, index) => (
            <motion.article key={tile.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }} whileHover={reduced ? undefined : { y: -4 }} className={`skill-tile skill-${tile.size}`}>
              <div className="flex items-start justify-between gap-5">
                <div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{tile.kicker}</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">{tile.title}</h3></div>
                <span className="grid size-8 shrink-0 place-items-center border border-line text-muted"><ArrowUpRight className="size-4" /></span>
              </div>
              {tile.title === "Backend & AI" && <div aria-hidden className="pipeline mt-8"><span>Tickets</span><i /><span>Retrieve</span><i /><span>Answer</span></div>}
              {tile.title === "Mobile & GPU" && <div aria-hidden className="shader-mini mt-8"><span /><span /><span /></div>}
              <p className="mt-6 max-w-lg text-sm leading-6 text-muted">{tile.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {tile.skills.map((skill) => <button key={skill.name} onClick={() => sendProjectFocus(skill.projects?.[0])} className="chip" disabled={!skill.projects?.[0]}>{skill.name}</button>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
