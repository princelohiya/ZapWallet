import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { Skeleton } from "../components/Skeleton";
import { Spinner } from "../components/Loader";
import { Transactions } from "./Transactions";

export const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Appbar name={props.name} />
      <div className="m-8">
        <Balance value={props.balance} />
        {loading ? (
          <div>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="mt-8 h-full w-full">
              <Users></Users>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
