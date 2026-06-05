const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "expense-tracker",
    status: "running",
  });
});

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/expenses", (req, res, next) => {
  console.log("MIDDLEWARE EXPENSE KENA:", req.method, req.originalUrl);
  next();
});

app.use("/api/expenses", expenseRoutes);

app.use("/api/expenses", (req, res, next) => {
  console.log("MIDDLEWARE EXPENSE KENA:", req.method, req.originalUrl);
  next();
});

app.use("/api/expenses", expenseRoutes);

app.get("/test", (req, res) => {
  res.send("test berhasil");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
