import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubCategory = () => {
  const [formData, setFormData] = useState({
    BrandName: "",
    SubBrandName: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/auth/getBrand");
        setCategories(response.data.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["BrandName", "SubBrandName"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/createSubBrand",
        formData
      );

      if (response) {
        toast.success("Sub Brand Category Added Successfully...");
      }

      clearData();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add subBrandcategory. Please try again.");
    }
  };

  const clearData = () => {
    setFormData({
      BrandName: "",
      SubBrandName: "",
    });
  };

  return (
    <div className="responsive-container">
      <form
        className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h4 className="text-3xl font-semibold text-center underline mb-6 text-violet-800">
          Add Sub Brand
        </h4>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Brand Name:</label>
            <select
              name="BrandName"
              value={formData.BrandName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.BrandName} value={category.BrandName}>
                  {category.BrandName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Sub Brand Name:</label>
            <input
              type="text"
              name="SubBrandName"
              value={formData.SubBrandName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddSubCategory;
