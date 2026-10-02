import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { SmoothScroll } from "../components/smooth-scroll"
import "./globals.css"

const display = localFont({ src: "../../public/fonts/DejaVuSans.ttf", variable: "--font-display", display: "swap" })
const mono = localFont({ src: "../../public/fonts/DejaVuSansMono.ttf", variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://atomicx7.dev"),
  title: { default: "Yashdeep Singh — Software Engineer", template: "%s — Yashdeep Singh" },
  description: "Software Engineer building backend systems and GPU-shader Android experiments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Yashdeep Singh — Software Engineer",
    description: "Backend systems and GPU-shader Android experiments.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Yashdeep Singh — Software Engineer" }],
  },
  twitter: { card: "summary_large_image", title: "Yashdeep Singh — Software Engineer", description: "Backend systems and GPU-shader Android experiments." },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: "#fafafa", colorScheme: "light dark" }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <body>
        <Script id="color-scheme" strategy="beforeInteractive">{`try { if (localStorage.getItem("portfolio-color-scheme") === "dark") document.documentElement.classList.add("dark") } catch {}`}</Script>
        <SmoothScroll />
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}
