import { labItems } from "../content/lab"

export function Lab() {
  return (
    <section className="border-b border-line" aria-labelledby="lab-heading">
      <div className="page-shell py-8 sm:py-10">
        <div className="mb-6 flex items-center gap-3"><span className="size-2 rounded-full bg-accent" aria-hidden /><p id="lab-heading" className="eyebrow">Now / Lab</p></div>
        <div className="grid gap-6 md:grid-cols-3">
          {labItems.map((item) => <article key={item.id} className="border-t border-line pt-4"><p className="font-mono text-[10px] tracking-[0.16em] text-accent">{item.id} / {item.label}</p><p className="mt-3 text-sm leading-6 text-muted">{item.text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
