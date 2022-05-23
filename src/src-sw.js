import {clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// const clientsClaim = require('workbox-core/clientsClaim');

clientsClaim();
// eslint-disable-next-line no-restricted-globals
self.skipWaiting();

//Precaching
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WEB_MANIFEST);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);




