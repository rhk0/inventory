import React, { useState } from "react";

const InvoiceForm = () => {
  // State for form fields
  const [date, setDate] = useState("");
  const [estimateNo, setEstimateNo] = useState("");
  const [salesType, setSalesType] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");
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

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers for each form element
  const handleDateChange = (e) => setDate(e.target.value);
  const handleEstimateNoChange = (e) => setEstimateNo(e.target.value);
  const handleSalesTypeChange = (e) => setSalesType(e.target.value);
  const handleCustomerTypeChange = (e) => setCustomerType(e.target.value);
  const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
  const handlePlaceOfSupplyChange = (e) => setPlaceOfSupply(e.target.value);
  const handlePaymentTermsChange = (e) => setPaymentTerms(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handleBillingAddressChange = (e) => setBillingAddress(e.target.value);
  const handleReverseChargeChange = (e) => setReverseCharge(e.target.value);
  const handleGstTypeChange = (e) => setGstType(e.target.value);

  // Function to handle transport detail change
  const handleTransportDetailChange = (field, value) => {
    setTransportDetails((prev) => ({ ...prev, [field]: value }));
  };
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  // Function to handle Save
  const handleSave = () => {
    // Implement save functionality
  };

  // Function to handle Save and Print
  const handleSaveAndPrint = () => {
    // Implement save and print functionality
  };

  // Function to add a new row
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

  // Function to remove a row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{ backgroundColor: "#82ac73" }}
      className="p-4 responsive-container"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4   gap-4 mb-4">
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Estimate No.:</label>
          <input
            type="text"
            value={estimateNo}
            onChange={handleEstimateNoChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Sales Type:</label>
          <select
            value={salesType}
            onChange={handleSalesTypeChange}
            className="border p-2 w-full"
          >
            <option value="GST Invoice">GST Invoice</option>
            <option value="Bill of Supply">Bill of Supply</option>
          </select>
        </div>
        <div>
          <label>Customer Type:</label>
          <select
            value={customerType}
            onChange={handleCustomerTypeChange}
            className="border p-2 w-full"
          >
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
          </select>
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={handleCustomerNameChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Place of Supply:</label>
          <input
            type="text"
            value={placeOfSupply}
            onChange={handlePlaceOfSupplyChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Payment Terms:</label>
          <input
            type="text"
            value={paymentTerms}
            onChange={handlePaymentTermsChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Transport Details Section */}
        <div className="mb-4">
          <h4 className="font-bold">Transport Details</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-2"
          >
            Transport Details
          </button>
        </div>
        {/* Billing Address Section */}
      </div>

      {/* Modal for Transport Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Transport Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Receipt Doc No.:</label>
                <input
                  type="text"
                  value={transportDetails.receiptDocNo}
                  onChange={(e) =>
                    handleTransportDetailChange("receiptDocNo", e.target.value)
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Dispatched Through:</label>
                <input
                  type="text"
                  value={transportDetails.dispatchedThrough}
                  onChange={(e) =>
                    handleTransportDetailChange(
                      "dispatchedThrough",
                      e.target.value
                    )
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Destination:</label>
                <input
                  type="text"
                  value={transportDetails.destination}
                  onChange={(e) =>
                    handleTransportDetailChange("destination", e.target.value)
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Carrier Name/Agent:</label>
                <input
                  type="text"
                  value={transportDetails.carrierNameAgent}
                  onChange={(e) =>
                    handleTransportDetailChange(
                      "carrierNameAgent",
                      e.target.value
                    )
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Bill of Lading/LR-RR No.:</label>
                <input
                  type="text"
                  value={transportDetails.billOfLading}
                  onChange={(e) =>
                    handleTransportDetailChange("billOfLading", e.target.value)
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Motor Vehicle No.:</label>
                <input
                  type="text"
                  value={transportDetails.motorVehicleNo}
                  onChange={(e) =>
                    handleTransportDetailChange(
                      "motorVehicleNo",
                      e.target.value
                    )
                  }
                  className="border p-2 w-full"
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
      <div className="mb-4">
        <label>Billing Address:</label>
        <textarea
          value={billingAddress}
          onChange={handleBillingAddressChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4   gap-4 mb-4">
        {/* Reverse Charge Section */}
        <div className="mb-4 w-full">
          <label>Reverse Charge:</label>
          <select
            value={reverseCharge}
            onChange={handleReverseChargeChange}
            className="border p-2 w-full"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* GST Type Section */}
        <div className="mb-4">
          <label>GST Type:</label>
          <select
            value={gstType}
            onChange={handleGstTypeChange}
            className="border p-2 w-full"
          >
            <option value="CGST/SGST">CGST/SGST</option>
            <option value="IGST">IGST</option>
          </select>
        </div>
      </div>

      {/* Items Section */}
      <div>
        <h4 className="font-bold">Items</h4>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Item Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">UOM</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Taxable Value</th>
              <th className="border p-2">CGST</th>
              <th className="border p-2">SGST</th>
              <th className="border p-2">IGST</th>
              <th className="border p-2">Total Value</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
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
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.taxableValue}
                    onChange={(e) =>
                      handleRowChange(index, "taxableValue", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.cgst}
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
                <td className="border p-2">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white p-1"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="bg-green-500 text-white p-2 mt-2">
          Add Row
        </button>
      </div>

      {/* Buttons for saving and printing */}
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 mr-2"
        >
          Save
        </button>
        <button
          onClick={handleSaveAndPrint}
          className="bg-blue-700 text-white p-2"
        >
          Save and Print
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
