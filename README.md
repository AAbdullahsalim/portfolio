# Taha Umar · Portfolio

Next.js 15 + Tailwind CSS 4 + Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Editing content

All text lives in [`data/site.ts`](data/site.ts): profile, about, experience, career timeline, projects, services, process and stack.

### Adding a project

1. Copy an entry in the `projects` array in `data/site.ts` and change the text.
2. Set `visual: "none"` (or reuse one of the animated diagrams).
3. Put screenshots in `public/projects/` and list them:
   ```ts
   images: [{ src: "/projects/my-app-1.png", alt: "Dashboard" }],
   ```
4. Optional live link: `link: { label: "Live demo", href: "https://..." }`.

The numbering (01 / 04 …) and the ⌘K menu update automatically.

## Deploy

Push to GitHub and import the repo on Vercel. Set `NEXT_PUBLIC_SITE_URL` to your domain so social previews use the right URL.
