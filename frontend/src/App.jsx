import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://expense-tracker-backend-jz2k.onrender.com";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/expenses`)
      .then(res => setExpenses(res.data));
  }, []);

  const addExpense = async () => {
    if (!name || amount <= 0) return;
    const res = await axios.post(`${BACKEND_URL}/api/expenses`, {
      name,
      amount: Number(amount),
    });
    setExpenses([res.data, ...expenses]);
    setName("");
    setAmount("");
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BACKEND_URL}/api/expenses/${id}`);
    setExpenses(expenses.filter(e => e._id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        
        {/* Updated Header with Title and Tagline */}
        <header className="pt-12 pb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Expense Tracker</h1>
          <p className="text-[13px] text-gray-400 font-medium mb-6">Cuz every rupee matters!</p>
          
          <div className="inline-block bg-white border border-gray-100 px-6 py-2 rounded-full shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mr-2">Balance</span>
            <span className="text-xl font-semibold">₹{total.toLocaleString()}</span>
          </div>
        </header>

        {/* Input Area */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="space-y-4">
            <input
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-[15px]"
              placeholder="What's this for?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-3">
              <input
                type="number"
                className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-[15px]"
                placeholder="Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={addExpense}
                className="bg-black text-white px-8 rounded-2xl font-medium hover:opacity-80 active:scale-95 transition-all text-[15px]"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {expenses.map((e) => (
            <div 
              key={e._id} 
              className="bg-white border border-gray-50 flex justify-between items-center px-6 py-4 rounded-2xl group transition-all hover:border-gray-200 hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-[15px]">{e.name}</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Transaction</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[15px]">₹{Number(e.amount).toLocaleString()}</span>
                <button
                  onClick={() => deleteExpense(e._id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          {expenses.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-300 text-sm italic">No transactions yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}