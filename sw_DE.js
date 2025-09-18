const CACHE_NAME_DE = "pulp-form-de-cache";
const FILES_TO_CACHE_DE = [
  "/form_german.html",
  "/manifest_de.json"
];

// Install: cache app shell for German form
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_DE).then((cache) => cache.addAll(FILES_TO_CACHE_DE))
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME_DE) // remove old or other caches
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch: serve German files from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
