# Research Portfolio

Static portfolio site built with Astro, Tailwind CSS v4, TypeScript, and MDX content collections. No client-side framework; the only script is the theme toggle.

## Stack

- Astro
- Tailwind CSS v4
- TypeScript
- MDX content collections

## Routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/research`
- `/research/[slug]`
- `/resume`
- `/contact`

## Content Editing

Add or edit entries in:

- `src/content/projects/*.mdx`
- `src/content/research/*.mdx`

Schema definitions live in `src/content/config.ts`.

## Run

```bash
npm install
npm run dev
```

## Deploy

The app is static-only and compatible with Netlify, Vercel static hosting, and GitHub Pages.
