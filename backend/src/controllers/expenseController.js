import {
  createExpenseModel,
  getExpensesByStoreModel,
  updateExpenseModel,
  deleteExpenseModel,
} from "../models/expenseModel.js";
import { getStoreByIdModel } from "../models/storeModel.js";

export const createExpense = async (req, res) => {
  const { storeId, description, amount, date } = req.body;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const expense = await createExpenseModel(
      storeId,
      description,
      amount,
      date
    );
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const expenses = await getExpensesByStoreModel(storeId);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { description, amount, date, storeId } = req.body;
  const { id } = req.params;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const updated = await updateExpenseModel(
      id,
      storeId,
      description,
      amount,
      date
    );
    if (!updated) return res.status(404).json({ message: "Expense not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { storeId } = req.body;
  const { id } = req.params;
  try {
    const store = await getStoreByIdModel(storeId, req.user.id);
    if (!store)
      return res.status(403).json({ message: "Not authorized for this store" });

    const deleted = await deleteExpenseModel(id, storeId);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
