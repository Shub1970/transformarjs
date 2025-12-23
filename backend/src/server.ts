import "dotenv/config";
import express from "express";
import cors from "cors";
import { Prisma, PrismaClient } from "../prisma/generated/client";
import prisma from "./utils/connect";
import userRouter from "./router/users";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

app.use("/api/users", userRouter);

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`),
);
