// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/axiosInstance";

// const Expenses = () => {
//   const { storeId } = useParams();
//   const [expenses, setExpenses] = useState([]);
//   const [form, setForm] = useState({ description: "", amount: "", date: "" });

//   const [editingId, setEditingId] = useState(null);

//   const fetchExpenses = async () => {
//     try {
//       const res = await API.get(`api/expenses/${storeId}`);
//       setExpenses(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, [storeId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await API.put(`api/expenses/${editingId}`, { ...form, storeId });
//       } else {
//         await API.post("api/expenses", { ...form, storeId });
//       }
//       setForm({ description: "", amount: "" });
//       setEditingId(null);
//       fetchExpenses();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error saving expense");
//     }
//   };

//   const handleEdit = (expense) => {
//     setForm({
//       description: expense.description,
//       amount: expense.amount,
//       date: expense.date?.split("T")[0] || "",
//     });
//     setEditingId(expense.id);
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Delete this expense?")) {
//       await API.delete(`api/expenses/${id}`, { data: { storeId } });
//       fetchExpenses();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-4">Expenses for Store #{storeId}</h1>

//       {/* Expense Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow mb-8"
//       >
//         <h2 className="text-xl font-semibold mb-4">
//           {editingId ? "Edit Expense" : "Add New Expense"}
//         </h2>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Description"
//             className="border p-2 rounded"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             className="border p-2 rounded"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//             required
//           />
//           <input
//             type="date"
//             className="border p-2 rounded"
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700"
//         >
//           {editingId ? "Update Expense" : "Add Expense"}
//         </button>
//       </form>

//       {/* Expense List */}
//       <div className="grid gap-4">
//         {expenses.map((expense) => (
//           <div
//             key={expense.id}
//             className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
//           >
//             <div>
//               <h3 className="text-lg font-semibold">{expense.description}</h3>
//               <p className="text-sm text-gray-600">
//                 ₦{expense.amount.toLocaleString()}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleEdit(expense)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(expense.id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Expenses;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosInstance";

const Expenses = () => {
  const { storeId } = useParams();
  const [expenses, setExpenses] = useState([]);

  // ✅ Initialize with a defined date (today’s date)
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all expenses for this store
  const fetchExpenses = async () => {
    try {
      const res = await API.get(`api/expenses/${storeId}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [storeId]);

  // ✅ Create or update expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`api/expenses/${editingId}`, { ...form, storeId });
      } else {
        await API.post("api/expenses", { ...form, storeId });
      }

      // ✅ Reset form safely (prevents uncontrolled input warning)
      setForm({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });

      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving expense");
    }
  };

  // ✅ Prefill form when editing
  const handleEdit = (expense) => {
    setForm({
      description: expense.description,
      amount: expense.amount,
      date: expense.date
        ? expense.date.split("T")[0]
        : new Date().toISOString().split("T")[0], // fallback if missing
    });
    setEditingId(expense.id);
  };

  // ✅ Delete expense
  const handleDelete = async (id) => {
    if (confirm("Delete this expense?")) {
      await API.delete(`api/expenses/${id}`, { data: { storeId } });
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

        <div className="grid md:grid-cols-3 gap-4">
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
          <input
            type="date"
            className="border p-2 rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                ₦{expense.amount.toLocaleString()} •{" "}
                {expense.date ? expense.date.split("T")[0] : "No date provided"}
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
