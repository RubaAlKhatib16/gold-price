import MaterialIcon from "./MaterialIcon";

const SummaryCards = ({ data }) => {
  // Destructure with fallbacks
  const totalAssets = data?.total_assets || 0;
  const totalValue = data?.total_value || 0;
const totalProfitLoss = data?.total_profit || 0;
  const profitPercentage = data?.profit_percentage || 0;
  const totalItems = data?.total_items || 12; // if your API provides it

  const summary = [
    {
      title: "Total Assets",
      value: totalAssets.toFixed(2),
      unit: "g",
      footerIcon: "inventory_2",
      footerText: `Spread across ${totalItems} items`,
    },
    {
      title: "Total Current Value",
      value: `$${totalValue.toFixed(2)}`,
      unit: "",
      footerIcon: "schedule",
      footerText: "Last updated just now",
    },
    {
      title: "Total Profit/Loss",
      value: `${totalProfitLoss >= 0 ? "+" : ""}$${Math.abs(totalProfitLoss).toFixed(2)}`,
      unit: "",
      footerIcon: "trending_up",
      footerText: "Consistent growth this month",
      extraBadge: {
        value: `${profitPercentage >= 0 ? "+" : ""}${profitPercentage}%`,
        icon: profitPercentage >= 0 ? "arrow_upward" : "arrow_downward",
      },
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summary.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow-[0_32px_48px_rgba(36,26,0,0.04)] group hover:shadow-[0_40px_60px_rgba(36,26,0,0.08)] transition-all duration-300"
        >
          <p className="text-[#4d4635] text-sm font-medium mb-1">{card.title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black font-headline text-[#1a1c1c] tracking-tight">
              {card.value}
              {card.unit && <span className="text-lg font-bold text-[#735c00]"> {card.unit}</span>}
            </h3>
            {card.extraBadge && (
              <div className="flex items-center text-[#415ba4] bg-[#dbe1ff]/30 px-2 py-0.5 rounded-full text-xs font-bold">
                <MaterialIcon icon={card.extraBadge.icon} className="text-sm" />
                {card.extraBadge.value}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#5f5e5e]">
            <MaterialIcon icon={card.footerIcon} className="text-sm" />
            <span>{card.footerText}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;