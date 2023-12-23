import express from "express";
import {
  signup,
  signin,
  test,
  signout,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/test", requireSignIn, isAdmin, test);

export default router;
