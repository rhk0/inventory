import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getcategory");
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
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
      await axios.delete(`/api/v1/auth/deletecategory/${_id}`);
      toast.success("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/v1/auth/updtaecategory/${selectedCategory._id}`,
        selectedCategory
      );
      toast.success("Category updated successfully");
      fetchCategories();
      closeModals();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Categories
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
      {viewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-4 w-96">
            <h2 className="text-xl font-bold mb-4">View Category</h2>
            {selectedCategory && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedCategory.CategoryName}
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
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-4 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
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
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
