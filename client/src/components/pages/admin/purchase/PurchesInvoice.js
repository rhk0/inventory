// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import PurchesInvoiceModel from "../modals/PurchesInvoiceModel";
// const PurchesInvoice = () => {
//   // State for form fields
//   const [viewModal, setViewModal] = useState(false);
//   const [date, setDate] = useState("");
//   const [invoiceNo, setinvoiceNo] = useState("");
//   const [purchaseType, setpurchaseType] = useState("GST Invoice");
//   const [customerType, setCustomerType] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [placeOfSupply, setPlaceOfSupply] = useState("");
//   const [paymentTerms, setPaymentTerms] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [otherChargesDescriptions, setotherChargesDescriptions] = useState("");
//   const [transportDetails, setTransportDetails] = useState({
//     receiptDocNo: "",
//     dispatchedThrough: "",
//     destination: "",
//     carrierNameAgent: "",
//     billOfLading: "",
//     motorVehicleNo: "",
//   });
//   const [billingAddress, setBillingAddress] = useState("");
//   const [reverseCharge, setReverseCharge] = useState("No");
//   const [gstType, setGstType] = useState("CGST/SGST");
//   const [rows, setRows] = useState([]);
//   // const [date, setDate] = useState('');
//   const [paymentTerm, setPaymentTerm] = useState(0);
//   // const [dueDate, setDueDate] = useState('');
//   const [totalValue, setTotalValue] = useState(0);
//   const [otherCharges, setOtherCharges] = useState(0);

//   const [suppliers, setSuppliers] = useState([]); // State to store supplier data
//   const [selectedSupplier, setSelectedSupplier] = useState("");

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await axios.get("/api/v1/auth/manageSupplier");
//         console.log(response, "djkgh");
//         setSuppliers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching suppliers:", error);
//       }
//     };

//     fetchSuppliers();
//   }, []);

//   const handleSupplierChange = (e) => {
//     setSelectedSupplier(e.target.value);
//   };

//   // Function to handle "Other Charges" button click
//   const handleOtherChargesChange = (event) => {
//     const newCharges = parseFloat(event.target.value) || 0;
//     setOtherCharges(newCharges);
//     setTotalValue((prevTotal) => prevTotal + newCharges);
//   };

//   useEffect(() => {
//     if (date && paymentTerm) {
//       const selectedDate = new Date(date);
//       selectedDate.setDate(selectedDate.getDate() + parseInt(paymentTerm));

//       // Format the due date as DD-MMM-YYYY
//       const day = String(selectedDate.getDate()).padStart(2, "0");
//       const month = selectedDate.toLocaleString("en-US", { month: "short" });
//       const year = selectedDate.getFullYear();
//       const formattedDueDate = `${day}-${month}-${year}`;

//       setDueDate(formattedDueDate);
//     }
//   }, [date, paymentTerm]);

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//     updateDueDate(e.target.value, paymentTerms);
//   };

//   const handlePaymentTermsChange = (e) => {
//     setPaymentTerms(e.target.value);
//     updateDueDate(date, e.target.value);
//   };

//   const updateDueDate = (selectedDate, terms) => {
//     if (selectedDate && terms) {
//       const dateObj = new Date(selectedDate);
//       dateObj.setDate(dateObj.getDate() + parseInt(terms, 10));
//       const formattedDueDate = dateObj.toISOString().split("T")[0];
//       setDueDate(formattedDueDate);
//     }
//   };
//   const handleGstTypeChange = (e) => {
//     setGstType(e.target.value);
//   };

//   // State for modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
//   const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

//   // Handlers for each form element
//   // const handleDateChange = (e) => setDate(e.target.value);
//   const handleinvoiceNoChange = (e) => setinvoiceNo(e.target.value);
//   const handlepurchaseTypeChange = (e) => setpurchaseType(e.target.value);
//   const handleCustomerTypeChange = (e) => setCustomerType(e.target.value);
//   const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
//   const handlePlaceOfSupplyChange = (e) => setPlaceOfSupply(e.target.value);
//   // const handlePaymentTermsChange = (e) => setPaymentTerms(e.target.value);
//   const handleDueDateChange = (e) => setDueDate(e.target.value);
//   const handleBillingAddressChange = (e) => setBillingAddress(e.target.value);
//   const handleReverseChargeChange = (e) => setReverseCharge(e.target.value);

//   // Function to handle transport detail change
//   const handleTransportDetailChange = (field, value) => {
//     setTransportDetails((prev) => ({ ...prev, [field]: value }));
//   };
//   const handleRowChange = (index, field, value) => {
//     const newRows = [...rows];
//     const newValue = parseFloat(value) || 0;
//     newRows[index] = { ...newRows[index], [field]: newValue };

//     // Calculate taxable value, GST, and total value
//     const { qty, mrp, discount } = newRows[index];
//     const taxableValue = qty * mrp - discount;
//     const cgst = gstType === "CGST/SGST" ? taxableValue * 0.09 : 0;
//     const sgst = gstType === "CGST/SGST" ? taxableValue * 0.09 : 0;
//     const igst = gstType === "IGST" ? taxableValue * 0.18 : 0;
//     const totalValue = taxableValue + cgst + sgst + igst;

//     newRows[index] = {
//       ...newRows[index],
//       taxableValue,
//       cgst,
//       sgst,
//       igst,
//       totalValue,
//     };
//     setRows(newRows);
//   };

//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         itemCode: "",
//         productName: "",
//         hsnCode: "",
//         uom: "",
//         qty: 0,
//         freeQty: 0,
//         mrp: 0,
//         unitcost: 0,
//         schememargin: 0,
//         discount: 0,
//         taxableValue: 0,
//         cgst: 0,
//         sgst: 0,
//         igst: 0,
//         totalValue: 0,
//       },
//     ]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       setRows(rows.filter((_, i) => i !== index));
//     }
//   };

//   const calculateTotals = () => {
//     let grossAmount = 0;
//     let totalGstAmount = 0;

//     rows.forEach((row) => {
//       grossAmount += row.taxableValue;
//       totalGstAmount += row.cgst + row.sgst + row.igst;
//     });

