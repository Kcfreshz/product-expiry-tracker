import pool from "../config/db.js";

export const createExpenseModel = async (
  storeId,
  description,
  amount,
  date
) => {
  const result = await pool.query(
    `INSERT INTO expenses (store_id, description, amount, date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [storeId, description, amount, date]
  );
  return result.rows[0];
};

export const getExpensesByStoreModel = async (storeId) => {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE store_id=$1 ORDER BY date DESC",
    [storeId]
  );
  return result.rows;
};

export const updateExpenseModel = async (
  id,
  storeId,
  description,
  amount,
  date
) => {
  const result = await pool.query(
    `UPDATE expenses
     SET description=$1, amount=$2, date=$3, updated_at=NOW()
     WHERE id=$4 AND store_id=$5
     RETURNING *`,
    [description, amount, date, id, storeId]
  );
  return result.rows[0];
};

export const deleteExpenseModel = async (id, storeId) => {
  const result = await pool.query(
    "DELETE FROM expenses WHERE id=$1 AND store_id=$2 RETURNING *",
    [id, storeId]
  );
  return result.rows[0];
};
