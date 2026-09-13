require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth");
const courseRoutes = require("./src/routes/courses");
const progressRoutes = require("./src/routes/progress");
const liveRoutes = require("./src/routes/live");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "*"
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Arogyam API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/live", liveRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Arogyam API running at http://localhost:${PORT}`);
});