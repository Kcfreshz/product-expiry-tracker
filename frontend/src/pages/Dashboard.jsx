import { useEffect, useState } from "react";

import API from "../api/axiosInstance";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/api/reports/summary");
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  if (!summary)
    return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Stores</h2>
          <p className="text-2xl mt-2">{summary.totalStores}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Inventory Value</h2>
          <p className="text-2xl mt-2">
            ₦
            {summary.totalInventoryValue
              ? summary.totalInventoryValue.toLocaleString()
              : "0"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-2xl mt-2">
            ₦
            {summary.totalExpenses
              ? summary.totalExpenses.toLocaleString()
              : "0"}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/stores"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Manage Stores
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
