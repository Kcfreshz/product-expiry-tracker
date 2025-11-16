import React from "react";

const DashboardHeader = () => {
  return (
    <header className="p-10   flex flex-col justify-center bg-slate-200 rounded-2xl mt-10">
      <h1 className="text-4xl font-bold mb-6 pl-10">Welcome back, John Doe!</h1>
      <p className="text-sm text-gray-600 pl-10">
        Here's a quick overview of your business performance for the month. Keep
        an eye on key metrics!
      </p>
    </header>
  );
};

export default DashboardHeader;
