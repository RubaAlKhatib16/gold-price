import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SummaryCards from "../components/SummaryCards";
import PriceVisualRow from "../components/PriceVisualRow";
import AssetsTable from "../components/AssetsTable";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PortfolioChart from "../components/PortfolioChart";
import { useSearch } from "../context/SearchContext";
import LoadingScreen from "../components/LoadingScreen";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { searchTerm } = useSearch();
  const [sortBy, setSortBy] = useState("value");
  const [sortOrder, setSortOrder] = useState("desc");

  const goldPrice = 60;

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/assets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Server error: " + response.status);
      const data = await response.json();
      console.log("Assets from API:", data);
      setAssets(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [location.key]);

  const handleDeleteAsset = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: true,
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete");
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Your asset has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ title: "Error!", text: err.message, icon: "error" });
    }
  };

  // Filtering
  const filteredAssets = assets.filter((asset) => {
    const search = searchTerm.toLowerCase();
    if (!search) return true;
    const category = (asset.category || "").toLowerCase();
    const type = (asset.type || "").toLowerCase();
    const karat = (asset.karat || "").toLowerCase();
    return category.includes(search) || type.includes(search) || karat.includes(search);
  });

  // Sorting
  const getSortedAssets = (assetsToSort) => {
    return [...assetsToSort].sort((a, b) => {
      let aVal = 0, bVal = 0;
      if (sortBy === "value") {
        aVal = a.weight * goldPrice;
        bVal = b.weight * goldPrice;
      } else if (sortBy === "profit") {
        aVal = a.weight * goldPrice - a.purchase_price;
        bVal = b.weight * goldPrice - b.purchase_price;
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  };
  const sortedAssets = getSortedAssets(filteredAssets);

  // Statistics
  const totalWeight = assets.reduce((sum, a) => sum + Number(a.weight), 0);
  const totalValue = assets.reduce((sum, a) => sum + a.weight * goldPrice, 0);
  const totalProfit = assets.reduce(
    (sum, a) => sum + (a.weight * goldPrice - a.purchase_price),
    0
  );
  const profitPercentage = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0;
  const totalItems = assets.length;

  const dashboardData = {
    total_assets: totalWeight,
    total_value: totalValue,
    total_profit: totalProfit,
    profit_percentage: profitPercentage,
    total_items: totalItems,
    assets: assets,
    spot_price: goldPrice,
  };

  //  Gold Loading Screen
  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-error text-center py-20">{error}</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-10">
        <SummaryCards data={dashboardData} />
        <PriceVisualRow spotPrice={goldPrice} />
        <PortfolioChart assets={dashboardData?.assets || []} />

        {/* Sorting Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-start my-2">
          <button
            onClick={() => { setSortBy("value"); setSortOrder("desc"); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === "value" && sortOrder === "desc" ? "bg-primary text-white shadow-md" : "bg-surface-container text-on-surface"}`}
          >
            Highest Value ↓
          </button>
          <button
            onClick={() => { setSortBy("value"); setSortOrder("asc"); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === "value" && sortOrder === "asc" ? "bg-primary text-white shadow-md" : "bg-surface-container text-on-surface"}`}
          >
            Lowest Value ↑
          </button>
          <button
            onClick={() => { setSortBy("profit"); setSortOrder("desc"); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === "profit" && sortOrder === "desc" ? "bg-primary text-white shadow-md" : "bg-surface-container text-on-surface"}`}
          >
            Highest Profit ↓
          </button>
          <button
            onClick={() => { setSortBy("profit"); setSortOrder("asc"); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === "profit" && sortOrder === "asc" ? "bg-primary text-white shadow-md" : "bg-surface-container text-on-surface"}`}
          >
            Lowest Profit ↑
          </button>
        </div>

        <AssetsTable assets={sortedAssets} onDelete={handleDeleteAsset} />
      </div>

      {/* Floating Action Button  */}
      <button className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white rounded-full shadow-2xl flex items-center justify-center z-40">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </Layout>
  );
};

export default Dashboard;