//     const netAmount = grossAmount + totalGstAmount;
//     return { grossAmount, totalGstAmount, netAmount };
//   };
//   const openViewModal = (suppliers) => {
//     setViewModal(true);
//   };
//   const closeModal = () => {
//     setViewModal(false);
//   };

//   const { grossAmount, totalGstAmount, netAmount } = calculateTotals();

//   // Function to handle Save
//   const handleSave = () => {
//     // Implement save functionality
//   };

//   const handlePrintOnly = () => {
//     const printWindow = window.open("", "_blank");

//     printWindow.document.write(`
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 10px;
//             }
//             .header, .section-header, .table th {
//               color: red;
//               font-weight: bold;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 20px;
//               font-size: 24px;
//             }
//             .receipt-details .section-header {
//               color: green;
//               font-size: 16px;
//             }
//             .customer-details .section-header {
//               color: green;
//               font-size: 16px;
//             }
//             .sales-estimate .section-header {
//               color: blue;
//               font-size: 16px;
//             }
//             .transport-details .section-header, .amount-details .section-header {
//               color: blue;
//               font-size: 16px;
//             }
//             .terms .section-header {
//               color: red;
//             }
//             .table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 20px;
//             }
//             .table th, .table td {
//               border: 1px solid black;
//               padding: 5px;
//               text-align: center;
//               font-size: 12px;
//             }
//             .table th {
//               background-color: #ff0000; /* Red header */
//               color: black;
//             }
//             .details {
//               font-size: 12px;
//               margin-bottom: 5px;
//             }
//             .signature {
//               text-align: right;
//               margin-top: 50px;
//               font-size: 12px;
//             }
//             .heades {
//               text-align: center;
//               color: blue;
//               font-size: 24px;
//             }
//           </style>

//         </head>
//         <body>
//          <div style="color: blue; font-size: 24px; font-weight: bold;" class="">Logo</div>
//           <div class="header">

//             <div class="business-name">Business Name</div>
//             <div>Address: Your Address Here</div>
//             <div>GSTIN: Your GSTIN Here</div>
//           </div>

//           <table class="table">
//              <tr>
//                   <th colspan="100%" style="color: blue; font-size: 24px; font-weight: bold; text-align: center;" class="heades">
//                     Purchase Invoice
//                   </th>
//               </tr>

//             <tr>
//               <td style="width: 30%;">
//                 <div style="text-align:left;" class="customer-details">
//                   <div class="section-header">Customer Details</div>
//                   <div class="details">Name: <span>John Doe</span></div>
//                   <div class="details">Address: <span>123 Main St, City</span></div>
//                   <div class="details">Contact: <span>9876543210</span></div>
//                   <div class="details">GSTIN: <span>22AAAAA0000A1Z5</span></div>
//                 </div>
//               </td>
//               <td style="width: 30%;">
//                 <div style="text-align:left;" class="sales-estimate">
//                   <div class="section-header"> Invoice Details</div>
//                   <div class="details">Invoice No: <span>12345</span></div>
//                   <div class="details">Invoice Date: <span>01-Jan-2024</span></div>
//                    <div class="details">Supplier Date: <span>01-Jan-2024</span></div>
//                   <div class="details">Place of Supply: <span>City Name</span></div>
//                     <div class="details">Due Date: <span>01-Jan-2024</span></div>
//                 </div>
//               </td>
//               <td style="width: 40%;">
//                 <div style="text-align:left;" class="transport-details">
//                   <div class="section-header">Transport Details</div>
//                   <div class="details">Receipt Doc No.: <span>6789</span></div>
//                   <div class="details">Dispatch Through: <span>Courier Service</span></div>
//                   <div class="details">Agent Name: <span>John Smith</span></div>
//                   <div class="details">Vehicle Text: <span>MH12AB1234</span></div>
//                 </div>
//               </td>
//             </tr>
//           </table>

//           <table class="table">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Product Name</th>
//                 <th>HSN Code</th>
//                   <th>UOM</th>
//                 <th>QTY</th>
//                 <th>Free QTY</th>
//                 <th>MRP</th>
//                 <th>Unit Cost</th>
//                 <th>Scheme Margin</th>
//                 <th>Discount</th>
//                 <th>Taxable Value</th>
//                 <th>CGST</th>
//                 <th>SGST</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               <!-- Add your product rows here -->
//               <tr>
//                 <td>1</td>
//                 <td>Product Name</td>
//                 <td>1234</td>
//                 <td>10</td>
//                  <td>10</td>
//                   <td>10</td>
//                 <td>KG</td>
//                 <td>500</td>
//                 <td>10%</td>
//                 <td>450</td>
//                 <td>4500</td>
//                 <td>9%</td>
//                 <td>9%</td>
//                 <td>5310</td>
//               </tr>
//             </tbody>
//           </table>

//             <table class="table">
//               <tr>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="banking-details">
//                     <div class="section-header">Banking Details</div>
//                     <div class="details">Bank Name: XYZ Bank</div>
//                     <div class="details">IFSC Code: XYZ1234</div>
//                     <div class="details">Account No: 1234567890</div>
//                     <div class="details">Account Holder Name: John Doe</div>
//                     <div class="details">UPI ID: john@upi</div>
//                   </div>
//                 </td>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="receipt-details">
//                     <div class="section-header">Receipt Mode</div>
//                     <div class="details">Bank Name: XYZ Bank</div>
//                     <div class="details">Transaction date: XYZ1234</div>
//                     <div class="details">Transaction /cheque No: 1234567890</div>
//                     <div class="details">Total Amount: John Doe</div>
//                     <div class="details">Advance Received:1000</div>
//                     <div class="details">Amount Received:1000</div>
//                     <div class="details">Balance Amount:1000</div>
//                   </div>
//                 </td>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="amount-details">
//                     <div class="section-header">Amount Details</div>
//                     <div class="details">Gross Total: ₹10000</div>
//                     <div class="details">GST Amount: ₹1800</div>
//                     <div class="details">Additional Charges: ₹200</div>
//                     <div class="details">Net Total: ₹12000</div>
//                     <div class="details">Amount in Words: Twelve Thousand Only</div>
//                   </div>
//                 </td>
//               </tr>
//             </table>

