import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/Auth.js";

const PurchesReturn = () => {
  const [documentPath, setdocumentPath] = useState(null);
  const [purchaseInvoice, setPurchaseInvoice] = useState([]);
  const [date, setDate] = useState("");
  const [gstRatev, setgstRatev] = useState(0);
  const [debitNoteNo, setdebitNoteNo] = useState("");
  const [salesType, setSalesType] = useState("GST Invoice");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState("");
  const [freeQty, setFreeQty] = useState(0);
  const [qty, setQty] = useState(0);
  const [billingAddress, setBillingAddress] = useState("");
  const [selectPurchase, setselectPurchase] = useState("No");
  const [reasonForReturn, setreasonForReturn] = useState("");
  const [gstType, setGstType] = useState("CGST/SGST");
  const [rows, setRows] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);
  const [supplierdebitNoteNo, setsupplierdebitNoteNo] = useState("");
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedAddress, setAddress] = useState("");
  const [auth] = useAuth();
  const [userid, setUserId] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    debitNoteNo: "",
    supplierName: "",
    paymentTerm: "",
    dueDate: "",

    billingAddress: "",
    selectPurchase: "",
    reasonForReturn: "",
    gstType: "",

    rows: [
      {
        itemCode: "", // Item Code
        productName: "", // Product Name
        hsnCode: "", // HSN Code
        quantity: null, // Quantity
        units: null, // Unit of Measure
        freeQty: null,
        maxmimunRetailPrice: null, // Maximum Retail Price
        unitCost: null, // Unit Cost
        schemeMargin: "", // Scheme Margin
        discountpercent: null, // Discount Percentage
        discountRs: null, // Discount in Rs
        taxableValue: null, // Taxable Amount
        cgstpercentercent: null, // CGST Percentage
        cgstRS: null, // CGST Amount
        sgstpercentercent: null, // SGST Percentage
        sgstRS: null, // SGST Amount
        igstpercentercent: null, // IGST Percentage
        igstRS: null, // IGST Amount
        totalValue: null, // Total Value
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
  const fetchsupplier = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageSupplier/${userid}`);
      setCustomer(response.data.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }
    fetchsupplier();
  }, [auth, userid]);
  const handleOtherChargesChange = (event) => {
    const newCharges = parseFloat(event.target.value) || 0;
    if (newCharges === 0) {
      const fetchchrges = formData.otherCharges;
      setOtherCharges(fetchchrges);
    } else {
      setOtherCharges(newCharges);
    }

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
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);
  const handledebitNoteNoChange = (e) => {
    const value = e.target.value;
    setdebitNoteNo(value);
    setFormData((prev) => ({
      ...prev,
      debitNoteNo: value,
    }));
  };
  const handleBillingAddressChange = (e) => {
    const value = e.target.value;
    setBillingAddress(selectedAddress);
    setFormData((prev) => ({
      ...prev,
      billingAddress: value,
    }));
  };
  const handleReasonOfreturn = (e) => {
    const value = e.target.value;
    setreasonForReturn(value);
    setFormData((prev) => ({
      ...prev,
      reasonForReturn: value,
    }));
  };

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows]; // Clone the existing rows array
    const currentRow = updatedRows[rowIndex]; // Get the current row

    // Update discountpercent based on user input
    if (field === "discountpercent") {
      const discountPercent = parseFloat(value) || 0; // Ensure a valid number
      currentRow.discountpercent = discountPercent;

      // Recalculate taxable value and GST based on the current quantity
      const unitCost = Number(currentRow.unitCost);
      const discountRs = (unitCost * discountPercent) / 100; // Calculate discount in Rs
      const taxableValue = (unitCost - discountRs) * Number(currentRow.qty); // Calculate taxable value based on current qty

      // Update the currentRow values
      currentRow.discountRs = discountRs.toFixed(2);
      currentRow.taxableValue = taxableValue.toFixed(2);

      const gstRate = Number(gstRatev) || 0;
      const cgstRS = (taxableValue * (gstRate / 2)) / 100;
      const sgstRS = (taxableValue * (gstRate / 2)) / 100;
      const igstRS = (taxableValue * gstRate) / 100;

      currentRow.cgstRS = cgstRS.toFixed(2);
      currentRow.sgstRS = sgstRS.toFixed(2);
      currentRow.igstRS = igstRS.toFixed(2);

      // Calculate total value
      const totalGST =
        currentRow.cgstRS && currentRow.sgstRS ? cgstRS + sgstRS : igstRS;
      currentRow.totalValue = (taxableValue + totalGST).toFixed(2);
    }

    // Update the rows state
    updatedRows[rowIndex] = currentRow;
    setRows(updatedRows);
  };
  const handleFreeQtyChange = (rowIndex, newFreeQty) => {
    const updatedRows = [...rows];
    const selectedRow = updatedRows[rowIndex];
  
    const quantity = Number(selectedRow.quantity) || 0; // Use quantity from the row
  
    const totalQuantity = quantity + Number(newFreeQty);
    const schemeMargin = totalQuantity > 0 ? ((newFreeQty / totalQuantity) * 100).toFixed(2) : 0;
  
    // Update the row with the new freeQty and schemeMargin
    updatedRows[rowIndex] = {
      ...selectedRow,
      freeQty: newFreeQty,
      schemeMargin: schemeMargin,
    };
  
    setRows(updatedRows);
  };
  const handlQtyChange = (rowIndex, newQty) => {
    const updatedRows = [...rows]; // Create a copy of the rows array
    const selectedRow = updatedRows[rowIndex]; // Get the current row
  
    const quantity = parseFloat(newQty) || 0; // Ensure it's a valid number
  
    // Update quantity in the selected row
    updatedRows[rowIndex] = {
      ...selectedRow,
      quantity, // Update the quantity
    };
  
    // Calculate scheme margin as well if free quantity is set
    if (selectedRow.freeQty !== null) {
      const totalQuantity = quantity + Number(selectedRow.freeQty);
      const schemeMargin = totalQuantity > 0 ? ((selectedRow.freeQty / totalQuantity) * 100).toFixed(2) : 0;
  
      updatedRows[rowIndex].schemeMargin = schemeMargin;
    }
  
    // Rest of the calculations remain the same...
    // Ensure unitCost and discountpercent exist before calculations
    const unitCost = Number(selectedRow.unitCost) || 0;
    const discountPercent = Number(selectedRow.discountpercent) || 0;
  
    // Calculate discountRs
    const discountRs = (unitCost * discountPercent) / 100;
  
    // Calculate taxableValue
    const taxableValue = (unitCost - discountRs) * quantity;
  
    // Calculate GST amounts based on the taxableValue
    const gstRate = Number(gstRatev) || 0;
    const cgstRS = (taxableValue * (gstRate / 2)) / 100;
    const sgstRS = (taxableValue * (gstRate / 2)) / 100;
    const igstRS = (taxableValue * gstRate) / 100;
  
    // Update the currentRow values
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      discountRs: discountRs.toFixed(2),
      taxableValue: taxableValue.toFixed(2),
      cgstRS: cgstRS.toFixed(2),
      sgstRS: sgstRS.toFixed(2),
      igstRS: igstRS.toFixed(2),
    };
  
    // Calculate total value including GST
    const totalGST = gstType === "CGST/SGST" ? parseFloat(cgstRS) + parseFloat(sgstRS) : parseFloat(igstRS);
    updatedRows[rowIndex].totalValue = (taxableValue + totalGST).toFixed(2);
  
    // Update state with new rows
    setRows(updatedRows);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const calculateTotals = () => {
    let grossAmount = 0;
    let GstAmount = 0;
    let totalOtherCharges = parseFloat(otherCharges) || 0;

    // Loop through each row to calculate grossAmount and GstAmount
    rows.forEach((row) => {
      const taxableValue = parseFloat(row.taxableValue) || 0;
      const cgstRS = parseFloat(row.cgstRS) || 0;
      const sgstRS = parseFloat(row.sgstRS) || 0;

      grossAmount += taxableValue;
      GstAmount += cgstRS + sgstRS; // Total GST amount for each row
    });

    let netAmount;

    // Check if otherChargesDescriptions includes "discount"
    if (
      otherChargesDescriptions.toLowerCase().includes("discount") ||
      formData.otherChargesDescriptions === "discount"
    ) {
      if (formData.otherChargesDescriptions === "discount") {
        netAmount =
          grossAmount + GstAmount - parseFloat(formData.otherCharges || 0);
      } else {
        netAmount = grossAmount + GstAmount - totalOtherCharges;
      }
    } else {
      // If no discount, check the presence of otherCharges from either state or formData
      if (totalOtherCharges === 0) {
        netAmount =
          grossAmount + GstAmount + parseFloat(formData.otherCharges || 0);
      } else {
        netAmount = grossAmount + GstAmount + totalOtherCharges;
      }
    }

    return { grossAmount, GstAmount, netAmount };
  };

  const { grossAmount, GstAmount, netAmount } = calculateTotals();

  // Function to handle Save and Print

  const [products, setProducts] = useState([]);

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
  const fetchPurchaseInvoice = async () => {
    try {
      const response = await axios.get(
        "/api/v1/purchaseInvoiceRoute/getAllpurchaseinvoice"
      );

      if (response.data.invoices) {
        setPurchaseInvoice(response.data.invoices);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // toast.error("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    fetchPurchaseInvoice();
    fetchProducts();
  }, []);

  const handleInvoiceSelect = (selectedInvoiceNo) => {
    const selectedInvoice = purchaseInvoice.find(
      (invoice) => invoice.invoiceNo === selectedInvoiceNo
    );
    if (selectedInvoice) {
      // Update the rows state with the selected invoice rows
      console.log(selectedInvoice, "selectedInvoice");

      const updatedRows = selectedInvoice.rows.map((invoiceRow) => {
        const { igstpercent, ...rest } = invoiceRow; // Destructure igstpercent

        // Store igstpercent in state here
        setgstRatev(igstpercent); // Setting igstpercent in state

        return {
          // Return the rest of the properties
          ...rest, // Spread operator to include all other properties
        };
      });
    }
 console.log(selectedInvoice,"selectedInvoice")
    if (selectedInvoice) {
      // Update the rows state with the selected invoice rows
      console.log(selectedInvoice, "selectedInvoice");
      const updatedRows = selectedInvoice.rows.map((invoiceRow) => ({
        itemCode: invoiceRow.itemCode,
        productName: invoiceRow.productName,
        hsnCode: invoiceRow.hsnCode,
        units: invoiceRow.units,
        quantity: invoiceRow.qty,
        freeQty: invoiceRow.freeQty,
        discountRs: invoiceRow.discountRs,
        discountpercent: invoiceRow.discountpercent,
        schemeMargin: invoiceRow.schemeMargin,
        maxmimunRetailPrice: invoiceRow.maxmimunRetailPrice,
        unitCost: invoiceRow.unitCost,
        taxableValue: invoiceRow.taxableValue,
        cgstpercent: invoiceRow.cgstpercent,
        sgstpercent: invoiceRow.sgstpercent,
        igstpercent: invoiceRow.igstpercent,
        cgstRS: invoiceRow.cgstRS,
        sgstRS: invoiceRow.sgstRS,
        igstRS: invoiceRow.igstRS,
        totalValue: invoiceRow.totalValue,
      }));

      // Update formData with non-row fields from the selected invoice
      setFormData((prev) => ({
        ...prev,
        supplierName: selectedInvoice.supplierName,
        placeOfSupply: selectedInvoice.placeOfSupply,
        paymentTerm: selectedInvoice.paymentTerm,
        dueDate: selectedInvoice.dueDate,
        billingAddress: selectedInvoice.billingAddress,
        reverseCharge: selectedInvoice.reverseCharge,
        gstType: selectedInvoice.gstType,
        otherCharges: selectedInvoice.otherCharges,
        otherChargesDescriptions: selectedInvoice.otherChargesDescriptions,
        grossAmount: selectedInvoice.grossAmount,
        GstAmount: selectedInvoice.GstAmount,
        netAmount: selectedInvoice.netAmount,
        narration: selectedInvoice.narration,
      }));

      // Update the rows state

      setRows(updatedRows);
    } else {
      console.error("Selected invoice not found.");
    }
  };
  useEffect(() => {
    console.log(formData.igstpercent, "formData.igstpercent");
  }, [formData.igstpercent, 3000]);

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
      // Create a FormData instance
      const submissionData = new FormData();
      // Append non-file form data to formData
      const fields = {
        date,
        debitNoteNo,
        supplierdebitNoteNo,
        supplierName: formData.supplierName,
        placeOfSupply,
        paymentTerm,
        dueDate,
        reasonForReturn,
        billingAddress,
        selectPurchase,
        gstType,
        otherChargesDescriptions,
        narration: formData.narration,
        grossAmount: grossAmount.toFixed(2),
        GstAmount: GstAmount.toFixed(2),
        otherCharges: otherCharges.toFixed(2),
        netAmount: netAmount.toFixed(2),
      };
      // Append all fields to formData
      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          submissionData.append(key, fields[key]);
        }
      });
      // Append each row individually
      rows.forEach((row, index) => {
        Object.keys(row).forEach((key) => {
          submissionData.append(`rows[${index}][${key}]`, row[key]);
        });
      });
      // If a document file has been selected, append it to the FormData
      if (documentPath) {
        submissionData.append("documentPath", documentPath);
      }
      // Send the formData using axios
      const response = await axios.post(
        "/api/v1/purchesReturnRoute/createpurchasereturn",
        submissionData
      );
      if (response) {
        toast.success("Purchase invoice created successfully...");
      }
      // Reset your form data and state
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create sales estimate. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      date: "",
      debitNoteNo: "",
      supplierdebitNoteNo: "",
      salesType: "GST Invoice",
      supplierName: "",
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
      selectPurchase: "No",
      gstType: "CGST/SGST",
      rows: [
        {
          itemCode: "",
          productName: "",
          hsnCode: "",
          qty: null,
          units: "",
          mrp: null,
          discount: null,
          taxableValue: 0,
          cgst: 0,
          sgst: 0,
          igst: 0,
          totalValue: 0,
        },
      ],
      narration: "",
      otherChargesDescriptions: "",
      grossAmount: "",
      GstAmount: "",
      otherCharges: "",
      netAmount: "",
      cash: {},
      bank: {},
    });
    // Reset additional states as needed...
    setDate("");
    setSelectedCustomer("");
    // Add any other state resets...
  };
  return (
    <>
      <div
        style={{ backgroundColor: "##FFFFFF" }}
        className="p-4 responsive-container"
      >
        {/* Top Section */}
        <h1 className="text-center font-bold text-3xl  text-black mb-5">
          Purchase Return
        </h1>
        {console.log(formData, "formdata")}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
          <div>
            <label className="font-bold">Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={(e) => {
                handleChange(e);
              }}
              className="border p-2 w-full   rounded"
            />
          </div>

          <div>
            <label className="font-bold">
              Date
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
            <label className="font-bold">Debit Note No.</label>
            <input
              name="debitNoteNo"
              type="text"
              value={formData.debitNoteNo} // Bind to local state
              onChange={handledebitNoteNoChange} // Update both local and formData states
              className="border p-2 w-full  rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="mb-4">
            <label className="font-bold">Billing Address</label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleBillingAddressChange}
              className="border p-2 w-full  rounded"
            />
          </div>
          {/* Reverse Charge Section */}
          <div className="mb-4">
            <label className="font-bold">Select Purchase</label>
            <select
              value={selectedInvoiceNo}
              onChange={(e) => {
                setSelectedInvoiceNo(e.target.value); // Set the selected invoice number in state
                handleInvoiceSelect(e.target.value); // Trigger the invoice select function
              }}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Invoice</option>
              {purchaseInvoice.map((invoice) => (
                <option key={invoice._id} value={invoice.invoiceNo}>
                  {invoice.invoiceNo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="font-bold">Reason of Return</label>
            <textarea
              name="reasonForReturn"
              value={reasonForReturn}
              onChange={handleReasonOfreturn}
              className="border p-2 w-full  rounded"
            />
          </div>

          {/* GST Type Section */}
          {salesType === "GST Invoice" && (
            <div className="mb-4 w-full">
              <label className="font-bold">Tax Type:</label>
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
                <th className="border text-bold text-sm text-nowrap ">
                  Item Code
                </th>
                <th className="border text-nowrap  pl-5 pr-5">Product Name</th>
                <th className="border p-1 text-nowrap">HSN Code</th>
                <th className="border p-1">Qty</th>
                <th className="border p-1">Units</th>
                <th className="border p-1 text-nowrap">Free Qty</th>
                <th className="border p-1 text-nowrap">MRP</th>
                <th className="border p-1 text-nowrap">Unit Cost</th>
                <th className="border p-1 text-nowrap">Scheme Margin</th>

                <th className="border p-1 text-nowrap">
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
                  <td className="border">
                    <input
                      type="text"
                      value={row.itemCode}
                      onChange={(e) =>
                        handleRowChange(index, "hsnCode", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border ">
                    <input
                      type="text"
                      value={row.productName}
                      onChange={(e) =>
                        handleRowChange(index, "hsnCode", e.target.value)
                      }
                      className="w-full"
                    />
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
                      value={rows[index]?.quantity > 0 ? rows[index].quantity : ''} // Show quantity if > 0, otherwise empty
                      onChange={(e) => handlQtyChange(index, e.target.value)} // Call your handler
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
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.freeQty || ""}
                      onChange={(e) =>
                        handleFreeQtyChange(index, e.target.value)
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
                      className="w-full flex-grow"
                      style={{
                        minWidth: "70px",
                        flexBasis: "70px",
                        flexShrink: 1,
                      }}
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.unitCost}
                      onChange={(e) =>
                        handleRowChange(index, "unitCost", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>{" "}
                  <td className="border p-1">
                    <input
                      type="text"
                      value={row.schemeMargin}
                      onChange={(e) =>
                        handleRowChange(index, "schemeMargin", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border">
                    <div className="p-1 flex gap-1">
                      <input
                        type="text"
                        value={row.discountpercent}
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "discountpercent",
                            e.target.value
                          )
                        }
                        className="w-full flex-grow"
                        style={{
                          minWidth: "20px", // Set a small minimum width to ensure visibility
                          flexBasis: "20px", // Allow it to shrink, but still have a base width
                          flexShrink: 1, // Allow it to shrink on mobile
                        }}
                      />
                      <input
                        type="text"
                        value={row.discountRs}
                        onChange={
                          (e) =>
                            handleRowChange(index, "discountRs", e.target.value) // Fix here
                        }
                        className="w-full"
                      />
                    </div>
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
                                  "taxableValue",
                                  e.target.value
                                )
                              }
                              className="w-full flex-grow"
                              style={{
                                minWidth: "70px",
                                flexBasis: "70px",
                                flexShrink: 1,
                              }}
                            />
                          </td>
                          <td className="border">
                            <div className="p-1 flex gap-1">
                              <input
                                type="text"
                                value={row.cgstpercent}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "cgstpercentercent",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "20px", // Set a small minimum width to ensure visibility
                                  flexBasis: "20px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
                              />
                              <input
                                type="text"
                                value={row.cgstRS}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "cgstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "60px", // Set a small minimum width to ensure visibility
                                  flexBasis: "60px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
                              />
                            </div>
                          </td>
                          <td className="border">
                            <div className="p-1 flex gap-1">
                              <input
                                type="text"
                                value={row.sgstpercent}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "sgstpercentercent",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "20px", // Set a small minimum width to ensure visibility
                                  flexBasis: "20px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
                              />
                              <input
                                type="text"
                                value={row.sgstRS}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "sgstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "60px", // Set a small minimum width to ensure visibility
                                  flexBasis: "60px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
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
                                  "taxableValue",
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
                                value={row.igstpercent}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "igstpercentercent",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "20px", // Set a small minimum width to ensure visibility
                                  flexBasis: "20px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
                              />
                              <input
                                type="text"
                                value={row.igstRS}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "igstRS",
                                    e.target.value
                                  )
                                }
                                className="w-full flex-grow"
                                style={{
                                  minWidth: "60px", // Set a small minimum width to ensure visibility
                                  flexBasis: "60px", // Allow it to shrink, but still have a base width
                                  flexShrink: 1, // Allow it to shrink on mobile
                                }}
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
                      value={row.totalValue}
                      onChange={(e) =>
                        handleRowChange(index, "totalValue", e.target.value)
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: "70px",
                        flexBasis: "70px",
                        flexShrink: 1,
                      }}
                    />
                  </td>
                  <td className="p-1 gap-2 flex">
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-500 text-black p-1 mt-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
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

        {/* <button
          onClick={addRow}
          className="bg-green-500 text-black p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
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
        </button> */}
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div className="">
            <button
              onClick={() => setIsModalOtherChargesOpen(true)}
              className="w-1/2 text-white text-md p-2 rounded bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Other Charges
            </button>
          </div>
          <div className="">
            <label className="w-1/2 text-white text-md p-2 rounded bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload Document
              <input
                type="file"
                className="hidden"
                onChange={(e) => setdocumentPath(e.target.files[0])} // Assuming you have setdocumentPath in your state
              />
            </label>
          </div>
        </div>

        {isModalOtherChargesOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
              <h4 className="font-bold mb-4">Other Charges Details</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="other-charges">Description</label>
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
                  <label>Amount</label>
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
                  className="bg-gray-500 text-black p-2 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOtherChargesSave}
                  className="bg-gray-500 text-black p-2 mr-2"
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
              className=" text-black border p-1 w-full  rounded"
            />
          </div>
          <div className="w-full lg:w-1/3 mt-5">
            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                Gross Amount
              </label>
              <input
                value={grossAmount.toFixed(2)}
                // onChange={handleBillingAddressChange}
                className=" text-black border p-1 w-full  rounded lg:w-2/3"
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
                  className=" text-black border p-1 w-full  rounded lg:w-2/3"
                />
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                {otherChargesDescriptions ||
                  formData.otherChargesDescriptions ||
                  "Other Charges"}
              </label>
              <input
                value={otherCharges || formData.otherCharges}
                onChange={handleOtherChargesChange}
                className=" text-black border p-1 w-full  rounded lg:w-2/3"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold  lg:w-1/2 text-nowrap">
                Net Amount
              </label>
              <input
                value={Math.round(netAmount).toFixed(2)}
                // onChange={handleBillingAddressChange}
                className=" text-black border p-1 text-2xl w-full font-bold  rounded lg:w-2/3"
              />
            </div>
          </div>
        </div>
        {/* Buttons for saving and printing */}
        <div className="mt-8 flex justify-center">
          <button
            // onClick={}
            className="bg-blue-500 pl-4 pr-4 hoverbg-sky-700  text-black p-2 mr-2"
            onClick={handleSubmit}
          >
            Save
          </button>
          {salesType === "GST Invoice" && (
            <button
              // onClick={handlePrintOnly}
              className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-black p-2"
            >
              Save and Print
            </button>
          )}
          {salesType !== "GST Invoice" && (
            <button
              // onClick={handlePrintOnlyWithoutGST}
              className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-black p-2"
            >
              Save and Print
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PurchesReturn;
