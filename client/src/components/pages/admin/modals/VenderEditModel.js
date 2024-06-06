import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const VenderEditModel = ({ VendorData, closeModal }) => {
    console.log(VendorData,"vender data")
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(VendorData);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    
    const requiredFields = [
      "name",
      "contact",
      "address",
      "pinCode",
      "state",
      "country",
      "email",
      "website",
      "registrationType",
      "gstIn",
      "panNo",
      "bankName",
      "ifscCode",
      "accountNo",
      "accountHolder",
      "upiId",
      "openingBalance",
      "drCr",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
        console.log(formData,"formdata");
      const response = await axios.put(
        `/api/v1/auth/updateVendor/${formData._id}`,
        formData
      );
      console.log(response,"res")
      

      if (response.data.success) {

        toast.success("Vendor updated successfully...");
        closeModal();
      } else {
        console.error("Failed to update Vendor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center px-0 mb-6 text-xs sm:text-md md:text-lg lg:text-lg font-semibold grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-1">
      {[
        "Vendor Details",
        "Statutory Details",
        "Banking Details",
        "Opening Balance",
      ].map((step, index) => (
        <div
          key={index}
          className={`flex items-center px-4 py-2 ${
            currentStep === index + 1
              ? "bg-violet-600 text-white underline underline-offset-8"
              : "bg-gray-300"
          } rounded-md mx-2 cursor-pointer transition duration-300`}
          onClick={() => setCurrentStep(index + 1)}
        >
          {step}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto md:pl-4 md:pr-4 p-2 responsive-container text-black">
      <button
        className="absolute top-2 right-2 p-2 text-gray-700 text-xl hover:text-gray-900 focus:outline-none md:text-2xl md:top-4 md:right-4 border"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
      <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800 mt-8">
      Vendors
      </h4>
      {renderStepIndicator()}
      {currentStep === 1 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
            <label className="block mb-2">
              Contact:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
            <label className="block mb-2">
              Pin Code:
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
            <label className="block mb-2">
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
            <label className="block mb-2">
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
            <label className="block mb-2">
              Website:
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="block mb-2">
              Registration Type:
              <input
                type="text"
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              GSTIN:
              <input
                type="text"
                name="gstIn"
                value={formData.gstIn}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              PAN No:
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="block mb-2">
              Bank Name:
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              Ifsc Code:
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              Account No:
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              Account Holder:
              <input
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>

            <label className="block mb-2">
              UPI ID:
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Next
            </button>
          </div>
        </>
      )}


      {currentStep === 4 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block mb-2">
                Opening Balance:
                <input
                  type="text"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  className="flex-1 pl-4"
                />
              </label>
            </div>
            <div>
              <label className="block flex items-center">
                Dr. / Cr.:
                <input
                  type="text"
                  name="drCr"
                  value={formData.drCr}
                  onChange={handleChange}
                  className="flex-1 pl-4"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Previous
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenderEditModel;
