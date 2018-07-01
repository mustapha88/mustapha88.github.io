let cache_version = 'abtaq_mustapha_v3';//44
//let converFrom = document.getElementById('converF').value;
//let converTo = document.getElementById('converT').value;
//let api = `https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=ultra`; //4b
//let api = `https://free.currencyconverterapi.com/api/v5/convert?q=USD_MAD&compact=ultra`; //4b
self.addEventListener('install', function(event){ //install a service worker
	event.waitUntil( 
		caches.open(cache_version).then(function (cache){
			return cache.addAll([
                
				'./',
                './curren.html',
                './curren.css',
				'./curren.js',
        'https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=ultra'
                
	]).catch(function (err) {
					console.error('error in install hand', err);
				});
		})
);
});

self.addEventListener('activate', function (event) { //activete a SW then delete old caches if arn't necessary anymore
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== cache_version) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event){
    console.log('calling fetch function');
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){console.log('return from cash');
            return response;}
            let fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(function(response){
                console.log('return from network');
                if(!response || response.status!==200 || response.type !=='basic'){
                    let responseToCache = response.clone();

            caches.open(cache_version)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
                    return response;
                }
                

            //return response;
            }
            );
        })
        );
});
// respond with new data if our app is updated with new one then put it in the  new cache other wise fetch from the 
// old cache or get request fron a network
/*self.addEventListener('fetch', function (event) {
    //var requestUrl = new URL(event.request.url);
    console.log('calling fetch function');

    //if (requestUrl.hostname === 'https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=ultra') {
        event.respondWith(
            caches.open(cache_version).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if (response) {
                        fetchThenCache(event, cache).then(UpdateNotification);
                        return response;
                    } else {
                        return fetchThenCache(event, cache);
                    }
                }).catch(function (error) {
                    console.error('  Error in fetch handler:', error);
                    throw error;
                });
            })
        );
    //} 
/*
    else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});

function fetchThenCache(event, cache) {
    return fetch(event.request.clone()).then(function (response) {
        if (response.status < 400) {
            cache.put(event.request, response.clone());
        }
        return response;
    });
}

function UpdateNotification(response) {
    clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage({
                type: 'UPDATE',
                timestamp: Date.now()
            });
        });
    });
}*/