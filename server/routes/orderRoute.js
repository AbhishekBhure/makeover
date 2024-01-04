import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrdersByAdmin,
  getOrdersByUser,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .get("/user/:userId", getOrdersByUser)
  .post("/", requireSignIn, createOrder)
  .patch("/:id", requireSignIn, isAdmin, updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", requireSignIn, isAdmin, getAllOrdersByAdmin);

export default router;
