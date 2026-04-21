import MaterialIcon from "./MaterialIcon";

const MobileBottomNav = () => {
  const navItems = [
    { name: "Dashboard", icon: "dashboard", active: true },
    { name: "Assets", icon: "payments", active: false },
    { name: "Trends", icon: "trending_up", active: false },
    { name: "Vault", icon: "account_balance", active: false },
  ];

  const handleNavClick = (itemName) => {
    console.log(`Navigate to ${itemName}`);
    // Add your routing logic here
  };

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-[#f9f9f9]/90 backdrop-blur-lg z-50 flex justify-around items-center h-16 border-t border-[#eeeeee]">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleNavClick(item.name)}
          className={`flex flex-col items-center justify-center focus:outline-none ${
            item.active ? "text-[#735c00]" : "text-[#4d4635]"
          }`}
        >
          <MaterialIcon icon={item.icon} fill={item.active} />
          <span className="text-[10px] font-medium">{item.name}</span>
        </button>
      ))}
      <div className="-mt-8">
        <button className="w-12 h-12 bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white rounded-full shadow-lg flex items-center justify-center">
          <MaterialIcon icon="add" />
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;