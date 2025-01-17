import mongoose from 'mongoose'

const purchesInvoiceSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    purchaseType: { type: String },
    date: { type: String },
    invoiceNo: { type: String },
    supplierInvoiceNo: { type: String },
    supplierName: { type: String },
    selectedcash: { type: String },
    selectedBank: [
      {
        bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }, // Reference to the bank
        name: { type: String }, // e.g. "SBI"
        ifscCode: { type: String },
        accountNumber: { type: String },
        openingBalance: { type: String },
        drCr: { type: String }, // Debit or Credit
      },
    ],
    placeOfSupply: { type: String },
    paymentTerm: { type: String },
    dueDate: { type: String },
    receiptDocNo: { type: String },
    dispatchedThrough: { type: String },
    destination: { type: String },
    carrierNameAgent: { type: String },
    billOfLading: { type: String },
    motorVehicleNo: { type: String },
    billingAddress: { type: String },
    reverseCharge: { type: String },
    gstType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsnCode: { type: String },
        unit: { type: String },
        qty: { type: String },
        freeQty: { type: String },
        maxmimunRetailPrice: { type: Number },
        unitCost: { type: Number },
        schemeMargin: { type: String },
        discountpercent: { type: String },
        discountRs: { type: String },
        taxableValue: { type: Number },
        cgstpercent: { type: Number },
        cgstRS: { type: Number },
        sgstpercent: { type: Number },
        sgstRS: { type: Number },
        igstpercent: { type: Number },
        igstRS: { type: Number },
        totalValue: { type: String },
      },
    ],

    cash: {
      Amount: { type: Number },
      Advance: { type: Number },
      Received: { type: Number },
      Balance: { type: Number },
    },
    bank: {
      bank: { type: String },
      selectBankType: { type: String },
      transactionDate: { type: String },
      chequeNo: { type: Number },
      transactionNo: { type: Number },
      Amount: { type: Number },
      Advance: { type: Number },
      Received: { type: Number },
      Balance: { type: Number },
    },
    otherChargesDescriptions: { type: String },
    otherCharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
    documentPath: { type: String },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('purchesInvoice', purchesInvoiceSchema)
