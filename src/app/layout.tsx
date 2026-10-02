import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { SmoothScroll } from "../components/smooth-scroll"
import "./globals.css"

const display = localFont({ src: "../../public/fonts/DejaVuSans.ttf", variable: "--font-display", display: "swap" })
const mono = localFont({ src: "../../public/fonts/DejaVuSansMono.ttf", variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://atomicx7.dev"),
  title: { default: "Yashdeep Singh — Software Engineer", template: "%s — Yashdeep Singh" },
  description: "Software Engineer building production AI backends and GPU-shader Android experiments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Yashdeep Singh — Software Engineer",
    description: "Production AI backends and GPU-shader Android experiments.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Yashdeep Singh — Software Engineer" }],
  },
  twitter: { card: "summary_large_image", title: "Yashdeep Singh — Software Engineer", description: "Production AI backends and GPU-shader Android experiments." },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <Toaster theme="dark" position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}
