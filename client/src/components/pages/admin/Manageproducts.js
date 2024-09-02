import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


import ProductViewModel from "./modals/ProductViewModel";
import ProductEditModal from "./modals/ProductEditModal";

const Manageproducts = () => {
  const [manufacturer, setManufacturer] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchManufacturer = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageproduct");
      setManufacturer(response.data.data);
    } catch (error) {
      console.error("Error fetching Manufacturer data", error);
    }
  };

  useEffect(() => {
    fetchManufacturer();
  }, []);

  const deleteManufacturer = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deleteproduct/${_id}`);
      setManufacturer(manufacturer.filter((supplier) => supplier._id !== _id));

      if (response) {
        toast.success(" delete all data Successfully...");
      } else {
        toast.error("error while deleting...");
      }
    } catch (error) {
      console.log("Error deleting supplier data", error);
    }
  };

  const openViewModal = (manufacturer) => {
    setViewModal(true);
    setModalData(manufacturer);
  };

  const openEditModal = (Manufacturer) => {
    setEditModal(true);
    setModalData(Manufacturer);
  };

  const closeModal = () => {
    fetchManufacturer();
    setViewModal(false);
    setEditModal(false);
  };

  // Filter Manufacturer based on search query
  const filteredManufacturer = manufacturer.filter((supplier) =>
    supplier.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Products
      </h1>
      {/* Search input */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Product By Name , Item Name "
          className="p-2 w-1/4 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100   border-b">
              <th className=" border-r font-black font-bold text-black text-[10px] font-medium text-gray-600">
                No
              </th>
              <th className="px-6 py-2 font-black  font-bold text-black font-black text-nowrap border-r text-left text-sm font-medium text-gray-600">
                Product Code
              </th>

              <th className="px-6 py-2 font-black text-nowrap border-r text-left text-sm font-medium text-gray-600">
                Product Name
              </th>
              <th className="px-6 py-2 font-black border-r text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-6 py-2 font-black border-r text-left text-sm font-medium text-gray-600">
                Manufacturer
              </th>
              <th className="px-6 py-2 font-black border-r text-left text-sm font-medium text-gray-600">
                brand
              </th>

              <th className="px-6 py-2 font-black text-nowrap border-r text-left text-sm font-medium text-gray-600">
                Net Weight
              </th>

              <th className="px-6 py-2 font-black border-r text-left text-sm font-medium text-gray-600">
                MRP
              </th>
              <th className="px-6 font-black text-nowrap py-2 border-r text-left text-sm font-medium text-gray-600">
                Purchase Price{" "}
                <span className="text-[10px]">( Include GST)</span>
              </th>
              <th className="px-6 py-2 font-black text-nowrap border-r text-left text-sm font-medium text-gray-600">
                Retail Price
              </th>
              <th className="px-6 py-2 font-black text-nowrap border-r text-left text-sm font-medium text-gray-600">
                Wholesale Price
              </th>
              <th className="text-center font-black px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredManufacturer.length > 0 ? (
              filteredManufacturer.map((supplier, index) => (
                <tr key={supplier.id} className="border-b">
                  <td className=" px-1 py-1 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.itemCode}
                  </td>

                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.productName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.category}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.manufacturer}
                  </td>

                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.brand}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.newWeight}
                  </td>
                  {/* <td className="px-6 py-2 border-r text-sm">
                    {supplier.openingBalance}
                  </td> */}
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.maxmimunRetailPrice}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.purchasePriceInGst}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.retailPrice}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.wholesalerPrice}
                  </td>
                  <td className="px-1 py-2 border-r text-sm flex">
                    <button
                      className="mx-1 text-white bg-green-500 pl-3 pr-3 p-1 rounded"
                      onClick={() => openViewModal(supplier)}
                    >
                      View
                    </button>{" "}
                    <button
                      className="mx-1 text-white bg-blue-500 pl-3 pr-3 p-1 rounded"
                      onClick={() => openEditModal(supplier)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="mx-1 text-white bg-red-500 pl-3 pr-3 p-1 rounded"
                      onClick={() => deleteManufacturer(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No Manufacturer found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={viewModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "100%",
              height: "100%",
              maxWidth: "1200px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <ProductViewModel
            closeModal={closeModal}
            ManufacturerData={modalData}
          />
        </Modal>

        <Modal
          isOpen={editModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "100%",
              height: "100%",
              maxWidth: "1200px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <ProductEditModal
            closeModal={closeModal}
            ManufacturerData={modalData}
            
          />
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Manageproducts;
