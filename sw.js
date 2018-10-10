let cacheName = 'v2';
let cacheFiles = [
	'./',
	'./icons',
	'./app.js',
	'./style.css',
	'./index.php',
	'./weather.webmanifest'
];

self.addEventListener('install', function(e) {
	console.log(`[Service Worker] installed`);
	e.waitUntil(
		caches.open(cacheName)
		.then(function(cache) {
			console.log(`[Service Worker] Caching all app files`);
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate', function(e) {
	console.log(`[Service Worker] activated`);
	e.waitUnti(
		caches.keys()
		.then(function(cacheList) {
			return Promise.all(cacheList.map(function(key) {
				if (cacheName.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request)
		.then(function(response) {
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
			return response || fetch(e.request)
			.then(function(response) {
				return caches.open(cacheName)
				.then(cache => {
					console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
					// cloneRequest = response.clone();
					cache.put(e.request, response.clone());
					return response;
				});
			});

		})
	);
});