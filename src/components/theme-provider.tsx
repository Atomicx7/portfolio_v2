"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const themes = {
  light: {
    name: "Light",
    className: "theme-light",
  },
  dark: {
    name: "Dark",
    className: "theme-dark",
  },
  comfort: {
    name: "Comfort",
    className: "theme-comfort",
  },
  minimal: {
    name: "Minimal",
    className: "theme-minimal",
  },
  cyberpunk: {
    name: "Cyberpunk",
    className: "theme-cyberpunk",
  },
}

export type ThemeName = keyof typeof themes

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="dark" enableSystem themes={Object.keys(themes)}>
      {children}
    </NextThemesProvider>
  )
}

export { themes }

