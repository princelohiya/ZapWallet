import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";
import { Spinner } from "../components/Loader";

export const Signin = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rejected, setRejected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault(); // stops the browser from reloading
    setLoading(true);
    //produciton url
    const url = "https://zapwallet.onrender.com/user/signin";
    //dev url
    // const url = "http://localhost:3000/user/signin";

    try {
      const response = await axios.post(url, { username, password });

      localStorage.setItem("token", `Bearer ${response.data.token}`);

      // Don't block UI — load user after redirect
      if (props.fetchUser) {
        props
          .fetchUser()
          .catch((err) => console.log("Fetch user failed:", err));
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setRejected(true);
    } finally {
      setLoading(false);
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
      <div className="flex flex-col justify-center h-full ml-1 w-26">
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
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              placeholder="harkirat@gmail.com"
              label={"Email"}
              onChange={(e) => {
                setUsername(e.target.value);
                setRejected(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignIn(e);
                }
              }}
            />
            <InputBox
              placeholder="123456"
              label={"Password"}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setRejected(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignIn(e);
                }
              }}
            />
            <div className="pt-4">
              <Button
                label={"Sign in"}
                onClick={(e) => {
                  handleSignIn(e);
                }}
              />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
          <div className="flex justify-center ">
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
