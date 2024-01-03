import express from "express";
import {
  addAddress,
  getAddressByUser,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/", addAddress).get("/", getAddressByUser);

export default router;
