import React, { useState, useRef } from 'react';
// FIX: Import `Variants` type from framer-motion to resolve type errors.
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Download, ExternalLink, X } from 'lucide-react';
import type { Certificate } from '../../types';
import nptel from '../assets/icons/nptel.png';
import aws from '../assets/icons/aws.png';
import infosys from '../assets/icons/infosys.png';
import mongo from '../assets/icons/Mongodb.png';
import adobe from '../assets/icons/adobe.png';
import sih from '../assets/icons/SIH2.webp';
import { StaticImageData } from "next/image";
import Image from "next/image";
import resumePreview from '../assets/resume.png';

const resumeUrl = "https://drive.google.com/file/d/1bPofobHKLObkoCSNqeQwAs9ZuZOETtaI/view?usp=sharing";

const certificatesData: Certificate[] = [
  {
    id: 1,
    company: 'NPTEL',
    title: 'Programming in Java',
    logo: nptel,
    imageUrl: 'https://picsum.photos/seed/nptel-cert/1200/800',
  },
  {
    id: 2,
    company: 'AWS',
    title: 'Solutions Architect - Associate',
    logo: aws,
    imageUrl: 'https://picsum.photos/seed/aws-cert/1200/800',
  },
  {
    id: 3,
    company: 'Infosys',
    title: 'Certified Python Developer',
    logo: infosys,
    imageUrl: 'https://picsum.photos/seed/infosys-cert/1200/800',
  },
  {
    id: 4,
    company: 'MongoDB',
    title: 'Developer Certification',
    logo: mongo,
    imageUrl: 'https://picsum.photos/seed/mongodb-cert/1200/800',
  },
  {
    id: 5,
    company: 'Adobe',
    title: 'Adobe Creative Suite',
    logo: adobe,
    imageUrl: 'https://picsum.photos/seed/adobe-cert/1200/800',
  },
  {
    id: 6,
    company: 'SIH',
    title: 'Smart India Hackathon Winner',
    logo: sih,
    imageUrl: 'https://picsum.photos/seed/sih-cert/1200/800',
  },
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
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/example',
  },
];

const ImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[90vh] bg-zinc-800 rounded-lg overflow-hidden shadow-2xl"
      >
        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
          aria-label="Close image preview"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export const Contact: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const animationRange = [0.25, 0.4];
  const animationRange2 = [0.6, 0.75];

  const scaleCard1 = useTransform(scrollYProgress, animationRange, [1, 0.9]);
  const yCard1 = useTransform(scrollYProgress, animationRange, [0, -60]);

  const scaleCard2 = useTransform(scrollYProgress, animationRange2, [1, 0.9]);
  const yCard2 = useTransform(scrollYProgress, animationRange2, [0, -30]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div ref={containerRef} className="relative h-[225vh]">
          {/* Resume Section */}
          <motion.div
            style={{ position: 'sticky', top: 0, zIndex: 1, scale: scaleCard1, y: yCard1 }}
            className="h-screen flex items-center"
          >
            <motion.section
              aria-labelledby="resume-heading"
              className="h-[65vh] w-full"
            >
              <div className="bg-indigo-100 dark:bg-indigo-600/80 border border-indigo-200 dark:border-indigo-500 rounded-2xl p-6 sm:p-8 backdrop-blur-lg h-full flex flex-col justify-center">
                <h2 id="resume-heading" className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">My Resume</h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 w-full rounded-lg overflow-hidden border-2 border-zinc-400/50 dark:border-zinc-200/50 group hover:border-zinc-600 dark:hover:border-white transition-all duration-300">
                    <Image
                      src={resumePreview}
                      alt="Resume Preview"
                      width={300}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 w-full space-y-4">
                    <p className="text-indigo-800 dark:text-indigo-100">
                      Here's a snapshot of my professional journey. For a detailed view, feel free to preview or download my resume.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={() => window.open(resumeUrl, '_blank')}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 dark:text-indigo-900 dark:bg-white dark:hover:bg-indigo-100 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Preview
                      </button>
                      <a
                        href={resumeUrl}
                        download="Resume.jpg"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-indigo-400 text-base font-medium rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 dark:text-white dark:bg-indigo-500/50 dark:hover:bg-indigo-500/80 transition-colors"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Certifications Section */}
           <motion.div
            style={{ position: 'sticky', top: 0, zIndex: 2, scale: scaleCard2, y: yCard2 }}
            className="h-screen flex items-center"
          >
            <motion.section
              aria-labelledby="certs-heading"
              className="h-[65vh] w-full"
            >
              <div className="bg-pink-100 dark:bg-pink-600/80 border border-pink-200 dark:border-pink-500 rounded-2xl p-6 sm:p-8 backdrop-blur-lg h-full flex flex-col justify-center">
                <h2 id="certs-heading" className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Certifications</h2>
                <div className="relative">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-600/50">
                    {certificatesData.map((cert) => (
                      <button
                        key={cert.id}
                        onClick={() => setModalImage(cert.imageUrl)}
                        className="group flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center bg-black/5 dark:bg-white/10 rounded-lg p-4 border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                        title={`${cert.company} - ${cert.title}`}
                        aria-label={`View certificate from ${cert.company}: ${cert.title}`}
                      >
                        <Image
                          src={cert.logo}
                          alt={`${cert.company} logo`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                        <p className="mt-2 text-xs text-center text-pink-800 dark:text-pink-100 group-hover:text-pink-900 dark:group-hover:text-white transition-colors">
                          {cert.company}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Let's Connect Section */}
           <motion.div
            style={{ position: 'sticky', top: 0, zIndex: 3 }}
             className="h-screen flex items-center"
          >
            <motion.section
              aria-labelledby="connect-heading"
              className="h-[65vh] w-full"
            >
              <div className="bg-blue-200/40 dark:bg-blue-900/40 border border-blue-300/40 dark:border-blue-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl h-full flex flex-col justify-center">
                <h2 id="connect-heading" className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Let's Connect</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:punnyyashdeep@gmail.com"
                    className="w-full flex items-center p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    <Mail className="w-6 h-6 mr-4 text-zinc-800 dark:text-white" />
                    <span className="text-lg text-zinc-800/90 dark:text-white/90">punnyyashdeep@gmail.com</span>
                  </a>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                          <Icon className="w-6 h-6 mr-3 text-zinc-800/90 dark:text-white/90" />
                          <span className="text-lg text-zinc-800/90 dark:text-white/90">{link.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalImage && <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />}
      </AnimatePresence>
    </div>
  );
};
