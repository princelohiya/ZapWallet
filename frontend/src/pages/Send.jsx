import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";

export const Send = (props) => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTransfer = async (e) => {
    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const response = await axios.post(
      "https://zapwallet.onrender.com/account/transfer",
      {
        to: id,
        amount,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      await props.fetchUser();
      navigate("/paymentPage?amount=" + amount + "&name=" + name);
    } else {
      alert("Transfer failed");
    }
  };

  return (
    <div>
      <Appbar name={props.name}></Appbar>
      <div className="flex justify-center min-h-screen pt-7 bg-gray-100 ">
        <div className="h-full flex flex-col justify-center">
          <div className="border-4 border-gray-200 bg-white shadow-lg h-min rounded-lg text-card-foreground max-w-md p-4 space-y-2 w-96 ">
            {/* Card content while loading */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : (
              <>
                <button
                  className="w-full cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <div className="flex justify-center h-36 pt-3 w-full cursor-pointer">
                    <img src="/logo.png" alt="" />
                  </div>
                </button>

                <div className="flex flex-col p-3">
                  <h2 className="text-3xl font-bold text-center pb-4">
                    Send Money
                  </h2>
                  <div className=" flex justify-center text-lg font-medium">
                    Balance : Rs. {Math.floor(props.balance * 100) / 100}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-3 pb-2">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-3xl text-white">
                        {name[0].toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold pb-3">{name}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none"
                        htmlFor="amount"
                      >
                        Amount (in Rs)
                      </label>
                      <input
                        onChange={(e) => {
                          if (e.target.value > props.balance) {
                            alert("Insufficient balance");
                            e.target.value = 0;
                          }
                          setAmount(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTransfer(e);
                          }
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button
                      className="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-orange-500 text-white"
                      onClick={(e) => {
                        handleTransfer(e);
                      }}
                    >
                      Initiate Transfer
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
