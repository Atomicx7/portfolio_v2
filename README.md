# Yashdeep Singh — portfolio v3

A dark-first Next.js portfolio centred on **the fold**: production AI backend work on one side, GPU-shader Android experiments on the other.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS + Framer Motion
- Lenis smooth scroll (desktop only, disabled for reduced motion)
- `react-hook-form` + Zod contact form with a Resend route

## Local development

```bash
npm install
cp .env.example .env.local # optional until contact delivery is configured
npm run dev
```

Open `http://localhost:3000`.

## Contact delivery

Set these values in `.env.local` locally and in your deployment provider’s environment settings:

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=your-inbox@example.com
```

The API route validates payloads, includes a honeypot field, and returns a graceful fallback when delivery is not configured. For production rate limiting, add an edge/firewall rule or an external service such as Upstash.

## DuoFold video

The DuoFold case study embeds the supplied Google Drive video using Drive’s `/preview` URL. The Drive file must stay shared as **Anyone with the link**. For best Core Web Vitals later, replace the Drive embed with an optimized muted `.webm` and poster in `public/media/`.

## Before shipping

- Replace `https://atomicx7.dev` in metadata, sitemap, robots, and JSON-LD if your final domain differs.
- Confirm that the public BB Help statements are employer-approved.
- Replace the existing resume PDF if it still contains contact information you do not want public.
