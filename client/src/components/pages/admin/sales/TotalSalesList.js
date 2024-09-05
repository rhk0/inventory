import React from "react";
import { MdRateReview } from "react-icons/md";

const TotalSalesList = () => {
  return (
    <div
      style={{ padding: "20px", backgroundColor: "#b9b783" }}
      className="responsive-container"
    >
      {/* Heading */}
      <h1 className="text-center text-2xl bg-gray-500 mt-3 mb-10">
        Total Sales List
      </h1>

      {/* Date Range and Search Bar */}
      <div className="grid gap-4 grid-cols-1 md:flex md:justify-between items-center mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 md:space-y-0">
            <label className="font-bold">From</label>
            <input
              type="date"
              className="border p-2 rounded bg-gray-200 w-full md:w-auto"
            />
          </div>
          <div className="flex flex-col space-y-2 md:space-y-0">
            <label className="font-bold">To</label>
            <input
              type="date"
              className="border p-2 rounded bg-gray-200 w-full md:w-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Bar"
            className="border rounded w-full p-2 bg-gray-300 text-black"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full  text-white">
          <thead>
            <tr className="bg-gray-500 text-black">
              <th className=" py-2 border">#</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Invoice No.</th>
              <th className="px-4 py-2 border">Sales Type</th>
              <th className="px-4 py-2 border">Customer Type</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Place of Supply</th>
              <th className="px-4 py-2 border">Taxable Value</th>
              <th className="px-4 py-2 border">CGST</th>
              <th className="px-4 py-2 border">SGST</th>
              <th className="px-4 py-2 border">Total Value</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 py-2 border text-black">1</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border">
                <button className="mx-1 text-white bg-green-500 rounded p-2">
                  <MdRateReview className="text-xl" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalSalesList;
