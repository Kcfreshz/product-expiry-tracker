import { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { FaDiceD6 } from "react-icons/fa";

import API from "../api/axiosInstance";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardTransactionOverview from "../components/DashboardTransactionOverview";
import DashboardRecentSalesExpenses from "../components/DashboardRecentSalesExpenses";
import DashboardInventoryOverview from "../components/DashboardInventoryOverview";
// import AreaChartComponent from "../components/RevenueExpenseChart";
// import RevenueExpenseChart from "../components/RevenueExpenseChart";
// import Piechart from "../components/Piechart";
import BarChartComponent from "../components/RevenueExpenseChart";
import TwoLevelPieChart from "../components/Piechart";

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

  // return (
  //   <div className="min-h-screen bg-gray-50 p-6">
  //     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

  //     <div className="grid md:grid-cols-3 gap-6">
  //       <div className="bg-white p-6 rounded-lg shadow text-center">
  //         <h2 className="text-lg font-semibold">Total Stores</h2>
  //         <p className="text-2xl mt-2">{summary.totalStores}</p>
  //       </div>

  //       <div className="bg-white p-6 rounded-lg shadow text-center">
  //         <h2 className="text-lg font-semibold">Total Inventory Value</h2>
  //         <p className="text-2xl mt-2">
  //           ₦
  //           {summary.totalInventoryValue
  //             ? summary.totalInventoryValue.toLocaleString()
  //             : "0"}
  //         </p>
  //       </div>

  //       <div className="bg-white p-6 rounded-lg shadow text-center">
  //         <h2 className="text-lg font-semibold">Total Expenses</h2>
  //         <p className="text-2xl mt-2">
  //           ₦
  //           {summary.totalExpenses
  //             ? summary.totalExpenses.toLocaleString()
  //             : "0"}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="mt-10 text-center">
  //       <Link
  //         to="/stores"
  //         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  //       >
  //         Manage Stores
  //       </Link>
  //     </div>
  //   </div>
  // );
  ////////////////////////////////////////////////////////////////
  return (
    <section>
      <div className="p-6">
        <DashboardHeader />

        {/* Transaction Detail */}
        <DashboardTransactionOverview />
        {/* Transaction Overview */}
        <div className="cover flex flex-col mt-20  gap-4 flex-wrap md:flex-row">
          {/* Recent Sales & Expenses */}
          <DashboardRecentSalesExpenses />

          {/* Inventory Overview */}
          <DashboardInventoryOverview />
        </div>

        <div className="flex flex-col space-y-10  md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 h-[400px] bg-white shadow rounded-lg p-4">
            <BarChartComponent />
          </div>

          <div className="w-full md:w-1/2 h-[400px] bg-white shadow rounded-lg p-4">
            <TwoLevelPieChart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
///////////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import API from "../api/axiosInstance";
// import { FaStore, FaBoxes, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

// const Dashboard = () => {
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const res = await API.get("/api/reports/summary");
//         setSummary(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSummary();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
//       <p className="text-gray-500 mb-8">
//         Welcome back! Here's your business overview.
//       </p>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-gray-500 text-sm font-medium">
//                 Total Stores
//               </h2>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {summary?.stores || 0}
//               </p>
//             </div>
//             <FaStore className="text-blue-500 text-3xl" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-gray-500 text-sm font-medium">
//                 Total Inventory
//               </h2>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {summary?.inventory || 0}
//               </p>
//             </div>
//             <FaBoxes className="text-yellow-500 text-3xl" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-gray-500 text-sm font-medium">
//                 Total Expenses
//               </h2>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 ₦{summary?.expenses?.toLocaleString() || 0}
//               </p>
//             </div>
//             <FaMoneyBillWave className="text-red-500 text-3xl" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-gray-500 text-sm font-medium">Net Profit</h2>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 ₦{summary?.profit?.toLocaleString() || 0}
//               </p>
//             </div>
//             <FaChartLine className="text-green-500 text-3xl" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
