import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { Spinner } from "../components/Loader";

export const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rejected, setRejected] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const HandleSignup = async (e) => {
    if (e) e.preventDefault(); // stops the browser from reloading
    setLoading(true);
    //produciton url
    const url = "https://zapwallet.onrender.com/user/signin";
    //dev url
    // const url = "http://localhost:3000/user/signin";

    try {
      const response = await axios.post(url, {
        username,
        firstName,
        lastName,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);

        await props.fetchUser();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);
      setRejected(true);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-950 text-black ">
        <div className="text-xl font-semibold mb-4">
          Please wait, loading...
        </div>
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center h-full ml-1 w-21">
        <button
          className="cursor-pointer justify-center"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src="/logo.png" alt="" />{" "}
        </button>
      </div>
      <div className="bg-slate-200 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
                setRejected(false);
              }}
              placeholder="Prince"
              label={"First Name"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  HandleSignup(e);
                }
              }}
            />
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
                setRejected(false);
              }}
              placeholder="Lohia"
              label={"Last Name"}
            />
            <InputBox
              onChange={(e) => {
                setUsername(e.target.value);
                setRejected(false);
              }}
              placeholder="prince@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
                setRejected(false);
              }}
              type="password"
              placeholder="123456"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={(e) => {
                  HandleSignup(e);
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
          <div className="flex justify-center">
            {rejected && (
              <div className="text-red-500 text-sm pt-2 text-center w-76">
                Invalid credentials or server is not responding Please try
                again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
