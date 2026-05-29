import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each poem is one Markdown file in src/content/poems/.
// The file body IS the verse — line breaks are preserved exactly as
// written (see PoemBody.astro), so write the poem the way it should read.
const poems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/poems' }),
  schema: z.object({
    // Poem / ghazal title in Devanagari.
    title: z.string(),
    // "ghazal" (ग़ज़ल) or "kavita" (कविता / गीत).
    category: z.enum(['ghazal', 'kavita']),
    // Used for ordering; optional.
    date: z.coerce.date().optional(),
    // Surface on the home page if true.
    featured: z.boolean().default(false),
    // Optional recitation, e.g. "/audio/aadat-nahi.mp3".
    audio: z.string().optional(),
    // Optional prose preface shown above the poem (the occasion it
    // was written for).
    context: z.string().optional(),
  }),
});

export const collections = { poems };
