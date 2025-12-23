const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://pgvishwas21:Expense123@cluster0.kc7n7.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));


// Routes
app.use("/api/expenses", require("./routes/expenseRoutes.js"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
