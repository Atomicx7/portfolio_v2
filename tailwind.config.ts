import type { Config } from "tailwindcss"

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        line: "hsl(var(--line))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
      fontFamily: { mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
    },
  },
  plugins: [],
} satisfies Config

export default config
