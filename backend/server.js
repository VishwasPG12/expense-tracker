require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/expenses", require("./routes/expenseRoutes.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
