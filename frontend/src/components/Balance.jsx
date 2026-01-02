// frontend/src/components/Balance.jsx
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Balance = ({ value }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Format the number to currency string (e.g., ₹ 10,000.00)
  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

  return (
    <div className="relative w-full overflow-hidden my-6">
      {/* 1. Background Glow Effects (The "Zap" Feel) */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* 2. The Glass Card */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
        {/* Top Row: Label + Visibility Toggle */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <div className="p-1.5 bg-gray-800 rounded-lg">
              <Wallet className="w-4 h-4 text-purple-400" />
            </div>
            <span>Total Balance</span>
          </div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
          >
            {isVisible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Middle Row: The Money */}
        <div className="mb-8">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-white tracking-tight transition-all duration-300 ${
              isVisible ? "" : "blur-md select-none"
            }`}
          >
            {isVisible ? formattedBalance : "₹ ••••••"}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-green-400 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+2.4% this month</span>
          </div>
        </div>

        {/* Bottom Row: Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/send")}
            className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3.5 px-4 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <ArrowUpRight className="w-5 h-5" />
            Send
          </button>

          <button
            onClick={() => navigate("/addMoney")} // Assuming this is for adding money
            className="flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3.5 px-4 rounded-xl border border-white/10 hover:bg-gray-700 active:scale-95 transition-all"
          >
            <ArrowDownLeft className="w-5 h-5" />
            Add Money
          </button>
        </div>
      </div>
    </div>
  );
};
