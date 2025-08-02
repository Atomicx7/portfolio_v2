"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Github, Linkedin, Mail, Twitter, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import resume from "../assets/resume.png"
export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "0px"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Certifications & Resume */}
          <Card className="p-8 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Certifications & Resume</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Certifications */}
              <div className="space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border border-white/20 backdrop-blur-lg bg-white/40 dark:bg-zinc-800/40"
                  >
                    <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt={`Certificate ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white mb-2">Certificate {i + 1}</h3>
                        <p className="text-sm text-zinc-200">Issued by Organization {i + 1}</p>
                      </div>
                    </div>
                    <div className="p-4 backdrop-blur-lg bg-white/40 dark:bg-zinc-800/40 flex justify-end">
                      <Button variant="outline" size="sm" className="bg-white/80 dark:bg-zinc-900/80">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume */}
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden border border-white/20 backdrop-blur-lg bg-white/40 dark:bg-zinc-800/40">
                  <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={resume}
                      alt="Resume Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4 backdrop-blur-lg bg-white/40 dark:bg-zinc-800/40 flex justify-between items-center">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Resume.pdf</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-white/80 dark:bg-zinc-900/80">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact & Socials */}
          <Card className="p-8 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Let's Connect</h2>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full justify-start h-12 text-lg bg-white/80 dark:bg-zinc-900/80">
                <Mail className="w-5 h-5 mr-3" />
                punnyyashdeep@gmail.com
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="https://github.com/atomicx7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-full"
                  tabIndex={-1}
                >
                  <Button variant="outline" className="h-12 bg-white/80 dark:bg-zinc-900/80 w-full">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-deep-singh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-full"
                  tabIndex={-1}
                >
                  <Button variant="outline" className="h-12 bg-white/80 dark:bg-zinc-900/80 w-full">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <Button variant="outline" className="h-12 bg-white/80 dark:bg-zinc-900/80">
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

