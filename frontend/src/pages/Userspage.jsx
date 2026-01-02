import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";
import { Users } from "../components/Users";
import { Users as UsersIcon } from "lucide-react"; // Optional icon for header

export const Userspage = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500 selection:text-white">
      <div className="flex justify-center pt-10 px-4 pb-20">
        {/* Main Glass Container */}
        <div className="w-full max-w-3xl relative">
          {/* Background Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-64 h-64 bg-purple-900/40 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-6 sm:p-8">
            {/* Header Section */}
            <div className="mb-8 border-b border-white/10 pb-6">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <UsersIcon size={24} />
                </div>
                Send Money
              </h1>
              <p className="text-gray-400 mt-2 ml-1">
                Search for a user below to initiate a transfer.
              </p>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Spinner />
                <span className="text-gray-500 animate-pulse">
                  Loading contacts...
                </span>
              </div>
            ) : (
              <div className="min-h-[400px]">
                {/* We pass specific props if Users component needs them, 
                            otherwise it handles its own fetching as per your previous code */}
                <Users />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
