import React, { useState } from 'react';

const SupplierLedger = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  
  // Dummy customer list and ledger data
  const customers = ["Customer 1", "Customer 2", "Customer 3"];
  const ledgerData = [
    { date: "01-04-2024", particular: "Opening Balance", voucherType: "", voucherNo: "", debit: "", credit: "******" },
    { date: "02-04-2024", particular: "To Sales", voucherType: "Sales", voucherNo: "123", debit: "******", credit: "" },
    { date: "03-04-2024", particular: "By Bank", voucherType: "Pay In", voucherNo: "124", debit: "", credit: "" },
    { date: "04-04-2024", particular: "Closing Balance", voucherType: "", voucherNo: "", debit: "*******", credit: "" }
  ];

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  return (
    <div className='responsive-container' style={{ backgroundColor: '#FFFFFF', color: 'black', padding: '20px' }}>
      <h2 className='text-center text-3xl '>Supplier Ledger</h2>
      <div class=" p-1 rounded-lg  flex gap-3">
        <div class="mb-4 w-1/4">
          <label
            htmlFor="startdate"
            class="block text-sm font-medium text-gray-600"
          >
            From
          </label>
          <input
            id="startdate"
            type="date"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="mb-4 w-1/4">
          <label
            htmlFor="enddate"
            class="block text-sm font-medium text-gray-600"
          >
            To
          </label>
          <input
            id="enddate"
            type="date"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="mt-5 w-1/4">
          <select className=" block w-full border p-3 border-gray-300 rounded-md shadow-sm  focus:ring focus:ring-blue-200 focus:outline-none">
            <option value="Select Customer" className="">
              Select Supplier
            </option>
          </select>
        </div>
      </div>
      <div>
       
      </div>
      <table border="1" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th className='p-2 border border-black'>Date</th>
            <th className='p-2 border border-black'>Particular</th>
            <th className='p-2 border border-black'>Voucher Type</th>
            <th className='p-2 border border-black'>Voucher No.</th>
            <th className='p-2 border border-black'>Debit Amount</th>
            <th className='p-2 border border-black'>Credit Amount</th>
          </tr>
        </thead>
        <tbody>
          {ledgerData.map((entry, index) => (
            <tr key={index}>
              <td className='p-2 border border-black'>{entry.date}</td>
              <td className='p-2 border border-black'>{entry.particular}</td>
              <td className='p-2 border border-black'>{entry.voucherType}</td>
              <td className='p-2 border border-black'>{entry.voucherNo}</td>
              <td className='p-2 border border-black'>{entry.debit}</td>
              <td className='p-2 border border-black'>{entry.credit}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">TOTAL</td>
            <td>******</td>
            <td>******</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SupplierLedger;
