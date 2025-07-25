import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Appbar } from "../components/Appbar";

export const Send = (props) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <Appbar name={props.name}></Appbar>
      <div className="flex justify-center min-h-screen pt-7 bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min rounded-lg text-card-foreground max-w-md p-4 space-y-2 w-96 bg-white shadow-lg has-focus-visible:border-orange-400 ">
            <button
              className="flex justify-center h-36 pt-3 w-full cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <img src="/logo.png" alt="" />{" "}
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
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <button
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-orange-500 text-white"
                  onClick={async () => {
                    const response = await axios.post(
                      "http://localhost:3000/account/transfer",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          token: "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    if (response.status === 200) {
                      // re-fetch balance
                      // props.setBalance((prev) => prev - amount);
                      await props.fetchUser();
                      navigate(
                        "/paymentPage?amount=" + amount + "&name=" + name
                      );
                    } else {
                      alert("Transfer failed");
                    }
                  }}
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
