import { useNavigate } from "react-router-dom";
import NewsSlider from "../components/NewsSlider";
import LivePriceTicker from '../components/LivePriceTicker';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto font-headline tracking-tight">
          <div className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              payments
            </span>
            Gold Portfolio Tracker
          </div>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/dashboard")} className="text-stone-500 hover:text-yellow-600 transition-colors duration-200">
              Dashboard
            </button>
            <button onClick={() => navigate("/assets")} className="text-stone-500 hover:text-yellow-600 transition-colors duration-200">
              Assets
            </button>
            <button onClick={() => navigate("/add-asset")} className="text-stone-500 hover:text-yellow-600 transition-colors duration-200">
              Add Asset
            </button>
          </div>
          {/* CTA Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-stone-500 font-medium hover:text-stone-900 transition-colors"
            onClick={()=> navigate("/login")}
            >
                
              Sign In
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
            >
              Start Tracking
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
              Track Your Gold.<br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Know Your Profit.
              </span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-lg leading-relaxed">
              The premium digital vault for the modern investor. Manage your physical gold holdings with
              real-time market data and advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
              >
                Start Tracking
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-surface-container-high text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-highest active:scale-95 transition-all"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Mockup Card */}
          <div className="relative">
            <div className="bg-surface-container-low p-8 rounded-3xl border-outline-variant/10 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-stone-100">
                  <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Total Value</span>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-headline font-bold">$7,200.00</span>
                    <span className="text-error text-sm font-medium mb-1 flex items-center">
                      <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      $300 (4.0%)
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-stone-100">
                  <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Total Assets</span>
                  <div className="text-2xl font-headline font-bold mt-1">120g</div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-stone-100">
                  <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Market Price</span>
                  <div className="text-2xl font-headline font-bold mt-1">
                    $60.00<span className="text-xs text-on-surface-variant ml-1">/g</span>
                  </div>
                </div>
                <div className="col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-stone-100 h-32 flex flex-col justify-end overflow-hidden">
                  <div className="flex items-end gap-1 h-full pt-4">
                    <div className="w-full bg-stone-100 h-[60%] rounded-t-md"></div>
                    <div className="w-full bg-stone-100 h-[80%] rounded-t-md"></div>
                    <div className="w-full bg-stone-100 h-[70%] rounded-t-md"></div>
                    <div className="w-full bg-primary-container h-[90%] rounded-t-md"></div>
                    <div className="w-full bg-stone-100 h-[75%] rounded-t-md"></div>
                    <div className="w-full bg-stone-100 h-[85%] rounded-t-md"></div>
                    <div className="w-full bg-stone-100 h-[65%] rounded-t-md"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Portfolio Breakdown Section */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">Portfolio Breakdown</h2>
              <p className="text-on-surface-variant">Intelligent categorization of your precious metals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-3xl transition-transform hover:scale-[1.02] duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    stars
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-2">24K Investment</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Pure 99.9% gold bullion and bars. The cornerstone of your physical wealth.
                </p>
                <div className="flex justify-between items-center border-t border-stone-50 pt-4">
                  <span className="text-on-surface font-semibold">80.00g</span>
                  <span className="text-primary font-bold">$4,800</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-3xl transition-transform hover:scale-[1.02] duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    monetization_on
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-2">22K Assets</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  High-purity jewelry and commemorative coins. Liquid and portable value.
                </p>
                <div className="flex justify-between items-center border-t border-stone-50 pt-4">
                  <span className="text-on-surface font-semibold">30.00g</span>
                  <span className="text-primary font-bold">$1,650</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-3xl transition-transform hover:scale-[1.02] duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diamond
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-2">18K Collection</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Standard luxury jewelry. Durability meets intrinsic gold value.
                </p>
                <div className="flex justify-between items-center border-t border-stone-50 pt-4">
                  <span className="text-on-surface font-semibold">10.00g</span>
                  <span className="text-primary font-bold">$750</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">update</span>
              <h4 className="text-xl font-bold font-headline">Real-time gold prices</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Global market feeds updated every 60 seconds. Know exactly what your holdings are worth at
                any moment.
              </p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">analytics</span>
              <h4 className="text-xl font-bold font-headline">Portfolio tracking</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Organize your assets by purity, weight, and purchase date. Get a holistic view of your
                entire gold estate.
              </p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">insights</span>
              <h4 className="text-xl font-bold font-headline">Profit/Loss insights</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Deep analysis into your returns. Understand market volatility and timing with clear,
                actionable charts.
              </p>
            </div>
          </div>
        </section>

        {/*  News Slider Section  */}
        <section className="max-w-7xl mx-auto px-6 py-12">
        <NewsSlider />
         </section>

        {/* How It Works (Dark Section) */}
        <section className="bg-stone-900 text-white py-24 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl space-y-4">
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">
                  The Modern Path to Wealth Management
                </h2>
                <p className="text-stone-400 text-lg">
                  Secure your future in three simple steps with our specialized tracking ecosystem.
                </p>
              </div>
              <div className="hidden md:block w-32 h-1 bg-primary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="space-y-6">
                <div className="text-6xl font-headline font-black text-primary-container opacity-90">01</div>
                <h3 className="text-2xl font-bold">Add your gold assets</h3>
                <p className="text-stone-400">
                  Input your holdings—from bars and coins to jewelry—categorized by karat weight and purity.
                </p>
              </div>
              <div className="space-y-6">
                <div className="text-6xl font-headline font-black text-primary-container opacity-90">02</div>
                <h3 className="text-2xl font-bold">Track live gold prices</h3>
                <p className="text-stone-400">
                  Synchronize your portfolio with global spot prices to see instant valuation updates
                  automatically.
                </p>
              </div>
              <div className="space-y-6">
                <div className="text-6xl font-headline font-black text-primary-container opacity-90">03</div>
                <h3 className="text-2xl font-bold">Monitor your profit and loss</h3>
                <p className="text-stone-400">
                  Analyze your net worth growth and individual asset performance with high-precision
                  reporting.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center px-6">
          <div className="max-w-3xl mx-auto bg-surface-container-low rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                Ready to secure your portfolio?
              </h2>
              <p className="text-on-surface-variant text-lg">
                Join thousands of smart investors who trust our platform for their precious metal tracking.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-primary to-primary-container text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl shadow-primary/30 active:scale-95 transition-all inline-flex items-center gap-3"
              >
                Start Tracking Your Gold
                <span className="material-symbols-outlined">trending_up</span>
              </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-[2px]"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline font-semibold text-stone-900 text-lg">Gold Portfolio Tracker</div>
            <div className="text-stone-500 text-sm">© 2026 Gold Portfolio Tracker. All rights reserved.</div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-label text-sm">
            <a href="#" className="text-stone-500 hover:text-yellow-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-stone-500 hover:text-yellow-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-stone-500 hover:text-yellow-600 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Price Ticker */}
        <LivePriceTicker />
        </div>
  );
};

export default HomePage;