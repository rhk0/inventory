import React from "react";

const StockUnit = () => {
  return (
    <div className="responsive-container">
      <form className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold text-center underline mb-6 text-violet-800">
          Stock Units
        </h4>
        
        {/* Using a flex container for vertical alignment */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Type:</label>
            <select
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              name="drCr"
            >
              <option value="">Select</option>
              <option value="Dr">Single Compounded</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Symbol:</label>
            <input
              type="text"
              name="symbol"
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Formal name:</label>
            <input
              type="text"
              name="formalName"
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Prim:</label>
            <input
              type="text"
              name="prim"
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            // onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockUnit;
