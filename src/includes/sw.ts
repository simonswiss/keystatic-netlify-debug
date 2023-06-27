import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
  offlineFallback,
} from 'workbox-recipes'

declare let self: ServiceWorkerGlobalScope

// precaching & updating options
precacheAndRoute(self.__WB_MANIFEST)
self.skipWaiting()
clientsClaim()

// instant recipes
pageCache()
googleFontsCache()
staticResourceCache()
imageCache()
offlineFallback()
