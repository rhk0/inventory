import cron from "node-cron";
import User from "../models/userModel.js"; // Adjust the path to your User model
import { addDays } from "date-fns";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Create a Nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const subscription = async () => {
  try {
    const users = await User.find({role:2,status:"Active"}).populate("paymentValidation");


    const paymentValidations = users.map(user => user.paymentValidation);
  // console.log(users,"usersss")
    const today = new Date();
    
    users.forEach(async (user) => {
      const warningDate3Days = addDays(user.endDate, -3);
      const warningDate2Days = addDays(user.endDate, -2);
      const warningDate1Day = addDays(user.endDate, -1);

      if (user.endDate <= today) {
       console.log(user)
        user.status = "Inactive";
        await user.save();
            // Send email when status changes to "Inactive"
        let smd = `Dear ${user.cakeOwnerName}, your subscription has expired on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
      await sendWarningEmail(user.email, smd);
    

      } else if (warningDate3Days <= today && user.status === "Active") {
        let smd = `Dear ${user.cakeOwnerName}, your subscription will expire in 3 days on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      } else if (warningDate2Days <= today && user.status === "Active") {
        let smd = `Dear ${user.cakeOwnerName}, your subscription will expire in 2 days on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      } else if (warningDate1Day <= today && user.status === "Active") {
        let smd = `Dear ${user.cakeOwnerName}, your subscription will expire in 1 day on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      }
    });
  } catch (error) {
    console.error("Error checking subscriptions: ", error);
  }
};

const sendWarningEmail = async (email, message) => {
  try {
    let info = await transporter.sendMail({
      from: `Manasvi-Cakes<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Cakes Subscription Expiry Warning",
      text: message,
    });
    console.log("Warning email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

// Schedule the subscription function to run daily at midnight
cron.schedule("0 0 * * *", subscription);

export default subscription;
