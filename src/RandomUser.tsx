// RandomUser.tsx
import React, { useEffect, useState } from 'react';

// Определяем интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  // Вы можете добавить другие поля, если необходимо
}

const RandomUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Состояние для хранения случайного пользователя
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        // Генерируем случайный ID от 1 до 10 (включительно)
        const randomUserId = Math.floor(Math.random() * 10) + 1;
        console.log('randomUserId', randomUserId)
        // Получаем детали случайного пользователя
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomUserId}`);

        if (!response.ok) {
          throw new Error('Unable to fetch random user');
        }

        const randomUser: User = await response.json();
        setUser(randomUser); // Сохранение полученного случайного пользователя
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error'); // Установка сообщения об ошибке
      } finally {
        setLoading(false); // Установка загрузки в false
      }
    };

    fetchRandomUser(); // Вызов функции при монтировании компонента
  }, []); // Пустой массив означает, что эффект сработает только при монтировании

  // Отображение контента в зависимости от состояния
  if (loading) {
    return <div>Loading...</div>; // Показываем загрузку
  }

  if (error) {
    return <div>Error: {error}</div>; // Показываем ошибку
  }

  return (
    <div>
      <h1>Random User {user?.id}</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      {/* Вы можете добавить другие поля пользователя, если это необходимо */}
    </div>
  );
};

export default RandomUser;
