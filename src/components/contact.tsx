"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Copy, Github, Linkedin, LoaderCircle, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { emailAddress, site } from "../content/site"

const contactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters.").max(80),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "A little more detail would help.").max(2000),
  website: z.string().max(0).optional(),
})
type ContactValues = z.infer<typeof contactSchema>

export function Contact() {
  const [copied, setCopied] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", email: "", message: "", website: "" } })
  const copyEmail = async () => {
    await navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    toast.success("Email copied")
    window.setTimeout(() => setCopied(false), 1600)
  }
  const submit = async (values: ContactValues) => {
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) })
      if (!response.ok) throw new Error("Send failed")
      toast.success("Message sent — I’ll get back to you soon.")
      reset()
    } catch {
      toast.error("Email delivery isn’t configured right now. Copy the address instead.")
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-32">
      <div className="page-shell grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(25rem,1.12fr)] lg:items-start lg:gap-0">
        <div className="lg:pr-12">
          <p className="eyebrow"><span className="text-accent">// 05</span> — Contact</p>
          <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">Let’s build <span className="text-accent">something.</span></h2>
          <p className="mt-7 max-w-md text-base leading-7 text-muted">Have a product, a system problem, or a creative Android interaction in mind? I’d like to hear about it.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={copyEmail} className="button button-quiet">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy email"}</button>
            <a href={site.resume} target="_blank" rel="noreferrer" className="button button-quiet">Resume ↗</a>
          </div>
          <div className="mt-10 flex gap-4"><a className="social-link" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="size-5" /></a><a className="social-link" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="size-5" /></a></div>
        </div>
        <form onSubmit={handleSubmit(submit)} className="grid gap-5 border-t border-line pt-7 sm:grid-cols-2 sm:pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" noValidate>
          <label className="field"><span>Name</span><input {...register("name")} autoComplete="name" placeholder="Your name" />{errors.name && <em>{errors.name.message}</em>}</label>
          <label className="field"><span>Email</span><input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" />{errors.email && <em>{errors.email.message}</em>}</label>
          <label className="field sm:col-span-2"><span>Message</span><textarea {...register("message")} rows={5} placeholder="What would you like to build?" />{errors.message && <em>{errors.message.message}</em>}</label>
          <label className="sr-only" aria-hidden><span>Website</span><input {...register("website")} tabIndex={-1} autoComplete="off" /></label>
          <div className="sm:col-span-2"><button disabled={isSubmitting} className="button" type="submit">{isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}{isSubmitting ? "Sending" : "Send message"}</button></div>
        </form>
      </div>
    </section>
  )
}
