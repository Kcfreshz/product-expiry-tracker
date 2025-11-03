import {
  createStoreModel,
  getStoresByUserModel,
  getStoreByIdModel,
  updateStoreModel,
  deleteStoreModel,
} from "../models/storeModel.js";

export const createStore = async (req, res) => {
  const { name, location, currency } = req.body;
  try {
    const store = await createStoreModel(req.user.id, name, location, currency);
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStores = async (req, res) => {
  try {
    const stores = await getStoresByUserModel(req.user.id);
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoreById = async (req, res) => {
  try {
    const store = await getStoreByIdModel(req.params.id, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStore = async (req, res) => {
  const { name, location, currency } = req.body;
  try {
    const updated = await updateStoreModel(
      req.params.id,
      req.user.id,
      name,
      location,
      currency
    );
    if (!updated) return res.status(404).json({ message: "Store not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const deleted = await deleteStoreModel(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ message: "Store not found" });
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
