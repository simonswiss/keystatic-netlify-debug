import { defineCollection, z } from 'astro:content'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        image: image().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
        note: z.boolean().default(false),
      }),
  }),
  page: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        image: image().optional(),
        draft: z.boolean().default(false),
      }),
  }),
  site: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        menu: z.array(
          z
            .object({
              title: z.string(),
              href: z.string(),
            })
            .optional()
        ),
      }),
  }),
}
