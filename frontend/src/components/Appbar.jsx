import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";

export const Appbar = ({ name }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const navItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Send Money", path: "/send" }, // Fixed path from /Userspage to /send based on your routes
    { label: "Transactions", path: "/Transactions" },
    { label: "About Us", path: "/Aboutus" },
  ];

  // Safety check: Ensure name exists before trying to access the first letter
  const userInitial = name && name.length > 0 ? name[0].toUpperCase() : "U";

  return (
    <>
      <div className="w-full h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8 bg-neutral-950 text-gray-200 backdrop-blur-md border-b border-white/10 shadow-sm fixed top-0 z-50">
        {/* 1. Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <span className="text-2xl font-bold text-white tracking-tighter">
            Zap<span className="text-purple-500">Wallet</span>
          </span>
        </div>

        {/* 2. Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 ">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="text-sm font-medium text-gray-300 cursor-pointer hover:text-white hover:scale-105 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3. User Profile & Mobile Toggle */}
        <div className="flex items-center ">
          {/* Desktop User Info */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-white">
                {name || "User"}
              </p>
              <button
                onClick={logout}
                className="text-xs text-red-400 hover:text-red-300 hover:underline cursor-pointer transition-colors "
              >
                Sign out
              </button>
            </div>

            <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-purple-400 font-bold shadow-lg">
              {name ? userInitial : <User className="w-5 h-5" />}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Sidebar (Glass Drawer) */}
      {/* Overlay Background - Click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-white">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="text-left text-lg font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Footer (Logout) */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center text-purple-400 font-bold">
                {userInitial}
              </div>
              <div className="text-white font-medium truncate">
                {name || "User"}
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full p-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
