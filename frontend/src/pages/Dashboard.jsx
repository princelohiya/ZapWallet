import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Transactions } from "./Transactions"; // Assuming this displays a list
import { ArrowRight, Activity, Users as UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ name, balance }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full h-full bg-neutral-950 text-gray-200 selection:bg-purple-500 selection:text-white pb-20">
      {/* 1. Sticky Navbar with Blur Effect */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* 2. Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back,{" "}
            <span className="text-purple-400 capitalize">
              {name?.split(" ")[0]}
            </span>
          </h1>
          <p className="text-gray-500 mt-1">
            Here is your financial overview for today.
          </p>
        </div>

        {/* 3. The Balance Card (Hero Section) */}
        <div className="mb-12">
          <Balance value={balance} />
        </div>

        {/* 4. The Main Grid (Users & Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COL: Quick Transfer (Users) */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <UsersIcon className="w-5 h-5 text-blue-400" />
                <h2>Quick Transfer</h2>
              </div>
            </div>

            {/* Glass Container for Users */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:border-white/10 transition-colors shadow-xl">
              {/* Passing a prop to Users if you want to limit items or style it differently */}
              <Users />
            </div>
          </div>

          {/* RIGHT COL: Recent Transactions */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Activity className="w-5 h-5 text-green-400" />
                <h2>Recent Activity</h2>
              </div>
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Glass Container for Transactions */}
            <div className="bg-neutral-950 border-2 border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:border-white/10 transition-colors shadow-2xl min-h-[300px]">
              {/* Note: Since your Transactions component is a full page, 
                  you might want to create a smaller <TransactionList /> component later.
                  For now, we render it here, but ensure it handles being in a container.
                */}
              <Transactions limit={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
