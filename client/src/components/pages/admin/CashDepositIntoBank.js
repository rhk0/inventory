import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CashDepositeIntoBank() {
  const [formData, setFormData] = useState({
    date: "",
    contraNo: "",
    fromAccount: "",
    amount: "",
    toAccount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/CashDepositeIntoBank",
        formData
      );

      if (response) {
        toast.success("cash Deposit into bank Created Successfully...");
      }

      clearData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearData = () => {
    setFormData({
      date: "",
      contraNo: "",
      fromAccount: "",
      amount: "",
      toAccount: "",
    });
  };


  return (
    <div className="p-6 bg-white responsive-container">
      <h3 className="text-center text-2xl sm:text-3xl font-bold text-purple-600 mb-6 underline">
        Cash Deposit Into Bank
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row mt-4 justify-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto">
            <label className="block text-purple-600 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full md:w-auto border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2"
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-purple-600 font-semibold">
              Contra No
            </label>
            <input
              type="text"
              name="contraNo"
              value={formData.contraNo}
              onChange={handleChange}
              className="w-full md:w-auto border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2"
            />
          </div>
        </div>
        <div className="mt-6 bg-green-100 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-600 font-semibold">
                From 
              </label>
              <select
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleChange}
                className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full"
              >
                <option value="">select</option>

                <option value="Cash">Cash</option>
              </select>
              <span className="mx-3">Current Balance -</span>
            </div>
            <div>
              <label className="block text-purple-600 font-semibold">
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full"
              />
            </div>
            <div>
              <label className="block text-purple-600 font-semibold">
                To Account
              </label>
              <select
                name="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                className="mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 mt-1 p-2  w-full"
              >
                <option value="">Select Bank</option>
                <option value="BankA">Bank A</option>
                <option value="BankB">Bank B</option>
              </select>
              <span className="mx-3">Current Balance -</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CashDepositeIntoBank;
