import React, { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";
import { API_BASE_URL } from "../config/api";
import { ArrowUpRight, ArrowDownLeft, Calendar, Clock } from "lucide-react";

export const Transactions = ({ name, limit, forDashboard }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = API_BASE_URL + "/account/transactions";

  useEffect(() => {
    // Scroll to top immediately when this component loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        // If a limit is set (e.g. on Dashboard), slice the array
        const data = response.data.transactions;
        setTransactions(limit ? data.slice(0, limit) : data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions", err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [limit]);

  // If used as a full page, wrap in the dark page layout
  // If used as a component (Dashboard), just return the list
  const Content = () => (
    <div
      className={`w-full ${!forDashboard ? "max-w-4xl mx-auto px-4 py-8" : ""}`}
    >
      {!forDashboard && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Transaction History
          </h1>
          <p className="text-gray-400">
            See your incoming and outgoing payments.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-neutral-900/30 rounded-2xl border border-white/5">
              No transactions yet
            </div>
          ) : (
            transactions.map((t, index) => (
              <TransactionItem key={index} transaction={t} />
            ))
          )}
        </div>
      )}
    </div>
  );

  if (forDashboard) {
    return <Content />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200">
      {/* <Appbar name={name} /> */}
      <Content />
    </div>
  );
};

const TransactionItem = ({ transaction }) => {
  const isCredit = transaction.type === "credit";
  const dateObj = new Date(transaction.date);

  // Format Date: "Oct 24"
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  // Format Time: "10:30 AM"
  const timeStr = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl bg-neutral-900/40 border border-white/5 hover:bg-neutral-800/60 hover:border-white/10 transition-all">
      {/* Left: Icon & Name */}
      <div className="flex items-center gap-4">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center border ${
            isCredit
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}
        >
          {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-white">
            {isCredit ? "Received from" : "Sent to"} {transaction.name}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <span className="flex items-center gap-1">
              <Calendar size={10} /> {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={10} /> {timeStr}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Amount */}
      <div
        className={`text-right font-mono font-bold text-lg ${
          isCredit ? "text-emerald-400" : "text-white"
        }`}
      >
        {isCredit ? "+" : "-"}
        <span className="ml-1">
          ₹{Math.floor(transaction.amount * 100) / 100}
        </span>
      </div>
    </div>
  );
};
