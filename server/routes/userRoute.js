import express from "express";
import { getAllUsers, singleUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers).get("/:id", singleUser);

export default router;
