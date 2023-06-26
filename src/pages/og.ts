import type { APIRoute } from 'astro'
import { readFileSync } from 'node:fs'
import { getEntry } from 'astro:content'
import sharp from 'sharp'
import { html } from 'satori-html'
import satori from 'satori'

export const prerender = false

export const get: APIRoute = async ({ request }) => {
  const params = new URLSearchParams(new URL(request.url).search)
  const site = await getEntry('site', 'site')
  const title = params.get('title') || site.data.title
  const excerpt = params.get('excerpt') || site.data.description

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
        data: readFileSync(
          `${process.cwd()}/node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff`
        ),
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Plus Jakarta Sans',
        data: readFileSync(
          `${process.cwd()}/node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff`
        ),
        style: 'normal',
        weight: 700,
      },
    ],
  })

  const png = sharp(Buffer.from(svg)).png()

  return new Response(await png.toBuffer(), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
