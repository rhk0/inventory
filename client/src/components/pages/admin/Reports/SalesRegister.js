import React, { useState } from "react";

const SalesRegister = () => {
  const [activeReport, setActiveReport] = useState("");

  const handleReportChange = (report) => {
    setActiveReport(report);
  };

  return (
<div className="bg-orange-100 p-5 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sales Register</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-orange-200">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Invoice No.</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Place of Supply</th>
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

export default SalesRegister;

