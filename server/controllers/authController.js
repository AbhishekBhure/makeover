import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";

//Creating a user
export const signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username) {
      return next(errorHandler(400, "Name is required"));
    }
    if (!email) {
      return next(errorHandler(400, "Email is required"));
    }
    if (!password) {
      return next(errorHandler(400, "Password is required"));
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
      return next(errorHandler(404, "Invalid credentials"));
    }
    const validPassword = await comparePassword(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ user, token });
  } catch (error) {
    next(error);
  }
};

//Sign Out User
export const signout = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    res.clearCookie("access_token");
    res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

//Google Signin
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPassword(generatedPass);
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const test = (req, res, next) => {
  res.send("Protected Route");
};
