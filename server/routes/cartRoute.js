import express from "express";
import {
  addToCart,
  getCartItemsByUser,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", requireSignIn, getCartItemsByUser)
  .post("/", requireSignIn, addToCart);

export default router;
