import express from "express";

import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  createOrder,
  deleteOrder,
  getOrdersByUser,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .get("/", requireSignIn, getOrdersByUser)
  .post("/", requireSignIn, createOrder)
  .patch("/:id", requireSignIn, updateOrder)
  .delete("/:id", requireSignIn, deleteOrder);

export default router;