//              <div style="margin-top:100px" class="mt-10">
//                   <div class="section-header">Terms & Condition</div>
//                   <div class="details">Your terms and conditions go here...</div>
//                 </div>

//           <div  class="signature">

//             <div>For (Business Name)</div>
//             <div style="margin-top: 20px;">Signature</div>
//           </div>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.focus();

//     printWindow.print();
//     printWindow.close();
//   };

//   const handlePrintOnlyWithoutGST = () => {
//     const printWindow = window.open("", "_blank");

//     printWindow.document.write(`
//       <html>
//         <head>
//               <style>
//         body {
//           font-family: Arial, sans-serif;
//           padding: 10px;
//         }
//         .header, .section-header, .table th {
//           color: red;
//           font-weight: bold;
//         }
//         .header {
//           text-align: center;
//           margin-bottom: 20px;
//           font-size: 24px;
//         }
//         .receipt-details .section-header {
//           color: green;
//           font-size: 16px;
//         }
//         .customer-details .section-header {
//           color: green;
//           font-size: 16px;
//         }
//         .sales-estimate .section-header {
//           color: blue;
//           font-size: 16px;
//         }
//         .transport-details .section-header, .amount-details .section-header {
//           color: blue;
//           font-size: 16px;
//         }
//         .terms .section-header {
//           color: red;
//         }
//         .table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }
//         .table th, .table td {
//           border: 1px solid black;
//           padding: 5px;
//           text-align: center;
//           font-size: 12px;
//         }
//         .table th {
//           background-color: #ff0000; /* Red header */
//           color: black;
//         }
//         .details {
//           font-size: 12px;
//           margin-bottom: 5px;
//         }
//         .signature {
//           text-align: right;
//           margin-top: 50px;
//           font-size: 12px;
//         }
//         .heades {
//           text-align: center;
//           color: blue;
//           font-size: 24px;
//         }
//       </style>
//         </head>
//         <body>
//          <div style="color: blue; font-size: 24px; font-weight: bold;" class="">Logo</div>
//           <div class="header">

//             <div class="business-name">Business Name</div>
//             <div>Address: Your Address Here</div>
//             <div>GSTIN: Your GSTIN Here</div>
//           </div>

//           <table class="table">
//              <tr>
//                   <th colspan="100%" style="color: blue; font-size: 24px; font-weight: bold; text-align: center;" class="heades">
//                     Sales Invoice
//                   </th>
//               </tr>

//             <tr>
//               <td style="width: 30%;">
//                 <div style="text-align:left;" class="customer-details">
//                   <div class="section-header">Customer Details</div>
//                   <div class="details">Name: <span>John Doe</span></div>
//                   <div class="details">Address: <span>123 Main St, City</span></div>
//                   <div class="details">Contact: <span>9876543210</span></div>
//                   <div class="details">GSTIN: <span>22AAAAA0000A1Z5</span></div>
//                 </div>
//               </td>
//               <td style="width: 30%;">
//                 <div style="text-align:left;" class="sales-estimate">
//                   <div class="section-header"> Invoice Details</div>
//                   <div class="details">Invoice No: <span>12345</span></div>
//                   <div class="details">Invoice Date: <span>01-Jan-2024</span></div>
//                   <div class="details">Place of Supply: <span>City Name</span></div>
//                 </div>
//               </td>
//               <td style="width: 40%;">
//                 <div style="text-align:left;" class="transport-details">
//                   <div class="section-header">Transport Details</div>
//                   <div class="details">Receipt Doc No.: <span>6789</span></div>
//                   <div class="details">Dispatch Through: <span>Courier Service</span></div>
//                   <div class="details">Agent Name: <span>John Smith</span></div>
//                   <div class="details">Vehicle Text: <span>MH12AB1234</span></div>
//                 </div>
//               </td>
//             </tr>
//           </table>

//           <table class="table">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Product Name</th>
//                 <th>HSN Code</th>
//                 <th>QTY</th>
//                 <th>UOM</th>
//                 <th>MRP</th>
//                 <th>Disc.</th>
//                 <th>Rate</th>

//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               <!-- Add your product rows here -->
//               <tr>
//                 <td>1</td>
//                 <td>Product Name</td>
//                 <td>1234</td>
//                 <td>10</td>
//                 <td>KG</td>
//                 <td>500</td>
//                 <td>10%</td>
//                 <td>450</td>

//                 <td>5310</td>
//               </tr>
//             </tbody>
//           </table>

//       <table class="table">
//               <tr>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="banking-details">
//                     <div class="section-header">Banking Details</div>
//                     <div class="details">Bank Name: XYZ Bank</div>
//                     <div class="details">IFSC Code: XYZ1234</div>
//                     <div class="details">Account No: 1234567890</div>
//                     <div class="details">Account Holder Name: John Doe</div>
//                     <div class="details">UPI ID: john@upi</div>
//                   </div>
//                 </td>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="receipt-details">
//                     <div class="section-header">Receipt Mode</div>
//                     <div class="details">Bank Name: XYZ Bank</div>
//                     <div class="details">Transaction date: XYZ1234</div>
//                     <div class="details">Transaction /cheque No: 1234567890</div>
//                     <div class="details">Total Amount: John Doe</div>
//                     <div class="details">Advance Received:1000</div>
//                     <div class="details">Amount Received:1000</div>
//                     <div class="details">Balance Amount:1000</div>
//                   </div>
//                 </td>
//                 <td style="width: 33.33%; text-align: left;">
//                   <div class="amount-details">
//                     <div class="section-header">Amount Details</div>
//                     <div class="details">Gross Total: ₹10000</div>
//                     <div class="details">GST Amount: ₹1800</div>
//                     <div class="details">Additional Charges: ₹200</div>
//                     <div class="details">Net Total: ₹12000</div>
//                     <div class="details">Amount in Words: Twelve Thousand Only</div>
//                   </div>
//                 </td>
//               </tr>
//             </table>
//              <div style="margin-top:100px" class="mt-10">
//                   <div class="section-header">Terms & Condition</div>
//                   <div class="details">Your terms and conditions go here...</div>
//                 </div>

