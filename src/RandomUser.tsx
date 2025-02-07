import React, { useEffect, useRef, useState } from 'react';

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
}

const RandomUser: React.FC = () => {
  const isReady = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data.results[0]);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (!isReady.current) {
      fetchUser();
      isReady.current = true;
    }
  }, [isReady]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>
        {user?.name.title} {user?.name.first} {user?.name.last}
      </h3>
      <p>Email: {user?.email}</p>
      <img src={user?.picture.large} alt={`${user?.name.first} ${user?.name.last}`} />
    </div>
  );
};

export default RandomUser;
