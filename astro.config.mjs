import { defineConfig, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: process.env.NETLIFY ? process.env.URL : 'http://localhost:3000',
  compressHTML: process.env.NETLIFY ? true : false,
  integrations: [mdx(), react()],
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
})
