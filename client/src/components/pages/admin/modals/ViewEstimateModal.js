import React from "react";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";


const ViewEstimateModal = ({closeModal}) => {
  const [date, setDate] = useState("");
  const [estimateNo, setEstimateNo] = useState("");
  const [salesreadType, setSalesreadType] = useState("GST Invoice");
  const [customerreadType, setCustomerreadType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
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
  const [gstreadType, setGstreadType] = useState("CGST/SGST");
  const [rows, setRows] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);

  const handleOtherChargesChange = (event) => {
    const newCharges = parseFloat(event.target.value) || 0;
    setOtherCharges(newCharges);
    setTotalValue((prevTotal) => prevTotal + newCharges);
  };

  useEffect(() => {
    if (date && paymentTerm) {
      const selectedDate = new Date(date);
      selectedDate.setDate(selectedDate.getDate() + parseInt(paymentTerm));

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = selectedDate.toLocaleString("en-US", { month: "short" });
      const year = selectedDate.getFullYear();
      const formattedDueDate = `${day}-${month}-${year}`;

      setDueDate(formattedDueDate);
    }
  }, [date, paymentTerm]);

  const handleGstreadTypeChange = (e) => {
    setGstreadType(e.target.value);
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  const handleEstimateNoChange = (e) => setEstimateNo(e.target.value);
  const handleSalesreadTypeChange = (e) => setSalesreadType(e.target.value);
  const handleCustomerreadTypeChange = (e) =>
    setCustomerreadType(e.target.value);
  const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
  const handlePlaceOfSupplyChange = (e) => setPlaceOfSupply(e.target.value);
  const handleBillingAddressChange = (e) => setBillingAddress(e.target.value);
  const handleReverseChargeChange = (e) => setReverseCharge(e.target.value);

  // Function to handle transport detail change
  const handleTransportDetailChange = (field, value) => {
    setTransportDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      style={{ backgroundColor: "#82ac73" }}
      className="p-4 responsive-container"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
      <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
        <div>
          <label className="font-bold">
            Date:
            <input
              readtype="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full   rounded"
            />
          </label>
        </div>
        <div>
          <label className="font-bold">Estimate No.</label>
          <input
            readtype="text"
            value={estimateNo}
            onChange={handleEstimateNoChange}
            className="border p-2 w-full  rounded"
          />
        </div>
        <div>
          <label className="font-bold">Sales readType</label>
          <select
            value={salesreadType}
            onChange={handleSalesreadTypeChange}
            className="border p-2 w-full  rounded"
          >
            <option value="GST Invoice">GST Invoice</option>
            <option value="Bill of Supply">Bill of Supply</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Customer readType</label>
          <select
            value={customerreadType}
            onChange={handleCustomerreadTypeChange}
            className="border p-2 w-full  rounded"
          >
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Customer Name</label>
          <input
            readtype="text"
            value={customerName}
            onChange={handleCustomerNameChange}
            className="border p-2 w-full  rounded"
          />
        </div>
        <div>
          <label className="font-bold">Place of Supply</label>
          <input
            readtype="text"
            value={placeOfSupply}
            onChange={handlePlaceOfSupplyChange}
            className="border p-2 w-full  rounded"
          />
        </div>
        <div>
          <label className="font-bold">
            Payment Term (days):
            <input
              readtype="number"
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
              readtype="text"
              value={dueDate}
              className="border p-2 w-full text-black rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-2"
          >
            Transport Details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Transport Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Receipt Doc No.</label>
                <input
                  readtype="text"
                  value={transportDetails.receiptDocNo}
                  onChange={(e) =>
                    handleTransportDetailChange("receiptDocNo", e.target.value)
                  }
                  className="border p-2 w-full  rounded"
                />
              </div>
              <div>
                <label>Dispatched Through</label>
                <input
                  readtype="text"
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
                  readtype="text"
                  value={transportDetails.destination}
                  onChange={(e) =>
                    handleTransportDetailChange("destination", e.target.value)
                  }
                  className="border p-2 w-full  rounded"
                />
              </div>
              <div>
                <label>Carrier Name/Agent</label>
                <input
                  readtype="text"
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
                  readtype="text"
                  value={transportDetails.billOfLading}
                  onChange={(e) =>
                    handleTransportDetailChange("billOfLading", e.target.value)
                  }
                  className="border p-2 w-full  rounded"
                />
              </div>
              <div>
                <label>Motor Vehicle No.</label>
                <input
                  readtype="text"
                  value={transportDetails.motorVehicleNo}
                  onChange={(e) =>
                    handleTransportDetailChange(
                      "motorVehicleNo",
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
          <label className="font-bold">Billing Address</label>
          <textarea
            value={billingAddress}
            onChange={handleBillingAddressChange}
            className="border p-2 w-full  rounded"
          />
        </div>
        {/* Reverse Charge Section */}
        <div className="mb-4 w-full">
          <label className="font-bold">Reverse Charge</label>
          <select
            value={reverseCharge}
            onChange={handleReverseChargeChange}
            className="border p-2 w-full  rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* GST readType Section */}
        {salesreadType === "GST Invoice" && (
          <div className="mb-4 w-full">
            <label className="font-bold">GST readType:</label>
            <select
              value={gstreadType}
              onChange={handleGstreadTypeChange}
              className="border p-2 w-full  rounded"
            >
              <option value="CGST/SGST">CGST/SGST</option>
              <option value="IGST">IGST</option>
            </select>
          </div>
        )}
      </div>

      {/* Items Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse  overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">units</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">
                Discount{" "}
                <div className="flex justify-between">
                  <span className="mr-16">%</span> <span>RS</span>
                </div>
              </th>

              {salesreadType === "GST Invoice" && (
                <>
                  <th className="border p-2">Taxable Value</th>
                  {gstreadType === "CGST/SGST" && (
                    <>
                      <th className="border p-2">
                        CGST{" "}
                        <div className="flex justify-between">
                          <span className="mr-16">%</span> <span>RS</span>
                        </div>
                      </th>
                      <th className="border p-2">
                        SGST{" "}
                        <div className="flex justify-between">
                          <span className="mr-16">%</span> <span>RS</span>
                        </div>
                      </th>
                    </>
                  )}
                  {gstreadType === "IGST" && (
                    <th className="border p-2">
                      IGST{" "}
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>RS</span>
                      </div>
                    </th>
                  )}
                </>
              )}
              <th className="border p-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <input
                    readtype="text"
                    value={row.itemCode}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input id="product-select" className="w-full"></input>
                </td>
                <td className="border p-2">
                  <input
                    readtype="text"
                    value={row.hsnCode}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    readtype="number"
                    value={row.quantity}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input readtype="text" value={row.units} className="w-full" />
                </td>
                <td className="border p-2">
                  <input
                    readtype="number"
                    value={row.maxmimunRetailPrice}
                    className="w-full"
                  />
                </td>
                <td className="border ">
                  <div className="p-1 flex gap-1">
                    <input
                      readtype="number"
                      value={row.retailDiscount}
                      className="w-full"
                    />
                    <td className=""></td>
                    <input
                      readtype="number"
                      value={row.discount}
                      className="w-full"
                    />
                  </div>
                </td>

                {salesreadType === "GST Invoice" && (
                  <>
                    {gstreadType === "CGST/SGST" && (
                      <>
                        <td className="border p-2">
                          <input
                            readtype="number"
                            value={row.taxableValue}
                            className="w-full"
                          />
                        </td>
                        <td className="border ">
                          <div className="p-1 flex  gap-1">
                            <input
                              readtype="number"
                              value={row.sgst}
                              className="w-full"
                            />
                            <td className=""></td>
                            <input
                              readtype="number"
                              value={row.sgst}
                              className="w-full"
                            />
                          </div>
                        </td>
                      </>
                    )}
                    {gstreadType === "IGST" && (
                      <td className="border p-2">
                        <input
                          readtype="number"
                          value={row.taxableValue}
                          className="w-full"
                        />
                      </td>
                    )}
                    <td className="border p-2">
                      <div className="flex">
                        <input
                          readtype="number"
                          value={row.igst}
                          className="w-full"
                        />
                        <td className="p-1"></td>
                        <input
                          readtype="number"
                          value={row.igst}
                          className="w-full"
                        />
                      </div>
                    </td>
                  </>
                )}
                <td className="border p-2">
                  <input
                    readtype="number"
                    value={row.totalValue}
                    className="w-full"
                  />
                </td>
                <td className=" p-1 gap-2 flex">
                  <button className="bg-red-500 text-white p-1 mt-2 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center">
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
        onClick={() => setIsModalOtherChargesOpen(true)}
        className=" text-blue-800 mt-8 text-md p-2 mt-2 p-2 mt-2 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
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

      {isModalOtherChargesOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Other Charges Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="other-charges">Other Charges Description</label>
                <input
                  readtype="text"
                  id="other-charges"
                  className="border p-2 w-full  rounded"
                />
              </div>
              <div>
                <label>Other Charges</label>
                <input
                  readtype="text"
                  onChange={handleOtherChargesChange}
                  placeholder="Enter other charges"
                  className="border p-2 w-full  rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOtherChargesOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOtherChargesOpen(false)}
                className="bg-blue-500 text-white p-2"
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
          <textarea className="bg-black text-white border p-1 w-full  rounded" />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Gross Amount
            </label>
            <input className="bg-black text-white border p-1 w-full rounded lg:w-2/3" />
          </div>
          {salesreadType === "GST Invoice" && (
            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                GST Amount
              </label>
              <input className="bg-black text-white border p-1 w-full  rounded lg:w-2/3" />
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Other Charge
            </label>
            <input
              value={otherCharges}
              className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">Net Amount</label>
            <input className="bg-black text-white border p-1 w-full  rounded lg:w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEstimateModal;
