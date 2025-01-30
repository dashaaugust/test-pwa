import { FC, useEffect, useState } from 'react'
import './App.css'

const App: FC = () => {
  const [count, setCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);
  console.log('1 isLoaded', isLoaded)
  useEffect(() => {
    const getNotificationPermission = () => {
      // Запрашиваем разрешение на уведомления
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');




          setIsLoaded(true); // !!!!
        } else {
          console.log('Notification permission denied.');
        }
      });
    }



    // const registerServiceWorker = async () => {
    //   if ('serviceWorker' in navigator) {
    //     try {
    //       const registration = await navigator.serviceWorker.register('/sw.js');
    //       console.log('Service Worker registered:', registration);
    //       setIsLoaded(true); 
    //     } catch (error) {
    //       console.error('Service Worker registration failed:', error);
    //     }
    //   }

    // };
    console.log('2 isLoaded', isLoaded)

    if (!isLoaded) { 
      console.log('3 isLoaded', isLoaded)
      // registerServiceWorker();
      getNotificationPermission()
    }

  }, [isLoaded])

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
      <h3>Test PWA PUSH-уведомления</h3>
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
