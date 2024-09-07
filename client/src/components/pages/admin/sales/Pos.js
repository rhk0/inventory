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
      igstPercent: "",
      igstRs: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemCode: "",
        productName: "",
        hsnCode: "",
        qty: 0,
        uom: "",
        mrp: 0,
        discount: 0,
        taxableValue: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        totalValue: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const print = () => {
    window.print();
  };

  return (
    <div
      style={{ backgroundColor: "pink" }}
      className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
    >
      <style>
        {`
             @media print {
              @page {
                size: A4;
                margin: 0;
                width: 100%;
              }
                   
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
              .hide-on-print button {
                display: none !important;
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
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-500 p-1">#</th>
              <th className="border border-gray-500 p-1">Item Code</th>
              <th className="border border-gray-500 p-1 text-nowrap pl-16 pr-16">
                Product Name
              </th>
              <th className="border border-gray-500 p-1">Qty</th>
              <th className="border border-gray-500 p-1">MRP</th>
              <th className="border border-gray-500 p-1 text-nowrap">
                Retail Price
              </th>
              <th className="border border-gray-500 p-1 text-nowrap">
                Taxable Value
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                CGST
                <span className="mt-1 gap-10 flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                SGST
                <span className="mt-1 gap-10 flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                IGST
                <span className="mt-1 gap-10 flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border border-gray-500 p-1 text-center">
                  {index + 1} {/* Serial Number */}
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.code}
                    onChange={(e) =>
                      handleChange(index, "code", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.qty}
                    onChange={(e) => handleChange(index, "qty", e.target.value)}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.mrp}
                    onChange={(e) => handleChange(index, "mrp", e.target.value)}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.retailPrice}
                    onChange={(e) =>
                      handleChange(index, "retailPrice", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.taxableValue}
                    onChange={(e) =>
                      handleChange(index, "taxableValue", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      value={row.cgstPercent}
                      onChange={(e) =>
                        handleChange(index, "cgstPercent", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={row.cgstRs}
                      onChange={(e) =>
                        handleChange(index, "cgstRs", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
                <td className="border border-gray-500 p-1">
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      value={row.sgstPercent}
                      onChange={(e) =>
                        handleChange(index, "sgstPercent", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={row.sgstRs}
                      onChange={(e) =>
                        handleChange(index, "sgstRs", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
                <td className="border border-gray-500 p-1">
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      value={row.igstPercent}
                      onChange={(e) =>
                        handleChange(index, "igstPercent", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={row.igstRs}
                      onChange={(e) =>
                        handleChange(index, "igstRs", e.target.value)
                      }
                      className="w-1/2 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
                <td className="p-1 text-center hide-on-print flex gap-2 items-center justify-center">
                  <button
                    onClick={addRow}
                    className="bg-green-500 text-white rounded p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Add row"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-4"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v14m7-7H5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white rounded p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Remove row"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-4"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
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
        <div className="flex flex-col mr-8">
          <label className="text-md font-bold text-black">Gross Amount</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Gross Amount"
          />
        </div>
        <div className="flex flex-col mr-8">
          <label className="text-md font-bold text-black">GST Amount</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="GST Amount"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Net Amount</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Net Amount"
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={print}
          className="bg-black hide-on-print text-white py-2 rounded px-10 text-xl font-bold hover:bg-gray-700"
        >
          Save & Print
        </button>
      </div>
    </div>
  );
};

export default Pos;
