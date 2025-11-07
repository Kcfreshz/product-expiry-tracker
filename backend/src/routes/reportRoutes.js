// routes/reportRoutes.js
import express from "express";
import { getSummary } from "../controllers/reportController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/summary", getSummary);
export default router;
