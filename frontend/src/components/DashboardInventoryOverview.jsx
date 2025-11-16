import React from "react";
import { MdOutlineDangerous } from "react-icons/md";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const DashboardInventoryOverview = () => {
  return (
    <div className="flex-1 bg-white rounded-lg  mb-10 p-10">
      <div className="flex justify-between mb-5 px-6">
        <h3 className="text-xl font-semibold">Inventory Overview</h3>
        <select name="month" id="month">
          <option value="">Month</option>
          <option value="january">January</option>
          <option value="february">February</option>
        </select>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <p className="text-gray-600">Total Items in Stock</p>
        <h4 className="font-medium">1,560</h4>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <p className="text-gray-600">Low Stock Items</p>
        <h4 className="font-medium">35</h4>
      </div>

      <div className="flex justify-between mt-5 p-6 bg-white rounded-lg shadow">
        <p className="text-gray-600">Out of Stock</p>
        <h4 className="font-medium text-red-600">8</h4>
      </div>

      <div className="mt-10 space-y-4 text-gray-600">
        <div className="flex items-center gap-2 ">
          <HiOutlineExclamationTriangle />
          <p>Action needed on 35 low stock items.</p>
        </div>
        <div className="flex items-center gap-2 ">
          <MdOutlineDangerous style={{ color: "red" }} />
          <p>8 items are currently unavailable for sale.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardInventoryOverview;
