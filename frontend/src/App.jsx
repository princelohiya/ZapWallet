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
import { Users } from "./components/Users";

// npm install jwt-decode
// npm install axios

function App() {
  const [name, setName] = useState("Loading...");
  const [balance, setBalance] = useState("Loading...");

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId; // depends on what you stored in token

      const response = await axios.get(
        "http://localhost:3000/user/me?_id=" + userId
      );

      const user = response.data.user;
      setName(`${user.firstName} ${user.lastName}`);
      setBalance(Math.floor(user.balance * 100) / 100);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setName("Unknown User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
            element={<Dashboard name={name} balance={balance} />}
          ></Route>
          <Route
            path="/send"
            element={
              <Send
                name={name}
                balance={balance}
                setBalance={setBalance}
                fetchUser={fetchUser}
              />
            }
          ></Route>
          <Route
            path="/paymentPage"
            element={<PaymentPage name={name} balance={balance} s />}
          ></Route>
          <Route path="/users" element={<Users name={name}></Users>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
