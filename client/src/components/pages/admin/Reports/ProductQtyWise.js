import React, { useState } from "react";

const ProductQtyWise = () => {
  const [activeReport, setActiveReport] = useState("");

  const handleReportChange = (report) => {
    setActiveReport(report);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 responsive-container">
      <h1 className="text-3xl font-bold text-center mb-10">𝙿𝚛𝚘𝚍𝚞𝚌𝚝 𝚀𝚝𝚢 𝚆𝚒𝚜𝚎 𝚁𝚎𝚙𝚘𝚛𝚝</h1>

      {/* Conditional rendering of reports */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="p-5 shadow-md rounded-lg">
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
          </div>

          <table className="min-w-full shadow-md table-auto">
            <thead className="">
              <tr>
                <th className="px-4 py-2">S.No.</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Opening Qty</th>
                <th className="px-4 py-2">Inward Qty</th>
                <th className="px-4 py-2">Outward Qty</th>
                <th className="px-4 py-2">Closing Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">T-shirt</td>
                <td className="border px-4 py-2">25</td>
                <td className="border px-4 py-2">105</td>
                <td className="border px-4 py-2">70</td>
                <td className="border px-4 py-2">60</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Download Report
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQtyWise;