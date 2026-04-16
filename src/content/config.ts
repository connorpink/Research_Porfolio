import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.string(),
      role: z.string(),
      status: z.string(),
      stack: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number().default(999),
      cardImage: image().optional(),
      pageImage: image().optional(),
      links: z
        .object({
          live: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .optional(),
    }),
});

const researchCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.string(),
      domain: z.string(),
      publication: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(999),
      tags: z.array(z.string()),
      cardImage: image().optional(),
      pageImage: image().optional(),
      links: z
        .object({
          live: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  projects: projectCollection,
  research: researchCollection,
};
