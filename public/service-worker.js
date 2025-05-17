/* eslint-disable no-restricted-globals */

// Ce service worker peut être personnalisé !
// Voir https://developers.google.com/web/tools/workbox/modules
// pour la liste des modules Workbox disponibles, ou ajoutez n'importe quel
// autre code que vous souhaitez.

// Cache les ressources statiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('studimove-static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/manifest.json',
        '/logo192.png',
        '/logo512.png'
      ]);
    })
  );
});

// Stratégie de cache pour les ressources statiques
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - retourne la réponse
      if (response) {
        return response;
      }

      // Clone la requête
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Vérifie si on a reçu une réponse valide
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone la réponse
        const responseToCache = response.clone();

        caches.open('studimove-dynamic-v1').then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Si la requête échoue (hors ligne), tentez de servir la page d'index pour la navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        
        return null;
      });
    })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'StudiMOVE';
  const options = {
    body: data.body || 'Notification de l\'application StudiMOVE',
    icon: '/logo192.png',
    badge: '/logo192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});