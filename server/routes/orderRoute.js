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
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", getAllOrdersByAdmin);

export default router;
