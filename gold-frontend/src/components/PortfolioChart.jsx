import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#d4af37", "#735c00", "#c9b037", "#a68b00"];

const PortfolioChart = ({ assets }) => {
    // نحسب عدد كل type
    const data = Object.values(
        assets.reduce((acc, asset) => {
            const key = asset.type || "other";

            if (!acc[key]) {
                acc[key] = { name: key, value: 0 };
            }

            acc[key].value += asset.current_value || 0;
            return acc;
        }, {})
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Assets Distribution</h2>
            <div className="flex justify-center"></div>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default PortfolioChart;