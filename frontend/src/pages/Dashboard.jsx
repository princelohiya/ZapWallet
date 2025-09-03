import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { set } from "mongoose";
import Skeleton from "react-loading-skeleton";
import { Spinner } from "../components/Loader";

export const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>
    );
  }
  return (
    <div>
      <Appbar name={props.name} />
      <div className="m-8">
        <Balance value={props.balance} />
        <Users />
      </div>
    </div>
  );
};
