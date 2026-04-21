import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileBottomNav from "../components/MobileBottomNav";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setAssets(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="antialiased bg-background min-h-screen">
      <Sidebar />
      <Header />

      <main className="md:ml-64 pt-20 pb-12 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">

          <h1 className="text-2xl font-bold text-gray-800">
            Your Assets
          </h1>

          <div className="bg-white rounded-2xl shadow p-6">

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="pb-3">Asset</th>
                    <th>Karat</th>
                    <th>Weight</th>
                    <th>Purchase</th>
                    <th>Current</th>
                    <th>Profit/Loss</th>
                  </tr>
                </thead>

                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="border-b">
                      <td className="py-4">{asset.type}</td>
                      <td>{asset.karat}K</td>
                      <td>{asset.weight}g</td>
                      <td>${asset.purchase_price}</td>
                      <td>${asset.current_value.toFixed(2)}</td>
                      <td
                        className={
                          asset.profit_loss >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        ${asset.profit_loss}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>

        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default Assets;