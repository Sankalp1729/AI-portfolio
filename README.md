# Sankalp Pingalwad — AI Engineer Portfolio

Premium AI Engineer portfolio built with Next.js, TypeScript, Tailwind CSS v4, Framer Motion, React Three Fiber, and tsParticles.

**Live:** [sankalppingalwad.vercel.app](https://sankalppingalwad.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP (available) |
| 3D | React Three Fiber + drei |
| Particles | tsParticles (neural network hero background) |
| Smooth scroll | Lenis |
| Fonts | Syne, DM Sans, Space Mono via `next/font` |
| Deploy | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, or yarn

### Install & run

```bash
git clone https://github.com/Sankalp1729/ai-portfolio.git
cd ai-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

### Lint & format

```bash
npm run lint
npm run format
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (layout, page, globals, SEO)
├── components/
│   ├── 3d/               # HeroSphere, ParticleField (lazy-loaded)
│   ├── animations/       # ScrollReveal, TextReveal, Counter
│   ├── avatar/           # AvatarIntro, FloatingOrb
│   ├── layout/           # Navbar, SmoothScroll
│   ├── sections/       # Hero, About, Projects, Experience, Skills, etc.
│   └── ui/               # Cursor, Loader, ProjectCard, ScrollProgress
├── data/                 # Site config, projects, skills, experience, timeline
├── hooks/                # useScroll, useMouse, usePrefersReducedMotion
├── lib/                  # animations, fonts, data barrel
└── types/                # Shared TypeScript types
public/
└── assets/               # Resume PDF, avatar SVG
```

---

## Before Deploying

1. **Resume** — Add your PDF at `public/assets/resume.pdf`
2. **Profile photo** — Replace `public/images/profile.svg` with a headshot (or update `AboutSection.tsx` to use `.jpg`)
3. **Domain** — Update `metadataBase` in `src/app/layout.tsx` if using a custom domain
4. **Formspree (optional)** — Contact form uses `mailto:` by default; swap to Formspree in `ContactSection.tsx` if preferred

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js**
4. Deploy — no extra env vars required for the default setup

```bash
# Or via CLI
npm i -g vercel
vercel
```

---

## Features

- **Avatar intro** — First-visit cinematic overlay with typewriter + floating orb replay
- **Hero** — tsParticles neural network + R3F wireframe sphere with mouse parallax
- **Projects** — Expandable cards with 8° mouse tilt, metrics, architecture notes
- **Skills** — Tabbed categories with animated floating orbs
- **Accessibility** — ARIA labels, keyboard nav, focus rings, `prefers-reduced-motion` support
- **Performance** — 3D/particles lazy-loaded; particles desktop-only; `next/image` throughout
- **SEO** — Open Graph image, Person schema JSON-LD, sitemap, robots.txt

---

## License

Private portfolio — all rights reserved © Sankalp Pingalwad 2026.
