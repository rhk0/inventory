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
  const [printSelectedInvoiceNo, printSetSelectedInvoiceNo] = useState("");
  const [selectedSupplierName, setSelectedSupplierName] = useState("");
  // const [freeQty, setFreeQty] = useState(0);
  // const [qty, setQty] = useState(0);
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
  const [company, setCompanyData] = useState([]);
  const [userid, setUserId] = useState("");
  const [chooseUser, setChooseUser] = useState([]);
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

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setSelectedCustomer(value);
    const selectedCustomerData = customer.find((cust) => cust.name === value);
    setChooseUser(selectedCustomerData);
    setFormData((prev) => ({
      ...prev,
      supplierName: selectedCustomerData ? selectedCustomerData.name : "",
      billingAddress: selectedCustomerData ? selectedCustomerData.address : "",
      placeOfSupply: selectedCustomerData ? selectedCustomerData.state : "",
    }));

    setPlaceOfSupply(selectedCustomerData ? selectedCustomerData.state : "");
    setBillingAddress(selectedCustomerData ? selectedCustomerData.address : "");
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

  // const handlePaymentTermChange = (e) => {
  //   const value = e.target.value;
  //   setPaymentTerm(value);
  //   setFormData((prev) => ({
  //     ...prev,
  //     paymentTerm: value,
  //   }));
  // };

  // const handleGstTypeChange = (e) => {
  //   const value = e.target.value;
  //   setGstType(value);
  //   setFormData((prev) => ({
  //     ...prev,
  //     gstType: value,
  //   }));
  // };

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
    currentRow.quantity=currentRow.qt;
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
    const schemeMargin =
      totalQuantity > 0 ? ((newFreeQty / totalQuantity) * 100).toFixed(2) : 0;

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
      const schemeMargin =
        totalQuantity > 0
          ? ((selectedRow.freeQty / totalQuantity) * 100).toFixed(2)
          : 0;

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
    const totalGST =
      gstType === "CGST/SGST"
        ? parseFloat(cgstRS) + parseFloat(sgstRS)
        : parseFloat(igstRS);
    updatedRows[rowIndex].totalValue = (taxableValue + totalGST).toFixed(2);

    // Update state with new rows
    setRows(updatedRows);
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

  const companyData = async () => {
    try {
      const response = await axios.get(`/api/v1/company/get/${userid}`);

      setCompanyData(response.data.data); // Assuming setCompanyData updates the company state
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  useEffect(() => {
    companyData(); // Fetch company data on component mount
  }, [auth, userid]); // Empty dependency array ensures this only runs once, on mount

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
      printSetSelectedInvoiceNo(selectedInvoice);
      if (
        selectedInvoice.placeOfSupply.trim().toLowerCase() ===
        company.state.trim().toLowerCase()
      ) {
        setGstType("CGST/SGST");
      } else {
        setGstType("IGST");
      }

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
    if (selectedInvoice) {
      // Update the rows state with the selected invoice rows
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
      toast.error(
        `${error.message} Unsupported file type! Only documents and images are allowed.`
      );
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
  const handlePrintOnly = () => {
    const printWindow = window.open("", "_blank");

    const submissionData = {
      ...formData,
      rows: rows.map((row) => ({
        itemCode: row.itemCode,
        productName: row.productName,
        hsnCode: row.hsnCode,
        qty: row.qty,
        freeQuantity: row.freeQty,
        units: row.units,
        mrp: row.maxmimunRetailPrice,
        discountRs: row.discountRs,
        discountpercent: row.discountpercent,

        UnitsCost: row.unitCost,
        schemeMargin: row.schemeMargin,

        taxableValue: row.taxableValue,
        cgstpercent: row.cgstpercent,
        cgstRS: row.cgstRS,
        sgstpercent: row.sgstpercent,
        sgstRS: row.sgstRS,
        igstpercent: row.igstpercent,
        igstRS: row.igstRS,
        totalValue: row.totalValue,
      })),
      grossAmount: grossAmount.toFixed(2),
      GstAmount: GstAmount.toFixed(2),
      otherCharges: otherCharges.toFixed(2),
      otherChargesDescriptions: otherChargesDescriptions,
      // salesType,
      // customerType,
      // reverseCharge,
      gstType,
      netAmount: netAmount.toFixed(2),
      // cash: paymentMethod === "Cash" ? cashDetails : {},
      // bank: paymentMethod === "Bank" ? bankDetails : {},
    };

    // Determine the table headers and the corresponding data based on gstType
    function numberToWords(num) {
      const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      function convertToWords(n) {
        if (n < 20) return ones[n];
        if (n < 100)
          return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
        if (n < 1000)
          return (
            ones[Math.floor(n / 100)] +
            " Hundred" +
            (n % 100 ? " " + convertToWords(n % 100) : "")
          );
        if (n < 100000)
          return (
            convertToWords(Math.floor(n / 1000)) +
            " Thousand" +
            (n % 1000 ? " " + convertToWords(n % 1000) : "")
          );
        return "";
      }

      // Split the number into integer and decimal parts
      const parts = num.toString().split(".");

      const integerPart = parseInt(parts[0], 10);
      const decimalPart = parts[1] ? parseInt(parts[1], 10) : 0;

      let words = convertToWords(integerPart) + " Rupees";

      // Handle the decimal part (paise)
      if (decimalPart > 0) {
        words += " and " + convertToWords(decimalPart) + " Paise";
      }

      return words;
    }
    const gstHeaders =
      submissionData.gstType === "CGST/SGST"
        ? `<th>CGST</th><th>SGST</th>`
        : `<th>IGST</th>`;

    const gstRows =
      submissionData.gstType === "CGST/SGST"
        ? submissionData.rows
            .map(
              (row, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${row.itemCode}</td>
            <td>${row.productName}</td>
            <td>${row.hsnCode}</td>
            <td>${row.units}</td>
            <td>${row.qty}</td>
            <td>${row.freeQuantity}</td>
            <td>${row.mrp}</td>
            <td>${row.UnitsCost}</td>
            <td>${row.schemeMargin}</td>
            <td>${row.discountpercent}% ${row.discountRs}</td>
            <td>${row.taxableValue}</td>
            <td>${row.cgstpercent}% ${row.cgstRS}</td>
            <td >${row.sgstpercent}% ${row.sgstRS}</td>
            <td>${row.totalValue}</td>
          </tr>`
            )
            .join("")
        : submissionData.rows
            .map(
              (row, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${row.itemCode}</td>
            <td>${row.productName}</td>
            <td>${row.hsnCode}</td>
            <td>${row.units}</td>
            <td>${row.qty}</td>
            <td>${row.freeQuantity}</td>
            <td>${row.mrp}</td>
            <td>${row.UnitsCost}</td>
            <td>${row.schemeMargin}</td>
            <td>${row.discountpercent}% ${row.discountRs}</td>
            <td>${row.taxableValue}</td>
            <td>${row.igstpercent}% ${row.igstRS}</td>
            <td>${row.totalValue}</td>
          </tr>`
            )
            .join("");

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
            .signature {
              text-align: right;
              margin-top: 50px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
        <div class="header">
          
            <div class="business-name"> ${company?.businessName} </div>
              <div> ${company?.address} </div>
              <div>GSTIN: ${company?.gstIn}</div>
            </div>
                <table class="table">
             <tr>
                  <th colspan="100%" style="color: blue; font-size: 24px; font-weight: bold; text-align: center;" class="heades">
                  Gst Invoice
                  </th>
              </tr>


         
            <tr>
              <td style="width: 30%;">
                <div style="text-align:left;" class="customer-details">
                  <div class="section-header">Supplier Details</div>
                  <div class="details">Name: <span>${
                    chooseUser.name
                  }</span></div>
                  <div class="details">Address: <span>${
                    chooseUser.address
                  }</span></div>
                  <div class="details">Contact: <span>${
                    chooseUser.contact
                  }</span></div>
                  <div class="details">GSTIN: <span>${
                    chooseUser.gstin
                  }</span></div>
                </div>
              </td>
              <td style="width: 30%;">
                <div style="text-align:left;" class="sales-estimate">
                  <div class="section-header"> Invoice Details</div>
                  <div class="details">Invoice No: <span>${
                    printSelectedInvoiceNo.invoiceNo
                  }</span></div>
                  <div class="details">Invoice Date: <span>${
                    printSelectedInvoiceNo.date
                  }</span></div>
                     <div class="details">Supplier Invoice: <span>${
                       printSelectedInvoiceNo.supplierInvoiceNo
                     }</span></div>
                  <div class="details">Place of Supply: <span>${
                    printSelectedInvoiceNo.placeOfSupply
                  }</span></div>
                   <div class="details">Due Date: <span>${
                     printSelectedInvoiceNo.dueDate
                   }</span></div>
                 
                </div>
              </td>
              <td style="width: 40%;">
                <div style="text-align:left;" class="transport-details">
                  <div class="section-header">Transport Details</div>
                 
                   

                  <div class="details">Dispatch Through: <span>${
                    printSelectedInvoiceNo.dispatchedThrough
                  }</span></div>
                   <div class="details">Destination: <span>${
                     printSelectedInvoiceNo.destination
                   }</span></div>
                   <div class="details">Carrier Name/Agent : <span>${
                     printSelectedInvoiceNo.carrierNameAgent
                   }</span></div>
                  <div class="details">Bill of Lading/LR-RR No.: <span>${
                    printSelectedInvoiceNo.billOfLading
                  }</span></div>
                  
                </div>
              </td>
            </tr>
          </table>
  
          <table class="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Item Code</th>
                <th>Product Name</th>
                <th>HSN Code</th>
                <th>UOM</th>
                <th>QTY</th>
                <th>Free QTY</th>
                <th>MRP</th>
                <th>Unit Cost</th>
                <th>Scheme Margin %</th>
                <th>Disccount</th>
                <th>Taxable Value</th>
                ${gstHeaders}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${gstRows}
            </tbody>
          </table>
       
           <table class="table">
              <tr>
                <td style="width: 33.33%; text-align: left;">
                  <div class="banking-details">
                    <div class="section-header">Banking Details</div>
                      <div class="details">Bank Name: ${
                        company?.bank_name || "-"
                      }</div>
                    <div class="details">IFSC Code: ${
                      company?.ifce_code || "-"
                    }</div>
                    <div class="details">Account No:${
                      company?.accountNumber || "-"
                    }</div>
                    <div class="details">Account Holder Name: ${
                      company?.account_holder_name || "-"
                    }</div>
                    <div class="details">UPI ID: ${company?.upiId || "-"}</div>
                </div>
                  </div>
                </td>
                
                 
         
               
                
               
                <td style="width: 33.33%; text-align: left;">
                  <div class="amount-details">
                    <div class="section-header">Amount Details</div>
                    <div class="details">Gross Total: ₹${
                      submissionData.grossAmount
                    }</div>
                    <div class="details">GST Amount: ₹${
                      submissionData.GstAmount
                    }</div>
                    <div class="details">Additional Charges: ₹${
                      submissionData.otherCharges
                    }</div>
                    <div class="details">Net Total: ₹${
                      submissionData.netAmount
                    }</div>
                    <div class="details">Amount in Words:${numberToWords(
                      submissionData.netAmount
                    )}</div>
                  </div>
                </td>
              </tr>
            </table>
  
            <div style="margin-top:100px" class="mt-10">
                  <div class="section-header">Terms & Condition</div>
                  <div class="details">Your terms and conditions go here...</div>
                </div>
  
          <div  class="signature">
         
          
            <div>For (Business Name)</div>
            <div style="margin-top: 20px;">Signature</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    printWindow.onafterprint = () => {
      printWindow.close(); // Close the print window after printing

      // Create a fake event object (optional)
      const dummyEvent = {
        preventDefault: () => {},
      };

      handleSubmit(dummyEvent); // Call handleSubmit with the dummy event
    };

    // Trigger the print dialog
    printWindow.print();
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

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
          <div>
            <label className="font-bold">Supplier Name</label>
            <select
              value={selectedSupplierName}
              onChange={(e) => {
                setSelectedSupplierName(e.target.value);
                handleCustomerChange(e); // Set the selected supplier name
                setSelectedInvoiceNo(""); // Reset the selected invoice when the supplier changes
              }}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Supplier Name</option>
              {purchaseInvoice
                .map((invoice) => invoice.supplierName) // Get supplier names
                .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                .map((supplierName) => (
                  <option key={supplierName} value={supplierName?._id}>
                    {supplierName}
                  </option>
                ))}
            </select>
          </div>

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
              {purchaseInvoice
                .filter(
                  (invoice) => invoice.supplierName === selectedSupplierName
                ) // Filter by selected supplier
                .map((invoice) => (
                  <option key={invoice._id} value={invoice.invoiceNo}>
                    {invoice.invoiceNo}
                  </option>
                ))}
            </select>
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
          {/* {salesType === "GST Invoice" && (
            <div className="mb-4 w-full">
              <label className="font-bold">Tax Type:</label>
              <select
                value={gstType}
                // onChange={handleGstTypeChange}
                className="border p-2 w-full  rounded"
              >
                <option value="CGST/SGST">CGST/SGST</option>
                <option value="IGST">IGST</option>
              </select>
            </div>
          )} */}
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
                      value={
                        rows[index]?.quantity > 0 ? rows[index].quantity : ""
                      } // Show quantity if > 0, otherwise empty
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

          <button
            onClick={handlePrintOnly}
            className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-black p-2"
          >
            Save and Print
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PurchesReturn;
