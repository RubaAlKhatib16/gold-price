import { useSearch } from "../context/SearchContext";
import MaterialIcon from "./MaterialIcon";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";




const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, logout } = useAuth(); 
const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-30 bg-[#f9f9f9]/80 dark:bg-[#1a1c1c]/80 backdrop-blur-md md:pl-64">
      <div className="flex justify-between items-center px-8 h-16 w-full">
        <div className="flex items-center gap-4">
          <div className="md:hidden w-10 h-10 rounded-full bg-[#eeeeee] flex items-center justify-center">
            <MaterialIcon icon="menu" className="text-[#735c00]" />
          </div>
          <h1 className="text-xl font-black text-[#1a1c1c] dark:text-[#f9f9f9] tracking-tighter font-headline uppercase md:normal-case">
            Gold Portfolio Tracker
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4635]"
            />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#f3f3f3] border-none rounded-full py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>

          {/* Icons & Profile */}
          <div className="flex items-center gap-4">
            <button className="text-[#4d4635] dark:text-[#d0c5af] hover:text-[#735c00] transition-colors relative">
              <MaterialIcon icon="notifications" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            </button>
            
<button
  onClick={() => navigate("/profile")}
  className="text-[#4d4635] dark:text-[#d0c5af] hover:text-[#735c00] transition-colors"
>
  <MaterialIcon icon="settings" />
</button>

            {/* زر تسجيل الخروج */}
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Logout"
            >
              <MaterialIcon icon="logout" />
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d4af37] p-0.5">
              <img
                alt="User profile"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1WMCpnmZnTc77p49cjJvQRl1z_JF7NqQYxDbUYO0jVbtjAZtEYQVXqIvKnK9A-j8B6VB8B4q-OEDply9RkCGCHMun09QLA2w-x7wsGxnQMFxOQdXFVLgBIx0nZ-uD3Hdi1DN8jJYrXj_jUIBlFXed1hkiLtZZuvwhP2xp5yCNBR0NUxPjLvhsLlMA3AMzul7hBvmiDmakZER_hA7xtg7JRByi9EzRcaa_cqYthBTgXZxoYMybpSKdHtC-Xk_iEl5mJH0PUlntV5A"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;