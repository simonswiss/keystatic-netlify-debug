import type { APIRoute } from 'astro'
import { CollectionEntry, getCollection, getEntry } from 'astro:content'
import { extractExcerpt } from '~/lib/helper'
import PlusJakartaSans400 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff'
import PlusJakartaSans700 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff'
import { Resvg } from '@resvg/resvg-js'
import { html } from 'satori-html'
import satori from 'satori'

const content = await getCollection('blog', ({ data }) => !data.draft)
const tags = [...new Set(content.map((entry) => entry.data.tags).flat())]

export const getStaticPaths = async () => {
  const contentParams = content.map((entry) => ({
    params: {
      og: [
        entry.data.note ? 'note' : 'blog',
        new Date(entry.data.date).getFullYear(),
        new Date(entry.data.date).toISOString().substring(5, 7),
        entry.slug,
        'og',
      ].join('/'),
    },
  }))

  const tagsParams = tags.map((tag) => ({
    params: {
      og: ['tags', tag?.slug, 'og'].join('/'),
    },
  }))

  return contentParams
    .concat(tagsParams)
    .concat(['og'].map((og) => ({ params: { og } })))
}

export const get: APIRoute = async ({ params }) => {
  const site = await getEntry('site', 'site')
  const entry =
    params.og?.split('/').at(0) !== 'og'
      ? params.og?.split('/').at(1) !== 'tags'
        ? await getEntry('blog', params.og?.split('/').at(-2) as string)
        : tags.filter((tag) => tag?.slug === params.og?.split('/').at(-2)).at(0)
      : undefined
  const isBlog = (entry: any): entry is CollectionEntry<'blog'> => entry
  const isTag = (entry: any): entry is { name: string; slug: string } => entry
  const title = isBlog(entry)
    ? entry.data.title
    : isTag(entry)
    ? entry.name
    : site.data.title
  const excerpt = isBlog(entry)
    ? entry.data.description
      ? entry.data.description
      : extractExcerpt(entry.body)
    : isTag(entry)
    ? `Artikel dengan tag ${entry.name}`
    : site.data.description

  const markup = html(`
    <div style="display: flex; flex-direction: row; width: 100%; height: 100%; padding: 1rem 2rem; background-color: #ffffff">
      <div style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;">
        <span style="font-weight: 700; font-size: 4rem;">${title}</span>
        <span style="font-weight: 400;font-size: 2rem;">${excerpt}</span>
      </div>
    </div>    
  `)

  // @ts-ignore
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Plus Jakarta Sans',
        data: Buffer.from(PlusJakartaSans400),
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Plus Jakarta Sans',
        data: Buffer.from(PlusJakartaSans700),
        style: 'normal',
        weight: 700,
      },
    ],
  })

  const image = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  }).render()

  return new Response(image.asPng(), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
