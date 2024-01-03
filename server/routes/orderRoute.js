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
  .get("/", getOrdersByUser)
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

export default router;
