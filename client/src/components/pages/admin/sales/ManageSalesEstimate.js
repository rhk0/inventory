import React from "react";

const ManageSalesEstimate = () => {
  return (
    <div className="responsive-container p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Estimate number, Customer Name"
          className="w-full p-2 border rounded-md shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-grey-100 text-black">
          <thead>
            <tr>
              <th className="border border-gray-300 ">No.</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Estimate No.</th>
              <th className="border border-gray-300 p-2">Sales Type</th>
              <th className="border border-gray-300 p-2">Customer Name</th>
              <th className="border border-gray-300 p-2">Place of Supply</th>
              <th className="border border-gray-300 p-2">Payment Term</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">GST Type</th>
              <th className="border border-gray-300 p-2">Product Code</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">UOM</th>
              <th className="border border-gray-300 p-2">MRP</th>
              <th className="border border-gray-300 p-2">QTY</th>
              <th className="border border-gray-300 p-2">Rate</th>
              <th className="border border-gray-300 p-2">Total Value</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample row */}
            <tr>
              <td className="border border-gray-300  text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">
                2023-09-03
              </td>
              <td className="border border-gray-300 p-2 text-center">12345</td>
              <td className="border border-gray-300 p-2 text-center">Online</td>
              <td className="border border-gray-300 p-2 text-center">
                John Doe
              </td>
              <td className="border border-gray-300 p-2 text-center">
                New York
              </td>
              <td className="border border-gray-300 p-2 text-center">Net 30</td>
              <td className="border border-gray-300 p-2 text-center">
                2023-10-03
              </td>
              <td className="border border-gray-300 p-2 text-center">
                Regular
              </td>
              <td className="border border-gray-300 p-2 text-center">P001</td>
              <td className="border border-gray-300 p-2 text-center">
                Product 1
              </td>
              <td className="border border-gray-300 p-2 text-center">PCS</td>
              <td className="border border-gray-300 p-2 text-center">$100</td>
              <td className="border border-gray-300 p-2 text-center">10</td>
              <td className="border border-gray-300 p-2 text-center">$10</td>
              <td className="border border-gray-300 p-2 text-center">$100</td>
              <td className="border border-gray-300 p-2 text-center flex">
                <button className="text-blue-500 hover:underline mr-2">
                  View
                </button>
                <button className="text-yellow-500 hover:underline mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:underline mr-2">
                  Delete
                </button>
                <button className="text-green-500 hover:underline">
                  Create Invoice
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSalesEstimate;
