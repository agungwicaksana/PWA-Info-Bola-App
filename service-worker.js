const CACHE_NAME = "submission-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/register-sw.js",
    "/service-worker.js",
    "/assets/icon.svg",
    "/node_modules/idb/lib/idb.js",
    "/node_modules/materialize-css/dist/js/materialize.min.js",
    "/src/component/nav.js",
    "/src/css/spacing.css",
    "/src/css/style.css",
    "/src/data/db.js",
    "/src/data/standings-api.js",
    "/src/html/league.html",
    "/src/html/nav.html",
    "/src/html/saved.html",
    "/src/html/team.html",
    "/src/script/content-handler.js",
    "/src/script/custom-save-btn.js",
    "/src/script/league-dom.js",
    "/src/script/nav-loader.js",
    "/src/script/saved-dom.js",
    "/src/script/team-dom.js",
    "/src/script/url-https.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", function(event) {
    // console.log("ServiceWorker: Menginstall..");
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            // console.log("ServiceWorker: Membuka cache..");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    const API_URL = "https://api.football-data.org/v2/";
    // console.log('fetch sw')
    // console.log('event.request.url',event.request.url)
    if (event.request.url.indexOf(API_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async function(cache) {
                return await fetch(event.request).then(function(response) {
                    console.log('data api dicache')
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                console.log('data tidak dicache');
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    // console.log('Aktivasi ServiceWorker baru');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {  
            return Promise.all(
                cacheNames.map(function(cacheName) {  
                    if(cacheName !== CACHE_NAME && cacheName.startsWith("submission")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});