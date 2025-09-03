import { useNavigate } from "react-router-dom";
import { nativeEnum } from "zod";
import { Users } from "./Users";

export const Appbar = (props) => {
  const name = props.name;
  const navigate = useNavigate();
  return (
    <div className="shadow border-b border-slate-300 h-15  flex justify-between ">
      <div className="flex flex-col justify-center h-full ml-1 w-26">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src="/logo.png" alt="" />{" "}
        </button>
      </div>

      <div className="flex">
        <div className="flex pr-8 space-x-8  ">
          <div className="hidden md:flex flex-col justify-center text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Home
            </button>
          </div>

          <div className="flex flex-col justify-center text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/Userspage");
              }}
            >
              Send money
            </button>
          </div>

          <div className="hidden sm:flex flex-col justify-center text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/Transactions");
              }}
            >
              Transactions
            </button>
          </div>

          <div className="hidden md:flex flex-col justify-center  text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/Aboutus");
              }}
            >
              About us
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center h-full mr-4 text text-slate-600">
          {name}
          <div className="flex justify-end text-xs ">
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                localStorage.setItem("token", "");
                navigate("/signin");
              }}
            >
              logout
            </button>
          </div>
        </div>
        <div className="hidden sm:flex flex justify-center rounded-full h-12 w-12 bg-slate-200  mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-orange-500">
            {name[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
