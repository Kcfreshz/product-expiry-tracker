import { useContext } from "react";
// import axios from "axios";
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
import Stores from "./pages/Stores";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import { AuthContext } from "./context/AuthContext";
import API from "./api/axiosInstance";

// axios.defaults.withCredentials = true;

function App() {
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get("/api/auth/userInfo");
  //       setUser(res.data);
  //     } catch (err) {
  //       console.error(err);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const { user, setUser, loading, error } = useContext(AuthContext);

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
        <Route
          path="/inventory/:storeId"
          element={user ? <Inventory /> : <Navigate to="login" />}
        />
        <Route
          path="/expenses/:storeId"
          element={user ? <Expenses /> : <Navigate to="login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
