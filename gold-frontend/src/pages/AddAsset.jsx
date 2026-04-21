import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AddAsset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    asset_type: "Ring",
    karat: "24K",
    weight: "",
    purchase_price: "",
    purchase_date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    
    const submitData = new FormData();
    submitData.append("asset_type", formData.asset_type);
    submitData.append("karat", formData.karat);
    submitData.append("weight", formData.weight);
    submitData.append("purchase_price", formData.purchase_price);
    submitData.append("purchase_date", formData.purchase_date);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/assets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        } else {
          throw new Error(data.message || "Failed to add asset");
        }
      }

      setSuccess(true);
    
      setFormData({
        asset_type: "Ring",
        karat: "24K",
        weight: "",
        purchase_price: "",
        purchase_date: "",
        image: null,
      });
      
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";

      
      setTimeout(() => {
        navigate("/assets");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-2">
              New Precious Asset
            </h1>
            <p className="text-on-surface-variant font-medium">
              Add a new physical asset to your digital vault.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-primary font-medium hover:underline underline-offset-4 transition-all"
          >
            <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
            Back to Dashboard
          </button>
        </div>

        {/* Success / Error messages */}
        {success && (
          <div className="mb-6 p-4 bg-tertiary/10 border-l-4 border-tertiary rounded-xl text-tertiary">
            ✓ Asset added successfully! Redirecting...
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-error/10 border-l-4 border-error rounded-xl text-error">
            ⚠️ {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_32px_48px_-12px_rgba(36,26,0,0.06)] overflow-hidden">
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Asset Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Asset Type
                  </label>
                  <div className="relative">
                    <select
                      id="asset_type"
                      value={formData.asset_type}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all appearance-none text-on-surface"
                    >
                      <option>Ring</option>
                      <option>Bracelet</option>
                      <option>Necklace</option>
                      <option>Watch</option>
                      <option>Gold Bar</option>
                      <option>Bullion Coin</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-stone-400">keyboard_arrow_down</span>
                    </div>
                  </div>
                </div>

                {/* Karat */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Karat
                  </label>
                  <div className="relative">
                    <select
                      id="karat"
                      value={formData.karat}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all appearance-none text-on-surface"
                    >
                      <option>24K (Pure Gold)</option>
                      <option>22K</option>
                      <option>18K</option>
                      <option>14K</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-stone-400">keyboard_arrow_down</span>
                    </div>
                  </div>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Weight (grams)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                      className="w-full h-12 px-4 pr-12 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all text-on-surface placeholder:text-stone-400"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-sm font-bold text-stone-400">g</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Purchase Price (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <span className="text-sm font-bold text-stone-400">$</span>
                    </div>
                    <input
                      type="number"
                      id="purchase_price"
                      value={formData.purchase_price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                      className="w-full h-12 pl-8 pr-4 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all text-on-surface placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Purchase Date */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Purchase Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="purchase_date"
                      value={formData.purchase_date}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all text-on-surface"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-stone-400">calendar_today</span>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                    Asset Documentation (Optional)
                  </label>
                  <div className="group relative flex flex-col items-center justify-center w-full h-40 bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                    <span className="material-symbols-outlined text-3xl text-primary mb-2">upload_file</span>
                    <span className="text-sm font-medium text-on-surface">Click to upload or drag image</span>
                    <span className="text-xs text-on-surface-variant mt-1">High-res photos help in valuation accuracy</span>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  {formData.image && (
                    <p className="text-xs text-tertiary mt-1">Selected: {formData.image.name}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-10 h-14 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold shadow-lg shadow-primary/20 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {loading ? "Adding..." : "Add Asset"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto px-8 h-14 rounded-full bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security Tip */}
        <div className="mt-8 flex items-start gap-4 p-6 bg-tertiary/5 rounded-xl border-l-4 border-tertiary">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <div className="text-sm">
            <p className="font-bold text-tertiary mb-1 tracking-tight uppercase text-[10px]">Security Tip</p>
            <p className="text-on-surface-variant font-medium">
              All financial data and images are encrypted in your private Aurum vault. Your purchase price is used for calculating historical ROI.
            </p>
          </div>
        </div>

        {/* Live Price Ticker */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl shadow-primary/10 border border-white/20 flex items-center gap-6 z-40">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Live Gold</span>
            <span className="font-headline font-bold text-stone-900">$2,342.12</span>
            <span className="text-[11px] font-bold text-tertiary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +1.2%
            </span>
          </div>
          <div className="h-4 w-px bg-stone-200"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Silver</span>
            <span className="font-headline font-bold text-stone-900">$28.45</span>
            <span className="text-[11px] font-bold text-tertiary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +0.4%
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddAsset;