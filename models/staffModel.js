import mongoose from "mongoose";


const staffSchema = new mongoose.Schema(
  {
    photo: [
      {
        type: String,
      },
    ],
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    state: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Staff", staffSchema);
