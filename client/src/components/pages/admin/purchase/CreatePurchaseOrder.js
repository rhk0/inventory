import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePurchaseOrder = () => {
  const [date, setDate] = useState("");
  const [orderNo, setorderNo] = useState("");
  const [purchaseType, setpurchaseType] = useState("GST Invoice");
  const [supplierType, setsupplierType] = useState("");
  const [supplierName, setsupplierName] = useState("");
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

  const [suppliers, setSuppliers] = useState([]); // State to store supplier data
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageSupplier");
        console.log(response, "djkgh");
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

  const handleGstTypeChange = (e) => {
    setGstType(e.target.value);
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  const handleorderNoChange = (e) => setorderNo(e.target.value);
  const handlepurchaseTypeChange = (e) => setpurchaseType(e.target.value);
  const handlesupplierTypeChange = (e) => setsupplierType(e.target.value);
  const handlesupplierNameChange = (e) => setsupplierName(e.target.value);
  const handlePlaceOfSupplyChange = (e) => setPlaceOfSupply(e.target.value);
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
    let totalGstAmount = 0;

    rows.forEach((row) => {
      grossAmount += row.taxableValue;
      totalGstAmount += row.cgst + row.sgst + row.igst;
    });

    const netAmount = grossAmount + totalGstAmount;
    return { grossAmount, totalGstAmount, netAmount };
  };

  const { grossAmount, totalGstAmount, netAmount } = calculateTotals();

  // Function to handle Save and Print
  const handlePrintOnly = () => {
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
            .supplier-details .section-header {
              color: green;
               font-size: 16px;
            }
            .purchase-order .section-header {
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
              .heades{
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
                    purchase order
                  </th>
              </tr>


         
            <tr>
              <td style="width: 30%;">
                <div style="text-align:left;" class="supplier-details">
                  <div class="section-header">supplier Details</div>
                  <div class="details">Name: <span>John Doe</span></div>
                  <div class="details">Address: <span>123 Main St, City</span></div>
                  <div class="details">Contact: <span>9876543210</span></div>
                  <div class="details">GSTIN: <span>22AAAAA0000A1Z5</span></div>
                </div>
              </td>
              <td style="width: 30%;">
                <div style="text-align:left;" class="purchase-order">
                  <div class="section-header"> order Details</div>
                  <div class="details">order No: <span>12345</span></div>
                  <div class="details">order Date: <span>01-Jan-2024</span></div>
                  <div class="details">Place of Supply: <span>City Name</span></div>
                </div>
              </td>
              <td style="width: 40%;">
                <div style="text-align:left;" class="transport-details">
                  <div class="section-header">Transport Details</div>
                  <div class="details">Receipt Doc No.: <span>6789</span></div>
                  <div class="details">Dispatch Through: <span>Courier Service</span></div>
                  <div class="details">Agent Name: <span>John Smith</span></div>
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
                <th>QTY</th>
                <th>UOM</th>
                <th>MRP</th>
                <th>Disc.</th>
                <th>Rate</th>
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
                <td>KG</td>
                <td>500</td>
                <td>10%</td>
                <td>450</td>
                <td>4500</td>
                <td>9%</td>
                <td>9%</td>
                <td>5310</td>
              </tr>
            </tbody>
          </table>
  
          <table class="table">
            <tr>
              <td style="width: 50%;text-align:left;">
                <div class="banking-details">
                  <div class="section-header">Banking Details</div>
                  <div class="details">Bank Name: XYZ Bank</div>
                  <div class="details">IFSC Code: XYZ1234</div>
                  <div class="details">Account No: 1234567890</div>
                  <div class="details">Account Holder Name: John Doe</div>
                  <div class="details">UPI ID: john@upi</div>
                </div>
              </td>
              <td style="width: 50%;text-align:left;">
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

    printWindow.print();
    printWindow.close();
  };

  const handlePrintOnlyWithoutGST = () => {
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
            .supplier-details .section-header {
              color: green;
               font-size: 16px;
            }
            .purchase-order .section-header {
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
              .heades{
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
                    purchase order
                  </th>
              </tr>


         
            <tr>
              <td style="width: 30%;">
                <div style="text-align:left;" class="supplier-details">
                  <div class="section-header">supplier Details</div>
                  <div class="details">Name: <span>John Doe</span></div>
                  <div class="details">Address: <span>123 Main St, City</span></div>
                  <div class="details">Contact: <span>9876543210</span></div>
                  <div class="details">GSTIN: <span>22AAAAA0000A1Z5</span></div>
                </div>
              </td>
              <td style="width: 30%;">
                <div style="text-align:left;" class="purchase-order">
                  <div class="section-header"> order Details</div>
                  <div class="details">order No: <span>12345</span></div>
                  <div class="details">order Date: <span>01-Jan-2024</span></div>
                  <div class="details">Place of Supply: <span>City Name</span></div>
                </div>
              </td>
              <td style="width: 40%;">
                <div style="text-align:left;" class="transport-details">
                  <div class="section-header">Transport Details</div>
                  <div class="details">Receipt Doc No.: <span>6789</span></div>
                  <div class="details">Dispatch Through: <span>Courier Service</span></div>
                  <div class="details">Agent Name: <span>John Smith</span></div>
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
                <th>QTY</th>
                <th>UOM</th>
                <th>MRP</th>
                <th>Disc.</th>
                <th>Rate</th>
               
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
                <td>KG</td>
                <td>500</td>
                <td>10%</td>
                <td>450</td>
                
                <td>5310</td>
              </tr>
            </tbody>
          </table>
  
          <table class="table">
            <tr>
              <td style="width: 50%;text-align:left;">
                <div class="banking-details">
                  <div class="section-header">Banking Details</div>
                  <div class="details">Bank Name: XYZ Bank</div>
                  <div class="details">IFSC Code: XYZ1234</div>
                  <div class="details">Account No: 1234567890</div>
                  <div class="details">Account Holder Name: John Doe</div>
                  <div class="details">UPI ID: john@upi</div>
                </div>
              </td>
              <td style="width: 50%;text-align:left;">
                <div class="amount-details">
                  <div class="section-header">Amount Details</div>
                  <div class="details">Gross Total: ₹10000</div>
                  <div class="details">Additional Charges: ₹200</div>
                  <div class="details">Net Total: ₹12000</div>
                  <div class="details">Amount in Words: Twelve Thousand Only</div>
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

    printWindow.print();
    printWindow.close();
  };

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
        console.log(response, "API Response");
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
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice,
        quantity: selectedProduct.quantity,
        // Add any other fields you want to auto-fill here
      };

      setRows(updatedRows);
    }
  };
  return (
    <>
      <div
        style={{ backgroundColor: "#82ac73" }}
        className="p-4 responsive-container"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
          <div>
            <label className="font-bold">Purchase Type</label>
            <select
              value={purchaseType}
              onChange={handlepurchaseTypeChange}
              className="border p-2 w-full  rounded"
            >
              <option value="GST ">GST </option>
              <option value="Non GST">Non GST</option>
            </select>
          </div>
          <div>
            <label className="font-bold">
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-full   rounded"
              />
            </label>
          </div>
          <div>
            <label className="font-bold">Order No.</label>
            <input
              type="text"
              value={orderNo}
              onChange={handleorderNoChange}
              className="border p-2 w-full  rounded"
            />
          </div>

          <div>
            <label className="font-bold">supplier Name</label>
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
              Payment Term:
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
                className="border p-2 w-full text-black rounded"
              />
            </label>
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

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div className="mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2"
            >
              Transport Details
            </button>
          </div>
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
          {purchaseType === "GST Invoice" && (
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
          <table className="w-full border-collapse  overflow-x-auto">
            <thead>
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Item Code</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">HSN Code</th>

                <th className="border p-2">Qty</th>
                <th className="border p-2">UOM</th>
                <th className="border p-2">MRP</th>
                {/* <th className="border p-2">
                  Discount{" "}
                  <div className="flex justify-between">
                    <span className="mr-16">%</span> <span>RS</span>
                  </div>
                </th> */}

                {purchaseType === "GST Invoice" && (
                  <>
                    <th className="border p-2">Taxable Value</th>
                    {gstType === "CGST/SGST" && (
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
                    {gstType === "IGST" && (
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
                      type="text"
                      value={row.itemCode}
                      onChange={(e) =>
                        handleRowChange(index, "itemCode", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      id="product-select"
                      onChange={(e) =>
                        handleProductSelect(index, e.target.value)
                      }
                      className="w-full"
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
                      value={row.quantity}
                      onChange={(e) =>
                        handleRowChange(index, "qty", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
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
                      type="number"
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
                  {/* <td className="border ">
                    <div className="p-1 flex gap-1">
                      <input
                        type="number"
                        value={row.retailDiscount}
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "retailDiscount",
                            e.target.value
                          )
                        }
                        className="w-full"
                      />
                      <td className=""></td>
                      <input
                        type="number"
                        value={row.discount}
                        onChange={(e) =>
                          handleRowChange(index, "discount", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </td> */}

                  {purchaseType === "GST Invoice" && (
                    <>
                      {gstType === "CGST/SGST" && (
                        <>
                          <td className="border p-2">
                            <input
                              type="number"
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
                          <td className="border ">
                            <div className="p-1 flex  gap-1">
                              <input
                                type="number"
                                value={row.sgst}
                                onChange={(e) =>
                                  handleRowChange(index, "sgst", e.target.value)
                                }
                                className="w-full"
                              />
                              <td className=""></td>
                              <input
                                type="number"
                                value={row.sgst}
                                onChange={(e) =>
                                  handleRowChange(index, "sgst", e.target.value)
                                }
                                className="w-full"
                              />
                            </div>
                          </td>
                        </>
                      )}
                      {gstType === "IGST" && (
                        <td className="border p-2">
                          <input
                            type="number"
                            value={row.taxableValue}
                            onChange={(e) =>
                              handleRowChange(index, "igst", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                      )}
                      <td className="border p-2">
                        <div className="flex">
                          <input
                            type="number"
                            value={row.igst}
                            onChange={(e) =>
                              handleRowChange(index, "igst", e.target.value)
                            }
                            className="w-full"
                          />
                          <td className="p-1"></td>
                          <input
                            type="number"
                            value={row.igst}
                            onChange={(e) =>
                              handleRowChange(index, "igst", e.target.value)
                            }
                            className="w-full"
                          />
                        </div>
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
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-500 text-white p-1 mt-2 rounded hoverbg-orange-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
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
                    // value={otherChargesDescriptions}
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
            <textarea
              // value={billingAddress}
              // onChange={handleBillingAddressChange}
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
            {purchaseType === "GST Invoice" && (
              <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                <label className="font-bold lg:w-1/2 text-nowrap">
                  GST Amount
                </label>
                <input
                  value={totalGstAmount.toFixed(2)}
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
                value={otherCharges}
                // onChange={handleBillingAddressChange}
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
          >
            Save
          </button>
          {purchaseType === "GST Invoice" && (
            <button
              onClick={handlePrintOnly}
              className="bg-blue-700 pl-4 pr-4 hover:bg-sky-700 text-white p-2"
            >
              Save and Print
            </button>
          )}
          {purchaseType !== "GST Invoice" && (
            <button
              onClick={handlePrintOnlyWithoutGST}
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

export default CreatePurchaseOrder;
