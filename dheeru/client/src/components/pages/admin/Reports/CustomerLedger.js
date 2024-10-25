import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../../context/Auth.js'

const CustomerLedger = () => {
  const [userId, setUserId] = useState('')
  const [salesInvoice, setSalesInvoice] = useState([])
  const [payIns, setPayIns] = useState([])
  const [customers, setCustomers] = useState([])
  const [openingBalance, setOpeningBalance] = useState(0)
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [totalDebit, setTotalDebit] = useState(0)
  const [totalCredit, setTotalCredit] = useState(0)
  const [closingBalance, setClosingBalance] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isCustomerSelected, setIsCustomerSelected] = useState(false)

  const [auth] = useAuth()

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
        `/api/v1/salesInvoiceRoute/getAllsalesinvoice/${userId}`,
      )
      const invoices = response.data.response
      setSalesInvoice(invoices)
    } catch (error) {
      console.log('Error fetching sales invoices.')
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageCustomer/${userId}`)
      const customerData = response.data.data
      setCustomers(customerData)
    } catch (error) {
      console.log('Error fetching customers.')
    }
  }

  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id)
    } else if (auth.user.role === 0) {
      setUserId(auth.user.admin)
    }
  }, [auth])

  const fetchPayIns = async () => {
    try {
      const response = await axios.get(
        `/api/v1/payInRoute/getAllpayin/${userId}`,
      )
      setPayIns(response.data.payInList)
    } catch (error) {
      console.error('Error fetching PayIns:', error)
    }
  }

  useEffect(() => {
    fetchPayIns()
    fetchInvoice()
    if (userId) {
      fetchCustomers()
    }
  }, [userId])

  const handleCustomerSelect = (e) => {
    const name = e.target.value
    setSelectedCustomer(name)
    setIsCustomerSelected(!!name)

    const selectedCustomerData = customers.find(
      (customer) => customer.name === name,
    )

    if (selectedCustomerData) {
      setOpeningBalance(selectedCustomerData.openingBalance)
    } else {
      setOpeningBalance(0)
    }
  }

  const filterTransactions = (transactions, isInvoice = true) => {
    return transactions?.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      const isWithinDateRange =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate))

      const customerField = isInvoice
        ? transaction.customerName
        : transaction.selectCustomer

      return selectedCustomer === customerField && isWithinDateRange
    })
  }

  useEffect(() => {
    if (selectedCustomer) {
      const filteredInvoices = filterTransactions(salesInvoice, true)
      const filteredPayIns = filterTransactions(payIns, false)

      console.log('Filtered Invoices:', filteredInvoices) // Debugging line
      console.log('Filtered PayIns:', filteredPayIns) // Debugging line

      const debitTotal = filteredInvoices?.reduce(
        (sum, invoice) => sum + (Number(invoice.netAmount) || 0),
        openingBalance || 0,
      )

      const creditTotal = filteredPayIns.reduce(
        (sum, payIn) => sum + (Number(payIn.grandtotal) || 0),
        0,
      )

      const calculatedClosingBalance = debitTotal - creditTotal

      setTotalDebit(debitTotal)
      setTotalCredit(creditTotal + calculatedClosingBalance)
      setClosingBalance(calculatedClosingBalance)
    }
  }, [
    selectedCustomer,
    salesInvoice,
    payIns,
    openingBalance,
    startDate,
    endDate,
  ])

  const handleReset = () => {
    setSelectedCustomer('')
    setStartDate('')
    setEndDate('')
    setOpeningBalance(0)
    setTotalDebit(0)
    setTotalCredit(0)
    setClosingBalance(0)
    setIsCustomerSelected(false)
  }

  return (
    <div
      className="responsive-container"
      style={{ backgroundColor: '#FFFFFF', color: 'black', padding: '20px' }}
    >
      <h2 className="text-center text-3xl">Customer Ledger</h2>
      <div className="p-1 rounded-lg flex gap-3">
        <div className="mb-4 w-1/4">
          <label
            htmlFor="startdate"
            className="block text-sm font-medium text-gray-600"
          >
            From
          </label>
          <input
            id="startdate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div className="mb-4 w-1/4">
          <label
            htmlFor="enddate"
            className="block text-sm font-medium text-gray-600"
          >
            To
          </label>
          <input
            id="enddate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div className="mt-5 w-1/4">
          <select
            className="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            onChange={handleCustomerSelect}
            value={selectedCustomer}
          >
            <option value="">Select Customer</option>
            {customers?.map((customer, index) => (
              <option key={index} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 w-1/4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>
      </div>
      {isCustomerSelected && (
        <table border="1" style={{ width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th className="p-2 border border-black">Date</th>
              <th className="p-2 border border-black">Particular</th>
              <th className="p-2 border border-black">Voucher Type</th>
              <th className="p-2 border border-black">Voucher No.</th>
              <th className="p-2 border border-black">Debit Amount</th>
              <th className="p-2 border border-black">Credit Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-black"></td>
              <td className="p-2">
                <strong style={{ fontSize: '1em' }}>Opening Balance</strong>
              </td>
              <td className="p-2 border border-black"></td>
              <td className="p-2 border border-black"></td>
              <td className="">
                <strong style={{ fontSize: '1em' }}>{openingBalance}</strong>
              </td>
              <td className="p-2 border border-black"></td>
            </tr>
            {filterTransactions(salesInvoice, true)?.map((invoice, index) => (
              <tr key={index}>
                <td className="p-2 border border-black">{invoice.date}</td>
                <td className="p-2 border border-black">To Sales</td>
                <td className="p-2 border border-black">Sales</td>
                <td className="p-2 border border-black">{invoice.InvoiceNo}</td>
                <td className="p-2 border border-black">{invoice.netAmount}</td>
                <td className="p-2 border border-black"></td>
              </tr>
            ))}
            {filterTransactions(payIns, false)?.map((payIn, index) => (
              <tr key={index}>
                <td className="p-2 border border-black">{payIn.date}</td>
                <td className="p-2 border border-black">
                  By {payIn.receiptMode}
                </td>
                <td className="p-2 border border-black">PayIn</td>
                <td className="p-2 border border-black">{payIn.receiptNo}</td>
                <td className="p-2 border border-black"></td>
                <td className="p-2 border border-black">{payIn.grandtotal}</td>
              </tr>
            ))}
            <tr className="p-2 border border-black">
              <td></td>
              <td>
                <strong style={{ fontSize: '1em' }}>Closing Balance</strong>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td className="p-2">
                <strong style={{ fontSize: '1em' }}>{closingBalance}</strong>
              </td>
            </tr>
            <tr className="p-2 border border-black">
              <td colSpan="4">
                <strong style={{ fontSize: '1.2em' }}>TOTAL</strong>
              </td>
              <td>
                <strong style={{ fontSize: '1.2em' }}>{totalDebit}</strong>
              </td>
              <td className="p-2">
                <strong style={{ fontSize: '1.2em' }}>{totalCredit}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CustomerLedger
