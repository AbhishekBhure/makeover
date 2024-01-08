import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddressByUser,
  updateAddress,
} from "../controllers/addressController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", requireSignIn, addAddress)
  .get("/", getAddressByUser)
  .patch("/editAddress/:id", requireSignIn, updateAddress)
  .delete("/deleteAddress/:id", requireSignIn, deleteAddress);

export default router;
