'use client';

import "../app/globals.css";
import { Navigation } from "../components/navigation"
import { Hero } from "../components/hero"
import { About } from "../components/about"
import { Projects } from "../components/projects"
import { Skills } from "../components/features"
import { Journey } from "../components/journey"
import { Contact } from "../components/contact"
import { MouseMoveEffect } from "../components/mouse-move-effect"
import { useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState("default");

  const toggleTheme = () => {
    const themes = ["default", "cyberpunk", "minimal", "comfort"];
   
   
  };


  return (
    <main className="min-h-screen bg-background text-foreground">
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
      <section id="experience">
        <Journey />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}

