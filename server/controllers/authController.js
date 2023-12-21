import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    console.log(error);
  }
};
