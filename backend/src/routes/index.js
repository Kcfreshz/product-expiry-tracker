import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authRoutes from "./authRoutes.js";
import storeRoutes from "./storeRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/stores", protect, storeRoutes);

export default router;
