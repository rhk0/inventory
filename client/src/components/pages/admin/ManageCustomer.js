import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomerViewModal from "./modals/CustomerViewModal.js";
import CustomerEditModal from "./modals/CustomerEditModal.js";

const ManageCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageCustomer");
      setCustomer(response.data.data);


    } catch (error) {
      console.error("Error fetching customer data", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const deleteCustomer = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deleteCustomer/${_id}`);
      setCustomer(customer.filter((customer) => customer._id !== _id));

      if (response) {
        toast.success(" delete all data Successfully...");
      } else {
        toast.error("error while deleting...");
      }
    } catch (error) {
      console.log("Error deleting customer data", error);
    }
  };

  const openViewModal = (customer) => {
    setViewModal(true);
    setModalData(customer);
  };

  const openEditModal = (customer) => {
    setEditModal(true);
    setModalData(customer);
  };

  const closeModal = () => {
    fetchCustomer();
    setViewModal(false);
    setEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Customer
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Customer Name
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
            {customer.length > 0 ? (
              customer.map((customer, index) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {customer.name}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {customer.contact}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {customer.address}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {customer.gstIn}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {customer.openingBalance}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(customer)}
                    >
                      View
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(customer)}
                    >
                      Edit
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteCustomer(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No customer found.
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
          <CustomerViewModal closeModal={closeModal} customerData={modalData} />
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
          <CustomerEditModal closeModal={closeModal} customerData={modalData} />
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageCustomer;
