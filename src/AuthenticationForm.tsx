import React, { useState } from 'react';
import { Buffer } from 'buffer';

interface User {
  id: string;
  name: string;
  credentialId: string;
}

const AuthenticationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!window.PublicKeyCredential || !window.navigator.credentials) {
      alert('Ваш браузер не поддерживает WebAuthn.');
      return;
    }

    try {
      // Находим пользователя по имени
      const users = Object.values(localStorage)
        .map((item) => JSON.parse(item))
        .filter((user: User) => user.name === username);

      if (users.length === 0) {
        alert('Пользователь не найден.');
        return;
      }

      const user = users[0];

      // Параметры для проверки учетных данных
      const publicKey: any = {
        challenge: new Uint8Array(Buffer.from(generateChallenge(), 'hex')),
        allowCredentials: [{
          type: 'public-key',
          id: new Uint8Array(Buffer.from(user.credentialId, 'base64'))
        }]
      };

      // Вызываем метод navigator.credentials.get()
      const assertion = await navigator.credentials.get({ publicKey });

      if (assertion) {
        // В реальных приложениях здесь должна происходить проверка ответа от сервера
        // Но так как у нас нет сервера, просто считаем, что проверка успешная
        setAuthenticationSuccess(true);
        alert('Авторизация прошла успешно!');
      } else {
        throw new Error('Не удалось получить учетные данные.');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      alert('Произошла ошибка при авторизации. Попробуйте еще раз.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация пользователя</h2>
      {!authenticationSuccess && (
        <>
          <label htmlFor="username">
            Имя пользователя:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Авторизоваться</button>
        </>
      )}
      {authenticationSuccess && (
        <p>Вы успешно авторизованы!</p>
      )}
    </form>
  );
};

// Вспомогательные функции

// Генерация случайного вызова
function generateChallenge() {
  return crypto.randomUUID().replace(/-/g, '');
}

export default AuthenticationForm;
