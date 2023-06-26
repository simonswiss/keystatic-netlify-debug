import type { APIRoute } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { extractExcerpt } from '~/lib/helper'
import PlusJakartaSans400 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff'
import PlusJakartaSans700 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff'
import { Resvg } from '@resvg/resvg-js'
import { html } from 'satori-html'
import satori from 'satori'

export const getStaticPaths = async () => {
  const content = await getCollection('blog', ({ data }) => !data.draft)
  const contentParams = content.map((entry) => ({
    params: {
      slug: [
        entry.data.note ? 'note' : 'blog',
        new Date(entry.data.date).getFullYear(),
        new Date(entry.data.date).getMonth() + 1,
        entry.slug,
      ].join('/'),
    },
  }))

  return contentParams.concat(['og'].map((slug) => ({ params: { slug } })))
}

export const get: APIRoute = async ({ params }) => {
  const site = await getEntry('site', 'site')
  const entry = await getEntry('blog', params.slug?.split('/').at(-1) as string)
  const title = entry ? entry.data.title : site.data.title
  const excerpt = entry
    ? entry.data.description
      ? entry.data.description
      : extractExcerpt(entry.body)
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
