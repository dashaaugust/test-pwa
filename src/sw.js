// Вставьте манифест Workbox
self.__WB_MANIFEST;

// Импортируйте необходимые функции Workbox
import { precacheAndRoute } from 'workbox-precaching';

// Обработчик события установки сервисного рабочего процесса
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting()); // Принудительно активируем новый SW
});

// Обработчик события активации сервисного рабочего процесса
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Устанавливаем новый SW как активный
});

// Установите манифест для ресурсов, которые будут кэшироваться
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Default body',
    icon: '/icon512_rounded.png',
    badge: '/icon512_rounded.png',
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});