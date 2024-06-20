import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialFormData = {
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
  photo: [],
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
  items: [],
};

const AddProduct = () => {
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

  const [formData, setFormData] = useState(initialFormData);
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "purchasePrice") {
      setPurchasePrice(value); // Update purchasePrice state
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "sdfjd");

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      photos?.forEach((p, index) => {
        formDataToSend.append(`photo_${index}`, p);
      });

      const response = await axios.post(
        "/api/v1/auth/createProduct",
        formDataToSend
      );
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

  const clearData = () => {
    setFormData(initialFormData);
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
      landingCost: cost.toFixed(2), // Update formData with landingCost
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

  const updateTable = (newOptions) => {
    const tableVariants = newOptions
      .filter((option) => option.values.length > 0)
      .flatMap((option) => option.values);

    setTableData(tableVariants);
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
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Product Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {/* Product Information Fields */}
          <div>
            <label className="block font-bold">Item Code</label>
            <input
              type="text"
              name="itemCode"
              className="w-full p-1 border rounded"
              value={formData.itemCode}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full p-1 border rounded"
              value={formData.productName}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Category</label>
            <select
              name="category"
              className="w-full p-1 border rounded"
              value={formData.category}
              onChange={handleChange}
            >
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Sub Category</label>
            <select
              className="w-full p-1 border rounded"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Brand</label>
            <select
              className="w-full p-1 border rounded"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            >
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Sub Brand</label>
            <select
              className="w-full p-1 border rounded"
              name="subBrand"
              value={formData.subBrand}
              onChange={handleChange}
            >
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">UOM</label>
            <select
              className="w-full p-1 border rounded"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
            >
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">GST Rate</label>
            <select
              className="w-full p-1 border rounded"
              name="gstRate"
              value={formData.gstRate}
              onChange={handleGstRateChange}
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Purchase Tax Include</label>
            <input
              type="checkbox"
              className="p-1 m-4 border rounded"
              name="purchaseTaxInclude"
              checked={formData.purchaseTaxInclude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold">Sales Tax Include</label>
            <input
              type="checkbox"
              className="p-1 m-4 border rounded"
              name="salesTaxInclude"
              checked={formData.salesTaxInclude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold px-2">Cess</label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className=" border rounded"
            />
            {isChecked && (
              <input
                type="text"
                className="w-full p-1 border rounded"
                name="cess"
                checked={formData.cess}
                onChange={handleChange}
              />
            )}
          </div>
          <div>
            <label className="block font-bold">Batch No.</label>
            <input
              type="text"
              name="batchNo"
              className="w-full p-1 border rounded"
              value={formData.batchNo}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              className="w-full p-1 border rounded"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Manufacturer</label>
            <select
              className="w-full p-1 border rounded"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            >
             
            </select>
          </div>
          <div>
            <label className="block font-bold">Ingredients</label>
            <textarea
              type="text"
              name="ingredients"
              className="w-full p-1 border rounded"
              value={formData.ingredients}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Features</label>
            <textarea
              type="text"
              name="feature"
              className="w-full p-1 border rounded"
              value={formData.feature}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-bold">Description</label>
            <textarea
              name="description"
              className="w-full p-1 border rounded"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Net Weight</label>
            <input
              type="text"
              name="netWeight"
              className="w-full p-1 border rounded"
              value={formData.netWeight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Product Photo</label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full p-1 border rounded"
              multiple
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files })
              }
            />
          </div>
          <div className="mb-3">
            {Array.isArray(photos) &&
              photos.length > 0 &&
              photos.map((selectedPhoto, index) => (
                <div key={index} className="text-center">
                  <img
                    src={URL.createObjectURL(selectedPhoto)}
                    alt={`product_photo_${index}`}
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Price Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4  gap-4">
          <div>
            <label className="block font-bold">Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              className="w-full p-1 border rounded"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold">Landing Cost</label>
            <input
              type="text"
              name="landingCost"
              className="w-full p-1 border rounded"
              value={landingCost}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">MRP</label>
            <input
              type="number"
              name="mrp"
              className="w-full p-1 border rounded"
              value={formData.mrp}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Discount</label>
            <input
              type="number"
              name="retailDiscount"
              className="w-full p-1 border rounded"
              value={formData.retailDiscount}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Price</label>
            <input
              type="number"
              name="retailPrice"
              className="w-full p-1 border rounded"
              value={formData.retailPrice}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Margin</label>
            <input
              type="number"
              name="retailMargin"
              className="w-full p-1 border rounded"
              value={formData.retailMargin}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesaler Discount</label>
            <input
              type="number"
              name="wholesalerDiscount"
              className="w-full p-1 border rounded"
              value={formData.wholesalerDiscount}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesaler Price</label>
            <input
              type="number"
              name="wholesalerPrice"
              className="w-full p-1 border rounded"
              value={formData.wholesalerPrice}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesale Margin</label>
            <input
              type="number"
              name="wholesaleMargin"
              className="w-full p-1 border rounded"
              value={formData.wholesaleMargin}
              onChange={handleChange}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Minimum Stock</label>
            <input
              type="number"
              name="minimumStock"
              className="w-full p-1 border rounded"
              value={formData.minimumStock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Maximum Stock</label>
            <input
              type="number"
              name="maximumStock"
              className="w-full p-1 border rounded"
              value={formData.maximumStock}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Opening Balance</h2>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="block font-bold">Particular</label>
            <input
              type="text"
              name="particular"
              className="w-full p-1 border rounded"
              value={formData.particular}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-1 border rounded"
              value={formData.quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div>
            <label className="block font-bold">Rate</label>
            <input
              type="number"
              name="rate"
              className="w-full p-1 border rounded"
              value={formData.rate}
              onChange={handleRateChange}
            />
          </div>
          <div>
            <label className="block font-bold">Units</label>
            <input
              type="text"
              name="units"
              className="w-full p-1 border rounded"
              value={formData.units}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-bold">Amount</label>
            <input
              type="text"
              name="amount"
              className="w-full p-1 border rounded"
              readOnly
              value={formData.amount}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start mt-8 px-1">
        <button
          onClick={() => setVarints(!addvarints)}
          className="bg-gray-400 text-black px-4 py-2 rounded-md mb-4 "
        >
          Add Varient
        </button>
      </div>
      {addvarints && (
        <>
          <div className="bg-gray-200 p-4 rounded mb-4">
            {options.map((option, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div className="mb-2">
                  <label className="block font-bold">Variant Name</label>

                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(index, "name", e.target.value)
                    }
                    className="border rounded w-full  p-1"
                  />
                </div>

                <TagInput index={index} value={option.values} />

                <button
                  className="ml-2 mt-7 text-red-400 bg-gray-300 text-center rounded-full border border-red-400 text-3xl w-9 h-8 flex items-center justify-center"
                  onClick={() => handleRemoveOption(index)}
                >
                  <span className="mt-[-5px]">&times;</span>
                </button>
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add More
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 border-collapse border border-gray-300 mb-8">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Variant</th>
                  <th className="border border-gray-300 p-2">Product Code</th>
                  <th className="border border-gray-300 p-2">Product Name</th>
                  <th className="border border-gray-300 p-2">Purchase Price</th>
                  <th className="border border-gray-300 p-2">Landing Cost</th>
                  <th className="border border-gray-300 p-2">MRP</th>
                  <th className="border border-gray-300 p-2">
                    Retail Discount
                  </th>
                  <th className="border border-gray-300 p-2">Retail Price</th>
                  <th className="border border-gray-300 p-2">Retail Margin</th>
                  <th className="border border-gray-300 p-2">
                    Wholesaler Discount
                  </th>
                  <th className="border border-gray-300 p-2">
                    Wholesaler Price
                  </th>
                  <th className="border border-gray-300 p-2">
                    Wholesaler Margin
                  </th>
                  <th className="border border-gray-300 p-2">Minimum stock</th>
                  <th className="border border-gray-300 p-2">Maximum stock</th>
                  <th className="border border-gray-300 p-2">Opening Qty</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((variant, index) => (
                  <tr key={index} className="mt-1">
                    <td className="border border-gray-300 text-center  pt-2 pl-1 pr-1">
                      {variant}
                    </td>
                    <td className="border border-gray-300  ">
                      <input type="text" className="w-full border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>

                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                    <td className="border border-gray-300 ">
                      <input type="text" className="w-full  border rounded" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className=" flex justify-end mb-5">
        <button
          className="bg-green-700 p-2 pl-10 pr-10 mt-5 text-white rounded-md flex justify-end flex-end"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
