import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./src/middleware/errorHandler.js";
import connectDB from "./src/common/db.js";
import authRoutes from "./src/routes/authRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/api/auth", (req, res) => {
  res.status(200).json({ ok: true, message: "API Running" });
});
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
