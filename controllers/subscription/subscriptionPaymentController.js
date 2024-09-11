import subPayment from "../models/subPayment.js";
import Razorpay from "razorpay";
import userModel from "../models/userModel.js";
export const subPayCreateController = async (req, res) => {
    try {
       
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: "INR",
      };
      
      const orderRazor = await instance.orders.create(options);
  
      if (!orderRazor) return res.status(500).send("Some error occured");
      res.send(orderRazor);
    } catch (error) {
        console.log(error)
      res.status(500).send(error.message);
    }
  };
      
  
  //payment verify complete
  export const subPayOrderRazorController = async (req, res) => {
    try {
      const {  amount , razorpay, plan,tcManager } = req.body;
      let amt = amount;
      let finamt = amt.toString().slice(0, -2);
      let dmt = parseInt(finamt);
      
  
      let newInvoice;
      let invoice;
      const lastInvoice = await subPayment.findOne({}).sort({ createdAt: -1 });
      if (lastInvoice == null || lastInvoice.invoiceNo == null) {
        newInvoice = 10101;
      }
      if (lastInvoice) {
        if (lastInvoice.invoiceNo) {
          invoice = lastInvoice.invoiceNo;
  
          newInvoice = invoice + 1;
        }
      }
      const newOrder = new subPayment({
        isPaid: true,
        paymentMode: true,
        amount: dmt,
        plan: plan,
        razorpay: razorpay,
        tcManager:tcManager,
        invoiceNo: newInvoice,
      });
   const result =   await newOrder.save();

   /// update here user for validity op their plan 
      
   const user = await userModel.findById(tcManager)
   if (user){
      const noOfDay =  result.plan[0].duration;
      const edate = user.endDate || new Date();
     
     
      const endDate = new Date(edate);
      endDate.setDate(endDate.getDate() + noOfDay);
     


      const updated = await userModel.findByIdAndUpdate(tcManager,{paymentValidation:result.plan[0]._id,endDate:endDate},{new:true})
  
   }
  
      res.send({
        msg: "Payment was successful",
      });
    } catch (error) {
        console.log(error);
      res.status(500).send(error);
    }
  };