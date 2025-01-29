import { useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   const registerServiceWorker = async () => {
  //     if ('serviceWorker' in navigator) {
  //       await navigator.serviceWorker.register('/service-worker.js')
  //       console.log('Service Worker registered');
  //     }
  //   };

  //   registerServiceWorker();
  // }, []);

  // const triggerNotification = async () => {
  //   if (Notification.permission === 'granted') {
  //     // Уведомление через 10 секунд
  //     setTimeout(async () => {
  //       const registration = await navigator.serviceWorker.getRegistration();
  
  //       // Проверяем, существует ли registration
  //       if (registration) {
  //         registration.showNotification('Hello!', {
  //           body: 'This is a push notification!',
  //           icon: 'icons/icon-192x192.png',
  //         });
  //       } else {
  //         console.error('Service Worker registration not found.');
  //       }
  //     }, 10000); // 10 секунд
  //   } else if (Notification.permission !== 'denied') {
  //     const permission = await Notification.requestPermission();
  //     if (permission === 'granted') {
  //       triggerNotification();
  //     }
  //   }
  // };
  

  // const handleClick = () => { 
  //   setTimeout(() => {
  //     console.log('This is a message after 10 seconds!');
  //   }, 10000); // 10000 milliseconds = 10 seconds
  // };

  const sendPushNotification = () => {
    const notification = new Notification('Привет!', {
      body: 'Это ваше пуш-уведомление 1',
      icon: '/icon512_rounded.png',  
    });
    console.log(notification)
    setTimeout(() => { 
      const notification = new Notification('Привет!', {
        body: 'Это ваше пуш-уведомление 2',
        icon: '/icon512_rounded.png',  
      });
      console.log(notification)
    }, 10000); // 10 секунд
  };
   
  

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Разрешение на уведомления получено');
      // Вызов функции для отправки уведомления
      sendPushNotification();
    }
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
      <button onClick={requestNotificationPermission}>Уведомление тест</button>
    </>
  )
}

export default App
