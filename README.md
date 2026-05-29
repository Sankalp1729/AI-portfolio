# Sankalp Pingalwad Portfolio

Premium AI engineer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

## Highlights

- Premium dark visual system with animated hero, global cursor, and scroll progress bar
- Desktop-only particle field with a mobile-friendly hero fallback
- Expandable project cards with mouse-follow tilt
- Viewport-based section reveals for the full landing page
- Generated Open Graph image, `robots.txt`, `sitemap.xml`, and Person structured data
- Keyboard focus states, reduced-motion handling, and mobile-first layout behavior

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber + Drei
- tsParticles

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm start
```

## Deployment

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Leave the build command as `npm run build`.
4. Deploy with the default Next.js output settings.

## Content Notes

- Update links in `src/lib/data.ts` for GitHub, LinkedIn, email, and resume.
- Replace the profile image in `public/images/profile.png` if you want a different portrait.
- Update project assets in `public/images/projects/` if you add new showcase work.

## SEO

The site metadata lives in `src/app/layout.tsx`. Search engine helpers are in `src/app/robots.ts`, `src/app/sitemap.ts`, and the generated social preview in `src/app/opengraph-image.tsx`.