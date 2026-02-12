import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Loader";
import { API_BASE_URL } from "../config/api";
import { ArrowLeft } from "lucide-react"; // Optional: for a back button feel

export const Signin = ({ fetchUser }) => {
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
  }, [navigate]);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setRejected(false);

    const url = `${API_BASE_URL}/user/signin`;

    try {
      const response = await axios.post(url, { username, password });

      localStorage.setItem("token", `Bearer ${response.data.token}`);

      if (fetchUser) {
        fetchUser().catch((err) => console.log("Fetch user failed:", err));
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setRejected(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn(e);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-purple-400">
        <Spinner />
        <div className="text-xl font-semibold mt-4 text-white">
          Authenticating...
        </div>
      </div>
    );
  }

  return (
    // Main Container matches Dashboard: neutral-950 background + purple selection
    <div className="min-h-screen flex flex-col bg-neutral-950 text-gray-200 selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Optional: Background Ambient Glow (matches Dashboard vibe) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* 1. TOP HEADER (Dark, Glassy, Minimal) */}
      <div className="z-10 w-full border-b border-white/5 bg-neutral-900/50 backdrop-blur-md h-16 flex items-center px-6 lg:px-10 justify-between sticky top-0">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-7 transition-opacity hover:opacity-80"
        >
          <img
            src="/logo.png"
            alt="ZapWallet"
            className="h-16 w-auto object-contain"
          />
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Glass Card) */}
      <div className="flex-1 flex justify-center items-center p-4 z-10">
        <div className="flex flex-col justify-center w-full max-w-md">
          {/* Glass Container matching 'Users' component in Dashboard */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all duration-300">
            <div className="text-center mb-6">
              {/* Force Heading/Subheading to white/gray if components don't support dark mode natively */}
              <div className="text-white text-3xl font-bold mb-2">Sign in</div>
              <div className="text-gray-400 text-base">
                Enter your credentials to access your account
              </div>
            </div>

            <div className="space-y-4">
              <InputBox
                placeholder="princelohia@gmail.com"
                label={"Email"}
                // Passing a class to ensure label is visible in dark mode
                className="text-white"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setRejected(false);
                }}
                onKeyDown={handleKeyDown}
              />

              <InputBox
                placeholder="123456"
                label={"Password"}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setRejected(false);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="pt-6">
              {/* You might need to style your Button component to be purple to match the dashboard theme */}
              <div className="w-full">
                <Button label={"Sign in"} onClick={handleSignIn} />
              </div>
            </div>

            <div className="mt-4 text-center">
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign up"}
                to={"/signup"}
              />
            </div>
          </div>

          {/* Error Message Area */}
          <div className="h-6 mt-4 flex justify-center">
            {rejected && (
              <div className="text-red-400 text-sm font-medium bg-red-900/20 border border-red-500/20 py-1.5 px-4 rounded-full animate-pulse">
                Invalid credentials. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
