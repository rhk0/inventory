import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [Items, setItems] = useState([
    {
      id: 1,
      itemcode: "",
      itemName: "",
      hsnCode: "",
      qty: 0,
      rate: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    invoiceNo: "",
    reverseCharge: "",
    placeOfSupply: "",
    paymentsTerms: "",
    dueDate: "",
    taxType: "",
    billingAddress: "",
    shippingAddress: "",
    customerType: "",
    Items: [],
    subTotal:"",
    charges:"",
    discount:"",
    taxAmount:"",

  });

  const addProduct = (index) => {
    const newProduct = {
      id: Items.length + 1,
      itemcode: "",
      itemName: "",
      hsnCode: "",
      qty: 0,
      taxable:0,
      rate: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 0,
    };
    const newItems = [...Items];
    newItems.splice(index + 1, 0, newProduct);
    setItems(newItems);
  };

  const removeProduct = (id) => {
    setItems(Items.filter((product) => product.id !== id));
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...Items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      selectedCustomer,
      Items,
    };

    try {
      const response = await axios.post(
        "/api/v1/salesQuationRoute/createSalesQuotaition",
        data
      );
      if (response) {
        toast.success("invoice Created Successfully...");
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="responsive-container p-4 bg-white shadow-md rounded-lg">
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

      <form className="print">
        <h1 className="text-center text-3xl mb-4 font-bold bg-gray-200">
          Invoice
        </h1>
        <div className="p-4 border-b border-gray-300 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4  gap-4">
            <div>
              <label className="block font-bold">Date</label>
              <input
                type="date"
                name="date"
                className="border p-2 rounded w-full"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold">Invoice No</label>
              <input
                type="text"
                name="invoiceNo"
                className="border p-2 rounded w-full"
                value={formData.invoiceNo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="customer" className="block font-bold">
                Select Customer
              </label>
              <select
                id="customer"
                name="selectedCustomer"
                value={formData.selectedCustomer}
                onChange={handleCustomerChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Customer</option>
              </select>
            </div>
            <div>
              <label className="block font-bold">Reverse Charge</label>
              <select
                name="reverseCharge"
                className="border p-2 rounded w-full"
                value={formData.reverseCharge}
                onChange={handleInputChange}
              >
                <option>select Reverse Charge</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block font-bold">Place of Supply</label>
              <input
                type="text"
                name="placeOfSupply"
                className="border p-2 rounded w-full"
                value={formData.placeOfSupply}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold">Payment Terms</label>
              <input
                type="text"
                name="paymentsTerms"
                className="border p-2 rounded w-full"
                value={formData.paymentsTerms}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="border p-2 rounded w-full"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold">Tax Type</label>
              <select
                name="taxType"
                className="border p-2 rounded w-full"
                value={formData.taxType}
                onChange={handleInputChange}
              >
                <option>select Tax Type</option>
                <option value="sgst/cgst">SGST/CGST</option>
                <option value="igst">IGST</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Billing Address</label>
              <textarea
                name="billingAddress"
                className="border p-2 rounded w-full"
                rows="3"
                value={formData.billingAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label className="block font-bold">Shipping Address</label>
              <textarea
                name="shippingAddress"
                className="border p-2 rounded w-full"
                rows="3"
                value={formData.shippingAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label className="block font-bold">Customer Type</label>
              <select
                name="taxType"
                className="border p-2 rounded w-full"
                value={formData.customerType}
                onChange={handleInputChange}
              >
                <option>select Tax Type</option>  
                <option value="wholesale">Wholesale</option>
                <option value="retail">Retail</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 mt-4 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Product Details</h3>
          </div>
          <table className="w-full border ">
            <thead>
              <tr>
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Itemcode</th>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">HSN Code</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Taxable Value</th>
                
                <th className="border p-2">Rate</th>
                {formData.taxType === "sgst/cgst" && (
                  <>
                    <th className="border p-2">CGST</th>
                    <th className="border p-2">SGST</th>
                  </>
                )}
                {formData.taxType === "igst" && (
                  <th className="border p-2">IGST</th>
                )}
                <th className="border p-2">Total</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Items.map((product, index) => (
                <tr key={product.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="itemcode"
                      className="border p-2 w-full"
                      value={product.itemcode}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="itemName"
                      className="border p-2 w-full"
                      value={product.itemName}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="hsnCode"
                      className="border p-2 w-full"
                      value={product.hsnCode}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="qty"
                      className="border p-2 w-full"
                      value={product.qty}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="taxable"
                      className="border p-2 w-full"
                      value={product.taxable    }
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="rate"
                      className="border p-2 w-full"
                      value={product.rate}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  {formData.taxType === "sgst/cgst" && (
                    <>
                      <td className="border p-2">
                        <input
                          type="number"
                          name="cgst"
                          className="border p-2 w-full"
                          value={product.cgst}
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          name="sgst"
                          className="border p-2 w-full"
                          value={product.sgst}
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                    </>
                  )}
                  {formData.taxType === "igst" && (
                    <td className="border p-2">
                      <input
                        type="number"
                        name="igst"
                        className="border p-2 w-full"
                        value={product.igst}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                  )}
                  <td className="border p-2">
                    {(
                      product.rate * product.qty +
                      (product.rate * product.qty * product.cgst) / 100 +
                      (product.rate * product.qty * product.sgst) / 100 +
                      (product.rate * product.qty * product.igst) / 100
                    ).toFixed(2)}
                  </td>
                  <td className="border p-2 flex gap-2">
                    <button
                      className="bg-green-500 text-white rounded-md pl-3 pr-3 pt-0 pb-0 text-2xl"
                      onClick={() => addProduct(index)}
                      type="button"
                    >
                      +
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md p-2 pl-3 pr-3 pt-0 pb-0 text-2xl"
                      onClick={() => removeProduct(product.id)}
                      type="button"
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t">
          <div className="flex justify-end bg-gray-100">
            <div className="flex gap-5 text-right ">
              <div className="mb-2">
                <span className="block font-bold mb-4">Tax Total:</span>
                <span className="block font-bold ">Net Amount:</span>
              </div>
              <div>
                <span className="block mb-4 font-bold">
                  Rs.{" "}
                  {Items.reduce(
                    (acc, product) =>
                      acc +
                      (product.rate * product.qty * product.cgst) / 100 +
                      (product.rate * product.qty * product.sgst) / 100 +
                      (product.rate * product.qty * product.igst) / 100,
                    0
                  ).toFixed(2)}
                </span>
                <span className="block font-bold">
                  Rs.{" "}
                  {Items.reduce(
                    (acc, product) =>
                      acc +
                      product.rate * product.qty +
                      (product.rate * product.qty * product.cgst) / 100 +
                      (product.rate * product.qty * product.sgst) / 100 +
                      (product.rate * product.qty * product.igst) / 100,
                    0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handlePrint}
          >
            print
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Invoice;
