import React from "react";

const InventoryHeader = () => {
  return (
    <header className="p-5 flex flex-col justify-center mt-10">
      <h1 className="text-4xl font-bold mb-6">Inventory Overview</h1>
      <p className="text-sm text-gray-600">
        Manage your product, stock, track quantities, and monitor item statuses.
      </p>
    </header>
  );
};

export default InventoryHeader;
