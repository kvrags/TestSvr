var version = 'NeuroAppHTMLCache_v1.0.0.1';

//Ref site https://css-tricks.com/serviceworker-for-offline/
/*
1) 	The install event fires when a ServiceWorker is first fetched. This is your chance to 
	prime the ServiceWorker cache with the fundamental resources that should be available 
	even while users are offline.

2)  The fetch event fires whenever a request originates from your ServiceWorker scope, and 
	you’ll get a chance to intercept the request and respond immediately, without going to the network.

3)  The activate event fires after a successful installation. You can use it to phase out older 
	versions of the worker. We'll look at a basic example where we deleted stale cache entries.
*/
self.addEventListener("install", function (event) {
    console.log('Service Worker : install event in progress.');
    event.waitUntil(
      /* The caches built-in is a promise-based API that helps you cache responses,
         as well as finding and deleting them.
      */
      caches
        /* You can open a cache by name, and this method returns a promise. We use
           a versioned cache name here so that we can remove old cache entries in
           one fell swoop later, when phasing out an older service worker.
        */
        .open(version)
        .then(function (cache) {
            /* After the cache is opened, we can fill it with the offline fundamentals.
               The method below will add all resources we've indicated to the cache,
               after making HTTP requests for each of them.
                //loca files
                '/myapp/index.html',
              '/myapp/res/rect.jpg',
              '/myapp/js/sw.js',
              '/myapp/js/CountSquares.js',
				'../js/ng.js',

            */
            return cache.addAll([
                './index.html',
				'./favicon.ico',
                './partials/about.html',
                './partials/admin.html',
                './partials/assesment.html',
				'./partials/assessmentReport.html',
				'./partials/attention.html',
				'./partials/contact.html',
				'./partials/home.html',
				'./partials/impulsivity.html',
				'./partials/mentalflexibility.html',
				'./partials/workingmemory.html',
				'./js/ng.js',
				'./css/hexagon.css',
				'./css/neuro.css',
				'./res/greenRect.jpg',
				'./res/orangeRect.jpg',
				'./res/purpleRect.jpg',
				'./res/blueRect.jpg',
				'./res/white_rect.jpg',
				'./tasks/attention/squares.html',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js',
			
            ]);
        })
      .then(function () {
          console.log('Service Worker: install completed');
      })
  );
});


self.addEventListener("activate", function (event) {
    /* Just like with the install event, event.waitUntil blocks activate on a promise.
       Activation will fail unless the promise is fulfilled.
    */
    console.log('Service Worker: activate event in progress.');

    event.waitUntil(
      caches
        /* This method returns a promise which will resolve to an array of available
           cache keys.
        */
        .keys()
        .then(function (keys) {
            // We return a promise that settles when all outdated caches are deleted.
            return Promise.all(
              keys
                .filter(function (key) {
                    // Filter by keys that don't start with the latest version prefix.
                    return !key.startsWith(version);
                })
                .map(function (key) {
                    /* Return a promise that's fulfilled
                       when each outdated cache is deleted.
                    */
                    return caches.delete(key);
                })
            );
        })
        .then(function () {
            console.log('Service Worker: activate completed.');
        })
    );
});


self.addEventListener("fetch", function (event) {
    console.log('Service Worker: fetch event in progress.');

    /* We should only cache GET requests, and deal with the rest of method in the
       client-side, by handling failed POST,PUT,PATCH,etc. requests.
    */
    if (event.request.method !== 'GET') {
        /* If we don't block the event as shown below, then the request will go to
           the network as usual.
        */
        console.log('Service Worker: fetch event ignored.', event.request.method, event.request.url);
        return;
    }
    /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
       Fulfillment result will be used as the response, and rejection will end in a
       HTTP response indicating failure.
    */
    event.respondWith(
      caches
        /* This method returns a promise that resolves to a cache entry matching
           the request. Once the promise is settled, we can then provide a response
           to the fetch request.
        */
        .match(event.request)
        .then(function (cached) {
            /* Even if the response is in our cache, we go to the network as well.
               This pattern is known for producing "eventually fresh" responses,
               where we return cached responses immediately, and meanwhile pull
               a network response and store that in the cache.
               Read more:
               https://ponyfoo.com/articles/progressive-networking-serviceworker
            */
            var networked = fetch(event.request)
              // We handle the network request with success and failure scenarios.
              .then(fetchedFromNetwork, unableToResolve)
              // We should catch errors on the fetchedFromNetwork handler as well.
              .catch(unableToResolve);

            /* We return the cached response immediately if there is one, and fall
               back to waiting on the network as usual.
            */
            console.log('Service Worker: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {
                /* We copy the response before replying to the network request.
                   This is the response that will be stored on the ServiceWorker cache.
                */
                var cacheCopy = response.clone();

                console.log('Service Worker: fetch response from network.', event.request.url);

                caches
                  // We open a cache to store the response for this request.
                  //.open(version + 'pages')
                    .open(version)
                  .then(function add(cache) {
                      /* We store the response for this request. It'll later become
                         available to caches.match(event.request) calls, when looking
                         for cached responses.
                      */
                      cache.put(event.request, cacheCopy);
                  })
                  .then(function () {
                      console.log('Service Worker: fetch response stored in cache.', event.request.url);
                  });

                // Return the response so that the promise is settled in fulfillment.
                return response;
            }

            /* When this method is called, it means we were unable to produce a response
               from either the cache or the network. This is our opportunity to produce
               a meaningful response even when all else fails. It's the last chance, so
               you probably want to display a "Service Unavailable" view or a generic
               error response.
            */
            function unableToResolve() {
                /* There's a couple of things we can do here.
                   - Test the Accept header and then return one of the `offlineFundamentals`
                     e.g: `return caches.match('/some/cached/image.png')`
                   - You should also consider the origin. It's easier to decide what
                     "unavailable" means for requests against your origins than for requests
                     against a third party, such as an ad provider
                   - Generate a Response programmaticaly, as shown below, and return that
                */

                console.log('Service Worker: fetch request failed in both cache and network.');

                /* Here we're creating a response programmatically. The first parameter is the
                   response body, and the second one defines the options for the response.
                */
                return new Response('<h2>Service Unavailable, Check your internet / wifi connection and try again later.</h2>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});	