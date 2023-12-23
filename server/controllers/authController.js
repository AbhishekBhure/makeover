import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";

//Creating a user
export const signup = async (req, res, next) => {
  try {
    const { username, email, password, address, role } = req.body;

    if (!username) {
      return next(errorHandler(400, "Name is required"));
    }
    if (!email) {
      return next(errorHandler(400, "Email is required"));
    }
    if (!password) {
      return next(errorHandler(400, "Password is required"));
    }
    if (!address) {
      return next(errorHandler(400, "Address is required"));
    }

    //checking user
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return next(errorHandler(200, "User alredy Exists"));
    }

    //registering user
    // const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//Logging in a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(errorHandler(404, "Please Enter Email & Password"));
  }
  if (!password) {
    return next(errorHandler(404, "Please Enter Email & Password"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Email is not register"));
    }
    const validPassword = await comparePassword(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(200, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { password: pass, ...user } = validUser._doc;

    res
      .cookie("acess_token", token, { httpOnly: true })
      .status(200)
      .json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const test = (req, res, next) => {
  res.send("Protected Route");
};
