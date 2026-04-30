# Dev Agency Portfolio — Project Plan

## Vision

A slick, MIB-styled (black & white) portfolio website framing my work as a dev agency. Each project gets its own page with a **live, interactive demo embedded directly** (Expo Snack for mobile, iframe of a deployed demo branch for web apps) — visitors interact with the actual app, not static screenshots.

Built **modular and SaaS-ready from day 1** so the embed system can be extracted into a product later: "Portfolio-as-a-Service for devs — connect a repo, get a live vitrine."

---

## Stack (final)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSG, SEO, OG images, MDX-first, Vercel deploy. Vite is wrong for content sites. |
| Language | React + TypeScript | — |
| Styling | Tailwind + shadcn/ui | Slick defaults, full control, matches MIB aesthetic |
| Content | MDX + Zod-validated frontmatter | Type-safe project schema |
| Animations | Framer Motion | Page transitions, hover states |
| Phone frames | `react-device-frameset` or custom SVG | Polish around embeds |
| Monorepo | **Bun + Turborepo** | Fast, SaaS extraction later |
| Deploy | Vercel | Free tier, instant |
| Backend | **Supabase — deferred to SaaS phase** | Portfolio is static; add when multi-user |

**Brand:** MIB black & white. `#000` / `#FAFAFA`, optional sharp green accent (`#00FF88`-ish, TBD). Geist Sans + Geist Mono (or JetBrains Mono).

---

## Architecture

```
portfolio/
├── apps/
│   └── web/                        # Next.js 15 site (future SaaS frontend)
├── packages/
│   ├── ui/                         # Shared: PhoneFrame, BrowserFrame, ProjectCard, TechBadge
│   ├── embeds/                     # ← The SaaS core
│   │   ├── adapters/
│   │   │   ├── snack.ts            # Expo Snack
│   │   │   ├── appetize.ts         # Appetize.io (fallback for native modules)
│   │   │   ├── iframe.ts           # Generic iframe (live deployed demo)
│   │   │   ├── stackblitz.ts       # StackBlitz embed
│   │   │   └── video.ts            # Looping screen recording fallback
│   │   └── types.ts                # EmbedConfig discriminated union
│   └── content/                    # MDX projects + Zod schema
└── turbo.json
```

**Why monorepo from day 1:** when SaaS-ifying, `packages/embeds` becomes the public SDK, `apps/web` becomes the dashboard, and `apps/api` slots in without restructuring.

---

## The Embed Adapter pattern (key abstraction)

Every project declares *how* to demo itself via a typed schema:

```ts
// Mobile (Expo)
{ type: "snack", snackId: "@cesar/fyp-app-1", device: "iphone15" }

// Web app — own deployment
{ type: "iframe", url: "https://demo.myapp.com", frame: "macbook" }

// Web app — sandboxed
{ type: "stackblitz", repo: "user/repo", branch: "demo" }

// Fallback
{ type: "video", src: "/demos/app3.mp4", poster: "..." }
```

A single `<ProjectDemo project={...} />` component reads the type and renders the right embed. **Adding a new demo type later = one new adapter file.**

---

## Project schema (future SaaS data model)

```ts
{
  slug: "fyp-app-1",
  title: "...",
  tagline: "...",
  category: "mobile" | "web",
  problem: "...",                  // MDX
  solution: "...",                 // MDX
  techStack: ["Expo", "Supabase", "TypeScript"],
  role: "Founder / Solo Dev",
  year: 2025,
  status: "live" | "in-progress" | "archived",
  links: { appStore?, playStore?, web?, github? },
  demo: EmbedConfig,               // ← adapter union
  gallery: string[],               // screenshot fallback
  metrics?: { users?, revenue? }
}
```

This schema = future Supabase table. Designing it now = zero migration later.

---

## Build phases

### Phase 1 — Foundation
1. Init `/Users/MacBookdeCesar/portfolio` as Bun + Turborepo monorepo
2. Scaffold `apps/web` — Next.js 15 + Tailwind + shadcn/ui
3. MDX + Zod-validated frontmatter pipeline
4. Core layout: nav, hero, work grid, footer
5. Dark mode, MIB color tokens, Geist fonts

### Phase 2 — Embed system
6. Define `EmbedConfig` discriminated union in `packages/embeds`
7. Adapters: Snack, iframe, video (Appetize/StackBlitz later as needed)
8. `<PhoneFrame>` and `<BrowserFrame>` wrapper components
9. `<ProjectDemo>` dispatcher
10. Lazy-load embeds (don't tank page load with multiple iframes)

### Phase 3 — Project pages
11. Dynamic route `/work/[slug]` rendering MDX + demo
12. Project index `/work` filterable by tech/category
13. Per-project OG image generation
14. Sitemap, robots.txt, RSS

### Phase 4 — Content
15. Publish Expo demo branches with mock data → Snack
16. Deploy web app `demo` branches with mock data → iframe targets
17. Write MDX for each project: problem, solution, tech, metrics

### Phase 5 — Polish + ship
18. Page transitions, scroll animations
19. Contact / inquiry form (Resend or Formspree)
20. Analytics (Vercel or Plausible)
21. Custom domain + Vercel deploy

### Phase 6 — SaaS-ready hooks
22. Abstract project loader behind `getProjects()` interface — swap MDX → Supabase later
23. Document embed adapter API as a public SDK

---

## Content inventory

**Mobile (Expo, → Snack embeds):**
- App 1: TBD
- App 2: TBD
- Workflow: create demo branch with mock data, publish to Expo Snack, embed via iframe in `<PhoneFrame>`

**Web (React + TS + Vite + Supabase, → iframe embeds):**
- Web app 1: TBD
- Web app 2: TBD
- Workflow: deploy `demo` branch with mock data to Vercel/Netlify, iframe in `<BrowserFrame>`

---

## Open questions
- Brand name + logo (deferred)
- Domain (deferred)
- Accent color: pure mono or `#00FF88`-style green? (decide after first render)
- Which of the 4 projects to ship first as the showcase

---

## Future SaaS vision

**"Portfolio-as-a-Service for devs"** — login with GitHub, connect a repo, auto-fork a demo branch, build with mock data, embed as a vitrine on a hosted portfolio. Closest existing pieces: Expo Snack (mobile), Appetize (simulator streaming), Vercel (build/deploy), Storybook+Chromatic (component showcase). **No one has stitched this into a polished product for mobile/web devs.** Real gap.

The embed adapter pattern + project schema in this build = the foundation of that SaaS.
