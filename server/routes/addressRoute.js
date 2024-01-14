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
  .post("/", addAddress)
  .get("/", getAddressByUser)
  .patch("/editAddress/:id", updateAddress)
  .delete("/deleteAddress/:id", deleteAddress);

export default router;
