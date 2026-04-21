import { useState, useEffect } from 'react';

export const useGoldPrice = () => {
  const [price, setPrice] = useState({ usd: 60.00, jod: 42.54 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/gold-price');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPrice({ usd: data.usd, jod: data.jod });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); 
    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
};