import React from "react";

const AddSubCategory = () => {
  return (
    <div className="responsive-container">
      <form className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold text-center underline mb-6 text-violet-800">
          Add Sub Categories
        </h4>

        {/* Using a flex container for vertical alignment */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Categorie Name:</label>
            <input
              type="text"
              name="categoryName"
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4">Sub Category Name:</label>
            <input
              type="text"
              name="subCategoryName"
              className="w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            // onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
