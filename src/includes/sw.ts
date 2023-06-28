import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute } from 'workbox-precaching'
import {
  pageCache,
  imageCache,
  staticResourceCache,
  offlineFallback,
} from 'workbox-recipes'

declare let self: ServiceWorkerGlobalScope

// precaching & updating options
precacheAndRoute(self.__WB_MANIFEST)
self.skipWaiting()
clientsClaim()

registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 10,
      }),
    ],
  })
)

// instant recipes
pageCache()
staticResourceCache()
imageCache()
offlineFallback()
