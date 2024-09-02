import React from 'react';

function AddReceiptModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Add Receipt</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="itemCode"
            placeholder="Item Code"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className="border p-2 mb-2 w-full"
          />
          {/* Add other fields as needed */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReceiptModal;
