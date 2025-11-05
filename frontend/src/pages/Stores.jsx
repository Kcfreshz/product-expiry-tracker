import { useEffect, useState } from "react";
import axios from "axios";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", currency: "NGN" });
  const [editingId, setEditingId] = useState(null);

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/stores/${editingId}`, form);
      } else {
        await axios.post("/stores", form);
      }
      setForm({ name: "", location: "", currency: "NGN" });
      setEditingId(null);
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving store");
    }
  };

  const handleEdit = (store) => {
    setForm({
      name: store.name,
      location: store.location,
      currency: store.currency,
    });
    setEditingId(store.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this store?")) {
      await axios.delete(`/stores/${id}`);
      fetchStores();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">My Stores</h1>

      {/* Store Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Store" : "Add New Store"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Store name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add Store"}
        </button>
      </form>

      {/* Store List */}
      <div className="grid gap-4 bg-amber-700">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div className="cursor-pointer">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() =>
                    (window.location.href = `/inventory/${store.id}`)
                  }
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Inventory
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `/expenses/${store.id}`)
                  }
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Expenses
                </button>
              </div>

              <p className="text-sm text-gray-600">
                {store.location || "No location"} • {store.currency}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(store)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(store.id)}
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

export default Stores;
