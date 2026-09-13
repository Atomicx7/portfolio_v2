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
    // Must stay "dark" (not "theme-dark") so Tailwind's dark: variants keep working.
    className: "dark",
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
  // next-themes applies the theme NAME as the <html> class by default.
  // The value map translates names to the actual CSS classes defined in globals.css.
  const value = Object.fromEntries(Object.entries(themes).map(([key, theme]) => [key, theme.className]))
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="portfolio-theme"
      themes={Object.keys(themes)}
      value={value}
    >
      {children}
    </NextThemesProvider>
  )
}

export { themes }

