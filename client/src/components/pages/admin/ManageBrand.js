import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBrand = () => {
  const [brand, setbrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchbrand();
  }, []);

  const fetchbrand = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getBrand");
      setbrand(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openViewModal = (Brand) => {
    setSelectedBrand(Brand);
    setViewModal(true);
  };

  const openEditModal = (Brand) => {
    setSelectedBrand(Brand);
    setEditModal(true);
  };

  const closeModals = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedBrand(null);
  };

  const deleteBrand = async (_id) => {
    try {
      await axios.delete(`/api/v1/auth/deleteBrand/${_id}`);
      toast.success("Brand deleted successfully");

      fetchbrand();
    } catch (error) {
      toast.error("Failed to delete Brand");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`
        /api/v1/auth/updtaeBrand/${selectedBrand._id}`,
        selectedBrand
      );
      toast.success("Brand updated successfully");
      fetchbrand();
      closeModals();
    } catch (error) {
      toast.error("Failed to update Brand");
    }
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Brand
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Brand Name
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {brand.length > 0 ? (
              brand.map((Brand, index) => (
                <tr key={Brand._id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {Brand.BrandName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(Brand)}
                    >
                      View
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(Brand)}
                    >
                      Edit
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteBrand(Brand._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-2 text-center text-sm">
                  No brand found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {/* View Modal */}
      <Modal
        isOpen={viewModal}
        onRequestClose={closeModals}
        contentLabel="View Brand Modal"
        style={{
          content: {
            width: "50%",
            height: "30%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
            
          <h2 className="text-xl font-bold mb-4">View Brand</h2>
          {selectedBrand && (
            <div>
              <p>
                <label className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">                {selectedBrand.BrandName}
                </span>
              </p>
            </div>
          )}

          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
            onClick={closeModals}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onRequestClose={closeModals}
        contentLabel="Edit Brand Modal"
        style={{
          content: {
            width: "50%",
            height: "30%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
          {selectedBrand && (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedBrand.BrandName}
                  onChange={(e) =>
                    setSelectedBrand({
                      ...selectedBrand,
                      BrandName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded mr-2"
                  onClick={closeModals}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageBrand;