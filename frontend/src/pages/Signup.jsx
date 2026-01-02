import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Spinner } from "../components/Loader"; // Optional: Use inside button if Button component supports it
import { API_BASE_URL } from "../config/api";

export const Signup = (props) => {
  // Consolidated state for cleaner management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // String state for specific error messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Generic handler for input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.password
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!formData.username.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const HandleSignup = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const url = `${API_BASE_URL}/user/signup`;

    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        if (props.fetchUser) {
          await props.fetchUser();
        }
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      // Capture specific message from backend if available, else default
      const serverError =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-gray-200 selection:bg-purple-500 selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      </div>

      {/* 1. TOP HEADER */}
      <div className="z-10 w-full border-b border-white/5 bg-neutral-900/50 backdrop-blur-md h-16 flex items-center px-6 lg:px-10 justify-between sticky top-0">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src="/logo.png"
            alt="ZapWallet"
            className="h-18 w-auto object-contain" // Adjusted size for better header fit
          />
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex justify-center items-center p-4 z-10">
        <div className="flex flex-col justify-center w-full max-w-md">
          {/* Glass Container */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 relative">
            {/* Loading Overlay (Optional: creates a disabled look when submitting) */}
            {loading && (
              <div className="absolute inset-0 bg-neutral-950/50 z-20 rounded-3xl cursor-wait"></div>
            )}

            <div className="text-center mb-6">
              <div className="text-white text-3xl font-bold mb-2">Sign up</div>
              <div className="text-gray-400 text-base">
                Create your ZapWallet account
              </div>
            </div>

            <form onSubmit={HandleSignup} className="space-y-4">
              <div className="flex gap-2">
                <div className="w-1/2">
                  {/* Assuming InputBox accepts props normally. Added autoComplete/required */}
                  <InputBox
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Prince"
                    label="First Name"
                    className="text-"
                    disabled={loading}
                  />
                </div>
                <div className="w-1/2">
                  <InputBox
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Lohia"
                    label="Last Name"
                    className="text-white"
                    disabled={loading}
                  />
                </div>
              </div>

              <InputBox
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="prince@gmail.com"
                label="Email"
                type="email"
                className="text-white"
                autoComplete="email"
                disabled={loading}
              />

              <InputBox
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                placeholder="••••••"
                label="Password"
                className="text-white"
                autoComplete="new-password"
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") HandleSignup(e);
                }}
              />

              <div className="pt-4">
                <div className="w-full relative">
                  <Button
                    onClick={HandleSignup}
                    label={loading ? "Creating Account..." : "Sign up"}
                    disabled={loading}
                  />
                </div>
              </div>
            </form>

            <div className="mt-4 text-center">
              <BottomWarning
                label="Already have an account?"
                buttonText="Sign in"
                to="/signin"
              />
            </div>

            {/* Error Message Area - Fixed height to prevent layout shift */}
            <div className="h-6 mt-4 flex justify-center items-center">
              {error && (
                <div className="text-red-400 text-sm font-medium bg-red-900/20 border border-red-500/20 py-1 px-3 rounded-full animate-fadeIn">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
