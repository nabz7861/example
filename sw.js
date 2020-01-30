self.importScripts('data/games.js');

// Files to cache
var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  '/example/',
  '/example/index.html',
  '/example/app.js',
  '/example/style.css',
  '/example/fonts/graduate.eot',
  '/example/fonts/graduate.ttf',
  '/example/fonts/graduate.woff',
  '/example/favicon.ico',
  //'/example/js13kgames.png',
  '/example/img/bg.png',
  '/example/icons/icon-32.png',
  '/example/icons/icon-64.png',
  '/example/icons/icon-96.png',
  '/example/icons/icon-128.png',
  '/example/icons/icon-168.png',
  '/example/icons/icon-192.png',
  '/example/icons/icon-256.png',
  '/example/icons/icon-512.png'
    
//      '/pwa-examples/js13kpwa/',
//  '/pwa-examples/js13kpwa/index.html',
//  '/pwa-examples/js13kpwa/app.js',
//  '/pwa-examples/js13kpwa/style.css',
//  '/pwa-examples/js13kpwa/fonts/graduate.eot',
//  '/pwa-examples/js13kpwa/fonts/graduate.ttf',
//  '/pwa-examples/js13kpwa/fonts/graduate.woff',
//  '/pwa-examples/js13kpwa/favicon.ico',
//  '/pwa-examples/js13kpwa/img/js13kgames.png',
//  '/pwa-examples/js13kpwa/img/bg.png',
//  '/pwa-examples/js13kpwa/icons/icon-32.png',
//  '/pwa-examples/js13kpwa/icons/icon-64.png',
//  '/pwa-examples/js13kpwa/icons/icon-96.png',
//  '/pwa-examples/js13kpwa/icons/icon-128.png',
//  '/pwa-examples/js13kpwa/icons/icon-168.png',
//  '/pwa-examples/js13kpwa/icons/icon-192.png',
//  '/pwa-examples/js13kpwa/icons/icon-256.png',
//  '/pwa-examples/js13kpwa/icons/icon-512.png'
//    
    
    
    
    
    
    
    
    
];
var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
