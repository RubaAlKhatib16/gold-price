import MaterialIcon from "./MaterialIcon";

const PriceVisualRow = ({ spotPrice = 60.0 }) => {
  const sparklineHeights = ["30%", "45%", "40%", "60%", "55%", "80%", "90%", "100%"];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Spot Price Card */}
      <div className="lg:col-span-4 relative overflow-hidden bg-[#1a1c1c] p-8 rounded-xl flex flex-col justify-between text-white shadow-2xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#735c00] to-[#d4af37] rounded-full blur-[80px] opacity-20"></div>
        <div>
          <div className="flex justify-between items-start">
            <span className="bg-[#735c00]/20 text-[#d4af37] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Market Live
            </span>
            <MaterialIcon icon="monitoring" className="text-[#d4af37]" />
          </div>
          <h2 className="mt-6 text-[#e2e2e2] text-sm font-medium">Gold Spot Price</h2>
          <p className="text-4xl font-black font-headline mt-2">
            ${spotPrice.toFixed(2)} <span className="text-xl text-[#d4af37]">/g</span>
          </p>
        </div>
        <div className="mt-8">
          <div className="h-16 flex items-end gap-1">
            {sparklineHeights.map((height, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t-sm ${
                  idx === sparklineHeights.length - 1
                    ? "bg-[#d4af37]"
                    : idx >= sparklineHeights.length - 3
                    ? "bg-[#735c00]"
                    : "bg-[#735c00]/20"
                }`}
                style={{ height }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-xs text-white/60">24H Range: $58.40 - $61.20</p>
            <p className="text-xs font-bold text-[#d4af37]">+1.24%</p>
          </div>
        </div>
      </div>

      {/* Featured Asset Visual */}
      <div className="lg:col-span-8 bg-[#eeeeee] rounded-xl overflow-hidden relative group shadow-sm flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1c] to-transparent z-10 opacity-60"></div>
        <img
          alt="Premium Gold Bar"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjHKcv3X4u6IcrQNX3So3vxBHLaYr6gVk9hZe9EHS2ViATAYqsgls-M_GxxFJv_Pkc4wmWebeDtvC3NAr2TWRi4qEV5ArW8ahymwh3qh7Bd3C-AiISUQGMNWb2aHSvRkIBWWmBzYhMRPzDrWzfNlnwY-WCOiBJa8k7YLwak58t185Hmmkecn8eQVwBzFK7HkMc07PAT6IYdlI6U1-nKmJo5boVGvvGOzqzP-aSZ8TDidLnYGUS0OZUMtlLc04EexE-v0rNU8ORMAQ"
        />
        <div className="relative z-20 p-10 max-w-md">
          <h2 className="text-white font-black font-headline text-3xl leading-tight mb-4">
            Investment Grade Brilliance
          </h2>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            Your portfolio is currently outperforming standard bullion benchmarks. Consider
            diversifying into 24K bars for maximum liquidity.
          </p>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-[#1a1c1c] transition-all">
            View Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default PriceVisualRow;