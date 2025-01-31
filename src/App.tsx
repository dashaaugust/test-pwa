import { FC, useEffect, useState } from 'react';
import './App.css';

const App: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getNotificationPermission = () => {
      // Запрашиваем разрешение на уведомления
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    };

    getNotificationPermission();
  }, []);

  function sendNotification() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.ready
      .then((registration) => {
        const payload = {
          title: 'Эмуляция уведомления',
          body: `Это тестовое пуш-уведомление, текущий счёт: ${count}`,
        };

        registration.showNotification(payload.title, {
          body: payload.body,
          icon: '/icon512_rounded.png',
          badge: '/icon512_rounded.png',
        });
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });

    console.log('sendNotification');
  }

  return (
    <>
      <h1>Hello world!</h1>
      <h3>Test Magic PWA</h3>
      <h4>Версия 1 от 31.01.2025</h4>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>Текущий счёт: {count}</button>
      </div>
      <button onClick={sendNotification}>Получить push уведомление</button>
    </>
  );
};

export default App;
