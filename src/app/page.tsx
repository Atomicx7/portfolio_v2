import { About } from "../components/about"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Hero } from "../components/hero"
import { Journey } from "../components/journey"
import { Lab } from "../components/lab"
import { Navigation } from "../components/navigation"
import { Projects } from "../components/projects"
import { Skills } from "../components/features"
import { IntroReveal } from "../components/fx/intro-reveal"
import { site } from "../content/site"
import { repoStats } from "../lib/github"

export const revalidate = 3600

export default async function HomePage() {
  const duoStats = await repoStats("Atomicx7", "Duo-animation")
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: "https://atomicx7.dev",
    sameAs: [site.github, site.linkedin],
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-bg text-fg">
      <IntroReveal />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navigation />
      <div id="main-content">
        <Hero />
        <About stats={duoStats} />
        <Projects duoStats={duoStats} />
        <Skills />
        <Journey />
        <Lab />
        <Contact />
      </div>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </main>
  )
}
