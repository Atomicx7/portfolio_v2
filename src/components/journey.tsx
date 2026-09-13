"use client"

import type { Timeline } from "../utils/interfaces"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Briefcase, ChevronDown, GraduationCap, MapPin } from "lucide-react"
import { formatDate } from "../utils"
import { timeline as defaultTimeline } from "../lib/data"
import { SectionMarquee } from "./section-marquee"

function dateRange(startDate: string, endDate: string) {
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  return `${start.month}, ${start.year} – ${end.month}, ${end.year}`
}

function JourneyEntry({
  entry,
  expanded,
  onToggle,
  last,
}: {
  entry: Timeline
  expanded: boolean
  onToggle: () => void
  last: boolean
}) {
  const Icon = entry.forEducation ? GraduationCap : Briefcase
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-10 pb-5 last:pb-0 sm:pl-12 sm:pb-6"
    >
      {!last && (
        <span aria-hidden className="absolute left-[15px] top-9 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 sm:left-[19px] sm:top-10" />
      )}
      <span className="absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border border-zinc-200/70 bg-white shadow-sm dark:border-zinc-700/70 dark:bg-zinc-800 sm:size-10">
        <Icon className="size-4 text-purple-600 dark:text-purple-300" />
      </span>

      <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-6"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-100 sm:truncate sm:text-xl">
              {entry.jobTitle}
            </span>
            <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400 sm:truncate">
              {entry.company_name}
            </span>
            <span className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {entry.jobLocation}
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 font-medium dark:bg-zinc-700">
                {dateRange(entry.startDate, entry.endDate)}
              </span>
            </span>
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700"
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-zinc-200/60 px-5 py-5 dark:border-zinc-700/60 sm:px-6">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-[15px]">
                  {entry.summary}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {entry.bulletPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i }}
                      className="flex gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                    >
                      <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function Journey({ timeline = defaultTimeline }: { timeline?: Timeline[] }) {
  const [expandedId, setExpandedId] = useState<string | null>("0")

  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence)
  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence)

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id))

  return (
    <div className="relative py-20 sm:py-32 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <SectionMarquee
          eyebrow="Journey"
          title="Experience & Education"
          sub="Where I've worked and what I've studied."
          texts={["Experience ✦", "Education ✦"]}
        />

        {experience.length > 0 && (
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Experience
            </motion.h3>
            {experience.map((entry, i) => (
              <JourneyEntry
                key={entry._id}
                entry={entry}
                last={i === experience.length - 1}
                expanded={expandedId === entry._id}
                onToggle={() => toggle(entry._id)}
              />
            ))}
          </div>
        )}

        <div>
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Education
          </motion.h3>
          {education.map((entry, i) => (
            <JourneyEntry
              key={entry._id}
              entry={entry}
              last={i === education.length - 1}
              expanded={expandedId === entry._id}
              onToggle={() => toggle(entry._id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journey
