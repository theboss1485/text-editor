const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

/* I took the following method of precaching, including the "install" event listener, 
from https://developer.chrome.com/docs/workbox/caching-resources-during-runtime
I implemented precaching here because the challenge instructions say the static 
elements should be precached.*/   
const CACHE_NAME = "asset precache";
const STATIC_CACHE_URLS = [
                            "./assets/icons/icon_96x96.97a96e0fc4eb2a8bec3b8d49d90f1d14.png",
                            "./assets/icons/icon_128x128.225c312e650131cfe5a2119fd958867e.png",
                            "./assets/icons/icon_192x192.1efd8d2a5218c9516adb7d6ff7907ac1.png",
                            "./assets/icons/icon_256x256.873242da1488f53efeaca94de308539e.png",
                            "./assets/icons/icon_384x384.15214f65c1219e812d779bfcb384494a.png",
                            "./assets/icons/icon_512x512.3ca11a97eb7d90b61fc3db0f3c5dcdb6.png",
                            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css",
                            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/javascript/javascript.min.js",
                            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.js",
                            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.css"
                        ];

        self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_URLS))
    );
});

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});



warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// I took this route from the solved mini project of Module 19.
registerRoute(

    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
      // Name of the cache storage.
      cacheName: 'asset-cache',
      plugins: [
        // This plugin will cache responses with these headers to a maximum-age of 30 days
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
);

self.addEventListener('fetch', function (event) {
    // This fetch function is required for the SW to be detected and is intentionally empty
    // For a more robust, real-world SW example see: https://developers.google.com/web/fundamentals/primers/service-workers
  });
