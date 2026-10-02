import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Yashdeep Singh — Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0a", color: "#f4f0eb", padding: "64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", color: "#d44c34", fontSize: 22, letterSpacing: 5 }}><span style={{ width: 12, height: 12, display: "flex", borderRadius: 12, background: "#d44c34", marginRight: 16 }} />ATOMICX7 / PORTFOLIO</div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 92, fontWeight: 600, letterSpacing: -5 }}>Software</span><span style={{ fontSize: 92, fontWeight: 600, letterSpacing: -5 }}>Engineer<span style={{ color: "#d44c34" }}>.</span></span></div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#b4b0ad", fontSize: 28 }}><span>Yashdeep Singh</span><span>Backend systems · GPU shaders</span></div>
    </div>,
    size,
  )
}
