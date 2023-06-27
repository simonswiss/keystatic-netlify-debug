import { defineConfig, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import markdoc from '@astrojs/markdoc'
import netlify from '@astrojs/netlify/functions'
import { readFileSync } from 'node:fs'

// vite plugin to import fonts
const rawFonts = (ext) => ({
  name: 'vite-plugin-raw-fonts',
  transform: (_, id) => {
    if (ext.some((e) => id.endsWith(e))) {
      const buffer = readFileSync(id)
      return {
        code: `export default ${JSON.stringify(buffer)}`,
        map: null,
      }
    }
  },
})

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
    '/note/og.png': 'og.png'
  },
  output: 'hybrid',
  adapter: netlify(),
  vite: {
    plugins: [rawFonts(['.woff'])],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    // ssr: {
    //   external: ['@resvg/resvg-js'],
    // },
    // build: {
    //   rollupOptions: {
    //     external: ['@resvg/resvg-js'],
    //   },
    // },
  },
})
