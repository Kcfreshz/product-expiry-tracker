import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authRoutes from "./authRoutes.js";
import storeRoutes from "./storeRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/stores", protect, storeRoutes);
router.use("/inventory", protect, inventoryRoutes);

export default router;
