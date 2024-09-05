import React, { useState } from "react";
import Modal from "react-modal";

// React Modal setup
Modal.setAppElement("#root");

const ManageExpense = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Functions to open and close modals
  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="p-4 responsive-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Expense</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="text-black">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Date</th>
              <th className="py-2 px-4 border border-gray-300">Exp no.</th>
              <th className="py-2 px-4 border border-gray-300">Expense Type</th>
              <th className="py-2 px-4 border border-gray-300">Vendor Name</th>
              <th className="py-2 px-4 border border-gray-300">Expense</th>
              <th className="py-2 px-4 border border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">--</td>
              <td className="py-2 px-4 border border-gray-300">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={openViewModal}
                >
                  View
                </button>{" "}
                /
                <button
                  className="text-green-500 hover:underline mx-2"
                  onClick={openEditModal}
                >
                  Edit
                </button>{" "}
                /
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* View Modal */}

      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        contentLabel="View Brand Modal"
        style={{
          content: {
            width: "50%",
            height: "50%",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">View Expense</h2>
        <p>
          <strong>Date:</strong> --
        </p>
        <p>
          <strong>Expense No.:</strong> --
        </p>
        <p>
          <strong>Expense Type:</strong> --
        </p>
        <p>
          <strong>Gst Type:</strong> --
        </p>
        <p>
          <strong>Vendor Name:</strong> --
        </p>
        <p>
          <strong>Expense:</strong> --
        </p>
        <p>
          <strong>Amount:</strong> --
        </p>
        <p>
          <strong>Gst Rate:</strong> --
        </p>
        <p>
          <strong>CGST Amount:</strong> --
        </p>
        <p>
          <strong>SGST Amount:</strong> --
        </p>
        <p>
          <strong>Total Amount:</strong> --
        </p>
        <p>
          <strong>Narration:</strong> --
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={closeViewModal}
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="View Brand Modal"
        style={{
          content: {
            width: "50%",
            height: "50%",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expense No.</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expense Type</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">GST Type</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Vendor Name</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expense</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Amount</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">GST Rate</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">CGST Amount</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">SGST Amount</label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Total Amount</label>
            <input
              type="number"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Narration</label>
            <input
              type="number"
              className="border border-gray-300 py-2 px-4 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 text-black py-2 px-4 rounded"
              onClick={closeEditModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageExpense;
