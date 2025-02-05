import { FC, useEffect, useState } from 'react';
// import { PublicKeyCredentialRequestOptionsJSON } from '@types/webauthn';
import './App.css';

function generateRandomBase64(size: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const charactersLength = characters.length;

  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const base64ToUint8Array = (base64: string): Uint8Array => {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const base64Encoded = (base64 + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64Encoded);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

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


 

const challenge = generateRandomBase64(32); // Генерируем вызов размером 32 байта
const credentialId = generateRandomBase64(16); // Генерируем идентификатор учетных данных размером 16 байт

  const challengeFromServer = challenge; // Вызов с сервера
  const credentialIdFromServer = credentialId; // Идентификатор учетных данных с сервера
  
 

const decodedChallenge = base64ToUint8Array(challengeFromServer);
const decodedCredentialId = base64ToUint8Array(credentialIdFromServer);

const options = {
  challenge: decodedChallenge,
  rpId: "example.com",
  allowCredentials: [{ type: "public-key", id: decodedCredentialId }],
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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>Текущий счёт: {count}</button>
      </div>
      <button onClick={sendNotification}>Получить push уведомление</button>
      <button onClick={getCredential1}>get 3</button>
    </>
  );
};

export default App;
