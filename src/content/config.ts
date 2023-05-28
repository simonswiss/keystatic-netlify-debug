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
    schema: z.object({
      title: z.string(),
      date: z.date(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
}
