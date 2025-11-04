import pool from "../config/db.js";

export const createItemModel = async (
  storeId,
  name,
  quantity,
  price,
  expiry_date
) => {
  const result = await pool.query(
    `INSERT INTO inventory (store_id, name, quantity, price, expiry_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [storeId, name, quantity, price, expiry_date]
  );
  return result.rows[0];
};

export const getItemsByStoreModel = async (storeId) => {
  const result = await pool.query(
    "SELECT * FROM inventory WHERE store_id = $1 ORDER BY created_at DESC",
    [storeId]
  );
  return result.rows;
};

export const getItemByIdModel = async (id, storeId) => {
  const result = await pool.query(
    "SELECT * FROM inventory WHERE id = $1 AND store_id = $2",
    [id, storeId]
  );
  return result.rows[0];
};

export const updateItemModel = async (
  id,
  storeId,
  name,
  quantity,
  price,
  expiry_date
) => {
  const result = await pool.query(
    `UPDATE inventory
     SET name=$1, quantity=$2, price=$3, expiry_date=$4, updated_at=NOW()
     WHERE id=$5 AND store_id=$6
     RETURNING *`,
    [name, quantity, price, expiry_date, id, storeId]
  );
  return result.rows[0];
};

export const deleteItemModel = async (id, storeId) => {
  const result = await pool.query(
    "DELETE FROM inventory WHERE id=$1 AND store_id=$2 RETURNING *",
    [id, storeId]
  );
  return result.rows[0];
};
