import MaterialIcon from "./MaterialIcon";
import { useNavigate } from "react-router-dom";

const getAssetIcon = (type) => {
  if (!type) return "help";
  switch (type.toLowerCase()) {
    case "ring":
      return "diamond";
    case "bracelet":
      return "architecture";
    case "necklace":
      return "jewelry";
    case "gold bar":
      return "view_in_ar";
    case "bullion coin":
      return "token";
    default:
      return "sell";
  }
};

const AssetsTable = ({ assets, onDelete }) => {
  const navigate = useNavigate(); // ✅ أضف هذا السطر

  if (!assets || assets.length === 0) {
    return (
      <section className="space-y-6">
        <div className="text-center py-12 text-[#4d4635]">No assets found.</div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black font-headline text-[#1a1c1c] tracking-tight">
          Your Assets
        </h2>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-[#eeeeee] rounded-lg hover:bg-[#e8e8e8] transition-colors">
            <MaterialIcon icon="filter_list" className="text-[#4d4635]" />
          </button>
          <button className="p-2 bg-[#eeeeee] rounded-lg hover:bg-[#e8e8e8] transition-colors">
            <MaterialIcon icon="sort" className="text-[#4d4635]" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[900px] space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3 text-xs font-bold text-[#4d4635] uppercase tracking-widest">
            <div className="col-span-3">Asset Type</div>
            <div className="col-span-1">Karat</div>
            <div className="col-span-2">Weight</div>
            <div className="col-span-2">Purchase Price</div>
            <div className="col-span-2">Current Value</div>
            <div className="col-span-1">Profit/Loss</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Asset Rows */}
          {assets.map((asset) => {
            const purchasePrice = asset.purchase_price || 0;
            const currentValue = asset.current_value || asset.weight * 60;
            const profitLoss = currentValue - purchasePrice;
            const profitPercent = purchasePrice > 0 ? (profitLoss / purchasePrice) * 100 : 0;
            const isPositive = profitLoss >= 0;

            // ✅ اسم الأصل المعروض: category (مثل ring) أو type (مثل gold)
            const assetDisplayName = asset.type || "Unknown";
            // ✅ الأيقونة تعتمد على category (مثل ring)
            const assetIconType = asset.type || "";

            return (
              <div
                key={asset.id}
                className="grid grid-cols-12 items-center bg-white px-6 py-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#eeeeee] flex items-center justify-center">
                    <MaterialIcon
                      icon={getAssetIcon(assetIconType)}
                      fill
                      className="text-[#735c00]"
                    />
                  </div>
                  <span className="font-bold text-[#1a1c1c] capitalize">
                    {assetDisplayName}
                  </span>
                </div>
                <div className="col-span-1">
                  <span
                    className={`text-xs px-2 py-1 rounded font-bold ${
                      asset.karat === "24K"
                        ? "bg-[#d4af37]/20 text-[#554300]"
                        : asset.karat === "22K"
                        ? "bg-[#e4e2e1] text-[#656464]"
                        : "bg-[#d0c5af]/30 text-[#4d4635]"
                    }`}
                  >
                    {asset.karat || "N/A"}
                  </span>
                </div>
                <div className="col-span-2 font-medium">{asset.weight} g</div>
                <div className="col-span-2 text-[#4d4635]">${purchasePrice.toFixed(2)}</div>
                <div className="col-span-2 font-bold">${currentValue.toFixed(2)}</div>
                <div className="col-span-1">
                  <div className={`font-bold ${isPositive ? "text-[#415ba4]" : "text-[#ba1a1a]"}`}>
                    {isPositive ? "+" : ""}${Math.abs(profitLoss).toFixed(2)}
                  </div>
                  <div className={`text-xs ${isPositive ? "text-[#415ba4]/70" : "text-[#ba1a1a]/70"}`}>
                    {isPositive ? "+" : ""}{profitPercent.toFixed(2)}%
                  </div>
                </div>
                <div className="col-span-1 text-right flex items-center justify-end gap-2">
                  <button
                    onClick={() => navigate(`/edit-asset/${asset.id}`)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <MaterialIcon icon="edit" />
                  </button>
                  <button
                    onClick={() => onDelete(asset.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <MaterialIcon icon="delete" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AssetsTable;