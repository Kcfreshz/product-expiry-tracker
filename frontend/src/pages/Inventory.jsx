import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import axios from "../axios/axiosInstance";

const Inventory = () => {
  const { storeId } = useParams();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    expiry_date: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`/inventory/${storeId}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [storeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/inventory/${editingId}`, { ...form, storeId });
      } else {
        await axios.post("/inventory", { ...form, storeId });
      }
      setForm({ name: "", quantity: "", price: "", expiry_date: "" });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving item");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      expiry_date: item.expiry_date?.split("T")[0],
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this item?")) {
      await axios.delete(`/inventory/${id}`, { data: { storeId } });
      fetchItems();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Inventory for Store #{storeId}
      </h1>

      {/* Inventory Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Item" : "Add New Item"}
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.expiry_date}
            onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Inventory List */}
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} • ₦{item.price.toLocaleString()} •{" "}
                {item.expiry_date
                  ? `Exp: ${item.expiry_date.split("T")[0]}`
                  : "No expiry"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
