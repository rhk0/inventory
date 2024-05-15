import React, { useState } from "react";
import axios from "axios";

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    b_state: "",
    country: "",
    pinCode: "",
    contact: "",
    email: "",
    website: "",
    financialYear: "",
    bookFrom: "",
    s_state: "",
    tax_Rate: "",
    taxable_value: "",
    gstIn: "",
    e_way_bill: true,

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the required fields
    const requiredFields = [
      "businessName",
      "address",
      "b_state",
      "country",
      "pinCode",
      "contact",
      "email",
      "financialYear",
      "bookFrom",
      "s_state",
      "tax_Rate",
      "taxable_value",
      "gstIn",

    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      console.log("Sending data to the server:", formData);
      const response = await axios.post(
        "http://localhost:5000/api/v1/company/register",
        formData
      );
      console.log(response.data);
      alert("Company created successfully!");
    } catch (error) {
      console.error(
        "Error creating company:",
        error.response ? error.response.data : error.message
      );
      alert(
        `There was an error creating the company: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <form
      className="max-w-2xl mx-auto p-8 bg-teal-700 text-black rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Business Details</h2>
        <label className="block mb-2">
          Business Name:
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          State:
          <input
            type="text"
            name="b_state"
            value={formData.b_state}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Pin Code:
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Contact:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Financial Year:
          <input
            type="text"
            name="financialYear"
            value={formData.financialYear}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Book From:
          <input
            type="date"
            name="bookFrom"
            value={formData.bookFrom}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Statutory Details</h2>
        <label className="block mb-2">
          State:
          <input
            type="text"
            name="s_state"
            value={formData.s_state}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Tax Rate:
          <input
            type="text"
            name="tax_Rate"
            value={formData.tax_Rate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Taxable Value:
          <input
            type="text"
            name="taxable_value"
            value={formData.taxable_value}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          GSTIN:
          <input
            type="text"
            name="gstIn"
            value={formData.gstIn}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          E-way Bill Applicable:
          <select
            name="e_way_bill"
            value={formData.e_way_bill}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() =>
            setFormData({
              businessName: "",
              address: "",
              b_state: "",
              country: "",
              pinCode: "",
              contact: "",
              email: "",
              website: "",
              financialYear: "",
              bookFrom: "",
              s_state: "",
              tax_Rate: "",
              taxable_value: "",
              gstIn: "",
              e_way_bill: true,
              tanRegistrationNo: "",
              tanNo: "",
              deductorType: "",
            })
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyRegistration;
