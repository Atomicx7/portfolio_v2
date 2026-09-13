import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Download, ExternalLink, Award } from 'lucide-react';
import Image, { StaticImageData } from "next/image";
import resumePreview from '../assets/resume.png';
import nptel from '../assets/icons/nptel.png';
import aws from '../assets/icons/aws.png';
import infosys from '../assets/icons/infosys.png';
import mongo from '../assets/icons/Mongodb.png';

const resumeUrl = "/Yashdeep_Singh_Resume.pdf";

interface Cert {
  id: number;
  issuer: string;
  title: string;
  logo?: StaticImageData;
  initials: string;
}

const certificatesData: Cert[] = [
  { id: 1, issuer: 'Microsoft & LinkedIn', title: 'Career Essentials in Generative AI', initials: 'MS' },
  { id: 2, issuer: 'Generative AI', title: 'Working with Large Language Models', initials: 'AI' },
  { id: 3, issuer: 'Agentic AI', title: 'Build Your First Agentic AI System', initials: 'AG' },
  { id: 4, issuer: 'AWS', title: 'AWS Cloud Foundations', logo: aws, initials: 'AW' },
  { id: 5, issuer: 'MongoDB', title: 'MongoDB Certification', logo: mongo, initials: 'MG' },
  { id: 6, issuer: 'NPTEL', title: 'Database Management Systems', logo: nptel, initials: 'NP' },
  { id: 7, issuer: 'Data Engineering', title: 'Data Engineering Fundamentals', initials: 'DE' },
  { id: 8, issuer: 'Infosys Springboard', title: 'Software Engineering', logo: infosys, initials: 'IS' },
  { id: 9, issuer: 'Infosys Springboard', title: 'Java Programming', logo: infosys, initials: 'IS' },
];

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/atomicx7',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/yash-deep-singh/',
  },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 rounded-3xl p-5 sm:p-8 backdrop-blur-lg shadow-xl h-full flex flex-col justify-center overflow-y-auto">
      {children}
    </div>
  );
}

function CardHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="flex-shrink-0 mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-1.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
    </div>
  );
}

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Card 1 (Resume) animation: Animate out as Card 2 comes into view
  const scaleCard1 = useTransform(scrollYProgress, [0.3, 0.45], [1, 0.9]);
  const yCard1 = useTransform(scrollYProgress, [0.3, 0.45], [0, -80]);

  // Card 2 (Certs) animation: Animate out as Card 3 comes into view
  const scaleCard2 = useTransform(scrollYProgress, [0.63, 0.78], [1, 0.95]);
  const yCard2 = useTransform(scrollYProgress, [0.63, 0.78], [0, -40]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background text-foreground py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div ref={containerRef} className="relative h-[300vh]">
          {/* Resume Section */}
          <div
            style={{ zIndex: 1 }}
            className="sticky top-[calc(50vh-32.5vh)] md:top-[calc(50vh-37.5vh)] h-screen flex items-center justify-center"
          >
            <motion.section
              style={{ scale: scaleCard1, y: yCard1 }}
              aria-labelledby="resume-heading"
              className="h-[65vh] md:h-[75vh] w-full"
            >
              <Shell>
                <CardHeading eyebrow="Resume" title="My Resume" id="resume-heading" />
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center min-h-0">
                  <div className="md:w-1/3 w-full max-w-[180px] md:max-w-[240px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-zinc-200/70 dark:border-zinc-700/70 shadow-lg flex-shrink-0">
                    <Image
                      src={resumePreview}
                      alt="Resume Preview"
                      width={300}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 w-full space-y-4 text-center md:text-left">
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      Everything in one place — my experience, projects, skills and education.
                      Preview the full PDF or download it below.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <button
                        onClick={() => window.open(resumeUrl, '_blank')}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border border-zinc-300 dark:border-zinc-600 text-sm sm:text-base font-semibold rounded-xl text-zinc-900 dark:text-zinc-100 bg-white/60 dark:bg-zinc-700/60 hover:border-purple-500/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Preview
                      </button>
                      <a
                        href={resumeUrl}
                        download="Yashdeep_Singh_Resume.pdf"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </Shell>
            </motion.section>
          </div>

          {/* Certifications Section */}
          <div
            style={{ zIndex: 2 }}
            className="sticky top-[calc(50vh-32.5vh)] md:top-[calc(50vh-37.5vh)] h-screen flex items-center justify-center"
          >
            <motion.section
              style={{ scale: scaleCard2, y: yCard2 }}
              aria-labelledby="certs-heading"
              className="h-[65vh] md:h-[75vh] w-full"
            >
              <Shell>
                <CardHeading eyebrow="Credentials" title="Certifications" id="certs-heading" />
                <ul className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 overflow-y-auto min-h-0 pr-1">
                  {certificatesData.map((cert, i) => (
                    <motion.li
                      key={cert.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.35 }}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/50 px-3.5 py-2.5 transition-colors hover:border-purple-500/40 dark:hover:border-purple-400/30"
                    >
                      {cert.logo ? (
                        <Image
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          width={40}
                          height={40}
                          className="w-9 h-9 object-contain flex-shrink-0"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex w-9 h-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-extrabold text-zinc-700 dark:text-zinc-200"
                        >
                          {cert.initials}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {cert.issuer}
                        </span>
                        <span className="block truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {cert.title}
                        </span>
                      </span>
                      <Award className="ml-auto size-4 flex-shrink-0 text-purple-500/60 dark:text-purple-300/60" />
                    </motion.li>
                  ))}
                </ul>
              </Shell>
            </motion.section>
          </div>

          {/* Let's Connect Section */}
          <div
            style={{ zIndex: 3 }}
            className="sticky top-[calc(50vh-32.5vh)] md:top-[calc(50vh-37.5vh)] h-screen flex items-center justify-center"
          >
            <motion.section
              aria-labelledby="connect-heading"
              className="h-[65vh] md:h-[75vh] w-full"
            >
              <Shell>
                <CardHeading eyebrow="Contact" title="Let's Connect" id="connect-heading" />
                <p className="-mt-2 mb-5 text-sm md:text-base text-zinc-600 dark:text-zinc-300">
                  The fastest way to reach me is email — my inbox is always open.
                </p>
                <div className="space-y-3">
                  <motion.a
                    href="mailto:punnyyashdeep@gmail.com"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full flex items-center p-3.5 sm:p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/50 hover:border-purple-500/40 dark:hover:border-purple-400/30 transition-colors"
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-purple-600 dark:text-purple-300 flex-shrink-0" />
                    <span className="text-sm sm:text-lg text-zinc-900 dark:text-zinc-100 break-all">
                      punnyyashdeep@gmail.com
                    </span>
                  </motion.a>
                  <motion.a
                    href="tel:+917690000318"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                    className="w-full flex items-center p-3.5 sm:p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/50 hover:border-purple-500/40 dark:hover:border-purple-400/30 transition-colors"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-purple-600 dark:text-purple-300 flex-shrink-0" />
                    <span className="text-sm sm:text-lg text-zinc-900 dark:text-zinc-100">
                      +91 76900 00318
                    </span>
                  </motion.a>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.12 + index * 0.08 }}
                          className="flex items-center justify-center p-3.5 sm:p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/50 hover:border-purple-500/40 dark:hover:border-purple-400/30 hover:-translate-y-0.5 transition-all"
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-zinc-800 dark:text-zinc-100" />
                          <span className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-100">
                            {link.name}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </Shell>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};
