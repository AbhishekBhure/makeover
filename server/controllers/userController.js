import User from "../models/userModel.js";
import { hashPassword } from "../utils/authHelper.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    const userLength = users.length;
    res.status(200).json({ users, userLength });
  } catch (error) {
    next(error);
  }
};

//Get a Single User
export const singleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Update a user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  // if (req.user.id !== id) {
  //   return next(errorHandler(401, "Unauthorized"));
  // }
  try {
    const { password } = req.body;
    if (req.body.password) {
      req.body.password = await hashPassword(password);
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
