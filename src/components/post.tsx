import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import style from '~/styles/post.module.scss'

const Post: FC<{ post: CollectionEntry<'blog'> }> = ({ post }) => {
  const url = [
    post.data.date.getFullYear(),
    post.data.date.getMonth() + 1,
    post.slug,
  ].join('/')

  return (
    <article>
      <h2 className={style.title}>
        <a href={`/blog/${url}`}>{post.data.title}</a>
      </h2>
      <p className={style.excerpt}>
        {post.body.match(/^(?!#|!|(?:<[^>]*>|&lt;[^&]*&gt;).*$|\s*$).*/m)?.[0]}
      </p>
      <div className={style.tags}>
        <a href={`/blog/${url}`}>
          {post.data.date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </a>
        {post.data.tags?.map((tag, i) => (
          <a href={`#/tags/${tag}`} key={i}>
            {tag}
          </a>
        ))}
      </div>
    </article>
  )
}

export default Post
