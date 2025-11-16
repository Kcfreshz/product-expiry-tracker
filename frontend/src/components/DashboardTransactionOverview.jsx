import React from "react";

const transactionsList = [
  {
    title: "Total Revenue",
    amt: "$10,000",
    percentage: "+5.2%",
    symbol: "$",
  },
  {
    title: "Total Revenue",
    amt: "$10,000",
    percentage: "+1.8%",
    symbol: "$",
  },
  {
    title: "Total Revenue",
    amt: "$10,000",
    percentage: "-0.5%",
    symbol: "$",
  },
  {
    title: "Total Revenue",
    amt: "$10,000",
    percentage: "None",
    symbol: "$",
  },
];

const DashboardTransactionOverview = () => {
  return (
    <div>
      <div className="mt-10">
        <h2 className=" text-2xl font-bold">Key Business Metrics</h2>
        <div className="flex justify-between flex-wrap mt-10 gap-4">
          {transactionsList.map((item, index) => (
            <div
              key={index}
              className="w-[25%] min-w-[250px] md:w-[22%] max-w-3xl bg-white p-6 rounded-lg shadow sm:w-full flex-1"
            >
              <h5 className="flex justify-between">
                {item.title} <span>{item.symbol}</span>
              </h5>
              <h3>{item.amt}</h3>
              <p>{item.percentage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTransactionOverview;
