import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobCardRoutes from "./routes/jobCardRoutes.js";
import authRoutes from './routes/authRoutes.js';
import phoneRoutes from "./routes/phoneRoutes.js";
import partRoutes from "./routes/partRoutes.js";
import { swaggerDocs } from "./swagger.js";

dotenv.config();
const app = express();

app.use(express.json());

// Swagger docs
swaggerDocs(app);

// Routes
app.use("/api/jobcards", jobCardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/api/parts", partRoutes);

// Connect & Start Server
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
  console.log("Swagger Docs available at: http://localhost:5000/api-docs");
});
