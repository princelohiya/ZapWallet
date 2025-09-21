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
      <div className="px-4 sm:px-8 py-8 max-w-2xl mx-auto">
        <Balance value={props.balance} />

        <div className="flex flex-col gap-8 mt-8">
          <Users />
        </div>
      </div>
    </div>
  );
};
