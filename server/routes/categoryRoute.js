import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory).get("/", getAllCategories);

export default router;
