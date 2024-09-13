import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchesReturn = () => {
  const [suppliers, setSuppliers] = useState([]); // State to store supplier data
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageSupplier");
        setSuppliers(response.data.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

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
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 10px;
            }
            .header, .section-header, .table th {
              color: red;
              font-weight: bold;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              font-size: 24px;
            }
            .receipt-details .section-header {
              color: green;
              font-size: 16px;
            }
            .customer-details .section-header {
              color: green;
              font-size: 16px;
            }
            .sales-estimate .section-header {
              color: blue;
              font-size: 16px;
            }
            .transport-details .section-header, .amount-details .section-header {
              color: blue;
              font-size: 16px;
            }
            .terms .section-header {
              color: red;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th, .table td {
              border: 1px solid black;
              padding: 5px;
              text-align: center;
              font-size: 12px;
            }
            .table th {
              background-color: #ff0000; /* Red header */
              color: black;
            }
            .details {
              font-size: 12px;
              margin-bottom: 5px;
            }
            .signature {
              text-align: right;
              margin-top: 50px;
              font-size: 12px;
            }
            .heades {
              text-align: center;
              color: blue;
              font-size: 24px;
            }
          </style>

        </head>
        <body>
         <div style="color: blue; font-size: 24px; font-weight: bold;" class="">Logo</div>
          <div class="header">
          
            <div class="business-name">Business Name</div>
            <div>Address: Your Address Here</div>
            <div>GSTIN: Your GSTIN Here</div>
          </div>
  
          <table class="table">
             <tr>
                  <th colspan="100%" style="color: blue; font-size: 24px; font-weight: bold; text-align: center;" class="heades">
                  Purchase Return
                  </th>
              </tr>


         
            <tr>
              <td style="width: 30%;">
                <div style="text-align:left;" class="customer-details">
                  <div class="section-header">Customer Details</div>
                  <div class="details">Name: <span>John Doe</span></div>
                  <div class="details">Address: <span>123 Main St, City</span></div>
                  <div class="details">Contact: <span>9876543210</span></div>
                  <div class="details">GSTIN: <span>22AAAAA0000A1Z5</span></div>
                </div>
              </td>
              <td style="width: 30%;">
                <div style="text-align:left;" class="sales-estimate">
                  <div class="section-header"> Return Details</div>
                  <div class="details">Note No.: <span>12345</span></div>
                  <div class="details"> Date: <span>01-Jan-2024</span></div>
                  <div class="details">Purchase Invoice: <span>City Name</span></div>
                   <div class="details">Place of Supply: <span>City Name</span></div>
                   <div class="details">Place of Supply: <span>City Name</span></div>
                   <div class="details">Reason for Return: <span>City Name</span></div>
                </div>
              </td>
              <td style="width: 40%;">
                <div style="text-align:left;" class="transport-details">
                  <div class="section-header">Transport Details</div>
                  <div class="details">Receipt Doc No.: <span>6789</span></div>
                  <div class="details">Dispatch Through: <span>Courier Service</span></div>
                   <div class="details">Agent Name: <span>John Smith</span></div>
                   <div class="details">Bill of lading : <span>John Smith</span></div>
                  <div class="details">Vehicle Number: <span>MH12AB1234</span></div>
                </div>
              </td>
            </tr>
          </table>
  
          <table class="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>HSN Code</th>
                <th>UOM</th>
                <th>QTY</th>
                
                <th>MRP</th>
                <th>Unit Cost</th>
                <th>Scheme Margin %</th>
                <th>Discount</th>
               
                <th>Taxable Value</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <!-- Add your product rows here -->
              <tr>
                <td>1</td>
                <td>Product Name</td>
                <td>1234</td>
                <td>10</td>
                <td>10</td>
                <td>KG</td>
                <td>500</td>
                 <td>10%</td>
                <td>10%</td>
             
                <td>4500</td>
                <td>9%</td>
                <td>9%</td>
                <td>5310</td>
              </tr>
            </tbody>
          </table>
          
  
            <table  style="margin-top:60px ; margin-left:50px">
              <tr>
                <td style="width: 50%;">
                <div class="section-header">Narration :     narration</div>
              </td>
                <td style="width: 33.33%; text-align: left;">
                  <div class="amount-details">
                    <div class="section-header">Amount Details</div>
                    <div class="details">Gross Total: ₹10000</div>
                    <div class="details">GST Amount: ₹1800</div>
                    <div class="details">Additional Charges: ₹200</div>
                    <div class="details">Net Total: ₹12000</div>  
                    <div class="details">Amount in Words: Twelve Thousand Only</div>
                  </div>
                </td>
              </tr>
            </table>
          <div  class="signature">
         
          
            <div>For (Business Name)</div>
            <div style="margin-top: 20px;">Signature</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    printWindow.print();
    printWindow.close();
  };

  const [date, setDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState("");
  const [amount, setAmount] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = () => {
    // You can add logic to save or process the charges and amount here
    console.log("Other Charges:", otherCharges);
    console.log("Amount:", amount);
    setIsModalOpen(false); // Close the modal after saving
  };

  // Function to update the due date based on payment terms
  const updateDueDate = (selectedDate, terms) => {
    if (!selectedDate || !terms) return;

    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + parseInt(terms));

    const formattedDueDate = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setDueDate(formattedDueDate);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    updateDueDate(selectedDate, paymentTerms);
  };

  const handlePaymentTermsChange = (e) => {
    const terms = e.target.value;
    setPaymentTerms(terms);
    updateDueDate(date, terms);
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
        Purchase Return
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Supplier Name</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedSupplier}
            onChange={handleSupplierChange}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Date</label>
          <input
            type="date"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Debit Note No.</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Contact or name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Payment Terms</label>
          <input
            type="number"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
            placeholder="Enter terms in days"
            value={paymentTerms}
            onChange={handlePaymentTermsChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Due Date</label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200"
            value={dueDate}
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Billing Address
          </label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Contact or name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Select Purchase
          </label>
          <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
            <option value="Cash"></option>
            <option value="Online"></option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-md font-bold text-black">
            Reason for Return
          </label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-bold text-black">Tax Type</label>
          <select className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200">
            <option value="Cash"></option>
            <option value="Online"></option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 print">
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-500 p-1">#</th>
              <th className="border border-gray-500 p-1">Item Code</th>
              <th className="border border-gray-500 p-1 text-nowrap pl-16 pr-16">
                Product Name
              </th>
              <th className="border border-gray-500 p-1">HSN</th>
              <th className="border border-gray-500 p-1">UOM</th>
              <th className="border border-gray-500 p-1">Qty</th>
              <th className="border border-gray-500 p-1">Free Qty</th>
              <th className="border border-gray-500 p-1">MRP</th>
              <th className="border border-gray-500 p-1 text-nowrap">
                Unit Cost
              </th>
              <th className="border border-gray-500 p-1 text-nowrap">
                Scheme Margin
              </th>
              <th className="border border-gray-500 p-1 text-xs">
                Discount
                <span className="mt-1 gap-10 flex text-center justify-center">
                  <span>%</span>
                  <span>RS</span>
                </span>
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

      <div className="mt-4  flex justify-center item-center gap-5">
        <div className=" ">
          <button
            onClick={toggleModal}
            className="bg-black hide-on-print text-white py-2 rounded px-10 text-xl font-bold hover:bg-gray-700"
          >
            Add Other Charges
          </button>
        </div>
        <div className="">
          <input
            type="file"
            className="mt-1 p-1 ml-3 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Upload Document"
          />
        </div>
      </div>
      <div className="mt-4  flex justify-left item-left gap-5">
        <div className="">
          <label className="text-md font-bold text-black mb-5">Narration</label>
          <textarea
            type="text"
            className="mt-1 p-1  w-full border border-gray-500 rounded-md bg-gray-200 "
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center w-full justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Other Charges</h2>

            {/* Other Charges Input */}
            <div className="mb-4">
              <label className="block text-md font-bold text-black mb-2">
                Other Charges
              </label>
              <input
                type="text"
                value={otherCharges}
                onChange={(e) => setOtherCharges(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-gray-200"
                placeholder="Enter other charges"
              />
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-md font-bold text-black mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-gray-200"
                placeholder="Enter amount"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white py-2 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4  flex flex-col items-end">
        <div className=" ">
          <label className="text-md font-bold text-black mr-3">
            Gross Amount
          </label>
          <input
            type="text"
            className="mt-1 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Gross Amount"
          />
        </div>
        <div className=" ">
          <label className="text-md font-bold text-black">GST Amount</label>
          <input
            type="text"
            className="mt-1 ml-3 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="GST Amount"
          />
        </div>
        <div className=" ">
          <label className="text-md font-bold text-black">Other Charges</label>
          <input
            type="text"
            className="mt-1 ml-3 p-1 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="GST Amount"
          />
        </div>
        <div className="">
          <label className="text-md font-bold text-black">Net Amount</label>
          <input
            type="text"
            className="mt-1 p-1 ml-3 border border-gray-500 rounded-md bg-gray-200 "
            placeholder="Net Amount"
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={print}
          className="bg-black mr-3 hide-on-print text-white py-2 rounded px-10 text-xl font-bold hover:bg-gray-700"
        >
          Save
        </button>
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

export default PurchesReturn;
