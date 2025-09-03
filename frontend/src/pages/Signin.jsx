import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";

export const Signin = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault(); // stops the browser from reloading

    const response = await axios
      .post("http://localhost:3000/user/signin", {
        username: username,
        password: password,
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setRejected(true);
      });
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    await props.fetchUser();
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
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
        <div className="flex justify-center">
          {rejected && (
            <div className="text-red-500 text-sm pt-2">
              Invalid credentials. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
