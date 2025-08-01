"use client"

import type { About as AboutType, Timeline } from "../utils/interfaces"
import Image from "next/image"
import { type Dispatch, type SetStateAction, useState } from "react"
import { motion } from "framer-motion"
import { formatDate } from "../utils"
import { SlideIn, Transition } from "./ui"
import avatarImg from "../assets/iamge.png";

interface AboutProps {
  about: AboutType
  timeline: Timeline[]
}

const defaultAbout: AboutType = {
  quote: "Turning Ideas into Reality",
  description:
    "I'm a passionate developer with a keen eye for design and a love for creating seamless user experiences. With expertise in both frontend and backend technologies, I bring ideas to life through clean, efficient code.",
  name: "Yashdeep Singh",
  avatar: {
    url: avatarImg.src,
  },
}

const defaultTimeline: Timeline[] = [
  {
    _id: "1",
    jobTitle: "Information Technology",
    company_name: "Chandigarh Engineering College",
    jobLocation: "SAS Nagar, India",
    startDate: "2022-07-01",
    endDate: "2026-06-30",
    summary: "Studied Information Technology with a focus on Software Engineering and Information Technology",
    bulletPoints: [
      "Dean's List for Academic Excellence",
      "Filed a patent for Home cleaning and helping service",
      "Completed multiple projects in Web Development",
    ],
    forEducation: true,
    enabled: true,
    sequence: 1,
  },
  // {
  //   _id: "2",
  //   jobTitle: "Masters in AI",
  //   company_name: "MIT",
  //   jobLocation: "Massachusetts, USA",
  //   startDate: "2022-09-01",
  //   endDate: "2024-05-30",
  //   summary: "Specialized in Artificial Intelligence and Machine Learning",
  //   bulletPoints: [
  //     "Published research paper on Deep Learning",
  //     "Teaching Assistant for Advanced Algorithm course",
  //     "Developed novel approaches to computer vision",
  //   ],
  //   forEducation: true,
  //   enabled: true,
  //   sequence: 2,
  // },
]

export function About({ about = defaultAbout, timeline = defaultTimeline }: Partial<AboutProps>) {
  const [activeIndex, setActiveIndex] = useState(0)

  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence)

  return (
    <section className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-8 relative" id="about">
      <div>
        <h3 className="md:text-5xl text-2xl font-bold overflow-hidden uppercase pb-8">
          <SlideIn>{about.quote}</SlideIn>
        </h3>
        <Transition viewport={{ once: true }}>
          <p className="text-xl md:text-4xl text-zinc-600 dark:text-zinc-400">{about.description}</p>
        </Transition>
        <div className="pt-10">
          <div className="py-10 overflow-hidden grid w-full">
            {education.map((edu, index) => (
              <Transition key={edu._id}>
                <TimelineCard index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} timeline={edu} />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="sticky top-6">
          <Transition>
            <Image
              src={about.avatar.url || "/placeholder.svg"}
              width={400}
              height={400}
              alt={about.name}
              className="rounded-xl max-md:aspect-square object-cover"
            />
          </Transition>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  timeline: Timeline
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  index: number
}

const TimelineCard = ({ timeline, activeIndex, setActiveIndex, index }: TimelineCardProps) => (
  <div className="border-b border-zinc-200 dark:border-zinc-800 py-4">
    <div
      className="flex items-center justify-between gap-4 cursor-pointer select-none"
      onClick={() => setActiveIndex(index)}
    >
      <span>0{index + 1}</span>
      <span className="text-xl md:text-3xl font-bold flex-1">{timeline.jobTitle}</span>
      <div className="relative size-6 flex items-center justify-center">
        <span className="bg-zinc-900 dark:bg-zinc-100 w-4 md:w-6 h-0.5 absolute" />
        <motion.span
          initial={{ rotate: 90 }}
          animate={{
            rotate: activeIndex === index ? 0 : 90,
          }}
          className="absolute bg-zinc-900 dark:bg-zinc-100 w-4 md:w-6 h-0.5 rotate-90"
        />
      </div>
    </div>
    <motion.div
      initial={{
        height: activeIndex === index ? "100%" : 0,
      }}
      animate={{
        height: activeIndex === index ? "100%" : 0,
      }}
      className="overflow-hidden"
    >
      <p className="text-zinc-600 dark:text-zinc-400 py-4 max-md:text-sm">{timeline.summary}</p>
      <div className="flex justify-between items-center pb-3 text-zinc-700 dark:text-zinc-300">
        <div className="max-md:text-sm">
          <span>{timeline.company_name}</span>
          <span className="ml-2">{timeline.jobLocation}</span>
        </div>
        <div className="max-md:text-xs">
          <span className="italic">
            {formatDate(timeline.startDate).month + ", " + formatDate(timeline.startDate).year}
          </span>
          {" - "}
          <span className="italic">
            {formatDate(timeline.endDate).month + ", " + formatDate(timeline.endDate).year}
          </span>
        </div>
      </div>
      <ul className="list-disc list-inside">
        {timeline.bulletPoints.map((point, index) => (
          <li key={index} className="text-zinc-700 dark:text-zinc-300 max-md:text-sm">
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
)

export default About

