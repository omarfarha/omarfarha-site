import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Singleton page content — home, coaching, consulting each get one entry.
// Kept as one collection so Decap CMS can map each as a "file" (not a repeatable folder).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),

    // Homepage hero
    kicker: z.string().optional(),
    heroOpening: z.string().optional(), // inline markdown, e.g. "It's time to *reimagine* your world."
    practiceLines: z.array(z.string()).optional(), // each an inline-markdown sentence, e.g. "I coach [artists and entrepreneurs](/coaching)."

    // Bio photo (homepage)
    bioPhoto: z.string().optional(),

    // Secondary page hero (coaching / consulting)
    eyebrow: z.string().optional(),
    heading: z.string().optional(), // markdown: supports *emphasis* on one word/phrase
    lede: z.string().optional(),

    // Focus areas (coaching / consulting)
    focusAreas: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),

    // Selected work intro (consulting)
    workIntro: z.string().optional(),

    // Get started block (coaching)
    getStartedHeading: z.string().optional(),
    getStartedText: z.string().optional(),

    // SEO / social share description for this page (falls back to a site default if empty)
    metaDescription: z.string().optional(),
  }),
});

// Selected work grid items (consulting page)
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
    visible: z.boolean().default(true),
  }),
});

// Essays
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    dek: z.string().optional(),
    kicker: z.string().default('Essay'),
    date: z.date(),
    published: z.boolean().default(true),
  }),
});

export const collections = { pages, work, essays };
