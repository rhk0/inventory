import React, { useState } from "react";
import { Link } from "react-router-dom";

const StockReports = () => {
  const [activeReport, setActiveReport] = useState("");

  const handleReportChange = (report) => {
    setActiveReport(report);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 responsive-container">
      <h1 className="text-3xl font-bold text-center mb-10">Stock Report </h1>

      {/* Buttons to select report */}
      <div className="flex justify-center shadow-md  space-x-8 p-20 mb-10">
        <Link to="/admin/ProductQtyWise">
          <button
            className={`px-6 py-28 rounded-lg bg-blue-100 hover:bg-blue-500 hover:text-white shadow-md text-2xl font-semibold `}
          >
            Product Qty Wise Report
          </button>
        </Link>
        <Link to="/admin/ProductValueWise">
          <button
            className={`px-6 py-28 rounded-lg shadow-md text-2xl font-semibold ${
              activeReport === "value"
                ? "bg-pink-500 text-white"
                : "bg-pink-100"
            }`}
            onClick={() => handleReportChange("value")}
          >
            Product Value Wise Report
          </button>
        </Link>
        <Link to="/admin/ManufacturerW">
          <button className="px-6 py-28 rounded-lg bg-green-100 hover:bg-green-500 hover:text-white shadow-md text-2xl font-semibold">
            Manufacturer Wise Report
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StockReports;
