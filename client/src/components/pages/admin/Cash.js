import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cash = () => {
  const [formData, setFormData] = useState({
    name: "",
    openingBalance: "",
    drCr: "",
  });

  const [cashData, setCashData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "openingBalance", "drCr"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post("/api/v1/auth/createCash", formData);
      if (response) {
        toast.success("Cash created successfully...");
        fetchCash();
      }

      clearData();
    } catch (error) {
      console.error("Error creating cash entry:", error);
      toast.error("Error creating cash entry");
    }
  };

  const clearData = () => {
    setFormData({
      name: "",
      openingBalance: "",
      drCr: "",
    });
  };

  const fetchCash = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageCash");
      setCashData(response.data.data);
    } catch (error) {
      console.error("Error fetching cash data", error);
      toast.error("Error fetching cash data");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/auth/deleteCash/${id}`);
      toast.success("Cash entry deleted successfully");
      fetchCash();
    } catch (error) {
      console.error("Error deleting cash entry:", error);
      toast.error("Error deleting cash entry");
    }
  };

  const handleEdit = (cash) => {
    setModalData(cash);
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/auth/updateCash/${modalData._id}`, modalData);
      toast.success("Cash entry updated successfully");
      setIsModalOpen(false);
      fetchCash();
    } catch (error) {
      console.error("Error updating cash entry:", error);
      toast.error("Error updating cash entry");
    }
  };

  useEffect(() => {
    fetchCash();
  }, []);

  return (
    <div className="p-4 sm:p-10 responsive-container">
      <div className="text-center text-2xl sm:text-3xl font-bold text-purple-600 mb-6">
        Cash
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full sm:w-1/2 mx-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
          <div>
            <label className="block mb-2">Opening Balance</label>
            <input
              type="text"
              name="openingBalance"
              value={formData.openingBalance}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <div>
            <label className="block mb-2">Dr. / Cr.</label>
            <select
              name="drCr"
              value={formData.drCr}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="Dr">Dr</option>
              <option value="Cr">Cr</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-purple-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>

      <div className="text-center text-2xl sm:text-3xl font-bold text-purple-600 mb-4 mt-4">
        Manage Cash
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Opening Balance</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {cashData.map((cash, index) => (
              <tr key={cash.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{cash.name}</td>
                <td className="px-4 py-2 border">{cash.openingBalance}</td>
                <td className="px-4 py-2 border text-red-600">
                  <a href="#view" className="mr-2">
                    View
                  </a>
                  /
                  <a
                    href="#edit"
                    className="mx-2"
                    onClick={() => handleEdit(cash)}
                  >
                    Edit
                  </a>
                  /
                  <button
                    onClick={() => handleDelete(cash._id)}
                    className="ml-2 text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      {isModalOpen && (
        <Modal
          modalData={modalData}
          setIsModalOpen={setIsModalOpen}
          handleModalChange={handleModalChange}
          handleModalSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

const Modal = ({ modalData, setIsModalOpen, handleModalChange, handleModalSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-md z-10 w-1/2">
        <h2 className="text-2xl mb-4">Edit Cash Entry</h2>
        <form onSubmit={handleModalSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={modalData.name}
              onChange={handleModalChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Opening Balance</label>
            <input
              type="text"
              name="openingBalance"
              value={modalData.openingBalance}
              onChange={handleModalChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Dr. / Cr.</label>
            <select
              name="drCr"
              value={modalData.drCr}
              onChange={handleModalChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="Dr">Dr</option>
              <option value="Cr">Cr</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-2 bg-gray-500 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-purple-600 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cash;
