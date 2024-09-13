import React, { useState } from "react";
import Modal from "react-modal";

const ManagePayOut = () => {
  const [rows, setRows] = useState([
    { invoiceNo: "", paymentAmount: "", balanceAmount: "" },
  ]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // Open view modal
  const handleView = () => {
    setViewModal(true);
  };

  // Open edit modal
  const handleEdit = () => {
    setEditModal(true);
  };

  const closeModals = () => {
    setViewModal(false);
    setEditModal(false);
  };

  // Remove a row
  const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { invoiceNo: "", paymentAmount: "", balanceAmount: "" }]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <div className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto">
      <h1 className="text-center text-3xl bg-gray-100 text-black cucolor">
        Manage Pay Out
      </h1>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300">No.</th>
            <th className="border border-gray-300 p-2">Invoice No</th>
            <th className="border border-gray-300 p-2">Payment Amount</th>
            <th className="border border-gray-300 p-2">Balance Amount</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{index + 1}</td>
              <td className="border border-gray-300 p-2">{row.invoiceNo}</td>
              <td className="border border-gray-300 p-2">
                {row.paymentAmount}
              </td>
              <td className="border border-gray-300 p-2">
                {row.balanceAmount}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2 justify-center">
                <button
                  className="bg-blue-500 text-white p-1 rounded"
                  onClick={() => handleView(index)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 text-white p-1 rounded"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Modal
        isOpen={viewModal}
        onRequestClose={closeModals}
        contentLabel="View Category Modal"
        style={{
          content: {
            width: "100%",
            height: "100%",
            maxWidth: "1200px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div
          className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
          style={{ backgroundColor: "pink" }}
        >
          <h1 className="text-center text-3xl bg-gray-100 text-black cucolor">
            View PayOut
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
              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="">Select Payment Mode</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {" "}
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
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">No.</th>
                  <th className="border border-gray-300 p-2">Invoice No.</th>
                  <th className="border border-gray-300 p-2">Invoice Amount</th>
                  <th className="border border-gray-300 p-2">Payment Amount</th>
                  <th className="border border-gray-300 p-2">Balance Amount</th>
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
                        cd
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
            onClick={closeModals}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onRequestClose={closeModals}
        contentLabel="View Category Modal"
        style={{
          content: {
            width: "100%",
            height: "100%",
            maxWidth: "1200px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div
          className="responsive-container bg-pink-200 p-4 rounded-md w-full mx-auto"
          style={{ backgroundColor: "pink" }}
        >
          <h1 className="text-center text-3xl bg-gray-100 text-black cucolor">
            Edit PayOut
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
              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="">Select Payment Mode</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {" "}
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
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">No.</th>
                  <th className="border border-gray-300 p-2">Invoice No</th>
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
          </div>

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
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
            <button className="bg-blue-500 text-white p-2 rounded w-full md:w-auto">
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded w-full md:w-auto"
              onClick={closeModals}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManagePayOut;
