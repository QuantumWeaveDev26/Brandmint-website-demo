# BrandMint AI Pvt. Ltd. — Official Website

Enterprise AI solutions, WhatsApp & CRM automation, AI Revenue Lab, Venture IP (**Quantum Weave™**), and **BrandMint Academy** — built by **BrandMint AI Pvt. Ltd.** (Bengaluru, India).

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling & Motion**: Tailwind CSS v4 + Framer Motion + Lenis Smooth Scroll
- **SEO & Pre-Rendering**: Static route pre-rendering (`scripts/prerender-routes.mjs`), custom OpenGraph metadata, JSON-LD structured data, `sitemap.xml` & `robots.txt`
- **Deployment Ready**: Configured for Vercel ([`vercel.json`](./vercel.json)) and Netlify/Cloudflare Pages ([`public/_redirects`](./public/_redirects))

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle + pre-render all 8 routes
npm run build

# Preview compiled production build locally
npm run preview
```

## Environment Variables (Optional)

Copy `.env.example` to `.env` to connect live lead capture and telemetry endpoints:

```bash
cp .env.example .env
```

- `VITE_CRM_WEBHOOK_URL` — Webhook endpoint for booking modal & contact form submissions
- `VITE_ISHANI_API_URL` — Live backend endpoint for the Ishani AI concierge widget
