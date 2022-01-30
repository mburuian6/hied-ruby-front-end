// var CACHE_NAME = 'task-manager-pwa';
// var urlsToCache = [
//   '/',
//   '/completed'
// ];
 
// // Install service worker
// self.addEventListener('install', event => {
//   // Perform the install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Cache opened');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });
 
// // Cache and return the requests
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Return response as Cache is hit 
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });
 
// // Update service worker
// self.addEventListener('activate', event => {
//   var cacheWhitelist = ['task-manager-pwa'];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


// self.addEventListener('install', event => {
//   console.log('Service worker installing...'); 
//   //cache assets
//   var staticFilesToCache = [];
//   event.waitUntil(
//     caches.open('hied')
//     .then(cache => {
//       cache.addAll(staticFilesToCache);
//     })
//   )

//   self.skipWaiting();
// });

// self.addEventListener('activate', function(event) {
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         return true;
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
// });

//CACHE FALLBACK TO NET
// self.addEventListener('fetch', event => {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       if(response){
//         console.log("Found the data for ",event.request.url," in cache");
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request).then((response) => {
//         cache.put(event.request, response.clone());
//         return response;
//       })
//     })
//   )
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('hied').then(function(cache) {
//       return fetch(event.request).then(function(response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     })
//   );
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('hied').then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  });