//           <div  class="signature">

//             <div>For (Business Name)</div>
//             <div style="margin-top: 20px;">Signature</div>
//           </div>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.focus();

//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <>
//       <div
//         style={{ backgroundColor: "#EECAD8" }}
//         className="p-4 responsive-container"
//       >
//         {/* Top Section */}
//         <div className="print">
//           <h1 className="text-center font-bold text-3xl bg-gray-500 text-white">
//             Purches Invoice
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4   gap-4 mb-4">
//             <div>
//               <label className="font-bold">Purchase Type</label>
//               <select
//                 value={purchaseType}
//                 onChange={handlepurchaseTypeChange}
//                 className="border p-2 w-full   rounded"
//               >
//                 <option value="GST ">GST </option>
//                 <option value="NONGST">NON GST</option>
//               </select>
//             </div>
//             <div>
//               <label className="font-bold">
//                 Date:
//                 <input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="border p-2 w-full  rounded"
//                 />
//               </label>
//             </div>
//             <div>
//               <label className="font-bold">Invoice No.</label>
//               <input
//                 type="text"
//                 value={invoiceNo}
//                 onChange={handleinvoiceNoChange}
//                 className="border p-2 w-full  rounded"
//               />
//             </div>
//             <div>
//               <label className="font-bold">Supplier Invoice No.</label>
//               <input
//                 type="text"
//                 value={invoiceNo}
//                 onChange={handleinvoiceNoChange}
//                 className="border p-2 w-full  rounded"
//               />
//             </div>
//             <div>
//               <label className="font-bold">Supplier Name</label>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded"
//                 value={selectedSupplier}
//                 onChange={handleSupplierChange}
//               >
//                 <option value="">Select Supplier</option>
//                 {suppliers.map((supplier) => (
//                   <option key={supplier._id} value={supplier._id}>
//                     {supplier.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="font-bold">Place of Supply</label>
//               <input
//                 type="text"
//                 value={placeOfSupply}
//                 onChange={handlePlaceOfSupplyChange}
//                 className="border p-2 w-full  rounded"
//               />
//             </div>
//             <div>
//               <label className="font-bold">
//                 Payment Term (days):
//                 <input
//                   type="text"
//                   value={paymentTerm}
//                   onChange={(e) => setPaymentTerm(e.target.value)}
//                   className="border p-2 w-full  rounded"
//                 />
//               </label>
//             </div>

//             <div>
//               <label className="font-bold">
//                 Due Date
//                 <input
//                   type="text"
//                   value={dueDate}
//                   // onChange={(e) => setPaymentTerm(e.target.value)}
//                   className="border p-2 w-full text-black rounded"
//                 />
//               </label>
//             </div>

//             {/* Transport Details Section */}
//             <div className="mb-4">
//               {/* <h4 className="font-bold">Transport Details</h4> */}
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-500 text-white p-2"
//               >
//                 Transport Details
//               </button>
//             </div>
//             {/* Billing Address Section */}
//           </div>

//           {/* Modal for Transport Details */}
//           {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//               <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
//                 <h4 className="font-bold mb-4">Transport Details</h4>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label>Receipt Doc No.</label>
//                     <input
//                       type="text"
//                       value={transportDetails.receiptDocNo}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "receiptDocNo",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Dispatched Through</label>
//                     <input
//                       type="text"
//                       value={transportDetails.dispatchedThrough}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "dispatchedThrough",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Destination</label>
//                     <input
//                       type="text"
//                       value={transportDetails.destination}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "destination",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Carrier Name/Agent</label>
//                     <input
//                       type="text"
//                       value={transportDetails.carrierNameAgent}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "carrierNameAgent",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Bill of Lading/LR-RR No.</label>
//                     <input
//                       type="text"
//                       value={transportDetails.billOfLading}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "billOfLading",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Motor Vehicle No.</label>
//                     <input
//                       type="text"
//                       value={transportDetails.motorVehicleNo}
//                       onChange={(e) =>
//                         handleTransportDetailChange(
//                           "motorVehicleNo",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-gray-500 text-white p-2 mr-2"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-blue-500 text-white p-2"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//             <div className="mb-4 font-bold">
//               <label>Billing Address</label>
//               <textarea
//                 value={billingAddress}
//                 onChange={handleBillingAddressChange}
//                 className="border p-2 w-full  rounded"
//               />
//             </div>
//             {/* Reverse Charge Section */}
//             <div className="mb-4 w-full">
//               <label className="font-bold"> Reverse Charge</label>
//               <select
//                 value={reverseCharge}
//                 onChange={handleReverseChargeChange}
//                 className="border p-2 w-full  rounded"
//               >
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             {/* GST Type Section */}
//             {purchaseType === "GST Invoice" && (
//               <div className="mb-4 w-full">
//                 <label className="font-bold">GST Type:</label>
//                 <select
//                   value={gstType}
//                   onChange={handleGstTypeChange}
//                   className="border p-2 w-full  rounded"
//                 >
//                   <option value="CGST/SGST">CGST/SGST</option>
//                   <option value="IGST">IGST</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Items Section */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse  overflow-x-auto">
//               <thead>
//                 <tr>
//                   <th className="border p-2">#</th>
//                   <th className="border text-nowrap p-2">Item Code</th>
//                   <th className="border text-nowrap p-2">Product Name</th>
//                   <th className="border text-nowrap p-2">HSN Code</th>

