import express from "express";
import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
} from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createStore).get(protect, getStores);

router
  .route("/:id")
  .get(protect, getStoreById)
  .put(protect, updateStore)
  .delete(protect, deleteStore);

export default router;
