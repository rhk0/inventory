import React, { useState } from "react";

const PointOfSalesReport = () => {
  const [activeReport, setActiveReport] = useState("");

  const handleReportChange = (report) => {
    setActiveReport(report);
  };

  return (
<div className="bg-red-100 p-5 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Point of Sales Report</h2>
      <input type="text" placeholder="Search Invoice No." className="mb-4 p-2 border" />
      <table className="min-w-full table-auto">
        <thead className="bg-red-200">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Invoice No.</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Payment Type</th>
            <th className="px-4 py-2">Total Value</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border px-4 py-2">--</td>
            <td className="border px-4 py-2">--</td>
            <td className="border px-4 py-2">--</td>
            <td className="border px-4 py-2">--</td>
            <td className="border px-4 py-2">--</td>
            <td className="border px-4 py-2">View</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">Total</div>
    </div>
  );
};

export default PointOfSalesReport;

