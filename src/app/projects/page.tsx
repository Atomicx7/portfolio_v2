import { Navigation } from "../../components/navigation"
import { ProjectIndex } from "../../components/projects"
import { repoStats } from "../../lib/github"

export const revalidate = 3600

export default async function AllProjectsPage() {
  const duoStats = await repoStats("Atomicx7", "Duo-animation")
  return (
    <main className="min-h-screen bg-bg pt-32 text-fg">
      <Navigation />
      <div className="page-shell pb-24"><p className="eyebrow"><span className="text-accent">// archive</span> — all work</p><h1 className="section-title mt-5">Project archive.</h1><p className="mt-5 max-w-xl text-lg leading-7 text-muted">A closer look at open-source experiments, production systems, and product builds.</p><div className="mt-14"><ProjectIndex duoStats={duoStats} /></div></div>
    </main>
  )
}
