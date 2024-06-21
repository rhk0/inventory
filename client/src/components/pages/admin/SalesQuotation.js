import React, { useState } from "react";

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemcode: "",
      name: "",
      qty: 0,
      freeQty: 0,
      price: 0,
      dis1: 0,
      dis2: 0,
      tax: 0,
      total: 0,
    },
  ]);

  const addProduct = (index) => {
    const newProduct = {
      id: products.length + 1,
      itemcode: "",
      name: "",
      qty: 0,
      freeQty: 0,
      price: 0,
      dis1: 0,
      dis2: 0,
      tax: 0,
      total: 0,
    };
    const newProducts = [...products];
    newProducts.splice(index + 1, 0, newProduct);
    setProducts(newProducts);
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="responsive-container p-4 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <h1 className="text-center text-3xl mb-4">Quotation</h1>
      <div className="p-4 border-b border-gray-300">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold">Date</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Quotation No</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Select Customer</label>
            <input type="date" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-semibold">Reverse Charge</label>
            <select className="border p-2 rounded w-full">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Place of Supply</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Payment Terms</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>{" "}
          <div>
            <label className="block font-semibold">Due Date</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>{" "}
          <div>
            <label className="block font-semibold">Tax Type</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Billing Address</label>
            <textarea
              className="border p-2 rounded w-full"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Shipping Address</label>
            <textarea
              className="border p-2 rounded w-full"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Product Details</h3>
        </div>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">S.No.</th>
              <th className="border p-2">Itemcode</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">CGST</th>
              <th className="border p-2">SGST</th>
              <th className="border p-2">IGST</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={product.itemcode}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].itemcode = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={product.name}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].name = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-2 w-full"
                    value={product.qty}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].qty = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-2 w-full"
                    value={product.freeQty}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].freeQty = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-2 w-full"
                    value={product.price}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].price = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-2 w-full"
                    value={product.dis1}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].dis1 = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-2 w-full"
                    placeholder="%"
                    value={product.dis2}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].dis2 = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="border p-2">
                  Rs.{" "}
                  {(
                    ((product.price * product.qty -
                      (product.price * product.qty * product.dis1) / 100 -
                      (product.price * product.qty * product.dis2) / 100) *
                      product.tax) /
                    100
                  ).toFixed(2)}
                </td>
                <td className="border p-2">
                  Rs.{" "}
                  {(
                    product.price * product.qty -
                    (product.price * product.qty * product.dis1) / 100 -
                    (product.price * product.qty * product.dis2) / 100 +
                    ((product.price * product.qty -
                      (product.price * product.qty * product.dis1) / 100 -
                      (product.price * product.qty * product.dis2) / 100) *
                      product.tax) /
                      100
                  ).toFixed(2)}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white rounded-md  pl-3 pr-3 pt-0 pb-0  text-2xl "
                    onClick={() => addProduct(index)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-md p-2 pl-3 pr-3 pt-0 pb-0  text-2xl"
                    onClick={() => removeProduct(product.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex justify-end">
          <div className="flex gap-5 text-right">
            <div className="mb-2">
              <span className="block font-semibold">Tax Amount:</span>
              <span className="block font-semibold">Total Amount:</span>
              <span className="block font-semibold">Roundoff:</span>
              <span className="block font-bold">Net Amount:</span>
            </div>
            <div>
              <span className="block">
                Rs.{" "}
                {products
                  .reduce(
                    (acc, product) =>
                      acc +
                      ((product.price * product.qty -
                        (product.price * product.qty * product.dis1) / 100 -
                        (product.price * product.qty * product.dis2) / 100) *
                        product.tax) /
                        100,
                    0
                  )
                  .toFixed(2)}
              </span>
              <span className="block">
                Rs.{" "}
                {products
                  .reduce(
                    (acc, product) =>
                      acc +
                      (product.price * product.qty -
                        (product.price * product.qty * product.dis1) / 100 -
                        (product.price * product.qty * product.dis2) / 100 +
                        ((product.price * product.qty -
                          (product.price * product.qty * product.dis1) / 100 -
                          (product.price * product.qty * product.dis2) / 100) *
                          product.tax) /
                          100),
                    0
                  )
                  .toFixed(2)}
              </span>
              <span className="block">Rs. 0.00</span>
              <span className="block font-bold">
                Rs.{" "}
                {products
                  .reduce(
                    (acc, product) =>
                      acc +
                      (product.price * product.qty -
                        (product.price * product.qty * product.dis1) / 100 -
                        (product.price * product.qty * product.dis2) / 100 +
                        ((product.price * product.qty -
                          (product.price * product.qty * product.dis1) / 100 -
                          (product.price * product.qty * product.dis2) / 100) *
                          product.tax) /
                          100),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
