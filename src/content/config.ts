import { defineCollection, z } from 'astro:content'

export const collections = {
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

  blog: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        image: image().optional(),
        tags: z.array(z.string()).optional(),
      }),
  }),

  page: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        image: image().optional(),
      }),
  }),
}
