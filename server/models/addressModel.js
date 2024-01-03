import mongoose from "mongoose";
import { Schema } from "mongoose";

const addressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Address"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
  },
  street: {
    type: String,
    required: [true, "Please Enter Street"],
  },
  city: {
    type: String,
    required: [true, "Please Enter City"],
  },
  state: {
    type: String,
    required: [true, "Please Enter State"],
  },
  pinCode: {
    type: Number,
    required: [true, "Please Enter Pincode"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
