import "dotenv/config";

import express, { NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Prisma, PrismaClient } from "../prisma/generated/client";
import prisma from "./utils/connect";
import errorHandler from "./errorHandler";
import userRouter from "./router/users";
import languageRouter from "./router/language";
import featuresRouter from "./router/features";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.set("trust proxy", true);

const port = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

app.use("/api/auth", userRouter);
app.use("/api/languages", languageRouter);
app.use("/api/features", featuresRouter);

app.use(errorHandler);
const server = app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`),
);
