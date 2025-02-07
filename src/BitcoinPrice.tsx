import React, { useEffect, useState } from 'react';
 
interface BitcoinPrice {
  USD: number;  
  EUR: number;  
}

const BitcoinPrice: React.FC = () => {
  const [priceData, setPriceData] = useState<BitcoinPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR');
        if (!response.ok) {
          throw new Error('Ошибка при получении данных о цене биткоина');
        }
        const data: BitcoinPrice = await response.json();
        setPriceData(data);
      } catch (err) {
        setError('Не удалось загрузить данные о курсе биткоина');
      } finally {
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Текущий курс биткоина</h1>
      <p>Цена в USD: ${priceData?.USD.toFixed(2)}</p>
      <p>Цена в EUR: €{priceData?.EUR.toFixed(2)}</p>
    </div>
  );
};

export default BitcoinPrice;
