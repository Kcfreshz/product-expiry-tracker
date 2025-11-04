import {
  createItemModel,
  getItemsByStoreModel,
  // getItemByIdModel,
  updateItemModel,
  deleteItemModel,
} from "../models/inventoryModel.js";
import { getStoreByIdModel } from "../models/storeModel.js";

export const createItem = async (req, res) => {
  const { storeId, name, quantity, price, expiry_date } = req.body;
  try {
    // ensure the store belongs to the logged-in user
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const item = await createItemModel(
      storeId,
      name,
      quantity,
      price,
      expiry_date
    );
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const items = await getItemsByStoreModel(storeId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { name, quantity, price, expiry_date } = req.body;
  const { id } = req.params;
  const { storeId } = req.body;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const updated = await updateItemModel(
      id,
      storeId,
      name,
      quantity,
      price,
      expiry_date
    );
    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { storeId } = req.body;
  const { id } = req.params;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const deleted = await deleteItemModel(id, storeId);
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
