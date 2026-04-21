import { useState, useEffect } from 'react';

const LivePriceTicker = () => {
  const [price, setPrice] = useState({ usd: 60.0, jod: 42.5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/gold-price');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setPrice({ usd: data.usd, jod: data.jod });
      setError(null);
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

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-6 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="text-xs font-bold font-label text-on-surface-variant uppercase tracking-tighter">
          Live Spot Price
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-headline font-bold text-sm">XAU/USD</span>
          <span className="text-stone-900 font-bold">
            ${loading ? '...' : price.usd}
          </span>
          <span className="text-tertiary text-xs font-bold">/g</span>
        </div>
        <div className="h-4 w-px bg-stone-200"></div>
        <div className="flex items-center gap-1.5">
          <span className="font-headline font-bold text-sm">XAU/JOD</span>
          <span className="text-stone-900 font-bold">
            {loading ? '...' : price.jod} JD
          </span>
          <span className="text-tertiary text-xs font-bold">/g</span>
        </div>
      </div>
      {error && <span className="text-xs text-error ml-2">⚠️</span>}
    </div>
  );
};

export default LivePriceTicker;