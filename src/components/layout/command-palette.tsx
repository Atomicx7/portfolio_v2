"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Command } from "cmdk"
import { FileText, Github, Linkedin, Mail, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { emailAddress, site } from "../../content/site"

const destinations = [
  { label: "Selected work", target: "work" },
  { label: "Skills", target: "skills" },
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const scroll = (target: string) => {
    setOpen(false)
    window.setTimeout(() => {
      const section = document.getElementById(target)
      if (section) section.scrollIntoView({ behavior: "smooth" })
      else window.location.assign(`/#${target}`)
    }, 10)
  }

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(emailAddress)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="command-trigger" aria-label="Open command menu">
          <Search className="size-3.5" />
          <span>Menu</span>
          <kbd>⌘K</kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content data-lenis-prevent className="command-dialog">
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command label="Portfolio commands" className="overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-muted" />
              <Command.Input autoFocus placeholder="Jump to…" className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
              <Dialog.Close className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg" aria-label="Close command menu">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <Command.List className="max-h-[min(360px,60vh)] overflow-y-auto p-2" data-lenis-prevent>
              <Command.Empty className="px-3 py-8 text-center text-sm text-muted">No matching command.</Command.Empty>
              <Command.Group heading="Navigate" className="command-group">
                {destinations.map((item) => (
                  <Command.Item key={item.target} onSelect={() => scroll(item.target)} className="command-item">
                    <span className="text-accent">↳</span>{item.label}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Elsewhere" className="command-group mt-2 border-t border-line pt-2">
                <Command.Item onSelect={() => window.open(site.resume, "_blank", "noopener,noreferrer")} className="command-item"><FileText className="size-4" />Resume</Command.Item>
                <Command.Item onSelect={copyEmail} className="command-item"><Mail className="size-4" />Copy email</Command.Item>
                <Command.Item onSelect={() => window.open(site.github, "_blank", "noopener,noreferrer")} className="command-item"><Github className="size-4" />GitHub</Command.Item>
                <Command.Item onSelect={() => window.open(site.linkedin, "_blank", "noopener,noreferrer")} className="command-item"><Linkedin className="size-4" />LinkedIn</Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
