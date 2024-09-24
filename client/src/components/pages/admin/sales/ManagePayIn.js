import React, { useEffect, useState } from "react";
import { MdRateReview, MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePayIn = () => {
  const [payIns, setPayIns] = useState([]);
  const [selectedPayIn, setSelectedPayIn] = useState(null);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [Narration, setNarration] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [receiptMode, setReceiptMode] = useState("Cash");
  const [selectBank, setSelectBank] = useState("");
  const [method, setMethod] = useState("");
  const [transactionCheckNo, setTransactionCheckNo] = useState("Cash");
  // Fetch all payIn records
  useEffect(() => {
    const fetchPayIns = async () => {
      try {
        const response = await axios.get("/api/v1/payInRoute/getAllpayin");
        setPayIns(response.data.payInList);
      } catch (error) {
        console.error("Error fetching PayIns:", error);
        toast.error("Error fetching records");
      }
    };
    fetchPayIns();
  }, []);

  // Open view modal
  const openViewModal = (payIn) => {
    setSelectedPayIn(payIn);
    setViewModalIsOpen(true);
  };

  // Open edit modal
  const openEditModal = (payIn) => {
    setSelectedPayIn(payIn);
    setEditModalIsOpen(true);
  };

  // Close modals
  const closeModals = () => {
    setViewModalIsOpen(false);
    setEditModalIsOpen(false);
    setSelectedPayIn(null);
  };
  const calculateTotalReceivedAmount = () => {
    return selectedPayIn.rows.reduce((total, row) => {
      const receivedAmount = parseFloat(row.receivedAmount) || 0; // Ensure it's a number
      return total + receivedAmount;
    }, 0);
  };

  // Save changes after edit
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `/api/v1/payments/updatePayIn/${selectedPayIn._id}`,
        selectedPayIn
      );
      toast.success("Record updated successfully");
      closeModals();
      const response = await axios.get("/api/v1/payInRoute/getAllpayin");
      setPayIns(response.data.payInList);
    } catch (error) {
      toast.error("Error updating record");
      console.error("Error updating record:", error);
    }
  };

  // Handle input change for PayIn
  const handleInputChange = (field, value) => {
    setSelectedPayIn((prevPayIn) => ({
      ...prevPayIn,
      [field]: value,
    }));
  };

  // Handle changes in individual rows for Bill Details
  const handleBillRowChange = (index, field, value) => {
    const updatedRows = [...selectedPayIn.rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setSelectedPayIn((prevPayIn) => ({
      ...prevPayIn,
      rows: updatedRows,
    }));
  };

  // Add a new row
  const addRow = () => {
    setSelectedPayIn((prevPayIn) => ({
      ...prevPayIn,
      rows: [
        ...prevPayIn.rows,
        {
          _id: Math.random(),
          billNo: "",
          billAmount: "",
          receivedAmount: "",
          balanceAmount: "",
        },
      ],
    }));
  };

  // Remove a row
  const removeRow = (index) => {
    const updatedRows = selectedPayIn.rows.filter(
      (_, rowIndex) => rowIndex !== index
    );
    setSelectedPayIn((prevPayIn) => ({
      ...prevPayIn,
      rows: updatedRows,
    }));
  };

  // Delete a PayIn
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`/api/v1/payInRoute/deletePayIn/${id}`);
        toast.success("Record deleted successfully");
        setPayIns(payIns.filter((payIn) => payIn._id !== id));
      } catch (error) {
        toast.error("Error deleting record");
        console.error("Error deleting record:", error);
      }
    }
  };

  // Calculate total received amount
  // const calculateTotalReceivedAmount = () => {
  //   return selectedPayIn?.rows?.reduce(
  //     (total, row) => total + parseFloat(row.receivedAmount || 0),
  //     0
  //   );
  // };

  return (
    <div
      style={{ padding: "0px", backgroundColor: "#FFFFFF" }}
      className="responsive-container overflow-y-auto"
    >
      <ToastContainer />
      <h1 className="text-center text-3xl mt-3 mb-10">Manage Pay In</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-black border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-black">#</th>
              <th className="px-4 py-2 border text-black">Date</th>
              <th className="px-4 py-2 border text-black">Receipt No.</th>
              <th className="px-4 py-2 border text-black">Customer Name</th>
              <th className="px-4 py-2 border text-black">Receipt Mode</th>
              <th className="py-2 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {payIns.map((payIn, index) => (
              <tr key={payIn._id}>
                <td className="px-4 py-2 border text-black">{index + 1}</td>
                <td className="px-4 py-2 border text-black">
                  {payIn.date.split("T")[0]}
                </td>
                <td className="px-4 py-2 border text-black">
                  {payIn.receiptNo}
                </td>
                <td className="px-4 py-2 border text-black">
                  {payIn.selectCustomer}
                </td>
                <td className="px-4 py-2 border text-black">
                  {payIn.receiptMode}
                </td>
                <td className="px-4 py-2 border text-black">
                  <button
                    onClick={() => openViewModal(payIn)}
                    className="mx-1 text-black bg-green-500 rounded p-2"
                  >
                    <MdRateReview className="text-xl" />
                  </button>
                  <button
                    onClick={() => openEditModal(payIn)}
                    className="mx-1 text-black bg-blue-500 pl-3 pr-3 p-1 rounded"
                  >
                    <FiEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(payIn._id)}
                    className="mx-1 text-black bg-red-500 pl-3 pr-3 p-1 rounded"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {/* Edit Modal */}
      {selectedPayIn && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="Edit Pay In"
          className="modal overflow-y-auto"
          style={{
            content: {
              width: "100%",
              maxWidth: "800px",
              margin: "auto",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2 className="text-2xl text-center font-bold">Edit Pay In</h2>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Date</label>
              <input
                type="date"
                value={selectedPayIn.date.split("T")[0]}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt No.
              </label>
              <input
                type="text"
                value={selectedPayIn.receiptNo}
                onChange={(e) => handleInputChange("receiptNo", e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedPayIn.selectCustomer}
                onChange={(e) =>
                  handleInputChange("selectCustomer", e.target.value)
                }
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt Mode
              </label>
              <select
                value={receiptMode}
                onChange={(e) => {
                  setReceiptMode(e.target.value);
                  handleInputChange("receiptMode", e.target.value); // Update selectedPayIn state
                }}
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
                    onChange={(e) => {
                      setSelectBank(e.target.value);
                      handleInputChange("selectBank", e.target.value); // Update selectedPayIn state
                    }}
                    className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
                  >
                    <option value="Bank1">Bank1</option>
                    <option value="Bank2">Bank2</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-md font-bold text-black">Method</label>
                  <select
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      handleInputChange("method", e.target.value); // Update selectedPayIn state
                    }}
                    className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
                  >
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
                    onChange={(e) => {
                      setTransactionCheckNo(e.target.value);
                      handleInputChange("transactionCheckNo", e.target.value); // Update selectedPayIn state
                    }}
                    className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
                  />
                </div>
              </>
            )}
          </div>

          {/* Edit Bill Details */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-center">Edit Bill Details</h3>
            <div className="mt-4">
              <table className="min-w-full text-black border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border text-black">#</th>
                    <th className="px-4 py-2 border text-black">Bill No</th>
                    <th className="px-4 py-2 border text-black">Bill Amount</th>
                    <th className="px-4 py-2 border text-black">
                      Received Amount
                    </th>
                    <th className="px-4 py-2 border text-black">Balance</th>
                    <th className="px-4 py-2 border text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPayIn.rows.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-black">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="text"
                          value={row.billNo}
                          onChange={(e) =>
                            handleBillRowChange(index, "billNo", e.target.value)
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.billAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "billAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.receivedAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "receivedAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.balanceAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "balanceAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <button
                          onClick={() => removeRow(index)}
                          className="bg-red-500 text-white p-1 rounded-md"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button
                  onClick={addRow}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Add Row
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-5 mt-3 mb-3 lg:mr-28">
              <label className="text-2xl font-bold text-black mr-2">
                Total
              </label>
              <input
                type="text"
                value={calculateTotalReceivedAmount()} // Show calculated total
                readOnly
                className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
              />
            </div>

            {/* Narration */}
            <div className="flex flex-row justify-left gap-5">
              <label className="text-2xl font-bold text-black mr-2">
                Narration
              </label>
              <textarea
                className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
                value={Narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>
          </div>

          {/* Save and Close Buttons */}
          <div className="text-center mt-6">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white p-2 rounded-md mr-4"
            >
              Save
            </button>
            <button
              onClick={closeModals}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {selectedPayIn && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="Edit Pay In"
          className="modal overflow-y-auto"
          style={{
            content: {
              width: "100%",
              height: "100%",
              maxWidth: "800px",
              margin: "auto",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2 className="text-2xl text-center font-bold">Edit Pay In</h2>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Date</label>
              <input
                type="date"
                value={selectedPayIn.date.split("T")[0]}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt No.
              </label>
              <input
                type="text"
                value={selectedPayIn.receiptNo}
                onChange={(e) => handleInputChange("receiptNo", e.target.value)}
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedPayIn.selectCustomer}
                onChange={(e) =>
                  handleInputChange("selectCustomer", e.target.value)
                }
                className="mt-1 p-1 border border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt Mode
              </label>
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

          {/* Edit Bill Details */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-center">Edit Bill Details</h3>
            <div className="mt-4">
              <table className="min-w-full text-black border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border text-black">#</th>
                    <th className="px-4 py-2 border text-black">Bill No</th>
                    <th className="px-4 py-2 border text-black">Bill Amount</th>
                    <th className="px-4 py-2 border text-black">
                      Received Amount
                    </th>
                    <th className="px-4 py-2 border text-black">Balance</th>
                    <th className="px-4 py-2 border text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPayIn.rows.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-black">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="text"
                          value={row.billNo}
                          onChange={(e) =>
                            handleBillRowChange(index, "billNo", e.target.value)
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.billAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "billAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.receivedAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "receivedAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <input
                          type="number"
                          value={row.balanceAmount}
                          onChange={(e) =>
                            handleBillRowChange(
                              index,
                              "balanceAmount",
                              e.target.value
                            )
                          }
                          className="p-1 w-full border border-gray-500 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border text-black">
                        <button
                          onClick={() => removeRow(index)}
                          className="bg-red-500 text-white p-1 rounded-md"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button
                  onClick={addRow}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Add Row
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-5 mt-3 mb-3 lg:mr-28">
              <label className="text-2xl font-bold text-black mr-2">
                Total
              </label>
              <input
                type="text"
                value={calculateTotalReceivedAmount()} // Show calculated total
                readOnly
                className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
              />
            </div>

            {/* Narration */}
            <div className="flex flex-row justify-left gap-5">
              <label className="text-2xl font-bold text-black mr-2">
                Narration
              </label>
              <textarea
                type="text"
                className="p-1 border border-gray-500 w-1/2 rounded-md bg-gray-200"
                value={Narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>
          </div>

          {/* Save and Close Buttons */}
          <div className="text-center mt-6">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white p-2 rounded-md mr-4"
            >
              Save
            </button>
            <button
              onClick={closeModals}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagePayIn;
