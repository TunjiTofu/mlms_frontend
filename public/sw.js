const staticCacheName = "site-static-v3";
const dynamicCacheName = "site-dynamic-v2";
const assets = [
  "/",
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/main.chunk.js",
  "/manifest.json",
  "/icons/",
  "/favicon.ico", 
  // "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  "/dashboard",
];

//self refers to the service worker itself
//install service worker
//this is fired once the SW file changes
self.addEventListener("install", (evt) => {
  //console.log("Service Worker has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching all asets");
      cache.addAll(assets); //addding all assets
    })
  );
});

//actvate servie worker
self.addEventListener("activate", (evt) => {
  //console.log("Service worker has been activated");
  evt.waitUntil(
    //check the keys of the caches in   order to deelte the older cache
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//Fetch Event
self.addEventListener("fetch", (evt) => {
  if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
    if (evt.request.url.indexOf("identitytoolkit.googleapis.com") === -1) {
      if (evt.request.url.indexOf("apis.google.com") === -1) {
        //console.log('Fetched Events',evt);
        evt.respondWith(
          caches
            .match(evt.request)
            .then((cacheRes) => {
              return (
                cacheRes ||
                fetch(evt.request).then((fetchRes) => {
                  return caches.open(dynamicCacheName).then((cache) => {
                    cache.put(evt.request.url, fetchRes.clone()); //get a clone of the dyamic pages visited by users and put in he dynamic cache
                    limitCacheSize(dynamicCacheName, 40); //function to limit dynami cache size
                    return fetchRes;
                  });
                })
              );
            })
            .catch(() => {
              //show fall back page when user is offline for ONLY html pages
              if (evt.request.url.indexOf(".html") > -1) {
                return caches.match("/fallback");
              }
            })
        );
      }
    }
  }
});
