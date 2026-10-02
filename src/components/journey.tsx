"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import { useState } from "react"
import { experience } from "../content/experience"
import { SectionHeading } from "./layout/section-heading"

function Entry({ entry, open, onToggle, last }: { entry: (typeof experience)[number]; open: boolean; onToggle: () => void; last: boolean }) {
  return (
    <article className="timeline-entry">
      {!last && <span aria-hidden className="timeline-line" />}
      <span aria-hidden className="timeline-dot" />
      <div className="border-b border-line pb-7 sm:pb-9">
        <button onClick={onToggle} aria-expanded={open} className="group grid w-full grid-cols-[1fr_auto] gap-4 text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{entry.version}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{entry.title}</h3>
            <p className="mt-1 text-sm text-muted">{entry.organization}</p>
          </div>
          <span className="grid size-9 place-items-center self-start border border-line transition-colors group-hover:border-accent"><motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="size-4" /></motion.span></span>
        </button>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"><span>{entry.dates}</span><span className="inline-flex items-center gap-1"><MapPin className="size-3" />{entry.location}</span></div>
        <AnimatePresence initial={false}>
          {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32 }} className="overflow-hidden"><div className="max-w-2xl pt-6"><p className="text-sm leading-6 text-fg">{entry.summary}</p><ul className="mt-5 space-y-3">{entry.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted"><span className="mt-2 size-1.5 shrink-0 bg-accent" />{bullet}</li>)}</ul></div></motion.div>}
        </AnimatePresence>
      </div>
    </article>
  )
}

export function Journey() {
  const [open, setOpen] = useState<string | null>("bigbasket")
  return (
    <section id="experience" className="section-shell border-y border-line bg-surface/30">
      <div className="page-shell grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading index="04" eyebrow="Experience" title="A changelog of shipped work.">
          The details behind the selected work: one production internship, one strong technical foundation.
        </SectionHeading>
        <div className="pt-2">{experience.map((entry, index) => <Entry key={entry.id} entry={entry} open={entry.id === open} onToggle={() => setOpen((value) => value === entry.id ? null : entry.id)} last={index === experience.length - 1} />)}</div>
      </div>
    </section>
  )
}
