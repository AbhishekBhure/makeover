import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", getAllProducts)
  .get("/:id", getProductById);

export default router;
