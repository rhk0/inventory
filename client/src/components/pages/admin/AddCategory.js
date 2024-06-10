import React from "react";

const AddCategory = () => {
  return (
    <div className="responsive-container">
      <form className=" mx-auto  p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold mb-8 text-center underline mb-6 text-violet-800">
          Add Categories
        </h4>
        <div className="px-2 flex gap-5">
          <label className="block mb-2 ">Categorie Name:</label>
          <input
            type="text"
            name="name"
            className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </div>

        <div className="flex justify-between mt-8 px-2">
          <button
            //   onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
