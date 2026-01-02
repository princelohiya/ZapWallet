import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";
import { Check, Home, Download, Share2 } from "lucide-react";

export const PaymentPage = ({ name, balance }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const amount = searchParams.get("amount");
  const recipientName = searchParams.get("name");

  const [loading, setLoading] = useState(true);

  // Generate a random Transaction ID for realism
  const [txId] = useState(`TXN${Math.floor(Math.random() * 1000000000)}`);

  useEffect(() => {
    // Increased delay slightly to 1.5s to let the user feel "processing" is happening securely
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full animate-ping"></div>
          <Spinner />
        </div>
        <div className="text-xl font-bold animate-pulse">
          Processing Payment...
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Securely transferring funds
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-green-500 selection:text-white">
      <Appbar name={name} />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8">
        {/* Main Card */}
        <div className="relative w-full max-w-md">
          {/* Success Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* 1. Success Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500 blur-md opacity-40 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Check className="w-10 h-10 text-white stroke-[3px]" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white text-center">
                Payment Successful!
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Transaction ID: {txId}
              </p>
            </div>

            {/* 2. Receipt Ticket */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8 relative overflow-hidden">
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">Amount Paid</span>
                  <span className="text-3xl font-bold text-white tracking-tight">
                    ₹{amount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Paid to</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/30">
                      {recipientName?.[0]}
                    </div>
                    <span className="font-medium text-white">
                      {recipientName}
                    </span>
                  </div>
                </div>

                {/* Dashed Divider */}
                <div className="border-t border-dashed border-white/10 my-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Updated Balance</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    ₹{Math.floor(balance * 100) / 100}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Home size={18} /> Back to Dashboard
              </button>

              {/* Optional Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white transition-all text-sm font-medium">
                  <Download size={16} /> Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white transition-all text-sm font-medium">
                  <Share2 size={16} /> Share Receipt
                </button>
              </div>
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
              A confirmation email has been sent to your registered address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
