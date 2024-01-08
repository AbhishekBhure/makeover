import express from "express";
import {
  addAddress,
  getAddressByUser,
  updateAddress,
} from "../controllers/addressController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", requireSignIn, addAddress)
  .get("/", getAddressByUser)
  .patch("/editAddress/:id", requireSignIn, updateAddress);

export default router;
