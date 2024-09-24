import React, { useState } from "react";

const ManuFactureWiseReport = () => {
  const [activeReport, setActiveReport] = useState("");

  const handleReportChange = (report) => {
    setActiveReport(report);
  };

  return (
    <div className=" p-5 rounded-lg responsive-container">
      <h2 className="text-xl font-semibold mb-4">
        Manufacturer Wise Sales Report
      </h2>
      <div class=" p-1 rounded-lg  flex gap-3">
        <div class="mb-4 w-1/4">
          <label
            htmlFor="startdate"
            class="block text-sm font-medium text-gray-600"
          >
            From
          </label>
          <input
            id="startdate"
            type="date"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="mb-4 w-1/4">
          <label
            htmlFor="enddate"
            class="block text-sm font-medium text-gray-600"
          >
            To
          </label>
          <input
            id="enddate"
            type="date"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="mt-5 w-1/4">
          <select className=" block w-full border p-3 border-gray-300 rounded-md shadow-sm  focus:ring focus:ring-blue-200 focus:outline-none">
            <option value="Select Customer" className="">
              Select Manufacture
            </option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto">
        <thead className="bg-green-200">
          <tr>
            <th>#</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Invoice No.</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Place of Supply</th>
            <th className="px-4 py-2">Brand Name</th>
            <th className="px-4 py-2">Total Value</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>1</td>
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

export default ManuFactureWiseReport;
