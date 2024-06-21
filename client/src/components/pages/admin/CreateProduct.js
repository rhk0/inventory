import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [gstRate, setGstRate] = useState("0%");
  const [landingCost, setLandingCost] = useState(0);
  const [options, setOptions] = useState([{ name: "", values: [] }]);
  const [tableData, setTableData] = useState([]);

  const [Quantity, setQuantity] = useState(0);
  const [Rate, setRate] = useState(0);
  const [Amount, setAmount] = useState("");
  const [addvarints, setVarints] = useState(false);

  const [formData, setFormData] = useState({
    itemCode: "",
    productName: "",
    category: "",
    subCategory: "",
    brand: "",
    subBrand: "",
    uom: "",
    gstRate: "0%",
    purchaseTaxInclude: false,
    salesTaxInclude: false,
    cess: false,
    batchNo: "",
    expiryDate: "",
    manufacturer: "",
    ingredients: "",
    feature: "",
    description: "",
    netWeight: "",
    img: [],
    purchasePrice: 0,
    landingCost: 0,
    mrp: 0,
    retailDiscount: 0,
    retailPrice: 0,
    retailMargin: 0,
    wholesalerDiscount: 0,
    wholesalerPrice: 0,
    wholesaleMargin: 0,
    minimumStock: 0,
    maximumStock: 0,
    particular: "",
    quantity: 0,
    rate: 0,
    units: "",
    amount: 0,
  });
  const [imgs, setimgs] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "purchasePrice") {
      setPurchasePrice(value);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "sdfjd");
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    for (let i = 0; i < imgs.length; i++) {
      form.append("img", imgs[i]);
    }
    form.append("items", JSON.stringify(options));
    form.append("rows", JSON.stringify(tableData));

    try {
      const response = await axios.post("/api/v1/auth/createProduct", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response, "dsjkfjk");

      if (response) {
        toast.success("Product Created Successfully...");
      }

      // clearData();
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        `There was an error creating the product: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const updateTable = (newOptions) => {
    const tableVariants = newOptions
      .filter((option) => option.values.length > 0)
      .flatMap((option) => option.values)
      .map((variant) => ({
        variant,
        productCode: "",
        productName: "",
        purchasePrice: 0,
        landingCost: 0,
        mrp: 0,
        retailDiscount: 0,
        retailPrice: 0,
        retailMargin: 0,
        wholesalerDiscount: 0,
        wholesalerPrice: 0,
        wholesaleMargin: 0,
        minimumStock: 0,
        maximumStock: 0,
        openingQty: 0,
      }));

    setTableData(tableVariants);
  };

  const clearData = () => {
    setFormData(formData);
    setPurchasePrice(0);
    setLandingCost(0);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseFloat(e.target.value) || 0;
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity,
      amount: quantity * prevFormData.rate,
    }));
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 0;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rate,
      amount: rate * prevFormData.quantity,
    }));
  };

  const handleGstRateChange = (e) => {
    const gstRate = parseFloat(e.target.value) || 0;
    setFormData((prevFormData) => ({
      ...prevFormData,
      gstRate,
    }));
  };

  const calculateLandingCost = () => {
    const price = parseFloat(purchasePrice) || 0;
    const gst = parseFloat(gstRate) / 100 || 0;
    const cost = price + price * gst;
    setLandingCost(cost.toFixed(2));
    setFormData((prevFormData) => ({
      ...prevFormData,
      landingCost: cost.toFixed(2),
    }));
  };

  useEffect(() => {
    calculateLandingCost();
  }, [purchasePrice, gstRate]);

  useEffect(() => {
    updateTable(options);
  }, [options]);

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", values: [] }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleRowChange = (index, field, value) => {
    const newTableData = [...tableData];
    newTableData[index][field] = value;
    setTableData(newTableData);
  };

  const calculateOpeningBalance = () => {
    const quantity = parseFloat(Quantity) || 0;
    const rate = parseFloat(Rate) || 0;
    const total = quantity * rate;
    setAmount(total.toFixed(2));
  };

  useEffect(() => {
    calculateOpeningBalance();
  }, [Quantity, Rate]);

  const handleTagInputChange = (index, newTags) => {
    const newOptions = [...options];
    newOptions[index].values = newTags;
    setOptions(newOptions);
    updateTable(newOptions);
  };

  const TagInput = ({ index, value }) => {
    const [tags, setTags] = useState(value || []);
    const [inputValue, setInputValue] = useState("");

    const addTag = (e) => {
      if (e.key === " " && inputValue.trim() !== "") {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue("");
        handleTagInputChange(index, newTags);
      }
    };

    const removeTag = (indexToRemove) => {
      const newTags = tags.filter((_, index) => index !== indexToRemove);
      setTags(newTags);
      handleTagInputChange(index, newTags);
    };

    return (
      <div className="flex flex-col w-full ">
        <label className="font-bold ml-3">Variant Value </label>
        <div className="flex flex-wrap items-center border border-gray-300 rounded ml-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-red-500 text-white px-3 py-1 m-1 rounded"
            >
              {tag}
              <button
                className="ml-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => removeTag(index)}
              >
                x
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTag}
            placeholder="Enter Option Value"
            className="flex-grow p-1 outline-none"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 responsive-container">
      <h4 className="text-3xl font-bold mb-4 text-center bg-gray-300">
        Create Product
      </h4>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label
                    htmlFor="itemCode"
                    className="block mb-2 font-bold ml-2"
                  >
                    Item Code
                  </label>
                  <input
                    type="text"
                    id="itemCode"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block mb-2 font-bold ml-2"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block mb-2 font-bold ml-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subCategory"
                    className="block mb-2 font-bold ml-2"
                  >
                    Sub Category
                  </label>
                  <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="brand" className="block mb-2 font-bold ml-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subBrand"
                    className="block mb-2 font-bold ml-2"
                  >
                    Sub Brand
                  </label>
                  <input
                    type="text"
                    id="subBrand"
                    name="subBrand"
                    value={formData.subBrand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="uom" className="block mb-2 font-bold ml-2">
                    UOM
                  </label>
                  <input
                    type="text"
                    id="uom"
                    name="uom"
                    value={formData.uom}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="purchasePrice"
                    className="block mb-2 font-bold ml-2"
                  >
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mrp" className="block mb-2 font-bold ml-2">
                    MRP
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="retailDiscount"
                    className="block mb-2 font-bold ml-2"
                  >
                    Retail Discount (%)
                  </label>
                  <input
                    type="number"
                    id="retailDiscount"
                    name="retailDiscount"
                    value={formData.retailDiscount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="wholesalerDiscount"
                    className="block mb-2 font-bold ml-2"
                  >
                    Wholesaler Discount (%)
                  </label>
                  <input
                    type="number"
                    id="wholesalerDiscount"
                    name="wholesalerDiscount"
                    value={formData.wholesalerDiscount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label
                    htmlFor="landingCost"
                    className="block mb-2 font-bold ml-2"
                  >
                    Landing Cost
                  </label>
                  <input
                    type="number"
                    id="landingCost"
                    name="landingCost"
                    value={formData.landingCost}
                    readOnly
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="retailPrice"
                    className="block mb-2 font-bold ml-2"
                  >
                    Retail Price
                  </label>
                  <input
                    type="number"
                    id="retailPrice"
                    name="retailPrice"
                    value={formData.retailPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="wholesalerPrice"
                    className="block mb-2 font-bold ml-2"
                  >
                    Wholesaler Price
                  </label>
                  <input
                    type="number"
                    id="wholesalerPrice"
                    name="wholesalerPrice"
                    value={formData.wholesalerPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="minimumStock"
                    className="block mb-2 font-bold ml-2"
                  >
                    Minimum Stock
                  </label>
                  <input
                    type="number"
                    id="minimumStock"
                    name="minimumStock"
                    value={formData.minimumStock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="maximumStock"
                    className="block mb-2 font-bold ml-2"
                  >
                    Maximum Stock
                  </label>
                  <input
                    type="number"
                    id="maximumStock"
                    name="maximumStock"
                    value={formData.maximumStock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block mb-2 font-bold ml-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    readOnly
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="img"
                    className="block mb-2 font-bold ml-2"
                  >
                    Images
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    multiple
                    onChange={(e) => setimgs([...e.target.files])}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="gstRate" className="block mb-2 font-bold ml-2">
                    GST Rate
                  </label>
                  <select
                    id="gstRate"
                    name="gstRate"
                    value={formData.gstRate}
                    onChange={handleGstRateChange}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="0%">0%</option>
                    <option value="5%">5%</option>
                    <option value="12%">12%</option>
                    <option value="18%">18%</option>
                    <option value="28%">28%</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gstAmount"
                    className="block mb-2 font-bold ml-2"
                  >
                    GST Amount
                  </label>
                  <input
                    type="number"
                    id="gstAmount"
                    name="gstAmount"
                    value={formData.gstAmount}
                    readOnly
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block mb-2 font-bold ml-2"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="supplier"
                    className="block mb-2 font-bold ml-2"
                  >
                    Supplier
                  </label>
                  <select
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Select Supplier</option>
                    {/* {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))} */}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="remarks"
                    className="block mb-2 font-bold ml-2"
                  >
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tcs" className="block mb-2 font-bold ml-2">
                    TCS
                  </label>
                  <select
                    id="tcs"
                    name="tcs"
                    value={formData.tcs}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="1%">1%</option>
                    <option value="0.75%">0.75%</option>
                    <option value="0.5%">0.5%</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleChange}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h4 className="text-center mb-4">Supplier List</h4>
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Supplier Name</th>
                <th className="border border-gray-300 p-2">Contact Details</th>
              </tr>
            </thead>
            <tbody>
              {/* {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="border border-gray-300 p-2">{supplier.name}</td>
                  <td className="border border-gray-300 p-2">{supplier.contact}</td>
                </tr>
               ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
