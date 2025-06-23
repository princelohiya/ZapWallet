import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";

export const Dashboard = (props) => {

  return (
    <div>
      <Appbar name = {props.name}  />
      <div className="m-8">
        <Balance value={props.balance} />
        <Users />
      </div>
    </div>
  );
};
