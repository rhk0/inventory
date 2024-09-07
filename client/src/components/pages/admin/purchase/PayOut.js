import React, { useState } from "react";

const PayOut = () => {
  const [rows, setRows] = useState([
    { invoiceNo: "", paymentAmount: "", balanceAmount: "" },
  ]);
  const [paymentMode, setPaymentMode] = useState("");

  const addRow = () => {
    setRows([...rows, { invoiceNo: "", paymentAmount: "", balanceAmount: "" }]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  return (
    <div
      className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
      style={{ backgroundColor: "pink" }}
    >
      <h1 className="text-center text-3xl bg-gray-100 text-black cucolor">
        Pay Out
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block">Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Payment No.</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block">Select Supplier</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option>Select Supplier</option>
          </select>
        </div>
        <div>
          <label className="block">Payment Mode</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentMode}
            onChange={handlePaymentModeChange}
          >
            <option value="">Select Payment Mode</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      {paymentMode === "Bank" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block">Select Bank</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Select Bank</option>
            </select>
          </div>
          <div>
            <label className="block">Method</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">Select Method</option>
              <option value="Online">Online</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
          <div>
            <label className="block">Transaction / Cheque No.</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Invoice No.</th>
            <th className="border border-gray-300 p-2">Invoice Amount</th>
            <th className="border border-gray-300 p-2">Payment Amount</th>
            <th className="border border-gray-300 p-2">Balance Amount</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>

              <td className="border border-gray-300 p-2 flex space-x-2 justify-center">
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => removeRow(index)}
                >
                  ✖
                </button>
                <button
                  className="bg-green-500 text-white p-1 rounded"
                  onClick={addRow}
                >
                  ➕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="block">Total</label>
        <input
          type="text"
          className="w-1/4 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block">Narration</label>
        <textarea className="w-1/2 p-2 border border-gray-300 rounded"></textarea>
      </div>

      <button className="mt-4 bg-blue-500 text-white p-2 rounded">Save</button>
    </div>
  );
};

export default PayOut;
