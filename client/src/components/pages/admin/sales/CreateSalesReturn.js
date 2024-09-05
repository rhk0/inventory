import React, { useState, useEffect } from "react";
import AddReceiptModal from "../modals/AddReciptModel";
import Modal from "react-modal";
const CreateSalesReturn = () => {
  // State for form fields
  const [viewModal, setViewModal] = useState(false);
  const [date, setDate] = useState("");
  const [estimateNo, setEstimateNo] = useState("");
  const [salesType, setSalesType] = useState("GST Invoice");
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [otherChargesDescriptions, setotherChargesDescriptions] = useState("");
  const [transportDetails, setTransportDetails] = useState({
    receiptDocNo: "",
    dispatchedThrough: "",
    destination: "",
    carrierNameAgent: "",
    billOfLading: "",
    motorVehicleNo: "",
  });
  const [billingAddress, setBillingAddress] = useState("");
  const [reverseCharge, setReverseCharge] = useState("No");
  const [gstType, setGstType] = useState("CGST/SGST");
  const [rows, setRows] = useState([]);
  // const [date, setDate] = useState('');
  const [paymentTerm, setPaymentTerm] = useState(0);
  // const [dueDate, setDueDate] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);

  // Function to handle "Other Charges" button click
  const handleOtherChargesChange = (event) => {
    const newCharges = parseFloat(event.target.value) || 0;
    setOtherCharges(newCharges);
    setTotalValue((prevTotal) => prevTotal + newCharges);
  };

  useEffect(() => {
    if (date && paymentTerm) {
      const selectedDate = new Date(date);
      selectedDate.setDate(selectedDate.getDate() + parseInt(paymentTerm));

      // Format the due date as DD-MMM-YYYY
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = selectedDate.toLocaleString("en-US", { month: "short" });
      const year = selectedDate.getFullYear();
      const formattedDueDate = `${day}-${month}-${year}`;

      setDueDate(formattedDueDate);
    }
  }, [date, paymentTerm]);

  // const [date, setDate] = useState('');
  // const [paymentTerms, setPaymentTerms] = useState('');
  // const [dueDate, setDueDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
    updateDueDate(e.target.value, paymentTerms);
  };

  const handlePaymentTermsChange = (e) => {
    setPaymentTerms(e.target.value);
    updateDueDate(date, e.target.value);
  };

  const updateDueDate = (selectedDate, terms) => {
    if (selectedDate && terms) {
      const dateObj = new Date(selectedDate);
      dateObj.setDate(dateObj.getDate() + parseInt(terms, 10));
      const formattedDueDate = dateObj.toISOString().split("T")[0];
      setDueDate(formattedDueDate);
    }
  };
  const handleGstTypeChange = (e) => {
    setGstType(e.target.value);
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  // Handlers for each form element
  // const handleDateChange = (e) => setDate(e.target.value);
  const handleEstimateNoChange = (e) => setEstimateNo(e.target.value);
  const handleSalesTypeChange = (e) => setSalesType(e.target.value);
  const handleCustomerTypeChange = (e) => setCustomerType(e.target.value);
  const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
  const handlePlaceOfSupplyChange = (e) => setPlaceOfSupply(e.target.value);
  // const handlePaymentTermsChange = (e) => setPaymentTerms(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handleBillingAddressChange = (e) => setBillingAddress(e.target.value);
  const handleReverseChargeChange = (e) => setReverseCharge(e.target.value);

  // Function to handle transport detail change
  const handleTransportDetailChange = (field, value) => {
    setTransportDetails((prev) => ({ ...prev, [field]: value }));
  };
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    const newValue = parseFloat(value) || 0;
    newRows[index] = { ...newRows[index], [field]: newValue };

    // Calculate taxable value, GST, and total value
    const { qty, mrp, discount } = newRows[index];
    const taxableValue = qty * mrp - discount;
    const cgst = gstType === "CGST/SGST" ? taxableValue * 0.09 : 0;
    const sgst = gstType === "CGST/SGST" ? taxableValue * 0.09 : 0;
    const igst = gstType === "IGST" ? taxableValue * 0.18 : 0;
    const totalValue = taxableValue + cgst + sgst + igst;

    newRows[index] = {
      ...newRows[index],
      taxableValue,
      cgst,
      sgst,
      igst,
      totalValue,
    };
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

  const calculateTotals = () => {
    let grossAmount = 0;
    let totalGstAmount = 0;

    rows.forEach((row) => {
      grossAmount += row.taxableValue;
      totalGstAmount += row.cgst + row.sgst + row.igst;
    });

    const netAmount = grossAmount + totalGstAmount;
    return { grossAmount, totalGstAmount, netAmount };
  };
  const openViewModal = (suppliers) => {
    setViewModal(true);
  };
  const closeModal = () => {
    setViewModal(false);
  };

  const { grossAmount, totalGstAmount, netAmount } = calculateTotals();

  // Function to handle Save
  const handleSave = () => {
    // Implement save functionality
  };

  // Function to handle Save and Print
  const handleSaveAndPrint = () => {
    // Implement save and print functionality
  };

  // Function to add a new row
  // const addRow = () => {
  //   setRows([
  //     ...rows,
  //     {
  //       itemCode: "",
  //       productName: "",
  //       hsnCode: "",
  //       qty: 0,
  //       uom: "",
  //       mrp: 0,
  //       discount: 0,
  //       taxableValue: 0,
  //       cgst: 0,
  //       sgst: 0,
  //       igst: 0,
  //       totalValue: 0,
  //     },
  //   ]);
  // };

  // Function to remove a row
  // const removeRow = (index) => {
  //   if (rows.length > 1) {
  //     setRows(rows.filter((_, i) => i !== index));
  //   }
  // };
  const handlePrint = () => {
    window.print();
  };

  const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  const closeReceiptModal = () => setIsReceiptModalOpen(false);
  return (
    <>
      <div
        style={{ backgroundColor: "#82ac73" }}
        className="p-4 responsive-container"
      >
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
        {/* Top Section */}
        <div className="print">
          <h1 className="text-center font-bold text-3xl bg-gray-500 text-white">
            Create Sales Return
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4   gap-4 mb-4">
            <div>
              <label className="font-bold">
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border p-2 w-full  rounded"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Sales Type</label>
              <select
                value={salesType}
                onChange={handleSalesTypeChange}
                className="border p-2 w-full   rounded"
              >
                <option value="GST Invoice">GST Invoice</option>
                <option value="Bill of Supply">Bill of Supply</option>
              </select>
            </div>
            <div>
              <label className="font-bold">Credit Note No</label>
              <input
                type="text"
                value={estimateNo}
                onChange={handleEstimateNoChange}
                className="border p-2 w-full  rounded"
              />
            </div>
            <div>
              <label className="font-bold">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={handleCustomerNameChange}
                className="border p-2 w-full  rounded"
              />
            </div>
            <div>
              <label className="font-bold">Place of Supply</label>
              <input
                type="text"
                value={placeOfSupply}
                onChange={handlePlaceOfSupplyChange}
                className="border p-2 w-full  rounded"
              />
            </div>
            <div>
              <label className="font-bold">
                Payment Term (days):
                <input
                  type="number"
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  className="border p-2 w-full  rounded"
                />
              </label>
            </div>

            <div>
              <label className="font-bold">
                Due Date
                <input
                  type="text"
                  value={dueDate}
                  // onChange={(e) => setPaymentTerm(e.target.value)}
                  className="border p-2 w-full text-black rounded"
                />
              </label>
            </div>

            {/* Billing Address Section */}
          </div>
          {/* Transport Details Section */}
          <div className="mb-4">
            {/* <h4 className="font-bold">Transport Details</h4> */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2"
            >
              Transport Details
            </button>
          </div>

          {/* Modal for Transport Details */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
                <h4 className="font-bold mb-4">Transport Details</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label>Dispatched Through</label>
                    <input
                      type="text"
                      value={transportDetails.dispatchedThrough}
                      onChange={(e) =>
                        handleTransportDetailChange(
                          "dispatchedThrough",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                  <div>
                    <label>Destination</label>
                    <input
                      type="text"
                      value={transportDetails.destination}
                      onChange={(e) =>
                        handleTransportDetailChange(
                          "destination",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                  <div>
                    <label>Carrier Name/Agent</label>
                    <input
                      type="text"
                      value={transportDetails.carrierNameAgent}
                      onChange={(e) =>
                        handleTransportDetailChange(
                          "carrierNameAgent",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                  <div>
                    <label>Bill of Lading/LR-RR No.</label>
                    <input
                      type="text"
                      value={transportDetails.billOfLading}
                      onChange={(e) =>
                        handleTransportDetailChange(
                          "billOfLading",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white p-2 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-blue-500 text-white p-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div className="mb-4 font-bold">
              <label>Billing Address</label>
              <textarea
                value={billingAddress}
                onChange={handleBillingAddressChange}
                className="border p-2 w-full  rounded"
              />
            </div>
            {/* Reverse Charge Section */}
            <div className="mb-4 w-full">
              <label className="font-bold"> Reverse Charge</label>
              <select
                value={reverseCharge}
                onChange={handleReverseChargeChange}
                className="border p-2 w-full  rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* GST Type Section */}
            {salesType === "GST Invoice" && (
              <div className="mb-4 w-full">
                <label className="font-bold">GST Type:</label>
                <select
                  value={gstType}
                  onChange={handleGstTypeChange}
                  className="border p-2 w-full  rounded"
                >
                  <option value="CGST/SGST">CGST/SGST</option>
                  <option value="IGST">IGST</option>
                </select>
              </div>
            )}
            <div className="mb-4 font-bold">
              <label>Reason for Return </label>
              <input
                value={billingAddress}
                onChange={handleBillingAddressChange}
                className="border p-2 w-full  rounded"
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse  overflow-x-auto">
              <thead>
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border text-nowrap p-2">Item Code</th>
                  <th className="border text-nowrap p-2">Product Name</th>
                  <th className="border text-nowrap p-2">HSN Code</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">UOM</th>
                  <th className="border p-2">MRP</th>
                  <th className="border p-2">
                    Discount
                    <div className="flex">
                      <span className="mr-16">%</span> <span>RS</span>
                    </div>
                  </th>
                  {salesType === "GST Invoice" && (
                    <>
                      <th className="border text-nowrap p-2">Taxable Value</th>
                      {gstType === "CGST/SGST" && (
                        <>
                          <th className="border p-2">
                            CGST
                            <div className="flex">
                              <span className="mr-16">%</span> <span>RS</span>
                            </div>
                          </th>
                          <th className="border p-2">
                            SGST
                            <div className="flex">
                              <span className="mr-16">%</span> <span>RS</span>
                            </div>
                          </th>
                        </>
                      )}
                      {gstType === "IGST" && (
                        <th className="border p-2">
                          IGST <br />
                          <div className="flex">
                            <span className="mr-16">%</span> <span>RS</span>
                          </div>
                        </th>
                      )}
                    </>
                  )}
                  <th className="border text-nowrap p-2">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.itemCode}
                        onChange={(e) =>
                          handleRowChange(index, "itemCode", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.productName}
                        onChange={(e) =>
                          handleRowChange(index, "productName", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.hsnCode}
                        onChange={(e) =>
                          handleRowChange(index, "hsnCode", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) =>
                          handleRowChange(index, "qty", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.uom}
                        onChange={(e) =>
                          handleRowChange(index, "uom", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.mrp}
                        onChange={(e) =>
                          handleRowChange(index, "mrp", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.discount}
                        onChange={(e) =>
                          handleRowChange(index, "discount", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>

                    {salesType === "GST Invoice" && (
                      <>
                        {gstType === "CGST/SGST" && (
                          <>
                            <td className="border p-2">
                              <input
                                type="number"
                                value={`${row.cgst} RS`}
                                onChange={(e) =>
                                  handleRowChange(index, "cgst", e.target.value)
                                }
                                className="w-full"
                              />
                            </td>
                            <td className="border p-2">
                              <input
                                type="number"
                                value={row.sgst}
                                onChange={(e) =>
                                  handleRowChange(index, "sgst", e.target.value)
                                }
                                className="w-full"
                              />
                            </td>
                          </>
                        )}
                        {gstType === "IGST" && (
                          <td className="border p-2">
                            <input
                              type="number"
                              value={row.igst}
                              onChange={(e) =>
                                handleRowChange(index, "igst", e.target.value)
                              }
                              className="w-full"
                            />
                          </td>
                        )}
                        <td className="border p-2 text-nowrap gap-2">
                          {/* <input
                            type="number"
                            value={row.igst}
                            onChange={(e) =>
                              handleRowChange(index, "igst", e.target.value)
                            }
                            className="w-full"
                          /> */}
                          <span> {row.igst} </span>
                          <span> {row.igst} </span>
                        </td>
                      </>
                    )}
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.totalValue}
                        onChange={(e) =>
                          handleRowChange(index, "totalValue", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className=" p-1 gap-2 flex">
                      {/* <button
                      onClick={addRow}
                      className="bg-green-500 text-white p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http//www.w3.org/2000/svg"
                        className="h-4 w-4 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button> */}
                      <button
                        onClick={() => removeRow(index)}
                        className="bg-red-500 text-white  p-1 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http//www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
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
          <button
            onClick={addRow}
            className="bg-green-500 hide-on-print text-white p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
          >
            <svg
              xmlns="http//www.w3.org/2000/svg"
              className="h-4 w-4 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Row
          </button>
          {salesType !== "GST Invoice" && (
          <button
            onClick={() => setIsModalOtherChargesOpen(true)}
            className=" text-blue-800 mt-8 text-md p-2 hide-on-print mt-2 p-2 mt-2 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
          >
            <svg
              xmlns="http//www.w3.org/2000/svg"
              className="h-4 w-4 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Other Charges
          </button>
          )}

          {isModalOtherChargesOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
                <h4 className="font-bold mb-4">Other Charges Details</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="other-charges">
                      Other Charges Description
                    </label>
                    <input
                      type="text"
                      id="other-charges"
                      value={otherChargesDescriptions}
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                  <div>
                    <label>Other Charges</label>
                    <input
                      type="text"
                      onChange={handleOtherChargesChange}
                      placeholder="Enter other charges"
                      className="border p-2 w-full  rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOtherChargesOpen(false)}
                    className="bg-gray-500 text-white p-2 mr-2 hide-on-print"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsModalOtherChargesOpen(false)}
                    className="bg-blue-500 text-white p-2 hide-on-print"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <label className="font-bold">Narration</label>
              <br />
              <textarea
                // value={billingAddress}
                // onChange={handleBillingAddressChange}
                className="bg-black text-white border p-1 w-full  rounded"
              />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                <label className=" font-bold lg:w-1/2 text-nowrap">
                  Gross Amount
                </label>
                <input
                  value={grossAmount.toFixed(2)}
                  // onChange={handleBillingAddressChange}
                  className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
                />
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                <label className=" font-bold lg:w-1/2 text-nowrap">
                  GST Amount
                </label>
                <input
                  value={totalGstAmount.toFixed(2)}
                  // onChange={handleBillingAddressChange}
                  className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
                />
              </div>

              {salesType !== "GST Invoice" && (
                <div className="flex flex-col  lg:flex-row lg:justify-between mb-4">
                  <label className="font-bold lg:w-1/2 text-nowrap">
                    Other Charge
                  </label>
                  <input
                    value={otherCharges.toFixed(2)}
                    // onChange={handleBillingAddressChange}
                    className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
                  />
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                <label className=" font-bold lg:w-1/2 text-nowrap">
                  Net Amount
                </label>
                <input
                  value={netAmount.toFixed(2)}
                  // onChange={handleBillingAddressChange}
                  className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
                />
              </div>
            </div>
          </div>
          {/* Buttons for saving and printing */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="bg-blue-500 pl-8 pr-8 hoverbg-sky-700  text-white p-2 mr-2 hide-on-print"
            >
              Save
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-700 pl-4 pr-4 hoverbg-sky-700 text-white p-2 hide-on-print"
            >
              Save and Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSalesReturn;
