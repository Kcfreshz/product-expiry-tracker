import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const InventorySearch = () => {
  return (
    <div className="flex  flex-wrap  md:justify-between md:px-20">
      {/* Search Filter */}
      <div className="flex  ">
        <div className="flex gap-2 items-center">
          <MdOutlineFilterList />
          <input
            type="text"
            placeholder="Filter by Category"
            className="w-full"
          />
        </div>

        <div className="flex gap-2 items-center">
          <MdOutlineFilterList />
          <input type="text" placeholder="Filter by Status" />
        </div>

        <div className="flex gap-2 items-center">
          <CiSearch />
          <input type="text" placeholder="Search Item name or ID" />
        </div>
      </div>

      {/* Export & Add */}

      <div className="flex ml-auto gap-5 p-5s">
        <button className="flex gap-2 items-center">
          <LuUpload />
          <h5>Export Data</h5>
        </button>

        <button className="flex gap-2 items-center">
          <GoPlus />
          <h5>Add New Item</h5>
        </button>
      </div>
    </div>
  );
};

export default InventorySearch;
