import { useEffect, useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  

  // const sendPushNotification = () => {
  //   const notification = new Notification('Привет!', {
  //     body: 'Это ваше пуш-уведомление 1',
  //     icon: '/icon512_rounded.png',  
  //   });
  //   console.log(notification)
  //   setTimeout(() => { 
  //     const notification = new Notification('Привет!', {
  //       body: 'Это ваше пуш-уведомление 2',
  //       icon: '/icon512_rounded.png',  
  //     });
  //     console.log(notification)
  //   }, 10000); // 10 секунд
  // };
   
  

  // const requestNotificationPermission = async () => {
  //   const permission = await Notification.requestPermission();
  //   if (permission === 'granted') {
  //     console.log('Разрешение на уведомления получено');
  //     // Вызов функции для отправки уведомления
  //     sendPushNotification();
  //   }
  // };

  useEffect(() => {
    // Проверка поддержки Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered:', registration);
      });
    }

    // Запрашиваем разрешение на уведомления
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }, []);

  const sendNotification = () => {
    new Notification('Push Notification 1', {
      body: 'Hello, this is a push notification!',
      icon: '/icon512_rounded.png',
    });

    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Push Notification 2', {
          body: 'Hello, this is a push notification!',
          icon: '/icon512_rounded.png',
        });
      }
    }, 10000); // 10 секунд
  };
  

  return (
    <>
      <h1>Hello world!</h1>
      <h3>Test PWA</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> 
      </div> 
      <button onClick={sendNotification}>Получить push уведомление</button>
    </>
  )
}

export default App
