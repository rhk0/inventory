import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockUnit = () => {
  const [compoundedType, setCompoundedType] = useState("singlecompounded");
  const [symbol, setSymbol] = useState("");
  const [formalName, setFormalName] = useState("");
  const [primaryUnit, setPrimaryUnit] = useState("");
  const [conversionOf, setConversionOf] = useState("");
  const [secondaryUnit, setSecondaryUnit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(compoundedType,"compoundedType")
      const response = await axios.post("/api/v1/auth/createStockUnit", {
        compoundedType,
        symbol,
        formalName,
        primaryUnit,
        conversionOf,
        secondaryUnit,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error creating stock unit:", error);
    }
  };

  const handleChange = (e) => {
    setCompoundedType(e.target.value);
    handleCompoundedTypeChange(e.target.value);
  };

  const handleCompoundedTypeChange = (value) => {
    setCompoundedType(value);
    if (value === "singlecompounded") {
      setPrimaryUnit("");
      setConversionOf("");
      setSecondaryUnit("");
    }
  };

  return (
    <div className="responsive-container">
      <form className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold text-center underline mb-6 text-violet-800">
          Stock Units
        </h4>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Type</label>
            <select
              className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
              name="drCr"
              value={compoundedType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="singlecompounded">Single</option>
              <option value="compounded">Compounded</option>
            </select>
          </div>

          {compoundedType === "singlecompounded" && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Symbol</label>
                <input
                  type="text"
                  name="symbol"
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
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
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  value={formalName}
                  onChange={(e) => setFormalName(e.target.value)}
                />
              </div>
            </>
          )}
          {compoundedType === "compounded" && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Symbol</label>
                <input
                  type="text"
                  name="symbol"
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  value={symbol}
                  onChange={(e) => {
                    setSymbol(e.target.value);
                    setPrimaryUnit(e.target.value); // Set primary unit same as symbol
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Formal name</label>
                <input
                  type="text"
                  name="formalName"
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  value={formalName}
                  onChange={(e) => setFormalName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Primary Unit</label>
                <input
                  type="text"
                  name="primaryunit"
                  readOnly
                  value={primaryUnit}
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  onChange={(e) => setPrimaryUnit(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Conversion of</label>
                <input
                  type="text"
                  name="conversionof"
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  value={conversionOf}
                  onChange={(e) => setConversionOf(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/4">Secondary Unit</label>
                <input
                  type="text"
                  name="secondaryUnit"
                  className="w-1/2 border border-gray-300 rounded-md focusring-2 focusring-violet-600"
                  value={secondaryUnit}
                  onChange={(e) => setSecondaryUnit(e.target.value)}
                />
              </div>
            </>
          )}
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
