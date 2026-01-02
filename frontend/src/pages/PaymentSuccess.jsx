import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { CheckCircle, ArrowRight } from "lucide-react";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the amount passed from the previous page (fallback to 0 if accessed directly)
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-gray-200 relative overflow-hidden">
      {/* Background Glows (Green for success) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="z-10 bg-neutral-900/60 border border-white/5 rounded-3xl p-10 backdrop-blur-xl shadow-2xl text-center max-w-sm w-full mx-4 transform transition-all animate-fade-in-up">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce-short">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Payment Successful
        </h2>
        <p className="text-gray-400 mb-6">Your wallet has been topped up.</p>

        {/* Amount Card */}
        <div className="bg-black/30 rounded-xl p-4 mb-8 border border-white/5">
          <div className="text-sm text-gray-500 mb-1">Amount Added</div>
          <div className="text-3xl font-mono text-green-400 font-semibold">
            ₹{amount}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate("/dashboard")}
            label={"Go to Dashboard"}
          />

          <button
            onClick={() => navigate("/add-money")}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            Add More Money <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
