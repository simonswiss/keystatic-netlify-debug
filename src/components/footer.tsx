import type { FC } from 'react'
import 'external-svg-loader'

import '../../node_modules/@picocss/pico/scss/components/_nav.scss'

const NETLIFY_STATUS = {
  url: new URL('https://www.netlify.com/'),
  badge: new URL(
    'https://api.netlify.com/api/v1/badges/9d6ccafc-6600-484f-a36d-daf284db2751/deploy-status'
  ),
}

const Footer: FC = () => (
  <nav className="container">
    <ul>
      <li>
        <a href={NETLIFY_STATUS.url.href} target="_blank" rel="noopener noreferrer">
          <svg data-src={NETLIFY_STATUS.badge.href} />
        </a>
      </li>
    </ul>
  </nav>
)

export default Footer
