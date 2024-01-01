import express from "express";
import { createBrand, getAllBrands } from "../controllers/brandController.js";

const router = express.Router();

router.post("/", createBrand).get("/", getAllBrands);

export default router;
