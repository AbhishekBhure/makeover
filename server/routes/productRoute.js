import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", getAllProducts)
  .get("/:id", getProductById)
  .patch("/:id", requireSignIn, isAdmin, updateProduct);

export default router;
