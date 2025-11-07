// controllers/reportController.js
import pool from "../config/db.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const stores = await pool.query("SELECT id FROM stores WHERE user_id=$1", [
      userId,
    ]);
    const storeIds = stores.rows.map((s) => s.id);
    const storeCount = storeIds.length;

    const inventory = await pool.query(
      "SELECT SUM(price * quantity) as total FROM inventory WHERE store_id = ANY($1::int[])",
      [storeIds]
    );

    const expenses = await pool.query(
      "SELECT SUM(amount) as total FROM expenses WHERE store_id = ANY($1::int[])",
      [storeIds]
    );

    res.json({
      totalStores: storeCount,
      totalInventoryValue: Number(inventory.rows[0].total) || 0,
      totalExpenses: Number(expenses.rows[0].total) || 0,
    });
  } catch (err) {
    console.error("Error in getSummary:", err);
    res.status(500).json({ message: err.message });
  }
};
