import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Axios } from "axios";
import { Users } from "../components/Users";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";

export const PaymentPage = (props) => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-950 text-black">
        <div className="text-xl font-semibold mb-4">
          Processing Transactions.....
        </div>
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar name={props.name}></Appbar>
      <div className="flex justify-center h-screen pt-1 bg-gray-100">
        <div className="h-full flex flex-col justify-center ">
          <div className="border-4 border-gray-200 h-min text-card-foreground max-w-md p-4 space-y-8 bg-white shadow-lg rounded-lg w-88 sm:w-128">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Payment Status</h2>
            </div>
            <div className=" flex justify-center">
              <svg
                width="320"
                height="110"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#28a745"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M7 12l3 3 7-7"
                  stroke="#28a745"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <h3 className=" text-2xl font-bold text-center ">
                  Payment Successful
                </h3>
                <div className=" flex flex-col justify-center ">
                  <h6 className="  font-semibold pl-10">
                    {" "}
                    Amount Paid : Rs. {amount}{" "}
                  </h6>
                  <h6 className="  font-semibold pl-10"> Paid To : {name} </h6>
                  <h6 className="  font-semibold pl-10">
                    {" "}
                    Balance : {props.balance}{" "}
                  </h6>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm pl-2">
                    Your payment has been successfully processed. It might take
                    few minutes to reflect changes
                  </p>
                </div>
              </div>
            </div>
            {/* <Users /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
