import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const PayIn = () => {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [date, setDate] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [Narration, setNarration] = useState("");
  const [receiptMode, setReceiptMode] = useState("Cash");

  const [rows, setRows] = useState([
    {
      id: 1,
      billNo: "",
      billAmount: "",
      recievedAmount: "",
      balanceAmount: "",
    },
  ]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageCustomer");
        setCustomer(response.data.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
    fetchCustomer();
  }, []);

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1,
        billNo: "",
        billAmount: "",
        recievedAmount: "",
        balanceAmount: "",
      },
    ]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleSave = async () => {
    // Calculate the total received amount
    const totalAmount = rows.reduce((total, row) => {
      return total + parseFloat(row.recievedAmount || 0);
    }, 0);

    const dataToSubmit = {
      date,
      receiptNo,
      selectCustomer: selectedCustomer,
      receiptMode,
      rows: rows.map((row) => ({
        billNo: row.billNo,
        billAmount: row.billAmount,
        recievedAmount: row.recievedAmount,
        balanceAmount: row.balanceAmount,
      })),
      total: totalAmount.toFixed(2),
      Narration,
    };

    try {
      const response = await axios.post(
        "/api/v1/payInRoute/createsalespayin",
        dataToSubmit
      );

      toast.success("Data saved successfully!", {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDate(""); // Clear date
      setReceiptNo(""); // Clear receipt number
      setSelectedCustomer(""); // Clear selected customer
      setReceiptMode("Cash"); // Reset receipt mode to default (Cash)
      setRows([
        {
          id: 1,
          billNo: "",
          billAmount: "",
          recievedAmount: "",
          balanceAmount: "",
        },
      ]); // Reset rows to a single empty row
      setNarration(""); // Clear narration
    } catch (error) {
      toast.error("Error saving data. Please try again!", {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error saving data:", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#41B3A2" }}
      className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Receipt No.</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
            value={receiptNo}
            onChange={(e) => setReceiptNo(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Select Customer
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedCustomer}
            onChange={handleCustomerChange}
          >
            <option value="">Select Customer</option>
            {customer.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
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
          </select>
        </div>

        {receiptMode === "Bank" && (
          <>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Select Bank
              </label>
              <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
                <option value="Bank1">Bank1</option>
                <option value="Bank2">Bank2</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Method</label>
              <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
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
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-500 p-1">#</th>
              <th className="border border-gray-500 p-1">Bill NO</th>
              <th className="border border-gray-500 p-1">Bill Amount</th>
              <th className="border border-gray-500 p-1">Received Amount</th>
              <th className="border border-gray-500 p-1">Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border border-gray-500 p-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.billNo}
                    onChange={(e) =>
                      handleRowChange(index, "billNo", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.billAmount}
                    onChange={(e) =>
                      handleRowChange(index, "billAmount", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.recievedAmount}
                    onChange={(e) =>
                      handleRowChange(index, "recievedAmount", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.balanceAmount}
                    onChange={(e) =>
                      handleRowChange(index, "balanceAmount", e.target.value)
                    }
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="text-center flex gap-2 pl-1">
                  <button
                    onClick={addRow}
                    className="p-2 bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Add row"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-4 text-white"
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
                    onClick={() => removeRow(row.id)}
                    className="p-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Remove row"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-4 text-white"
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
      <div className="flex flex-row justify-end items-center gap-5 lg:mr-28 mt-10">
        <label className="text-2xl font-bold text-black mr-2">Total</label>
        <input
          type="text"
          value={rows
            .reduce(
              (total, row) => total + parseFloat(row.recievedAmount || 0),
              0
            )
            .toFixed(2)}
          readOnly
          className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
        />
      </div>
      <div className="flex flex-row justify-left gap-5 mt-10">
        <label className="text-2xl font-bold text-black mr-2">Narration</label>
        <textarea
          type="text"
          className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
          value={Narration}
          onChange={(e) => setNarration(e.target.value)}
        />
      </div>
      <div className="text-center mt-8">
        <button
          onClick={handleSave}
          className="bg-black text-white py-2 px-16 rounded text-xl font-bold hover:bg-gray-700"
        >
          Save
        </button>
      </div>
      <ToastContainer /> {/* Add this line to include the toast container */}
    </div>
  );
};

export default PayIn;
