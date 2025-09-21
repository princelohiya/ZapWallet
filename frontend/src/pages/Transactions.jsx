import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "../components/Loader";

//show transactions list
export const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://zapwallet.onrender.com/account/transactions", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTransactions(response.data.transactions);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {props.forDashboard ? null : <Appbar name={props.name} />}
      <div className="flex flex-col items-center min-h-screen pt-3">
        {props.forDashboard ? null : (
          <div className="font-bold mt-6 text-4xl ">Transactions</div>
        )}
        <div className="flex justify-center pt-7">
          <div className="border-4 border-gray-200 max-w-md p-4 space-y-8 shadow-lg rounded-lg w-88 sm:w-128">
            {loading ? (
              <div className="flex justify-center items-center h-94">
                <Spinner />
              </div>
            ) : (
              <div>
                {transactions.map((transaction) => (
                  <div className="border p-4 rounded-lg shadow-sm mb-4 w-full">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">
                        {transaction.type === "credit"
                          ? "Received from"
                          : "Sent to"}
                        {" " + transaction.name}
                      </div>
                      <div
                        className={`font-bold ${
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₹
                        {Math.floor(transaction.amount * 100) / 100}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Date: {new Date(transaction.date).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
