import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send";
import { PaymentPage } from "./pages/PaymentPage";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import { Userspage } from "./pages/Userspage";
import { Aboutus } from "./pages/Aboutus";
import { Spinner } from "./components/Loader";
import { Transactions } from "./pages/Transactions";
import { API_BASE_URL } from "./config/api";
import Layout from "./Layout"; // Only Layout is needed, not Appbar
import { AddMoney } from "./pages/Addmoney";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import ScrollToTop from "./components/ScrollToTop";

const Placeholder = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-center p-6">
    <h1 className="text-4xl font-bold text-brand-blue mb-4">{title}</h1>
    <p className="text-gray-600">This page is under construction.</p>
    <Link to="/" className="mt-6 text-brand-accent hover:underline font-bold">
      Back to Home
    </Link>
  </div>
);

function App() {
  const [name, setName] = useState("Loading...");
  const [balance, setBalance] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setName("Unknown User");
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    const url = API_BASE_URL + "/user/me?_id=";

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const response = await axios.get(url + userId);

      const user = response.data.user;
      setName(`${user.firstName} ${user.lastName}`);
      setBalance(Math.floor(user.balance * 100) / 100);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setName("Unknown User");
      setLoading(false); // Ensure loading stops even on error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full animate-ping"></div>
          <Spinner />
        </div>
        <div className="mt-6 text-lg font-medium text-gray-400 animate-pulse">
          Securely loading your wallet...
        </div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* --- PUBLIC ROUTES (No Navbar) --- */}
          <Route path="/" element={<Signin fetchUser={fetchUser} />} />
          <Route path="/signin" element={<Signin fetchUser={fetchUser} />} />
          <Route path="/signup" element={<Signup fetchUser={fetchUser} />} />

          {/* --- PROTECTED / APP ROUTES (With Navbar) --- */}
          {/* We pass 'name' to Layout so it can pass it to the Appbar */}
          <Route element={<Layout name={name} />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard name={name} balance={balance} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/send"
              element={
                <ProtectedRoute>
                  <Send
                    name={name}
                    balance={balance}
                    setBalance={setBalance}
                    fetchUser={fetchUser}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/paymentPage"
              element={<PaymentPage name={name} balance={balance} />}
            />

            <Route path="/userspage" element={<Userspage name={name} />} />

            <Route path="/Aboutus" element={<Aboutus name={name} />} />

            <Route
              path="/Transactions"
              element={<Transactions name={name} balance={balance} />}
            />
            <Route path="payment-success" element={<PaymentSuccess />} />
          </Route>
          <Route path="/addmoney" element={<AddMoney />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
