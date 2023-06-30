import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import { parser } from '~/lib/marked'
import style from '~/styles/post.module.scss'

const Post: FC<{ post: CollectionEntry<'blog'> }> = ({ post }) => {
  const url = [
    post.data.note ? 'note' : 'posts',
    new Date(post.data.date).getFullYear(),
    new Date(post.data.date).toISOString().substring(5, 7),
    post.slug,
  ]
    .filter((s) => s)
    .join('/')

  return (
    <article>
      <h2 className={style.title}>
        <a href={url}>{post.data.title}</a>
      </h2>
      <p
        className={style.excerpt}
        dangerouslySetInnerHTML={{
          __html: parser({
            text: post.body.match(
              /^(?!#|!|(?:<[^>]*>|&lt;[^&]*&gt;).*$|\s*$).*/m
            )?.[0] as string,
            inline: true,
          }),
        }}
      />
      <div className={style.tags}>
        <a href={url}>
          {new Date(post.data.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </a>
        {post.data.tags?.map((tag, i) => (
          <a href={`/tags/${tag.slug}`} key={i}>
            {tag.name}
          </a>
        ))}
      </div>
    </article>
  )
}

export default Post
