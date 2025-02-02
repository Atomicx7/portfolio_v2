'use client';

import { Navigation } from "../components/navigation"
import { Hero } from "../components/hero"
import { About } from "../components/about"
import { Projects } from "../components/projects"
import { Skills } from "../components/features"
import { Contact } from "../components/contact"
import { MouseMoveEffect } from "../components/mouse-move-effect"
import { ThemeProvider } from "../components/theme-provider";
import { useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState("default");

  const toggleTheme = () => {
    const themes = ["default", "cyberpunk", "minimal", "comfort"];
   
   
  };


  return (
    <ThemeProvider>
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      <MouseMoveEffect />
      <Navigation />
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
    </ThemeProvider>
  )
}

