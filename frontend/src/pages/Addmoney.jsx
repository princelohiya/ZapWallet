import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading"; // Assuming you have this
import { InputBox } from "../components/InputBox"; // Assuming you have this
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { Spinner } from "../components/Loader";
import { ArrowLeft, Wallet, CreditCard } from "lucide-react"; // Icons for better UI

export const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // To show success/error messages
  const navigate = useNavigate();

  const handleAddMoney = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Adjust endpoint based on your backend: /account/deposit or /account/add-money
      const url = `${API_BASE_URL}/account/deposit`;
      const token = localStorage.getItem("token");

      await axios.post(
        url,
        { amount: Number(amount) },
        {
          headers: {
            token: token,
          },
        }
      );

      setMessage({ type: "success", text: "Money added successfully!" });

      // We pass the amount in 'state' so the success page can display it
      setTimeout(() => {
        navigate("/payment-success", { state: { amount: Number(amount) } });
      }, 1000); // 1 second delay to show the success message briefly on this page first
      // -----------------------
    } catch (error) {
      console.error("Error adding money:", error);
      setMessage({
        type: "error",
        text: "Transaction failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-purple-400">
        <Spinner />
        <div className="text-xl font-semibold mt-4 text-white">
          Processing Transaction...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-gray-200 selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* 1. TOP HEADER */}
      <div className="z-10 w-full border-b border-white/5 bg-neutral-900/50 backdrop-blur-md h-16 flex items-center px-6 lg:px-10 justify-between sticky top-0">
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="ZapWallet"
            className="h-20 w-20 object-contain"
          />
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex justify-center items-center p-4 z-10">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add Money</h2>
                <p className="text-gray-400 text-sm">
                  Top up your wallet securely
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Custom Input Area */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setMessage(null);
                    }}
                    placeholder="0.00"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 pl-10 py-3 text-white text-lg placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Quick Add Chips */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[100, 500, 1000, 2000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 hover:border-purple-500/30 transition-all text-gray-300 whitespace-nowrap"
                  >
                    + ₹{val}
                  </button>
                ))}
              </div>

              {/* Bank Selection (Visual Only for now) */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Payment Method
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-purple-500/20 cursor-pointer transition-colors">
                  <div className="bg-white p-1 rounded">
                    {/* Placeholder generic bank icon or image */}
                    <CreditCard className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">
                      HDFC Bank **** 8892
                    </div>

                    <div className="text-xs text-gray-500">Primary Account</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleAddMoney} label={"Proceed to Add"} />
              </div>

              {/* Message Feedback */}
              {message && (
                <div
                  className={`text-center text-sm font-medium py-2 px-4 rounded-lg animate-fade-in ${
                    message.type === "success"
                      ? "bg-green-500/20 text-green-400 border border-green-500/20"
                      : "bg-red-500/20 text-red-400 border border-red-500/20"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6">
            Secure transaction encrypted by ZapWallet Shield™
          </p>
        </div>
      </div>
    </div>
  );
};
