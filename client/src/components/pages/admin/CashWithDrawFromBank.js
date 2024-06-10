// src/App.js
import React from "react";

function CashWithDrawFromBank() {
  return (
    <div className="p-6 bg-white responsive-container">
      <h3 className="text-center text-2xl sm:text-3xl font-bold text-purple-600 mb-6 underline ">
        Cash Withdraw from Bank{" "}
      </h3>
      <div className="flex flex-col md:flex-row mt-4 justify-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-auto">
          <label className="block text-purple-600 font-semibold">Date</label>
          <input
            type="date"
            className="w-full md:w-auto border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2"
          />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-purple-600 font-semibold">
            Contra No
          </label>
          <input
            type="text"
            className="w-full md:w-auto border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2"
          />
        </div>
      </div>
      <div className="mt-6 bg-green-100 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-600 font-semibold">
              From Account
            </label>
            <select className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full">
              <option> Select Bank</option>
            </select>
            <span className="mx-3">Current Balance -</span>
          </div>
          <div>
            <label className="block text-purple-600 font-semibold">
              Amount
            </label>
            <input
              type="text"
              className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full"
            />
          </div>
          <div>
            <label className="block text-purple-600 font-semibold">
              To Account
            </label>
            <select className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full">
              <option> select Bank</option>
            </select>
            <span className="mx-3">Current Balance -</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashWithDrawFromBank;
