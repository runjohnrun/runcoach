const CACHE_NAME='runcoach-v5';
const ASSETS=['./','index.html','manifest.json','running-hero.webp','icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(e.request.method==='GET'){const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy))}return r}))));
