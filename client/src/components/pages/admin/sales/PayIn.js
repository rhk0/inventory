import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
const PayIn = () => {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [date, setDate] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [Narration, setNarration] = useState(""); // Ensure narration is defined
  const [receiptMode, setReceiptMode] = useState("Cash");
  const [selectBank, setSelectBank] = useState("");
  const [selctedCustomerInvoiceData, setSelctedCustomerInvoiceData] = useState([]);
  
  const [rows, setRows] = useState([
    {
      id: 1,
      billNo: "",
      billAmount: "",
      paidAmount: "",
      recievedAmount: "",
      balanceAmount: "",
    },
  ]);

  // Add new states for method and transactionCheckNo
  const [method, setMethod] = useState(""); // Added state for method
  const [transactionCheckNo, setTransactionCheckNo] = useState(""); // Added state for transaction check number

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageCustomer");
      setCustomer(response.data.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const salesinvoicesCustomerByName = async (selectedCustomer) => {
    try {
      const response = await axios.get(
        `/api/v1/salesInvoiceRoute/salesinvoicesByName/${selectedCustomer}`
      );
      setSelctedCustomerInvoiceData(response.data.response);
    } catch (error) {
      console.error("Error fetching customer invoices:", error);
    }
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    salesinvoicesCustomerByName(e.target.value);
  };

  const handleRowChange = (index, key, value) => {
    const newRows = [...rows];
    if (key === "billNo") {
      const selectedInvoice = selctedCustomerInvoiceData.find(
        (item) => item.InvoiceNo === value
      );
      if (selectedInvoice) {
        const paymentData = selectedInvoice.cash
          ? selectedInvoice.cash
          : selectedInvoice.bank;
        newRows[index] = {
          ...newRows[index],
          billNo: selectedInvoice.InvoiceNo,
          billAmount: selectedInvoice.netAmount,
          paidAmount: paymentData ? paymentData.Received : 0,
        };
      }
    } else {
      newRows[index][key] = value;
    }
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1,
        billNo: "",
        billAmount: "",
        paidAmount: "",
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
let grandtotal=0;
  const calculateBalance = (billAmount, paidAmount, receivedAmount) => {
    const bill = parseFloat(billAmount) || 0;
    const credit = parseFloat(paidAmount) || 0;
    const received = parseFloat(receivedAmount) || 0;
    grandtotal+=(bill - credit - received)
    return (bill - credit - received).toFixed(2);
  };

  let alltotal=0;
  const GrandTotal = (billAmount, paidAmount, receivedAmount) => {
    const bill = parseFloat(billAmount) || 0;
    const credit = parseFloat(paidAmount) || 0;
    const received = parseFloat(receivedAmount) || 0;
    alltotal+=(bill - credit - received)
    return alltotal;
  };
  const calculateTotalReceived = () => {
    return rows.reduce((total, row) => {
      return total + parseFloat(row.recievedAmount || 0);
    }, 0).toFixed(2);
  };
  

  const handleSave = async () => {
    const totalAmount = calculateTotalReceived(); // This needs to be defined correctly
   const grandTotal= GrandTotal();
    grandtotal = grandTotal; // Ensure grandtotal is set correctly

  const dataToSubmit = {
    date,
    receiptNo,
    selectCustomer: selectedCustomer,
    receiptMode,
    selectBank,
    method,
    transactionCheckNo,
    rows: rows.map((row) => ({
      billNo: row.billNo,
      billAmount: row.billAmount,
      paidAmount: row.paidAmount, // Ensure this is defined and sent
      recievedAmount: row.recievedAmount,
      balanceAmount: calculateBalance(row.billAmount, row.paidAmount, row.recievedAmount),
    })),
    grandtotal, // Ensure grandtotal is set correctly
    Narration,
  };


    try {
      await axios.post("/api/v1/payInRoute/createsalespayin", dataToSubmit);
      toast.success("Data saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Reset form
      setDate("");
      setReceiptNo("");
      setSelectedCustomer("");
      setReceiptMode("Cash");
      setMethod(""); // Reset method
      setTransactionCheckNo(""); // Reset transaction check number
      setRows([{ id: 1, billNo: "", billAmount: "", paidAmount: "", recievedAmount: "", balanceAmount: "" }]);
      setNarration("");
    } catch (error) {
      toast.error("Error saving data. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error saving data:", error);
    }
  };
  return (
    <div
      style={{ backgroundColor: "#FFFFFF" }}
      className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
    >
      <h1 className="text-center text-3xl  text-black mb-5 cucolor">Pay In</h1>
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
              <option key={customer._id} value={customer.name}>
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
              <select
                value={selectBank}
                onChange={(e) => setSelectBank(e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              >
                <option value="">Select Bank</option>
                <option value="Bank1">Bank1</option>
                <option value="Bank2">Bank2</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              >
                <option value="">Select Method</option>
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
                value={transactionCheckNo}
                onChange={(e) => setTransactionCheckNo(e.target.value)}
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
              <th className="border border-gray-500 p-1">Credit Amount</th>
              <th className="border border-gray-500 p-1">Received Amount</th>
              <th className="border border-gray-500 p-1">Balance Amount</th>
              <th className="border border-gray-500 p-1">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border border-gray-500 p-1 text-center">{index + 1}</td>
                <td className="border border-gray-500 p-1">
                  <select
                    value={row.billNo}
                    onChange={(e) => handleRowChange(index, "billNo", e.target.value)}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option className="text-black">Select</option>
                    {selctedCustomerInvoiceData.map((item, idx) => (
                      <option key={idx} value={item.InvoiceNo}>
                        {item.InvoiceNo ? item.InvoiceNo : "NA"}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-500 p-1">{row.billAmount || "NA"}</td>
                <td className="border border-gray-500 p-1">{row.paidAmount || "NA"}</td>
                <td className="border border-gray-500 p-1">
                  <input
                    type="text"
                    value={row.recievedAmount || ""}
                    onChange={(e) => handleRowChange(index, "recievedAmount", e.target.value)}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-500 p-1">
                  {calculateBalance(row.billAmount, row.paidAmount, row.recievedAmount)}
                </td>
                <td className="text-center flex gap-2 pl-1">
                  <button
                    onClick={addRow}
                    className="p-2 bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Add row"
                  >
                    <AiOutlinePlus className="h-5 w-4 text-white" />
                  </button>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Remove row"
                  >
                    <AiOutlineClose className="h-5 w-4 text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border border-gray-500 p-1 text-right font-bold">Total Received Amount:</td>
              <td className="border border-gray-500 p-1 font-bold">
                {calculateTotalReceived()}
              </td>
              <td className="border border-gray-500 p-1"></td>
             
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex flex-row justify-end items-center gap-5 lg:mr-28 mt-10">
        <label className="text-2xl font-bold text-black mr-2">Total</label>
        <input
          type="text"
          value={grandtotal.toFixed(2)}
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
      <ToastContainer />
    </div>
  );
};

export default PayIn;
