/*
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          Product-Expiry Tracker
        </Link>
        <div>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded cursor-pointer"
              >
                Logout
              </button>
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">
                Login
              </Link>
              <Link to="/register" className="mx-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
*/

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* App Name / Logo */}
      <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
        Expense & Inventory Tracker
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/stores" className="text-gray-700 hover:text-blue-600">
              Stores
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
