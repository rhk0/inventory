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

  // Fetch PayIn records
  useEffect(() => {
    const fetchPayIns = async () => {
      try {
        const response = await axios.get("/api/v1/payInRoute/getAllpayin");
        setPayIns(response.data.payInList);
        console.log(response, "kfj");
      } catch (error) {
        console.error("Error fetching PayIns:", error);
        toast.error("Error fetching records");
      }
    };
    fetchPayIns();
  }, []);

  // Open and close modals
  const openViewModal = (payIn) => {
    setSelectedPayIn(payIn);
    setViewModalIsOpen(true);
  };

  const openEditModal = (payIn) => {
    setSelectedPayIn(payIn);
    setEditModalIsOpen(true);
  };

  const closeModals = () => {
    setViewModalIsOpen(false);
    setEditModalIsOpen(false);
  };

  // Handle save in edit modal
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `/api/v1/payments/updatePayIn/${selectedPayIn._id}`,
        selectedPayIn
      );
      toast.success("Record updated successfully");
      closeModals();
    } catch (error) {
      toast.error("Error updating record");
      console.error("Error updating record:", error);
    }
  };

  // Handle input changes in the edit modal
  const handleInputChange = (field, value) => {
    setSelectedPayIn((prevPayIn) => ({ ...prevPayIn, [field]: value }));
  };

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
  return (
    <div
      style={{ padding: "0px", backgroundColor: "#41B3A2" }}
      className="responsive-container"
    >
      <ToastContainer />
      <h1 className="text-center text-2xl bg-gray-500 mt-3 mb-10">
        Manage Pay In
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-green-600">
              <th className="px-1 py-2 border text-black">#</th>
              <th className="px-4 py-2 border text-black">Date</th>
              <th className="px-4 py-2 border text-black">Receipt No.</th>
              <th className="px-4 py-2 border text-black">Customer Name</th>
              <th className="px-4 py-2 border text-black">Receipt Mode</th>
              <th className="px-4 py-2 border text-black">Bill No.</th>
              <th className="px-4 py-2 border text-black">Bill Amount</th>
              <th className="px-4 py-2 border text-black">Received Amount</th>
              <th className="px-4 py-2 border text-black">Balance Amount</th>
              <th className="py-2 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {payIns.map((payIn, index) => (
              <React.Fragment key={payIn._id}>
                {payIn.rows.map((row, rowIndex) => (
                  <tr key={row._id}>
                    {rowIndex === 0 && (
                      <>
                        <td className="px-1 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{payIn.date}</td>
                        <td className="px-4 py-2 border">{payIn.receiptNo}</td>
                        <td className="px-4 py-2 border">
                          {payIn.selectCustomer}
                        </td>
                        <td className="px-4 py-2 border">
                          {payIn.receiptMode}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-2 border">{row.billNo}</td>
                    <td className="px-4 py-2 border">{row.billAmount}</td>
                    <td className="px-4 py-2 border">{row.recievedAmount}</td>
                    <td className="px-4 py-2 border">{row.balanceAmount}</td>
                    {rowIndex === 0 && (
                      <td
                        className="px-6 py-2 border-r text-sm text-nowrap"
                        rowSpan={payIn.rows.length}
                      >
                        <button
                          onClick={() => openViewModal(payIn)}
                          className="mx-1 text-white bg-green-500 rounded p-2 "
                        >
                          <MdRateReview className="text-xl" />
                        </button>
                        <button
                          onClick={() => openEditModal(payIn)}
                          className="mx-1 text-white bg-blue-500 pl-3 pr-3 p-1 rounded"
                        >
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          className="mx-1 text-white bg-red-500 pl-3 pr-3 p-1 rounded"
                          onClick={() => handleDelete(payIn._id)}
                        >
                          <MdDelete className="text-xl" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedPayIn && (
        <Modal
          isOpen={viewModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="View Pay In"
          className="modal"
          style={{
            content: {
              width: "80%",
              height: "80%",
              maxWidth: "800px",
              margin: "auto",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            },
          }}
        >
          <h2 className="text-2xl text-center font-bold">Pay In Details</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">Date</label>
              <input
                type="date"
                value={selectedPayIn.date}
                readOnly
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt No.
              </label>
              <input
                type="text"
                value={selectedPayIn.receiptNo}
                readOnly
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedPayIn.selectCustomer}
                readOnly
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-bold text-black">
                Receipt Mode
              </label>
              <input
                type="text"
                value={selectedPayIn.receiptMode}
                readOnly
                className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold mt-4">Bill Details:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white mt-2">
              <thead>
                <tr className="bg-green-600">
                  <th className="px-4 py-2 border text-black">Bill No.</th>
                  <th className="px-4 py-2 border text-black">Bill Amount</th>
                  <th className="px-4 py-2 border text-black">
                    Received Amount
                  </th>
                  <th className="px-4 py-2 border text-black">
                    Balance Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPayIn.rows.map((row) => (
                  <tr key={row._id}>
                    <td className="px-4 py-2 border">{row.billNo}</td>
                    <td className="px-4 py-2 border">{row.billAmount}</td>
                    <td className="px-4 py-2 border">{row.recievedAmount}</td>
                    <td className="px-4 py-2 border">{row.balanceAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={closeModals}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </Modal>
      )}

      {/* Edit Modal */}
      {selectedPayIn && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="Edit Pay In"
          className="modal"
        >
          <h2>Edit Pay In</h2>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={selectedPayIn.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>
          <div>
            <label>Receipt No.</label>
            <input
              type="text"
              value={selectedPayIn.receiptNo}
              onChange={(e) => handleInputChange("receiptNo", e.target.value)}
            />
          </div>
          {/* Add more editable fields here */}
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={closeModals}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ManagePayIn;
