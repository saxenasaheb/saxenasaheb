# कविताएँ — डॉ. प्रणव गौतम

A quiet, literary poetry website for **डॉ. प्रणव गौतम** — कविताएँ (poems) and
ग़ज़लें (ghazals). Built with [Astro](https://astro.build): static, fast on
mobile, and easy to maintain. Adding a poem is just dropping in a Markdown file.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # builds to dist/
npm run preview      # preview the built site
```

## Adding a poem

Create one Markdown file in **`src/content/poems/`** — the filename becomes the
URL (`tukdon-mein-hum.md` → `/poems/tukdon-mein-hum`). For example:

```markdown
---
title: "कविता का शीर्षक"     # title in Hindi (required)
category: "kavita"           # "kavita" or "ghazal" (required)
date: 2024-03-15            # optional, used for ordering
featured: false             # optional, true = may appear on the home page
audio: ""                   # optional, e.g. "/audio/slug.mp3"
context: ""                 # optional prose preface shown above the poem
---
पहली पंक्ति यहाँ
दूसरी पंक्ति यहाँ

(खाली पंक्ति = नया बंध / शेर — new stanza / couplet)
अगली पंक्ति यहाँ
```

Notes:
- **Line breaks are preserved exactly** as you type them — write the poem the
  way it should read.
- A **blank line** creates clear space between stanzas (for ghazals, between
  शेर).
- The poet's signature is added automatically; don't put it in the file.
- The category controls which page it appears on: कविताएँ or ग़ज़लें.

That's the whole workflow. Save, and on the next deploy it appears in the list
and gets its own page.

## Adding a recitation (audio)

1. Put the mp3 in `public/audio/` (e.g. `public/audio/aadat-nahi.mp3`).
2. Reference it in the poem's frontmatter: `audio: "/audio/aadat-nahi.mp3"`.

A small player appears under the title.

## Updating the photo or bio

- **Photo:** replace `public/portrait.jpg` (used on the home page and परिचय).
  If the face sits differently in a new photo, tweak `object-position` on
  `.home-portrait` / `.about-portrait` in `src/styles/global.css`.
- **Bio:** edit the परिचय text in `src/pages/about.astro`.

## Project layout

```
src/
  content/poems/      ← the poems (edit these)
  content.config.ts   ← frontmatter schema
  layouts/            ← page shell, fonts, meta
  components/         ← Header, Footer, PoemBody (verse renderer), etc.
  pages/              ← /, /kavitayein, /ghazalein, /about, /poems/[slug]
  styles/global.css   ← design tokens + typography
public/               ← favicon, audio, images
```

## Deploy (Vercel)

Import the repo on Vercel with **Root Directory = `poems`**. Vercel detects
Astro automatically (build `astro build`, output `dist/`). Every push redeploys.
