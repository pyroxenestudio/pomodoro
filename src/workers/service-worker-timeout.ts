declare const self: ServiceWorkerGlobalScope;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CACHE_VERSION = 'v1';
let interval: NodeJS.Timeout | null = null;

self.addEventListener('install', () => {
  console.log('Service Worker instalándose...')
  // puedes precachear recursos aquí
})

self.addEventListener('activate', () => {
  console.log('Service Worker activado')
});

self.addEventListener('push', () => {
  console.log('ESTE ES EL PUSH, PATATA EL RETORNO');
})

self.addEventListener('message', (event) => {
  const {type, payload} = event.data;
  if (type === 'notification') {
    interval = setTimeout(() => {
      self.registration.showNotification(payload.message,payload.options);
    }, payload.time);
  }

  if (type === 'patata') {
    self.registration.showNotification(payload.mensaje, payload.options);
  }

  if (type === 'remove') {
    if (interval) {
      clearInterval(interval);
    }
  }
})