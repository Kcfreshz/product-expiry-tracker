import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Expenses = () => {
  const { storeId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: "", amount: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`/expenses/${storeId}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [storeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/expenses/${editingId}`, { ...form, storeId });
      } else {
        await axios.post("/expenses", { ...form, storeId });
      }
      setForm({ description: "", amount: "" });
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving expense");
    }
  };

  const handleEdit = (expense) => {
    setForm({
      description: expense.description,
      amount: expense.amount,
    });
    setEditingId(expense.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this expense?")) {
      await axios.delete(`/expenses/${id}`, { data: { storeId } });
      fetchExpenses();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Expenses for Store #{storeId}</h1>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Expense" : "Add New Expense"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700"
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* Expense List */}
      <div className="grid gap-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{expense.description}</h3>
              <p className="text-sm text-gray-600">
                ₦{expense.amount.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(expense)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(expense.id)}
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

export default Expenses;
