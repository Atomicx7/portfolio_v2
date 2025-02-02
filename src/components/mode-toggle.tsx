"use client"

import * as React from "react"
import { Monitor, Moon, Sun, Sparkles, Minimize2, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { themes, type ThemeName } from "./theme-provider"
import { useTheme } from "next-themes"

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
  comfort: Sparkles,
  minimal: Minimize2,
  cyberpunk: Zap,
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const Icon = themeIcons[theme as keyof typeof themeIcons] || Monitor

  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[140px] bg-white/50 dark:bg-zinc-900/50">
        <SelectValue placeholder="Select theme">
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {themes[theme as ThemeName]?.name || "System"}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(themes).map(([key, value]) => {
          const ThemeIcon = themeIcons[key as keyof typeof themeIcons]
          return (
            <SelectItem key={key} value={key} className="cursor-pointer">
              <span className="flex items-center gap-2">
                <ThemeIcon className="h-4 w-4" />
                {value.name}
              </span>
            </SelectItem>
          )
        })}
        <SelectItem value="system" className="cursor-pointer">
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            System
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

