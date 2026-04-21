import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MaterialIcon from "../components/MaterialIcon";
import Swal from "sweetalert2";

const Vault = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/assets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAssets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAsset(null);
  };

  const goldPrice = 60; // يمكن جلبها من API لاحقاً

  if (loading) return <Layout><div className="text-center py-20">Loading your vault...</div></Layout>;
  if (error) return <Layout><div className="text-error text-center py-20">{error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface">The Vault</h1>
            <p className="text-on-surface-variant">Your secure digital treasury</p>
          </div>
          <button
            onClick={() => navigate("/add-asset")}
            className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition"
          >
            <MaterialIcon icon="add" />
            Add Asset
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl">
          <span className="text-on-surface-variant">Total Items</span>
          <span className="text-2xl font-bold text-primary">{assets.length}</span>
        </div>

        {/* Grid Cards */}
        {assets.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-xl">
            <MaterialIcon icon="inventory" className="text-5xl text-on-surface-variant" />
            <p className="mt-4 text-on-surface-variant">Your vault is empty. Add some assets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => {
              const currentValue = asset.weight * goldPrice;
              const profitLoss = currentValue - asset.purchase_price;
              const isPositive = profitLoss >= 0;
              const imageUrl = asset.image_path
                ? `http://127.0.0.1:8000/storage/${asset.image_path}`
                : null;

              return (
                <div
                  key={asset.id}
                  className="group bg-surface-container-lowest rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-l-4 border-primary"
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary-container/30 flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={asset.category || asset.type}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ display: imageUrl ? "none" : "flex" }}
                    >
                      <MaterialIcon icon="image" className="text-5xl text-primary/30" />
                    </div>
                    {/* Karat Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-bold">
                      {asset.karat}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-on-surface capitalize">
                        {asset.category || asset.type || "Asset"}
                      </h3>
                      <MaterialIcon icon="lock" className="text-primary" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Weight</span>
                        <span className="font-semibold">{asset.weight} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Purchase Price</span>
                        <span className="font-semibold">${asset.purchase_price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Current Value</span>
                        <span className="font-semibold text-primary">${currentValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Profit/Loss</span>
                        <span className={`font-bold ${isPositive ? "text-tertiary" : "text-error"}`}>
                          {isPositive ? "+" : ""}{profitLoss.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Security Footer */}
        <div className="text-center text-xs text-on-surface-variant mt-8 flex items-center justify-center gap-1">
          <MaterialIcon icon="verified" className="text-sm" />
          All assets are encrypted and stored securely.
        </div>
      </div>

      {/* Modal for View Details */}
      {showModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">Asset Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <MaterialIcon icon="close" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Type</span>
                <span className="font-semibold capitalize">{selectedAsset.category || selectedAsset.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Karat</span>
                <span className="font-semibold">{selectedAsset.karat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Weight</span>
                <span className="font-semibold">{selectedAsset.weight} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Purchase Price</span>
                <span className="font-semibold">${selectedAsset.purchase_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Purchase Date</span>
                <span className="font-semibold">{selectedAsset.purchase_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Current Value</span>
                <span className="font-semibold text-primary">${(selectedAsset.weight * goldPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Profit/Loss</span>
                <span className={`font-bold ${(selectedAsset.weight * goldPrice - selectedAsset.purchase_price) >= 0 ? "text-tertiary" : "text-error"}`}>
                  {(selectedAsset.weight * goldPrice - selectedAsset.purchase_price) >= 0 ? "+" : ""}
                  {(selectedAsset.weight * goldPrice - selectedAsset.purchase_price).toFixed(2)}
                </span>
              </div>
              {selectedAsset.image_path && (
                <div className="mt-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/${selectedAsset.image_path}`}
                    alt="Asset"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-primary text-white py-2 rounded-full hover:bg-primary/80 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Vault;