import express from "express";
import {
  getAllUsers,
  singleUser,
  updateUser,
} from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", getAllUsers)
  .get("/:id", singleUser)
  .patch("/update/:id", updateUser);

export default router;
