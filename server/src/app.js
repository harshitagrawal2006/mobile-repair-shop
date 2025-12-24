import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { corsOptions } from "./config/cors.config.js";
import { swaggerDocs } from "./swagger.js"; // Keep original name
import { errorHandler, notFound } from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import jobCardRoutes from "./routes/jobcard.routes.js";
import phoneRoutes from "./routes/phone.routes.js";
import partRoutes from "./routes/part.routes.js";

const app = express();

// ========== Middlewares ==========
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ========== Swagger Documentation ==========
swaggerDocs(app);

// ========== Health Check ==========
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mobile Repair Shop API is running",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

// ========== API Routes ==========
app.use("/api/auth", authRoutes);
app.use("/api/jobcards", jobCardRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/api/parts", partRoutes);

// ========== Error Handling ==========
app.use(notFound);
app.use(errorHandler);

export { app };
