import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const QuotationEditModel = ({ closeModal, QuotationData }) => {
  const [formData, setFormData] = useState(QuotationData);

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("rows")) {
      const rowIndex = parseInt(name.split("[")[1].split("]")[0], 10);
      const fieldName = name.split("].")[1];

      const updatedRows = formData.rows.map((row, i) =>
        i === rowIndex ? { ...row, [fieldName]: value } : row
      );

      setFormData({
        ...formData,
        rows: updatedRows,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/v1/salesQuationRoute/updateSalesQuotation/${formData._id}`, formData);
      if (response.data.success) {
        toast.success("Quotation updated successfully...");
        closeModal();
      } else {
        console.error("Failed to update Quotation");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative responsive-container p-4 bg-white shadow-md rounded-lg">
      <button
        className="absolute mb-4 right-2 p-1 text-white bg-black text-xl focus:outline-none md:text-2xl md:right-4 border"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
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

            .hide-on-print button {
              display: none !important;
            }
          }

          html, body {
            width: 210mm;
          }
        `}
      </style>

      <form className="print">
        <h1 className="text-center text-3xl mb-4 font-bold bg-gray-200 p-2">
          Quotation
        </h1>
        <div className="p-4 border-b border-gray-300 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Date", name: "date", type: "date" },
              { label: "Quotation No", name: "quotationNo", type: "text" },
              {
                label: "Select Customer",
                name: "selectCustomer",
                type: "text",
              },
              { label: "Reverse Charge", name: "reverseCharge", type: "text" },
              { label: "Place of Supply", name: "placeOfSupply", type: "text" },
              { label: "Payment Terms", name: "paymentsTerms", type: "text" },
              { label: "Due Date", name: "dueDate", type: "date" },
              { label: "Tax Type", name: "taxType", type: "text" },
            ].map((field, index) => (
              <div key={index}>
                <label className="block font-bold">{field.label}</label>
                <input
                  className="border p-2 rounded w-full block bg-white"
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Billing Address</label>
              <textarea
                name="billingAddress"
                className="border p-2 rounded w-full"
                value={formData.billingAddress || ""}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            <div>
              <label className="block font-bold">Shipping Address</label>
              <textarea
                name="shippingAddress"
                className="border p-2 rounded w-full"
                value={formData.shippingAddress || ""}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 mt-4 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Product Details</h3>
          </div>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Item Code</th>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">HSN Code</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">CGST</th>
                <th className="border p-2">SGST</th>
                <th className="border p-2">IGST</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {formData?.rows?.map((product, index) => (
                <tr key={product._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].itemCode`}
                      value={product.itemCode || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].itemName`}
                      value={product.itemName || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].hsnCode`}
                      value={product.hsnCode || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].qty`}
                      value={product.qty || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].rate`}
                      value={product.rate || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].cgst`}
                      value={product.cgst || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].sgst`}
                      value={product.sgst || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].igst`}
                      value={product.igst || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].total`}
                      value={product.total || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t">
          <div className="flex justify-end bg-gray-100 p-4">
            <div className="text-right">
              <div className="mb-2">
                <span className="block font-bold">
                  Tax Total: {formData?.taxAmount}
                </span>
              </div>
              <div>
                <span className="block font-bold">
                  Net Amount: {formData?.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            type="button"
            className="bg-green-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationEditModel;
