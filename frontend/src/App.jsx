import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send";
import { PaymentPage } from "./pages/PaymentPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import { Userspage } from "./pages/Userspage";
import { Aboutus } from "./pages/Aboutus";
import { Spinner } from "./components/Loader";
import { Transactions } from "./pages/Transactions";

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
      }, 500); // 0.5 second delay
      return () => clearTimeout(timer);
    }
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId; // depends on what you stored in token

      const response = await axios.get(
        "http://localhost:3000/user/me?_id=" + userId
      );

      const user = response.data.user;
      setName(`${user.firstName} ${user.lastName}`);
      setBalance(Math.floor(user.balance * 100) / 100);

      // adding artificial delay
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setName("Unknown User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route
            path="/signup"
            element={<Signup fetchUser={fetchUser} />}
          ></Route>

          <Route
            path="/signin"
            element={<Signin fetchUser={fetchUser} />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard name={name} balance={balance} />
              </ProtectedRoute>
            }
          ></Route>
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
          ></Route>
          <Route
            path="/paymentPage"
            element={<PaymentPage name={name} balance={balance} />}
          ></Route>
          <Route
            path="/userspage"
            element={<Userspage name={name}></Userspage>}
          ></Route>
          <Route
            path="/Aboutus"
            element={<Aboutus name={name}></Aboutus>}
          ></Route>
          <Route
            path="/Transactions"
            element={
              <Transactions name={name} balance={balance}></Transactions>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
