import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const InventorySearch = () => {
  return (
    <div className="flex  flex-wrap  md:justify-between md:px-20s">
      {/* Search Filter */}
      <div className="flex">
        <label className="flex items-center bg-amber-200 w-[180px] h-6 p-2">
          <MdOutlineFilterList />
          <input
            type="text"
            placeholder="Filter by Category"
            className="w-full"
          />
        </label>

        <div className="flex gap-2 items-center bg-red-400 w-[180px] h-6 p-2">
          <MdOutlineFilterList />
          <input type="text" placeholder="Filter by Status" />
        </div>

        <div className="flex gap-2 items-center bg-amber-800 w-[180px] h-6">
          <CiSearch />
          <input type="text" placeholder="Search Item name or ID" />
        </div>
      </div>

      {/* Export & Add */}

      <div className="flex ml-auto gap-5 p-5">
        <button className="flex gap-2 items-center border border-gray-300 px-2 py-2 rounded-md">
          <LuUpload />
          <h5>Export Data</h5>
        </button>

        <button className="flex gap-2 items-center text-white bg-blue-600 px-2 py-2 rounded-md">
          <GoPlus />
          <h5>Add New Item</h5>
        </button>
      </div>
    </div>
  );
};

export default InventorySearch;
