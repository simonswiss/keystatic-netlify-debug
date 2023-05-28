import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import * as RadixAvatar from '@radix-ui/react-avatar'

import style from '~/styles/header.module.scss'
import '../../node_modules/@picocss/pico/scss/components/_nav.scss'

const Header: FC<{
  site: CollectionEntry<'site'>
  imageSrc?: string
  imageWidth?: string | number
  imageHeight?: string | number
}> = ({ site, imageSrc, imageWidth, imageHeight }) => {
  return (
    <header>
      <nav className="container">
        <ul>
          <li className={style.logotype}>
            <a href="/">
              <Profile
                src={imageSrc as string}
                width={imageWidth as string | number}
                height={imageHeight as string | number}
                alt={site.data.title}
              />
            </a>
            <a className={style.logotype__title} href="/">
              {site.data.title}
            </a>
          </li>
        </ul>
        <ul>
          {site.data.menu.map((item, i) => (
            <li className={style.menu} key={i}>
              <a href={item?.href}>{item?.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header

const Profile: FC<{
  src: string
  width: string | number
  height: string | number
  alt: string
}> = ({ src, width, height, alt }) => {
  return (
    <RadixAvatar.Root className={style.profile__root}>
      <RadixAvatar.Image src={src} width={width} height={height} alt={alt} />
      <RadixAvatar.Fallback className={style.profile__fallback}>
        {alt.slice(0, 2)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
