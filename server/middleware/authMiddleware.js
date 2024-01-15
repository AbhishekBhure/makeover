import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";

//protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Unauthorized!!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, "Forbidden"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

//Admin
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user.role !== "admin") {
//       return next(errorHandler(401, "UnAuthorized"));
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// };