//                   <th className="border p-2">UOM</th>
//                   <th className="border p-2">Qty</th>
//                   <th className="border p-2">Free Qty</th>
//                   <th className="border p-2">MRP</th>
//                   <th className="border p-2">Unit Cost</th>
//                   <th className="border p-2">Scheme Margin</th>
//                   <th className="border p-2">
//                     Discount
//                     <div className="flex">
//                       <span className="mr-16">%</span> <span>RS</span>
//                     </div>
//                   </th>
//                   {purchaseType === "GST Invoice" && (
//                     <>
//                       <th className="border text-nowrap p-2">Taxable Value</th>
//                       {gstType === "CGST/SGST" && (
//                         <>
//                           <th className="border p-2">
//                             CGST
//                             <div className="flex">
//                               <span className="mr-16">%</span> <span>RS</span>
//                             </div>
//                           </th>
//                           <th className="border p-2">
//                             SGST
//                             <div className="flex">
//                               <span className="mr-16">%</span> <span>RS</span>
//                             </div>
//                           </th>
//                         </>
//                       )}
//                       {gstType === "IGST" && (
//                         <th className="border p-2">
//                           IGST <br />
//                           <div className="flex">
//                             <span className="mr-16">%</span> <span>RS</span>
//                           </div>
//                         </th>
//                       )}
//                     </>
//                   )}
//                   <th className="border text-nowrap p-2">Total Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, index) => (
//                   <tr key={index}>
//                     <td className="border p-2">{index + 1}</td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.itemCode}
//                         onChange={(e) =>
//                           handleRowChange(index, "itemCode", e.target.value)
//                         }
//                         className=""
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.productName}
//                         onChange={(e) =>
//                           handleRowChange(index, "productName", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.hsnCode}
//                         onChange={(e) =>
//                           handleRowChange(index, "hsnCode", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>

//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.uom}
//                         onChange={(e) =>
//                           handleRowChange(index, "uom", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.qty}
//                         onChange={(e) =>
//                           handleRowChange(index, "qty", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.freeQty}
//                         onChange={(e) =>
//                           handleRowChange(index, "freeQty", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.mrp}
//                         onChange={(e) =>
//                           handleRowChange(index, "mrp", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.unitcost}
//                         onChange={(e) =>
//                           handleRowChange(index, "unitcost", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.schememargin}
//                         onChange={(e) =>
//                           handleRowChange(index, "schememargin", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.discount}
//                         onChange={(e) =>
//                           handleRowChange(index, "discount", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>

//                     {purchaseType === "GST Invoice" && (
//                       <>
//                         {gstType === "CGST/SGST" && (
//                           <>
//                             <td className="border p-2">
//                               <input
//                                 type="text"
//                                 value={`${row.cgst} RS`}
//                                 onChange={(e) =>
//                                   handleRowChange(index, "cgst", e.target.value)
//                                 }
//                                 className="w-full"
//                               />
//                             </td>
//                             <td className="border p-2">
//                               <input
//                                 type="text"
//                                 value={row.sgst}
//                                 onChange={(e) =>
//                                   handleRowChange(index, "sgst", e.target.value)
//                                 }
//                                 className="w-full"
//                               />
//                             </td>
//                           </>
//                         )}
//                         {gstType === "IGST" && (
//                           <td className="border p-2">
//                             <input
//                               type="text"
//                               value={row.igst}
//                               onChange={(e) =>
//                                 handleRowChange(index, "igst", e.target.value)
//                               }
//                               className="w-full"
//                             />
//                           </td>
//                         )}
//                         <td className="border p-2 text-nowrap gap-2">
//                           <span> {row.igst} </span>
//                           <span> {row.igst} </span>
//                         </td>
//                       </>
//                     )}
//                     <td className="border p-2">
//                       <input
//                         type="text"
//                         value={row.totalValue}
//                         onChange={(e) =>
//                           handleRowChange(index, "totalValue", e.target.value)
//                         }
//                         className="w-full"
//                       />
//                     </td>
//                     <td className=" p-1 gap-2 flex">
//                       <button
//                         onClick={() => removeRow(index)}
//                         className="bg-red-500 text-white  p-1 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
//                       >
//                         <svg
//                           xmlns="http//www.w3.org/2000/svg"
//                           className="h-4 w-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             onClick={addRow}
//             className="bg-green-500 hide-on-print text-white p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
//           >
//             <svg
//               xmlns="http//www.w3.org/2000/svg"
//               className="h-4 w-4 "
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             Add New Row
//           </button>

//           <div className="flex gap-5 item-center justify-center">
//             {" "}
//             <button
//               onClick={() => setIsModalOtherChargesOpen(true)}
//               className=" text-white mt-8 text-md p-2 mt-2 p-2 mt-2 rounded bg-blue-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
//             >
//               <svg
//                 xmlns="http//www.w3.org/2000/svg"
//                 className="h-4 w-4 "
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               Add Other Charges
//             </button>
//             <div className="gap-2">
//               <label className=" text-white mt-8 text-md p-2 mt-2 p-2 mt-2 rounded bg-blue-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center">
//                 <svg
//                   xmlns="http//www.w3.org/2000/svg"
//                   className="h-4 w-4 "
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>{" "}
//                 Upload Document
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={(e) => console.log(e.target.files[0])}
//                 />
//               </label>
//             </div>
//           </div>

//           {isModalOtherChargesOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//               <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
//                 <h4 className="font-bold mb-4">Other Charges Details</h4>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label htmlFor="other-charges">
//                       Other Charges Description
//                     </label>
//                     <input
//                       type="text"
//                       id="other-charges"
//                       value={otherChargesDescriptions}
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                   <div>
//                     <label>Other Charges</label>
//                     <input
//                       type="text"
//                       onChange={handleOtherChargesChange}
//                       placeholder="Enter other charges"
//                       className="border p-2 w-full  rounded"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setIsModalOtherChargesOpen(false)}
//                     className="bg-gray-500 text-white p-2 mr-2 hide-on-print"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => setIsModalOtherChargesOpen(false)}
//                     className="bg-blue-500 text-white p-2 hide-on-print"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
//             <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
//               <label className="font-bold">Narration</label>
//               <br />
//               <textarea className="bg-black text-white border p-1 w-full  rounded" />
//             </div>
//             <div className="w-full lg:w-1/3">
//               <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
//                 <label className=" font-bold lg:w-1/2 text-nowrap">
//                   Gross Amount
//                 </label>
//                 <input
//                   value={grossAmount.toFixed(2)}
//                   className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
//                 />
//               </div>
//               {purchaseType === "GST Invoice" && (
//                 <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
//                   <label className=" font-bold lg:w-1/2 text-nowrap">
//                     GST Amount
//                   </label>
//                   <input
//                     value={totalGstAmount.toFixed(2)}
//                     className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
//                   />
//                 </div>
//               )}

