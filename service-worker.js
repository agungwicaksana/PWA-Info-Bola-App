const CACHE_NAME = "submission-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/node_modules/jquery/dist/jquery.min.js",
    "/node_modules/materialize-css/dist/js/materialize.min.js",
    "/src/component/nav.js",
    "/src/css/spacing.css",
    "/src/css/style.css",
    "/src/data/standing-api.js",
    "/src/html/league.html",
    "/src/html/nav.html",
    "/src/html/team.html",
    "/src/script/content-handler.js",
    "/src/script/league-dom.js",
    "/src/script/team-dom.js",
    "/src/script/url-https",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function(event) {
    console.log("ServiceWorker: Menginstall..");
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("ServiceWorker: Membuka cache..");
            return cache.addAll(urlsToCache);
        })
    );
});

// Versi 1. Pendaftaran cache seacara manual
// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                 console.log("ServiceWorker: Menarik data: ", event.request.url);
                
//                 if(response) {
//                     console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//                     return response;
//                 }

//                 console.log(
//                     "ServiceWorker: Memuat aset dari server: ",
//                     event.request.url
//                 );       
//                 return fetch(event.request)
//             })
//     )
// })

// Versi 2. Pendaftarn cache secara dinamis
self.addEventListener("fetch", function(event) {  
    event.respondWith(
        caches.match(event.request, {cacheName: CACHE_NAME})
            .then(function(response) {
                if(response) {
                    return response
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(function (response) {
                        if(!response || response.status !== 200) {
                            return response;
                        }
                        
                        var responseToCache = response.clone();
                        cache.open(CACHE_NAME)
                            .then(function(cache) {  
                                cache.put(event.request, responseToCache)
                            });
                        
                        return response;
                    });
            })
    );
});



self.addEventListener("activate", function(event) {
    console.log('Aktivasi ServiceWorker baru');
    
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