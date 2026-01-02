import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";
import { Users } from "../components/Users"; // Imported Users Component
import { API_BASE_URL } from "../config/api";
import { ArrowLeft, ShieldCheck, Wallet, Send as SendIcon } from "lucide-react";

export const Send = ({ name, balance, fetchUser }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const recipientName = searchParams.get("name") || "Unknown";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // --- NEW INTEGRATION: If no ID, show User List ---
  if (!id) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Appbar name={name} />
        <div className="flex justify-center pt-24 px-4">
          <div className="w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-8">Send Money</h1>
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
              <h2 className="text-xl font-semibold text-gray-200 mb-6">
                Select Recipient
              </h2>
              <Users />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // --------------------------------------------------

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (amount <= 0 || amount > balance) {
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/account/transfer`,
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        await fetchUser(); // Update balance in parent state
        navigate("/paymentPage?amount=" + amount + "&name=" + recipientName);
      }
    } catch (err) {
      console.error(err);
      alert("Transfer failed. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500 selection:text-white">
      <Appbar name={name} />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-12">
        {/* Glass Card Container */}
        <div className="relative w-full max-w-md">
          {/* Background Glows */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

          <div className="relative bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate("/send")} // Changed to /send to go back to list
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-400/10 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} /> Secure Transfer
                </span>
              </div>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Recipient Info */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                <span className="text-3xl font-bold text-white">
                  {recipientName[0].toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Sending to {recipientName}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Wallet ID: •••• {id?.slice(-4)}
              </p>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
              <div className="relative">
                <label className="text-xs font-medium text-gray-400 ml-1 uppercase tracking-wider">
                  Amount (INR)
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setIsError(false);
                      setAmount(e.target.value);
                    }}
                    placeholder="0.00"
                    className={`w-full bg-neutral-950 border ${
                      isError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-800 focus:ring-purple-500"
                    } rounded-xl py-4 pl-10 pr-4 text-2xl font-bold text-white placeholder-gray-700 focus:outline-none focus:ring-2 transition-all`}
                  />
                </div>
                {isError && (
                  <p className="text-red-400 text-xs mt-2 ml-1 animate-pulse">
                    Insufficient balance or invalid amount.
                  </p>
                )}
              </div>

              {/* Available Balance Badge */}
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Wallet size={16} />
                  <span>Available Balance</span>
                </div>
                <span className="font-mono font-medium text-white">
                  ₹{Math.floor(balance * 100) / 100}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleTransfer}
                disabled={loading}
                className="w-full mt-4 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    Initiate Transfer <SendIcon size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
