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
              <option value="Bags">Bags</option>
              <option value="Bale">Bale</option>
              <option value="Bundles">Bundles</option>
              <option value="Box">Box</option>
              <option value="Bunches">Bunches</option>
              <option value="Cans">Cans</option>
              <option value="Cubic meters">Cubic meters</option>
              <option value="Cubic centimeter">Cubic centimeter</option>
              <option value="Centimeter">Centimeter</option>
              <option value="Cartons">Cartons</option>
              <option value="Dozens">Dozens</option>
              <option value="Drums">Drums</option>
              <option value="Great gross">Great gross</option>
              <option value="Gross">Gross</option>
              <option value="Gross yards">Gross yards</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Kilolitre">Kilolitre</option>
              <option value="Kilometre">Kilometre</option>
              <option value="Litres">Litres</option>
              <option value="Millitre">Millitre</option>
              <option value="Meters">Meters</option>
              <option value="Metric ton">Metric ton</option>
              <option value="Numbers">Numbers</option>
              <option value="Others">Others</option>
              <option value="Packs">Packs</option>
              <option value="Pieces">Pieces</option>
              <option value="Pairs">Pairs</option>
              <option value="Quintal">Quintal</option>
              <option value="Rolls">Rolls</option>
              <option value="Sets">Sets</option>
              <option value="Square feet">Square feet</option>
              <option value="Square meters">Square meters</option>
              <option value="Square yards">Square yards</option>
              <option value="Tablets">Tablets</option>
              <option value="Ten gross">Ten gross</option>
              <option value="Thousands">Thousands</option>
              <option value="Tonnes">Tonnes</option>
              <option value="Tubes">Tubes</option>
              <option value="US gallons">US gallons</option>
              <option value="Units">Units</option>
              <option value="Yards">Yards</option>
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
