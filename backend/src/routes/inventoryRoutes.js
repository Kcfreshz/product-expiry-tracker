import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/inventoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/inventory/:storeId → GET items for one store
router.get("/:storeId", protect, getItems);

// /api/inventory → POST (create new item)
router.post("/", protect, createItem);

// /api/inventory/:id → PUT or DELETE item
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

export default router;
