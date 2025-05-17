// Ce code optional vous permet d'utiliser les fonctionnalités de l'API web de service worker
// register() n'est pas appelé par défaut.

// Cela vous permet de construire la PWA et de bénéficier des avantages du cache du service worker
// sans aucun des potentiels défauts (comme la mise en cache avancée du service worker)
// causés par les développeurs qui ne sont pas encore familiers avec cela.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] est l'adresse localhost IPv6.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 sont considérées comme localhost pour IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Le constructeur URL est disponible dans tous les navigateurs qui supportent SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Notre service worker ne fonctionnera pas si PUBLIC_URL est sur une origine différente
      // de celle sur laquelle notre page est servie. Cela pourrait se produire si un CDN est utilisé.
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Cela s'exécute sur localhost. Vérifions si un service worker existe toujours ou non.
        checkValidServiceWorker(swUrl, config);

        // Ajout de logging supplémentaire pour localhost, en dirigeant les développeurs vers la
        // documentation du service worker.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Cette application web est servie en premier lieu par un service worker cache-first. ' +
              'Pour en savoir plus, visitez https://cra.link/PWA'
          );
        });
      } else {
        // Ce n'est pas localhost. Enregistrez simplement le service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // À ce stade, le service worker mis à jour a été récupéré,
              // mais l'ancien service worker sert toujours les anciens contenus
              // jusqu'à ce que tous les onglets du client soient fermés.
              console.log(
                'Un nouveau contenu est disponible et sera utilisé lorsque tous ' +
                  'les onglets de cette page seront fermés.'
              );

              // Exécute le callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // À ce stade, tout a été pré-mis en cache.
              // C'est le moment idéal pour afficher un message "Le contenu est mis en cache pour une utilisation hors ligne."
              console.log('Le contenu est mis en cache pour une utilisation hors ligne.');

              // Exécute le callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Erreur pendant l\'enregistrement du service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Vérifie si le service worker peut être trouvé. S'il ne peut pas être chargé, recharge la page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Assurez-vous que le service worker existe et que nous obtenons vraiment un fichier JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Aucun service worker trouvé. Probablement une application différente. Recharge la page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker trouvé. Procédez normalement.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('Aucune connexion Internet trouvée. L\'application s\'exécute en mode hors ligne.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}