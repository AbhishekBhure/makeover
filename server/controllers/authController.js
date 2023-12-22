import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

//Creating a user
export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (password.length < 5) {
    return next(errorHandler(400, "Password should be more than 5 charaters"));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//Logging in a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(errorHandler(400, "Please Enter Email & Password"));
  }
  try {
    const validUser = await User.findOne({ email });
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validUser && !validPassword) {
      return next(errorHandler(404, "Email or Password id wrong"));
    }
    const token = jwt.sign({ id: validPassword._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("acess_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
