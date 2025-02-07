// Вставьте манифест Workbox
self.__WB_MANIFEST;

// Импортируйте необходимые функции Workbox
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

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
  let data;

  // Проверяем, содержатся ли данные в текстовом формате
  if (event.data) {
    // Если данные могут быть в формате JSON
    try {
      data = event.data.json();
    } catch (e) {
      // Если не удалось распарсить как JSON, берем текст
      data = { title: 'Push Notification', body: event.data.text() };
    }
  } else {
    data = { title: 'Push Notification', body: 'Default body' };
  }

  const options = {
    body: data.body,
    icon: '/icon512_rounded.png',
    badge: '/icon512_rounded.png',
  };

  event.waitUntil(self.registration.showNotification(data.title || 'Push Notification', options));
});

 // Кэширование API запросов
//  registerRoute( 
//   ({ request }) => request.url.includes('https://jsonplaceholder.typicode.com/posts/1'),
//   new StaleWhileRevalidate({
//     cacheName: 'api-cache',
//   })
// );

const urlsToCache = [
  'https://jsonplaceholder.typicode.com/posts/1',  
  'https://randomuser.me/api/', 
];

// Используем метод registerRoute для кэширования
urlsToCache.forEach(url => {
  registerRoute(
    url,
    new StaleWhileRevalidate({
      cacheName: 'api-cache', // Кэш, в который будут сохраняться данные
    })
  );
});