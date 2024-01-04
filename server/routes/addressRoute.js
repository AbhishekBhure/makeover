import express from "express";
import {
  addAddress,
  getAddressByUser,
} from "../controllers/addressController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireSignIn, addAddress).get("/", getAddressByUser);

export default router;
