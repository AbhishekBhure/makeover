import express from "express";
import {
  addToCart,
  deleteItemFromCart,
  getCartItemsByUser,
  updateCart,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", getCartItemsByUser)
  .post("/", addToCart)
  .patch("/:id", updateCart)
  .delete("/:id", deleteItemFromCart);

export default router;
