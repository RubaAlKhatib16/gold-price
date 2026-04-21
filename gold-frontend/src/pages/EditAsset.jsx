import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    asset_type: "",
    karat: "",
    weight: "",
    purchase_price: "",
    purchase_date: "",
    image: null,
  });
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch asset");
        const data = await response.json();
        
        //  تطابق مع الحقول الموجودة (category, type)
        setFormData({
          asset_type: data.category || data.asset_type || data.type || "",
          karat: data.karat || "",
          weight: data.weight || "",
          purchase_price: data.purchase_price || "",
          purchase_date: data.purchase_date || "",
          image: null,
        });
        setExistingImage(data.image_path);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchAsset();
  }, [id]);

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

    const token = localStorage.getItem("token");
    const submitData = new FormData();
    submitData.append("asset_type", formData.asset_type);
    submitData.append("karat", formData.karat);
    submitData.append("weight", formData.weight);
    submitData.append("purchase_price", formData.purchase_price);
    submitData.append("purchase_date", formData.purchase_date);
    if (formData.image) submitData.append("image", formData.image);
    submitData.append("_method", "PUT");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: submitData,
      });
      if (!response.ok) throw new Error("Failed to update");

      Swal.fire("Updated!", "Asset has been updated.", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Layout><div className="text-center py-20">Loading asset...</div></Layout>;
  if (error) return <Layout><div className="text-center text-error py-20">{error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter">Edit Asset</h1>
            <p className="text-on-surface-variant">Update your precious asset details.</p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="text-primary hover:underline">← Back</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Asset Type</label>
                <select id="asset_type" value={formData.asset_type} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-gray-100">
                  <option>Ring</option><option>Bracelet</option><option>Necklace</option><option>Watch</option><option>Gold Bar</option><option>Bullion Coin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Karat</label>
                <select id="karat" value={formData.karat} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-gray-100">
                  <option>24K</option><option>22K</option><option>18K</option><option>14K</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Weight (g)</label>
                <input type="number" id="weight" value={formData.weight} onChange={handleChange} step="0.01" required className="w-full h-12 px-4 rounded-xl bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Purchase Price ($)</label>
                <input type="number" id="purchase_price" value={formData.purchase_price} onChange={handleChange} step="0.01" required className="w-full h-12 px-4 rounded-xl bg-gray-100" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Purchase Date</label>
                <input type="date" id="purchase_date" value={formData.purchase_date} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-gray-100" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Asset Image (Optional)</label>
                {existingImage && <img src={`http://127.0.0.1:8000/storage/${existingImage}`} alt="Asset" className="w-32 h-32 object-cover rounded mb-2" />}
                <input type="file" id="image" accept="image/*" onChange={handleChange} className="w-full" />
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#735c00] to-[#d4af37] text-white px-8 py-3 rounded-full font-bold">
                {loading ? "Updating..." : "Update Asset"}
              </button>
              <button type="button" onClick={() => navigate("/dashboard")} className="bg-gray-300 px-8 py-3 rounded-full">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditAsset;