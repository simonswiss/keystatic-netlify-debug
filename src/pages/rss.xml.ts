import rss from '@astrojs/rss'
import { getEntry, getCollection } from 'astro:content'

const getPostUrl = (path: string, date: Date, slug: string) =>
  [path, date.getFullYear(), date.toISOString().substring(5,7), slug].join('/')

export const get = async () => {
  const site = await getEntry('site', 'site')
  const entries = await getCollection('blog')

  return rss({
    title: site.data.title,
    description: site.data.description,
    site: import.meta.env.SITE,
    stylesheet: '/rss.xsl',
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: new Date(entry.data.date),
      description:
        entry.data.description ||
        entry.body.match(/^(?!#|!|(?:<[^>]*>|&lt;[^&]*&gt;).*$|\s*$).*/m)?.[0],
      link: getPostUrl(
        entry.data.note ? '/note' : '/blog',
        new Date(entry.data.date),
        entry.slug
      ),
    })),
  })
}
