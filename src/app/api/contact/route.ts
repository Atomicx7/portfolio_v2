import { NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ ok: true })

  const key = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_TO_EMAIL
  if (!key || !recipient) return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 })

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [recipient],
      reply_to: parsed.data.email,
      subject: `Portfolio message from ${parsed.data.name}`,
      text: `${parsed.data.message}\n\nReply to: ${parsed.data.email}`,
    }),
  })

  return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 })
}
