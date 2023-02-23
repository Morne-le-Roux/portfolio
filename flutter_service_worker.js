'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "63af74f55db4fabaf22e342c9ca7e272",
"assets/Assets/Absentry.jpg": "50004fd703bf4b4fbfac6cc9fc5f06c3",
"assets/Assets/cah_scoreboard.jpg": "a607343aa3776d1b01c953710e7519dc",
"assets/Assets/picstate.jpg": "9f352eeb3553680f6a08a56379338a80",
"assets/Assets/whatsapp_chat_dialer.jpg": "081fb496202b0ae145ef4b2a41272e53",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "182703f95e0d88d2c753b20dc56a66d8",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "35d9530870ea6ace436f7a26c73d8875",
"/": "35d9530870ea6ace436f7a26c73d8875",
"main.dart.js": "2338b68e478fb79ad7960f8c7e6aa4d7",
"manifest.json": "31d4f77adfb4ed338c56e23652f69948",
"PICWeb/.git/config": "f5589d2bb0a1a4aad79bddfea6b6e243",
"PICWeb/.git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
"PICWeb/.git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
"PICWeb/.git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
"PICWeb/.git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
"PICWeb/.git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
"PICWeb/.git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
"PICWeb/.git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
"PICWeb/.git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
"PICWeb/.git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
"PICWeb/.git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
"PICWeb/.git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
"PICWeb/.git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
"PICWeb/.git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
"PICWeb/.git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
"PICWeb/.git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
"PICWeb/.git/index": "353db43213fad3145c88e18f9896e078",
"PICWeb/.git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
"PICWeb/.git/logs/HEAD": "1037797394be2c2e53c1b6d03eb1600e",
"PICWeb/.git/logs/refs/heads/main": "1037797394be2c2e53c1b6d03eb1600e",
"PICWeb/.git/logs/refs/remotes/origin/HEAD": "1037797394be2c2e53c1b6d03eb1600e",
"PICWeb/.git/objects/pack/pack-0c99425d695173c1fe425cada0793b5f6adcfd54.idx": "f75dd7b22baec22ab28dd6781e54941e",
"PICWeb/.git/objects/pack/pack-0c99425d695173c1fe425cada0793b5f6adcfd54.pack": "8703661692cd770c1e2953c189fb54fd",
"PICWeb/.git/packed-refs": "a3cde6fbde69909be7a61d16774a0017",
"PICWeb/.git/refs/heads/main": "a31b8d8d2a64943f3628cf59826439a3",
"PICWeb/.git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
"PICWeb/PICWebsiteMockup.psd": "c88fe7a7ba6d4f77dfa86f68e9839120",
"version.json": "aeac2193ac451be7641b322862e5e0ff"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
