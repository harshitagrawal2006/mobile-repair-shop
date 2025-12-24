import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mobile Repair Shop API",
      version: "1.0.0",
      description: "API documentation for Mobile Repair Shop project",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000",
        description: "API Server"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token"
        }
      }
    }
  },
  apis: [path.join(__dirname, "routes", "*.js")],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
