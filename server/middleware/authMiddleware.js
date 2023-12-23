import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";

//protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const verifyToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    if (user.role !== "admin") {
      return next(errorHandler(401, "UnAuthorized"));
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
