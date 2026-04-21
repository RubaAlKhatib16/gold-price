import { useNavigate, useLocation } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: "dashboard", path: "/dashboard" },
    { name: "Assets", icon: "payments", path: "/assets" },
    { name: "Analytics", icon: "trending_up", path: "/analytics" },
    { name: "Vault", icon: "account_balance", path: "/vault" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f3f3f3] dark:bg-[#1a1c1c] z-40 hidden md:block">
      <div className="flex flex-col p-6 space-y-4 h-full">
        {/* Logo */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#735c00] flex items-center justify-center text-white">
              <MaterialIcon icon="account_balance" fill />
            </div>
            <div>
              <h2 className="font-['Manrope'] font-extrabold text-[#735c00] leading-none text-lg">
                The Vault
              </h2>
              <p className="text-xs text-[#4d4635] mt-1">Premium Tier</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 font-medium text-sm rounded-lg text-left ${
                  isActive
                    ? "bg-white dark:bg-[#2a2d2d] text-[#735c00] dark:text-[#d4af37] shadow-sm"
                    : "text-[#4d4635] dark:text-[#d0c5af] hover:bg-[#e2e2e2] dark:hover:bg-[#333]"
                }`}
              >
                <MaterialIcon icon={item.icon} fill={isActive} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Add Asset Button */}
        <div className="mt-auto">
          <button
            onClick={() => navigate("/add-asset")}
            className="w-full bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_12px_24px_rgba(115,92,0,0.2)] hover:scale-[1.02] transition-transform active:scale-95"
          >
            <MaterialIcon icon="add" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;