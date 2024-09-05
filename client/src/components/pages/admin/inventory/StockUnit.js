import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockUnit = () => {
  const [unitofquantity, setunitofquantity] = useState("");
  const [symbol, setSymbol] = useState("");
  const [formalName, setFormalName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      
      const response = await axios.post("/api/v1/auth/createStockUnit", {
        unitofquantity,
        symbol,
        formalName,
      });
  

      if (response.data.success) {
        toast.success(response.data.message);
        setunitofquantity(" ");
        setSymbol(" ");
        setFormalName(" ");
      }
    } catch (error) {
      console.error("Error creating stock unit:", error);
    }
  };

  return (
    <div className="responsive-container">
      <form className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold text-center underline mb-6 text-violet-800">
          Add Units
        </h4>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Unit Quantity Code</label>
            <select
              className="w-1/2 py-2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
              name="unitofquantity"
              value={unitofquantity}
              onChange={(e) => {
                setunitofquantity(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="Length - meter (m)"> Length - meter (m)</option>
              <option value="Time - second (s)">Time - second (s)</option>
              <option value="Amount of substance - mole (mol)">
                Amount of substance - mole (mol)
              </option>
              <option value="Electric current - ampere (A)">Electric current - ampere (A)</option>
              <option value="Temperature - kelvin (K)">Temperature - kelvin (K)</option>
              <option value="Luminous intensity - candela (cd)">
                Luminous intensity - candela (cd)
              </option>
              <option value="Mass - kilogram (kg)">Mass - kilogram (kg)</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Symbol</label>
            <input
              type="text"
              name="symbol"
              className="w-1/2 border border-gray-300 py-2 rounded-md focusring-2 focusring-violet-600"
              value={symbol}
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/4">Formal name</label>
            <input
              type="text"
              name="formalName"
              className="w-1/2 border py-2 border-gray-300 rounded-md focusring-2 focusring-violet-600"
              value={formalName}
              onChange={(e) => setFormalName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md focusring-2 focusring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default StockUnit;
