import {
  register,
  login,
  getUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Router from "express";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  console.log("Request Type:", req.method);
  next();
});
export default router;
