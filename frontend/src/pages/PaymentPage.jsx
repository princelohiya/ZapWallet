import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Axios } from "axios";
import { Users } from "../components/Users";
import { Appbar } from "../components/Appbar";

export const PaymentPage = (props) => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");

  return (
    <div>
      <Appbar name={props.name}></Appbar>
      <div className="flex justify-center h-screen pt-7 bg-gray-100">
        <div className="h-full flex flex-col justify-center ">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Payment Status</h2>
            </div>
            <div className=" flex justify-center ">
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

              {/* <svg width="320" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#dc3545" stroke-width="2" fill="none"/>
                        <path d="M8 8l8 8M16 8l-8 8" stroke="#dc3545" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                       */}
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <h3 className=" text-2xl font-bold pb-0 p-10">
                  Payment Successful
                </h3>
                <div className=" flex flex-col justify-center h-ful pl-5">
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
                <p className="text-sm pl-2">
                  Your payment has been successfully processed. It might take
                  few minutes to reflect changes
                </p>
              </div>
            </div>
            {/* <Users /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
