import pool from "../config/db.js";

export const createStoreModel = async (userId, name, location, currency) => {
  const result = await pool.query(
    "INSERT INTO stores (user_id, name, location, currency) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, name, location, currency]
  );
  return result.rows[0];
};

export const getStoresByUserModel = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

export const getStoreByIdModel = async (id, userId) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return result.rows[0];
};

export const updateStoreModel = async (
  id,
  userId,
  name,
  location,
  currency
) => {
  const result = await pool.query(
    `UPDATE stores 
     SET name=$1, location=$2, currency=$3, updated_at=NOW() 
     WHERE id=$4 AND user_id=$5 
     RETURNING *`,
    [name, location, currency, id, userId]
  );
  return result.rows[0];
};

export const deleteStoreModel = async (id, userId) => {
  const result = await pool.query(
    "DELETE FROM stores WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId]
  );
  return result.rows[0];
};
