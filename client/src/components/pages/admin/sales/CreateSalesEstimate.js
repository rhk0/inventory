import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CreateSalesEstimate = () => {
  const [date, setDate] = useState("");
  const [estimateNo, setEstimateNo] = useState("");
  const [salesType, setSalesType] = useState("GST Invoice");
  const [customerType, setCustomerType] = useState("Retailer");
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
  const [gstType, setGstType] = useState("CGST/SGST");
  const [rows, setRows] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);

  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    estimateNo: "",
    salesType: "",
    customerType: "",
    customerName: "",
    placeOfSupply: "",
    paymentTerm: "",
    dueDate: "",
    receiptDocNo: "",
    dispatchedThrough: "",
    destination: "",
    carrierNameAgent: "",
    billOfLading: "",
    motorVehicleNo: "",
    billingAddress: "",
    reverseCharge: "",
    gstType: "",

    rows: [
      {
        itemCode: "",
        productName: "",
        hsnCode: "",
        qty: null,
        uom: null,
        mrp: null,
        discount: null,
        cgst: null,
        sgst: null,
        igst: null,
        totalValue: null,
      },
    ],

    narration: "",
    otherChargesDescriptions: "",
    grossAmount: "",
    GstAmount: "",
    otherCharges: "",
    netAmount: "",
  });

  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState("");

  const handleOtherChargesDescriptionChange = (event) => {
    const value = event.target.value;
    setOtherChargesDescriptions(value);
    setFormData((prev) => ({
      ...prev,
      otherChargesDescriptions: value, // Store in formData
    }));
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageCustomer");
        setCustomer(response.data.data);
      } catch (error) {
        console.error("Error fetching Customers:", error);
      }
    };

    fetchCustomer();
  }, []);

  const handleCustomerChange = (e) => {
    const value = e.target.value;

    setSelectedCustomer(value);
    setFormData((prev) => ({
      ...prev,
      customerName: value,
    }));
  };

  const handleOtherChargesChange = (event) => {
    const newCharges = parseFloat(event.target.value) || 0;
    setOtherCharges(newCharges);

    setFormData((prev) => ({
      ...prev,
      otherCharges: newCharges,
    }));
  };
  const handleOtherChargesSave = () => {
    setFormData((prev) => ({
      ...prev,
      otherCharges: otherCharges.toFixed(2),
      otherChargesDescriptions: otherChargesDescriptions,
    }));
    setIsModalOtherChargesOpen(false);
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
      setFormData((prev) => ({
        ...prev,
        dueDate: formattedDueDate, // Update formData with dueDate
      }));
    }
  }, [date, paymentTerm]);

  const handlePaymentTermChange = (e) => {
    const value = e.target.value;
    setPaymentTerm(value);
    setFormData((prev) => ({
      ...prev,
      paymentTerm: value,
    }));
  };

  const handleGstTypeChange = (e) => {
    const value = e.target.value;
    setGstType(value);
    setFormData((prev) => ({
      ...prev,
      gstType: value,
    }));
  };


  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  const handleEstimateNoChange = (e) => {
    const value = e.target.value;
    setEstimateNo(value);
    setFormData((prev) => ({
      ...prev,
      estimateNo: value,
    }));
  };
  const handleSalesTypeChange = (e) => {
    const value = e.target.value;
    setSalesType(value);
    setFormData((prev) => ({
      ...prev,
      salesType: value,
    }));
  };
  const handleCustomerTypeChange = (e) => {
    const value = e.target.value;
    setCustomerType(value);
    setFormData((prev) => ({
      ...prev,
      customerType: value,
    }));
  };

  const handlePlaceOfSupplyChange = (e) => {
    const value = e.target.value;
    setPlaceOfSupply(value);
    setFormData((prev) => ({
      ...prev,
      placeOfSupply: value,
    }));
  };

  const handleBillingAddressChange = (e) => {
    const value = e.target.value;
    setBillingAddress(value);
    setFormData((prev) => ({
      ...prev,
      billingAddress: value,
    }));
  };
  const handleReverseChargeChange = (e) => {
    const value = e.target.value;
    setReverseCharge(value);
    setFormData((prev) => ({
      ...prev,
      reverseCharge: value,
    }));
  };

  // Function to handle transport detail change
  const handleTransportDetailChange = (field, value) => {
    setTransportDetails((prev) => ({ ...prev, [field]: value }));
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
        units: "",
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
    let GstAmount = 0;

    rows.forEach((rows) => {
      grossAmount += rows.totalvalue;
      GstAmount += rows.cgstrs + rows.sgstrs ;
      
    });

    const netAmount = grossAmount + GstAmount+otherCharges+0;
    return { grossAmount, GstAmount, netAmount };
  };

  const { grossAmount, GstAmount, netAmount } = calculateTotals();

  // Function to handle Save and Print

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageproduct");
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // toast.error("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (rowIndex, selectedProductName) => {
    const selectedProduct = products.find(
      (product) => product.productName === selectedProductName
    );
    if (selectedProduct) {
      const updatedRows = [...rows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        hsnCode: selectedProduct.hsnCode,
        units: selectedProduct.units,
        productName: selectedProduct.productName, // Ensure productName is updated here
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice,
        quantity: selectedProduct.quantity,
        wholesalerDiscount: selectedProduct.wholesalerDiscount,
        wholeselerDiscountRS:
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.wholesalerDiscount) /
          100,

          retailDiscount :selectedProduct.retailDiscount,
          retailDiscountRS:(selectedProduct.maxmimunRetailPrice *
            selectedProduct.retailDiscount) /
          100,
        taxableValue: (((selectedProduct.retailPrice* selectedProduct.quantity)/100)+selectedProduct.gstRate*100),
        cgstp:selectedProduct.gstRate/2,
        sgstp: selectedProduct.gstRate/2,
        igstp:selectedProduct.gstRate,
        
        cgstrs:(selectedProduct.maxmimunRetailPrice* selectedProduct.gstRate/2)/100,
        sgstrs:(selectedProduct.maxmimunRetailPrice* selectedProduct.gstRate/2)/100,
        igstrs:(selectedProduct.maxmimunRetailPrice* selectedProduct.gstRate)/100,
        totalvalue:(selectedProduct.maxmimunRetailPrice*selectedProduct.quantity)


        // Add any other fields you want to auto-fill here
      };

      setRows(updatedRows);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        rows: rows.map((row) => ({
          itemCode: row.itemCode,
          productName: row.productName,
          hsnCode: row.hsnCode,
          qty: row.quantity,
          uom: row.units,
          mrp: row.maxmimunRetailPrice,

          discountpercent: row.discountpercent,
          discountRS: row.discountRS,
          taxable: row.taxable,
          cgstpercent: row.cgstpercent,
          cgstRS: row.cgstRS,
          sgstpercent: row.sgstpercent,
          sgstRS: row.sgstRS,
          igstpercent: row.igstpercent,
          igstRS: row.igstRS,
          totalValue: row.totalValue,

          // discount: row.discount,
          // taxableValue: row.taxableValue,
          // cgst: row.cgst,
          // sgst: row.sgst,
          // igst: row.igst,
          // totalValue: row.totalValue,
        })),
        grossAmount: grossAmount.toFixed(2),
        GstAmount: GstAmount.toFixed(2),
        otherCharges: otherCharges.toFixed(2),
        otherChargesDescriptions: otherChargesDescriptions,

        netAmount: netAmount.toFixed(2),
      };
      const response = await axios.post(
        "/api/v1/salesEstimateRoute/createSalesEstimatet",
        updatedFormData
      );

     

      if (response) {
        toast.success("Sales estimate created successfully...");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create sales estimate. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#82ac73" }}
        className="p-4 responsive-container"
      >
        {/* Top Section */}
        <h1 className="text-center font-bold text-3xl bg-gray-500 text-white">
            Create Sales Estimate
          </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
          <div>
            <label className="font-bold">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => {
                  setDate(e.target.value);
                  handleChange(e);
                }}
                className="border p-2 w-full   rounded"
              />
            </label>
          </div>
          <div>
            <label className="font-bold">Estimate No.</label>
            <input
              name="estimateNo"
              type="text"
              value={estimateNo} // Bind to local state
              onChange={handleEstimateNoChange} // Update both local and formData states
              className="border p-2 w-full  rounded"
            />
          </div>
          <div>
            <label className="font-bold">Sales Type</label>
            <select
              value={salesType}
              onChange={handleSalesTypeChange}
              className="border p-2 w-full  rounded"
            >
              <option value="GST Invoice">GST Invoice</option>
              <option value="Bill of Supply">Bill of Supply</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Customer Type</label>
            <select
              value={customerType}
              onChange={handleCustomerTypeChange}
              className="border p-2 w-full  rounded"
            >
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Customer Name</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCustomer}
              onChange={handleCustomerChange}
            >
              <option value="">Select Customer</option>
              {customer.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Place of Supply</label>
            <input
              type="text"
              name="placeOfSupply"
              value={placeOfSupply}
              onChange={handlePlaceOfSupplyChange}
              className="border p-2 w-full  rounded"
            />
          </div>
          <div>
            <label className="font-bold">
              Payment Term (days):
              <input
                type="text"
                name="paymentTerm"
                value={paymentTerm}
                onChange={handlePaymentTermChange}
                className="border p-2 w-full  rounded"
              />
            </label>
          </div>

          <div>
            <label className="font-bold">
              Due Date
              <input
                name="dueDate"
                type="text"
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
                    type="text"
                    name="receiptDocNo"
                    value={transportDetails.receiptDocNo}
                    onChange={(e) =>
                      handleTransportDetailChange(
                        "receiptDocNo",
                        e.target.value
                      )
                    }
                    className="border p-2 w-full  rounded"
                  />
                </div>
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
                      handleTransportDetailChange("destination", e.target.value)
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
                <div>
                  <label>Motor Vehicle No.</label>
                  <input
                    type="text"
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
        </div>

        {/* Items Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-x-auto">
            <thead>
              <tr>
                <th className="border p-1">#</th>
                <th className="border text-bold text-sm ">Item Code</th>
                <th className="border ">Product Name</th>
                <th className="border p-1 text-nowrap">HSN Code</th>
                <th className="border p-1">Qty</th>
                <th className="border p-1">Units</th>
                <th className="border p-1">MRP</th>
                <th className="border p-1">
                  Discount
                  <div className="flex justify-between">
                    <span className="">%</span> <span>RS</span>
                  </div>
                </th>

                {salesType === "GST Invoice" && (
                  <>
                    <th className="border p-2">Taxable Value</th>
                    {gstType === "CGST/SGST" && (
                      <>
                        <th className="border p-2">
                          CGST{" "}
                          <div className="flex justify-between">
                            <span className="">%</span> <span>RS</span>
                          </div>
                        </th>
                        <th className="border p-2">
                          SGST{" "}
                          <div className="flex justify-between">
                            <span className="">%</span> <span>RS</span>
                          </div>
                        </th>
                      </>
                    )}
                    {gstType === "IGST" && (
                      <th className="border p-2">
                        IGST{" "}
                        <div className="flex justify-between">
                          <span className="">%</span> <span>RS</span>
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
                  <td className="border p-1">{index + 1}</td>
                  <td className="border ">
                    <input
                      type="text"
                      value={row.itemCode}
                      onChange={(e) =>
                        handleRowChange(index, "itemCode", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-[3px]">
                    <select
                      id="product-select"
                      value={row.productName}
                      onChange={(e) =>
                        handleProductSelect(index, e.target.value)
                      }
                      className=""
                    >
                      <option value="">Select a Product</option>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <option key={product._id} value={product.productName}>
                            {product.productName}
                          </option>
                        ))
                      ) : (
                        <option value="">Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.hsnCode}
                      onChange={(e) =>
                        handleRowChange(index, "hsnCode", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>

                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.quantity}
                      onChange={(e) =>
                        handleRowChange(index, "quantity", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.units}
                      onChange={(e) =>
                        handleRowChange(index, "units", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.maxmimunRetailPrice}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "maxmimunRetailPrice",
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border">
                    {customerType === "Wholesaler" && (
                      <div className="p-1 flex gap-1">
                        <input
                          type="text"
                          value={row.wholesalerDiscount}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              "discountpercent",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={row.wholeselerDiscountRS}
                          onChange={(e) =>
                            handleRowChange(index, "discountRS", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    )}
                      {customerType === "Retailer" && (
                      <div className="p-1 flex gap-1">
                        <input
                          type="text"
                          value={row.retailDiscount}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              "discountpercent",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={row.retailDiscountRS}
                          onChange={(e) =>
                            handleRowChange(index, "discountRS", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    )}
                  </td>

                  {salesType === "GST Invoice" && (
                    <>
                      {gstType === "CGST/SGST" && (
                        <>
                          <td className="border p-1">
                            <input
                              type="text"
                              value={row.taxableValue}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "taxable",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                          <td className="border">
                            <div className="p-1 flex gap-1">
                              <input
                                type="text"
                                value={row.cgstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "cgstpercent",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                              <input
                                type="text"
                                value={row.cgstrs}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "cgstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                            </div>
                          </td>
                          <td className="border">
                            <div className="p-1 flex gap-1">
                              <input
                                type="text"
                                value={row.sgstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "sgstpercent",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                              <input
                                type="text"
                                value={row.sgstrs}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "sgstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                            </div>
                          </td>
                        </>
                      )}
                      {gstType === "IGST" && (
                        <>
                          <td className="border p-1">
                            <input
                              type="text"
                              value={row.taxableValue}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "taxable",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                          <td className="border p-1">
                            <div className="flex gap-1">
                              <input
                                type="text"
                                value={row.igstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "igstpercent",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                              <input
                                type="text"
                                value={row.igstrs}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "igstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                            </div>
                          </td>
                        </>
                      )}
                    </>
                  )}
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.totalvalue}
                      onChange={(e) =>
                        handleRowChange(index, "totalValue", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="p-1 gap-2 flex">
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-500 text-white p-1 mt-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
          Add New Row
        </button>

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
                  <label htmlFor="other-charges">
                    Other Charges Description
                  </label>
                  <input
                    type="text"
                    id="other-charges"
                    value={otherChargesDescriptions} // Ensure this is controlled
                    onChange={(e) =>
                      setOtherChargesDescriptions(e.target.value)
                    } // Ensure change handler updates state
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div>
                  <label>Other Charges</label>
                  <input
                    type="text"
                    value={otherCharges}
                    onChange={(e) => handleOtherChargesChange(e)}
                    placeholder="Enter other charges"
                    className="border p-2 w-full rounded"
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
                  onClick={handleOtherChargesSave}
                  className="bg-gray-500 text-white p-2 mr-2"
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
              name="narration"
              value={formData.narration}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  narration: e.target.value,
                }));
              }}
              className="bg-black text-white border p-1 w-full  rounded"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                Gross Amount
              </label>
              <input
                value={grossAmount.toFixed(2)}
                // onChange={handleBillingAddressChange}
                className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
              />
            </div>
            {salesType === "GST Invoice" && (
              <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                <label className="font-bold lg:w-1/2 text-nowrap">
                  GST Amount
                </label>
                <input
                  value={GstAmount.toFixed(2)}
                  // onChange={handleBillingAddressChange}
                  className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
                />
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                Other Charge
              </label>
              <input
                value={otherCharges.toFixed(2)}
                onChange={handleOtherChargesChange}
                className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
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
            // onClick={}
            className="bg-blue-500 pl-4 pr-4 hoverbg-sky-700  text-white p-2 mr-2"
            onClick={handleSubmit}
          >
            Save
          </button>
          {salesType === "GST Invoice" && (
            <button
              // onClick={handlePrintOnly}
              className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-white p-2"
            >
              Save and Print
            </button>
          )}
          {salesType !== "GST Invoice" && (
            <button
              // onClick={handlePrintOnlyWithoutGST}
              className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-white p-2"
            >
              Save and Print
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateSalesEstimate;
