import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [gstRate, setGstRate] = useState("0%");
  const [landingCost, setLandingCost] = useState("");
  const [options, setOptions] = useState([{ name: "", values: [] }]);
  const [tableData, setTableData] = useState([]);

  const [Quantity, setQuantity] = useState(0);
  const [Rate, setRate] = useState(0);
  const [Amount, setAmount] = useState("");
  const [addvarints, setVarints] = useState(false);

  const calculateLandingCost = () => {
    const price = parseFloat(purchasePrice) || 0;
    const gst = parseFloat(gstRate) / 100 || 0;
    const cost = price + price * gst;
    setLandingCost(cost.toFixed(2));
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
            <input type="text" className="w-full p-1 border rounded " />
          </div>
          <div>
            <label className="block font-bold">Product Name</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Category</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Sub Category</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Brand</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Sub Brand</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">UOM</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">GST Rate</label>
            <select
              className="w-full p-1 border rounded"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
            >
              <option value="0%">0%</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
              <option value="28%">28%</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Purchase Tax Include</label>
            <input type="checkbox" className="p-1 m-4 border rounded" />
          </div>
          <div>
            <label className="font-bold">Sales Tax Include</label>
            <input type="checkbox" className="p-1 m-4 border rounded" />
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
              <input type="text" className="w-full p-1 border rounded" />
            )}
          </div>
          <div>
            <label className="block font-bold">Batch No.</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Expiry Date</label>
            <input type="date" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Manufacturer</label>
            <select className="w-full p-1 border rounded">
              {/* Options go here */}
            </select>
          </div>
          <div>
            <label className="block font-bold">Ingredients</label>
            <textarea type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Features</label>
            <textarea type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Description</label>
            <textarea type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Net Weight</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Product Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full p-1 border rounded"
              multiple
            />
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
              className="w-full p-1 border rounded"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold">Landing Cost</label>
            <input
              type="text"
              className="w-full p-1 border rounded"
              value={landingCost}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">MRP</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Retail Discount</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Retail Price</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Retail Margin</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Wholesaler Discount</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Wholesaler Price</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Wholesale Margin</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Minimum Stock</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Maximum Stock</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Opening Balance</h2>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="block font-bold">Particular</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Quantity</label>
            <input
              type="number"
              className="w-full p-1 border rounded"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold">Rate</label>
            <input
              type="number"
              className="w-full p-1 border rounded"
              value={Rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold">Units</label>
            <input type="text" className="w-full p-1 border rounded" />
          </div>
          <div>
            <label className="block font-bold">Amount</label>
            <input
              type="text"
              className="w-full p-1 border rounded"
              readOnly
              value={Amount}
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
        <button className="bg-green-700 p-2 pl-10 pr-10 mt-5 text-white rounded-md flex justify-end flex-end">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
