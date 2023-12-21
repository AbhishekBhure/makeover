import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Cannot exceed more than 30 character"],
      minLength: [3, "Name should have more than 3 character"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Name should have more than 8 character"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter your confirm password"],
      minLength: [8, "Name should have more than 8 character"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
