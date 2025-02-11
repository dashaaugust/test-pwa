import React, { useState } from 'react';
import { Buffer } from 'buffer';

export interface User {
  id: string;
  name: string;
  credentialId: string;
}

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!window.PublicKeyCredential || !window.navigator.credentials) {
      alert('Ваш браузер не поддерживает WebAuthn.');
      return;
    }

    try {
      // ID для пользователя
      const userId = generateRandomString();

      // Учетные данные
      const publicKey: any = {
        challenge: new Uint8Array(Buffer.from(generateChallenge(), 'hex')),
        rp: {
          name: 'Example RP',
        },
        user: {
          id: new Uint8Array(Buffer.from(userId, 'utf-8')),
          displayName: username,
          name: username,
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7, // ECDSA w/ SHA-256
          },
        ],
        attestation: 'none',
        authenticatorSelection: {
          requireResidentKey: false,
          userVerification: 'required',
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({ publicKey });
      console.log('credential1', credential);
      // @ts-ignore
      saveUserData(userId, username, credential.id);

      setRegistrationSuccess(true);
      alert('Регистрация прошла успешно!');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация нового пользователя</h2>
      {!registrationSuccess && (
        <>
          <label htmlFor="username">
            Имя пользователя:
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Зарегистрироваться</button>
        </>
      )}
      {registrationSuccess && <p>Вы успешно зарегистрированы!</p>}
    </form>
  );
};

// Вспомогательные функции

// Генерация случайной строки
function generateRandomString(length = 32) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Генерация случайного вызова
function generateChallenge() {
  return crypto.randomUUID().replace(/-/g, '');
}

// Сохранение информации о пользователе в localStorage
function saveUserData(userId: string, name: string, credentialId: string) {
  const user: User = {
    id: userId,
    name,
    credentialId,
  };
  localStorage.setItem('webauthn_user_' + userId, JSON.stringify(user));
}

export default RegistrationForm;
