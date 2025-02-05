import { FC, useEffect, useState } from 'react';
// import { PublicKeyCredentialRequestOptionsJSON } from '@types/webauthn';
import './App.css';

// interface CredentialOptions {
//   challenge: string; // Хеш (вызов), получаемый от сервера
// }

// interface PublicKeyCredentialCreationOptions1 extends PublicKeyCredentialCreationOptions {
//   user: {
//     id: Uint8Array;
//     name: string;
//     displayName: string;
//   };
// }

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

  // const getCredential = async ({ challenge }: CredentialOptions): Promise<PublicKeyCredential | null> => {
  //   const userId = 'user@example.com'; // Пример ID пользователя, замените на реальный
  
  //   // Опции для создания публичного ключа.
  //   const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions1 = {
  //     rp: {
  //       name: 'my super app', // имя надежной стороны (Relying Party)
  //       id: 'webauthn.fancy-app.site', // идентификатор надежной стороны (Домен)
  //     },
  //     user: {
  //       id: Uint8Array.from(userId, (c) => c.charCodeAt(0)), // преобразование userId в Uint8Array
  //       name: 'User', // имя пользователя 
  //       displayName: 'Full username', // отображаемое имя пользователя
  //     },
  //     challenge: Uint8Array.from(challenge, (c) => c.charCodeAt(0)), // преобразование challenge в Uint8Array
  //     pubKeyCredParams: [
  //       // предпочтительные параметры для криптографического алгоритма
  //       {
  //         type: 'public-key', // тип ключа
  //         alg: -7, // алгоритм ECDSA с кривой P-256
  //       },
  //       {
  //         type: 'public-key',
  //         alg: -257, // алгоритм RSA с ограничением SHA-256
  //       },
  //     ],
  //     timeout: 60000, // таймаут ожидания ответа (в миллисекундах)
  //     excludeCredentials: [], // список учетных данных, которые следует исключить
  //     authenticatorSelection: { // критерии выбора аутентификатора
  //       residentKey: 'preferred',
  //       requireResidentKey: false,
  //       userVerification: 'required', // требование верификации пользователя
  //     },
  //     attestation: 'none', // тип аттестации, здесь не требуется
  //     extensions: { // расширения
  //       credProps: true, // если true, возвращаются свойства учетных данных
  //     },
  //   };
  // console.log('publicKeyCredentialCreationOptions', publicKeyCredentialCreationOptions)
  //   // API вызов для создания новых учетных данных с помощью переданных опций.
  //   try {
  //     return await navigator.credentials.create({
  //       publicKey: publicKeyCredentialCreationOptions,
  //     }) as PublicKeyCredential; // Указание, что мы ожидаем тип PublicKeyCredential
  //   } catch (error) {
  //     console.error('Error creating credentials:', error);
  //     return null;
  //   }
  // };

  const getCredential1 = async  () => {

   
  //   const credentials = await navigator.credentials.get({
  //     publicKey: {
  //        // @ts-ignore 
  //       challenge: "lalal"
  //     },
  // });

  // console.log('credentials0', credentials)

  const options = {
    // @ts-ignore 
    challenge: [1, 2, 3],
    rpId: "example.com",
    allowCredentials: [{
      type: "public-key",
      // @ts-ignore 
      id:  [1, 2, 3],
    }],
    userVerification: "required",
    timeout: 60000,
  };
  // @ts-ignore 
  navigator.credentials.get({ publicKey: options }).then((assertion) => {
    console.log('assertion', assertion)
  }).catch((error) => {
    console.log('error', error)
  });
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
      <button onClick={getCredential1}>get 1</button>
    </>
  );
};

export default App;
