import React from "react";

const DayBook = () => {
  return (
    <div className="p-5 bg-blue-900 text-black responsive-container">
      <h1 className="text-3xl text-center font-bold mb-5">Day Book</h1>
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
      <table className="table-auto w-full mt-5 border border-black">
        <thead>
          <tr>
            <th className="p-2 border border-black">Date</th>
            <th className="p-2 border border-black">Particular</th>
            <th className="p-2 border border-black">Voucher No.</th>
            <th className="p-2 border border-black">Voucher Type</th>
            <th className="p-2 border border-black">Debit</th>
            <th className="p-2 border border-black">Credit</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((day, index) => (
            <tr key={index}>
              <td className="p-2 border border-black">{`${day}-4-2024`}</td>
              <td className="p-2 border border-black"></td>
              <td className="p-2 border border-black"></td>
              <td className="p-2 border border-black"></td>
              <td className="p-2 border border-black"></td>
              <td className="p-2 border border-black"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      {/* <div className="flex justify-between p-5 mt-5 bg-blue-700 border-t-2 border-black">
        <span>Total</span>
        <span className="font-bold">Bold</span>
        <span className="font-bold">Bold</span>
      </div> */}
    </div>
  );
};

export default DayBook;
