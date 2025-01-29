self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/')); // или другой URL
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Уведомление';
  const options = {
    body: data.body || 'Сообщение от PWA',
    icon: '/icon512_rounded.png',
    badge: '/icon512_rounded.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
