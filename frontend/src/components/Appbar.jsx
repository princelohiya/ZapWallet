import { useNavigate } from "react-router-dom";
import { nativeEnum } from "zod";
import { Users } from "./Users";
import { useState } from "react";
import { Menu } from "lucide-react"; // hamburger icon
import { X } from "lucide-react"; // close icon

export const Appbar = (props) => {
  const name = props.name;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };

  return (
    <div className="border-slate-300 h-15  flex justify-between ">
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

          <div className="hidden md:flex flex-col justify-center text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/Userspage");
              }}
            >
              Send money
            </button>
          </div>

          <div className="hidden md:flex flex-col justify-center text-slate-600 text-lg font-semibold">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/Transactions");
              }}
            >
              Transactions
            </button>
          </div>

          <div className="hidden md:flex flex-col justify-center text-slate-600 text-lg font-semibold">
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
            <button className="hover:cursor-pointer" onClick={logout}>
              logout
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center rounded-full h-12 w-12 bg-slate-200  mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-orange-500">
            {name[0].toUpperCase()}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Sidebar Drawer */}
        <div
          className={`md:hidden fixed top-0 right-0 w-4/7 h-full bg-gray-100 border-white border rounded-l-2xl shadow-2xl z-50 flex flex-col p-4 space-y-6 transform transition-transform duration-400 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="self-end" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
          <button
            className="text-lg font-semibold"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </button>
          <button
            className="text-lg font-semibold"
            onClick={() => navigate("/Userspage")}
          >
            Send money
          </button>
          <button
            className="text-lg font-semibold"
            onClick={() => navigate("/Transactions")}
          >
            Transactions
          </button>
          <button
            className="text-lg font-semibold"
            onClick={() => navigate("/Aboutus")}
          >
            About us
          </button>
          <button
            onClick={logout}
            className="text-red-500 mt-auto text-lg font-semibold "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
