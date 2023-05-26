import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: process.env.NETLIFY ? process.env.URL : 'http://localhost:3000',
    compressHTML: true
});
