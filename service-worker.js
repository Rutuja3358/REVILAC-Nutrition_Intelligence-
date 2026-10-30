/* REVILAC PWA shell cache. Never cache patient data, requests, or API responses. */
'use strict';
const CACHE_NAME = 'revilac-app-shell-v3.38.10-brand-assets';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icons/revilac-premium-icon.png', './icons/REVILAC-Nutrition-Intelligence-Logo.png', './icons/revilac-icon.svg', './nutrition-core.js', './universal-report-nutrition.js', './report-wellness-integration.js', './fooddata-central-client.js', './revilac-final-guidance.js'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('revilac-app-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/api/') || url.pathname.endsWith('.json')) return;
  event.respondWith(fetch(request).then(response => {
    if (response && response.ok && (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/manifest.webmanifest') || url.pathname.endsWith('.svg'))) {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  }).catch(() => caches.match(request).then(cached => cached || caches.match('./index.html'))));
});
