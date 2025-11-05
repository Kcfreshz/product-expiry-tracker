import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";
import Stores from "../../../expense-expiry-tracker/frontend/src/pages/stores";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/userInfo");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/stores"
          element={user ? <Stores /> : <Navigate to="/login" />}
        />
        <Route path="/inventory/:storeId" element={<Inventory />} />
        <Route path="/expenses/:storeId" element={<Expenses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
