import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import style from '~/styles/post.module.scss'

const Post: FC<{ post: CollectionEntry<'blog'> }> = ({ post }) => {
  const url = [
    post.data.note ? '/note' : '/blog',
    new Date(post.data.date).getFullYear(),
    new Date(post.data.date).getMonth() + 1,
    post.slug,
  ].join('/')

  return (
    <article>
      <h2 className={style.title}>
        <a href={url}>{post.data.title}</a>
      </h2>
      <p className={style.excerpt}>
        {post.body.match(/^(?!#|!|(?:<[^>]*>|&lt;[^&]*&gt;).*$|\s*$).*/m)?.[0]}
      </p>
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
          <a href={`#/tags/${tag.slug}`} key={i}>
            {tag.name}
          </a>
        ))}
      </div>
    </article>
  )
}

export default Post
