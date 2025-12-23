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

app.use("/users", userRouter);

const server = app.listen(8000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`),
);
