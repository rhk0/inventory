import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getSubCategory");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openViewModal = (category) => {
    setSelectedCategory(category);
    setViewModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setEditModal(true);
  };

  const closeModals = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedCategory(null);
  };

  const deleteCategory = async (_id) => {
    try {
      await axios.delete(`/api/v1/auth/deleteSubCategory/${_id}`);
      toast.success("Sub Category deleted successfully");

      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `
        /api/v1/auth/updtaeSubCategory/${selectedCategory._id}`,
        selectedCategory
      );
      toast.success(" Sub Category updated successfully");
      fetchCategories();
      closeModals();
    } catch (error) {
      toast.error("Failed to update Sub category");
    }
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Sub Categories
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Category Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Sub Category Name
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {category.CategoryName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {category.subCategoryName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(category)}
                    >
                      View
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(category)}
                    >
                      Edit
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-2 text-center text-sm">
                  No Categories found.
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
        contentLabel="View Category Modal"
        style={{
          content: {
            width: "50%",
            height: "40%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">View Sub Category</h2>
          {selectedCategory && (
            <div>
              <p>
                <label className="block text-sm font-medium text-gray-700 ">
                  Category Name
                </label>
                <span className="mt-1 mb-4 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {" "}
                  {selectedCategory.CategoryName}
                </span>

                <label className="block text-sm font-medium text-gray-700">
                  Sub Category Name
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {" "}
                  {selectedCategory.subCategoryName}
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
        contentLabel="Edit Category Modal"
        style={{
          content: {
            width: "50%",
            height: "40%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Sub Category</h2>
          {selectedCategory && (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedCategory.CategoryName}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      CategoryName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Sub Category Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedCategory.subCategoryName}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      subCategoryName: e.target.value,
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
export default ManageSubCategory;