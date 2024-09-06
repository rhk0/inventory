import React from "react";

const AddIncome = () => {
  return (
    <div className=" p-2 flex justify-center  responsive-container">
      <div className="p-2 rounded-lg shadow-lg w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Income</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Income No.</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Income Type</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="GST">GST</option>
              <option value="Non GST">Non GST</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">GST Type</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="gst">GST</option>
              <option value="non-gst">Non GST</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Select Vendor</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="vendor1">Vendor 1</option>
              <option value="vendor2">Vendor 2</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Income</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">GST Rate</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">CGST Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">SGST Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Total</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1">Narration</label>
          <textarea
            rows="3"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
