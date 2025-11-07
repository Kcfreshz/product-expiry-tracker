import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// import axios from "axios";
import API from "../api/axiosInstance";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("api/auth/userInfo");
        console.log(`User Info`, res.data);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null);
        setError(err.message);
      } finally {
        setLoading(false);
        setError("");
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await API.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
