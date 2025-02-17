import { FC, useEffect, useState } from 'react';
import './App.css';
// import PostComponent from './PostComponent';
import BitcoinPrice from './BitcoinPrice';
import RegistrationForm from './RegistrationForm';
import AuthenticationForm from './AuthenticationForm';

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
      <h3>Test Magic PWA</h3>
      <div className="card2">
        <h4>Биометрия</h4>
        <RegistrationForm />
        <AuthenticationForm />
      </div>
      <div className="card2">
        <BitcoinPrice />
      </div>
      <div className="card2">
        <button onClick={() => setCount((count) => count + 1)}>Текущий счёт: {count}</button>
        <br />
        <br />
        <button onClick={sendNotification}>Получить push уведомление</button>
      </div>

      {/* <div className="card">
        <PostComponent id={1} />
        <PostComponent id={2} />
      </div> */}
    </>
  );
};

export default App;
