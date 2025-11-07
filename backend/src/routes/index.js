import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authRoutes from "./authRoutes.js";
import storeRoutes from "./storeRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import reportRoutes from "./reportRoutes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/stores", protect, storeRoutes);
router.use("/inventory", protect, inventoryRoutes);
router.use("/expenses", protect, expenseRoutes);
router.use("/reports", protect, reportRoutes);

export default router;
