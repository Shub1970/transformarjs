import "dotenv/config";
import { Prisma, PrismaClient } from "../prisma/generated/client";
import prisma from "./utils/connect";
import express from "express";
import userRouter from "./router/users";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

const server = app.listen(8000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`),
);
