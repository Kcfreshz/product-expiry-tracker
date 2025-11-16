import React from "react";
import { BsCart2 } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { FaDiceD6 } from "react-icons/fa";

const DashboardRecentSalesExpenses = () => {
  return (
    <div className="mb-10 p-10 flex-1 bg-white rounded-lg ">
      <div className="flex justify-between px-6 flex-wrap">
        <h3 className="text-xl font-semibold">Recent Sales & Expenses</h3>
        <button className="text-blue-500">View All Transactions</button>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <div className="flex gap-2 items-center">
          <BsCart2 />
          <h4 className="font-medium">Online Store Sale</h4>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-medium">+$250.00</h4>
          <button className="bg-gray-200 px-2 rounded-full font-medium">
            Paid
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <div className="flex gap-2 items-center">
          <CiCreditCard1 />
          <h4 className="font-medium">Software Subscription</h4>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-medium">-$99.99</h4>
          <button className="bg-gray-200 px-2 rounded-full font-medium">
            Pending
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <div className="flex gap-2 items-center">
          <BsCart2 />
          <h4 className="font-medium">Consulting Service</h4>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-medium">+$750.00</h4>
          <button className="bg-gray-200 px-2 rounded-full font-medium">
            Paid
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <div className="flex gap-2 items-center">
          <FaDiceD6 />
          <h4 className="font-medium">Office Supply</h4>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-medium">+$45.50</h4>
          <button className="bg-gray-200 px-2 rounded-full font-medium">
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentSalesExpenses;
