import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';


const VenderViewModel = ({ VendorData, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center px-0 mb-6 text-xs sm:text-md md:text-lg lg:text-lg font-semibold grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-1">
      {[
        "Supplier Details",
        "Statutory Details",
        "Banking  Details",
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
    <div className=" max-w-3xl mx-auto md:pl-4 md:pr-4 p-2 responsive-container  text-black ">
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
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="block mb-2">
              Name:
              <span type="text" name="name" className="flex-1 pl-4">
                {VendorData.name}
              </span>
            </label>
            <label className="block mb-2">
              Contact:
              <span type="text" name="contact" className="flex-1 pl-4" />
              {VendorData.contact}
            </label>

            <label className="block mb-2">
              Address:
              <span type="text" name="address" className="flex-1 pl-4" />
              {VendorData.address}
            </label>
            <label className="block mb-2">
              Pin Code:
              <span type="text" name="pinCode" className="flex-1 pl-4" />
              {VendorData.pinCode}
            </label>
            <label className="block mb-2">
              State:
              <span type="text" name="accountNo" className="flex-1 pl-4" />
              {VendorData.state}
            </label>
            <label className="block mb-2">
              Country:
              <span type="text" name="country" className="flex-1 pl-4" />
              {VendorData.country}
            </label>

            <label className="block mb-2">
              Email:
              <span type="email" name="email" className="flex-1 pl-4" />
              {VendorData.email}
            </label>
            <label className="block mb-2">
              Website:
              <span type="text" name="website" className="flex-1 pl-4" />
              {VendorData.website}
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
              <span
                type="text"
                name="registrationType"
                className="flex-1 pl-4"
              />
              {VendorData.registrationType}
            </label>

            <label className="block mb-2">
              GSTIN:
              <span type="text" name="gstIn" className="flex-1 pl-4" />
              {VendorData.gstIn}
            </label>

            <label className="block mb-2">
              PAN No:
              <span type="text" name="panNo" className="flex-1 pl-4" />
              {VendorData.panNo}
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
              <span type="text" name="bankName" className="flex-1 pl-4" />
              {VendorData.bankName}
            </label>

            <label className="block mb-2">
              Ifsc Code:
              <span type="text" name="ifscCode" className="flex-1 pl-4" />
              {VendorData.ifscCode}
            </label>

            <label className="block mb-2">
              Account No:
              <span type="text" name="accountNo" className="flex-1 pl-4" />
              {VendorData.accountNo}
            </label>

            <label className="block mb-2">
              Account Holder:
              <span type="text" name="accountHolder" className="flex-1 pl-4" />
              {VendorData.accountHolder}
            </label>

            <label className="block mb-2">
              UPI ID:
              <span type="text" name="upiId" className="flex-1 pl-4" />
              {VendorData.upiId}
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
                Opening Balance
                <span type="text" name="openingBalance" className="flex-1 pl-4">
                  {VendorData.openingBalance}
                </span>
              </label>
            </div>
            <div>
              <label className="block flex items-center">
                Dr. / Cr.
                <span type="text" name="drCr" className="flex-1 pl-4">
                  {VendorData.drCr}
                </span>
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
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default VenderViewModel;
