import React, { useState } from "react";

const Pos = () => {
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
  const print=()=>{
    window.print();
  }

  return (
    <div
      style={{ backgroundColor: "pink" }}
      className="responsive-container bg-pink-200 p-4  rounded-md w-full mx-auto"
    >
              <style>
        {`
             @media print {
              @page {
                size: A4;
                margin: 0;
                width:100%;
              }
                   
              @media print {
                body * {
                  visibility: hidden;
                }
                .responsive-container, .responsive-container * {
                  visibility: visible;
                }
                .responsive-container {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .hide-on-print {
                  display: none !important;
                }
                  .cucolor {
                  color: red;
                }
                .hide-on-print button{
                  display: none !important;
                }
              }
              .print-container {
                display: block;
                page-break-before: always;
              }

              html, body {
                width: 270mm;
              }
          
        `}
      </style>
      <h1 className="text-center text-3xl bg-gray-500 text-white cucolor">
        Point Of Sale
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
          <label className="text-md font-bold text-black">Invoice No.</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Customer Detail
          </label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Contact or name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Payment Type</label>
          <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            {/* Add more options here if needed */}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse  overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-500 p-1">#</th>
              <th className="border border-gray-500 p-1">Item Code</th>
              <th className="border border-gray-500 p-1 text-nowrap pl-16 pr-16">
                Product Name
              </th>
              <th className="border border-gray-500 p-1">Qty</th>
              <th className="border border-gray-500 p-1">MRP</th>
              <th className="border border-gray-500 p-1 text-nowrap">Retail Price</th>
              <th className="border border-gray-500 p-1 text-nowrap">Taxable Value</th>
              <th className="border border-gray-500 p-1 text-xs">
                CGST
                <span className="mt-1 gap-10  flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                CGST
                <span className="mt-1 gap-10  flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                IGST
                <span className="mt-1 gap-10  flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
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
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.retailPrice}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).retailPrice =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.taxableValue}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).taxableValue =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={row.cgstPercent}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).cgstPercent =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={row.cgstPercent}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).cgstPercent =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  </div>
                </td>
                <td className="border border-gray-500 p-1">
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={row.cgstRs}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).cgstRs =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={row.cgstRs}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows.find((r) => r.id === row.id).cgstRs =
                        e.target.value;
                      setRows(newRows);
                    }}
                    className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  </div>
                </td>
                <td className="border border-gray-500 p-1 mr-1">
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      value={row.sgstPercent}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows.find((r) => r.id === row.id).sgstPercent =
                          e.target.value;
                        setRows(newRows);
                      }}
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={row.sgstPercent}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows.find((r) => r.id === row.id).sgstPercent =
                          e.target.value;
                        setRows(newRows);
                      }}
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
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

      <div className="mt-4 flex justify-end">
        <div className="text-left mr-2">
          <p className="font-bold p-2">Gross Amount</p>
          <p className="font-bold p-2">GST Amount</p>
          <p className="font-bold p-2">Net Amount</p>
        </div>

        <div className="text-right  text-white p-1 min-w-[100px]">
          <input className="flex bg-black text-white border p-1 w-full  rounded " />
          <input className="flex bg-black text-white border p-1 w-full  rounded " />
          <input className="flex bg-black text-white border p-1 w-full  rounded " />
        </div>
      </div>

      <div className="text-center mt-8">
        <button onClick={print} className="bg-black hide-on-print text-white py-2 px-8 text-xl font-bold hover:bg-gray-700">
          Save & Print
        </button>
      </div>
    </div>
  );
};

export default Pos;
