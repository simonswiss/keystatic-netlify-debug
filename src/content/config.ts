import { defineCollection, z } from 'astro:content'

const BasicSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
})

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      BasicSchema.extend({
        image: image().or(z.string().url()).optional(),
        date: z.string(),
        tags: z
          .array(z.object({ name: z.string(), slug: z.string() }))
          .optional(),
      }),
  }),
  page: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      BasicSchema.extend({
        image: image().or(z.string().url()).optional(),
      }),
  }),
  site: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        image: image().optional(),
        menu: z.array(
          z
            .object({
              name: z.string(),
              slug: z.string(),
            })
            .optional()
        ),
      }),
  }),
}