//               <div className="flex flex-col  lg:flex-row lg:justify-between mb-4">
//                 <label className="font-bold lg:w-1/2 text-nowrap">
//                   Other Charge
//                 </label>
//                 <input
//                   value={otherCharges.toFixed(2)}
//                   className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
//                 />
//               </div>

//               <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
//                 <label className=" font-bold lg:w-1/2 text-nowrap">
//                   Net Amount
//                 </label>
//                 <input
//                   value={netAmount.toFixed(2)}
//                   // onChange={handleBillingAddressChange}
//                   className="bg-black text-white border p-1 w-full  rounded lg:w-2/3"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 flex justify-center">
//             <button
//               type="button"
//               onClick={() => openViewModal()}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Receipt
//             </button>

//             <Modal
//               isOpen={viewModal}
//               onRequestClose={closeModal}
//               contentLabel="View Item Modal"
//               style={{
//                 content: {
//                   width: "80%",
//                   height: "90%",
//                   maxWidth: "800px",
//                   margin: "auto",
//                   padding: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "5px",
//                 },
//               }}
//             >
//               <PurchesInvoiceModel closeModal={closeModal} />
//             </Modal>
//           </div>

//           {/* Buttons for saving and printing */}
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={handleSave}
//               className="bg-blue-500 pl-8 pr-8 hoverbg-sky-700  text-white p-2 mr-2 hide-on-print"
//             >
//               Save
//             </button>
//             {purchaseType === "GST Invoice" && (
//               <button
//                 onClick={handlePrintOnly}
//                 className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-white p-2"
//               >
//                 Save and Print
//               </button>
//             )}
//             {purchaseType !== "GST Invoice" && (
//               <button
//                 onClick={handlePrintOnlyWithoutGST}
//                 className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-white p-2"
//               >
//                 Save and Print
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PurchesInvoice;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Modal from "react-modal";

