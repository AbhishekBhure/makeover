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
  .get("/", requireSignIn, getCartItemsByUser)
  .post("/", requireSignIn, addToCart)
  .patch("/:id", requireSignIn, updateCart)
  .delete("/:id", requireSignIn, deleteItemFromCart);

export default router;
