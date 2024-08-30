import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ProductViewModel = ({ ManufacturerData, closeModal }) => {
  // Initial states and other code
  const initialItemsState = {
    amount: ManufacturerData.amount || "",
    batchNo: ManufacturerData.batchNo || "",
    brand: ManufacturerData.brand || "",
    category: ManufacturerData.category || "",
    cess: ManufacturerData.cess || "",
    description: ManufacturerData.description || "",
    expiryDate: ManufacturerData.expiryDate || "",
    feature: ManufacturerData.feature || "",
    gstRate: ManufacturerData.gstRate || "",
    img: ManufacturerData.img || [],
    itemCode: ManufacturerData.itemCode || "",
    manufacturer: ManufacturerData.manufacturer || "",
    maximumStock: ManufacturerData.maximumStock || "",
    maxmimunRetailPrice: ManufacturerData.maxmimunRetailPrice || "",
    minimumStock: ManufacturerData.minimumStock || "",
    newWeight: ManufacturerData.newWeight || "",
    productName: ManufacturerData.productName || "",
    purchasePriceExGst: ManufacturerData.purchasePriceExGst || "",
    purchasePriceInGst: ManufacturerData.purchasePriceInGst || "",
    purchaseTaxInclude: ManufacturerData.purchaseTaxInclude || "",
    quantity: ManufacturerData.quantity || "",
    rate: ManufacturerData.rate || "",
    retailDiscount: ManufacturerData.retailDiscount || "",
    retailMargin: ManufacturerData.retailMargin || "",
    retailPrice: ManufacturerData.retailPrice || "",
    rows: ManufacturerData.rows || [],
    salesTaxInclude: ManufacturerData.salesTaxInclude || "",
    subBrand: ManufacturerData.subBrand || "",
    subCategory: ManufacturerData.subCategory || "",
    units: ManufacturerData.units || "",
    wholesaleMargin: ManufacturerData.wholesaleMargin || "",
    wholesalerDiscount: ManufacturerData.wholesalerDiscount || "",
    wholesalerPrice: ManufacturerData.wholesalerPrice || "",
  };
  console.log(ManufacturerData,"ManufacturerData")
  
  // State definitions
  const [Items, setItems] = useState(initialItemsState);
  const [Quantity, setQuantity] = useState(0);
  const [Rate, setRate] = useState(0);
  const [Amount, setAmount] = useState("");
  const [addvarints, setVarints] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [subbrand, setSubBrand] = useState([]);

  return (
    <div className="justify-center p-8 responsive-container">
      <div className="flex justify-between items-center mb-1">
        <h1 className="font-bold text-center text-gray-700 text-2xl underline">
          View Manufacturer
        </h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Product Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
      {  console.log(ManufacturerData,"itemcode")}
          <div>
            <label className="block font-bold">Item Code</label>
            <input
              type="text"
              name="itemCode"
              className="w-full p-1 border rounded"
              value={ManufacturerData.itemCode}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full p-1 border rounded"
              value={ManufacturerData.productName}
            />{" "}
          </div>

          <div>
            <label className="block font-bold">Category</label>
            <input
              name="category"
              className="w-full p-1 border rounded"
              value={ManufacturerData.categories}
            />
              
          </div>
          <div>
            <label className="block font-bold">Sub Category</label>
            <input
              className="w-full p-1 border rounded"
              name="subCategory"
              value={ManufacturerData.subCategory}
            />
            
          </div>
          <div>
            <label className="block font-bold">Brand</label>
            <input
              className="w-full p-1 border rounded"
              name="subCategory"
              value={ManufacturerData.brand}
            />
          </div>
          <div>
            <label className="block font-bold">Sub Brand</label>
            <input
              className="w-full p-1 border rounded"
              name="subCategory"
              value={ManufacturerData.subBrand}
            />
          </div>
          <div>
            <label className="block font-bold">UOM</label>
            <input
              className="w-full p-1 border rounded"
              name="subCategory"
              value={ManufacturerData.uom}
            />
          </div>
          <div>
            <label className="block font-bold">GST Rate</label>
            <select
              className="w-full p-1 border rounded"
              name="gstRate"
              //value={productData.gstRate}
              // onChange={handleGstRateChange}
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
              // checked={productData.purchaseTaxInclude}
            />
          </div>
          <div>
            <label className="font-bold">Sales Tax Include</label>
            <input
              type="checkbox"
              className="p-1 m-4 border rounded"
              name="salesTaxInclude"
              // checked={productData.salesTaxInclude}
            />
          </div>
          <div>
            <label className="font-bold px-2">Cess</label>
            <input
              type="checkbox"
              // checked={isChecked}
              // onChange={() => setIsChecked(!isChecked)}
              className=" border rounded"
            />
            {/* {isChecked && (
              <input
                type="text"
                className="w-full p-1 border rounded"
                name="cess"
                checked={productData.cess}
              />
            )} */}
          </div>
          <div>
            <label className="block font-bold">Batch No.</label>
            <input
              type="text"
              name="batchNo"
              className="w-full p-1 border rounded"
              //value={productData.batchNo}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              className="w-full p-1 border rounded"
              //value={productData.expiryDate}
            />
          </div>
          <div>
            <label className="block font-bold">Manufacturer</label>
            <select
              className="w-full p-1 border rounded"
              name="manufacturer"
              //value={productData.manufacturer}
            ></select>
          </div>
          <div>
            <label className="block font-bold">Ingredients</label>
            <textarea
              type="text"
              name="ingredients"
              className="w-full p-1 border rounded"
              //value={productData.ingredients}
            />
          </div>
          <div>
            <label className="block font-bold">Features</label>
            <textarea
              type="text"
              name="feature"
              className="w-full p-1 border rounded"
              //value={productData.feature}
            />
          </div>

          <div>
            <label className="block font-bold">Description</label>
            <textarea
              name="description"
              className="w-full p-1 border rounded"
              //value={productData.description}
            />
          </div>
          <div>
            <label className="block font-bold">Net Weight</label>
            <input
              type="text"
              name="netWeight"
              className="w-full p-1 border rounded"
              //value={productData.netWeight}
            />
          </div>
          <div>
            <label className="block font-bold">Product image</label>

            <input
              type="file"
              name="img"
              accept="image/*"
              className="w-full p-1 border rounded"
              multiple
              // onChange={(e) => setimgs(Array.from(e.target.files))}
              // ref={fileInputRef}
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
              name="purchasePrice"
              className="w-full p-1 border rounded"
              // //value={purchasePrice}
              // onChange={(e) => setPurchasePrice(e.target.//value)}
            />
          </div>
          <div>
            <label className="block font-bold">Landing Cost</label>
            <input
              type="text"
              name="landingCost"
              className="w-full p-1 border rounded"
              // //value={landingCost}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">MRP</label>
            <input
              type="number"
              name="mrp"
              className="w-full p-1 border rounded"
              //value={productData.mrp}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Discount</label>
            <input
              type="number"
              name="retailDiscount"
              className="w-full p-1 border rounded"
              //value={productData.retailDiscount}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Price</label>
            <input
              type="number"
              name="retailPrice"
              className="w-full p-1 border rounded"
              //value={productData.retailPrice}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Retail Margin</label>
            <input
              type="number"
              name="retailMargin"
              className="w-full p-1 border rounded"
              //value={productData.retailMargin}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesaler Discount</label>
            <input
              type="number"
              name="wholesalerDiscount"
              className="w-full p-1 border rounded"
              //value={productData.wholesalerDiscount}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesaler Price</label>
            <input
              type="number"
              name="wholesalerPrice"
              className="w-full p-1 border rounded"
              //value={productData.wholesalerPrice}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Wholesale Margin</label>
            <input
              type="number"
              name="wholesaleMargin"
              className="w-full p-1 border rounded"
              //value={productData.wholesaleMargin}
            />{" "}
          </div>
          <div>
            <label className="block font-bold">Minimum Stock</label>
            <input
              type="number"
              name="minimumStock"
              className="w-full p-1 border rounded"
              //value={productData.minimumStock}
            />
          </div>
          <div>
            <label className="block font-bold">Maximum Stock</label>
            <input
              type="number"
              name="maximumStock"
              className="w-full p-1 border rounded"
              //value={productData.maximumStock}
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
              //value={productData.particular}
            />
          </div>
          <div>
            <label className="block font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-1 border rounded"
              //value={productData.quantity}
              // onChange={handleQuantityChange}
            />
          </div>
          <div>
            <label className="block font-bold">Rate</label>
            <input
              type="number"
              name="rate"
              className="w-full p-1 border rounded"
              //value={productData.rate}
              // onChange={handleRateChange}
            />
          </div>
          <div>
            <label className="block font-bold">Units</label>
            <input
              type="text"
              name="units"
              className="w-full p-1 border rounded"
              //value={productData.units}
            />
          </div>
          <div>
            <label className="block font-bold">Amount</label>
            <input
              type="text"
              name="amount"
              className="w-full p-1 border rounded"
              readOnly
              //value={productData.amount}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-8 px-1">
        <button
          // onClick={() => setVarints(!addvarints)}
          className="bg-gray-400 text-black px-4 py-2 rounded-md mb-4 "
        >
          Add Variant
        </button>
      </div>
      {addvarints && (
        <>
          <div className="bg-gray-200 p-4 rounded mb-4">
            {/* {options.map((option, index) => ( */}
              <div  className="flex justify-between mb-2">
                <div className="mb-2">
                  <label className="block font-bold">items Name</label>

                  <input
                    type="text"
                    placeholder="Option Name"
                    // //value={option.name}
                    // onChange={(e) =>
                    //   handleOptionChange(index, "name", e.target.//value)
                    // }
                    className="border rounded w-full  p-1"
                  />
                </div>
                {/* <TagInput index={index} //value={option.//values} /> */}
                <button
                  className="ml-2 mt-7 text-red-400 bg-gray-300 text-center rounded-full border border-red-400 text-3xl w-9 h-8 flex items-center justify-center"
                  // onClick={() => handleRemoveOption(index)}
                >
                  <span className="mt-[-5px]">&times;</span>
                </button>
              </div>
            {/* ))} */}
            <button
              // onClick={handleAddOption}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add More
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 border-collapse border border-gray-300 mb-8">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">items</th>
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
                        //value={item.variant}
                        className="w-full border rounded"
                        readOnly
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="productCode"
                        //value={item.productCode}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="productName"
                        //value={item.productName}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="purchasePrice"
                        //value={item.purchasePrice}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="landingCost"
                        //value={item.landingCost}
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="mrp"
                        //value={item.mrp}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailDiscount"
                        //value={item.retailDiscount}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailPrice"
                        //value={item.retailPrice}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="retailMargin"
                        //value={item.retailMargin}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesalerDiscount"
                        //value={item.wholesalerDiscount}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesalerPrice"
                        //value={item.wholesalerPrice}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="wholesaleMargin"
                        //value={item.wholesaleMargin}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="minimumStock"
                        //value={item.minimumStock}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="maximumStock"
                        //value={item.maximumStock}
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        type="text"
                        className="w-full border rounded"
                        name="openingQty"
                        //value={item.openingQty}
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
          // onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      {/* Your modal content goes here */}
      <ToastContainer />
    </div>
  );
};

export default ProductViewModel;