const CreateSalesInvoice = () => {
  const [date, setDate] = useState("");
  const [InvoiceNo, setInvoiceNo] = useState("");
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
  const [otherCharges, setOtherCharges] = useState(0);
  const [supplierInvoiceNo, setsupplierInvoiceNo] = useState("");

  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedAddress, setAddress] = useState("");
  const [viewModal, setViewModal] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    InvoiceNo: "",
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

  const [cashDetails, setCashDetails] = useState({
    Amount: "",
    Advance: "",
    Received: "",
    Balance: "",
  });
  const [bankDetails, setBankDetails] = useState({
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

  const handleCashDetailsChange = (e) => {
    const { name, value } = e.target;
    setCashDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value, // Update the corresponding field in bankDetails
    }));
  };

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const [paymentType, setPaymentType] = useState("");
  const [subPaymentType, setSubPaymentType] = useState("");

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setSubPaymentType(""); // Reset subPaymentType when paymentType changes
  };

  const handleSubPaymentTypeChange = (e) => {
    const { value } = e.target;
    setSubPaymentType(value); // Set the subPaymentType state
    setBankDetails((prev) => ({ ...prev, selectBankType: value })); // Update bankDetails
  };

  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState("");

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

    const selectedCustomerData = customer.find((cust) => cust._id === value);

    setFormData((prev) => ({
      ...prev,
      customerName: selectedCustomerData ? selectedCustomerData.name : "",
      billingAddress: selectedCustomerData ? selectedCustomerData.address : "",
      placeOfSupply: selectedCustomerData ? selectedCustomerData.state : "",
    }));

    setPlaceOfSupply(selectedCustomerData ? selectedCustomerData.state : "");
    setBillingAddress(selectedCustomerData ? selectedCustomerData.address : "");
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

  const handleInvoiceNoChange = (e) => {
    const value = e.target.value;
    setInvoiceNo(value);
    setFormData((prev) => ({
      ...prev,
      InvoiceNo: value,
    }));
  };

  const handlesupplierInvoiceNoChange = (e) => {
    const value = e.target.value;
    setsupplierInvoiceNo(value);
    setFormData((prev) => ({
      ...prev,
      supplierInvoiceNo: value,
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
    setBillingAddress(selectedAddress);
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
      grossAmount += rows.taxableValue;
      GstAmount += rows.cgstrs + rows.sgstrs;
    });

    let netAmount;

    // Check if otherChargesDescriptions includes "discount"
    if (otherChargesDescriptions.includes("discount")) {
      netAmount = grossAmount + GstAmount - otherCharges;
    } else {
      netAmount = grossAmount + GstAmount + otherCharges;
    }

    console.log(netAmount);

    return { grossAmount, GstAmount, netAmount };
  };

  const { grossAmount, GstAmount, netAmount } = calculateTotals();

  // Function to handle Save and Print

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageproduct");
        console.log(response, "dkfjk");
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

      // Calculate retail price
      const retailPrice =
        selectedProduct.maxmimunRetailPrice -
        (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
          100;

      // Determine if sales tax is included from the fetched product data
      const salesTaxInclude = selectedProduct.salesTaxInclude;

      // Calculate taxable value based on salesTaxInclude
      console.log(salesTaxInclude, "ksdjf");
      const taxableValue = salesTaxInclude
        ? (selectedProduct.retailPrice * selectedProduct.quantity * 100) /
          (100 + Number(selectedProduct.gstRate))
        : retailPrice * selectedProduct.quantity;
      {
        console.log(taxableValue, "tax");
      }
      // Update the row with the new values
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        hsnCode: selectedProduct.hsnCode,
        units: selectedProduct.units,
        productName: selectedProduct.productName,
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice
          ? parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2)
          : "0.00",
        quantity: selectedProduct.quantity,
        wholesalerDiscount: selectedProduct.wholesalerDiscount,
        expiryDate: selectedProduct.expiryDate,
        batchNo: selectedProduct.batchNo,
        wholeselerDiscountRS:
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.wholesalerDiscount) /
          100,
        retailDiscount: selectedProduct.retailDiscount,
        retailDiscountRS:
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.retailDiscount) /
          100,

        // taxable value based on salesTaxInclude
        taxableValue: taxableValue,

        cgstp: selectedProduct.gstRate / 2,
        sgstp: selectedProduct.gstRate / 2,
        igstp: selectedProduct.gstRate,

        cgstrs: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        sgstrs: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        igstrs: parseFloat(
          ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2)
        ),

        totalvalue: (
          taxableValue +
          (taxableValue * selectedProduct.gstRate) / 100
        ).toFixed(2),
      };

      setRows(updatedRows);
    }
  };

  const handleItemCodeSelect = (rowIndex, selectedItemCode) => {
    const selectedProduct = products.find(
      (product) => product.itemCode === selectedItemCode
    );

    if (selectedProduct) {
      const updatedRows = [...rows];

      // Calculate retail price and taxable value based on the product details
      const retailPrice =
        selectedProduct.maxmimunRetailPrice -
        (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
          100;

      const taxableValue = selectedProduct.salesTaxInclude
        ? (retailPrice * selectedProduct.quantity * 100) /
          (100 + selectedProduct.gstRate)
        : retailPrice * selectedProduct.quantity;

      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        productName: selectedProduct.productName,
        hsnCode: selectedProduct.hsnCode,
        units: selectedProduct.units,
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice
          ? parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2)
          : "0.00",
        quantity: selectedProduct.quantity,
        expiryDate: selectedProduct.expiryDate,
        batchNo: selectedProduct.batchNo,
        wholesalerDiscount: selectedProduct.wholesalerDiscount,
        wholeselerDiscountRS: (
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.wholesalerDiscount) /
          100
        ).toFixed(2),
        retailDiscount: selectedProduct.retailDiscount,
        retailDiscountRS: (
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.retailDiscount) /
          100
        ).toFixed(2),
        taxableValue: taxableValue,
        cgstp: selectedProduct.gstRate / 2,
        sgstp: selectedProduct.gstRate / 2,
        igstp: selectedProduct.gstRate,

        cgstrs: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        sgstrs: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2)
        ),
        igstrs: parseFloat(
          ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2)
        ),

        totalvalue: (
          taxableValue +
          (taxableValue * selectedProduct.gstRate) / 100
        ).toFixed(2),
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
          units: row.units,
          mrp: row.maxmimunRetailPrice,

          discountpercent:
            customerType === "Wholesaler"
              ? row.wholesalerDiscount
              : row.retailDiscount,
          discountRS:
            customerType === "Wholesaler"
              ? row.wholeselerDiscountRS
              : row.retailDiscountRS,

          taxable: row.taxableValue.toFixed(2),
          cgstpercent: row.cgstp,
          cgstRS: row.cgstrs,
          sgstpercent: row.sgstp,
          sgstRS: row.sgstrs,
          igstpercent: row.igstp,
          igstRS: row.igstrs,
          totalValue: row.totalvalue,
        })),
        grossAmount: grossAmount.toFixed(2),
        GstAmount: GstAmount.toFixed(2),
        otherCharges: otherCharges.toFixed(2),
        otherChargesDescriptions: otherChargesDescriptions,
        salesType,
        customerType,
        reverseCharge,
        gstType,
        netAmount: netAmount.toFixed(2),
        cash: paymentMethod === "Cash" ? cashDetails : {},
        bank: paymentMethod === "Bank" ? bankDetails : {}, // Ensure bank details are sent correctly
      };
      const response = await axios.post(
        "/api/v1/salesInvoiceRoute/createsalesinvoice",
        updatedFormData
      );
      console.log(response);

      if (response) {
        toast.success("Sales invoice created successfully...");
      }
      setFormData({
        date: "",
        InvoiceNo: "",
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

        cash: {},
        bank: {},
      });

      setCashDetails({ amount: "", advance: "", received: "", balance: "" });
      setBankDetails({
        selectBankType: "",
        transactionDate: "",
        chequeNo: "",
        transactionNo: "",
        amount: "",
        advance: "",
        received: "",
        balance: "",
      });

      // Clear other independent states
      setDate("");
      setInvoiceNo("");
      setSalesType("GST Invoice");
      setCustomerType("Retailer");
      setPlaceOfSupply("");
      setDueDate("");
      setTransportDetails({
        receiptDocNo: "",
        dispatchedThrough: "",
        destination: "",
        carrierNameAgent: "",
        billOfLading: "",
        motorVehicleNo: "",
      });
      setBillingAddress("");
      setReverseCharge("No");
      setGstType("CGST/SGST");
      setRows([]);
      setPaymentTerm(0);
      setOtherCharges(0);
      setOtherChargesDescriptions("");
      setSelectedCustomer("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create sales estimate. Please try again.");
    }
  };

  const openViewModal = (suppliers) => {
    setViewModal(true);
  };
  const closeModal = () => {
    setViewModal(false);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "##FFFFFF" }}
        className="p-4 responsive-container"
      >
        {/* Top Section */}
        <h1 className="text-center font-bold text-3xl  text-black mb-5">
          Sales Invoice
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
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
            <label className="font-bold">Invoice No.</label>
            <input
              name="InvoiceNo"
              type="text"
              value={InvoiceNo} // Bind to local state
              onChange={handleInvoiceNoChange} // Update both local and formData states
              className="border p-2 w-full  rounded"
            />
          </div>

          <div>
            <label className="font-bold">Supplier Invoice No.</label>
            <input
              name="supplierInvoiceNo"
              type="text"
              value={supplierInvoiceNo}
              onChange={handlesupplierInvoiceNoChange}
              className="border p-2 w-full  rounded"
            />
          </div>

          {/* <div>
            <label className="font-bold">Customer Type</label>
            <select
              value={customerType}
              onChange={handleCustomerTypeChange}
              className="border p-2 w-full  rounded"
            >
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
            </select>
          </div> */}

          <div>
            <label className="font-bold">Customer Name</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCustomer}
              onChange={(e) => {
                if (e.target.value === "add-new-customer") {
                  window.location.href = "/admin/CreateCustomer";
                } else {
                  handleCustomerChange(e);
                }
              }}
            >
              <option value="">Select Customer</option>
              <option value="add-new-customer" className="text-blue-500">
                + Add New Customer
              </option>
              {customer.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
              {/* Add Customer option at the end of the list */}
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
              Payment Term (days)
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
              className="bg-blue-500 text-black p-2"
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
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-black p-2 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-500 text-black p-2"
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
              name="billingAddress"
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

                  <td className="border ">
                    {console.log(rows, "dheeru")}
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
                    <div style={{ marginTop: "10px", fontSize: "12px" }}>
                      <div>Date: {row.expiryDate ? row.expiryDate : "N/A"}</div>
                      <div>
                        Batch Number: {row.batchNo ? row.batchNo : "N/A"}
                      </div>
                    </div>
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
                      className="w-full flex-grow"
                      style={{
                        minWidth: "70px", // Set a small minimum width to ensure visibility
                        flexBasis: "70px", // Allow it to shrink, but still have a base width
                        flexShrink: 1, // Allow it to shrink on mobile
                      }}
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
                          className="w-full flex-grow"
                          style={{
                            minWidth: "20px", // Set a small minimum width to ensure visibility
                            flexBasis: "20px", // Allow it to shrink, but still have a base width
                            flexShrink: 1, // Allow it to shrink on mobile
                          }}
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
                          className="w-full flex-grow"
                          style={{
                            minWidth: "20px", // Set a small minimum width to ensure visibility
                            flexBasis: "20px", // Allow it to shrink, but still have a base width
                            flexShrink: 1, // Allow it to shrink on mobile
                          }}
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
                              value={row.taxableValue.toFixed(2)}
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
                                value={row.cgstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "cgstpercent",
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
                                value={row.cgstrs}
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
                                value={row.sgstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "sgstpercent",
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
                                value={row.sgstrs}
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
                              value={row.taxableValue.toFixed(2)}
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
                                value={row.igstp}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "igstpercent",
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
                                value={row.igstrs}
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
                      value={row.totalvalue}
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

        <button
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
          <div className="w-full lg:w-1/3">
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
                {otherChargesDescriptions}
              </label>
              <input
                value={otherCharges.toFixed(2)}
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

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => openViewModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Receipt
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
              <h2 className="text-lg font-bold mb-4 text-black">Receipt</h2>

              {/* Radio buttons to select payment method */}
              <div className="gap-5 mb-4">
                <label className="font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    onChange={handlePaymentMethodChange}
                  />
                  Cash
                </label>
                <label className="ml-5 font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Bank"
                    onChange={handlePaymentMethodChange}
                  />
                  Bank
                </label>
              </div>

              {/* Conditional form rendering based on payment method */}
              <form onSubmit={handleSubmit}>
                {paymentMethod === "Cash" && (
                  <>
                    <label className="font-bold">Amount</label>
                    <input
                      type="text"
                      name="Amount"
                      value={cashDetails.Amount}
                      onChange={handleCashDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="font-bold">Advance</label>
                    <input
                      type="text"
                      name="Advance"
                      value={cashDetails.Advance}
                      onChange={handleCashDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="font-bold">Received</label>
                    <input
                      type="text"
                      name="Received"
                      value={cashDetails.Received}
                      onChange={handleCashDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="font-bold">Balance</label>
                    <input
                      type="text"
                      name="Balance"
                      value={cashDetails.Balance}
                      onChange={handleCashDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                  </>
                )}

                {paymentMethod === "Bank" && (
                  <>
                    <label className="font-bold">Select Bank</label>
                    <select
                      name="bank"
                      value={bankDetails.bank}
                      onChange={handleBankDetailsChange}
                      className="border p-2 mb-2 w-full"
                    >
                      <option value="">Select Bank</option>
                      <option value="Bank 1">Bank 1</option>
                      <option value="Bank 2">Bank 2</option>
                    </select>
                    <select
                      name="subPaymentType"
                      value={subPaymentType}
                      onChange={handleSubPaymentTypeChange}
                      className="border p-2 mb-2 w-full"
                    >
                      <option value="">Select Payment Type</option>
                      <option value="Online">Online</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                    {subPaymentType === "Online" && (
                      <>
                        <label className="font-bold">Transaction Date</label>
                        <input
                          type="date"
                          name="transactionDate"
                          value={bankDetails.transactionDate}
                          onChange={handleBankDetailsChange}
                          className="border p-2 mb-2 w-full"
                        />
                        <label className="font-bold">Transaction No</label>
                        <input
                          type="text"
                          name="transactionNo"
                          value={bankDetails.transactionNo}
                          onChange={handleBankDetailsChange}
                          className="border p-2 mb-2 w-full"
                        />
                      </>
                    )}
                    {subPaymentType === "Cheque" && (
                      <>
                        <label className="font-bold">Transaction Date</label>
                        <input
                          type="date"
                          name="transactionDate"
                          value={bankDetails.transactionDate}
                          onChange={handleBankDetailsChange}
                          className="border p-2 mb-2 w-full"
                        />
                        <label className="font-bold">Cheque No</label>
                        <input
                          type="text"
                          name="chequeNo"
                          value={bankDetails.chequeNo}
                          onChange={handleBankDetailsChange}
                          className="border p-2 mb-2 w-full"
                        />
                      </>
                    )}
                    <label className="font-bold">Amount</label>
                    <input
                      type="text"
                      name="Amount"
                      value={bankDetails.Amount}
                      onChange={handleBankDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="font-bold">Advance</label>
                    <input
                      type="text"
                      name="Advance"
                      value={bankDetails.Advance}
                      onChange={handleBankDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="font-bold">Received</label>
                    <input
                      type="text"
                      name="Received"
                      value={bankDetails.Received}
                      onChange={handleBankDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />{" "}
                    <label className="font-bold">Balance</label>
                    <input
                      type="text"
                      name="Balance"
                      value={bankDetails.Balance}
                      onChange={handleBankDetailsChange}
                      className="border p-2 mb-2 w-full"
                    />{" "}
                  </>
                )}

                {/* Submit button */}
                <div className="flex justify-center items-center">
                  <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 h-10"
                    onClick={closeModal}
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </Modal>
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

export default CreateSalesInvoice;
