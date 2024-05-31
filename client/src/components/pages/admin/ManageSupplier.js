import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SupplierViewModal from "./modals/SupplierViewModal";
import SupplierEditModal from "./modals/SupplierEditModal";

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageSupplier");
      setSuppliers(response.data.data);


    } catch (error) {
      console.error("Error fetching supplier data", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deletesupplier/${_id}`);
      setSuppliers(suppliers.filter((supplier) => supplier._id !== _id));

      if (response) {
        toast.success(" delete all data Successfully...");
      } else {
        toast.error("error while deleting...");
      }
    } catch (error) {
      console.log("Error deleting supplier data", error);
    }
  };

  const openViewModal = (suppliers) => {
    setViewModal(true);
    setModalData(suppliers);
  };

  const openEditModal = (suppliers) => {
    setEditModal(true);
    setModalData(suppliers);
  };

  const closeModal = () => {
    fetchSuppliers();
    setViewModal(false);
    setEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Supplier
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Supplier Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Contact Detail
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Address
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                GST Number
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Opening Balance
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier.id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.name}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.contact}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.address}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.gstIn}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {supplier.openingBalance}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(supplier)}
                    >
                      View
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(supplier)}
                    >
                      Edit
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteSupplier(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No suppliers found.
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
              width: "80%",
              height: "80%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <SupplierViewModal closeModal={closeModal} supplierData={modalData} />
        </Modal>

        <Modal
          isOpen={editModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "80%",
              height: "80%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <SupplierEditModal closeModal={closeModal} supplierData={modalData} />
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageSupplier;
