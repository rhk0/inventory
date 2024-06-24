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
  const [Items, setItems] = useState([]);
  const [Quantity, setQuantity] = useState(0);
  const [Rate, setRate] = useState(0);
  const [Amount, setAmount] = useState("");
  const [addvarints, setVarints] = useState(false);
  const [formData, setFormData] = useState({ Items: [] });
  const [imgs, setimgs] = useState([]);

  useEffect(() => {
    updateTable(options);
  }, [options]);

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...Items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("items", JSON.stringify(Items));

    try {
      const response = await axios.post("/api/v1/auth/createProduct", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        toast.success("Product Created Successfully...");
      }
    } catch (error) {
      toast.error(
        `There was an error creating the product: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

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
    // Extract existing variants from Items
    const existingVariants = Items.map(item => item.variant);
  
    // Flatten and filter new variants
    const newVariants = newOptions
      .filter((option) => option.values.length > 0)
      .flatMap((option) => option.values);
  
    // Generate table variants for new selections
    const tableVariants = newVariants
      .filter((variant) => !existingVariants.includes(variant))
      .map((variant) => ({
        variant: variant,
        productCode: "",
        productName: "",
        purchasePrice: "",
        landingCost: "",
        mrp: "",
        retailDiscount: "",
        retailPrice: "",
        retailMargin: "",
        wholesalerDiscount: "",
        wholesalerPrice: "",
        wholesaleMargin: "",
        minimumStock: "",
        maximumStock: "",
        openingQty: "",
      }));
  
    // Filter out items that are no longer selected
    const updatedItems = Items.filter((item) =>
      newVariants.includes(item.variant)
    );
  
    // Update Items state with filtered existing items and new table variants
    setItems([...updatedItems, ...tableVariants]);
  };
  

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

      <div className="flex justify-start mt-8 px-1">
        <button
          onClick={() => setVarints(!addvarints)}
          className="bg-gray-400 text-black px-4 py-2 rounded-md mb-4 "
        >
          Add Variant
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
                {Items.map((item, index) => (
                  <tr key={index} className="mt-1">
                    <td className="border border-gray-300 text-center pt-2 pl-1 pr-1">
                      <input
                        type="text"
                        name="variant"
                        value={item.variant}
                        className="w-full border rounded"
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="productCode"
                        value={item.productCode}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="productName"
                        value={item.productName}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="purchasePrice"
                        value={item.purchasePrice}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="landingCost"
                        value={item.landingCost}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="mrp"
                        value={item.mrp}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailDiscount"
                        value={item.retailDiscount}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailPrice"
                        value={item.retailPrice}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailMargin"
                        value={item.retailMargin}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesalerDiscount"
                        value={item.wholesalerDiscount}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesalerPrice"
                        value={item.wholesalerPrice}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesaleMargin"
                        value={item.wholesaleMargin}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="minimumStock"
                        value={item.minimumStock}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="maximumStock"
                        value={item.maximumStock}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="openingQty"
                        value={item.openingQty}
                        onChange={(e) => handleProductChange(index, e)}
                      />
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

export default CreateProduct;
