import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#735c00", "#d4af37", "#415ba4", "#ba1a1a", "#5f5e5e", "#4d4635"];

const Analytics = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchAssets();
  }, []);

  if (loading) return <Layout><div className="text-center py-20">Loading analytics...</div></Layout>;
  if (error) return <Layout><div className="text-error text-center py-20">{error}</div></Layout>;


  const goldPrice = 60;
  const totalValue = assets.reduce((sum, a) => sum + a.weight * goldPrice, 0);
  const totalPurchase = assets.reduce((sum, a) => sum + a.purchase_price, 0);
  const totalProfit = totalValue - totalPurchase;
  const profitPercentage = totalPurchase > 0 ? (totalProfit / totalPurchase) * 100 : 0;
  const totalWeight = assets.reduce((sum, a) => sum + a.weight, 0);

 
  const typeMap = new Map();
  assets.forEach(asset => {
    const type = asset.category || "Other";
    const value = asset.weight * goldPrice;
    typeMap.set(type, (typeMap.get(type) || 0) + value);
  });
  const pieData = Array.from(typeMap.entries()).map(([name, value]) => ({ name, value }));


  const assetValues = assets.map(asset => ({
    name: asset.category || asset.type || "Asset",
    value: asset.weight * goldPrice,
    id: asset.id
  }));
  const topAssets = [...assetValues].sort((a, b) => b.value - a.value).slice(0, 5);

  
  const profitData = assets.map(asset => {
    const current = asset.weight * goldPrice;
    const profit = current - asset.purchase_price;
    return {
      name: asset.category || asset.type || "Asset",
      profit,
      isPositive: profit >= 0
    };
  });
  const topProfit = [...profitData].sort((a, b) => b.profit - a.profit).slice(0, 5);
  const topLoss = [...profitData].sort((a, b) => a.profit - b.profit).slice(0, 5);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {/* عنوان الصفحة */}
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface">Analytics Dashboard</h1>
          <p className="text-on-surface-variant">Deep insights into your gold portfolio</p>
        </div>

        {/* بطاقات إحصائيات رئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-primary">${totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Total Profit / Loss</p>
            <p className={`text-3xl font-bold ${totalProfit >= 0 ? "text-tertiary" : "text-error"}`}>
              {totalProfit >= 0 ? "+" : ""}{totalProfit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Total Weight</p>
            <p className="text-3xl font-bold text-primary">{totalWeight.toFixed(2)} g</p>
          </div>
        </div>

        {/* المخططات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart: Distribution by Type */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Distribution by Asset Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Top Assets by Value */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Top Assets by Current Value</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topAssets}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar dataKey="value" fill="#735c00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* نظرة عامة على الأرباح */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-tertiary"> Top Profitable Assets</h2>
            {topProfit.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b py-2">
                <span>{item.name}</span>
                <span className="font-bold text-tertiary">+${item.profit.toFixed(2)}</span>
              </div>
            ))}
            {topProfit.length === 0 && <p className="text-gray-500">No profitable assets</p>}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-error"> Top Losses</h2>
            {topLoss.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b py-2">
                <span>{item.name}</span>
                <span className="font-bold text-error">${item.profit.toFixed(2)}</span>
              </div>
            ))}
            {topLoss.length === 0 && <p className="text-gray-500">No loss assets</p>}
          </div>
        </div>

        {/* ملاحظة حول البيانات */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
          * Current value is calculated based on gold spot price of ${goldPrice}/g. Real-time price integration coming soon.
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;