import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BACKEND_URL = "https://expense-tracker-backend-jz2k.onrender.com";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/expenses`)
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  const addExpense = async () => {
    if (!name || amount <= 0) return;

    const res = await axios.post(`${BACKEND_URL}/api/expenses`, {
      name,
      amount: Number(amount), // ensure amount is a number
    });

    setExpenses([...expenses, res.data]);
    setName("");
    setAmount("");
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BACKEND_URL}/api/expenses/${id}`);
    setExpenses(expenses.filter(e => e._id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <h4>Cuz every rupee matters!</h4>

      <div className="form">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add</button>
      </div>

      <ul>
        {expenses.map(e => (
          <li key={e._id}>
            <span>{e.name} — ₹{e.amount}</span>
            <button onClick={() => deleteExpense(e._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="total">
        Total: ₹{total}
      </div>
    </div>
  );
}
