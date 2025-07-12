import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import Skeleton from "react-loading-skeleton";
import { Loader } from "../components/LoaderComponent";

export const Dashboard = (props) => {
  return (
    <div>
      <Appbar name={props.name} />
      <div className="m-8">
        <Skeleton count={1} width={200} height={40} className="mb-4" />
        <Balance value={props.balance} />
        <Users />
      </div>
    </div>
  );
};
