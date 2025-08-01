import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import config, { API_KEYS } from "./config.cjs";
import { connectDB, getConnectionStatus } from "./utils/db.utils.js";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
  appLogger,
} from "./utils/logger.js";
import router from "./routes/route.index.js";
import Blackbox from "./helpers/blackbox.helper.js";

const { SERVER_CONFIG, DB_CONFIG, JWT_CONFIG, validateEnvironment } = config;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.set("io", io);
global.io = io;

validateEnvironment();

connectDB();

io.on("connection", (socket) => {
  socket.on("join", (projectId) => {
    if (projectId) {
      socket.join(projectId);
      console.log(`Socket ${socket.id} joined room ${projectId}`);
    }
  });
});

app.use((req, res, next) => {
  req.setTimeout(600000);
  res.setTimeout(600000);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5174", // Frontend origin
    credentials: true, // allow cookies / authorization headers
  })
);

app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${SERVER_CONFIG.API_VERSION}`, router);

app.get("/", (req, res) => {
  appLogger.info("Root endpoint accessed", {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  res.json({
    message: "PromptStack Backend API is running!",
    environment: SERVER_CONFIG.NODE_ENV,
    port: SERVER_CONFIG.PORT,
    apiVersion: SERVER_CONFIG.API_VERSION,
  });
});

app.get("/health", (req, res) => {
  const dbStatus = getConnectionStatus();
  appLogger.info("Health check requested", { dbStatus });
  res.json({
    success: true,
    message: "Health check",
    data: {
      server: {
        status: "running",
        environment: SERVER_CONFIG.NODE_ENV,
        port: SERVER_CONFIG.PORT,
      },
      database: dbStatus,
    },
    statusCode: 200,
  });
});

app.use((err, req, res, next) => {
  appLogger.error("Unhandled error occurred", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      SERVER_CONFIG.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    statusCode: 500,
  });
});

app.use((req, res) => {
  appLogger.warn("Route not found", {
    url: req.originalUrl,
    method: req.method,
  });
  res.status(404).json({
    success: false,
    message: "Route not found",
    statusCode: 404,
  });
});

app.listen = undefined;
server.listen(SERVER_CONFIG.PORT, () => {
  appLogger.info("Server started successfully", {
    port: SERVER_CONFIG.PORT,
    environment: SERVER_CONFIG.NODE_ENV,
    mongoUri: DB_CONFIG.MONGODB_URI ? "Configured" : "Not configured",
    jwtSecret: JWT_CONFIG.SECRET ? "Configured" : "Not configured",
  });

  console.log(`🚀 Server is running on port ${SERVER_CONFIG.PORT}`);
  console.log(`🌍 Environment: ${SERVER_CONFIG.NODE_ENV}`);
  console.log(
    `📊 MongoDB URI: ${DB_CONFIG.MONGODB_URI ? "Configured" : "Not configured"}`
  );
  console.log(
    `🔐 JWT Secret: ${JWT_CONFIG.SECRET ? "Configured" : "Not configured"}`
  );
});

export default app;
