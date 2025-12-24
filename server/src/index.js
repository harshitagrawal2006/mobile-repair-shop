import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("❌ Express Error:", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on: http://localhost:${PORT}`);
      console.log(`📚 API Docs available at: http://localhost:${PORT}/api-docs`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}\n`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
