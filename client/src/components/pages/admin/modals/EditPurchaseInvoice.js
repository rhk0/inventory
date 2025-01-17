import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import Modal from "react-modal";
import { useAuth } from "../../../context/Auth.js";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditPurchaseInvoice = ({ closeModal, estimate }) => {
  const [documentPath, setdocumentPath] = useState(null);
  const [date, setDate] = useState("");
  const [InvoiceNo, setInvoiceNo] = useState("");
  const [salesType, setSalesType] = useState("");
  const [company, setCompanyData] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [selectedsupplier, setSelectedsupplier] = useState("");
  const [chooseUser, setChooseUser] = useState([]);
  const [SupplierName, setSupplierName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [receiptDocNo, setReceiptDocNo] = useState("");
  const [dispatchedThrough, setDispatchedThrough] = useState("");
  const [destination, setDestination] = useState("");
  const [carrierNameAgent, setCarrierNameAgent] = useState("");
  const [billOfLading, setBillOfLading] = useState("");
  const [motorVehicleNo, setMotorVehicleNo] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [reverseCharge, setReverseCharge] = useState("");
  const [gstType, setGstType] = useState();
  const [rows, setRows] = useState([]);
  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [narration, setNarration] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [GstAmount, setGstAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [supplierInvoiceNo, setsupplierInvoiceNo] = useState("");
  const [qty, setQty] = useState(0);
  const [gstRatev, setgstRatev] = useState();
  const [banks, setBanks] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [bank, setBank] = useState([]);
  const [cash, setCash] = useState([]);
  const [purchaseType, setpurchaseType] = useState('')


  const [selectedBank, setSelectedBanks] = useState([]);
  const [selectedcash, setSelectedCash] = useState("");
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  useEffect(() => {
    if (estimate) {
      setDate(estimate.date || "");
      setpurchaseType(estimate.purchaseType)

      setInvoiceNo(estimate.invoiceNo || "");
      setsupplierInvoiceNo(estimate.supplierInvoiceNo || "");

      setPlaceOfSupply(estimate.placeOfSupply || "");
      setPaymentTerm(estimate.paymentTerm || "");
      setDueDate(estimate.dueDate || "");

      if (estimate.bank) {
        setBank({
          bank: estimate.bank.bank || "",
          selectBankType: estimate.bank.selectBankType || "",
          transactionDate: estimate.bank.transactionDate || "",
          chequeNo: estimate.bank.chequeNo || "",
          transactionNo: estimate.bank.transactionNo || "",
          Amount: estimate.bank.Amount || "",
          Advance: estimate.bank.Advance || "",
          Received: estimate.bank.Received || "",
          Balance: estimate.bank.Balance || "",
        });
      } else {
        setBank({
          bank: "",
          selectBankType: "",
          transactionDate: "",
          chequeNo: "",
          transactionNo: "",
          Amount: "",
          Advance: "",
          Received: "",
          Balance: "",
        });
      }

      if (estimate.cash) {
        setCash({
          Amount: estimate.cash.Amount || "",
          Advance: estimate.cash.Advance || "",
          Received: estimate.cash.Received || "",
          Balance: estimate.cash.Balance || "",
        });
      } else {
        setCash({
          Amount: "",
          Advance: "",
          Received: "",
          Balance: "",
        });
      }

      setReceiptDocNo(estimate.receiptDocNo || "");
      setDispatchedThrough(estimate.dispatchedThrough || "");
      setDestination(estimate.destination || "");
      setCarrierNameAgent(estimate.carrierNameAgent || "");
      setBillOfLading(estimate.billOfLading || "");
      setMotorVehicleNo(estimate.motorVehicleNo || "");
      setBillingAddress(estimate.billingAddress || "");
      setReverseCharge(estimate.reverseCharge || "");
      setGstType(estimate.gstType || "");
      setRows(estimate.rows || []);
      setOtherChargesDescriptions(estimate.otherChargesDescriptions || "");
      setOtherCharges(estimate.otherCharges || "");
      setNarration(estimate.narration || "");
      setGrossAmount(estimate.grossAmount || "");
      setGstAmount(estimate.GstAmount || "");
      setNetAmount(estimate.netAmount || "");

      setdocumentPath(estimate.documentPath || "");

      const updatedRows = estimate.rows.map((row) => {
        const { igstpercent, ...rest } = row;
        setgstRatev(igstpercent);
      });
    }
  }, [estimate]);

  const openViewModal = (suppliers) => {
    setViewModal(true);
  };
  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id);
    }
    if (auth.user.role === 0) {
      setUserId(auth.user.admin);
    }
    fetchBanks();
  }, [auth, userId]);

  const fetchBanks = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageBank/${userId}`);
      setBanks(response.data.data);
    } catch (error) {
      console.error("Error fetching Bank data", error);
    }
  };
  const fetchsupplier = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageSupplier/${userId}`);
      setSupplier(response.data.data);
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
  }, [auth, userId]);
  useEffect(() => {
    const companyData = async () => {
      try {
        const response = await axios.get(`/api/v1/company/get/${userId}`);
        setCompanyData(response.data.data); // Assuming setCompanyData updates the company state
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    companyData(); // Fetch company data on component mount
  }, [userId]); // Empty dependency array ensures this only runs once, on mount

  const handlesupplierChange = (e) => {
    const value = e.target.value;
    setSelectedsupplier(value);
    setSelectedBanks([]); // Clear selected banks
    setSelectedCash(""); // Clear selected cash
    const selectedSupplierData = supplier.find((cust) => cust._id === value);
    setChooseUser(selectedSupplierData);

    // Set relevant details from selected supplier
    setSupplierName(selectedSupplierData?.name || "");
    setBillingAddress(selectedSupplierData?.address || "");
    setPlaceOfSupply(selectedSupplierData?.state || "");

    // Determine GST type
    setGstType(
      selectedSupplierData.state.trim().toLowerCase() ===
        company.state.trim().toLowerCase()
        ? "CGST/SGST"
        : "IGST"
    );
  };

  const handleCashPayment = (value) => {
    setSelectedCash(value);
    setSelectedsupplier(""); // Clear selected supplier
    setSelectedBanks([]); // Clear selected banks
    setSupplierName(""); // Clear supplier name
    setBillingAddress(""); // Clear billing address
    setPlaceOfSupply(""); // Clear place of supply
    setGstType("CGST/SGST");
  };

  const handleBanksChange = (bankId) => {
    const selectedBank = banks.find((bank) => bank._id === bankId);
    setSelectedBanks(selectedBank);
    setSelectedCash(""); // Clear selected cash
    setSelectedsupplier(""); // Clear selected supplier
    setSupplierName(""); // Clear supplier name
    setBillingAddress(""); // Clear billing address
    setPlaceOfSupply(""); // Clear place of supply
    setGstType("CGST/SGST");
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const [subPaymentType, setSubPaymentType] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };



  const handleSubPaymentTypeChange = (e) => {
    setBank({ ...bank, selectBankType: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otherCharges") {
      setOtherCharges(value);
      calculateTotalAmounts();
    }
    switch (name) {
      case "receiptDocNo":
        setReceiptDocNo(value);
        break;
      case "dispatchedThrough":
        setDispatchedThrough(value);
        break;
      case "destination":
        setDestination(value);
        break;
      case "carrierNameAgent":
        setCarrierNameAgent(value);
        break;
      case "billOfLading":
        setBillOfLading(value);
        break;
      case "motorVehicleNo":
        setMotorVehicleNo(value);
        break;
      case "date":
        setDate(value);
        break;
      case "InvoiceNo":
        setInvoiceNo(value);
        break;
      case "salesType":
        setSalesType(value);
        break;
      case "customerType":
        setCustomerType(value);
        break;
      case "SupplierName":
        setSupplierName(value);
        break;
      case "placeOfSupply":
        setPlaceOfSupply(value);
        break;
      case "paymentTerm":
        setPaymentTerm(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "billingAddress":
        setBillingAddress(value);
        break;
      case "reverseCharge":
        setReverseCharge(value);
        break;
      case "gstType":
        setGstType(value);
        break;
      case "otherChargesDescriptions":
        setOtherChargesDescriptions(value);
        break;
      case "otherCharges":
        setOtherCharges(value);
        break;
      case "narration":
        setNarration(value);
        break;
      case "grossAmount":
        setGrossAmount(value);
        break;
      case "GstAmount":
        setGstAmount(value);
        break;
      case "netAmount":
        setNetAmount(value);
        break;
      default:
        break;
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemCode: "",
        productName: "",
        hsnCode: "",
        qty: 0,
        unit: "",
        freeQty: "",
        maxmimunRetailPrice: 0,
        unitCost: 0,
        schemeMargin: 0,
        discountpercent: 0,
        discountRS: 0,
        taxableValue: 0,
        cgstpercent: 0,
        cgstRS: 0,
        sgstRS: 0,
        sgstpercent: 0,
        igstpercent: 0,
        igstRS: 0,
        totalValue: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows]; // Clone the existing rows array
    const currentRow = updatedRows[rowIndex]; // Get the current row

    if (field === "discountpercent") {
      const discountPercent = parseFloat(value) || 0; // Ensure a valid number
      currentRow.discountpercent = discountPercent;

      const unitCost = Number(currentRow.unitCost);
      const discountRS = (unitCost * discountPercent) / 100; // Calculate discount in Rs
      currentRow.discountRs = discountRS.toFixed(2);

      const qt = Number(currentRow.qty); // Make sure you're using the correct qty for the current row
      const taxableValue = (unitCost - discountRS) * qt; // Calculate taxable value
      currentRow.taxableValue = taxableValue.toFixed(2); // Ensure consistent format

      const gstRate = Number(gstRatev) || 0; // Get the GST rate
      {
        console.log(gstRate, "aslkfdj");
      }
      const cgstRS = (taxableValue * (gstRate / 2)) / 100;
      const sgstRS = (taxableValue * (gstRate / 2)) / 100;
      const igstRS = (taxableValue * gstRate) / 100;

      currentRow.cgstRS = cgstRS.toFixed(2);
      currentRow.sgstRS = sgstRS.toFixed(2);
      currentRow.igstRS = igstRS.toFixed(2);

      // Update totalValue as taxableValue + GST amount
      const totalGST =
        currentRow.cgstRS && currentRow.sgstRS ? cgstRS + sgstRS : igstRS;
      currentRow.totalValue = (taxableValue + totalGST).toFixed(2);
    } else if (field === "discountRs") {
      const discountRs = parseFloat(value) || 0;
      const unitCost = Number(currentRow.unitCost);
      const discountPercent = (discountRs / unitCost) * 100;

      currentRow.discountpercent = discountPercent.toFixed(2);
      currentRow.discountRs = discountRs.toFixed(2);

      const qt = Number(currentRow.qty);
      const taxableValue = (unitCost - discountRs) * qt; // Calculate taxable value
      currentRow.taxableValue = taxableValue.toFixed(2);

      const gstRate = Number(gstRatev) || 0; // Get the GST rate
      const cgstRS = (taxableValue * (gstRate / 2)) / 100;
      const sgstRS = (taxableValue * (gstRate / 2)) / 100;
      const igstRS = (taxableValue * gstRate) / 100;

      currentRow.cgstRS = cgstRS.toFixed(2);
      currentRow.sgstRS = sgstRS.toFixed(2);
      currentRow.igstRS = igstRS.toFixed(2);

      // Update totalValue as taxableValue + GST amount
      const totalGST =
        currentRow.cgstRS && currentRow.sgstRS ? cgstRS + sgstRS : igstRS;
      currentRow.totalValue = (taxableValue + totalGST).toFixed(2);
    }

    // Update the rows state
    updatedRows[rowIndex] = currentRow;
    setRows(updatedRows);
  };

  const handlQtyChange = (rowIndex, qty) => {
    const updatedRows = [...rows];

    const selectedRow = updatedRows[rowIndex];

    setQty(qty);
    updatedRows[rowIndex] = {
      ...selectedRow,
      qty: qty,
    };

    setRows(updatedRows);
  };

  const calculateTotalAmounts = () => {
    let grossAmount = 0;
    let GstAmount = 0;
    let totalOtherCharges = parseFloat(otherCharges) || 0;

    rows.forEach((row) => {
      const taxableValue = parseFloat(row.taxableValue) || 0;
      const cgstRS = parseFloat(row.cgstRS) || 0;
      const sgstRS = parseFloat(row.sgstRS) || 0;
      const igstRS = parseFloat(row.igstRS) || 0;

      grossAmount += taxableValue;
      GstAmount += cgstRS + sgstRS; // Total GST amount for each row
    });

    let netAmount;
    // Check if otherChargesDescriptions includes "discount" to decide calculation
    if (otherChargesDescriptions.toLowerCase().includes("discount")) {
      netAmount = grossAmount + GstAmount - totalOtherCharges;
    } else {
      netAmount = grossAmount + GstAmount + totalOtherCharges;
    }
    setGrossAmount(grossAmount.toFixed(2));
    setGstAmount(GstAmount.toFixed(2));
    setNetAmount(netAmount);
  };

  useEffect(() => {
    calculateTotalAmounts();
  }, [rows, otherCharges]);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageproduct/${userId}`);

      console.log(response, "kasjfksdj");
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

  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id);
    }
    if (auth.user.role === 0) {
      setUserId(auth.user.admin);
    }
    fetchProducts();
  }, [auth, userId]);

  const handleFreeQtyChange = (rowIndex, newFreeQty) => {
    console.log(newFreeQty, "hfgdhghdhf  dfsf dad");
    const updatedRows = [...rows];
    const selectedRow = updatedRows[rowIndex];

    // Update the free quantity in the selected row
    const freeQty = parseFloat(newFreeQty) || 0; // Ensure it's a valid number

    // Calculate total quantity using the quantity from the selected row
    const totalQuantity = Number(qty) + freeQty;

    // Calculate schemeMargin only if both freeQty and quantity exist
    const schemeMargin =
      freeQty && qty ? ((freeQty / totalQuantity) * 100).toFixed(2) : 0;

    console.log(schemeMargin, "schemeMargin");

    // Update the row with the new freeQty and schemeMargin
    updatedRows[rowIndex] = {
      ...selectedRow,
      freeQty: freeQty,
      schemeMargin: schemeMargin,
    };

    // Update the state with the modified rows
    setRows(updatedRows);
  };

  const handleProductSelect = (rowIndex, selectedProductName) => {
    const selectedProduct = products.find(
      (product) => product.productName === selectedProductName
    );

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex);
    }
  };

  const handleItemCodeSelect = (rowIndex, selectedItemCode) => {
    const selectedProduct = products.find(
      (product) => product.itemCode === selectedItemCode
    );

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex);
    }
  };

  const updateRowValues = (selectedProduct, rowIndex) => {
    const updatedRows = [...rows]; // Clone the current rows

    // Calculate retail price and taxableValue value based on product details
    if (selectedProduct) {
      setgstRatev(selectedProduct.gstRate);
      const updatedRows = [...rows];

      // Calculate retail price
      const retailPrice =
        selectedProduct.maxmimunRetailPrice -
        (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
        100;

      // Determine if sales tax is included from the fetched product data
      const salesTaxInclude = selectedProduct.salesTaxInclude;

      // Calculate taxable value based on salesTaxInclude
      const taxableValue = 0;

      // Update the row with the new values, schemeMargin is excluded here since it's handled separately
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        hsnCode: selectedProduct.hsnCode,
        unit: selectedProduct.unit,
        productName: selectedProduct.productName,
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice
          ? parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2)
          : "0.00",
        // quantity: selectedProduct.quantity,
        expiryDate: selectedProduct.expiryDate,
        batchNo: selectedProduct.batchNo,
        unitCost: selectedProduct.purchasePriceExGst,
        schemeMargin: updatedRows[rowIndex].schemeMargin || 0, // Existing or initial value

        taxableValue: taxableValue,

        cgstpercent: selectedProduct.gstRate / 2,
        sgstpercent: selectedProduct.gstRate / 2,
        igstpercent: selectedProduct.gstRate,

        cgstRS: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        sgstRS: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        igstRS: parseFloat(
          ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2)
        ),

        totalValue: (
          taxableValue +
          (taxableValue * selectedProduct.gstRate) / 100
        ).toFixed(2),
      };

      setRows(updatedRows);
    }

    // Recalculate total amounts after updating the row
    calculateTotalAmounts();
  };


  const handleCashChange = (e) => {
    const { name, value } = e.target;
    const updatedCash = { ...cash, [name]: value };

    // Perform dynamic calculations
    const amount = parseFloat(updatedCash.Amount || 0);
    const received = parseFloat(updatedCash.Received || 0);
    const advance = parseFloat(updatedCash.Advance || 0);

    updatedCash.Balance = amount - received - advance;

    setCash(updatedCash);
  };


  const handleBankChange = (e) => {
    const { name, value } = e.target;
    const updatedBank = { ...bank, [name]: value };

    // Perform dynamic calculations
    const amount = parseFloat(updatedBank.Amount || 0);
    const received = parseFloat(updatedBank.Received || 0);
    const advance = parseFloat(updatedBank.Advance || 0);

    updatedBank.Balance = amount - received - advance;

    setBank(updatedBank);
  };


  useEffect(() => {
    if (viewModal) {
      setCash({
        Amount: netAmount,
        Advance: cash.Advance,
        Received: cash.Received,
        Balance: cash.Balance, // Assuming initial balance equals net amount
      });
      setBank({
        Amount: netAmount,
        Advance: bank.Advance,
        Received: cash.Received,
        Balance: bank.Balance, // Assuming initial balance equals net amount
      });
    }
  }, [viewModal, netAmount]);

  const handleUpdate = async () => {
    try {
      const submissionData = new FormData();

      // Prepare transport details with fallback values
      const transportDetails = estimate.transportDetails || {};
      const fields = {
        date,
        invoiceNo: InvoiceNo,
        supplierInvoiceNo,
        customerType,
        placeOfSupply,
        paymentTerm,
        dueDate,
        receiptDocNo: transportDetails.receiptDocNo || "",
        dispatchedThrough: transportDetails.dispatchedThrough || "",
        destination: transportDetails.destination || "",
        carrierNameAgent: transportDetails.carrierNameAgent || "",
        billOfLading: transportDetails.billOfLading || "",
        motorVehicleNo: transportDetails.motorVehicleNo || "",
        billingAddress,
        reverseCharge,
        gstType,
        otherChargesDescriptions,
        narration,
        grossAmount: parseFloat(grossAmount).toFixed(2),
        GstAmount: parseFloat(GstAmount).toFixed(2),
        otherCharges: parseFloat(otherCharges).toFixed(2),
        netAmount: parseFloat(netAmount).toFixed(2),
      };

      // Append all fields to FormData
      Object.entries(fields).forEach(([key, value]) => {
        submissionData.append(key, value);
      });

      // Append supplier name
      submissionData.append("supplierName", SupplierName || "");

      // Append rows
      rows.forEach((row, index) => {
        Object.entries(row).forEach(([key, value]) => {
          submissionData.append(`rows[${index}][${key}]`, value);
        });
      });

      // Serialize cash and bank objects before appending

      submissionData.append("cash", JSON.stringify(cash));
      submissionData.append("bank", JSON.stringify(bank));

      // Append document if available
      if (documentPath) {
        submissionData.append("documentPath", documentPath);
      }

      // Log FormData for debugging
      console.log("Submitting the following data:");
      for (let [key, value] of submissionData.entries()) {
        console.log(key, value);
      }

      // Make the API call
      const response = await axios.put(
        `/api/v1/purchaseInvoiceRoute/updatepurchaseinvoice/${estimate._id}`,
        submissionData
      );

      // Handle response
      if (response.data.success) {
        toast.success("Invoice updated successfully");
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        alert("Failed to update invoice: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating invoice:", error);

      // Show error message to user
      alert(
        `Error updating invoice: ${error.response?.data?.message || error.message
        }`
      );
    }
  };

  const closeViewModal = () => {
    setViewModal(false);
  };

  return (
    <div style={{ backgroundColor: "#F4F4F5" }} className="p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-center text-black text-2xl underline mb-4"></h1>
        <button
          type="button"
          className="text-black hover:text-black border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-bold">
            Date:
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>

        <div>
          <label className="font-bold">Purchase Type</label>
          <input
            value={purchaseType}
            onChange={handleChange}
            className="border p-2 w-full  rounded"
          ></input>
        </div>
        <div>
          <label className="font-bold">Invoice No.</label>
          <input
            type="text"
            name="InvoiceNo"
            value={InvoiceNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-bold"> Supplier Invoice No.</label>
          <input
            type="text"
            name="InvoiceNo"
            value={supplierInvoiceNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-bold">Supplier Name</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedValue}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedValue(selectedValue); // Update the selected value

              if (selectedValue === "add-new-supplier") {
                window.location.href = "/admin/CreateSupplier";
              } else if (selectedValue === "add-new-bank") {
                window.location.href = "/admin/addbank";
              } else if (selectedValue === "cash") {
                handleCashPayment(selectedValue);
              } else if (selectedValue.startsWith("bank-")) {
                handleBanksChange(selectedValue.replace("bank-", ""));
              } else {
                handlesupplierChange(e);
              }
            }}
          >
            <optgroup label="Suppliers">
              {supplier?.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
              <option value="add-new-supplier" className="text-blue-500">
                + Add New Supplier
              </option>
            </optgroup>

            <optgroup label="Banks">
              {Array.isArray(banks) &&
                banks.map((bank) => (
                  <option key={bank._id} value={`bank-${bank._id}`}>
                    {bank.name}
                  </option>
                ))}
              <option value="cash" className="text-green-500">
                Cash
              </option>
            </optgroup>
          </select>
        </div>
        <div>
          <label className="font-bold">Place of Supply</label>
          <input
            type="text"
            name="placeOfSupply"
            value={placeOfSupply}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">
            Payment Term (days):
            <input
              type="number"
              name="paymentTerm"
              value={paymentTerm}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>

        <div>
          <label className="font-bold">
            Due Date
            <input
              type="text"
              value={dueDate}
              name="dueDate"
              onChange={handleChange}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg z-50">
            <h4 className="font-bold mb-4">Transport Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Dispatched Through</label>
                <input
                  type="text"
                  name="dispatchedThrough"
                  value={dispatchedThrough}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={destination}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Carrier Name/Agent</label>
                <input
                  type="text"
                  name="carrierNameAgent"
                  value={carrierNameAgent}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Bill of Lading/LR-RR No.</label>
                <input
                  type="text"
                  name="billOfLading"
                  value={billOfLading}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
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
            name="billingAddress"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="font-bold">Reverse Charge</label>
          <select
            value={reverseCharge}
            onChange={handleChange}
            name="reverseCharge"
            className="border p-2 w-full rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {salesType === "GST Invoice" && (
          <div className="mb-4 w-full">
            <label className="font-bold">GST Type:</label>
            <select
              value={gstType}
              name="gstType"
              onChange={handleChange}
              className="border p-2 w-full rounded"
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
              <th className="border p-2">#</th>
              <th className="border p-2">Item Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2 ">unit</th>
              <th className="border p-2 ">free Qty</th>

              <th className="border p-2">MRP</th>
              <th className="border p-2">Unit Cost</th>
              <th className="border p-2">Scheme Margin</th>

              <th className="border p-2">
                Discount
                <div className="flex justify-between">
                  <span className="mr-16">%</span> <span>₹</span>
                </div>
              </th>
              <>
                <th className="border p-2">Taxable</th>
                {gstType === "CGST/SGST" && (
                  <>
                    <th className="border p-2">
                      CGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                    <th className="border p-2">
                      SGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                  </>
                )}
                {gstType === "IGST" && (
                  <th className="border p-2">
                    IGST
                    <div className="flex justify-between">
                      <span className="mr-16">%</span> <span>₹</span>
                    </div>
                  </th>
                )}
              </>
              <th className="border p-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <td className="border">
                    <Select
                      id="itemcode-select"
                      value={
                        rows[index].itemCode
                          ? {
                            label: rows[index].itemCode,
                            value: rows[index].itemCode,
                          }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleItemCodeSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.itemCode,
                        value: product.itemCode,
                      }))}
                      isSearchable={true}
                      placeholder="Select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: "120px",
                          maxWidth: "300px",
                          fontSize: "14px",
                          minHeight: "34px",
                          height: "34px",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <td className="border ">
                    <Select
                      id="product-select"
                      value={
                        rows[index].productName
                          ? {
                            label: rows[index].productName,
                            value: rows[index].productName,
                          }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleProductSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.productName,
                        value: product.productName,
                      }))}
                      isSearchable={true}
                      placeholder="Select a Product"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: "200px",
                          maxWidth: "500px",
                          fontSize: "14px",
                          minHeight: "34px",
                          height: "34px",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.hsnCode}
                    onChange={(e) =>
                      handleRowChange(index, "hsnCode", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "80px",
                      flexBasis: "80px",
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={(e) => handlQtyChange(index, e.target.value)}
                    className="w-full flex-grow"
                    style={{
                      minWidth: "50px",
                      flexBasis: "50px",
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.unit}
                    onChange={(e) =>
                      handleRowChange(index, "unit", e.target.value)
                    }
                    className="w-full flex-grow bg-white"
                    style={{
                      minWidth: "40px", // Set a small minimum width to ensure visibility
                      flexBasis: "40px", // Allow it to shrink, but still have a base width
                      flexShrink: 1, // Allow it to shrink on mobile
                    }} />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    name="freeQty"
                    value={row.freeQty}
                    onChange={(e) => handleFreeQtyChange(index, e.target.value)}
                    className="w-full flex-grow"
                    style={{
                      minWidth: "40px",
                      flexBasis: "40px",
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="number"
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
                      minWidth: "60px",
                      flexBasis: "60px",
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.unitCost}
                    onChange={(e) =>
                      handleRowChange(index, "unitCost", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "50px",
                      flexBasis: "50px",
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
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
                        minWidth: "20px",
                        flexBasis: "20px",
                        flexShrink: 1,
                      }}
                    />
                    <input
                      type="text"
                      value={row.discountRs}
                      onChange={
                        (e) =>
                          handleRowChange(index, "discountRs", e.target.value) // Fix here
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: "60px",
                        flexBasis: "60px",
                        flexShrink: 1,
                      }}
                    />
                  </div>
                </td>
                <>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.taxableValue}
                      onChange={(e) =>
                        handleRowChange(index, "taxableValue", e.target.value)
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: "110px",
                        flexBasis: "110px",
                        flexShrink: 1,
                      }}
                    />
                  </td>
                  {gstType === "CGST/SGST" && (
                    <>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.cgstpercent}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "cgstpercent",
                                e.target.value
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "50px",
                              flexBasis: "50px",
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="number"
                            value={row.cgstRS}
                            onChange={(e) =>
                              handleRowChange(index, "cgstRS", e.target.value)
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "110px",
                              flexBasis: "110px",
                              flexShrink: 1,
                            }}
                          />
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.sgstpercent}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "sgstpercent",
                                e.target.value
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "50px",
                              flexBasis: "50px",
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="number"
                            value={row.sgstRS}
                            onChange={(e) =>
                              handleRowChange(index, "sgstRS", e.target.value)
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "110px",
                              flexBasis: "110px",
                              flexShrink: 1,
                            }}
                          />
                        </div>
                      </td>
                    </>
                  )}
                  {gstType === "IGST" && (
                    <td className="border p-2">
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={row.igstpercent}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              "igstpercent",
                              e.target.value
                            )
                          }
                          className="w-full flex-grow bg-white"
                          style={{
                            minWidth: "50px",
                            flexBasis: "50px",
                            flexShrink: 1,
                          }} />
                        <input
                          type="number" 
                          value={row.igstRS}
                          onChange={(e) =>
                            handleRowChange(index, "igstRS", e.target.value)
                          }
                          className="w-full flex-grow bg-white"
                          style={{
                            minWidth: "100px", // Set a small minimum width to ensure visibility
                            flexBasis: "100px", // Allow it to shrink, but still have a base width
                            flexShrink: 1, // Allow it to shrink on mobile
                          }} />
                      </div>
                    </td>
                  )}
                </>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.totalValue}
                    onChange={(e) =>
                      handleRowChange(index, "totalValue", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "110px",
                      flexBasis: "110px",
                      flexShrink: 1,
                    }}
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
      {/* Other Charges */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOtherChargesOpen(true)}
          className="text-blue-800 text-md p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          Edit Other Charges
        </button>
      </div>

      {isModalOtherChargesOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Other Charges Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Other Charges Description</label>
                <input
                  type="text"
                  name="otherChargesDescriptions"
                  value={otherChargesDescriptions}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Other Charges</label>
                <input
                  type="text"
                  name="otherCharges"
                  value={otherCharges}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOtherChargesOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 mb-4">
        <label className="w-1/4 text-white text-md p-2 rounded bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          </svg>{" "}
          change Document
          <input
            type="file"
            className="hidden"
            onChange={(e) => setdocumentPath(e.target.files[0])}
          />
        </label>
      </div>

      {/* Narration and Amounts */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <label className="font-bold">Narration</label>
          <br />
          <textarea
            value={narration}
            name="narration"
            onChange={handleChange}
            className="text-black border p-1 w-full rounded"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Gross Amount
            </label>
            <input
              type="text"
              name="grossAmount"
              value={grossAmount}
              onChange={handleChange}
              className="text-black border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">GST Amount</label>
            <input
              type="text"
              name="GstAmount"
              value={GstAmount}
              // onChange={handleChange}
              className="text-black border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Other Charges
            </label>
            <input
              type="text"
              name="otherCharges"
              value={otherCharges}
              onChange={handleChange}
              className="text-black border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">Net Amount</label>
            <input
              type="text"
              name="netAmount"
              value={netAmount}
              onChange={handleChange}
              className="text-black border p-1 w-full rounded lg:w-2/3"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => openViewModal()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Receipt
            </button>

            <Modal
              isOpen={viewModal}
              onRequestClose={closeModal}
              contentLabel="View Item Modal"
              style={{
                content: {
                  width: "80%",
                  height: "90%",
                  maxWidth: "800px",
                  margin: "auto",
                  padding: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                },
              }}
            >
              <div className="bg-white p-4 rounded shadow-lg w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-4 text-black">Payment</h2>

                {/* Radio buttons to select payment method */}
                <div className="gap-5 mb-4">
                  <label className="font-bold">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "Cash"}
                    />
                    Cash
                  </label>
                  <label className="ml-5 font-bold">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Bank"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "Bank"}
                    />
                    Bank
                  </label>
                </div>

                {/* Conditional form rendering based on payment method */}
                <form>
                  {paymentMethod === "Cash" && (
                    <>
                      <label className="font-bold">Amount</label>
                      <input
                        type="text"
                        name="Amount"
                        value={cash.Amount}
                        className="border p-2 mb-2 w-full"
                        onChange={handleCashChange}
                      />
                      <label className="font-bold">Advance</label>
                      <input
                        type="text"
                        name="Advance"
                        value={cash.Advance}
                        className="border p-2 mb-2 w-full"
                        onChange={handleCashChange}
                      />
                      <label className="font-bold">Received</label>
                      <input
                        type="text"
                        name="Received"
                        value={cash.Received}
                        className="border p-2 mb-2 w-full"
                        onChange={handleCashChange}
                      />
                      <label className="font-bold">Balance</label>
                      <input
                        type="text"
                        name="Balance"
                        value={cash.Balance}
                        className="border p-2 mb-2 w-full"
                        onChange={handleCashChange}
                      />
                    </>
                  )}

                  {paymentMethod === "Bank" && (
                    <>
                      <label className="font-bold">Select Bank</label>
                      <select
                        name="bank"
                        value={bank.bank}
                        onChange={handleBankChange}
                        className="border p-2 mb-2 w-full"
                      >
                        <option value="">Select Bank</option>
                        {banks.map((bank, index) => (
                          <option key={index} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </select>

                      <select
                        name="subPaymentType"
                        className="border p-2 mb-2 w-full"
                        onChange={handleSubPaymentTypeChange}
                        value={bank.selectBankType}
                      >
                        <option value="">Select Payment Type</option>
                        <option value="Online">Online</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      {bank.selectBankType === "Online" && (
                        <>
                          <label className="font-bold">Transaction Date</label>
                          <input
                            type="text"
                            name="transactionDate"
                            className="border p-2 mb-2 w-full"
                            value={bank.transactionDate}
                            onChange={handleBankChange}
                          />
                          <label className="font-bold">Transaction No</label>
                          <input
                            type="text"
                            name="transactionNo"
                            value={bank.transactionNo}
                            className="border p-2 mb-2 w-full"
                            onChange={handleBankChange}
                          />
                        </>
                      )}
                      {bank.selectBankType === "Cheque" && (
                        <>
                          <label className="font-bold">Transaction Date</label>
                          <input
                            type="text"
                            name="transactionDate"
                            value={bank.transactionDate}
                            className="border p-2 mb-2 w-full"
                            onChange={handleBankChange}
                          />
                          <label className="font-bold">Cheque No</label>
                          <input
                            type="text"
                            name="chequeNo"
                            value={bank.chequeNo}
                            className="border p-2 mb-2 w-full"
                            onChange={handleBankChange}
                          />
                        </>
                      )}
                      <label className="font-bold">Amount</label>
                      <input
                        type="text"
                        name="Amount"
                        value={bank.Amount}
                        className="border p-2 mb-2 w-full"
                        onChange={handleBankChange}
                      />
                      <label className="font-bold">Advance</label>
                      <input
                        type="text"
                        name="Advance"
                        value={bank.Advance}
                        className="border p-2 mb-2 w-full"
                        onChange={handleBankChange}
                      />
                      <label className="font-bold">Received</label>
                      <input
                        type="text"
                        name="Received"
                        value={bank.Received}
                        className="border p-2 mb-2 w-full"
                        onChange={handleBankChange}
                      />
                      <label className="font-bold">Balance</label>
                      <input
                        type="text"
                        name="Balance"
                        value={bank.Balance}
                        className="border p-2 mb-2 w-full"
                        onChange={handleBankChange}
                      />
                    </>
                  )}

                  {/* Submit button */}
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 h-10 "
                      onClick={() => {
                        closeViewModal();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Save Changes
            </button>

            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditPurchaseInvoice;
