import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", (req, res, next) => {
    // Checking if there are search parameters in the query string
    if (req.query.searchTerm) {
      return searchProducts(req, res, next);
    } else {
      return getAllProducts(req, res, next);
    }
  })
  .get("/:id", getProductById)
  .patch("/:id", isAdmin, updateProduct);

export default router;
