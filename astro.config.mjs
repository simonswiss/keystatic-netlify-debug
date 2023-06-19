import { defineConfig, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import markdoc from '@astrojs/markdoc'
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
  site: process.env.NETLIFY ? process.env.URL : 'http://localhost:3000',
  compressHTML: process.env.NETLIFY ? true : false,
  integrations: [mdx(), react(), sitemap(), markdoc()],
  experimental: {
    assets: true,
    redirects: true,
  },
  image: {
    service: sharpImageService(),
  },
  redirects: {
    '/esai': '/tags/esai',
  },
  output: 'hybrid',
  adapter: netlify(),
})
