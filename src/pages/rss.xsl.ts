const xsl = await fetch(
  'https://raw.githubusercontent.com/genmon/aboutfeeds/main/tools/pretty-feed-v3.xsl'
)

export const get = async () => ({
  headers: {
    'Content-Type': 'text/xsl',
  },
  body: await xsl.text(),
})

export const prerender = false
