import React, { useState } from "react";

const PayIn = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      code: "",
      name: "",
      qty: "",
      mrp: "",
      retailPrice: "",
      taxableValue: "",
      cgstPercent: "",
      cgstRs: "",
      sgstPercent: "",
      sgstRs: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        code: "",
        name: "",
        qty: "",
        mrp: "",
        retailPrice: "",
        taxableValue: "",
        cgstPercent: "",
        cgstRs: "",
        sgstPercent: "",
        sgstRs: "",
      },
    ]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const [receiptMode, setReceiptMode] = useState("Cash");

  return (
    <div
      style={{ backgroundColor: "#41B3A2" }}
      className="responsive-container bg-pink-200 p-4  rounded-md w-full mx-auto"
    >
      <h1 className="text-center text-3xl bg-gray-500 text-white cucolor">
        Pay In
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Date</label>
          <input
            type="date"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Receipt No.</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Select Customer
          </label>
          <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
            <option value="Cash"></option>
            <option value="Online"></option>
            {/* Add more options here if needed */}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Receipt Mode</label>
          <select
            value={receiptMode}
            onChange={(e) => setReceiptMode(e.target.value)}
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            {/* Add more options here if needed */}
          </select>
        </div>
        {receiptMode === "Bank" && (
          <>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Select Bank
              </label>
              <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
                <option value="Cash"></option>
                <option value="Online"></option>
                {/* Add more options here if needed */}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Method</label>
              <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
                <option value="Cash">Online</option>
                <option value="Online">Cheque</option>
                {/* Add more options here if needed */}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Transaction / Cheque No
              </label>
              <input
                type="text"
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              />
            </div>
          </>
        )}
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse  overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-500 p-1">#</th>
              <th className="border border-gray-500 p-1">Bill NO</th>
              <th className="border border-gray-500 p-1 text-nowrap pl-16 pr-16">
                Bill Amount
              </th>
              <th className="border border-gray-500 p-1">Received Amount</th>
              <th className="border border-gray-500 p-1">Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-500 p-1 text-center">
                  {row.id}
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.code}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).code =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 ml-5 mr-5 p-1">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).name =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full  p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.qty}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).qty = e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.mrp}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).mrp = e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>

                <td className="p-1 text-center hide-on-print flex gap-1 items-center justify-center">
                  <button
                    onClick={addRow}
                    className="bg-green-500 text-white rounded p-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => removeRow(row.id)}
                    className="bg-red-500 text-white rounded p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-end items-center  gap-5 lg:mr-28 mt-10">
        <label className="text-2xl font-bold text-black mr-2">Total</label>
        <input
          type="text"
          className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
        />
      </div>
      <div className="flex flex-row justify-left  gap-5  mt-10">
        <label className="text-2xl font-bold text-black mr-2">Narration</label>
        <br/>
        <textarea
          type="text"
          className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
        />
      </div>

      <div className="text-center mt-8">
        <button className="bg-black hide-on-print text-white py-2 px-8 text-xl font-bold hover:bg-gray-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default PayIn;
